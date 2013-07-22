IPT.Class.define('IPT.dnd.DragSource' , {
		 extend : 'IPT.events.EventDispatcher',
		 
		 constructor : function( source  , handle){
		    IPT.dnd.DragSource.callParent(this);
			this.dragSource = source;
			this.dragHandle = handle;
			this.initComponent();
		 },
		 
		 methods : {
			getDragSource : function(){
			 	return this.dragSource; 
		 	},
		 	
		 	getDragHandle : function(){
		 		return this.dragHandle || this.dragSource;
		 	},
		 	
			initialize : function(config){

			},

				 //override
			initComponent : function(){
				this._initEvent();
				return true;
		    },
		 	
		    onDragStart : function(e){
		    	this.fireEvent("dragstart",e);
		    	return true;
		    },
		    
		    onDrag : function(e){
		    	this.fireEvent("drag",e);
		    	return true;
		    },
		    
		    onDragEnd : function(e){
		    	this.fireEvent("dragend",e);
		    	return true;
		    },
		    
		 	_initEvent : function(){
		 		var _this = this,
		 			dragSource = this.getDragSource(),
		 			dragSourcePosition = null;
		 			dragHandle = this.getDragHandle(),
		 			dragDropMgr = IPT.dnd.DragDropMgr.getInstance(),
		 			activedDropObj = null;
		 		
		 		var currentPoint_source = {left : 0 , top : 0 },
		 			currentPoint_mouse = {left : 0 , top : 0 },//initial mouse location;
		 			isMouseIn = IPT.Dom.isMouseIn;
		 		
		 		$(dragHandle).bind("mousedown" , dragStartHandle);
		 		function dragStartHandle(e){
		 		
		 			currentPoint_mouse = { left : e.pageX , top : e.pageY };
		 			currentPoint_source = IPT.Css.getGlobalPosition(dragSource);
		 			dragSourcePosition = $(dragSource).css("position");
		 			$(dragSource).css({
		 				position: "absolute",
		 				left : currentPoint_source.left + "px",
		 				top : currentPoint_source.top + "px"
		 			});
		 			$(document).bind("mousemove" , dragOnHandle);
		 			$(document).bind("mouseup" , dragStopHandle);
		 			IPT.Event.cancelBubble(e);
		 			
		 			_this.onDragStart(e);
		 			$.each(dragDropMgr.getAllDropTarget() , function(){
		 				var isContain = isMouseIn(this.getTarget(), e);
		 				if(isContain){
		 					this.onDragEnter();
		 					this.onDragOver();
		 					dragDropMgr.setActivedDropObject(this);
		 				}
		 			});
		 			return false;
		 		}
		 		
		 		function dragOnHandle(e){
		 			var distance = { 
		 					dx : e.pageX - currentPoint_mouse.left,
		 					dy : e.pageY - currentPoint_mouse.top
		 			};
		 			currentPoint_source = {
		 					left : currentPoint_source.left + distance.dx,
		 					top : currentPoint_source.top + distance.dy 
		 			};

			 		$(dragSource).css({
			 				left : currentPoint_source.left,
			 				top :  currentPoint_source.top
			 		});
		 			
		 			currentPoint_mouse = { left : e.pageX , top : e.pageY };
		 			activedDropObj = dragDropMgr.getActivedDropObject();
		 			
		 			_this.onDrag(e);
		 			if(activedDropObj && !isMouseIn(activedDropObj.getTarget() , e)){
			 			activedDropObj.onDragLeave();
		 			}
		 			$.each(dragDropMgr.getAllDropTarget() , function(){
		 				var isContain = isMouseIn(this.getTarget(), e);
		 				if(isContain){
		 					if(activedDropObj !== this){
		 						this.onDragEnter();
		 					}
		 					this.onDragOver();
		 					dragDropMgr.setActivedDropObject(this);
		 				}
		 			});
		 			return true;
		 		}
		 		
		 		function dragStopHandle(e){
			 		$(dragSource).css({
			 				left : currentPoint_source.left,
			 				top :  currentPoint_source.top
			 		});
		 			$(document).unbind("mousemove" , dragOnHandle);
		 			$(document).unbind("mouseup" , dragStopHandle);	
		 			var dropObject = dragDropMgr.getActivedDropObject();
		 			if(dropObject){
		 				dropObject.onDrop(e,dragSource);
		 			}
		 			
		 			$(dragSource).css("position" , dragSourcePosition);
		 			dragDropMgr.setActivedDragObject(null);
		 			dragDropMgr.setActivedDropObject(null);
		 			_this.onDragEnd(e);
		 			return false;
		 		}
		 	}
		 }
 });