/**
 * @author LiHongChun
 * @date 2012-12-17
 * @version 1.0
 */
IPT.Class.define('IPT.events.EventListenerList' , {
		 constructor : function(){
			this.event = {};
		 },

		 methods : {
			add : function(type , listener){
				if( !this.event[type] ){
					this.event[type] = [];				
				}
				this.event[type].push(listener);	
				return true;
			},

			remove : function(type , listener){
				var list = this.event[type];
				if(list){
					for(i = 0 , len = list.length ; i < len ; i ++){
						if(listener === list[i]){
							return list.splice(i , 1);
						}
					}
				}else{
					throw new Error("could not found event type [" + type +  "] !");
				}
				return false;
			},

			getListenerCount : function(type){
				if(this.event[type]){
					return this.event[type].length;
				}else{
					return 0;
				}
			},
			
			getListeners : function(type){
				if(this.event[type]){
					return this.event[type];
				}else{
					return null;
				}
			},
			
			clear : function(type) {
				var list = this.event[type];
				if(list){
					this.list.length = 0;
				}
				return this;
			},
			
			registerEvent : function(evtName){
				if($.type(evtName) === "string"){
					if(this.event[evtName]){
						throw new Error("event name :" + evtName + " has been registered!");
					}else{
						this.event[evtName] = [];
					}
				}
				else if($.isArray(evtName)){
					for(var i = 0 , iLen = evtName.length ; i < iLen ; i++){
						arguments.callee.call(this,evtName[i]);
					}
				}else{
						throw new Error("arguments's type must be Array or String!");					
				}
				return this;
			}
		 }
 });