<!--

@license Apache-2.0

Copyright (c) 2023 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

<!-- lint disable maximum-heading-length -->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# FancyArray

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Fancy multidimensional array constructor.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

A **FancyArray** is an [`ndarray`][@stdlib/ndarray/ctor] which supports slicing via indexing expressions.

```javascript
var ndarray2array = require( '@stdlib/ndarray-to-array' );
var FancyArray = require( '@stdlib/ndarray-fancy' );

var buffer = [ 1, 2, 3, 4, 5, 6 ];
var x = new FancyArray( 'generic', buffer, [ 6 ], [ 1 ], 0, 'row-major' );
// returns <FancyArray>

// Select the first 3 elements:
var y = x[ ':3' ];
// returns <FancyArray>

var arr = ndarray2array( y );
// returns [ 1, 2, 3 ]

// Select every other element, starting with the second element:
y = x[ '1::2' ];
// returns <FancyArray>

arr = ndarray2array( y );
// returns [ 2, 4, 6 ]

// Reverse the array, starting with last element and skipping every other element:
y = x[ '::-2' ];
// returns <FancyArray>

arr = ndarray2array( y );
// returns [ 6, 4, 2 ]
```

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->



<section class="usage">

## Usage

To use in Observable,

```javascript
FancyArray = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-fancy@umd/browser.js' )
```
The previous example will load the latest bundled code from the umd branch. Alternatively, you may load a specific version by loading the file from one of the [tagged bundles](https://github.com/stdlib-js/ndarray-fancy/tags). For example,

```javascript
FancyArray = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-fancy@v0.1.0-umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var FancyArray = require( 'path/to/vendor/umd/ndarray-fancy/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-fancy@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.FancyArray;
})();
</script>
```

<a name="main"></a>

#### FancyArray( dtype, buffer, shape, strides, offset, order\[, options] )

Returns a `FancyArray` instance.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );
// returns <FancyArray>
```

The constructor expects the following arguments:

-   **dtype**: underlying [data type][@stdlib/ndarray/dtypes].
-   **buffer**: data buffer.
-   **shape**: array shape (dimensions).
-   **strides**: array strides which are index offsets specifying how to access along corresponding dimensions.
-   **offset**: index offset specifying the location of the first indexed element in the data buffer.
-   **order**: array order, which is either `row-major` (C-style) or `column-major` (Fortran-style).

The constructor accepts the following `options`:

-   **mode**: specifies how to handle indices which exceed array dimensions. Default: `'throw'`.
-   **submode**: a mode array which specifies for each dimension how to handle subscripts which exceed array dimensions. If provided fewer modes than dimensions, the constructor recycles modes using modulo arithmetic. Default: `[ options.mode ]`.
-   **readonly**: boolean indicating whether an array should be **read-only**. Default: `false`.

The constructor supports the following `modes`:

-   **throw**: specifies that a `FancyArray` instance should throw an error when an index exceeds array dimensions.
-   **wrap**: specifies that a `FancyArray` instance should wrap around an index exceeding array dimensions using modulo arithmetic.
-   **clamp**: specifies that a `FancyArray` instance should set an index exceeding array dimensions to either `0` (minimum index) or the maximum index.

By default, a `FancyArray` instance **throws** when provided an index which exceeds array dimensions. To support alternative indexing behavior, set the `mode` option, which will affect all public **methods** (but **not** slicing semantics) for getting and setting array elements.

```javascript
var opts = {
    'mode': 'clamp'
};

// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order, opts );
// returns <FancyArray>

// Attempt to access an out-of-bounds linear index (clamped):
var v = arr.iget( 10 );
// returns 4.0
```

By default, the `mode` option is applied to subscripts which exceed array dimensions. To specify behavior for each dimension, set the `submode` option.

```javascript
var opts = {
    'submode': [ 'wrap', 'clamp' ]
};

// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
var shape = [ 2, 2, 2 ];
var order = 'row-major';
var strides = [ 4, 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order, opts );
// returns <FancyArray>

// Attempt to access out-of-bounds subscripts:
var v = arr.get( -2, 10, -1 ); // linear index: 3
// returns 4.0
```

* * *

### Properties

<a name="static-prop-name"></a>

#### FancyArray.name

String value of the constructor name.

```javascript
var str = FancyArray.name;
// returns 'ndarray'
```

<a name="prop-byte-length"></a>

#### FancyArray.prototype.byteLength

Size (in bytes) of the array (if known).

```javascript
var Float64Array = require( '@stdlib/array-float64' );

// Specify the array configuration:
var buffer = new Float64Array( [ 1.0, 2.0, 3.0, 4.0 ] );
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'float64', buffer, shape, strides, offset, order );

// Get the byte length:
var nbytes = arr.byteLength;
// returns 32
```

If unable to determine the size of the array, the property value is `null`.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Get the byte length:
var nbytes = arr.byteLength;
// returns null
```

<a name="prop-bytes-per-element"></a>

#### FancyArray.prototype.BYTES_PER_ELEMENT

Size (in bytes) of each array element (if known).

```javascript
var Float32Array = require( '@stdlib/array-float32' );

// Specify the array configuration:
var buffer = new Float32Array( [ 1.0, 2.0, 3.0, 4.0 ] );
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'float32', buffer, shape, strides, offset, order );

// Get the number of bytes per element:
var nbytes = arr.BYTES_PER_ELEMENT;
// returns 4
```

If size of each array element is unknown, the property value is `null`.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Get the number of bytes per element:
var nbytes = arr.BYTES_PER_ELEMENT;
// returns null
```

<a name="prop-data"></a>

#### FancyArray.prototype.data

A reference to the underlying data buffer.

```javascript
var Int8Array = require( '@stdlib/array-int8' );

// Specify the array configuration:
var buffer = new Int8Array( [ 1, 2, 3, 4 ] );
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'int8', buffer, shape, strides, offset, order );

// Get the buffer reference:
var d = arr.data;
// returns <Int8Array>[ 1, 2, 3, 4 ]

var bool = ( d === buffer );
// returns true
```

<a name="prop-dtype"></a>

#### FancyArray.prototype.dtype

Underlying [data type][@stdlib/ndarray/dtypes].

```javascript
var Uint8Array = require( '@stdlib/array-uint8' );

// Specify the array configuration:
var buffer = new Uint8Array( [ 1, 2, 3, 4 ] );
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ -2, 1 ];
var offset = 2;

// Create a new array:
var arr = new FancyArray( 'uint8', buffer, shape, strides, offset, order );

// Get the underlying data type:
var dtype = arr.dtype;
// returns 'uint8'
```

<a name="prop-flags"></a>

#### FancyArray.prototype.flags

Meta information, such as information regarding the memory layout of the array. The returned object has the following properties:

-   **ROW_MAJOR_CONTIGUOUS**: `boolean` indicating if an array is row-major contiguous.
-   **COLUMN_MAJOR_CONTIGUOUS**: `boolean` indicating if an array is column-major contiguous.
-   **READONLY**: `boolean` indicating whether an array is **read-only**.

An array is contiguous if (1) an array is compatible with being stored in a single memory segment and (2) each array element is adjacent to the next array element. Note that an array can be both row-major contiguous and column-major contiguous at the same time (e.g., if an array is a 1-dimensional array with `strides = [1]`).

```javascript
var Int32Array = require( '@stdlib/array-int32' );

// Specify the array configuration:
var buffer = new Int32Array( [ 1, 2, 3, 4 ] );
var shape = [ 2, 2 ];
var order = 'column-major';
var strides = [ 1, 2 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'int32', buffer, shape, strides, offset, order );

// Get the array flags:
var flg = arr.flags;
// returns {...}
```

<a name="prop-length"></a>

#### FancyArray.prototype.length

Number of array elements.

```javascript
var Uint16Array = require( '@stdlib/array-uint16' );

// Specify the array configuration:
var buffer = new Uint16Array( [ 1, 2, 3, 4 ] );
var shape = [ 2, 2 ];
var order = 'column-major';
var strides = [ -1, -2 ];
var offset = 3;

// Create a new array:
var arr = new FancyArray( 'uint16', buffer, shape, strides, offset, order );

// Get the array length:
var len = arr.length;
// returns 4
```

<a name="prop-ndims"></a>

#### FancyArray.prototype.ndims

Number of dimensions.

```javascript
var Uint8ClampedArray = require( '@stdlib/array-uint8c' );

// Specify the array configuration:
var buffer = new Uint8ClampedArray( [ 1, 2, 3, 4 ] );
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ -2, -1 ];
var offset = 3;

// Create a new array:
var arr = new FancyArray( 'uint8c', buffer, shape, strides, offset, order );

// Get the number of dimensions:
var ndims = arr.ndims;
// returns 2
```

<a name="prop-offset"></a>

#### FancyArray.prototype.offset

Index offset which specifies the `buffer` index at which to start iterating over array elements.

```javascript
var Int16Array = require( '@stdlib/array-int16' );

// Specify the array configuration:
var buffer = new Int16Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ] );
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ -2, -1 ];
var offset = 10;

// Create a new array:
var arr = new FancyArray( 'int16', buffer, shape, strides, offset, order );

// Get the index offset:
var o = arr.offset;
// returns 10
```

<a name="prop-order"></a>

#### FancyArray.prototype.order

Array order. The array order is either row-major (C-style) or column-major (Fortran-style).

```javascript
var Uint32Array = require( '@stdlib/array-uint32' );

// Specify the array configuration:
var buffer = new Uint32Array( [ 1, 2, 3, 4 ] );
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'uint32', buffer, shape, strides, offset, order );

// Get the array order:
var ord = arr.order;
// returns 'row-major'
```

<a name="prop-shape"></a>

#### FancyArray.prototype.shape

Returns a copy of the array shape.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 2;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Get the array shape:
var dims = arr.shape;
// returns [ 2, 2 ]
```

<a name="prop-strides"></a>

#### FancyArray.prototype.strides

Returns a copy of the array strides which specify how to access data along corresponding array dimensions.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0 ];
var shape = [ 2, 2 ];
var order = 'column-major';
var strides = [ -1, 2 ];
var offset = 1;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Get the array strides:
var s = arr.strides;
// returns [ -1, 2 ]
```

* * *

### Methods

<a name="method-get"></a>

#### FancyArray.prototype.get( i, j, k, ... )

Returns an array element specified according to provided subscripts. The number of provided subscripts must **equal** the number of dimensions.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 2;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Get the element located at (1,1):
var v = arr.get( 1, 1 );
// returns 6.0
```

<a name="method-iget"></a>

#### FancyArray.prototype.iget( idx )

Returns an array element located at a specified linear index.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 2;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Get the element located at index 3:
var v = arr.iget( 3 );
// returns 6.0
```

For zero-dimensional arrays, the input argument is ignored and, for clarity, should **not** be provided.

<a name="method-set"></a>

#### FancyArray.prototype.set( i, j, k, ..., v )

Sets an array element specified according to provided subscripts. The number of provided subscripts must **equal** the number of dimensions.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Set the element located at (1,1):
arr.set( 1, 1, 40.0 );
var v = arr.get( 1, 1 );
// returns 40.0

// Get the underlying buffer:
var d = arr.data;
// returns [ 1.0, 2.0, 3.0, 40.0 ]
```

The method returns the `FancyArray` instance. If an array is **read-only**, the method raises an exception.

<a name="method-iset"></a>

#### FancyArray.prototype.iset( idx, v )

Sets an array element located at a specified linear index.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0 ];
var shape = [ 2, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 0;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Set the element located at index 3:
arr.iset( 3, 40.0 );
var v = arr.iget( 3 );
// returns 40.0

// Get the underlying buffer:
var d = arr.data;
// returns [ 1.0, 2.0, 3.0, 40.0 ]
```

For zero-dimensional arrays, the first, and **only**, argument should be the value `v` to set.

The method returns the `FancyArray` instance. If an array is **read-only**, the method raises an exception.

<a name="method-to-string"></a>

#### FancyArray.prototype.toString()

Serializes a `FancyArray` as a string.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
var shape = [ 3, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 2;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Serialize to a string:
var str = arr.toString();
// returns "ndarray( 'generic', [ 3, 4, 5, 6, 7, 8 ], [ 3, 2 ], [ 2, 1 ], 0, 'row-major' )"
```

The method does **not** serialize data outside of the buffer region defined by the array configuration.

<a name="method-to-json"></a>

#### FancyArray.prototype.toJSON()

Serializes a `FancyArray` as a [JSON][json] object. `JSON.stringify()` implicitly calls this method when stringifying a `FancyArray` instance.

```javascript
// Specify the array configuration:
var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ];
var shape = [ 3, 2 ];
var order = 'row-major';
var strides = [ 2, 1 ];
var offset = 2;

// Create a new array:
var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );

// Serialize to JSON:
var o = arr.toJSON();
// returns { 'type': 'ndarray', 'dtype': 'generic', 'flags': {...}, 'offset': 0, 'order': 'row-major', 'shape': [ 3, 2 ], 'strides': [ 2, 1 ], 'data': [ 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 ] }
```

The method does **not** serialize data outside of the buffer region defined by the array configuration.

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

* * *

## Notes

-   To create a zero-dimensional array, provide an empty `shape` and a single `strides` element equal to `0`. The `order` can be either `row-major` or `column-major` and has no effect on data storage or access.

    ```javascript
    var buffer = [ 1 ];
    var shape = [];
    var order = 'row-major';
    var strides = [ 0 ];
    var offset = 0;

    // Create a new zero-dimensional array:
    var arr = new FancyArray( 'generic', buffer, shape, strides, offset, order );
    // returns <FancyArray>
    ```

-   A `FancyArray` is an [`ndarray`][@stdlib/ndarray/ctor] instance and supports all [`ndarray`][@stdlib/ndarray/ctor] options, attributes, and methods. A `FancyArray` can be consumed by any API which supports [`ndarray`][@stdlib/ndarray/ctor] instances.

-   Indexing expressions provide a convenient and powerful means for creating and operating on [`ndarray`][@stdlib/ndarray/ctor] views; however, their use does entail a performance cost. Indexing expressions are best suited for interactive use (e.g., in the [REPL][@stdlib/repl]) and scripting. For performance critical applications, prefer equivalent functional APIs supporting [`ndarray`][@stdlib/ndarray/ctor] instances.

-   In older JavaScript environments which do **not** support [`Proxy`][@stdlib/proxy/ctor] objects, the use of indexing expressions is **not** supported.

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

* * *

## Examples

<!-- eslint no-undef: "error" -->

<!-- eslint-disable new-cap, array-element-newline, comma-spacing -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/slice-ctor@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/slice-multi@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-to-array@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-fancy@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var buffer = [
    1, 2,
    3, 4,  // 0
    5, 6,  // 1
    7, 8,  // 2
    9, 10
];
var shape = [ 3, 2 ];
var strides = [ 2, 1 ];
var offset = 2;

var x = new FancyArray( 'generic', buffer, shape, strides, offset, 'row-major' );
// returns <FancyArray>

// Access an ndarray property:
var ndims = x.ndims;
// returns 2

// Retrieve an ndarray element:
var v = x.get( 2, 1 );
// returns 8

// Set an ndarray element:
x.set( 2, 1, 20 );
v = x.get( 2, 1 );
// returns 20

// Create an alias for `undefined` for more concise slicing expressions:
var _ = void 0;

// Create a multi-dimensional slice:
var s = E( S(0,_,2), _ );
// returns <MultiSlice>

// Use the slice to create a view on the original ndarray:
var y1 = x[ s ];
console.log( toArray( y1 ) );
// => [ [ 3, 4 ], [ 7, 20 ] ]

// Use alternative syntax:
var y2 = x[ [ S(0,_,2), _ ] ];
console.log( toArray( y2 ) );
// => [ [ 3, 4 ], [ 7, 20 ] ]

// Use alternative syntax:
var y3 = x[ '0::2,:' ];
console.log( toArray( y3 ) );
// => [ [ 3, 4 ], [ 7, 20 ] ]

// Flip dimensions:
var y4 = x[ [ S(_,_,-2), S(_,_,-1) ] ];
console.log( toArray( y4 ) );
// => [ [ 20, 7 ], [ 4, 3 ] ]

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ndarray-fancy.svg
[npm-url]: https://npmjs.org/package/@stdlib/ndarray-fancy

[test-image]: https://github.com/stdlib-js/ndarray-fancy/actions/workflows/test.yml/badge.svg?branch=v0.1.0
[test-url]: https://github.com/stdlib-js/ndarray-fancy/actions/workflows/test.yml?query=branch:v0.1.0

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ndarray-fancy/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ndarray-fancy?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ndarray-fancy.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ndarray-fancy/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ndarray-fancy/tree/deno
[umd-url]: https://github.com/stdlib-js/ndarray-fancy/tree/umd
[esm-url]: https://github.com/stdlib-js/ndarray-fancy/tree/esm
[branches-url]: https://github.com/stdlib-js/ndarray-fancy/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ndarray-fancy/main/LICENSE

[json]: http://www.json.org/

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor/tree/umd

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray-dtypes/tree/umd

[@stdlib/ndarray/orders]: https://github.com/stdlib-js/ndarray-orders/tree/umd

[@stdlib/ndarray/index-modes]: https://github.com/stdlib-js/ndarray-index-modes/tree/umd

[@stdlib/repl]: https://github.com/stdlib-js/repl/tree/umd

[@stdlib/proxy/ctor]: https://github.com/stdlib-js/proxy-ctor/tree/umd

</section>

<!-- /.links -->

