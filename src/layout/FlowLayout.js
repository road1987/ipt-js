/**
 *	implement Interface 
 */
IPT.Class.define(' IPT.layout.FlowLayout ' , {
     extend : 'Object',

	 constructor : function(config){
	 },

	 methods : (function(){
			return {
				align : "left",
				
				_initialize : function(component){
					this.renderItem(component);
				},
				
				setAlign : function(align){
					this.align = align;
				},
				
				/*设置layout容器*/
				setLayoutContainer : function(container){
					this.layoutContainer = container;
				},
	
				getLayoutContainer : function(){
					return this.layoutContainer;
				},
				
				renderItem : function(item/*items , itemObject , {}*/){
					if(!this.layoutContainer){
						throw new Error("layoutContainer is undefined! ");
					}

					if(item.isComponent && item.isComponent()){
						item.render(this.layoutContainer._getContentContainer());
					}else{
						item = IPT.widget.create(item);
						item.render(this.layoutContainer._getContentContainer());
					}
					return item;
				}
			};
		})(),
		
		statics : {
		 	LEFT : "left", 
		 	RIGHT : "right",
		 	CENTER : "center"
		}
});