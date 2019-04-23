require({cache:{
'url:app/ui/dialogs/templates/ImportConceptDialog.html':"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"importConceptDialog_title\">\n  <div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n    <span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" role=\"heading\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\"\n          data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"Annuleren\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"Annuleren\" tabIndex=\"-1\">\n        <i class=\"fa fa-times\"></i></span>\n\t\t</span>\n  </div>\n\n  <div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\">\n    <div class=\"row\">\n      <div class=\"large-12 columns\">\n        <p style=\"margin-top: 0; padding-top: 0;\">Select an external scheme and enter a label to search for a match:</p>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"large-6 columns\">\n        <select data-dojo-attach-point=\"externalSchemeSelect\"></select>\n      </div>\n      <div class=\"large-5 columns\">\n        <input type=\"search\" style=\"float: right\" data-dojo-attach-point=\"searchLabelInput\" placeholder=\"Enter a label ..\" />\n      </div>\n      <div class=\"large-1 columns\">\n        <a href=\"#\" class=\"button tiny\" style=\"float: right\" data-dojo-attach-event=\"onClick: _searchConcepts\"><i class=\"fa fa-search\"></i></a>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"large-12 columns\">\n        <div data-dojo-attach-point=\"importConceptGridNode\" style=\"height: 330px; width: 100%\"></div>\n      </div>\n    </div>\n    <div class=\"row footerButtons\">\n      <div class=\"large-12 columns text-center\">\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _okClick\" class=\"button tiny\">Import</a>\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _cancelClick\" class=\"button tiny\">Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>"}});
define("app/ui/dialogs/ImportConceptDialog", [
  'dojo/_base/declare',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/Dialog',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dstore/Memory',
  'dojo/topic',
  'dojo/dom-construct',
  'dgrid/OnDemandGrid',
  'dgrid/extensions/DijitRegistry',
  'dgrid/extensions/ColumnResizer',
  'dgrid/Selection',
  '../../utils/DomUtils',
  'dojo/text!./templates/ImportConceptDialog.html'
], function (
  declare,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Dialog,
  lang,
  array,
  Memory,
  topic,
  domConstruct,
  OnDemandGrid,
  DijitRegistry,
  ColumnResizer,
  Selection,
  domUtils,
  template
) {
  return declare([Dialog, _TemplatedMixin, _WidgetsInTemplateMixin], {

    templateString: template,
    parentNode: null,
    baseClass: 'import-concept-dialog',
    title: 'Choose an external concept',
    conceptSchemeController: null,
    externalSchemeStore: null,
    _importConceptGrid: null,
    _importConceptStore: null,

    postCreate: function () {
      this.inherited(arguments);

      this._importConceptGrid = this._createGrid({
        collection: this._importConceptStore
      }, this.importConceptGridNode);

      // load and set external scheme list
      this.externalSchemeStore.fetch().then(lang.hitch(this, function(externals) {
        domUtils.addOptionsToSelect(this.externalSchemeSelect, {
          data: externals,
          idProperty: 'id',
          labelProperty: 'label'
        });
      }));
    },

    startup: function () {
      this.inherited(arguments);
      this._importConceptGrid.startup();
    },

    reset: function() {
      this.externalSchemeSelect.selectedIndex = 0;
      this._importConceptStore = new Memory({ data: [] });
      this._importConceptGrid.set('collection', this._importConceptStore);
      this.searchLabelInput.value = '';
    },

    hide: function () {
      this.reset();
      this.inherited(arguments);
    },

    _createGrid: function(options, node) {
      var columns = {
        label: {
          label: ''
        },
        id: {
          label: ''
        },
        type: {
          label: ''
        },
        link: {
          label: '',
          renderCell: function(object){
            if (object && object.uri) {
              return domConstruct.create('a', { href: object.uri, target: '_blank', title: object.uri,
                innerHTML: '<i class="fa fa-external-link"></i>' });
            }
          }
        }
      };

      var grid = new (declare([OnDemandGrid, DijitRegistry, ColumnResizer, Selection]))({
        collection: options.collection,
        columns: columns,
        selectionMode: 'single',
        showHeader: false,
        noDataMessage: '',
        loadingMessage: 'Fetching data..'
      }, node);

      grid.on('dgrid-error', function(event) {
         0 && console.log(event.error.message);
      });

      return grid;
    },

    _okClick: function (evt) {
       0 && console.debug('ImportConceptDialog::_okClick');
      evt.preventDefault();

      var selected = null;
      for (var id in this._importConceptGrid.selection) {
        if (this._importConceptGrid.selection[id]) {
          selected = this._importConceptStore.getSync(id);
        }
      }

      if (selected) {
        this.emit('concept.import', {
          concept: selected,
          schemeId: this.externalSchemeSelect.value
        });
        this.hide();
      } else {
        // none selected
        // todo dgrowl
      }
    },

    _cancelClick: function (evt) {
       0 && console.debug('ImportConceptDialog::_cancelClick');
      evt.preventDefault();
      this.hide();
    },

    _searchConcepts: function(evt)  {
      evt ? evt.preventDefault() : null;

      var externalScheme = domUtils.getSelectedOption(this.externalSchemeSelect);
      var searchLabel = this.searchLabelInput.value;

      if (externalScheme && searchLabel && searchLabel !== '') {
        this._loadStore(externalScheme, searchLabel)
      }
    },

    _loadStore: function(externalScheme, searchLabel) {
      this.conceptSchemeController.searchForConcepts(externalScheme, searchLabel).then(lang.hitch(this,
        function(concepts) {
          this._importConceptStore = new Memory({ data: concepts });
          this._importConceptGrid.set('collection', this._importConceptStore);
          this._importConceptGrid.resize();
        }), function(err) {
         0 && console.log(err);
      });
    },

    _validate: function () {
      //return this.auteurInput.value.trim() !== '';
    }
  });
});
