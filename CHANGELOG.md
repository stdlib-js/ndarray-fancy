# CHANGELOG

> Package changelog.

<section class="release" id="unreleased">

## Unreleased (2025-12-29)

<section class="issues">

### Closed Issues

This release closes the following issue:

[#6933](https://github.com/stdlib-js/stdlib/issues/6933)

</section>

<!-- /.issues -->

<section class="commits">

### Commits

<details>

-   [`7add020`](https://github.com/stdlib-js/stdlib/commit/7add0201c13e56a0381926ccfd4073c84eaf2ed4) - **test:** use standardized assertion messages and fix lint errors _(by Philipp Burckhardt)_
-   [`92b9956`](https://github.com/stdlib-js/stdlib/commit/92b99565374d44d5456a36871bd19a957e33a986) - **chore:** fix EditorConfig lint errors [(#6939)](https://github.com/stdlib-js/stdlib/pull/6939) _(by Geo Daoyu)_
-   [`e81185b`](https://github.com/stdlib-js/stdlib/commit/e81185b4a0fa3537ab4a8a16644b7fa90bb184a3) - **refactor:** rely on `ndarray/to-fancy` for implementation logic _(by Athan Reines)_
-   [`0d6bf75`](https://github.com/stdlib-js/stdlib/commit/0d6bf755cd3fcefbdf4751bc1f8e011bedefc057) - **refactor:** resolve error constructor and add todos _(by Athan Reines)_
-   [`8d4c46b`](https://github.com/stdlib-js/stdlib/commit/8d4c46b10ca912401e0ff0caa37a17cd3c443c2f) - **refactor:** update paths _(by Athan Reines)_
-   [`18b3c79`](https://github.com/stdlib-js/stdlib/commit/18b3c79c5035c7082618b7379cd6576e64393a96) - **refactor:** update paths _(by Athan Reines)_
-   [`75d4f83`](https://github.com/stdlib-js/stdlib/commit/75d4f83cb85610d23a04dc21a03f8075f6d3665f) - **refactor:** update require and include paths _(by Athan Reines)_

</details>

</section>

<!-- /.commits -->

<section class="contributors">

### Contributors

A total of 3 people contributed to this release. Thank you to the following contributors:

-   Athan Reines
-   Geo Daoyu
-   Philipp Burckhardt

</section>

<!-- /.contributors -->

</section>

<!-- /.release -->

<section class="release" id="v0.2.1">

## 0.2.1 (2024-02-25)

No changes reported for this release.

</section>

<!-- /.release -->

<section class="release" id="v0.2.0">

## 0.2.0 (2024-02-15)

<section class="features">

### Features

-   [`6ee30cd`](https://github.com/stdlib-js/stdlib/commit/6ee30cdbe8fe3148bf6b0316db4303da154e10c3) - document support for `normalize` index mode
-   [`54858d0`](https://github.com/stdlib-js/stdlib/commit/54858d0033107586ec0b0b823019e75548664bd4) - add support for slice assignment and refactor index expression handling

</section>

<!-- /.features -->

<section class="bug-fixes">

### Bug Fixes

-   [`fcbe4c1`](https://github.com/stdlib-js/stdlib/commit/fcbe4c18fd4ebfad0466b56b4c19abda6cdb4c2b) - address indexing expression errors and refactor to use `ndarray/base/slice`

</section>

<!-- /.bug-fixes -->

<section class="commits">

### Commits

<details>

-   [`26cf434`](https://github.com/stdlib-js/stdlib/commit/26cf4347b243f1f363273481512e1ffebcb27ad5) - **docs:** update related packages sections [(#1156)](https://github.com/stdlib-js/stdlib/pull/1156) _(by stdlib-bot)_
-   [`6ee30cd`](https://github.com/stdlib-js/stdlib/commit/6ee30cdbe8fe3148bf6b0316db4303da154e10c3) - **feat:** document support for `normalize` index mode _(by Athan Reines)_
-   [`6b34523`](https://github.com/stdlib-js/stdlib/commit/6b3452322174342479d6c8b3277c3efee65d4cc0) - **docs:** update links _(by Athan Reines)_
-   [`599e2ca`](https://github.com/stdlib-js/stdlib/commit/599e2ca8b21323e11e9614202a39ad377cc95ceb) - **docs:** rename examples and add slice assignment example _(by Athan Reines)_
-   [`54858d0`](https://github.com/stdlib-js/stdlib/commit/54858d0033107586ec0b0b823019e75548664bd4) - **feat:** add support for slice assignment and refactor index expression handling _(by Athan Reines)_
-   [`1393caf`](https://github.com/stdlib-js/stdlib/commit/1393caf7604f449cb906428b1c9ea07a13ad482b) - **test:** add ndarray tests _(by Athan Reines)_
-   [`b9b3ae6`](https://github.com/stdlib-js/stdlib/commit/b9b3ae6452615df30231366ce5cdc8ea9cdbdb5d) - **docs:** add example _(by Athan Reines)_
-   [`fcbe4c1`](https://github.com/stdlib-js/stdlib/commit/fcbe4c18fd4ebfad0466b56b4c19abda6cdb4c2b) - **fix:** address indexing expression errors and refactor to use `ndarray/base/slice` _(by Athan Reines)_

</details>

</section>

<!-- /.commits -->

<section class="contributors">

### Contributors

A total of 1 person contributed to this release. Thank you to this contributor:

-   Athan Reines

</section>

<!-- /.contributors -->

</section>

<!-- /.release -->

<section class="release" id="v0.1.0">

## 0.1.0 (2023-09-24)

<section class="features">

### Features

-   [`d64f3c7`](https://github.com/stdlib-js/stdlib/commit/d64f3c7831c6490eae291c9de253dfc763052fbb) - add TypeScript declarations and add REPL help
-   [`4433c86`](https://github.com/stdlib-js/stdlib/commit/4433c8677f64ffe451f267484367d3d9f27e32f5) - add `ndarray/fancy`

</section>

<!-- /.features -->

<section class="bug-fixes">

### Bug Fixes

-   [`e17e199`](https://github.com/stdlib-js/stdlib/commit/e17e1999c8d3f29a7b9fe509ce3fb05db05aaf39) - address dimension reduction bug

</section>

<!-- /.bug-fixes -->

<section class="commits">

### Commits

<details>

-   [`f5f669f`](https://github.com/stdlib-js/stdlib/commit/f5f669fe49db4cb57103fb1c5f4ba2532bf9011b) - **refactor:** use base utility to construct MultiSlice from args array _(by Athan Reines)_
-   [`e17e199`](https://github.com/stdlib-js/stdlib/commit/e17e1999c8d3f29a7b9fe509ce3fb05db05aaf39) - **fix:** address dimension reduction bug _(by Athan Reines)_
-   [`cadd340`](https://github.com/stdlib-js/stdlib/commit/cadd340383dab4e71f41789eb629844fd83b05d6) - **refactor:** use base package for resolving non-reduced dimensions _(by Athan Reines)_
-   [`f4024f0`](https://github.com/stdlib-js/stdlib/commit/f4024f0d2c13cb5c74917228231ae9f6a9793a50) - **docs:** fix rule location _(by Athan Reines)_
-   [`6d60c74`](https://github.com/stdlib-js/stdlib/commit/6d60c74f1eb464d2d3875943c75a1c4b04239984) - **docs:** add horizontal rule _(by Athan Reines)_
-   [`5b30bc7`](https://github.com/stdlib-js/stdlib/commit/5b30bc7bfcd4f52f58e127767d4b74b9248e5e17) - **docs:** fix example _(by Athan Reines)_
-   [`d64f3c7`](https://github.com/stdlib-js/stdlib/commit/d64f3c7831c6490eae291c9de253dfc763052fbb) - **feat:** add TypeScript declarations and add REPL help _(by Athan Reines)_
-   [`eb620f1`](https://github.com/stdlib-js/stdlib/commit/eb620f17546a817ffafaec22ff2a3a87994adad9) - **style:** disable lint rule _(by Athan Reines)_
-   [`87c2569`](https://github.com/stdlib-js/stdlib/commit/87c2569eabbb8a173c4f03fcc75cea7a2aebe8cb) - **test:** add constructor and argument validation tests _(by Athan Reines)_
-   [`f1d9cee`](https://github.com/stdlib-js/stdlib/commit/f1d9cee38667941f3483bcce57366e4cfa6e6ac7) - **docs:** fix heading _(by Athan Reines)_
-   [`4433c86`](https://github.com/stdlib-js/stdlib/commit/4433c8677f64ffe451f267484367d3d9f27e32f5) - **feat:** add `ndarray/fancy` _(by Athan Reines)_

</details>

</section>

<!-- /.commits -->

<section class="contributors">

### Contributors

A total of 1 person contributed to this release. Thank you to this contributor:

-   Athan Reines

</section>

<!-- /.contributors -->

</section>

<!-- /.release -->

