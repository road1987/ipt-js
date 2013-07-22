IPT.Class.define(' IPT.events.EventDispatcher ' , {
		 constructor : function(){
			 this.listenerList =  new IPT.events.EventListenerList();
		 },

		 methods : {
			hasListener : function(type){
				if(this.listenerList.getListenerCount(type) > 0){
					return true;
				}else{
					return false;
				}
			},

			addListener : function(type , handle){
				this.listenerList.add(type, handle);
			},	

			removeListener : function(type , handle){
				this.listenerList.remove(type, handle);
			},

			fireEvent : function(type , eventObj, source){
				var listeners = this.listenerList.getListeners(type);
				if(listeners){
					for(var i = 0 , iLen = listeners.length; i < iLen ; i ++){
						listeners[i].call(this,eventObj,source);
					}
				}
				return true;
			},

			registerEvent : function(evtName){
				 this.listenerList.registerEvent(evtName);
			}
		 }
});