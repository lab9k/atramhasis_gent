//>>built
define("dijit/form/TimeTextBox",["dojo/_base/declare","dojo/keys","dojo/_base/lang","../_TimePicker","./_DateTimeTextBox"],function(b,e,f,c,d){return b("dijit.form.TimeTextBox",d,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:c,_selector:"time",value:new Date(""),maxHeight:-1,_onInput:function(){this.inherited(arguments);var a=this.get("displayedValue");this.filterString=a&&!this.parse(a,this.constraints)?a.toLowerCase():"";this._opened&&this.closeDropDown();this.openDropDown()}})});
//# sourceMappingURL=TimeTextBox.js.map