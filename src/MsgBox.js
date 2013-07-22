IPT.Class.define(' IPT.MsgBox ' , {

		 constructor : function(config){
	
		 },

		 methods : {
			 
		 },
		 
		 statics : {
			OK : "ok",
			CANCEL : "cancel",
			OKCANCEL : "okcancel",
			YESNO : "yesno",
			YESNOCANCEL : "yesnocancel",
			
			show : function(){
			 
		 	},
		 	
		 	alert : function(title , msg /* , handle */){
			 	var handle = arguments[arguments.length - 1],
			 		hasHandle = (typeof handle === 'function') ? true : false;
				var win = new IPT.window.Window({
					title : title,
					baseCls : "ipt-msgbox",
					width : "240px",

				//	height : "60px",
					html : msg,
					modal : true,
					bToolbar : { items : [{
									text : "OK" ,
					            	width : "68px",
					            	listeners : {
					            		"click" : function(){
					            			if(hasHandle){
					            				handle("ok");
					            			}
					            			win.destroy();
					            		}
					            	}
					            }]
					 },
					collapsible : false,
					minimizable : false,
					maximizable : false,
					renderTo : document.body
				});
				win.getBottomToolbar().addClass("ipt-toolbar-align-center");
				return win;
		 	},
		 	
		 	prompt : function(title/* , handle */){
			 	var handle = arguments[arguments.length - 1],
		 			hasHandle = (typeof handle === 'function') ? true : false,
			 		content =  '<input type=\"text\" style="width:220px; height:22px; line-height:22px; font-size:11px;"/>';
				
			 	var win = new IPT.window.Window({
					title : title,
					baseCls : "ipt-msgbox",
					width : "240px",
				//	height : "60px",
					html : content,
					modal : true,
					bToolbar : {items : [{	
									text : "Ok" ,
					            	width : "68px",
					            	listeners : {
					            		"click" : function(){
					            			if(hasHandle){
					            				var info = $(win.getElement()).find("input").val();
					            				handle(info);
					            			}
					            			win.destroy();
					            		}
					            	}
								},{	
					            	text : "Cancel" ,
					            	width : "68px",
					            	xtype : "button",
					            	listeners : {
					            		"click" : function(){
					            			if(hasHandle){
					            				handle(false);
					            			}
					            			win.destroy();
					            		}
					            	}
					            }]},
					collapsible : false,
					minimizable : false,
					maximizable : false,
					renderTo : document.body
				});
				win.getBottomToolbar().addClass("ipt-toolbar-align-center");
				return win;		 		
		 	},
		 	
		 	confirm : function(title , msg /* , handle */){
			 	var handle = arguments[arguments.length - 1],
	 			hasHandle = (typeof handle === 'function') ? true : false;
			
			 	var win = new IPT.window.Window({
					title : title,
					baseCls : "ipt-msgbox",
					width : "240px",
				//	height : "60px",
					html : msg,
					modal : true,
					bToolbar : {items :[{	
									text : "Ok" ,
					            	width : "68px",
					            	listeners : {
					            		"click" : function(){
					            			if(hasHandle){
					            				handle(true);
					            			}
					            			win.destroy();
					            		}
					            	}
								},{	
					            	text : "Cancel" ,
					            	width : "68px",
					            	listeners : {
					            		"click" : function(){
					            			if(hasHandle){
					            				handle(false);
					            			}
					            			win.destroy();
					            		}
					            	}
					            }]},
					collapsible : false,
					minimizable : false,
					maximizable : false,
					renderTo : document.body
				});
				win.getBottomToolbar().addClass("ipt-toolbar-align-center");
				return win;
		 	}
		 }
 });