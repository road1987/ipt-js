IPT.Class.define(' IPT.Container ' , {
		 extend : "IPT.Component",

		 constructor : function(config){
			this.compList = [];
			IPT.Container.callParent(this,config);
		 },

		 methods : {
			 
				html : null,
				
				layout : 'flow',
				
				layoutConfig : null,
				
				items : null,
				
				initialize : function(config){
					IPT.Container.superClass.initialize.call(this , config);
					return true;
				},
				
				initComponent : function(){
					IPT.Container.superClass.initComponent.call(this);
					this.setLayout(this.layout);
					this.setInnerHTML(this.html);
					this.add(this.items);
				},	
				 
				//insert into DOM and compList
				add : function(item){
					//var elem = this._getContentContainer();
					if(!item){
						return false
					}
					var _this = this;
					if($.isArray(item)){
						$.each(item , function(i , item){
							var comp = _this.getLayout().renderItem(item);
							_this.compList.push(comp);
						});
					}else{
						var comp = _this.getLayout().renderItem(item);
						this.compList.push(comp);
					}
					return true;
				},
				
				insert : function(index , comp){
					this.compList.splice(index, 0, comp);
					return this;
				},
				
				remove : function( comp ){
					var index = this.getComponentIndex(comp);
					$(comp.getElement()).remove();
					this.compList.splice(index, 1);
					return this;
				},

				removeAt : function(index){
					var comp = this.getComponentByIndex(index);
					if(comp){
						this.remove(comp);
						return true;
					}
					return false;
				},
				
				removeAll : function(){
					this.compList = [];
					return this;
				},
	
				getComponentByIndex : function( index ){
					if(this.compList[index]){
						return this.compList[index];
					}
					return null;
				},

				getComponentsByXType : function( xType ){
					var compList = [];
					$.each(this.compList , function(i,elem){
						if(elem.getXType() == xType){
							compList.push(elem);
						}
					});
					return compList;
				},
				
				isContain : function(comp){
					for(var i = 0 , iLen = this.compList.length; i < iLen ; i++){
						if(this.compList[i] === comp){
							return true;
						}
					}
					return false;
				},

				getChildren : function(){
					return this.compList;
				},
	
				getLayout : function(){
					if(typeof this.layout === "string" ){
						this.setLayout(this.layout);
					}
					return this.layout;
				},
				
				setLayout : function(layout){
					if(typeof layout === "string"){
						var layoutClass= IPT.String.capitalize(layout)+'Layout';
						this.layout = new IPT.layout[layoutClass]();
					}else{
						this.layout = layout;
					}
					this.layout.setLayoutContainer(this);
					return true;
				},
				
				setInnerHTML : function(html){
					if(!html){
						return false;
					}
					var elem = this._getContentContainer();
						$(elem).html(html);
						this.html = html ;
					return this;
				},
				
				getInnerHTML : function(){
					var elem = this._getContentContainer();
					return $(elem).html();
				},
				
				getComponentIndex : function(comp){
					for(var i = 0 , iLen = this.compList.length; i < iLen ; i++){
						if(this.compList[i] === comp){
							return i;
						}
					}
					return null;
				},

				_getContentContainer : function(){
					var element = this.getElement();
					return $(element).find("." + this.baseCls + "-contentContainer").get(0) || element;
				}
			 },

			 statics : {
					XTYPE : 'container'
			 }
 });