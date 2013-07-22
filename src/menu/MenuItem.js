IPT.Class.define('IPT.menu.MenuItem' , {
		 extend : 'IPT.button.BaseButton',
		 constructor : function(config){
			IPT.menu.MenuItem.superClass.constructor.call(this,config);
		 },
		 

		 methods : {
			baseCls : "ipt-menuItem",
			hoverCls : "ipt-menuItem-hover",
			pressedCls : "ipt-menuItem-pressed", 
			focusCls : "ipt-menuItem-hover", 
			activedCls : "ipt-menuItem-actived", 
			
			//override
			initialize : function(config){
			  this.constructor.superClass.initialize.call(this , config);
		 	},
		 	
			//override
		 	initComponent : function(){
				IPT.menu.MenuItem.superClass.initComponent.call(this);
				this._initEvent();	
			},
			
			_getSizeElement : function(){
				return $(this.element).find("a")[0];
			},
			
			_getEventElement : function(){
				return $(this.element).find("a")[0];
			},
			
			_getTextField : function(){
				return $(this.element).find("." + this.baseCls + '-text')[0];				
			},

			_getIconField : function(){
				return $(this.element).find("." + this.baseCls + '-icon')[0];
			},
			//private
			_onMouseOver : function(){
				$(this.element).addClass(this.hoverCls);
				return this;
			},
			
			_onMouseOut : function(){
				$(this.element).removeClass(this.hoverCls);
				$(this.element).removeClass(this.pressedCls);
				return this;
			},

			_onMouseDown : function(){
				$(this.element).addClass(this.pressedCls);
				return this;
			},

			_onMouseUp : function(){
				$(this.element).removeClass(this.pressedCls);
				return this;
			},

			_onFocus : function(){
				$(this.element).addClass(this.focusCls);
				return this;
			},

			_onBlur : function(){
				$(this.element).removeClass(this.focusCls);
				$(this.element).removeClass(this.pressedCls);
				return this;
			},
			
			_initEvent : function(){
				var _this = this;
				var EventObject = IPT.events.EventObject;
				var elem = this.element;
				var aLink = this._getEventElement();
				
				$(aLink).bind( "mouseover" , function(){
					_this._onMouseOver.call(_this);
					_this.fireEvent( EventObject.MOUSE_OVER );
					return false;
				});

				$(aLink).bind( "mouseout" , function(){
					_this._onMouseOut.call(_this);
					_this.fireEvent( EventObject.MOUSE_OUT );
					return false;
				});

				$(aLink).bind( "click" , function(event){
					_this.fireEvent( EventObject.CLICK );
				});

				$(aLink).bind( "dblclick" , function(){
					_this.fireEvent(  EventObject.DOUBLE_CLICK  );
				});

				$(aLink).bind(  "mousedown"  , function(event){
					_this._onMouseDown.call(_this);
					IPT.Event.cancelBubble(event);
				});

				$(aLink).bind( "mouseup" , function(){
					_this._onMouseUp.call(_this);
				});

				$(aLink).bind( "focus" , function(){
					_this._onFocus.call(_this);
					_this.fireEvent( EventObject.FOCUS );
				});

				$(aLink).bind( "blur" , function(){
					_this._onBlur.call(_this);
					_this.fireEvent( EventObject.BLUR );
				});
			},
			
			tpl : function(){
				return [
				        '<div class="<%=baseCls%>">' ,
				        	'<a href="#" hidefocus="true">',
				        		'<img class="<%=baseCls%>-icon" src="../../themes/spacer.gif"/>' ,
				        		'<span class="<%=baseCls%>-text">',
				        			'&nbsp;',
				        		'</span>' ,
				        	'</a>',
				        '</div>'].join('');
			}
		 },

		 statics : {
			 XTYPE : "menuItem"
		 }
 });
IPT.widget.menuItem = IPT.menu.MenuItem;