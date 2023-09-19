/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable max-len */

'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert-is-function' );
var trim = require( '@stdlib/string-base-trim' );
var seq2slice = require( '@stdlib/slice-base-seq2slice' );
var str2slice = require( '@stdlib/slice-base-str2slice' );
var str2multislice = require( '@stdlib/slice-base-str2multislice' );
var normalizeSlice = require( '@stdlib/slice-base-normalize-slice' );
var normalizeMultiSlice = require( '@stdlib/slice-base-normalize-multi-slice' );
var vind2bind = require( '@stdlib/ndarray-base-vind2bind' );
var format = require( '@stdlib/string-format' );
var hasProperty = require( './has_property.js' );
var options = require( './array_options.js' );
var RE_INTEGER = require( './re_integer.js' );
var sliceView = require( './view.1d.js' );
var empty = require( './empty.js' );


// MAIN //

/**
* Trap for retrieving property values.
*
* @private
* @param {Object} target - target object
* @param {(string|symbol)} property - property name
* @param {Object} receiver - the proxy object or an object inheriting from the proxy
* @throws {Error} invalid slice operation
* @throws {RangeError} number of slice dimensions must match the number of array dimensions
* @throws {RangeError} slice exceeds array bounds
* @throws {Error} slice increment must be a non-zero integer
* @returns {*} result
*/
function get( target, property, receiver ) {
	var strides;
	var offset;
	var strict;
	var dtype;
	var shape;
	var order;
	var value;
	var parts;
	var prop;
	var ch;
	var s;
	if ( hasProperty( property ) ) {
		value = target[ property ];
		if ( isFunction( value ) ) {
			return wrapper;
		}
		return value;
	}
	prop = trim( property );

	// Resolve target meta data:
	dtype = target.dtype;
	shape = target.shape;
	strides = target.strides;
	offset = target.offset;
	order = target.order;
	strict = false; // TODO: support strict mode

	// Retrieve the first character in order to to detect how a slice operation was specified:
	ch = prop[ 0 ];

	// Case: slice
	if ( ch === 'S' ) {
		// Convert the string to a slice object:
		s = str2slice( property );
		if ( s === null ) {
			throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
		}
		// TODO: => @stdlib/ndarray/base/slice: return slice( receiver, [ s ] );

		// Normalize the slice object based on the array length:
		s = normalizeSlice( s, shape[ 0 ], true );

		// If the slice exceeds array bounds, return an empty one-dimensional array...
		if ( s.code ) {
			if ( strict ) {
				throw new RangeError( format( 'invalid operation. Slice exceeds array bounds. Array shape: (%s).', shape.join( ',' ) ) );
			}
			return empty( receiver.constructor, dtype, [ 0 ], order );
		}
		// Return a view of the provided array:
		return sliceView( receiver.constructor, dtype, target.data, shape, strides, offset, order, s );
	}
	// Case: multi-slice
	if ( ch === 'M' ) {
		// Convert the string to a slice object:
		s = str2multislice( prop );
		if ( s === null ) {
			throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
		}
		// TODO: => @stdlib/ndarray/base/slice: return slice( receiver, s.data );

		// Ensure that we were provided a one-dimensional multi-slice:
		if ( s.ndims !== shape.length ) {
			throw new RangeError( format( 'invalid operation. Number of array dimensions does not match the number of slice dimensions. Array shape: (%s). Slice dimensions: %u.', shape.join( ',' ), s.ndims ) );
		}
		// Normalize the slice object based on the array shape:
		s = normalizeMultiSlice( s, shape, true );

		// If the slice exceeds array bounds, return an empty one-dimensional array...
		if ( s.code ) {
			if ( strict ) {
				throw new RangeError( format( 'invalid operation. Slice exceeds array bounds. Array shape: (%s).', shape.join( ',' ) ) );
			}
			return empty( receiver.constructor, dtype, [ 0 ], order );
		}
		// Return a view of the provided array:
		return sliceView( receiver.constructor, dtype, target.data, shape, strides, offset, order, s.data[ 0 ] );
	}
	// Case: integer
	if ( RE_INTEGER.test( prop ) ) {
		// Convert the string to a numeric value:
		s = parseInt( prop, 10 );

		// TODO: => @stdlib/ndarray/base/slice: return slice( receiver, [ s ] );

		// Check whether we need to resolve an index relative to the last array element...
		if ( s < 0 ) {
			s = shape[ 0 ] + s;

			// If the index exceeds array bounds, return an empty zero-dimensional array...
			if ( s < 0 ) {
				if ( strict ) {
					throw new RangeError( format( 'invalid operation. Slice exceeds array bounds. Array shape: (%s).', shape.join( ',' ) ) );
				}
				return empty( receiver.constructor, dtype, [], order );
			}
		}
		// If the index exceeds array bounds, return an empty zero-dimensional array...
		else if ( s >= shape[ 0 ] ) {
			if ( strict ) {
				throw new RangeError( format( 'invalid operation. Slice exceeds array bounds. Array shape: (%s).', shape.join( ',' ) ) );
			}
			return empty( receiver.constructor, dtype, [], order );
		}
		// Compute the index offset for the indexed element:
		offset = vind2bind( shape, strides, offset, order, s, 'throw' );

		// Return a zero-dimensional array:
		return new receiver.constructor( dtype, target.data, [], [ 0 ], offset, order, options() );
	}
	// Check whether we were provided a multi-dimensional subsequence string...
	parts = prop.split( /\s*,\s*/ );
	if ( parts.length > 1 ) {
		throw new RangeError( format( 'invalid operation. Number of array dimensions does not match the number of slice dimensions. Array shape: (%s). Slice dimensions: %u.', shape.join( ',' ), parts.length ) );
	}
	prop = parts[ 0 ];
	if ( prop.length === 0 ) {
		throw new RangeError( format( 'invalid operation. Number of array dimensions does not match the number of slice dimensions. Array shape: (%s). Slice dimensions: %u.', shape.join( ',' ), 0 ) );
	}
	// Attempt to convert the subsequence string to a slice object:
	s = seq2slice( prop, shape[ 0 ], true );
	if ( s.code ) {
		if ( s.code === 'ERR_SLICE_OUT_OF_BOUNDS' ) {
			if ( strict ) {
				throw new RangeError( format( 'invalid operation. Slice exceeds array bounds. Array shape: (%s).', shape.join( ',' ) ) );
			}
			// Return an empty zero-dimensional array:
			return empty( receiver.constructor, dtype, [], order );
		}
		if ( s.code === 'ERR_SLICE_INVALID_INCREMENT' ) {
			throw new Error( format( 'invalid operation. A subsequence increment must be a non-zero integer. Value: `%s`.', property ) );
		}
		if ( s.code === 'ERR_SLICE_INVALID_SUBSEQUENCE' ) {
			throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
		}
	}
	// TODO: => @stdlib/ndarray/base/slice: return slice( receiver, [ s ] );

	// Return a view of the provided array:
	return sliceView( receiver.constructor, dtype, target.data, shape, strides, offset, order, s );

	/**
	* Method wrapper.
	*
	* @private
	* @returns {*} results
	*/
	function wrapper() {
		var args;
		var i;

		args = [];
		for ( i = 0; i < arguments.length; i++ ) {
			args.push( arguments[ i ] );
		}
		return value.apply( ( this === receiver ) ? target : this, args ); // eslint-disable-line no-invalid-this
	}
}


// EXPORTS //

module.exports = get;
