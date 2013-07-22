IPT.Class.define('IPT.button.Button' , {
		 extend : 'IPT.button.BaseButton',
		 constructor : function(config){
			IPT.button.Button.callParent(this,config);
			this.enableToggle = true;
			this.render();
		 },
		 

		 methods : {
			baseCls :"ipt-btn",
			hoverCls : "ipt-btn-hover",
			pressedCls : "ipt-btn-pressed",
			focusCls : "ipt-btn-hover",
			
			//override
			initComponent : function(){
				IPT.button.Button.superClass.initComponent.call(this);
				this._initEvent();	
			},
			
			//override
			setIconClass : function(iconCls){
				if(!iconCls){
					return false;
				}
				var iconField = $(this._getIconField()),
					textField = $(this._getTextField());
				if(this.iconCls){
					iconField.removeClass(this.iconCls);
				}
				iconField.addClass(iconCls);
				this.iconCls = iconCls;
				textField.css({
					'padding-left' : iconField.width() + 'px',
					'height' : iconField.height() + 'px',
					'lineHeight' : iconField.height() + 'px'
				});
				return this;
			},
			
			setTooltip : function(toolTip){
				this.toolTip = toolTip;
				return this;
			},

			removeToolTip : function(){
				this.toolTip = null;
				return this;
			},

			showToolTip : function(){
				this.toolTip.show();
			},
			
			//override
			showMenu : function(){
				this.constructor.superClass.showMenu.call(this, "V");
				return this;
			},
			
			//override
			_getFocusElement : function(){
				var elem = this.getElement();
				return $(elem).find("button").get(0);
			},
			
			_getSizeElement : function(){
				var elem = this.getElement();
				return $(elem).find("button").get(0);
			},
			
			_getDisabledElement : function(){
				var elem = this.getElement();
				return $(elem).find("button").get(0);
			},
			
			_getTextField : function(){
				var elem = this.getElement();
				return $(elem).find(".ipt-btn-text").get(0);
			},
			
			_getIconField : function(){
				var elem = this.getElement();
				return $(elem).find(".ipt-btn-icon").get(0);
			},
			
			//private
			_onMouseOver : function(){
				var elem = this.getElement();
				$(elem).addClass(this.hoverCls);
				return this;
			},

			_onMouseOut : function(){
				var elem = this.getElement();
				$(elem).removeClass(this.hoverCls);
				$(elem).removeClass(this.pressedCls);
				return this;
			},

			_onMouseDown : function(){
				var elem = this.getElement();
				$(elem).addClass(this.pressedCls);
				return this;
			},

			_onMouseUp : function(){
				var elem = this.getElement();
				$(elem).removeClass(this.pressedCls);
				return this;
			},

			_onFocus : function(){
				var elem = this.getElement();
				$(elem).addClass(this.focusCls);
				return this;
			},

			_onBlur : function(){
				var elem = this.getElement();
				$(elem).removeClass(this.focusCls);
				$(elem).removeClass(this.pressedCls);
				return this;
			},

			_initEvent : function(){
				var _this = this , elem = this.getElement() , button = $(elem).find("button").get(0);
				$(button).bind('mouseover' , function(){
					_this._onMouseOver.call(_this);
					_this.fireEvent('mouseover');
					return false;
				});

				$(button).bind('mouseout' , function(){
					_this._onMouseOut.call(_this);
					_this.fireEvent('mouseout');
					return false;
				});

				$(button).bind('click' , function(){
					_this.fireEvent('click');
				});

				$(button).bind('dblclick' , function(){
					_this.fireEvent('dblclick');
				});

				$(button).bind('mousedown' , function(){
					_this._onMouseDown.call(_this);
				});

				$(button).bind('mouseup' , function(){
					_this._onMouseUp.call(_this);
				});

				$(button).bind('focus' , function(){
					_this._onFocus.call(_this);
				});

				$(button).bind('blur' , function(){
					_this._onBlur.call(_this);
				});
			},
			
			tpl :function(){
				return ['<div class="<%=baseCls%>">' ,
						 	'<span class="ipt-btn-arrow ipt-btn-arrow-bottom">',
						 		'<button autocomplete="off" role="button" hidefocus="true" type="button">' ,
						 			'<span class="ipt-btn-text">&nbsp;</span>' ,
						 			'<span class="ipt-btn-icon">&nbsp;</span>' ,
						 		'</button>',
						    '</span>',
						 '</div>'].join("");
			}
		 },
		 
		 statics : {
			 XTYPE : "button"
		 }
 });
IPT.widget.register(IPT.button.Button.XTYPE, IPT.button.Button);