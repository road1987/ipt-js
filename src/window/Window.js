IPT.Class.define('IPT.window.Window' , {
		 extend : "IPT.Panel",

		 constructor : function(config){
			IPT.window.Window.callParent(this,config);
			$(this.element).css("zIndex" , "2000");
			IPT.window.WindowMgr.getInstance().register(this);
		 },

		 methods : {
				 baseCls : "ipt-window",
				 collapsible: false,
				 minimizable: false,
				 maximizable: false,
				 closable: true,
				 collapsed: false,
				 minimized: false,
				 maximized: false,
				 closed: false,
				 dragAble : true,
				 modal : false,
				 
				 initialize : function(config){
					IPT.window.Window.superClass.initialize.call(this,config);
					return true;
				 },

				 //override
				 initComponent : function(){
					IPT.window.Window.superClass._initEvent.call(this);
					IPT.window.Window.superClass.initComponent.call(this);
					this._moveToCenter();	
					this.show();
					$(this.getElement()).css("zIndex" , "100000");
					new IPT.dnd.DragSource(this.getElement() , this.getHeaderWrap());
					return true;
				 },
				 
			 	 _moveToCenter : function(){
					var elem = $(this.element),
						size = {width : IPT.Dom.getViewportWidth(), height: IPT.Dom.getViewportHeight()};
				 		position = {
				 			x : (size.width - elem.width())/2,
				 			y : (size.height - elem.height())/3
				 		};
					this.setPosition(position.x , position.y);
					return this;
			 	 },
			 	 
			 	 show : function(){
			 		IPT.window.Window.superClass.show.call(this);
			 		if(this.modal){
			 			this._showMask();
			 		}
			 		return true;
			 	 },
			 	 
			 	 hidden : function(){
			 		IPT.window.Window.superClass.hidden.call(this);
				 	this._hiddenMask();
			 	 },

			 	 destroy : function(){
			 		IPT.window.Window.superClass.destroy.call(this);
					 this._destroyMask();
					 return true;
				 },
				 
				 _initEvent : function(){
					 var _this = this;
					 $(window).bind("resize" , function(){
						_this._adjustMaskSize();
					 });
				 },
				 
			 	 _showMask : function(){
			 		 if(!this.mask){
			 			this.mask = document.createElement("div");
			 			var docSize = {
			 					width : IPT.Dom.getDocumentWidth(),
			 					height : IPT.Dom.getDocumentHeight()
			 				};
			 			$(this.mask).css({
			 				width : docSize.width + "px",
			 				height : docSize.height + "px",
			 				background : "gray",
			 				position : "absolute",
			 				top : "0px",
			 				left : "0px",
			 				zIndex : "1000",
			 				opacity : "0.2"
			 			});
			 			document.body.appendChild(this.mask);
			 		 }else{
			 			$(this.mask).css("display" , "inline");
			 		 }
			 		 return true;
			 	 },
			 	 
			 	 _hiddenMask : function(){
			 		 if(this.mask){
			 			$(this.mask).css("display" , "none");
			 		 }
			 		 return true;
			 	 },
			 	 
			 	 _destroyMask : function(){
			 		 if(this.mask){
				 		$(this.mask).remove();
				 	 }
			 		 return true;
			 	 },
			 	 
			 	 _adjustMaskSize : function(){
			 		 if(this.mask){
				 		var docSize = {
				 			width : IPT.Dom.getDocumentWidth(),
				 			height : IPT.Dom.getDocumentHeight()
				 		};
			 			$(this.mask).css({
			 				width : docSize.width + "px",
			 				height : docSize.height + "px",
			 			});
			 		 }
			 		 return true;
			 	 }
			 }
 });