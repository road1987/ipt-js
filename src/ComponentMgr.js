IPT.Class.define('IPT.ComponentMgr' , {

		 singleton : true,

		 constructor : function(){
			this.components = {};
		 },

		 methods : {
			register : function(component){
				var id = component.getId();
				this.components[id] = component;
			},

			unRegister : function(component){
				var id = component.getId();
				this.components[id] = null;
				delete this.components[id];
				return true;
			},

			get: function(id){
				return this.components[id];
			}, 
			 
			getAll : function(){
				return this.components;
			},
			
			each : function(fun){
				$.each(this.components , fun);
			}
		 },

		 statics : {
			
		 }
 });