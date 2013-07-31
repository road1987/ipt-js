IPT.Class.define('IPT.form.File' , {
		 extend : 'IPT.form.Field',
		 constructor : function(config){
			IPT.form.File.callParent(this, config);
		 },
		 
		 methods : {	
			baseCls :"ipt-file",
			
			hoverCls : "ipt-btn-hover",
			pressedCls : "ipt-btn-pressed",
			focusCls : "ipt-btn-hover",
	 		
			
			//override
			initComponent : function(){
				IPT.form.File.superClass.initComponent.call(this);
				this._initEvent();	
			},
			
			
	 		getValue : function(){
	 			return $(this._getValueField()).val();
	 		},
	 		
	 		setValue : function(){
	 			var value =  $(this._getValueField()).val();;
	 			
	 			$(this._getTextField()).val(value);
	 			return this;
	 		},
	 		
			//private
			_onMouseOver : function(){
				$(this.element.btnElem).addClass(this.hoverCls);
				return this;
			},
			
			_onMouseOut : function(){
				$(this.element.btnElem).removeClass(this.hoverCls);
				$(this.element.btnElem).removeClass(this.pressedCls);
				return this;
			},

			_onMouseDown : function(){
				$(this.element.btnElem).addClass(this.pressedCls);
				return this;
			},

			_onMouseUp : function(){
				$(this.element.btnElem).removeClass(this.pressedCls);
				return this;
			},

			_onFocus : function(){
				$(this.element.btnElem).addClass(this.focusCls);
				return this;
			},

			_onBlur : function(){
				$(this.element.btnElem).removeClass(this.focusCls);
				$(this.element.btnElem).removeClass(this.pressedCls);
				return this;
			},

			_initEvent : function(){
				var _this = this , 
					valueField = this._getValueField() ,
					EventObject = IPT.events.EventObject;
						
				$(valueField).bind('mouseover' , function(){
					_this._onMouseOver.call(_this);
					_this.fireEvent(EventObject.MOUSE_OVER);
					return false;
				});

				$(valueField).bind('mouseout' , function(){
					_this._onMouseOut.call(_this);
					_this.fireEvent(EventObject.MOUSE_OUT);
					return false;
				});

				$(valueField).bind('click' , function(){
					_this.fireEvent(EventObject.CLICK);
				});

				$(valueField).bind('dblclick' , function(){
					_this.fireEvent(EventObject.DOUBLE_CLICK);
				});

				$(valueField).bind('mousedown' , function(){
					_this._onMouseDown.call(_this);
				});

				$(valueField).bind('mouseup' , function(){
					_this._onMouseUp.call(_this);
				});

				$(valueField).bind('focus' , function(){
					_this._onFocus.call(_this);
				});

				$(valueField).bind('blur' , function(){
					_this._onBlur.call(_this);
				});
				
				$(valueField).bind('change', function(){
					_this.setValue();
				});
			},
			
			
			_getTextField : function(){
				return $(this.getElement()).find(".ipt-file-textfield").get(0);
			},
			
			_getValueField : function(){
				return $(this.getElement()).find(".ipt-file-valuefield").get(0);				
			},
			
			
			tpl : function(){
				return ['<div class="<%=baseCls%>">',
				        	'<input type="text" readonly="" class="ipt-file-textfield"/>',
				              '<div class="ipt-btn ipt-btn-default">',
					              '<span class="ipt-btn-arrow ipt-btn-arrow-bottom">',
											'<button autocomplete="off" role="button" hidefocus="true" type="button">' ,
												'<span class="ipt-btn-text">choose...</span>' ,
												'<span class="ipt-btn-icon">&nbsp;</span>' ,
											'</button>',
								            '<input type="file" hidefocus="true" class="ipt-file-valuefield"/>',
								  '</span>',				        	
							  '</div>',
				        '<div>'].join('');
			}
		 },
		 
		 statics : {
			 "XTYPE" : "file"
		 }
 });