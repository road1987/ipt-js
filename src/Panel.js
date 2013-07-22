IPT.Class.define(' IPT.Panel ' , {
		 extend : "IPT.Container",

		 constructor : function(config){
			IPT.Panel.callParent(this,config);
		 },

		 methods : {
				 title : "",
				 
				 header : true,
				 
				 width : "100%",
				 
				 height : "auto",
				 
				 baseCls : "ipt-panel",
				 
				 collapsible : false,
				 
				 minimizable : false,
				 
				 maximizable : false,
				 
				 closable : false,
				 
				 tToolbar : null,
				 
				 bToolbar : null,
				 
				 isShowHeader : true,
				 
				 initialize : function(config){
					IPT.Panel.superClass.initialize.call(this,config);
					if(this.tToolbar){
						if(this.tToolbar.isXTypeOf && this.tToolbar.isXTypeOf("toolbar")){	
							this.tToolbar.render(this._getTopToolbarWrap());
						}else{
							this.tToolbar = new IPT.Toolbar(this.tToolbar);
							this.tToolbar.render(this._getTopToolbarWrap());
						}
					}
					if(this.bToolbar){
						if(this.bToolbar.isXTypeOf && this.bToolbar.isXTypeOf("toolbar")){	
							this.bToolbar.render(this._getBottomToolbarWrap());
						}else{
							this.bToolbar = new IPT.Toolbar(this.bToolbar);
							this.bToolbar.render(this._getBottomToolbarWrap());
						}
					}
					return true;
				 },
					
				 initComponent : function(){
					IPT.Panel.superClass.initComponent.call(this);
					this.setTitle(this.title);
					this._initEvent();					 
				 },
				 
				 setIconClass : function(){
					
				 },

				 getIconClass : function(){
					
				 },
				 
				 setTitle : function(title){
					var titleEle = this._getTitleElement();
					if(titleEle){
						$(titleEle).html(title);
					}
					this.title = title;
					return this;
				 },
	
				 getTitle : function(){
					return this.title;
				 },

				 getInnerWidth : function(){
					
				 },

		         getInnerHeight : function(){
					
				 },

				 collapse : function(){
						if(!this.collapsible){
							return false;
						}
						
						if(this.header){
							var collapseBtn = this._getToolBtn("collapse-over");
							collapseBtn.className = collapseBtn.className.replace(/collapse/ , 'expand');
						}
						var EventObject = IPT.events.EventObject;
						this.collapsed = true;
						this._hiddenPanelBody();
						this.fireEvent( EventObject.COLLAPSED);	
						
					return this;
				 },
				 
				 expand : function(){
					if(!this.collapsible){
						return false;
					}
					if(this.header){
						var collapseBtn = this._getToolBtn("expand-over");
						collapseBtn.className = collapseBtn.className.replace(/expand/ , 'collapse');
					}
					var EventObject = IPT.events.EventObject;
					this.collapsed = false;
					this._showPanelBody();
					this.fireEvent( EventObject.EXPANDED);	
					return this;
				 },
				 
			    isCollapsed : function(){
					 return this.collapsed;
				},
				 
				 
				setHeight : function(height){
						if( height - 0 < this.minHeight - 0){
							height = this.minHeight;
						}
						var elem = this._getContentContainer();
							$(elem).height(height);
						this.fireEvent(IPT.events.EventObject.RESIZE);
						return this;
				},
				
				getTopToolbar : function(){
					return this.tToolbar;
				},
				
				getBottomToolbar : function(){
					return this.bToolbar;
				},
				
				//update , render extend from Component Class
				/*
				render : function(){
					var tpl = this._getTpl();
						tpl = new IPT.Template(tpl);
					this.element = $(tpl.applyTpl(this)).first().get(0);
					if(this.renderTo){
						$(this.renderTo).append(this.element);
					}
					this.initComponent();
					return true;
				},*/
				
				 _initEvent : function(){
				 	var _this = this ,
				 	    EventObject = IPT.events.EventObject,
				 	    toolElem = this._getToolElement();
				 	
				 	if(this.header){
					 	if(this.collapsible){
					 		var collapse = $(this._getToolBtn("collapse"));
						 	$(collapse).bind( "click" ,  function(){
					 			if(_this.collapsed){
					 				_this.expand();
					 			}else{
					 				_this.collapse();
					 			}	
						 	});
					 	}
					 	
					 	if(this.minimizable){
					 		var min = $(this._getToolBtn("min"));
						 	$(min).bind( "click" ,  function(){
						 		_this.hidden();
						 	});
					 	}
					 	
					 	if(this.maximizable){
					 		var max = $(this._getToolBtn("max"));
						 	$(max).bind( "click" , function(){
						 		_this.show();
						 	});
					 	}
					 	
					 	if(this.closable){
					 		var close = $(this._getToolBtn("close"));
						 	$(close).bind("click" , function(e){
						 		_this.hidden();
						 	});	
					 	}
				 	
				 		$(toolElem).find("div").bind('mouseover' , function(){
				 			this.className = $.trim(this.className.replace(/-over/g , '')) + "-over";
				 		});
				 		
				 		$(toolElem).find("div").bind('mouseout' , function(){
				 			this.className = this.className.replace(/-over/g , '');
				 		});
			 		
				 		this.addListener( EventObject.RESIZE , function(){
				 			var titleElem = _this._getTitleElement();
				 				$(titleElem).width(_this.getWidth());
				 		});
			 		}
				 	return this;
			 	 },
				 
				 _hiddenPanelBody : function(){
					 $(this.getBodyWrap()).css('display' , 'none');
					 this.collapsed = true;
					 return this;
				 },

				_showPanelBody : function(){
					$(this.getBodyWrap()).css('display' , 'block');
					this.collapsed = false;
					return this;
				},
			 	 _getTitleElement : function(){
			 		 return $(this.element).find("." + this.baseCls + "-title-text").get(0);
			 	 },
			 	 
			 	 _getToolElement : function(){
			 		 return $(this.element).find("." + this.baseCls + "-tool").get(0);
			 	 },
			 	 
			 	_getToolBtn  : function(type){
			 		 if($.inArray( type , ["collapse" , "min" , "max" , "close","expand" , "collapse-over" , "expand-over"] ) !== -1  ){
			 			var btnEle = $(this.element).find("." + this.baseCls + "-tool-" + type).get()[0];
			 			return btnEle;
			 		 }else{
			 			 throw new Error("method:_getToolBtn(type)   argument:" + type + " is invalid!" );
			 		 }
			 	 },
			 	 
				 getHeaderWrap : function(){
					return $(this.element).find("." + this.baseCls + "-header").get(0);
				 },
				 
				 getBodyWrap : function(){
				 	return $(this.element).find("." + this.baseCls + "-body").get(0);
				 },
				 	 
				 _getPanelFooterWrap : function(){
					 var element = this.getElement();
					 return $(element).find("." + this.baseCls + "-footer").get(0);
				 },
					 
				 _getContentContainer : function(){
					 var element = this.getElement();
					 return $(element).find("." + this.baseCls + "-contentContainer").get(0);
				 },
				 
				 _getTopToolbarWrap : function(){
					 var element = this.getElement();
					 return $(element).find("." + this.baseCls + "-toolbar-topwrap").get(0);
				 },
	
				 _getBottomToolbarWrap : function(){
					 var element = this.getElement();
					 return $(element).find("." + this.baseCls + "-toolbar-bottomwrap").get(0);
				 },
				 
				 tpl : function(){
						return '<div class="<%=baseCls%>">' + 
						'<%if(isShowHeader){%>' + 
							'<div class="<%=baseCls%>-header">' + 
								
								'<div class="<%=baseCls%>-title">' + 
							//		'<img class="<%=baseCls%>-title-icon"/>' +
									'<span class="<%=baseCls%>-title-text">'+
										'&nbsp;'+
									'</span>' +
							    '</div>'+
								'<div class = "<%=baseCls%>-tool">' +
									'<%if(collapsible){%>' +
										'<div class = "<%=baseCls%>-tool-collapse"></div>' +
									'<%}%>' + 
									'<%if(minimizable){%>' +
										'<div class = "<%=baseCls%>-tool-min"></div>' +
									'<%}%>' + 
									'<%if(maximizable){%>' +
										'<div class = "<%=baseCls%>-tool-max"></div>' +
									'<%}%>' + 
									'<%if(closable){%>' +
										'<div class = "<%=baseCls%>-tool-close"></div>' +
									'<%}%>' +
								 '</div>' +
							'</div>' +
							'<%}%>' + 
							'<div class="<%=baseCls%>-body">'+	
								'<%if(tToolbar){%>' +
									'<div class="<%=baseCls%>-toolbar-topwrap"></div>'+
								'<%}%>' + 
								'<div class="<%=baseCls%>-contentContainer"></div>'+
								'<%if(bToolbar){%>' +
									'<div class="<%=baseCls%>-toolbar-bottomwrap"></div>'+
								'<%}%>' + 
							'</div>'+
							'<div class="<%=baseCls%>-footer"></div>' + 
						'</div>';
				 }
		 },
		 
		 statics : {
				XTYPE : 'panel'
		 }
 });