IPT.Class.define('IPT.form.Label' , {
		 extend : 'IPT.Component',
		 constructor : function(config){
			IPT.form.Label.callParent(this,config);
		 },
		 
		 methods : {
			 baseCls : "ipt-label",
			 forId : "", 
			 text : "",
			 
			 initComponent : function(){
				IPT.form.Label.superClass.initComponent.call(this);
				this.setForId(this.forId);
				this.setText(this.text);
			 },
			 
			 //override addClass
			 addClass : function(className){
				var elem = this.getElement();
				$(elem).addClass(className);
				return this;
			 },
			
			 setForId : function(id){
				var elem = this.getElement();
					$(elem).attr('for' , id);
					this.forId = id;
				return this;
			 },
				
			 getForId : function(){
				return this.forId;
			 },
				
			 getText : function(){
				return this.text;
			 },
				
			 setText : function(text){
				var elem = this.getElement();
				$(elem).html(text);
				this.text = text;
				return this;
			 },
			 
			 tpl : function(){
					return '<label class="<%=baseCls%>"></label>';
			 }
		 },

		 statics : {
			 XTYPE : 'label'
		 }
 });