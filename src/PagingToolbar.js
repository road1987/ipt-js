IPT.Class.define('IPT.PagingToolbar' , {
		 extend : 'IPT.Component',
		 constructor : function(config){
			 IPT.PagingToolbar.callParent(this,config);
		 },
		 

		 methods : {
					pageIndex : 1,
					
					pageSize : 10,
					
					pageSizeOptions :  [10,20,30,40,50] ,
					
					pageNums : "",
					
					recordNums : "",
					
					initialize : function(config){
						IPT.PagingToolbar.superClass.initialize.call(this,config);
						return true;
					},
					
					initComponent : function(){
						IPT.PagingToolbar.superClass.initComponent.call(this);
						$(this.element).find(".pageIndexBox").val(this.pageIndex);
						$(this.element).find(".pageSizeBox").val(this.pageSize);
						this._initEvent();
					},
					
					//extend from parent class
					/*
					render : function(){
						var tpl = this.tpl();
							tpl = new IPT.Template(tpl);
						this.element = $(tpl.applyTpl(this)).first();
						if(this.renderTo){
							$(this.renderTo).append(this.element);
						}
						this.initComponent();
						return true;
					},*/
					
					
					setPageIndex : function(number){
						var number = parseInt(number);
						if(number && this.pageIndex != number && number > 0 && number <= this.pageNums){
							this.pageIndex = number;
							$(this.element).find(".pageIndexBox").val(this.pageIndex);
							this.fireEvent("pageindexchanged");
							return true;
						}else{
							$(this.element).find(".pageIndexBox").val(this.pageIndex);
							return false;
						}
					},
					
					getPageIndex : function(){
						return this.pageIndex ;
					},
					
					
					setRecordNums : function(recordNums){
						this.recordNums = recordNums;
						$(this.element).find(".recordNums").html(recordNums);
						return true;
					},
					
					getRecordNums : function(){
						return this.recordNums;
					},
					
					setPageNums : function(pageNums){
						this.pageNums = pageNums;
						$(this.element).find(".pageNums").html(pageNums);
						return true;			
					},
					
					getPageNums : function(){
						return this.pageNums;
					},
					
					setPageSize : function(size){
						if(!(typeof (size - 0) == "number")){
							return false;
						}
				
						if(this.pageSize != size ){
							this.pageSize = size;
							this.setPageIndex(1);
							this.fireEvent(this,"pagesizechanged");
						}
						return true;
					},
					
					getPageSize : function(){
						return this.pageSize;
					},
					
					tpl : function(){
						var tpl = '<div class="ipt-paging"><table>' + 
							'<tr><td><select class="pageSizeBox">' + 
							'<%for(var i = 0 , iLen = pageSizeOptions.length ; i < iLen ; i++){%>' + 
								'<option value="<%=pageSizeOptions[i]%>"><%=pageSizeOptions[i]%></option>' + 
							'<%}%>' + 
							'</select></td>' + 
					 		'<td><a href="javascript:void(0)" class="paging-first" ></a></td>' + 
					 		'<td><a href="javascript:void(0)" class="paging-prev"></a></td>' +  
					 		'<td><span>Page</span></td>' +
					 		'<td><input size="2" class="pageIndexBox" value="<%=pageIndex%>"/></td>' +	
					 		'<td><span>of  </span><span class="pageNums"><%=pageNums%></span></td>'	+ 		
					 		'<td><a href="javascript:void(0)" class="paging-next"></a></td>'+
					 		'<td><a href="javascript:void(0)" class="paging-last"></a></td></tr>'+
					 		'</table>' +
				 		'</div>';
						return tpl;
					},
					
					_initEvent : function(){
						var _this = this;
						$(this.element).delegate("a" , "click" , function(){
								var command = this.className;
								switch(command){
									case "paging-first":
										_this.setPageIndex(1);
										break; 
									case "paging-prev":
										_this.setPageIndex( _this.pageIndex - 1 );
										break;
									case "paging-next": 
										_this.setPageIndex( _this.pageIndex + 1 );
										break;
									case "paging-last": 
										_this.setPageIndex(_this.pageNums);
										break;
									default : 
										break;
								}
						});
						
						$(this.element).find(".pageSizeBox").bind("change" , function(){
								_this.setPageSize(this.value)
							}
						);
						
						$(this.element).find(".pageIndexBox").bind("keyup" , function(event){
								var value = this.value;
								if(13 == event.keyCode){
									_this.setPageIndex(value);
								}
							}
						);
					}
		 },

		 statics : {
			    XTYPE : "pagingToolbar",
			    
				registerEvents : (function(){
					var EventObject = IPT.events.EventObject;
					return [
					        //mouse
							EventObject.PAGE_INDEX_CHANGED , 
							EventObject.PAGE_SIZE_CHANGED
						];
				})()
		 }
 });