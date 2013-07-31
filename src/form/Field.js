IPT.Class.define('IPT.form.Field' , {
		 extend : 'IPT.Component',
		 constructor : function(config){
			IPT.form.Field.callParent(this , config);
		},
		 
		methods : {	
			name : "",
			value : "",

			initComponent : function(config){
				IPT.form.Field.superClass.initComponent.call(this ,config);
				this.setInitValue(this.value);
			},
			
			setName : function(name){
				this.name = name;
			},
			
			getName : function(){
				return this.name;
			},
			
			setValue : function(value){
				var elem = this._getTextField();
				$(elem).val(value);
				this.value = value;
				return this;
			},
			
			getValue : function(value){
				return this.value;
			},
			
			setInitValue : function(value){
				this.initValue = value;
				return this;
			},
			
			getInitValue : function(){
				return this.initValue;
			},
			
			reset : function(){
				this.setValue(this.getInitValue());
			},

			//override
			_getTextField : function(){
				return this.element.textField;
			},
			
	 		_getFocusElement : function(){
	 			return this.element.textField;
	 		}
		}
 });