IPT.Class.define('IPT.button.BaseButton' , {
		 extend : 'IPT.Component',
		 constructor : function(config){
			IPT.button.BaseButton.callParent(this,config);
		 },

		 methods :  {
				 text : "button",
				 
				 iconCls : null,
				 
				 selected : false,
				 
				 disabled : false,
				 
				 menu : null,					

				initialize : function(config){
					IPT.button.BaseButton.superClass.initialize.call(this,config);
					if($.type(config) === "string"){
						this.text = config;
					}
					return true;
				},
				
				initComponent : function(){
					IPT.button.BaseButton.superClass.initComponent.call(this);
				 	this.setText(this.text);
				 	this.setIconClass(this.iconCls);
				 	this.setMenu(this.menu);
				 	this.setSelected(this.selected);
				 	if(this.disabled){
				 		this.disable();
				 	}
					if(this.menu && !(this.menu instanceof IPT.menu.Menu)){
						this.menu = new IPT.menu.Menu(this.menu);
					}
					return true;
				},
				
				isSelected : function(){
					return this.selected;
				},
				
				isPressed : function(){
					return this.pressed;
				},
				
				setSelected : function(boolean){
					this.selected = $.trim(boolean.toString().toLowerCase()) == 'true' ? true : false;
					return this;
				},
	
				setPressed : function(boolean){
					this.pressed = $.trim(boolean.toString().toLowerCase()) == 'true' ? true : false;
					return this;
				},
	
				getText : function(){
					return this.text;
				},
	
				setText : function(text){
					$(this._getTextField()).html(text);	
					this.text = text;
					return this;
				},
				
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
					return this;
				},
	
				getIconClass : function(){
					return this.iconCls;
				},

				getMenu : function(){
					return this.menu;
				},
				
				setMenu : function( menu ){
					this.menu = menu;
					return this;
				},
				
				removeMenu : function(){
					this.menu = null;
					return this;
				},
				
				showMenu : function(direction){
					//H 水平
					this.menu.show();
					var elem = this.getElement(),
						elemPosition = IPT.Css.getGlobalPosition(elem),
						size = this.getSize(),
						menuPosition = {};

					if(direction == "V"){//vitical
						menuPosition.left = elemPosition.left;
						menuPosition.top = elemPosition.top + size.height;
						//menuPosition.left = menuPosition.left + this.menu.getWidth() > IPT.Css.getScrollLeft(document.body) + IPT.$.getViewportSize().width ? menuPosition.left - this.getWidth() - this.menu.getWidth() : menuPosition.left ;
						menuPosition.top = menuPosition.top + this.menu.getHeight() > IPT.Css.getScrollTop(document.body) + IPT.Dom.getViewportHeight() ? menuPosition.top - this.getHeight() - this.menu.getHeight(): menuPosition.top ;
					}else{//horizon
						menuPosition.left = elemPosition.left + size.width;
						menuPosition.top = elemPosition.top;
						menuPosition.left = menuPosition.left + this.menu.getWidth() > IPT.Css.getScrollLeft(document.body) + IPT.Dom.getViewportWidth() ? menuPosition.left - this.getWidth() - this.menu.getWidth() : menuPosition.left ;
						menuPosition.top = menuPosition.top + this.menu.getHeight() > IPT.Css.getScrollTop(document.body) + IPT.Dom.getViewportHeight() ? menuPosition.top + this.getHeight() - this.menu.getHeight(): menuPosition.top ;
					}
					
					this.menu.showAt(menuPosition.left , menuPosition.top);
					return this;
				},
				
				hiddenMenu : function(){
					if(this.menu){
						this.menu.hidden();
					}
					return this;
				},
	
				_getTextField : function(){
					var elem = this.getElement();
					return $(elem).find(".ipt-btn-text").get(0);
				},
				
				_getIconField : function(){
					var elem = this.getElement();
					return $(elem).find(".ipt-btn-icon").get(0);
				}
		 }
 });