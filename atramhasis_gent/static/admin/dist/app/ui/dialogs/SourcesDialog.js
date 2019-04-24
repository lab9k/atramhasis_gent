//>>built
require({cache:{"url:app/ui/dialogs/templates/SourcesDialog.html":'\x3cdiv class\x3d"dijitDialog" role\x3d"dialog" aria-labelledby\x3d"sourcesDialog_title"\x3e\n  \x3cdiv data-dojo-attach-point\x3d"titleBar" class\x3d"dijitDialogTitleBar"\x3e\n    \x3cspan data-dojo-attach-point\x3d"titleNode" class\x3d"dijitDialogTitle" role\x3d"heading"\x3e\x3c/span\x3e\n\t\t\x3cspan data-dojo-attach-point\x3d"closeButtonNode" class\x3d"dijitDialogCloseIcon"\n          data-dojo-attach-event\x3d"ondijitclick: onCancel" title\x3d"Annuleren" role\x3d"button" tabIndex\x3d"-1"\x3e\n\t\t\t\x3cspan data-dojo-attach-point\x3d"closeText" class\x3d"closeText" title\x3d"Annuleren" tabIndex\x3d"-1"\x3e\n        \x3ci class\x3d"fa fa-times"\x3e\x3c/i\x3e\x3c/span\x3e\n\t\t\x3c/span\x3e\n  \x3c/div\x3e\n\n  \x3cdiv data-dojo-attach-point\x3d"containerNode" class\x3d"dijitDialogPaneContent"\x3e\n    \x3cdiv class\x3d"row"\x3e\n      \x3cdiv class\x3d"large-12 columns"\x3e\n        \x3cdiv data-dojo-attach-point\x3d"htmlEditorNode"\x3e\n        \x3c/div\x3e\n      \x3c/div\x3e\n    \x3c/div\x3e\n    \x3cdiv class\x3d"row footerButtons"\x3e\n      \x3cdiv class\x3d"large-12 columns text-center"\x3e\n        \x3ca href\x3d"#" data-dojo-attach-event\x3d"onClick: _okClick" data-dojo-attach-point\x3d"okButtonNode" class\x3d"button tiny"\x3eOk\x3c/a\x3e\n        \x3ca href\x3d"#" data-dojo-attach-event\x3d"onClick: _cancelClick" class\x3d"button tiny"\x3eCancel\x3c/a\x3e\n      \x3c/div\x3e\n    \x3c/div\x3e\n  \x3c/div\x3e\n\x3c/div\x3e'}});
define("app/ui/dialogs/SourcesDialog","dojo/_base/declare dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/Dialog dojo/topic dojo/text!./templates/SourcesDialog.html ../../utils/HtmlEditor ../../utils/DomUtils".split(" "),function(b,c,d,e,f,g,h,k){return b([e,c,d],{templateString:g,parentNode:null,baseClass:"sources-dialog",title:"Add source",source:null,_editor:null,edit:!1,postCreate:function(){this.inherited(arguments);this._editor=new h({},this.htmlEditorNode)},startup:function(){this.inherited(arguments);
this._editor.startup();this._editor.addButtons(["emphasis","strong","link"]);this._editor.setContent("")},setData:function(a){this._editor.setContent(a.citation)},hide:function(){this.inherited(arguments);this.reset()},show:function(a){this.inherited(arguments);this.reset();a?(this.setData(a),this.set("title","Edit source"),this.okButtonNode.innerHTML="Edit",this.edit=!0,this.source=a):(this.set("title","Add new source"),this.okButtonNode.innerHTML="Add",this.edit=!1)},_okClick:function(a){a.preventDefault();
this._validate()?(this.edit?this.emit("edit.source",{citation:this._editor.getContent(),id:this.source.id}):this.emit("add.source",{citation:this._editor.getContent()}),this.hide()):f.publish("dGrowl","Please fill in all fields.",{title:"Invalid source",sticky:!1,channel:"info"})},_cancelClick:function(a){a.preventDefault();this.hide()},reset:function(){this._editor.setContent("")},_validate:function(){return""!==this._editor.getContent().trim()}})});
//# sourceMappingURL=SourcesDialog.js.map