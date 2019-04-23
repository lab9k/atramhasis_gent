//>>built
define("dstore/SimpleQuery",["dojo/_base/declare","dojo/_base/array"],function(n,k){function r(a,b){if(-1<a.indexOf(".")){var d=a.split("."),l=d.length;return function(a){for(var f=0;f<l;f++)a=a&&(b&&a.get?a.get(d[f]):a[d[f]]);return a}}return function(b){return b.get?b.get(a):b[a]}}var p={eq:function(a,b){return a===b},"in":function(a,b){return-1<k.indexOf(b.data||b,a)},ne:function(a,b){return a!==b},lt:function(a,b){return a<b},lte:function(a,b){return a<=b},gt:function(a,b){return a>b},gte:function(a,
b){return a>=b},match:function(a,b,d){return b.test(a,d)},contains:function(a,b,d,l){var e=this;b=b.data?b.data:Array.isArray(b)?b:[b];return k.every(b,function(b){if("object"===typeof b&&b.type){var c=e._getFilterComparator(b.type);return k.some(a,function(a){return c.call(e,a,b.args[1],d,l)})}return-1<k.indexOf(a,b)})}};return n(null,{_createFilterQuerier:function(a){function b(a){var c,g,h=a.type;a=a.args;var e=l._getFilterComparator(h);if(e){var k=a[0],n=r(k,d),m=a[1];m&&m.fetchSync&&(m=m.fetchSync());
return function(a){return e.call(l,n(a),m,a,k)}}switch(h){case "and":case "or":for(var q=0,p=a.length;q<p;q++)g=b(a[q]),c=c?function(a,b){return"and"===h?function(c){return a(c)&&b(c)}:function(c){return a(c)||b(c)}}(c,g):g;return c;case "function":return a[0];case "string":c=l[a[0]];if(!c)throw Error("No filter function "+a[0]+" was found in the collection");return c;case void 0:return function(){return!0};default:throw Error('Unknown filter operation "'+h+'"');}}var d=this.queryAccessors,l=this,
e=b(a);return function(a){return k.filter(a,e)}},_getFilterComparator:function(a){return p[a]||this.inherited(arguments)},_createSelectQuerier:function(a){return function(b){var d=a.length;return k.map(b,a instanceof Array?function(b){for(var e={},f=0;f<d;f++){var c=a[f];e[c]=b[c]}return e}:function(b){return b[a]})}},_createSortQuerier:function(a){var b=this.queryAccessors;return function(d){d=d.slice();d.sort("function"==typeof a?a:function(d,e){for(var f=0;f<a.length;f++){var c,g=a[f];if("function"==
typeof g)c=g(d,e);else{c=g.get||(g.get=r(g.property,b));var g=g.descending,h=c(d);c=c(e);null!=h&&(h=h.valueOf());null!=c&&(c=c.valueOf());c=h===c?0:Boolean(g)===("undefined"===typeof c||null===c&&"undefined"!==typeof h||null!=h&&h<c)?1:-1}if(0!==c)return c}return 0});return d}}})});
//# sourceMappingURL=SimpleQuery.js.map