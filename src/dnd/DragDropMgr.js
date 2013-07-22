IPT.Class.define('IPT.dnd.DragDropMgr' , {
	 	 singleton : true,
		 
		 constructor : function( source  , handle){
			this.isDragStarting = false;
			this.dragSourceArray = [];
			this.dropTargetArray = [];
		 },
		 
		 methods : {
			 getActivedDragObject : function(){
			 	return this.activeDragObject;
		 	 },
		 	 
		 	 setActivedDragObject : function(object){
		 		 this.activeDragObject = object;
		 		 return this;
		 	 },
		 	 
		 	 getActivedDropObject : function(){
		 		 return this.activeDropObject;
		 	 },
		 	 
		 	 setActivedDropObject : function(object){
		 		 this.activeDropObject = object;
		 		 return this;
		 	 },
		 	 
		 	 getAllDragSource : function(){
		 		 
		 	 },
		 	 
		 	 getAllDropTarget : function(){
		 		 return this.dropTargetArray;
		 	 },
		 	 
		 	 registerDragSource : function(dragSource){
		 		this.dragSourceArray.push(dragSource);
		 		return this;
		 	 },
		 	 
		 	 unRegisterDragSource : function(dragSource){
		 		 //
		 	 },
		 	 
		 	 registerDropTarget : function(dropTarget){
		 		 this.dropTargetArray.push(dropTarget);
		 		 return this;
		 	 },
		 	 
		 	 unRegisterDropTarget : function(dropTarget){
		 		 //
		 		 return this;		 		 
		 	 }
		 }
 });