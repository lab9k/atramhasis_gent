//>>built
define("app/controllers/LanguageController","dojo/_base/declare dstore/Rest dstore/Trackable dstore/Cache dstore/Memory dojo/topic".split(" "),function(a,b,c,d,e,f){return a(null,{_target:"/languages",TrackableRest:null,_baseUrl:"",_langStore:null,_langList:null,constructor:function(g){a.safeMixin(this,g);this.TrackableRest=a([b,c])},getLanguageStore:function(){if(!this._langStore){var a=new this.TrackableRest({target:this._baseUrl+this._target,idProperty:"id",sortParam:"sort",useRangeHeaders:!0,
accepts:"application/json"});this._langStore=d.create(a,{cachingStore:new e,isValidFetchCache:!0})}return this._langStore},updateLanguageStore:function(){this.getLanguageStore().invalidate();f.publish("languages.updated")}})});
//# sourceMappingURL=LanguageController.js.map