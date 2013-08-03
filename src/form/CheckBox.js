IPT.Class.define('IPT.form.Checkbox' , {
		 extend : 'IPT.form.ToggleField',
		 constructor : function(config){
			IPT.form.Checkbox.callParent(this,config);
		 },
		 
		 methods : (function(){
			 return {
				 checked : false,
				 baseCls : "ipt-cb",
				 hoverCls : "ipt-cb-hover",
				 pressedCls : "ipt-cb-pressed",
				 focusCls : "ipt-cb-hover",
				 checkedCls : "ipt-cb-checked",
				 
				 
				 initComponent : function(){
					IPT.form.Checkbox.superClass.initComponent.call(this);
					this._initEvent();	
				 },
				 
			 	
				 selected : function(bool){
					var elem = this.getElement();
				 	if(bool){
				 		$(elem).checked(true);
				 		_this.fireEvent(EventObject.CHECK);
				 	}else{
				 		$(elem).checked(false);	
				 		_this.fireEvent(EventObject.UNCHECK);
				 	}
				 	this._selected = bool;
				 	return this;
				 },
			 	
				_initEvent : function(){
						var elem = $(this.getElement()),
							EventObject = IPT.events.EventObject;
					        _this = this;
						
					    elem.bind("mouseover" , function(event){
					    	_this.fireEvent(EventObject.MOUSEOVER);
					    }) ;
					    
						elem.bind("mouseout" , function(event){
						 	_this.fireEvent(EventObject.MOUSEOUT);
						});
						
						elem.bind("mousedown" , function(){
						 	_this.fireEvent(EventObject.MOUSEDOWN);
						});
						
						elem.bind("click" , function(event){
						 	_this.fireEvent(EventObject.CLICK);
						});					
					
						elem.bind("change" , function(event){
						 	_this.fireEvent(EventObject.CHANGE , event);
						 	if($(this).attr("checked")){
						 		_this.fireEvent(EventObject.CHECK , event);
						 	}else{
						 		_this.fireEvent(EventObject.UNCHECK , event);
						 	}
						});
						
						elem.bind("focus" , function(event){
							_this.fireEvent(EventObject.FOCUS , event);
						});
						
						elem.bind("blur" , function(event){
							_this.fireEvent(EventObject.BLUR , event);
						});	
					},
					
			 		tpl : function(){
			 			return ['<input type="checkbox" class="<%=baseCls%>"/>'].join("");
			 		}
			 }
		 })(),
		 
		 statics : {
			 XTYPE : 'checkbox'
		 }
 });