require({cache:{
'url:app/ui/dialogs/templates/LanguageDialog.html':"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"languageDialog_title\">\n  <div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n    <span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" role=\"heading\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\"\n          data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"Annuleren\" role=\"button\" tabIndex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"Annuleren\" tabIndex=\"-1\">\n        <i class=\"fa fa-times\"></i></span>\n\t\t</span>\n  </div>\n\n  <div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\">\n    <div class=\"row\">\n      <div class=\"large-12 columns\">\n        <div class=\"placeholder-container\">\n          <label for=\"codeInput-${id}\">Code</label>\n          <input type=\"text\" id=\"codeInput-${id}\" data-dojo-attach-point=\"codeInputNode\" />\n        </div>\n        <div class=\"placeholder-container\">\n          <label for=\"descriptionInput-${id}\">Name</label>\n          <input type=\"text\" id=\"descriptionInput-${id}\" data-dojo-attach-point=\"descriptionInputNode\" />\n        </div>\n      </div>\n    </div>\n    <div class=\"row footerButtons\">\n      <div class=\"large-12 columns text-center\">\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _okClick\" data-dojo-attach-point=\"okButtonNode\" class=\"button tiny\">Ok</a>\n        <a href=\"#\" data-dojo-attach-event=\"onClick: _cancelClick\" class=\"button tiny\">Cancel</a>\n      </div>\n    </div>\n  </div>\n</div>"}});
define("app/ui/dialogs/LanguageDialog", [
  'dojo/_base/declare',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/Dialog',
  'dojo/topic',
  'dojo/text!./templates/LanguageDialog.html',
  '../../utils/DomUtils'
], function (
  declare,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Dialog,
  topic,
  template,
  DomUtils
) {
  return declare([Dialog, _TemplatedMixin, _WidgetsInTemplateMixin], {

    templateString: template,
    parentNode: null,
    baseClass: 'language-dialog',
    title: 'Edit language',
    language: null,
    edit: true,

    postCreate: function () {
      this.inherited(arguments);
    },

    startup: function () {
      this.inherited(arguments);

    },

    setData: function(language) {
       0 && console.log(language);
      this.codeInputNode.value = language.id;
      this.descriptionInputNode.value = language.name;
    },

    hide: function () {
      this.inherited(arguments);
      this.reset();
    },

    show: function (language) {
      this.inherited(arguments);
      this.reset();
      if (language) {
        this.setData(language);
        this.set('title', 'Edit language');
        this.okButtonNode.innerHTML = 'Edit';
        this.edit = true;
        this.language = language;
      } else {
        this.set('title', 'Add new language');
        this.okButtonNode.innerHTML = 'Add';
        this.edit = false;
      }
    },

    _okClick: function (evt) {
       0 && console.debug('languageDialog::_okClick');
      evt.preventDefault();
      if (this._validate()) {
        this.language.id = this.codeInputNode.value;
        this.language.name = this.descriptionInputNode.value;
        if (this.edit) {
          this.emit('edit.language', {
            language: this.language
          });
        } else {
          this.emit('add.language', {
            language: this.language
          });
        }
        this.hide();
      } else {
        topic.publish('dGrowl', 'Please fill in at least a language code.', {
          'title': 'Invalid language',
          'sticky': false,
          'channel': 'info'
        });
      }
    },

    _cancelClick: function (evt) {
       0 && console.debug('languageDialog::_cancelClick');
      evt ? evt.preventDefault() : null;
      this.hide();
    },

    reset: function () {
      this.codeInputNode.value = '';
      this.descriptionInputNode.value = '';
    },

    _validate: function () {
      return (this.codeInputNode.value.trim() !== null && this.codeInputNode.value.trim() !== '');
    }
  });
});
