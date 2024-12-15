"use strict";var u=function(s,i){return function(){return i||s((i={exports:{}}).exports,i),i.exports}};var m=u(function(wr,N){"use strict";var ne=/^-?[0-9]+$/;N.exports=ne});var y=u(function(mr,A){"use strict";var se=/:/;A.exports=se});var V=u(function(yr,L){"use strict";var oe=require("@stdlib/string-base-trim"),ue=require("@stdlib/string-base-replace"),g=require("@stdlib/slice-multi"),le=require("@stdlib/slice-base-str2multislice"),ce=require("@stdlib/slice-base-seq2multislice"),pe=require("@stdlib/slice-base-str2slice"),c=require("@stdlib/string-format"),ve=m(),de=y();function fe(s,i){var r,a,t,n;if(a=oe(i),t=a[0],t==="S"){if(n=pe(a),n===null)throw new Error(c("invalid operation. Unsupported slice operation. Value: `%s`.",i));n=new g(n)}else if(t==="M"){if(n=le(a),n===null)throw new Error(c("invalid operation. Unsupported slice operation. Value: `%s`.",i))}else if(ve.test(a))n=parseInt(a,10),n=new g(n);else if(de.test(a)){if(r=s.shape,n=ce(a,r,!0),n.code)throw n.code==="ERR_SLICE_INVALID_INCREMENT"?new Error(c("invalid operation. A subsequence increment must be a non-zero integer. Value: `%s`.",i)):n.code==="ERR_SLICE_INVALID_ELLIPSIS"?new Error(c("invalid operation. A subsequence may only include a single ellipsis. Value: `%s`.",i)):n.code==="ERR_SLICE_INVALID_SUBSEQUENCE"?new Error(c("invalid operation. Unsupported slice operation. Value: `%s`.",i)):new RangeError(c("invalid operation. Number of slice dimensions does not match the number of array dimensions. Array shape: (%s). Slice dimensions: %u.",r.join(","),ue(a,/\.\.\.,/,"").split(",").length))}else if(a.length===0||a==="...")n=new g;else throw new Error(c("invalid operation. Unsupported slice operation. Value: `%s`.",i));return n}L.exports=fe});var U=u(function(gr,T){"use strict";var Ee=require("@stdlib/string-base-trim"),he=require("@stdlib/string-base-replace"),b=require("@stdlib/slice-multi"),qe=require("@stdlib/slice-base-str2multislice"),D=require("@stdlib/slice-base-seq2multislice"),we=require("@stdlib/slice-base-str2slice"),l=require("@stdlib/string-format"),me=m();function ye(s,i,r){var a,t,n,e;if(t=Ee(i),n=t[0],n==="S"){if(e=we(t),e===null)throw new Error(l("invalid operation. Unsupported slice operation. Value: `%s`.",i));e=new b(e)}else if(n==="M"){if(e=qe(t),e===null)throw new Error(l("invalid operation. Unsupported slice operation. Value: `%s`.",i))}else if(me.test(t))e=parseInt(t,10),e=new b(e);else if(t.length>0){if(a=s.shape,e=D(t,a,!0),e.code){if(e.code==="ERR_SLICE_INVALID_INCREMENT")throw new Error(l("invalid operation. A subsequence increment must be a non-zero integer. Value: `%s`.",i));if(e.code==="ERR_SLICE_INVALID_ELLIPSIS")throw new Error(l("invalid operation. A subsequence may only include a single ellipsis. Value: `%s`.",i));if(e.code==="ERR_SLICE_INVALID_SUBSEQUENCE")throw new Error(l("invalid operation. Unsupported slice operation. Value: `%s`.",i));if(e.code==="ERR_SLICE_TOO_MANY_DIMENSIONS")throw new RangeError(l("invalid operation. Number of slice dimensions does not match the number of array dimensions. Array shape: (%s). Slice dimensions: %u.",s.shape.join(","),he(t,/\.\.\.,/,"").split(",").length));if(e.code==="ERR_SLICE_OUT_OF_BOUNDS"){if(r)throw new RangeError(l("invalid operation. Slice exceeds array bounds. Array shape: (%s).",a.join(",")));e=D(t,a,!1)}}}else throw new RangeError(l("invalid operation. Number of slice dimensions does not match the number of array dimensions. Array shape: (%s). Slice dimensions: %u.",s.shape.join(","),0));return e}T.exports=ye});var M=u(function(Ir,C){"use strict";var ge=require("@stdlib/string-base-trim"),Ie=require("@stdlib/slice-base-str2multislice"),x=require("@stdlib/slice-base-seq2multislice"),Se=require("@stdlib/slice-base-sargs2multislice"),f=require("@stdlib/string-format"),_e=y();function Re(s,i,r){var a,t,n,e;if(t=ge(i),n=t[0],n==="M"){if(e=Ie(t),e===null)throw new Error(f("invalid operation. Unsupported slice operation. Value: `%s`.",i))}else if(_e.test(t)||t==="..."){if(a=s.shape,e=x(t,a,!0),e.code){if(e.code==="ERR_SLICE_INVALID_INCREMENT")throw new Error(f("invalid operation. A subsequence increment must be a non-zero integer. Value: `%s`.",i));if(e.code==="ERR_SLICE_INVALID_ELLIPSIS")throw new Error(f("invalid operation. A subsequence may only include a single ellipsis. Value: `%s`.",i));if(e.code==="ERR_SLICE_INVALID_SUBSEQUENCE")throw new Error(f("invalid operation. Unsupported slice operation. Value: `%s`.",i));if(e.code==="ERR_SLICE_OUT_OF_BOUNDS"){if(r)throw new RangeError(f("invalid operation. Slice exceeds array bounds. Array shape: (%s).",a.join(",")));e=x(t,a,!1)}}}else if(e=Se(t),e===null)throw new Error(f("invalid operation. Unsupported slice operation. Value: `%s`.",i));return e}C.exports=Re});var I=u(function(Sr,O){"use strict";var Ne=require("@stdlib/utils-properties-in"),Ae=require("@stdlib/array-base-assert-contains").factory,Le=require("@stdlib/ndarray-ctor"),Ve=require("@stdlib/ndarray-defaults"),be=Ae(Ne(new Le("generic",[0],[],[0],0,Ve.get("order"))));O.exports=be});var B=u(function(_r,P){"use strict";var De=require("@stdlib/assert-is-function");function Te(s,i,r){var a=s[i];if(De(a))return t;return a;function t(){var n,e;for(n=[],e=0;e<arguments.length;e++)n.push(arguments[e]);return a.apply(this===r?s:this,n)}}P.exports=Te});var S=u(function(Rr,j){"use strict";var Ue=require("@stdlib/string-base-replace");function xe(s){return Ue(s,/^invalid argument/,"invalid operation")}j.exports=xe});var Q=u(function(Nr,F){"use strict";var Ce=require("@stdlib/ndarray-base-slice"),Me=S();function Oe(s,i,r,a){var t,n;t=!1,n=a(s,i,t);try{return Ce(r,n,t,!1)}catch(e){throw new e.constructor(Me(e.message))}}F.exports=Oe});var z=u(function(Ar,G){"use strict";var Pe=I(),Be=B(),je=Q();function Fe(s){return i;function i(r,a,t){return Pe(a)?Be(r,a,t):je(r,a,t,s)}}G.exports=Fe});var k=u(function(Lr,X){"use strict";function Qe(s,i,r){return s[i]=r,!0}X.exports=Qe});var $=u(function(Vr,Y){"use strict";var Ge=require("@stdlib/ndarray-base-slice-assign"),ze=require("@stdlib/assert-is-ndarray-like"),Xe=require("@stdlib/assert-is-number").isPrimitive,ke=require("@stdlib/assert-is-integer").isPrimitive,We=require("@stdlib/assert-is-complex-like"),Ye=require("@stdlib/ndarray-base-assert-is-complex-floating-point-data-type"),$e=require("@stdlib/ndarray-base-assert-is-floating-point-data-type"),He=require("@stdlib/ndarray-base-assert-is-unsigned-integer-data-type"),Je=require("@stdlib/ndarray-base-assert-is-signed-integer-data-type"),W=require("@stdlib/ndarray-base-assert-is-safe-data-type-cast"),Ke=require("@stdlib/constants-int8-max"),Ze=require("@stdlib/constants-int16-max"),er=require("@stdlib/constants-int32-max"),w=require("@stdlib/ndarray-min-dtype"),rr=require("@stdlib/complex-dtype"),E=require("@stdlib/ndarray-from-scalar"),p=require("@stdlib/string-format"),ir=S();function h(s){return{dtype:s}}function ar(s,i,r,a,t){var n,e,o,v;if(!ze(r))if(o=s.dtype,o==="generic")r=E(r,h(o));else if(Xe(r))if($e(o))r=E(r,h(o));else if(He(o))if(e=w(r),W(e,o))r=E(r,h(o));else throw new TypeError(p("invalid operation. Assigned value cannot be safely cast to the target array data type. Data types: [%s, %s].",e,o));else if(Je(o)){if(!ke(r))throw new TypeError(p("invalid operation. Assigned value cannot be safely cast to the target array data type. Data types: [%s, %s].",w(r),o));if(r<0?e=w(r):r<=Ke?e="int8":r<=Ze?e="int16":r<=er?e="int32":e="float64",W(e,o))r=E(r,h(o));else throw new TypeError(p("invalid operation. Assigned value cannot be safely cast to the target array data type. Data types: [%s, %s].",e,o))}else if(o==="binary")if(e=w(r),e==="uint8")r=E(r,h(o));else throw new TypeError(p("invalid operation. Assigned value cannot be safely cast to the target array data type. Data types: [%s, %s].",e,o));else throw new TypeError(p("invalid operation. Unsupported target array data type. Data type: `%s`.",o));else if(We(r)){if(!Ye(o))throw new TypeError(p("invalid operation. Assigned value cannot be safely cast to the target array data type. Data types: [%s, %s].",rr(r),o));r=E(r,h(o))}else throw new TypeError(p("invalid operation. Assigned value cannot be safely cast to the target array data type. Data types: [%s, %s].",typeof r,o));n=!1,v=t(s,i,n);try{return Ge(r,a,v,n),!0}catch(d){throw new d.constructor(ir(d.message))}}Y.exports=ar});var J=u(function(br,H){"use strict";var tr=I(),nr=k(),sr=$();function or(s){return i;function i(r,a,t,n){return tr(a)?nr(r,a,t):sr(r,a,t,n,s)}}H.exports=or});var te=u(function(Dr,ae){"use strict";var ur=require("@stdlib/utils-define-nonenumerable-read-only-property"),Z=require("@stdlib/ndarray-ctor"),lr=require("@stdlib/utils-inherit"),K=require("@stdlib/proxy-ctor"),ee=V(),re=U(),ie=M(),_=z(),R=J(),cr=_(ee),pr=R(ee),vr=_(re),dr=R(re),fr=_(ie),Er=R(ie);function q(s,i,r,a,t,n,e){var o,v,d;return v=arguments.length,this instanceof q?(Z.call(this,s,i,r,a,t,n,v<7?{}:e),K?(d=r.length,o={},d===0?(o.get=cr,o.set=pr):d===1?(o.get=vr,o.set=dr):(o.get=fr,o.set=Er),new K(this,o)):(console.warn("WARNING: Proxy objects are not supported in the current environment. Some `FancyArray` functionality may not be available."),this)):v<7?new q(s,i,r,a,t,n):new q(s,i,r,a,t,n,e)}lr(q,Z);ur(q,"name","ndarray");ae.exports=q});var hr=te();module.exports=hr;
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
//# sourceMappingURL=index.js.map