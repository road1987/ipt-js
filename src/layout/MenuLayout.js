/**
 *	implement Interface 
 */
IPT.Class.define(' IPT.layout.MenuLayout ' , {
     extend : 'Object',

	 constructor : function(config){
	 },

	 methods : (function(){
			var defaultConfig = {
			};
			
			return {
				_initialize : function(component){
					this.renderItem(component);
				},

				/*设置layout容器*/
				setLayoutContainer : function(container){
					this.layoutContainer = container;
				},
	
				getLayoutContainer : function(){
					return this.layoutContainer;
				},
				
				renderItem : function(item/*items , itemObject , {}*/){
					var _this = this;
					if(!this.layoutContainer){
						throw new Error("layoutContainer is undefined! ");
					}

					if(item.isComponent && item.isComponent()){
						item.render(this.layoutContainer._getContentContainer());
					}else{
						item = IPT.widget.create(item);
						item.render(this.layoutContainer._getContentContainer());
					}
					item.addListener("mouseover" , function(){
						_this.layoutContainer.setActivedItem( this );
					});
					return item;
				}
			};
		})(),
		
		statics : {
		 
		}
});