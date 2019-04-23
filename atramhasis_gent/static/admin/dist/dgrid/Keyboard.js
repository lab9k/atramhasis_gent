//>>built
define("dgrid/Keyboard","dojo/_base/declare dojo/aspect dojo/dom-class dojo/on dojo/_base/lang dojo/has ./util/misc dojo/_base/sniff".split(" "),function(q,m,r,l,n,D,E){function t(a){a.preventDefault()}var F={checkbox:1,radio:1,button:1},u=/\bdgrid-cell\b/,v=/\bdgrid-row\b/,d=q(null,{pageSkip:10,tabIndex:0,keyMap:null,headerKeyMap:null,postMixInProperties:function(){this.inherited(arguments);this.keyMap||(this.keyMap=n.mixin({},d.defaultKeyMap));this.headerKeyMap||(this.headerKeyMap=n.mixin({},d.defaultHeaderKeyMap))},
postCreate:function(){function a(a){var b=a.target;return b.type&&(!F[b.type]||32===a.keyCode)}function c(c){function e(){b._focusedHeaderNode&&(b._focusedHeaderNode.tabIndex=-1);if(b.showHeader){if(h)for(var a=b.headerNode.getElementsByTagName("th"),c=0,g;g=a[c];++c){if(f.test(g.className)){b._focusedHeaderNode=k=g;break}}else b._focusedHeaderNode=k=b.headerNode;k&&(k.tabIndex=b.tabIndex)}}var h=b.cellNavigation,f=h?u:v,d=c===b.headerNode,k=c;d?(e(),m.after(b,"renderHeader",e,!0)):m.after(b,"renderArray",
function(a){var e=b._focusedNode||k;if(f.test(e.className)&&c.contains(e))return a;for(var d=c.getElementsByTagName("*"),h=0,l;l=d[h];++h)if(f.test(l.className)){e=b._focusedNode=l;break}e.tabIndex=b.tabIndex;return a});b._listeners.push(l(c,"mousedown",function(c){a(c)||b._focusOnNode(c.target,d,c)}));b._listeners.push(l(c,"keydown",function(c){if(!c.metaKey&&!c.altKey){var g=b[d?"headerKeyMap":"keyMap"][c.keyCode];g&&!a(c)&&g.call(b,c)}}))}this.inherited(arguments);var b=this;this.tabableHeader&&
(c(this.headerNode),l(this.headerNode,"dgrid-cellfocusin",function(){b.scrollTo({x:this.scrollLeft})}));c(this.contentNode);this._debouncedEnsureScroll=E.debounce(this._ensureScroll,this)},removeRow:function(a){if(!this._focusedNode)return this.inherited(arguments);var c=this,b=document.activeElement===this._focusedNode,g=this[this.cellNavigation?"cell":"row"](this._focusedNode),e=g.row||g,d;a=a.element||a;if(a===e.element){d=this.down(e,!0);if(!d||d.element===a)d=this.up(e,!0);this._removedFocus=
{active:b,rowId:e.id,columnId:g.column&&g.column.id,siblingId:!d||d.element===a?void 0:d.id};setTimeout(function(){c._removedFocus&&c._restoreFocus(e.id)},0);this._focusedNode=null}this.inherited(arguments)},insertRow:function(){var a=this.inherited(arguments);this._removedFocus&&!this._removedFocus.wait&&this._restoreFocus(a);return a},_restoreFocus:function(a){var c=this._removedFocus,b;if((a=(a=a&&this.row(a))&&a.element&&a.id===c.rowId?a:"undefined"!==typeof c.siblingId&&this.row(c.siblingId))&&
a.element){if(!a.element.parentNode.parentNode){c.wait=!0;return}"undefined"!==typeof c.columnId&&(b=this.cell(a,c.columnId))&&b.element&&(a=b);c.active&&0!==a.element.offsetHeight?this._focusOnNode(a,!1,null):(r.add(a.element,"dgrid-focus"),a.element.tabIndex=this.tabIndex,this._focusedNode=a.element)}delete this._removedFocus},addKeyHandler:function(a,c,b){return m.after(this[b?"headerKeyMap":"keyMap"],a,c,!0)},_ensureRowScroll:function(a){var c=this.getScrollPosition().y;c>a.offsetTop?this.scrollTo({y:a.offsetTop}):
c+this.contentNode.offsetHeight<a.offsetTop+a.offsetHeight&&this.scrollTo({y:a.offsetTop-this.contentNode.offsetHeight+a.offsetHeight})},_ensureColumnScroll:function(a){var c=this.getScrollPosition().x,b=a.offsetLeft;if(c>b)this.scrollTo({x:b});else{var g=this.bodyNode.clientWidth;a=a.offsetWidth;var d=b+a;c+g<d&&this.scrollTo({x:g>a?d-g:b})}},_ensureScroll:function(a,c){this.cellNavigation&&((this.columnSets||1<this.subRows.length)&&!c)&&this._ensureRowScroll(a.row.element);this.bodyNode.clientWidth<
this.contentNode.offsetWidth&&this._ensureColumnScroll(a.element)},_focusOnNode:function(a,c,b){var d="_focused"+(c?"Header":"")+"Node",e=this[d],h=this.cellNavigation?"cell":"row",f=this[h](a),s,k,w,x,m;if(a=f&&f.element){if(this.cellNavigation){s=a.getElementsByTagName("input");m=0;for(w=s.length;m<w;m++)if(k=s[m],(-1!==k.tabIndex||"_dgridLastValue"in k)&&!k.disabled){k.focus();x=!0;break}}null!==b&&(b=n.mixin({grid:this},b),b.type&&(b.parentType=b.type),b.bubbles||(b.bubbles=!0));e&&(r.remove(e,
"dgrid-focus"),e.removeAttribute("tabindex"),b&&(b[h]=this[h](e),l.emit(e,"dgrid-cellfocusout",b)));e=this[d]=a;b&&(b[h]=f);d=this.cellNavigation?u:v;!x&&d.test(a.className)&&(a.tabIndex=this.tabIndex,a.focus());r.add(a,"dgrid-focus");b&&l.emit(e,"dgrid-cellfocusin",b);this._debouncedEnsureScroll(f,c)}},focusHeader:function(a){this._focusOnNode(a||this._focusedHeaderNode,!0)},focus:function(a){(a=a||this._focusedNode)?this._focusOnNode(a,!1):this.contentNode.focus()}}),p=d.moveFocusVertical=function(a,
c){var b=this.cellNavigation,d=this[b?"cell":"row"](a),d=b&&d.column.id,e=this.down(this._focusedNode,c,!0);b&&(e=this.cell(e,d));this._focusOnNode(e,!1,a);a.preventDefault()};q=d.moveFocusUp=function(a){p.call(this,a,-1)};var G=d.moveFocusDown=function(a){p.call(this,a,1)},H=d.moveFocusPageUp=function(a){p.call(this,a,-this.pageSkip)},I=d.moveFocusPageDown=function(a){p.call(this,a,this.pageSkip)},y=d.moveFocusHorizontal=function(a,c){if(this.cellNavigation){var b=!this.row(a);this._focusOnNode(this.right(this["_focused"+
(b?"Header":"")+"Node"],c),b,a);a.preventDefault()}},z=d.moveFocusLeft=function(a){y.call(this,a,-1)},A=d.moveFocusRight=function(a){y.call(this,a,1)},B=d.moveHeaderFocusEnd=function(a,c){var b;this.cellNavigation&&(b=this.headerNode.getElementsByTagName("th"),this._focusOnNode(b[c?0:b.length-1],!0,a));a.preventDefault()},J=d.moveHeaderFocusHome=function(a){B.call(this,a,!0)},C=d.moveFocusEnd=function(a,c){var b=this.cellNavigation,d=this.contentNode,e=d.scrollTop+(c?0:d.scrollHeight),d=d[c?"firstChild":
"lastChild"],h=-1<d.className.indexOf("dgrid-preload"),f=h?d[(c?"next":"previous")+"Sibling"]:d,l=f.offsetTop+(c?0:f.offsetHeight),k;if(h){for(;f&&0>f.className.indexOf("dgrid-row");)f=f[(c?"next":"previous")+"Sibling"];if(!f)return}!h||1>d.offsetHeight?(b&&(f=this.cell(f,this.cell(a).column.id)),this._focusOnNode(f,!1,a)):(D("dom-addeventlistener")||(a=n.mixin({},a)),k=m.after(this,"renderArray",function(d){var e=d[c?0:d.length-1];b&&(e=this.cell(e,this.cell(a).column.id));this._focusOnNode(e,!1,
a);k.remove();return d}));e===l&&a.preventDefault()},K=d.moveFocusHome=function(a){C.call(this,a,!0)};d.defaultKeyMap={32:t,33:H,34:I,35:C,36:K,37:z,38:q,39:A,40:G};d.defaultHeaderKeyMap={32:t,35:B,36:J,37:z,39:A};return d});
//# sourceMappingURL=Keyboard.js.map