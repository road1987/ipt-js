IPT.Class.define('IPT.form.Radio' , {
		 extend : 'IPT.form.Checkbox',
		 
		 constructor : function(config){
			IPT.form.Radio.callParent(this , config);
		 },
		 
		 methods : {
			baseCls : "ipt-radio",
				
			tpl : function(){
				return  '<input type="radio" class="<%=baseCls%>" />';
			}
		  },
		  
		  statics : {
			  "XTYPE" : "radio"
		 }
 });