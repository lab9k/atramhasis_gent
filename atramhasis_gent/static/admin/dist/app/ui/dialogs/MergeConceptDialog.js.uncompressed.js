require({cache:{
'url:app/ui/dialogs/templates/MergeConceptDialog.html':"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"mergeConceptDialog_title\">\n  <div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" role=\"heading\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\"\n          data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"Annuleren\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"Annuleren\" tabIndex=\"-1\">\n        <i class=\"fa fa-times\"></i></span>\n\t\t</span>\n  </div>\n\n  <div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\">\n    <div class=\"row\">\n      <div class=\"large-12 columns\" data-dojo-attach-point=\"loadingMatchesContainer\" style=\"height: 250px;\">\n        <h4><i class=\"fa fa-spinner fa-pulse\"></i>&nbsp;&nbsp;Loading matches..</h4>\n      </div>\n      <div class=\"large-12 columns\" data-dojo-attach-point=\"mergeGridContainer\">\n        <div data-dojo-attach-point=\"mergeConceptGridNode\"></div>\n      </div>\n    </div>\n    <div class=\"row footerButtons\">\n      <div class=\"large-12 columns text-center\">\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _okClick\" class=\"button tiny\">Merge</a>\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _cancelClick\" class=\"button tiny\">Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>"}});
define("app/ui/dialogs/MergeConceptDialog", [
  'dojo/_base/declare',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/Dialog',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/topic',
  'dojo/promise/all',
  'dojo/dom-construct',
  'dgrid/OnDemandGrid',
  'dgrid/extensions/DijitRegistry',
  'dgrid/extensions/ColumnResizer',
  'dgrid/Selection',
  'dstore/Memory',
  'dstore/Trackable',
  'dojo/text!./templates/MergeConceptDialog.html'
], function (
  declare,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Dialog,
  array,
  lang,
  topic,
  all,
  domConstruct,
  OnDemandGrid,
  DijitRegistry,
  ColumnResizer,
  Selection,
  Memory,
  Trackable,
  template
) {
  return declare([Dialog, _TemplatedMixin, _WidgetsInTemplateMixin], {

    templateString: template,
    parentNode: null,
    baseClass: 'merge-concept-dialog',
    title: 'Merge concept or collection',
    scheme: null,
    concept: null,
    conceptSchemeController: null,
    _mergeGrid: null,
    _mergeStore: null,

    postCreate: function () {
      this.inherited(arguments);

      this.trackableMemory = declare([Memory, Trackable]);
      this._mergeStore = new this.trackableMemory({ data: [] });
      this._mergeGrid = this._createGrid({
        collection: this._mergeStore
      }, this.mergeConceptGridNode);
    },

    startup: function () {
      this.inherited(arguments);
      this._mergeGrid.startup();
    },

    hide: function () {
      this.inherited(arguments);
    },

    _createGrid: function(options, node) {
      var columns = {
        label: {
          label: ''
        },
        type: {
          label: '',
          formatter: function(value) {
            return value + ' match'
          }
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
        console.log(event.error.message);
      });

      return grid;
    },

    _okClick: function (evt) {
      console.debug('MergeConceptDialog::_okClick');
      evt.preventDefault();

      for (var id in this._mergeGrid.selection) {
        if (this._mergeGrid.selection[id]) {
          selected = this._mergeStore.getSync(id);
        }
      }

      if (selected) {
        this.emit('concept.merge', {
          conceptUri: selected.uri,
          concept: this.concept,
          schemeId: this.scheme
        });
        this.hide();
      } else {
        // do nothing
      }
    },

    show: function(concept, schemeId) {
      this.inherited(arguments);
      this.loadingMatchesContainer.style.display = 'inline-block';
      this.mergeGridContainer.style.display = 'none';
      this.concept = concept;
      this.scheme = schemeId;
      var promises = [];
      var matches = [];
      if (concept.matches) {
        for (var key in concept.matches) {
          if (!concept.matches.hasOwnProperty(key)) {
            continue;
          }
          var matchesList = concept.matches[key];
          array.forEach(matchesList, function(match) {
            promises.push(this.conceptSchemeController.getMatch(match, key).then(lang.hitch(this, function (matched) {
              var data = {
                id: matched.data.id,
                label: matched.data.label,
                uri: matched.data.uri,
                type: matched.type
              };
              matches.push(data);
            })));
          }, this);
        }
      }
      all(promises).then(lang.hitch(this, function() {
        this._mergeStore.setData(matches);
        this._mergeGrid.refresh();
        this.loadingMatchesContainer.style.display = 'none';
        this.mergeGridContainer.style.display = 'inline-block';
      }));
    },

    _cancelClick: function (evt) {
      console.debug('MergeConceptDialog::_cancelClick');
      evt.preventDefault();
      this.hide();
    }
  });
});
