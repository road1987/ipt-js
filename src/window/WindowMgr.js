IPT.Class.define(' IPT.window.WindowMgr ' , {
		 singleton : true,

		 constructor : function(){
			this.windows = {};
		 },

		 methods : {
	 		register : function(window){
				var id = window.getId();
				this.windows[id] = window;	
				return true;
		 	},
		 	 
			unRegister : function(window){
				var id = window.getId();
				this.windows[id] = null;
				delete this.windows[id];
				return true;	 
		 	}
		 },
		 
		 statics : {

		 }
});