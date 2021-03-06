require({cache:{
'url:app/ui/dialogs/templates/AddRelationDialog.html':"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"addRelationDialog_title\">\n  <div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" role=\"heading\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\"\n          data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"Annuleren\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"Annuleren\" tabIndex=\"-1\">\n        <i class=\"fa fa-times\"></i></span>\n\t\t</span>\n  </div>\n\n  <div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\">\n    <div class=\"row\">\n      <div class=\"large-12 columns\">\n        <div data-dojo-attach-point=\"addRelationContainerNode\" style=\"height: 330px; overflow-y: scroll; width: 100%\"></div>\n      </div>\n    </div>\n    <div class=\"row footerButtons\">\n      <div class=\"large-12 columns text-center\">\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _okClick\" class=\"button tiny\">Add</a>\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _cancelClick\" class=\"button tiny\">Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>"}});
define("app/ui/dialogs/AddRelationDialog", [
  'dojo/_base/declare',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/Dialog',
  'dijit/tree/ObjectStoreModel',
  'dstore/legacy/DstoreAdapter',
  'dijit/Tree',
  'dojo/_base/array',
  'dojo/topic',
  'dojo/dom-construct',
  'dojo/text!./templates/AddRelationDialog.html'
], function (
  declare,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Dialog,
  ObjectStoreModel,
  DstoreAdapter,
  Tree,
  array,
  topic,
  domConstruct,
  template
) {
  return declare([Dialog, _TemplatedMixin, _WidgetsInTemplateMixin], {

    templateString: template,
    parentNode: null,
    baseClass: 'relation-dialog',
    title: 'Add a relation',
    scheme: null,
    concept: null,
    relationStore: null,
    _tree: null,
    _myRelation: null,

    postCreate: function () {
      this.inherited(arguments);
    },

    startup: function () {
      this.inherited(arguments);
    },

    hide: function () {
      this.inherited(arguments);
    },

    setScheme: function(scheme) {
      if (scheme) {
        this.scheme = scheme;
      }
    },

    _okClick: function (evt) {
       0 && console.debug('RelationDialog::_okClick');
      evt.preventDefault();

      var sel = this._tree.selectedItems[0];
      if (sel) {
        if (this.concept && sel.concept_id === this.concept.id) {
          topic.publish('dGrowl', 'Concept or collection cannot be related to itself', {
            'title': 'Not valid',
            'sticky': true,
            'channel': 'error'
          });
        }
        else {
          var path = array.map(this._tree.get('path'), function (item) {
            if (item) {
              return item.label;
            }
            return '';
          });
          //self._addRelation(sel.concept_id, sel.label, sel.label,);
          this.emit('ok', {
            conceptId: sel.concept_id,
            conceptLabel: sel.label,
            conceptPath: path,
            relation: this._myRelation
          });
          this.hide();
        }
      }
      else {
        topic.publish('dGrowl', 'Nothing is selected', {'title': 'Not valid', 'sticky': true, 'channel':'error'});
      }
    },

    show: function(relationTypeStore, relationStore) {
      this.inherited(arguments);
      this._myRelation = relationTypeStore;
      this.relationStore = relationStore;
      var self = this;
      domConstruct.empty(this.addRelationContainerNode);

      var objectModel = new ObjectStoreModel({
        store: this.relationStore,
        mayHaveChildren: function (object) {
          return (object.children && object.children.length > 0)
        },
        getRoot: function (onItem) {
          //create artificial scheme root to support trees with multiple root items
          var children = this.store.query(this.query);
          var root = {concept_id: '-1', type: 'collection', label: self.scheme, id: '-1', children: children};
          onItem(root);
        }
      });
      this._tree = new Tree({
        model: objectModel,
        showRoot: false,
        getIconClass: function (/*dojo.store.Item*/ item, /*Boolean*/ opened) {
          if (item.type == 'collection') {
            return (opened ? "dijitFolderOpened" : "dijitFolderClosed");
          } else {
            return "dijitLeaf";
          }
        },
        getLabel: function (/*dojo.store.Item*/ item) {
          return item.label;
        },
        dndParams: ["onDndDrop", "itemCreator", "onDndCancel", "checkAcceptance", "checkItemAcceptance", "dragThreshold", "betweenThreshold", "singular"],
        singular: true
      }).placeAt(this.addRelationContainerNode);
    },

    _cancelClick: function (evt) {
       0 && console.debug('RelationDialog::_cancelClick');
      evt.preventDefault();
      this.hide();
    }
  });
});
