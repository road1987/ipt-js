IPT.Class.define('IPT.menu.Menu' , {
		 extend : 'IPT.Container',
		 constructor : function(config){
			IPT.menu.Menu.superClass.constructor.call(this,config);
			IPT.menu.MenuMgr.getInstance().register(this);
			this.render(document.body);
		},
		 
		 methods : {
					 baseCls : "ipt-menu",
					
					 layout : 'menu',
					 
					 items : [],
					 
					 width : "100px",
					 
					 //override
					 initialize : function(config){
						IPT.Container.prototype.initialize.call(this , config);
						//fix config infomation
					 	for(var i = 0 , len = this.items.length ; i < len ; i++){
					 		//var item = new IPT.menu.MenuItem(this.items[i]);
					 		//this.add(item);
					 		if(typeof this.items[i] === "string"){
					 			this.items[i] = { 
					 					xtype : "menuItem",
					 					text : this.items[i]
					 			}
					 		}else{
					 			this.items[i].xtype = "menuItem";
					 		}
					 	}
					 	return this;
				 	 },
				 	 
				 	 //override
					 initComponent : function(config){
						IPT.Container.prototype.initComponent.call(this,config);
					 	this._initEvent();
					 	this.hidden();
						return true;
					 },
					 
					 _initEvent : function(){
						 var _this = this ;
						 $(this.getElement()).bind("click" , function(){
							IPT.menu.MenuMgr.getInstance().hiddenAll();
						 });
					 },
					 
//					 add : function(menuItem){
//						var EventObject = IPT.events.EventObject,
//							_this = this;
//						
//					 	if(menuItem.isXTypeOf("menuItem")){
//					 		this.constructor.superClass.add.call(this,menuItem);
//					 	}
//					 	menuItem.addListener(EventObject.MOUSE_OVER , function(){
//					 		_this.setActivedItem( menuItem );
//					 	});
//				 	 },
				 	 
					 //override		 	 
				 	 insert : function( index , menuItem ){
				 		 
				 	 },
				 	 
				 	 addSeperator : function(){
				 		
				 	 },
				 	 
				 	 insertSeperator : function( index ){
				 		
				 	 },
				 	 
				 	 //override
				 	 hidden : function(){
				 		 IPT.Component.prototype.hidden.call(this);
				 		 if(this.activedItem && this.activedItem.menu){
				 			this.activedItem.menu.hidden();
				 		 }
				 		 this.setActivedItem(null);
				 		 return this;
				 	 },
				 	 
				 	 showAt : function( left , top ){
				 		this.setPosition(left , top);
				 	 },
				 	 
				 	 getActivedItem : function(){
				 		 return this.activedItem;
				 	 },
				 	 
				 	 setActivedItem : function(menuItem){
				 		//remove previous activedItem option.
					 	if(this.activedItem ){
					 		if(this.activedItem.menu){
					 			this.activedItem.hiddenMenu();
					 			this.activedItem.removeClass(this.activedItem.activedCls);
					 		}
					 	}

				 		this.activedItem = menuItem;
				 		if(this.activedItem){
						 	if(this.activedItem.menu){
						 		this.activedItem.showMenu();
						 		this.activedItem.addClass(this.activedItem.activedCls);
						 	}
				 		}
				 		return true;
				 	 },
				 	 
				 	 tpl : function(){
				 		 return ['<div class="<%=baseCls%>"></div>'].join("");				 		 
				 	 }
			 },
		 
		 statics : {
			 XTYPE : "menu"
		 }
 });
IPT.widget.menu = IPT.menu.Menu;