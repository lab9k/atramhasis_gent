//>>built
define("app/utils/DomUtils",["dojo/_base/array","dojo/dom-construct","dojo/_base/lang","dojo/_base/connect"],function(d,e,f,g){return{addOptionsToSelect:function(a,b){d.forEach(b.data,function(c){e.place('\x3coption value\x3d"'+c[b.idProperty]+'"\x3e'+c[b.labelProperty]+"\x3c/option\x3e",a)})},getSelectedOption:function(a){return a.options[a.selectedIndex].value}}});
//# sourceMappingURL=DomUtils.js.map