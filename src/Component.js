IPT.Class.define('IPT.Component' , {

	     extend : 'IPT.events.EventDispatcher',

		 constructor : function(config){
			IPT.Component.callParent(this);
			this.initialize(config);
			IPT.ComponentMgr.getInstance().register(this);
			this.render();
		 },

		 methods : (function(){
			 var autoid = 1000 ;
			 
			 return {
				id : null,

				cls : null,
				
				top : null,
				
				left : null,
				
				width : "auto",
				
				height : "auto",
				
				minWidth : 0,
				
				minHeight : 0,
				
				listeners : {},
				
				renderTo : null,
				
				mouseOverCls : "ipt-mouse-over", 
				/**
				 * initialize info from config arguments , didn't build relative with dom.
				 * @returns
				 */
				initialize : function(config){
					for(var i in config){
						if(typeof this[i] !== "undefined" && typeof this[i] !== "function"){
							this[i] = config[i];
						}
					}
					for(var i in this.listeners){
						this.addListener(i , this.listeners[i]);
					}
					return true;
				},
				
				/**
				 *	after render , set component property like width , height , cls etc..
				 */
				initComponent : function(){
					this.setWidth(this.width);
					this.setHeight(this.height);
					this.addClass(this.cls);
					this.setPosition(this.left, this.top);	
					return true;
				},
				
				//render the component to the target container/element, and initialize at the first time.
				render : function(component){
					if(!component){
						if(this.renderTo){
							if(this.renderTo.isComponent && this.renderTo.isComponent()){
								this.renderTo.add(this);
							}else{
								//render to html Element, out of control of layout
								var elem = this.getElement();
								$(this.renderTo).append(elem);	
							}
						}else{
							return false;
						}
					}else{
						if(component.isComponent && component.isComponent()){
							component.add(this);
						}else{
							var elem = this.getElement();
							$(component).append(elem);
						}
					}
					
					if(!this._isInitialized){
						this.initComponent();
						this._isInitialized = true;
					}
					return this;
				},
				
				getId : function(){
					return this.id || (this.id = "ipt-comp-" + autoid++);
				},

				getXType : function(){
					return this.constructor.XTYPE;
				},
				
				isXTypeOf : function(type){
					return this.getXType() === type;
				},
				
				addClass : function(className){
					if(!className){
						return false
					};
					var elem = this.getElement();
					$(elem).addClass(className);
					return this;
				},

				removeClass : function(className){
					var elem = this.getElement();
					$(elem).removeClass(className);
					return this;
				},
				
				getSize : function(){
					var elem = this._getSizeElement(),
						width = $(elem).width(),
						height = $(elem).height();
					return {width: width , height: height};
				},

				setSize : function(width , height){
					this.setWidth( width );
					this.setHeight( height );
					this.fireEvent(IPT.events.EventObject.RESIZE);
					return this;
				},
				
				getWidth : function(){
					var elem = this._getSizeElement();
					return $(elem).width();
				},
				
				setWidth : function(width){
					if( width - 0 < this.minWidth - 0){
						width = this.minWidth;
					}
					var elem = this._getSizeElement();
						$(elem).width(width);
					this.fireEvent(IPT.events.EventObject.RESIZE);
					return this;
				},

				getHeight : function(){
					var elem = this._getSizeElement();
					return $(elem).height();			
				},
				
				setHeight : function(height){
					if( height - 0 < this.minHeight - 0){
						height = this.minHeight;
					}
					var elem = this._getSizeElement();
						$(elem).height(height);
					this.fireEvent(IPT.events.EventObject.RESIZE);
					return this;
				},
				
				setPosition : function(left , top){
					if(left && top){
						var elem = this.getElement();
						$(elem).css('position' , 'absolute');
						if($.type(left) == "number" ||  left - 0 ){
							$(elem).css({left:left + 'px' , top : top + 'px'});
						}else{
							$(elem).css({left:left , top : top });					
						}
						return true;
					}
					return false;
				},
				
				setVisible : function(boolean){
					var elem = this._getSizeElement(),
						visible = $.trim(boolean.toString().toLowerCase()) == 'true' ? true : false;
					
					if(visible){
						this.show();
					}else{
						this.hidden();
					}
					return this;
				},
				
				isVisible : function(){
					var elem = this.getElement();
					return $(elem).css('display') == 'none' ? false : true;
				},
				
				//behavior
				focus : function(){
					var focusElement = this._getFocusElement();
						focusElement.focus();
					return this;
				},

				blur : function(){
					var focusElement = this._getFocusElement();
						focusElement.blur();
					return this;
				},

				show : function(){
					var elem = this.getElement();
					$(elem).css("display" , "");
					return this;
				},

				hidden : function(){
					var elem = this.getElement();
					$(elem).css("display" , "none");
					return this;
				},
			
				disable : function(){
					var elem = this._getDisabledElement();
					elem.disabled = true;
					return this;
				},

				enable : function(){
					var elem = this._getDisabledElement();
					elem.disabled = false;
					return this;				
				},

				isEnabled : function(){
					var elem = this._getDisabledElement();
					return elem.disabled ;
				}, 

				destroy : function(){
					var elem = this.getElement();
					$(elem).remove();
					return this;
				},

				getParent : function(){
					
				},
				
				getPrevSibling : function(){
				
				},

				getNextSibling : function(){
				
				},

				getElement : function(){
					if(!this.element){
						var tpl = this.tpl();
							tpl = new IPT.Template(tpl);
						this.element = $(tpl.applyTpl(this)).first().get(0);
					}
					return this.element;
				},
				
				isComponent : function(){
					return true;
				},
				
				//override if there are something change.
				_getFocusElement : function(){
					return this.getElement();
				},
				
				_getSizeElement : function(){
					return this.getElement();
				},
				
				_getDisabledElement : function(){
					return this.getElement();
				}
			 };
		 })(),
		 
		 statics : {
			XTYPE : 'component'
		 }
 });