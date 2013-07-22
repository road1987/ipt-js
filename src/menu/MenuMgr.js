IPT.Class.define('IPT.menu.MenuMgr' , {
		 singleton : true,
		 
		 constructor : function(){
			this.menus = {};
			this.initialize();
 		 },
		 
		 methods : {
 			initialize : function(){
 			 	var _this = this;
 			 	$(document).bind('mousedown' , function(){
 			 		_this.hiddenAll();
 			 	});
 		 	},
 		 	
 			register : function(menu){
				var id = menu.getId();
				this.menus[id] = menu;	
				return this;
 		 	},
 		 	 
 			unRegister : function(menu){
 				var id = menu.getId();
 				this.menus[id] = null;
 				delete this.menus[id];
 				return true;	 
 		 	 },
 		 	 
 			 getMenu : function(id){
 			 	 return this.menus[id] || null;
 		 	 },
 		 	 
 		 	 hiddenAll : function(){
 		 		 for(var i in this.menus){
 		 			 this.menus[i].hidden();
 		 		 }
 		 		 return this;
 		 	 }
		 },
		 
		 statics : {
			 
		 }
 });