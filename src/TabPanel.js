IPT.Class.define(' IPT.TabPanel ' , {
		 extend : "IPT.Container",

		 constructor : function(config){
			IPT.TabPanel.callParent(this,config);
		 },

		 methods : {
				 tToolbar : null,
				 bToolbar : null,
					
				 width : "100%",
				 height : "auto",
				 	
				 titleMinWidth : "80px",
				 titleMaxWidth : "200px",
					
				 collapsible : true,
				 minimizable : false,
				 maximizable : false,
				 closable : false,
					
				 baseCls : "ipt-tabs",
				 activedItemCls : "ipt-tabs-actived",
				 scrollHoverCls : "ipt-tabs-scroll-hover",
				 
				 
				 initialize : function(config){
			 		IPT.TabPanel.superClass.initialize.call(this,config);
		 		 },
		 		
		 		 initComponent : function(){
		 			IPT.TabPanel.superClass.initComponent.call(this);
		 			this._initEvent();
		 		 },
		 		
				 add : function(item){//item is a instance of Panel

					if(!item){
						return false
					}
					var tab = this._createTab(item);
						item.tab = tab;
					var _this = this;
					if($.isArray(item)){
						$.each(item , function(i , item){
							
						});
					}else{
						item.isShowHeader = false;
						item.setHeight("100%");
						item.render(this._getContentContainer());
						$(this._getTitlesInner()).find("ul").append(item.tab);
						$(item.tab).click(function(){
							_this.setSelected(item);
						});
						this.setSelected(item);
						this.compList.push(item);
					}
					return true; 
			 	 },
			 	 
			 	 remove : function(panel){
				 		$(panel.tab).remove();
				 		panel.tab = null;
				 		
				 		if(this.selectedItem == panel){
				 			var index = this.getSelectedIndex(panel);
				 			var selectedIndex = index - 1 >= 0 ? index - 1 : index + 1;
				 			var item = this.getComponentByIndex(selectedIndex);
				 			if(item){
				 				this.setSelected(item);
				 			}
				 		}
				 		IPT.TabPanel.superClass.remove.call(this,panel);
				 		return true;
				 },
				 	 
			 	 setSelected : function(panel){
			 		if(!panel){
			 			return false;
			 		}
			 		if(this.selectedItem){
			 			$(this.selectedItem.tab).find("a").removeClass(this.activedItemCls);
			 			this.selectedItem.hidden();
			 		}
			 		this.selectedItem = panel;
			 		if(this.selectedItem){
			 			this.selectedItem.show();
			 		}
			 		$(panel.tab).find("a").addClass(this.activedItemCls);
			 		return true;
			 	 },

			 	 setSelectedByIndex : function(){
			 		 
			 	 },
			 	 
			 	 setSelectedById : function(){
			 		 
			 	 },
			 	 
			 	 getSelected : function(){
			 		return this.selectedItem || null; 
			 	 },
			 	 
			 	 getSelectedIndex : function(){
			 		 return this.getComponentIndex(this.selectedItem);
			 	 },
			 	 
				 _initEvent : function(){
					var scroller = {left : this._getScrollLeft() , right : this._getScrollRight()} ,
						tabsHeader = this._getTabPanelHeader(),
						_this = this;
					
					$(scroller.left).bind('mouseover' , function(){
						$(this).addClass(_this.scrollHoverCls);
						return false;
					});

					$(scroller.right).bind('mouseover' , function(){
						$(this).addClass(_this.scrollHoverCls);
						return false;
					});
					
					$(scroller.left).bind('mouseout' , function(){
						$(this).removeClass(_this.scrollHoverCls);
						return false;
					});

					$(scroller.right).bind('mouseout' , function(){
						$(this).removeClass(_this.scrollHoverCls);
						return false;
					});
					
					$(scroller.left).bind('click' , function(){
						$(this).removeClass(_this.scrollHoverCls);
						//scroll to left code 
						return false;
					});
					
					$(scroller.right).bind('click' , function(){
						$(this).removeClass(_this.scrollHoverCls);
						//scroll to right code 
						return false;
					});
					
					$(tabsHeader).delegate("a" , "mouseover" , function(){
						//alert(this.innerHTML)
					});
					
					$(tabsHeader).delegate("a" , "mouseout" , function(){
						//alert("out")
					});	
					
					$(tabsHeader).delegate("a" , "click" , function(){
						//alert("click")
					});						
			 	 },
			 	 
			 	 scroll : function(direction){
			 		 
			 	 },
			 	 
			 	 _getTitlesInner : function(){
			 		 var elem = this.getElement(),
		 		 	 	 title = $(elem).find("." + this.baseCls + "-titles-inner").get(0);
			 		 return title;
			 	 },
			 	 
			 	 _getTabPanelHeader : function(){
			 		 var elem = this.getElement(),
			 		 	 header = $(elem).find("." + this.baseCls + "-header").get(0);
			 		 return header;
			 	 },
			 	 
			 	 _getScrollLeft : function(){
			 		 var elem = this.getElement(),
			 		 	 scrollLeft = $(elem).find("." + this.baseCls + "-scroll-left").get(0);
			 		 return scrollLeft;
			 	 },
			 	 
			 	 _getScrollRight : function(){
			 		 var elem = this.getElement(),
		 		 	 	 scrollRight = $(elem).find("." + this.baseCls + "-scroll-right").get(0);
			 		 return scrollRight;			 		 
			 	 },
			 	 
			 	 _createTab : function(panel){
			 		 var tabTpl = '<li class="selected"><a href="javascript:void(0)"><%=title%></a></li>';
			 		 	 tabTpl = new IPT.Template(tabTpl);
					 var tab = $(tabTpl.applyTpl(panel)).first();
					 return tab;
			 	 },
			 	 
			 	 tpl : function(){
			 		 return ['<div class="<%=baseCls%>">' ,
			 		         	'<div class="<%=baseCls%>-header">' ,
									'<div class="<%=baseCls%>-scroll-left"></div>',
									'<div class="<%=baseCls%>-scroll-right"></div>',
									'<div class="<%=baseCls%>-titles-outer">',
										'<div class="<%=baseCls%>-titles-inner"><ul></ul></div>',
									'</div>',
								'</div>',
								'<div class="<%=baseCls%>-body"><div class="<%=baseCls%>-contentContainer"></div></div>',
			 		         '</div>'].join("");
			 	 }
		 }
});