/**
 * @author LiHongChun
 * @date 2012-12-17
 * @version 1.0
 */
(function(window , undefined){
	window.IPT = {
		VERSION : 1.0
	}
	
	IPT.Dom = {
			createElement : function (name, config ){
				var Dom = IPT.Dom , Css = IPT.Css ; 
				var elem = document.createElement(name);
				if(config){
					if(config.attr){
						Dom.setAttribute(elem , config.attr);
					}
					if(config.css){
						Css.setStyle(elem , config.css);
					}
					if(config.content){
						Dom.append(config.content , elem);
					}
				}
				return elem;
			},

			getElementById : function(id){
				return document.getElementById(id);
			},
			
			getElementsByTagName : function(tagName){
				return document.getElementsByTagName(tagName);
			},

			getElementsByClassName : function (className, tag){
				var elms = ((!tag || tag == "*") && this.all)? this.all : this.getElementsByTagName(tag || "*");
				var returnElms = [];
				var className = className.replace(/\-/g, "\\-");
				var regExp = new RegExp("(^|\\s)" + className + "(\\s|$)");
				var elm;
				for(var i=0; i<elms.length; i++){
					elm = elms[i];		
					if(regExp.test(elm.className)){
						returnElms.push(elm);
					}
				}
				return (returnElms);
			},

			getElementsByAttribute : function (attr, attrVal, tag){
				var elms = ((!tag || tag == "*") && this.all)? this.all : this.getElementsByTagName(tag || "*");
				var returnElms = [];
				if(typeof attrVal != "undefined"){
					var attrVal = new RegExp("(^|\\s)" + attrVal + "(\\s|$)");
				}
				var current;
				var currentAttr;
				for(var i = 0; i < elms.length; i++){
					current = elms[i];
					currentAttr = current.getAttribute(attr);
					if(typeof currentAttr == "string" && currentAttr.length > 0){	
						if(typeof attrVal == "undefined" || (attrVal && attrVal.test(currentAttr))){
							returnElms.push(current);
						}
					}
				}
				return returnElms;
			},

			getChildNodes : function(node){
				var childs = [];
				for(var i = 0 , iLen = node.childNodes.length; i < iLen ; i++){
					if(node.childNodes[i].nodeType == 1){
						childs.push(node.childNodes[i]);
					}
				}
				return childs;
			},
			
			getFirstChild : function(node){
				if(node.nodeType == 1){
					return node.firstChild;
				}else{
					return null;
				}
			},
			
			getLastChild : function(node){
				if(node.nodeType == 1){
					return node.lastChild;
				}else{
					return null;
				}			
			},
			
			getParentNode : function(node){
				return node.parentNode;
			},
			
			getOffsetParent : function(node){
				return node.offsetParent;
			},

			previousSibling : function(node){
				var prevSib = node.previousSibling;
				while(prevSib && prevSib.nodeType != 1){
					prevSib = prevSib.previousSibling;
				}
				return prevSib;	
			},

			nextSibling : function(node){
				var nextSib = node.nextSibling;
				while(nextSib && nextSib.nodeType != 1){
					nextSib = nextSib.nextSibling;
				}
				return nextSib;
			},
			/*
			/*鐩稿浜庢枃妗ｉ《閮ㄧ殑浣嶇疆 *
			getPostion : function(element){
				var position = {x : 0, y: 0};
				if(element.offsetParent){
					do{
						position.x += element.offsetLeft;
						position.y += element.offsetTop;
					}while(element = element.offsetParent);
				}
				return position;
			},
	*/
	////////////////////////////////////////////////////insert , replace , remove , get , set  
			prepend : function(content ,node){
				var retVal = null;
				if(typeof content == "string"){
					retVal = node.innerHTML = content + node.innerHTML;
				}else{
					if(parentNode.firstChild){
						retVal = node.insertBefore(content, node.firstChild);
					}else{
						retVal = node.appendChild(content);
					}
				}
				return 	retVal;
			},

			append : function(content/*or html*/ , node){
				var retVal = null;
				if(typeof content == "string"){
					retVal = node.innerHTML += content;
				}
				else{
					retVal = node.appendChild(content);
				}
				return retVal;
			},

			insertAfter : function(content , node){
				if(typeof content == "string"){
					var  fragment = document.createDocumentFragment();
					fragment.innerHTML = content;
					content = fragment;
				}
				if(node.parentNode.lastChild == node)
					node.parentNode.appendChild(content);
				else
					node.parentNode.insertBefore(content , node.nextSibling);
				return content;
			},

			insertBefore : function(content , node){
				if(typeof content == "string"){
					var  fragment = document.createDocumentFragment();
					fragment.innerHTML = newNode;
					content = fragment;
				}
				node.parentNode.insertBefore(content , node);
				return content;
			},

			replaceContent : function(newConent , referenceNode){
				if(typeof newContent == 'string'){
					referenceNode.innerHTML = newContent;
				}else{
					for(var i=(referenceNode.childNodes.length - 1); i>=0; i--){
						referenceNode.removeChild(referenceNode.childNodes[i]);
					}//innerHTML = "";
					IPT.Dom.append(newConent , referenceNode);
				}
				return referenceNode;
			},

			replace : function(content, oldNode){
				if(typeof content == "string"){
					var  fragment = document.createDocumentFragment();
					fragment.innerHTML = content;
					content = fragment;
				}
				oldNode.parentNode.replaceChild(content , oldNode);
			},

			remove : function(node){
				return node.parentNode.removeChild(node);;
			},
			
			removeChildren : function(parent) {
				if(!parent) return false;
				while (parent.firstChild) {
					 parent.removeChild(parent.firstChild);
				}
				return parent;
			},

			attrFixMap : {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			
			getAttribute : function(node ,attr){
				var fixAttr = IPT.Dom.attrFixMap[attr];
				if(fixAttr){
					return node[attr];
				}else{
					return node.getAttribute(attr);
				}
			},
			
			hasAttribute : function(node , attr){
				var fixAttr = IPT.Dom.attrFixMap[attr];
				if(fixAttr){
					if(node[fixAttr]){
						return true ;
					}else{
						return false;
					}
				}else if(node.hasAttribute){
					return node.hasAttribute(attr);
				}else{
					return node.getAttribute(attr) !== null;
				}
			},
			
			setAttribute : function(node , attributeName , attributeValue){
				//2 parameter (node , {})
				var attrFixMap = IPT.Dom.attrFixMap;
				if(arguments.length == 2 && typeof arguments[1] == "object"){
					for(var i in arguments[1]){
						var attr = attrFixMap[i] || i;
						if(attrFixMap[i]){
							arguments[0][attr] = arguments[1][i];
						}else{
							arguments[0].setAttribute(attr , arguments[1][i]);
						}
					}
				}else if(arguments.length == 3 && typeof arguments[1] == "string"){
						var attr = arguments[1];
						if(attrFixMap[attr]){
							arguments[0][attrFixMap[attr]] = arguments[2];
						}else{
							arguments[0].setAttribute(attr , arguments[2]);
						}
				}else{
					return false;
				}
				return node;
			},

			removeAttribute : function(node , attr){
				attr = IPT.Dom.attrFixMap[attr] || attr;
				var fixAttr = IPT.Dom.attrFixMap[attr];
				if(fixAttr){
					delete node[fixAttr];
				}else{
					node.removeAttribute(attr);
				}
				return node;
			},
			
			loadStyleSheet : function(url,media){
				media = media || 'screen';
				var link = document.createElement('LINK');
				link.setAttribute('rel','stylesheet');
				link.setAttribute('type','text/css');
				link.setAttribute('href',url);
				link.setAttribute('media',media);
				document.getElementsByTagName('head')[0].appendChild(link);			
			},

			removeStyleSheet : function(url,media){
				var styles = IPT.Dom.getStyleSheets(url,media);
				for(var i = 0 ; i < styles.length ; i++) {
					var node = styles[i].ownerNode || styles[i].owningElement;
					styles[i].disabled = true;
					node.parentNode.removeChild(node);
				}
			},

			getStyleSheets : function(url,media){
				var sheets = [];
				for(var i = 0 ; i < document.styleSheets.length ; i++) {
					if (url &&  document.styleSheets[i].href.indexOf(url) == -1) { continue; }
					if(media) {
						media = media.replace(/,\s*/,',');
						var sheetMedia;
							
						if(document.styleSheets[i].media.mediaText) {
							// DOM mehtod
							sheetMedia = document.styleSheets[i].media.mediaText.replace(/,\s*/,',');
							// Safari adds an extra comma and space
							sheetMedia = sheetMedia.replace(/,\s*$/,'');
						} else {
							// MSIE
							sheetMedia = document.styleSheets[i].media.replace(/,\s*/,',');
						}
						// Skip it if the media don't match
						if (media != sheetMedia) { continue; }
					}
					sheets.push(document.styleSheets[i]);
				}
				return sheets;
			},

			loadScript : function(url , callback){
				var script = document.createElement("script")
					script.type = "text/javascript";
				
				if (script.readyState){ //IE
					script.onreadystatechange = function(){
						if (script.readyState == "loaded" || script.readyState == "complete"){
							script.onreadystatechange = null;
							callback();
						}
					};
				}else { //Others
					script.onload = function(){
						callback();
					};
				}
				script.src = url;
				document.getElementsByTagName("head")[0].appendChild(script);	
			},

			getViewportWidth : function(){
				return (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth; 	
			},

			getViewportHeight : function(){
				return (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
			},
			
			//opeara xhtml1-transitional.dtd bug
			getDocumentWidth : function(){
				var width = 0 , view_width = IPT.Dom.getViewportWidth();
					// Mozilla   
				if(window.innerWidth && window.scrollMaxX){
					width = window.innerWidth + window.scrollMaxX;
				}else if(document.body.scrollWidth > document.body.offsetWidth){
					// all but Mac
					width = document.body.scrollWidth;
				}else{
					// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
					width =  document.body.offsetWidth;
				}
				return width > view_width ? width : view_width;
			},

	 		getDocumentHeight : function(){
				var height = 0 , view_height = IPT.Dom.getViewportHeight();
				if(window.innerHeight && window.scrollMaxY){
					height = window.innerHeight + window.scrollMaxY;
				}else if(document.body.scrollHeight > document.body.offsetHeight){
					height = document.body.scrollHeight;
				}else{
					height =  document.body.offsetHeight;
				}
				return height > view_height ? height : view_height;			
			},

			forbidSelect : function(ele){
				ele.onselectstart = function(){return false;};
				ele.style.MozUserSelect = 'none';
				return true;
			},
			
			allowSelect : function(ele){
				ele.onselectstart = function(){return true;};
				ele.style.MozUserSelect = '';
				return true;
			},

			getHTML : function(node){
				return node.innerHTML;
			},
			
			setHTML : function(node , text){
				if(typeof text == "string"){
					node.innerHTML = text;
				}
				return node;
			},

			getText : function(node){
				var childNodes = node.childNodes , text = '';
				for(var i = 0 , iLen = childNodes.length , node; i < iLen ; i++){
					node = childNodes[i];
					if(node.nodeType === 3){
						text += node.nodeValue;
					}else if(node.nodeType === 1){
						text += arguments.callee(node);
					}
				}
				return text;
			},

			setText : function(node , text){
				if(typeof text == "string"){
					node.innerHTML = IPT.String.escapeHTML(text);
				}
				return node;
			},
			
			isMouseIn : function(target , event){
				var event = IPT.Event.fixEvent(event),
					targetPosition = IPT.Css.getGlobalPosition(target),
					targetSize = { width : $(target).width(),
								   height : $(target).height()
								   };
				if(event.pageX > targetPosition.left && event.pageX < targetPosition.left + targetSize.width
						&& event.pageY > targetPosition.top  && event.pageY < targetPosition.top + targetSize.height)
	 			{
	 				return true;
	 			}else{
	 				return false;
	 			}
			}
		};

	IPT.Event = (function(){
		var handleId = 1; //用于构造句柄唯一ID
		var isReady = false; //用于判断document是否已经加载完成
		var isReadyEventBinded = false;
		var readyHandlers = [];
		return {
			addListener : function(element , type , handle){
				if (element.addEventListener) {
					if(type === "mousewheel"){
						type = "DOMMouseScroll"
					}
					element.addEventListener(type, handle, false);
					// add the under code for removeAllEvent
					if (!element.__events__){
						element.__events__ = {};
					}
					var handlers = element.__events__[type];
					if(!handlers){//用一个[]数组存注册的名柄,因为删除事件的差异性,所以不是用{}
						handlers = element.__events__[type] = [];
					}
					handlers.push(handle);
				}else {
					if (!handle.__id__){
						handle.__id__ = handleId++;
					}
					if (!element.__events__){
						element.__events__ = {};
					}
					var handlers = element.__events__[type];
					if (!handlers) {
						handlers = element.__events__[type] = {};
						if (element["on" + type]){
							handlers[0] = element["on" + type];
						}
					}
					handlers[handle.__id__] = handle;
					element["on" + type] = _handleEvent;
				}

				function _handleEvent(event){
					//可在此处修补event在IE和W3C中的不同 
					event = IPT.Event.fixEvent(event);
					var handlers = this.__events__[event.type];
					for (var i in handlers){
						handlers[i].call(this,event);
					}
				}
			},

			removeListener : function(element , type , handle){
				if (element.removeEventListener) {
					if(handle){
						element.removeEventListener(type, handle, false);
					}else{
						//移除所有dom 事件
						//类联事件
						if(element.getAttribute("on" + type)){
							element.removeAttribute("on" + type);
						}
						//删除addEventListener事件中的绑定
						if(type === "mousewheel"){
							type = "DOMMouseScroll";
						}
						if(element.__events__ && element.__events__[type]){
							var handlers = element.__events__[type];
							for(var i = 0 , len = handlers.length ; i < len ; i++){
								element.removeEventListener(type, handlers[i], false);
							}
						}
					}
				}else{
					// delete the event handler from the hash table
					if(element.__events__ && element.__events__[type]){
						if(handle){
							delete element.__events__[type][handle.__id__];
						}else{
							for(var handleID in element.__events__[type]){
								delete element.__events__[type][handleID];
							}
						}
					}else{//在没用到 IPT.addListener注册事件时element.__events__不存在,内联的注册事件在此remove
						if (element["on" + type]){
							element["on" + type] = null;
						}
					}
				}
			},
			
			dispatchEvent : function(element,event){
				if (document.createEventObject){
					// dispatch for IE
					var evt = document.createEventObject();
					return element.fireEvent('on'+event,evt);
				}else{
				// dispatch for firefox + others
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent(event, true, true ); // event type,bubbling,cancelable
					return !element.dispatchEvent(evt);
				}
			},
			
			delegate : function(delegateElement , selector,  type , handle){
				var Event = IPT.Event , Selector = IPT.Selector , Util = IPT.Util;
					if(typeof delegateElement === 'string'){
						delegateElement = Selector(delegateElement);
					}else if(typeof delegateElement === 'array'){
						delegateElement = delegateElement;
					}else{
						delegateElement = [delegateElement];
					}
					
					Util.each(delegateElement , function(){
						Event.addListener(this , type , function(e){
							var elems = Selector(selector , this);//找到所有需要被代理元素
							var target = e.target;
							Util.each(elems , function(){
								if(this === target){
									handle.call(this, handle);
								};
							});
						});
					});
			},
			
			undelegate : function(delegateElement , type , handle){
				var Event = IPT.Event , Selector = IPT.Selector , Util = IPT.Util;
				if(typeof delegateElement === 'string'){
					delegateElement = Selector(delegateElement);
				}else if(typeof delegateElement === 'array'){
					delegateElement = delegateElement;
				}else{
					delegateElement = [delegateElement];
				}
				Util.each(delegateElement , function(){
					Event.removeListener(this , type , handle);
				});
			},
			
			// window.onload事件，在页面中存在图片的时候，要等到img加载完成才会执行onload，但有时候就是想要把这一些img进行hidden,所以有API有此方法。
			ready : function(handle){
				if(isReady){
					handle();
					return ;
				}else{
					readyHandlers.push(handle);
				}
				if(!isReadyEventBinded){
					readyEventRegister();
					isReadyEventBinded = true;
				}
				
				function fireReadyHandlers(){
					isReady = true;
					for(var i = 0 , iLen = readyHandlers.length ; i < iLen ; i++){
						readyHandlers[i]();
					}
					readyHandlers.length = 0; //清除引用
					return true;
				}

				function readyEventRegister(){
					if(document.addEventListener) {
						document.addEventListener("DOMContentLoaded", fireReadyHandlers, false);
					}else if(document.all){
						document.write('<script id="__ie_onload" defer src="javascript:void(0)"><\/script>');
						var script = document.getElementById("__ie_onload");
						script.onreadystatechange = function() {
							if (this.readyState == "complete") {
								fireReadyHandlers(); // call the onload handler
								this.onreadystatechange = null;
								this.parentNode.removeChild(this);
							}
						};
					}else if(/WebKit/i.test(navigator.userAgent)) { // sniff
						var _timer = setInterval(function() {
							if (/loaded|complete/.test(document.readyState)) {
								clearInterval(_timer);
								fireReadyHandlers(); // call the onload handler
							}
						}, 10);
					}else{
						window.onload = fireReadyHandlers;
					}
				}
			},

			fixEvent : function(event){
				// Fix target property, if necessary
				event = event || window.event;
				if ( !event.target ) {
					event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either
				}
				// check if target is a textnode (safari)
				if ( event.target.nodeType === 3 ) {
					event.target = event.target.parentNode;
				}
				// Add relatedTarget, if necessary
				if ( !event.relatedTarget && event.fromElement ) {
					event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
				}
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && event.clientX != null ) {
					var doc = document.documentElement, body = document.body;
					event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
				}
				// Add which for key events
				if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) ) {
					event.which = event.charCode || event.keyCode;
				}
				// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
				if ( !event.metaKey && event.ctrlKey ) {
					event.metaKey = event.ctrlKey;
				}
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && event.button !== undefined ) {
					event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
				}		
				return event;
			},
			
			getTarget : function(event){
				event = event || window.event;
				var target = event.target || event.srcElement || document;
				if(target.nodeType === 3) {
					 target = node.parentNode;
				}
				return target; 
			},
			
			getRelatedTarget : function(event){
				event = event || window.event;
				if ( !event.relatedTarget && event.fromElement ) {
					event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
				}
				return event.relatedTarget;
			},
			
			getMouseDetail : function(event){
				event = event || window.event;
				if(event.wheelDelta){
				   return event.wheelDelta < 0 ? -1 : 1;
				}
				else if(event.detail){
				   return event.detail < 0 ? 1 : -1;
				}else{
					return false;
				}
			},

			getMouseButton : function(event){
				event = event || window.event;
				if ( !event.which && event.button !== undefined ) {
					event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
				}
				return event.which;
			},
			
			getMouseCoordsInDocument : function(event){
				event = event || window.event;
				var doc = document.documentElement, body = document.body;
				var x = event.pageX || (event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
				var y = event.pageY || (event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0));
				return {'x':x,'y' : y };
			},
			
			preventDefault : function(event){
				if(event && event.preventDefault){
					event.preventDefault();
				}
				else{
					window.event.returnValue = false;
				}
			},

			cancelBubble : function(event){
				if(event && event.stopPropagation){
					event.stopPropagation();
				}
				else{
					window.event.cancelBubble = true;
				}
			}
		}
	})();
	
	IPT.Css = {
		addClass : function(target,className){
			var currentClass = ' ' + target.className + ' ';
			if(currentClass.indexOf(' ' + className + ' ') <  0 ){
				if(target.className){
					target.className += (' ' + className);
				}else{
					target.className = className;
				}
			}
			return target;
		},
	
		removeClass : function(target,className){
			var classToRemove = new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i");
			target.className = target.className.replace(classToRemove, " ").replace(/^\s+|\s+$/g, "");
			return target;
		},
	
		hasClass : function(target , className){
			return new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i").test(target.className);
		},
			
		getStyle : function(target ,cssRule){
			var cssVal = "";
			if(cssRule == 'opacity'){
				return IPT.Css.getOpacity(cssRule);
			}
			if(document.defaultView && document.defaultView.getComputedStyle){
				cssVal = document.defaultView.getComputedStyle(target, "").getPropertyValue(cssRule);
			}else if(target.currentStyle){
				if(cssRule == 'float'){
					cssRule = 'styleFloat';
				}
				cssVal = cssRule.replace(/\-(\w)/g, function (match, p1){
					return p1.toUpperCase();
				});
				cssVal = target.currentStyle[cssVal];
			}
			return cssVal;
		},
		
		/**
		*	arguments: {cssName:value , cssName2:value} , target
		*			   'cssName' , 'value' , target
		*               
		*/
		setStyle : function(target , css , cssVal){
			// target,{cssName:value , cssName2:value} 
			// target, 'cssName' , value  
			// target, "cssName:value;cssName2:value"  
			var camelize = IPT.String.camelize;
			if(arguments.length == 2 && typeof arguments[1] == "string"){
				target.style.cssText += (';' + arguments[1]);
				if(IPT.String.include(arguments[1],'opacity')){//include閺傝纭舵稉绨妕ring閹碘晛鐫�
					var opacity = arguments[1].match(/opacity:\s*(\d?\.?\d*)/)[1];
					IPT.Css.setOpacity(opacity , target);
				}
			}else if(arguments.length == 2 && typeof arguments[1] == "object"){
				for(var property in arguments[1]){
					var _property = IPT.String.trim(camelize(property));
					if(_property == 'opacity'){
						IPT.Css.setOpacity(target , css[property]);
					}else if(_property == 'float'){
						var _float = target.style.styleFloat ? 'styleFloat' : 'cssFloat';
						target.style[_float] = arguments[1][property];
					}else{
						target.style[_property] = arguments[1][property];
					}
				}
			}else if(arguments.length == 3){
				var property = IPT.String.trim(camelize(arguments[1]));
				if(property == 'opacity'){
					IPT.Css.setOpacity( target , arguments[2]);
				}else if(property == 'float'){
						var _float = target.style.styleFloat ? 'styleFloat' : 'cssFloat';
						target.style[_float] = arguments[2];
				}else{
					target.style[property] = arguments[2];
				}
			}else{
				return false;
			}
			return target;
		},
	
	
		getWidth : function(target){
			var padding = {
				right : parseInt(IPT.Css.getStyle(target , 'padding-right')),
				left : parseInt(IPT.Css.getStyle(target , 'padding-left'))
			};
			return target.clientWidth - padding.left - padding.right;
		},
		
		setWidth : function(target , value){
			if($.type(value) === "number" ||  value - 0 )
			{
				IPT.Css.setStyle(target , 'width' , value + 'px');	
			}else{
				IPT.Css.setStyle(target , 'width' , value);
			}
	
			return target;
		},
	
		getHeight : function(target){
			var padding = {
				top : parseInt(IPT.Css.getStyle(target , 'padding-top')),
				bottom : parseInt(IPT.Css.getStyle(target , 'padding-bottom'))
			};
			return target.clientHeight - padding.top - padding.bottom;
		},
		
		setHeight : function(target , value){
			if($.type(value) === "number" ||  value - 0 )
			{
				IPT.Css.setStyle(target , 'height' , value + 'px');	
			}else{
				IPT.Css.setStyle(target , 'height' , value);
			}
	
			return target;
		},
			
		getInnerWidth : function(target){
			return target.clientWidth;
		},
	
		getInnerHeight : function(target){
			return target.clientHeight;
		},
			
		getOuterWidth : function(target){
			return target.offsetWidth;
		},
	
		getOuterHeight : function(target){
			return target.offsetHeight;
		},
		
		//position
		// jquery 
		//	position : 鐎电懓鍘撶槐鐘侯啎缂冾喚娈憈op , left鐏炵偞锟介惃鍕拷
		//	offset : 閻╃顕禍宸揻fsetParent閻ㄥ嫬锟�, 閸栧懎鎯堟禍鍞宎rgin缁涘锟�
		//defalut: 閻╃顕畂ffsetParent
		//閺堝绔撮崣鍌涙殶閺冭泛褰茬拋鍓х枂閻╃顕惃鍒綼rent
		getPosition : function(target){
			var top = IPT.Css.getStyle(target , 'top');
			var left = IPT.Css.getStyle(target , 'left');
	
			return { left : left == 'auto' ?  0 : parseInt(left) , 
					 top : top == 'auto' ?  0 : parseInt(left) };
		},
	
		setPosition : function(target , position){
			if(position.top){
				IPT.Css.setStyle(target , 'top' , position.top + 'px');
			}
			if(position.left){
				IPT.Css.setStyle(target , 'left' , position.left + 'px');				
			}
			return target;
		},
	
		getOffset : function(target,offsetAncestor){
			var offset = {top:0 , left:0};
			if(!offsetAncestor){
				offset.top = target.offsetTop;
				offset.left = target.offsetLeft;
			}else{
				do{
					offset.top += target.offsetTop;
					offset.left += target.offsetLeft;
					if(target == offsetAncestor){
						break;
					}else{
						target = target.offsetParent;
					}
				}while(target);
			}
			return offset;
		},
		
		getGlobalPosition : function(target){
			var position = {top:0 , left:0};
			do{
				position.top += target.offsetTop;
				position.left += target.offsetLeft;
				if(target == document.body){
					break;
				}else{
					target = target.offsetParent;
				}
			}while(target);
			return position;			
		},
		
		//{top:'' , left:''}
		//婵″倹鐏夌�纭呰杽閸樼喎鍘涢惃鍒緊sition閺嶅嘲绱＄仦鐐达拷閺勭椀tatic閻ㄥ嫯鐦介敍灞肩窗鐞氼偅鏁奸幋鎭焑lative閺夈儱鐤勯悳浼村櫢鐎规矮缍呴妴锟�
	
		setOffset : function(target , position){
			var positionType = IPT.Css.getStyle(target , 'position');
			if(positionType == 'static'){
				IPT.Css.setStyle(target , 'position' , 'relative');
			}
			if(position.top){
				var marginTop = parseInt(IPT.Css.getOffset(target).top) - parseInt(IPT.Css.getPosition(target).top);
				IPT.Css.setStyle(target , 'top' , (position.top - marginTop) + 'px');
			}
			if(position.left){
				var marginLeft = IPT.Css.getOffset(target).left - IPT.Css.getPosition(target).left;
				IPT.Css.setStyle(target , 'left' , (position.left - marginLeft) + 'px');				
			}
		},
	
		getScrollLeft : function(target){
			if(target == document.body){
				return IPT.Css.getPageScroll().left;
			}else{
				return target.scrollLeft;
			}
		},
	
		getScrollTop : function(target){
			if(target == document.body){
				return IPT.Css.getPageScroll().top;
			}else{
				return target.scrollTop;
			}
		},
			
		setScrollLeft : function(target ,value){
			target.scrollLeft = value;
			return true;
		},
	
		setScrollTop : function(target , value){
			target.scrollTop = value;
			return true;
		},
	
		getOpacity : function(target){
			var opacity = "";
			if(document.defaultView && document.defaultView.getComputedStyle){
				opacity = document.defaultView.getComputedStyle(target, "").getPropertyValue('opacity') || 1.0;
			}else if(target.filters){
				if(target.filters.length > 0 && target.filters.alpha){
					opacity = target.filters.alpha.opacity / 100.0 || 1.0;
				}else{
					opacity = 1.0;
				}
			}
			return opacity;
		},
	
		setOpacity : function(target ,opacity){
			if(target.style.opacity != undefined){ 
				target.style.opacity = opacity;
			}else if(target.style.MozOpacity != undefined){
				target.style.MozOpacity = opacity;
			}else if(target.style.filter != undefined){
				target.style.filter = 'Alpha(opacity = '+(opacity*100)+')';
			}else{
				return false;
			}
			return opacity;
		},
	
		getPageScroll : function() 
		{ 
			var x, y; 
			if(window.pageYOffset) 
			{    // all except IE    
				y = window.pageYOffset;    
				x = window.pageXOffset; 
			} else if(document.documentElement && document.documentElement.scrollTop) 
			{    // IE 6 Strict    
				y = document.documentElement.scrollTop;    
				x = document.documentElement.scrollLeft; 
			} else if(document.body) {    // all other IE    
				y = document.body.scrollTop;    
				x = document.body.scrollLeft;   
			} 
			return {left:x, top:y};
		}			
	}
	
	IPT.String = {
		trim : function(string) {
			return string.replace(/^\s+/, '').replace(/\s+$/, '');
		},
		
		trimStart : function(string){
			return string.replace(/^\s+/, '');
		},
		
		trimEnd : function(string){
			return string.replace(/\s+$/,'');
		},
	
		isEmpty : function(string){
			return string == '';
		},
	
		isBlank : function(string){
			return /^\s*$/.test(string);
		},
	
		include: function(string,pattern) {
			return string.indexOf(pattern) > -1;
		},
	
		startsWith: function(string , pattern) {
			return string.indexOf(pattern) === 0;
		},
	
		endsWith : function(string , pattern) {
			var d = string.length - pattern.length;
			return d >= 0 && string.lastIndexOf(pattern) === d;
		},
		
		toCharArray : function(string){
			return string.split('');
		},
	
		camelize : function(string){
			return string.replace(/-+(.)?/g, function(match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
		},
	
		uncamelize : function(string, sep) {
			var sep = sep || '-';
			return string.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
				return p1 + sep + p2.toLowerCase();
			});
		},
	
		//妫ｆ牕鐡уВ宥呫亣閸愶拷
		capitalize : function(string){
			return string.charAt(0).toUpperCase() + string.substring(1);
			//return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
		},
	
		truncate : function(string , length, truncation) {
			length = length || 30;
			truncation = truncation ? truncation : '...';
			return string.length > length ? string.slice(0, length - truncation.length) + truncation : string;
		},
		
		escapeHTML : function(string){
		    return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		},
		
		unescapeHTML : function(string){
		    return string.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
		}			
	}
	
	IPT.Class = {
			/**
			 * @param config { import , extend , implements, constructor ,  methods , statics ,augments ,singleton}
			 **/
			define : function( namespace , config){
				if(!namespace){
					throw new Error('IPT.Class.define: class name is null.');
				}
				
				config.extend = config.extend || null;
				config.constructor = config.constructor || function(){};
				config.methods = config.methods || {};
				config.statics = config.statics || {};
				config.augments = config.augments || [];
				config.singleton = config.singleton && $.trim(config.singleton.toString().toLowerCase()) == 'true' ? true : false;
				registerNamespace(namespace);

				
				var Class = IPT.Class;
				if(config.statics && typeof config.statics === 'object'){
					for(var i in config.statics){
						config.constructor[i] = config.statics[i];
					}
				}
				
				if(config.extend){
					if( typeof config.extend === 'string'){
						var extend = getNamespaceFromString(config.extend);
						if(extend){
							Class.extend(config.constructor , extend);
						}else{
							throw new Error('IPT.Class.define: extend from a invalid Class:[' + config.extend + ']');
						}
					}else{
						Class.extend(config.constructor , config.extend);
					}
				}
				
				if(config.methods && typeof config.methods === 'object'){
					Class.addMethods(config.constructor , config.methods , true);
				}
				
				if(typeof config.augments === 'array'){
					$.each(config.augments , function(i,elem){
						if(typeof elem === 'string'){
							elem = getNamespaceFromString(elem);
						}
						Class.augments(config.constructor , elem);
					});
				}
				
				config.constructor.callParent = function(scope){
					var parent = config.constructor.superClass.constructor;
					var arguArray = [];
					for(var i = 1 , iLen = arguments.length ; i < iLen ; i++){
						arguArray.push(arguments[i]);
					}
					parent.apply(scope, arguArray);
				}
				
				function registerNamespace(namespaceStr){
					var namespace = null,
						array = namespaceStr.split('.');
						array = array.length > 0 ? array : [namespaceStr];
						
					for(var i = 0 , iLen = array.length , scope; i < iLen ; i++){
							scope = $.trim(array[i]);
							if( i === 0 ){
								namespace = window[scope] ? window[scope] : window[scope] = {};	
								if( i === iLen -1){
									if(config.singleton){
										window[scope] = (function(){
											var instance = null;
											return {
												getInstance : function(){
													if(instance){
														return instance;
													}else{
														instance = new config.constructor();
														return instance;
													}
												}
											};
										})();
									}else{
										window[scope] = config.constructor;
									}
								}
							}else if( i === iLen -1 ){
								if(config.singleton){
									namespace = namespace[scope] = (function(){
										var instance = null;
										return {
											getInstance : function(){
												if(instance){
													return instance;
												}else{
													instance = new config.constructor();
													return instance;
												}
											}
										};
									})();
								}else{
									namespace = namespace[scope] = config.constructor;
								}
							}else{
								namespace = namespace[scope] ? namespace[scope] : namespace[scope] = {};
							}
					}
				}
				
                 function getNamespaceFromString(namespaceStr){
					var namespace = null , 
						array = namespaceStr.split('.');	
						array = array.length > 0 ? array : [namespaceStr];

					for(var i = 0 , iLen = array.length ,scope; i < iLen ; i++){
						scope = $.trim(array[i]);
						if( i == 0 ){
							if(window[scope]){
								namespace = window[scope] ;
							}else{
								return null;
							}
						}else{
							if(namespace[scope]){
								namespace = namespace[scope]
							}else{
								return null;
							}
						}
					}
					return namespace;
				}
			},

			extend : function(subClass , superClass){
			  var F = function() {};
			  F.prototype = superClass.prototype;
			  subClass.prototype = new F();
			  subClass.prototype.constructor = subClass;

			  subClass.superClass = superClass.prototype;
			  if(superClass.prototype.constructor == Object.prototype.constructor){
				superClass.prototype.constructor = superClass;
			  }
			},

			clone : function(object) {
				function F() {}
				F.prototype = object;
				return new F;
			},
			
			augments : function(receivingClass , givingClass){
			  if(arguments[2]) {
				for(var i = 2, len = arguments.length; i < len; i++) {
				  receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
				}
			  } 
			  else {
				for(methodName in givingClass.prototype) { 
				  if(!receivingClass.prototype[methodName]) {
					receivingClass.prototype[methodName] = givingClass.prototype[methodName];
				  }
				}
			  }
			},
			
			addMethods : function(_class){
				var arguNums = arguments.length,
					isOverride = true;
				if( jQuery.type(arguments[arguNums-1]) === "boolean" ){	
					isOverride = arguments[arguNums-1];
					arguNums = arguNums - 1;
				}
				if(arguNums < 2){
					return _class;
				}
				for(var i = 1 , len = arguNums ; i < len ; i ++ ){
					for(var method in arguments[i]){
						if( _class.prototype[method] && !isOverride ){
							continue;
						}
						_class.prototype[method] = arguments[i][method];
					}
				}
				return _class;
			}
	};//end of IPT.Class
	
	(function(){
	  var cache = {};
	  
	  IPT.Class.define("IPT.Template", {
		 constructor : function(tpl){
				this.tpl = tpl; 
		  },
		  
		  methods : {
			  applyTpl : function(data){
				  var fn = this.compile();
				  return fn(data);
			  } ,
			  
			  compile : function(){
				var str = this.tpl;
				if(cache[str]){
					return cache[str];
				}else{
					cache[str] = new Function("obj",
				  	        "var p=[],print=function(){p.push.apply(p,arguments);};" +
				  	        // Introduce the data as local variables using with(){}
				  	        "with(obj){p.push('" +
				  	        // Convert the template into pure JavaScript
				  	        str
				  	          .replace(/[\r\t\n]/g, " ")
				  	          .split("<%").join("\t")
				  	          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
				  	          .replace(/\t=(.*?)%>/g, "',$1,'")
				  	          .split("\t").join("');")
				  	          .split("%>").join("p.push('")
				  	          .split("\r").join("\\'")
				  	      + "');}return p.join('');");	
					return cache[str];
				}
			  }
		  }
	  });//end of IPT.Class.define("IPT.Template"
	})();
	
	IPT.widget = {
		register : function(name,clazz){
			if(this[name]){
				throw new Error("name " + name + " had registerd !");
			}else{
				this[name] = clazz;
			}
		},
		
		create : function(config){
			var xtype = config.xtype;
			if(xtype && $.type(xtype) === "string"){
				if(IPT.widget[xtype]){
					var widget = new IPT.widget[xtype](config);
					return widget;
				}else{
					throw new Error("widget xtype " + name + "is not registered!");
				}
			}else{
				//console.log(config);
				throw new Error("widget xtype is invalid!");
			}			
		},
		
		get : function(id){
			if($.type(id) === "string"){
				var component = IPT.ComponentMgr.getInstance().get(id);
				if(!component){
					throw new Error("Error#0009 : the component id is \"" + id + "\" is not found!");
				}
				return component;
			}else{
				throw new Error("Error#0010 : id is invaild!");
			}
		}
	}
	window.IPT = IPT;
})(window)