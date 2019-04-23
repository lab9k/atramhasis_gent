require({cache:{
'url:app/ui/dialogs/templates/NotesDialog.html':"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"notesDialog_title\">\n  <div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n    <span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" role=\"heading\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\"\n          data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"Annuleren\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"Annuleren\" tabIndex=\"-1\">\n        <i class=\"fa fa-times\"></i></span>\n\t\t</span>\n  </div>\n\n  <div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\">\n    <div class=\"row\">\n      <div class=\"large-6 columns\">\n        <div class=\"placeholder-container\">\n          <label for=\"typeSelectNode-${id}\">Type</label>\n          <select id=\"typeSelectNode-${id}\" data-dojo-attach-point=\"typeSelectNode\"></select>\n        </div>\n      </div>\n      <div class=\"large-6 columns\">\n        <div class=\"placeholder-container\">\n          <label for=\"langSelectNode-${id}\">Language</label>\n          <select id=\"langSelectNode-${id}\" data-dojo-attach-point=\"langSelectNode\"></select>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"large-12 columns\">\n        <div data-dojo-attach-point=\"htmlEditorNode\">\n        </div>\n      </div>\n    </div>\n    <div class=\"row footerButtons\">\n      <div class=\"large-12 columns text-center\">\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _okClick\" data-dojo-attach-point=\"okButtonNode\" class=\"button tiny\">Ok</a>\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _cancelClick\" class=\"button tiny\">Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>"}});
define("app/ui/dialogs/NotesDialog", [
  'dojo/_base/declare',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/Dialog',
  'dojo/topic',
  'dojo/dom-construct',
  'dojo/text!./templates/NotesDialog.html',
  '../../utils/HtmlEditor',
  '../../utils/DomUtils'
], function (
  declare,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Dialog,
  topic,
  domConstruct,
  template,
  HtmlEditor,
  DomUtils
) {
  return declare([Dialog, _TemplatedMixin, _WidgetsInTemplateMixin], {

    templateString: template,
    parentNode: null,
    baseClass: 'notes-dialog',
    title: 'Add note',
    note: null,
    typeList: null,
    langList: null,
    _editor: null,
    edit: false,

    postCreate: function () {
      this.inherited(arguments);
      this._editor = new HtmlEditor({}, this.htmlEditorNode);
      DomUtils.addOptionsToSelect(this.typeSelectNode, {
        data: this.typeList,
        idProperty: 'value',
        labelProperty: 'label'
      });
      DomUtils.addOptionsToSelect(this.langSelectNode, {
        data: this.langList,
        idProperty: 'id',
        labelProperty: 'name'
      });
    },

    startup: function () {
      this.inherited(arguments);
      this._editor.startup();
      this._editor.addButtons(['emphasis', 'strong', 'link']);
      this._editor.setContent('');
    },

    setData: function(note) {
      this._editor.setContent(note.note);
      this.langSelectNode.value = note.language;
      this.typeSelectNode.value = note.type;
    },

    hide: function () {
      this.inherited(arguments);
      this.reset();
    },

    show: function (note) {
      this.inherited(arguments);
      this.reset();
      if (note) {
        this.setData(note);
        this.set('title', 'Edit note');
        this.okButtonNode.innerHTML = 'Edit';
        this.edit = true;
        this.note = note;
      } else {
        this.set('title', 'Add new note');
        this.okButtonNode.innerHTML = 'Add';
        this.edit = false;
      }
    },

    updateLanguages: function(langs) {
      // update languagelist and refresh select list
      this.langList = langs;
      domConstruct.empty(this.langSelectNode);
      DomUtils.addOptionsToSelect(this.langSelectNode, {
        data: this.langList,
        idProperty: 'id',
        labelProperty: 'name'
      });
    },

    _okClick: function (evt) {
       0 && console.debug('NotesDialog::_okClick');
      evt.preventDefault();
      if (this._validate()) {
        if (this.edit) {
          this.emit('edit.note', {
            note: this._editor.getContent(),
            lang: this.langSelectNode.value,
            noteType: this.typeSelectNode.value,
            id: this.note.id
          });
        } else {
          this.emit('add.note', {
            note: this._editor.getContent(),
            lang: this.langSelectNode.value,
            noteType: this.typeSelectNode.value
          });
        }
        this.hide();
      } else {
        topic.publish('dGrowl', 'Please fill in all fields.', {
          'title': 'Invalid note',
          'sticky': false,
          'channel': 'info'
        });
      }
    },

    _cancelClick: function (evt) {
       0 && console.debug('NotesDialog::_cancelClick');
      evt.preventDefault();
      this.hide();
    },

    reset: function () {
      this._editor.setContent('');
      this.langSelectNode.selectedIndex = 0;
      this.typeSelectNode.selectedIndex = 0;
    },

    _validate: function () {
      return this._editor.getContent().trim() !== '';
    }
  });
});
