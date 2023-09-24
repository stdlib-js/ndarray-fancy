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

var vind2bind = require( '@stdlib/ndarray-base-vind2bind' );
var sliceLength = require( '@stdlib/slice-base-length' );
var empty = require( './empty.js' );
var options = require( './array_options.js' );


// MAIN //

/**
* Returns a view of a one-dimensional array.
*
* @private
* @param {Function} ctor - array constructor
* @param {string} dtype - array data type
* @param {Collection} data - underlying data buffer
* @param {NonNegativeIntegerArray} shape - array shape
* @param {IntegerArray} strides - array strides
* @param {NonNegativeInteger} offset - index offset
* @param {string} order - layout order
* @param {Slice} slice - slice object
* @returns {ndarray} ndarray view
*/
function sliceView( ctor, dtype, data, shape, strides, offset, order, slice ) {
	var start = slice.start;

	// If the slice does not contain any elements, return an empty one-dimensional array...
	if ( start === slice.stop ) { // TODO: replace with assertion utility?
		return empty( ctor, dtype, [ 0 ], order );
	}
	// Compute a new offset (i.e., the position of the starting index in the underlying buffer):
	offset = vind2bind( shape, strides, offset, order, start, 'throw' );

	// Determine the number of elements in the slice:
	shape = [ sliceLength( slice ) ];

	// Compute new array strides:
	strides = [ strides[0]*slice.step ];

	// Return a one-dimensional view:
	return new ctor( dtype, data, shape, strides, offset, order, options() );
}


// EXPORTS //

module.exports = sliceView;
