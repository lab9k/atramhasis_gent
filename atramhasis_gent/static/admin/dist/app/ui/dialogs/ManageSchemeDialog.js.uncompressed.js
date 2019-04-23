require({cache:{
'url:app/ui/dialogs/templates/ManageSchemeDialog.html':"<div>\n  <div class=\"large-12 columns\" style=\"padding-bottom: 20px;\">\n    <div data-dojo-type=\"dijit/layout/TabContainer\"\n         data-dojo-attach-point=\"tabContainer\"\n         data-dojo-props=\"doLayout:false\"\n         class=\"\">\n\n      <div data-dojo-type=\"dijit/layout/ContentPane\"\n           title=\"Labels\"\n           data-dojo-attach-point=\"tabLabels\"\n           data-dojo-props=\"selected:true\">\n        <div data-dojo-attach-point=\"labelsNode\">[ LABELS ]</div>\n      </div>\n\n      <div data-dojo-type=\"dijit/layout/ContentPane\"\n           title=\"Notes\"\n           data-dojo-attach-point=\"tabNotes\">\n        <div data-dojo-attach-point=\"notesNode\">[ NOTES ]</div>\n      </div>\n\n      <div data-dojo-type=\"dijit/layout/ContentPane\"\n           title=\"Sources\"\n           data-dojo-attach-point=\"tabSources\">\n        <div data-dojo-attach-point=\"sourcesNode\">[ SOURCES ]</div>\n      </div>\n      <!--? todo add languages tab -->\n    </div>\n  </div>\n  <div class=\"large-12 columns text-center\" style=\"margin-top: 30px; margin-bottom: 20px;\">\n    <a href=\"#\" class=\"button tiny\" data-dojo-attach-event=\"onClick: _saveScheme\">Save</a>\n    <a href=\"#\" class=\"button tiny\" data-dojo-attach-event=\"onClick: _cancel\">Cancel</a>\n  </div>\n</div>"}});
define("app/ui/dialogs/ManageSchemeDialog", [
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/topic',
  'dojo/dom-attr',
  'dojo/on',
  'dijit/Dialog',
  'dijit/_Widget',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  '../../utils/DomUtils',
  '../managers/LabelManager',
  '../managers/NoteManager',
  '../managers/SourcesManager',
  '../../utils/DomUtils',
  'dojo/text!./templates/ManageSchemeDialog.html',
  'dijit/layout/TabContainer',
  'dijit/layout/ContentPane'
], function (
  declare,
  lang,
  topic,
  domAttr,
  on,
  Dialog,
  _Widget,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  DomUtils,
  LabelManager,
  NoteManager,
  SourcesManager,
  domUtils,
  template
) {
  return declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {

    templateString: template,
    baseClass: 'edit-scheme-dialog',
    dialog: null,
    parent: null,
    scheme: null,
    languageController: null,
    listController: null,
    conceptSchemeController: null,
    _mode: 'edit',

    /**
     * Standaard widget functie
     */
    postCreate: function () {
      this.inherited(arguments);
      this.dialog = new Dialog({
        title: 'Edit scheme',
        style: 'width: 1000px; min-height: 650px;'
        //onHide: lang.hitch(this, function() {
        //  this.parent._closeAddDialog();
        //})
      });
      this.dialog.closeText.innerHTML = '<i class="fa fa-times"></i>';
      this.dialog.set('content', this);

      this._createLabelsTab();
      this._createNotesTab();
      this._createSourcesTab();
    },

    /**
     * Standaard widget functie
     */
    startup: function () {
      this.inherited(arguments);
      this.tabContainer.layout();
      this.dialog.resize();
    },

    /**
     * Toont het dialog
     */
    showDialog: function (scheme, mode) {
      if (mode) {
        this.mode = mode;
      }
      if (scheme) {
        if (scheme.id) {
          this.dialog.set('title', 'Edit <strong>' + scheme.label + '</strong>');
        }
        this.sourcesManager.setConcept(scheme);
        this.labelManager.setConcept(scheme);
        this.noteManager.setConcept(scheme);
        this.scheme = scheme;
      }
      this.dialog.show();
      this.tabContainer.selectChild(this.tabLabels);
      this.tabContainer.layout();
      this.dialog.resize();
    },

    /**
     * Sluit het dialog
     * @private
     */
    _close: function () {
      this._reset();
      this.dialog.hide();
    },

    _saveScheme: function(evt) {
      evt ? evt.preventDefault() : null;
      var scheme = {};

      if (this.scheme) {
        scheme.id = this.scheme.id || undefined;
        scheme.uri = this.scheme.uri || undefined;
      }

      //// mixin tab data
      var labelData = this.labelManager.getData();
      lang.mixin(scheme, labelData);

      var noteData = this.noteManager.getData();
      lang.mixin(scheme, noteData);

      var sourceData = this.sourcesManager.getData();
      lang.mixin(scheme, sourceData);

      if (this._mode === 'add') {
        // emit save event
        this.emit('new.scheme.save', {
          scheme: scheme
        });
      } else {
        this.emit('scheme.save', {
          scheme: scheme
        });
      }
    },

    _cancel: function(evt) {
      evt ? evt.preventDefault() : null;
      this._close();
    },

    _reset: function() {
      this.labelManager.reset();
      this.noteManager.reset();
      this.sourcesManager.reset();
    },

    _createLabelsTab: function(scheme) {
      this.languageController.getLanguageStore().fetch().then(lang.hitch(this, function(languages) {
        this.labelManager = new LabelManager({
          languageController: this.languageController,
          listController: this.listController,
          concept: scheme,
          languageList: languages
        }, this.labelsNode);
        this.labelManager.startup();
      }));
    },

    _createNotesTab: function(scheme) {
      this.languageController.getLanguageStore().fetch().then(lang.hitch(this, function(languages) {
        this.noteManager = new NoteManager({
          languageController: this.languageController,
          listController: this.listController,
          concept: scheme,
          languageList: languages
        }, this.notesNode);
        this.noteManager.startup();
      }));
    },

    _createSourcesTab: function(scheme) {
      this.sourcesManager = new SourcesManager({
        listController: this.listController,
        concept: scheme
      }, this.sourcesNode);
      this.sourcesManager.startup();
    }
  });
});