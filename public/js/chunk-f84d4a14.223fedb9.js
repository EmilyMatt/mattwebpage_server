(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f84d4a14"],{3971:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"download"},[e("h1",[t._v("Mew Pew")]),e("h3",{staticClass:"subheader"},[t._v("The space simulator")]),e("br"),e("br"),t._m(0),e("select",{directives:[{name:"model",rawName:"v-model",value:t.os,expression:"os"}],attrs:{id:"selectOS"},on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){var n="_value"in t?t._value:t.value;return n}));t.os=n.target.multiple?e:e[0]}}},[t._m(1),t._m(2)]),e("br"),e("br"),"Windows(x86x64)"==t.os?[e("button",{staticClass:"btn site-btn noanimation",attrs:{type:"button"},on:{click:function(n){return t.downloadMewPew("win")}}},[t._v("Click Here "),e("i",{staticClass:"fab fa-windows"})])]:t._e(),"Linux"==t.os?[e("button",{staticClass:"btn site-btn noanimation",attrs:{type:"button"},on:{click:function(n){return t.downloadMewPew("linux")}}},[t._v("Click Here "),e("i",{staticClass:"fab fa-linux"})])]:t._e()],2)},a=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"banner"},[e("img",{attrs:{src:"img/banner.png"}})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("option",[t._v("Windows(x86x64) "),e("i",{staticClass:"fab fa-windows"})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("option",[t._v("Linux "),e("i",{staticClass:"fab fa-linux"})])}],o=(e("c975"),e("b0c0"),e("6d25")),s=e.n(o),r={name:"download",data:function(){return{os:""}},mounted:function(){s.a.updateButtons(this.pagesList,this.$options.name);var t=navigator.appVersion;-1!=t.indexOf("Win")?this.os="Windows(x86x64)":-1!=t.indexOf("Linux")?this.os="Linux":this.os="none"},methods:{downloadMewPew:function(t){console.log(t);var n=this.$route.params.proxy+"/downloadmewpew";"linux"==t&&(n+="_linux"),window.open(n)}},props:["pagesList"]},c=r,u=(e("5080"),e("2877")),l=Object(u["a"])(c,i,a,!1,null,"25443e1a",null);n["default"]=l.exports},5080:function(t,n,e){"use strict";var i=e("ac03"),a=e.n(i);a.a},"6d25":function(t,n,e){e("4160"),e("159b");var i=function(t,n){t.forEach((function(t){document.getElementById("".concat(t,"Button")).classList.remove("active")})),document.getElementById("".concat(n,"Button")).classList.add("active")},a=function(t){return t<480?"+ 10vw":t<1100?"":"- 17vw"};t.exports={updateButtons:i,reformX:a}},ac03:function(t,n,e){},c975:function(t,n,e){"use strict";var i=e("23e7"),a=e("4d64").indexOf,o=e("a640"),s=e("ae40"),r=[].indexOf,c=!!r&&1/[1].indexOf(1,-0)<0,u=o("indexOf"),l=s("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:c||!u||!l},{indexOf:function(t){return c?r.apply(this,arguments)||0:a(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-f84d4a14.223fedb9.js.map