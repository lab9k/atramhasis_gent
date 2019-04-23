//>>built
define("dijit/form/_SearchMixin","dojo/_base/declare dojo/keys dojo/_base/lang dojo/query dojo/string dojo/when ../registry".split(" "),function(m,f,k,q,n,l,p){return m("dijit.form._SearchMixin",null,{pageSize:Infinity,store:null,fetchProperties:{},query:{},list:"",_setListAttr:function(a){this._set("list",a)},searchDelay:200,searchAttr:"name",queryExpr:"${0}*",ignoreCase:!0,_patternToRegExp:function(a){return RegExp("^"+a.replace(/(\\.)|(\*)|(\?)|\W/g,function(b,a,c,g){return c?".*":g?".":a?a:"\\"+
b})+"$",this.ignoreCase?"mi":"m")},_abortQuery:function(){this.searchTimer&&(this.searchTimer=this.searchTimer.remove());this._queryDeferHandle&&(this._queryDeferHandle=this._queryDeferHandle.remove());this._fetchHandle&&(this._fetchHandle.abort&&(this._cancelingQuery=!0,this._fetchHandle.abort(),this._cancelingQuery=!1),this._fetchHandle.cancel&&(this._cancelingQuery=!0,this._fetchHandle.cancel(),this._cancelingQuery=!1),this._fetchHandle=null)},_processInput:function(a){if(!this.disabled&&!this.readOnly){a=
a.charOrCode;var b=!1;this._prev_key_backspace=!1;switch(a){case f.DELETE:case f.BACKSPACE:b=this._maskValidSubsetError=this._prev_key_backspace=!0;break;default:b="string"==typeof a||229==a}if(b)if(this.store)this.searchTimer=this.defer("_startSearchFromInput",1);else this.onSearch()}},onSearch:function(){},_startSearchFromInput:function(){this._startSearch(this.focusNode.value)},_startSearch:function(a){this._abortQuery();var b=this,h=k.clone(this.query),c={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,
deep:!0}},g=n.substitute(this.queryExpr,[a.replace(/([\\\*\?])/g,"\\$1")]),d,f=function(){var a=b._fetchHandle=b.store.query(h,c);!b.disabled&&!(b.readOnly||d!==b._lastQuery)&&l(a,function(e){b._fetchHandle=null;!b.disabled&&(!b.readOnly&&d===b._lastQuery)&&l(a.total,function(a){e.total=a;var d=b.pageSize;if(isNaN(d)||d>e.total)d=e.total;e.nextPage=function(a){c.direction=a=!1!==a;c.count=d;a?(c.start+=e.length,c.start>=e.total&&(c.count=0)):(c.start-=d,0>c.start&&(c.count=Math.max(d+c.start,0),c.start=
0));0>=c.count?(e.length=0,b.onSearch(e,h,c)):f()};b.onSearch(e,h,c)})},function(a){b._fetchHandle=null})};k.mixin(c,this.fetchProperties);this.store._oldAPI?d=g:(d=this._patternToRegExp(g),d.toString=function(){return g});this._lastQuery=h[this.searchAttr]=d;this._queryDeferHandle=this.defer(f,this.searchDelay)},constructor:function(){this.query={};this.fetchProperties={}},postMixInProperties:function(){if(!this.store){var a=this.list;a&&(this.store=p.byId(a))}this.inherited(arguments)}})});
//# sourceMappingURL=_SearchMixin.js.map