IPT.Class.define('IPT.form.TextField' , {
		 extend : 'IPT.form.Field',
		 constructor : function(config){
			IPT.form.TextField.callParent(this, config);
		},
		 
		 methods : {	
			baseCls : "ipt-textfield",
			hoverCls : "ipt-textfield-hover",
			pressedCls : "ipt-textfield-pressed",
			focusCls : "ipt-textfield-hover",
			checkedCls : "ipt-textfield-checked", 
			 
			type : "text",
			placeholder : "",
			
			
			//override
			initComponent : function(){
				IPT.form.TextField.superClass.initComponent.call(this);
				this._initEvent();	
			},
			
			setType : function(type){
 				var textField = this._getTextField();
 				
 				//$(textField).attr("type" , type);
 				textField.type = type;
				this.type = type;
				return this;
			},
			
			getType : function(){
				return this.type;
			},
			
			setPlaceHolder : function(text){
	 			var textField = this._getTextField();
	 				$(textField).attr("placeholder" , text);
				
	 				this.placeholder = text;
				return this;
			},
			
			getPlaceHolder : function(){
				return this.placeholder;
			},
			
			//private
			_onFocus : function(){
				var elem = this._getTextField();
				
				$(elem).addClass(this.focusCls);
				return this;
			},

			_onBlur : function(){
				var elem = this._getTextField();

				$(elem).removeClass(this.focusCls);
				$(elem).removeClass(this.pressedCls);
				return this;
			},

			_initEvent : function(){
				var elem = $(this.getElement()),
					textField = $(this._getTextField()),
					EventObject = IPT.events.EventObject,
			        _this = this;
				
				elem.bind("mousedown" , function(){
					_this.fireEvent(EventObject.CLICK);
				});
				
				elem.bind("click" , function(){
					_this.fireEvent(EventObject.CLICK);
				});					
			
				textField.bind("click" , function(event){
					_this.fireEvent(EventObject.CLICK);
				});
				
				textField.bind("focus" , function(){
					_this._onFocus();
					_this.fireEvent(EventObject.FOCUS);
				});
				
				textField.bind("blur" , function(){
					_this._onBlur();
					_this.fireEvent(EventObject.BLUR);
				});	
			},
			
	 		_getSizeElement : function(){
	 			return this.getElement();
	 		},
	 		
	 		tpl : function(){
	 			return ['<input type="<%=type%>" class="<%=baseCls%>"/>'].join("");
	 		}
		 },
		 
		 statics : {
			 "XTYPE" : "textfield"
		 }
 });