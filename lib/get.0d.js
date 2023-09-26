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

'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert-is-function' );
var trim = require( '@stdlib/string-base-trim' );
var replace = require( '@stdlib/string-base-replace' );
var MultiSlice = require( '@stdlib/slice-multi' );
var str2multislice = require( '@stdlib/slice-base-str2multislice' );
var seq2multislice = require( '@stdlib/slice-base-seq2multislice' );
var str2slice = require( '@stdlib/slice-base-str2slice' );
var slice = require( '@stdlib/ndarray-base-slice' );
var format = require( '@stdlib/string-format' );
var errMessage = require( './error_message.js' );
var errConstructor = require( './error_constructor.js' );
var hasProperty = require( './has_property.js' );
var RE_INTEGER = require( './re_integer.js' );
var RE_SUBSEQ = require( './re_subseq.js' );


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
* @returns {*} result
*/
function get( target, property, receiver ) { // eslint-disable-line stdlib/jsdoc-require-throws-tags
	var value;
	var shape;
	var prop;
	var ch;
	var E;
	var s;
	if ( hasProperty( property ) ) {
		value = target[ property ];
		if ( isFunction( value ) ) {
			return wrapper;
		}
		return value;
	}
	prop = trim( property );

	// Retrieve the first character in order to to detect how a slice operation was specified:
	ch = prop[ 0 ];

	// Case: slice
	if ( ch === 'S' ) {
		// Convert the string to a slice object:
		s = str2slice( property );
		if ( s === null ) {
			throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
		}
		// Create a multi-slice:
		s = new MultiSlice( s );
	}
	// Case: multi-slice
	else if ( ch === 'M' ) {
		// Convert the string to a slice object:
		s = str2multislice( prop );
		if ( s === null ) {
			throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
		}
	}
	// Case: integer
	else if ( RE_INTEGER.test( prop ) ) {
		// Convert the string to a numeric value:
		s = parseInt( prop, 10 );

		// Create a multi-slice:
		s = new MultiSlice( s );
	}
	// Case: subsequence string (e.g., ':10,1,::-1,:,-5,2::3')
	else if ( RE_SUBSEQ.test( prop ) ) {
		shape = target.shape;
		s = seq2multislice( prop, shape, true );
		if ( s.code ) {
			if ( s.code === 'ERR_SLICE_INVALID_INCREMENT' ) {
				throw new Error( format( 'invalid operation. A subsequence increment must be a non-zero integer. Value: `%s`.', property ) );
			}
			if ( s.code === 'ERR_SLICE_INVALID_ELLIPSIS' ) {
				throw new Error( format( 'invalid operation. A subsequence may only include a single ellipsis. Value: `%s`.', property ) );
			}
			if ( s.code === 'ERR_SLICE_INVALID_SUBSEQUENCE' ) {
				throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
			}
			// s.code === 'ERR_SLICE_TOO_MANY_DIMENSIONS'
			throw new RangeError( format( 'invalid operation. Number of slice dimensions does not match the number of array dimensions. Array shape: (%s). Slice dimensions: %u.', shape.join( ',' ), replace( prop, /\.\.\.,/, '' ).split( ',' ).length ) );
		}
	}
	// Case: empty string or ellipsis
	else if ( prop.length === 0 || prop === '...' ) {
		s = new MultiSlice();
	}
	// Case: non-empty string
	else {
		throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
	}
	try {
		return slice( receiver, s, true );
	} catch ( err ) {
		E = errConstructor( err );
		throw new E( errMessage( err.message ) );
	}

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
