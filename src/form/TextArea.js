IPT.Class.define('IPT.form.TextArea' , {
		 extend : 'IPT.form.TextField',
		 constructor : function(config){
			IPT.form.TextArea.callParent(this , config);
		},
		 
		 methods : {
			baseCls : "ipt-textarea",
			hoverCls : "ipt-textarea-hover",
			pressedCls : "ipt-textarea-pressed",
			focusCls : "ipt-textarea-hover",
			checkedCls : "ipt-textarea-checked",
				
			tpl : function(){
				return  '<textarea class="<%=baseCls%>" ></textarea>';
			}
		  },
		  
		  statics : {
			  "XTYPE" : "textarea"
		 }
 });