//>>built
define("dstore/Tree",["dojo/_base/declare"],function(b){return b(null,{constructor:function(){this.root=this},mayHaveChildren:function(a){return"hasChildren"in a?a.hasChildren:!0},getRootCollection:function(){return this.root.filter({parent:null})},getChildren:function(a){return this.root.filter({parent:this.getIdentity(a)})}})});
//# sourceMappingURL=Tree.js.map