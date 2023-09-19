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

var sub2ind = require( '@stdlib/ndarray-base-sub2ind' );


// MAIN //

/**
* Resolves the linear index of the first element indexed by a multi-slice.
*
* ## Notes
*
* -   If `strides` contains negative strides, if an `offset` is greater than `0`, the function returns a linear index with respect to the underlying data buffer. If an `offset` is equal to `0`, the function returns a linear index with respect to the array view. For more information, see `@stdlib/ndarray/base/sub2ind`.
*
* @private
* @param {MultiSlice} slice - multi-slice object
* @param {NonNegativeIntegerArray} shape - array shape
* @param {IntegerArray} strides - array strides
* @param {NonNegativeInteger} offset - index offset
* @returns {NonNegativeInteger} linear index of the first element
*/
function sliceStart( slice, shape, strides, offset ) {
	var data;
	var args;
	var i;

	data = slice.data;
	args = [ shape, strides, offset ];
	for ( i = 0; i < data.length; i++ ) {
		args.push( data[ i ].start );
	}
	args.push( 'throw' );
	return sub2ind.apply( null, args );
}


// EXPORTS //

module.exports = sliceStart;
