//>>built
define("app/controllers/ConceptSchemeController","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/request/xhr dojo/Deferred dojo/store/JsonRest dojo/store/Cache dojo/store/Memory dstore/Memory dojo/json".split(" "),function(g,h,f,e,k,l,m,n,p,q){return g(null,{conceptSchemeList:null,externalSchemeStore:null,_target:"/conceptschemes",_stores:{},constructor:function(a){g.safeMixin(this,a);this.conceptSchemeList=[]},getConceptSchemes:function(){return e.get(this._target,{handleAs:"json",headers:{"Content-Type":"application/json",
Accept:"application/json"}})},getConceptScheme:function(a){return e.get(this._target+"/"+a,{handleAs:"json",headers:{"Content-Type":"application/json",Accept:"application/json"}})},editConceptScheme:function(a){var b=q.stringify(a);return e(this._target+"/"+a.id,{handleAs:"json",method:"PUT",data:b,headers:{"Content-Type":"application/json",Accept:"application/json"}})},loadConceptSchemeStores:function(){return this.getConceptSchemes().then(h.hitch(this,function(a){var b=[];f.forEach(a,h.hitch(this,
function(a){-1==f.indexOf(a.subject,"external")?this.conceptSchemeList.push({name:a.label,id:a.id}):b.push(a)}));this.externalSchemeStore=new p({idProperty:"id",data:b})}))},getConceptSchemeTree:function(a){return new m(new l({target:"/conceptschemes/"+a+"/tree",getChildren:function(a){return a.children||[]}}),new n)},getMatch:function(a,b){var d=this;return e.get("/uris/"+a,{handleAs:"json",headers:{Accept:"application/json"}}).then(function(c){var r=c.id;return d.getConcept(c.concept_scheme.id,
a).then(function(c){return{type:b,data:{id:r,label:d._getPrefLabel(c.labels,"en"),uri:a}}},function(a){throw a;})},function(a){throw a;})},getMergeMatch:function(a){var b=this;return e.get("/uris/"+a,{handleAs:"json",headers:{Accept:"application/json"}}).then(function(d){return b.getConcept(d.concept_scheme.id,a).then(function(a){return{labels:a.labels,notes:a.notes}},function(a){throw a;})},function(a){throw a;})},getConcept:function(a,b){var d=new k,c=b.split("/").pop();(!a||!c)&&d.reject("Malformed external scheme URI");
e.get("/conceptschemes/"+a+"/c/"+c,{handleAs:"json",headers:{Accept:"application/json"}}).then(function(a){var c={label:a.label,labels:a.labels,type:a.type,notes:a.notes};"collection"!=a.type&&(c.matches={exact:[b]});d.resolve(c)},function(a){d.reject(a)});return d},_getPrefLabel:function(a,b){var d=f.filter(a,function(a){return"prefLabel"==a.type});if(0==d.length)return a[0].label;var c=f.filter(a,function(a){return a.language==b});return 0==c.length?d[0].label:c[0].label},getExternalSchemeStore:function(){return this.externalSchemeStore?
this.externalSchemeStore:null},searchForConcepts:function(a,b){return e.get("/conceptschemes/"+a+"/c?label\x3d"+b+"\x26type\x3dall\x26sort\x3d+label",{handleAs:"json",headers:{Accept:"application/json"}})}})});
//# sourceMappingURL=ConceptSchemeController.js.map