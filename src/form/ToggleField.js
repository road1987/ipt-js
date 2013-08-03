IPT.Class.define('IPT.form.ToggleField' , {
		 extend : 'IPT.form.Field',
		 constructor : function(config){
			IPT.form.ToggleField.callParent(this , config);
		},
		 
		 methods : {
			_selected : false,
			 
			isSelected : function(){
				return this._selected;
			},
			
			selected : function(bool){
				throw new Error("ToggleField checked method!");
				return this;
			},
			
			toggle : function(){
				this.selected(!this._selected);
				return this;
			}
		 }
 });