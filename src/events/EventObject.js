/**
 * @author LiHongChun
 * @date 2012-12-17
 * @version 1.0
 */
IPT.Class.define(' IPT.events.EventObject ' , {
		 constructor : function(){
		 },

		 methods : {
			 
		 },
		 
		 statics : {
			//mouse Event
			CLICK : 'click' , 
			DOUBLE_CLICK : 'dblclick',
			MOUSE_DOWN : 'mousedown',
			MOUSE_MOVE : 'mousemove',
			MOUSE_OVER : 'mouseover',
			MOUSE_OUT : 'mouseout',
			MOUSE_UP : 'mouseup',
			MOUSE_WHEEL : 'mousewheel',
			CONTEXT_MENU : "contextmenu",
			
			//focus Event
			BLUR : 'blur',
			FOCUS : 'focus',
			
			//panel/window event
			COLLAPSED : 'collapsed',
  			EXPANDED : 'expanded',
  			MINIMIZED : 'minimized',
  			MAXIMIZED : 'maximized',
  			CLOSED : 'closed',
  			RESIZE : 'resize',
  				
  			//form event
  			CHECK : "check",
  			UNCHECK : "uncheck",
  			CHANGE : "change",
  			
  			//DnD
			DRAG_START : "dragstart", 
			DRAG : "drag",
			//drop element
			DRAG_ENTER : "dragenter",
			DRAG_LEAVE : "dragleave",
			DRAG_OVER : "dragover",
			DROP : "drop",
			DRAG_END : "dragend",
			//paging
			PAGE_SIZE_CHANGED : "pageindexchanged",
			PAGE_INDEX_CHANGED : "pagesizechanged"
		 }
});