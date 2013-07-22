IPT.Class.define('IPT.Toolbar' , {
		 extend : 'IPT.Container',
		 
		 constructor : function(config){
			IPT.Toolbar.callParent(this,config);
		 },
		 

		 methods :  {
			 	 baseCls : "ipt-toolbar",
				 //override
				 initialize : function(config){
				 	IPT.Toolbar.superClass.initialize.call(this,config);
				 	return this;
			 	 },
			 	 
			 	 add : function(items){
			 		if(!(items.isXTypeOf && items.isXTypeOf("button") )){
			 			$.each(items , function(i,item){
			 				item.xtype = "button";
			 			});
			 		}
			 		IPT.Toolbar.superClass.add.call(this,items);
			 	 },
			 	 
			 	 //override
				 initComponent : function(){
					 IPT.Toolbar.superClass.initComponent.call(this);
					 return this;
				 },
				 
				 tpl : function(){
						return '<div class="<%=baseCls%>">' + 
								'<div class="<%=baseCls%>-contentContainer"></div>'+
						'</div>';
				 }
		},

		 statics : {
			    XTYPE : "toolbar"
		 }
 });
IPT.widget.register(IPT.Toolbar.XTYPE, IPT.Toolbar);