IPT.Class.define('IPT.dnd.DropTarget' , {
		 extend : 'IPT.events.EventDispatcher',
		 
		 constructor : function(target){
			IPT.dnd.DropTarget.callParent(this);
			this.target = target;
			this.state = null;
			IPT.dnd.DragDropMgr.getInstance().registerDropTarget(this);
		 },
		 
		 methods : {
			setCurrentState : function(state){
			 	this.state = state;
		 	},
		 	
		 	getCurrentState : function(){
		 		return this.state;
		 	},
		 	
		 	getTarget : function(){
		 		return this.target;
		 	},
		 	
		 	onDragEnter : function(){
		 		this.fireEvent("dragenter");
		 		return true;
		 	},
		 	
		 	onDragOver : function(){
		 		this.fireEvent("dragover");
		 		return true;
		 	},
		 	
		 	onDragLeave : function(){
		 		this.fireEvent("dragleave");
		 		return true;
		 	},
		 	
		 	onDrop : function(e , source){
		 		this.fireEvent("drop" , e, source);
		 		return true;
		 	}
		 }
 });