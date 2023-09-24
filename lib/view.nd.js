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

var normalizeMultiSlice = require( '@stdlib/slice-base-normalize-multi-slice' );
var nonreducedDimensions = require( '@stdlib/slice-base-nonreduced-dimensions' );
var sliceShape = require( '@stdlib/slice-base-shape' );
var take = require( '@stdlib/array-base-take' );
var vind2bind = require( '@stdlib/ndarray-base-vind2bind' );
var numel = require( '@stdlib/ndarray-base-numel' );
var format = require( '@stdlib/string-format' );
var sliceStart = require( './slice_start.js' );
var sliceStrides = require( './slice_strides.js' );
var options = require( './array_options.js' );
var empty = require( './empty.js' );


// MAIN //

/**
* Returns a view of an n-dimensional array.
*
* @private
* @param {Object} target - target object
* @param {string} property - original property string
* @param {Object} receiver - the proxy object or an object inheriting from the proxy
* @param {(MultiSlice|null)} slice - multi-slice object
* @throws {Error} invalid slice operation
* @throws {RangeError} number of slice dimensions must match the number of array dimensions
* @throws {RangeError} slice exceeds array bounds
* @returns {ndarray} ndarray view
*/
function sliceView( target, property, receiver, slice ) {
	var strides;
	var offset;
	var strict;
	var dtype;
	var shape;
	var order;
	var sdims;
	var ctor;
	var sh;
	var ns;

	// Verify that we were successfully able to create a multi-slice:
	if ( slice === null ) {
		throw new Error( format( 'invalid operation. Unsupported slice operation. Value: `%s`.', property ) );
	}
	// Retrieve target meta data:
	dtype = target.dtype;
	shape = target.shape;
	strides = target.strides;
	offset = target.offset;
	order = target.order;
	strict = false; // TODO: support strict mode

	// Ensure that the number of array dimensions matches the number of slices:
	if ( slice.ndims !== shape.length ) {
		throw new RangeError( format( 'invalid operation. Number of array dimensions does not match the number of slice dimensions. Array shape: (%s). Slice dimensions: %u.', shape.join( ',' ), slice.ndims ) );
	}
	// Normalize the slice object based on the array shape:
	ns = normalizeMultiSlice( slice, shape, true );

	// In strict mode, if the slice exceeds array bounds, raise an exception...
	if ( ns.code && strict ) {
		throw new RangeError( format( 'invalid operation. Slice exceeds array bounds. Array shape: (%s).', shape.join( ',' ) ) );
	}
	// Resolve the output array constructor:
	ctor = receiver.constructor;

	// Compute the slice shape:
	sh = sliceShape( ns );

	// Resolve the indices of the non-reduced dimensions:
	sdims = nonreducedDimensions( slice );

	// If the slice does not contain any elements, return an empty array...
	if ( numel( sh ) === 0 ) {
		return empty( ctor, dtype, take( sh, sdims ), order );
	}
	// Resolve the index offset of the first element:
	offset = vind2bind( shape, strides, offset, order, sliceStart( ns, shape, strides, 0 ), 'throw' ); // TODO: @stdlib/ndarray/base/sind2bind

	// Remove reduced dimensions from the slice shape:
	sh = take( sh, sdims );

	// If all dimensions were reduced, return a zero-dimensional array...
	if ( sh.length === 0 ) {
		return new ctor( dtype, target.data, [], [ 0 ], offset, order, options() ); // eslint-disable-line max-len
	}
	// Update strides according to slice steps:
	strides = sliceStrides( ns, strides, sdims );

	// Return a slice view:
	return new ctor( dtype, target.data, sh, strides, offset, order, options() ); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = sliceView;
