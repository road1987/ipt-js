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
/**
 * @author LiHongChun
 * @date 2012-12-17
 * @version 1.0
 */
IPT.Class.define(' IPT.events.EventObject ' , {
		 constructor : function(){
		 },

		 methods : {
			 
		 },
		 
		 statics : {
			//mouse Event
			CLICK : 'click' , 
			DOUBLE_CLICK : 'dblclick',
			MOUSE_DOWN : 'mousedown',
			MOUSE_MOVE : 'mousemove',
			MOUSE_OVER : 'mouseover',
			MOUSE_OUT : 'mouseout',
			MOUSE_UP : 'mouseup',
			MOUSE_WHEEL : 'mousewheel',
			CONTEXT_MENU : "contextmenu",
			
			//focus Event
			BLUR : 'blur',
			FOCUS : 'focus',
			
			//panel/window event
			COLLAPSED : 'collapsed',
  			EXPANDED : 'expanded',
  			MINIMIZED : 'minimized',
  			MAXIMIZED : 'maximized',
  			CLOSED : 'closed',
  			RESIZE : 'resize',
  				
  			//form event
  			CHECK : "check",
  			
  			//DnD
			DRAG_START : "dragstart", 
			DRAG : "drag",
			//drop element
			DRAG_ENTER : "dragenter",
			DRAG_LEAVE : "dragleave",
			DRAG_OVER : "dragover",
			DROP : "drop",
			DRAG_END : "dragend",
			//paging
			PAGE_SIZE_CHANGED : "pageindexchanged",
			PAGE_INDEX_CHANGED : "pagesizechanged"
		 }
});
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
IPT.Class.define('IPT.dnd.DragDropMgr' , {
	 	 singleton : true,
		 
		 constructor : function( source  , handle){
			this.isDragStarting = false;
			this.dragSourceArray = [];
			this.dropTargetArray = [];
		 },
		 
		 methods : {
			 getActivedDragObject : function(){
			 	return this.activeDragObject;
		 	 },
		 	 
		 	 setActivedDragObject : function(object){
		 		 this.activeDragObject = object;
		 		 return this;
		 	 },
		 	 
		 	 getActivedDropObject : function(){
		 		 return this.activeDropObject;
		 	 },
		 	 
		 	 setActivedDropObject : function(object){
		 		 this.activeDropObject = object;
		 		 return this;
		 	 },
		 	 
		 	 getAllDragSource : function(){
		 		 
		 	 },
		 	 
		 	 getAllDropTarget : function(){
		 		 return this.dropTargetArray;
		 	 },
		 	 
		 	 registerDragSource : function(dragSource){
		 		this.dragSourceArray.push(dragSource);
		 		return this;
		 	 },
		 	 
		 	 unRegisterDragSource : function(dragSource){
		 		 //
		 	 },
		 	 
		 	 registerDropTarget : function(dropTarget){
		 		 this.dropTargetArray.push(dropTarget);
		 		 return this;
		 	 },
		 	 
		 	 unRegisterDropTarget : function(dropTarget){
		 		 //
		 		 return this;		 		 
		 	 }
		 }
 });
IPT.Class.define('IPT.dnd.DropTarget' , {
		 extend : 'IPT.events.EventDispatcher',
		 
		 constructor : function(target){
			IPT.dnd.DropTarget.callParent(this);
			this.target = target;
			this.state = null;
			IPT.dnd.DragDropMgr.getInstance().registerDropTarget(this);
		 },
		 
		 methods : {
			setCurrentState : function(state){
			 	this.state = state;
		 	},
		 	
		 	getCurrentState : function(){
		 		return this.state;
		 	},
		 	
		 	getTarget : function(){
		 		return this.target;
		 	},
		 	
		 	onDragEnter : function(){
		 		this.fireEvent("dragenter");
		 		return true;
		 	},
		 	
		 	onDragOver : function(){
		 		this.fireEvent("dragover");
		 		return true;
		 	},
		 	
		 	onDragLeave : function(){
		 		this.fireEvent("dragleave");
		 		return true;
		 	},
		 	
		 	onDrop : function(e , source){
		 		this.fireEvent("drop" , e, source);
		 		return true;
		 	}
		 }
 });
IPT.Class.define('IPT.dnd.DragSource' , {
		 extend : 'IPT.events.EventDispatcher',
		 
		 constructor : function( source  , handle){
		    IPT.dnd.DragSource.callParent(this);
			this.dragSource = source;
			this.dragHandle = handle;
			this.initComponent();
		 },
		 
		 methods : {
			getDragSource : function(){
			 	return this.dragSource; 
		 	},
		 	
		 	getDragHandle : function(){
		 		return this.dragHandle || this.dragSource;
		 	},
		 	
			initialize : function(config){

			},

				 //override
			initComponent : function(){
				this._initEvent();
				return true;
		    },
		 	
		    onDragStart : function(e){
		    	this.fireEvent("dragstart",e);
		    	return true;
		    },
		    
		    onDrag : function(e){
		    	this.fireEvent("drag",e);
		    	return true;
		    },
		    
		    onDragEnd : function(e){
		    	this.fireEvent("dragend",e);
		    	return true;
		    },
		    
		 	_initEvent : function(){
		 		var _this = this,
		 			dragSource = this.getDragSource(),
		 			dragSourcePosition = null;
		 			dragHandle = this.getDragHandle(),
		 			dragDropMgr = IPT.dnd.DragDropMgr.getInstance(),
		 			activedDropObj = null;
		 		
		 		var currentPoint_source = {left : 0 , top : 0 },
		 			currentPoint_mouse = {left : 0 , top : 0 },//initial mouse location;
		 			isMouseIn = IPT.Dom.isMouseIn;
		 		
		 		$(dragHandle).bind("mousedown" , dragStartHandle);
		 		function dragStartHandle(e){
		 		
		 			currentPoint_mouse = { left : e.pageX , top : e.pageY };
		 			currentPoint_source = IPT.Css.getGlobalPosition(dragSource);
		 			dragSourcePosition = $(dragSource).css("position");
		 			$(dragSource).css({
		 				position: "absolute",
		 				left : currentPoint_source.left + "px",
		 				top : currentPoint_source.top + "px"
		 			});
		 			$(document).bind("mousemove" , dragOnHandle);
		 			$(document).bind("mouseup" , dragStopHandle);
		 			IPT.Event.cancelBubble(e);
		 			
		 			_this.onDragStart(e);
		 			$.each(dragDropMgr.getAllDropTarget() , function(){
		 				var isContain = isMouseIn(this.getTarget(), e);
		 				if(isContain){
		 					this.onDragEnter();
		 					this.onDragOver();
		 					dragDropMgr.setActivedDropObject(this);
		 				}
		 			});
		 			return false;
		 		}
		 		
		 		function dragOnHandle(e){
		 			var distance = { 
		 					dx : e.pageX - currentPoint_mouse.left,
		 					dy : e.pageY - currentPoint_mouse.top
		 			};
		 			currentPoint_source = {
		 					left : currentPoint_source.left + distance.dx,
		 					top : currentPoint_source.top + distance.dy 
		 			};

			 		$(dragSource).css({
			 				left : currentPoint_source.left,
			 				top :  currentPoint_source.top
			 		});
		 			
		 			currentPoint_mouse = { left : e.pageX , top : e.pageY };
		 			activedDropObj = dragDropMgr.getActivedDropObject();
		 			
		 			_this.onDrag(e);
		 			if(activedDropObj && !isMouseIn(activedDropObj.getTarget() , e)){
			 			activedDropObj.onDragLeave();
		 			}
		 			$.each(dragDropMgr.getAllDropTarget() , function(){
		 				var isContain = isMouseIn(this.getTarget(), e);
		 				if(isContain){
		 					if(activedDropObj !== this){
		 						this.onDragEnter();
		 					}
		 					this.onDragOver();
		 					dragDropMgr.setActivedDropObject(this);
		 				}
		 			});
		 			return true;
		 		}
		 		
		 		function dragStopHandle(e){
			 		$(dragSource).css({
			 				left : currentPoint_source.left,
			 				top :  currentPoint_source.top
			 		});
		 			$(document).unbind("mousemove" , dragOnHandle);
		 			$(document).unbind("mouseup" , dragStopHandle);	
		 			var dropObject = dragDropMgr.getActivedDropObject();
		 			if(dropObject){
		 				dropObject.onDrop(e,dragSource);
		 			}
		 			
		 			$(dragSource).css("position" , dragSourcePosition);
		 			dragDropMgr.setActivedDragObject(null);
		 			dragDropMgr.setActivedDropObject(null);
		 			_this.onDragEnd(e);
		 			return false;
		 		}
		 	}
		 }
 });
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
IPT.Class.define('IPT.ComponentMgr' , {

		 singleton : true,

		 constructor : function(){
			this.components = {};
		 },

		 methods : {
			register : function(component){
				var id = component.getId();
				this.components[id] = component;
			},

			unRegister : function(component){
				var id = component.getId();
				this.components[id] = null;
				delete this.components[id];
				return true;
			},

			get: function(id){
				return this.components[id];
			}, 
			 
			getAll : function(){
				return this.components;
			},
			
			each : function(fun){
				$.each(this.components , fun);
			}
		 },

		 statics : {
			
		 }
 });
IPT.Class.define('IPT.Component' , {

	     extend : 'IPT.events.EventDispatcher',

		 constructor : function(config){
			IPT.Component.callParent(this);
			this.initialize(config);
			IPT.ComponentMgr.getInstance().register(this);
			this.render();
		 },

		 methods : (function(){
			 var autoid = 1000 ;
			 
			 return {
				id : null,

				cls : null,
				
				top : null,
				
				left : null,
				
				width : "auto",
				
				height : "auto",
				
				minWidth : 0,
				
				minHeight : 0,
				
				listeners : {},
				
				renderTo : null,
				
				mouseOverCls : "ipt-mouse-over", 
				/**
				 * initialize info from config arguments , didn't build relative with dom.
				 * @returns
				 */
				initialize : function(config){
					for(var i in config){
						if(typeof this[i] !== "undefined" && typeof this[i] !== "function"){
							this[i] = config[i];
						}
					}
					for(var i in this.listeners){
						this.addListener(i , this.listeners[i]);
					}
					return true;
				},
				
				/**
				 *	after render , set component property like width , height , cls etc..
				 */
				initComponent : function(){
					this.setWidth(this.width);
					this.setHeight(this.height);
					this.addClass(this.cls);
					this.setPosition(this.left, this.top);	
					return true;
				},
				
				//render the component to the target container/element, and initialize at the first time.
				render : function(component){
					if(!component){
						if(this.renderTo){
							if(this.renderTo.isComponent && this.renderTo.isComponent()){
								this.renderTo.add(this);
							}else{
								//render to html Element, out of control of layout
								var elem = this.getElement();
								$(this.renderTo).append(elem);	
							}
						}else{
							return false;
						}
					}else{
						if(component.isComponent && component.isComponent()){
							component.add(this);
						}else{
							var elem = this.getElement();
							$(component).append(elem);
						}
					}
					
					if(!this._isInitialized){
						this.initComponent();
						this._isInitialized = true;
					}
					return this;
				},
				
				getId : function(){
					return this.id || (this.id = "ipt-comp-" + autoid++);
				},

				getXType : function(){
					return this.constructor.XTYPE;
				},
				
				isXTypeOf : function(type){
					return this.getXType() === type;
				},
				
				addClass : function(className){
					if(!className){
						return false
					};
					var elem = this.getElement();
					$(elem).addClass(className);
					return this;
				},

				removeClass : function(className){
					var elem = this.getElement();
					$(elem).removeClass(className);
					return this;
				},
				
				getSize : function(){
					var elem = this._getSizeElement(),
						width = $(elem).width(),
						height = $(elem).height();
					return {width: width , height: height};
				},

				setSize : function(width , height){
					this.setWidth( width );
					this.setHeight( height );
					this.fireEvent(IPT.events.EventObject.RESIZE);
					return this;
				},
				
				getWidth : function(){
					var elem = this._getSizeElement();
					return $(elem).width();
				},
				
				setWidth : function(width){
					if( width - 0 < this.minWidth - 0){
						width = this.minWidth;
					}
					var elem = this._getSizeElement();
						$(elem).width(width);
					this.fireEvent(IPT.events.EventObject.RESIZE);
					return this;
				},

				getHeight : function(){
					var elem = this._getSizeElement();
					return $(elem).height();			
				},
				
				setHeight : function(height){
					if( height - 0 < this.minHeight - 0){
						height = this.minHeight;
					}
					var elem = this._getSizeElement();
						$(elem).height(height);
					this.fireEvent(IPT.events.EventObject.RESIZE);
					return this;
				},
				
				setPosition : function(left , top){
					if(left && top){
						var elem = this.getElement();
						$(elem).css('position' , 'absolute');
						if($.type(left) == "number" ||  left - 0 ){
							$(elem).css({left:left + 'px' , top : top + 'px'});
						}else{
							$(elem).css({left:left , top : top });					
						}
						return true;
					}
					return false;
				},
				
				setVisible : function(boolean){
					var elem = this._getSizeElement(),
						visible = $.trim(boolean.toString().toLowerCase()) == 'true' ? true : false;
					
					if(visible){
						this.show();
					}else{
						this.hidden();
					}
					return this;
				},
				
				isVisible : function(){
					var elem = this.getElement();
					return $(elem).css('display') == 'none' ? false : true;
				},
				
				//behavior
				focus : function(){
					var focusElement = this._getFocusElement();
						focusElement.focus();
					return this;
				},

				blur : function(){
					var focusElement = this._getFocusElement();
						focusElement.blur();
					return this;
				},

				show : function(){
					var elem = this.getElement();
					$(elem).css("display" , "");
					return this;
				},

				hidden : function(){
					var elem = this.getElement();
					$(elem).css("display" , "none");
					return this;
				},
			
				disable : function(){
					var elem = this._getDisabledElement();
					elem.disabled = true;
					return this;
				},

				enable : function(){
					var elem = this._getDisabledElement();
					elem.disabled = false;
					return this;				
				},

				isEnabled : function(){
					var elem = this._getDisabledElement();
					return elem.disabled ;
				}, 

				destroy : function(){
					var elem = this.getElement();
					$(elem).remove();
					return this;
				},

				getParent : function(){
					
				},
				
				getPrevSibling : function(){
				
				},

				getNextSibling : function(){
				
				},

				getElement : function(){
					if(!this.element){
						var tpl = this.tpl();
							tpl = new IPT.Template(tpl);
						this.element = $(tpl.applyTpl(this)).first().get(0);
					}
					return this.element;
				},
				
				isComponent : function(){
					return true;
				},
				
				//override if there are something change.
				_getFocusElement : function(){
					return this.getElement();
				},
				
				_getSizeElement : function(){
					return this.getElement();
				},
				
				_getDisabledElement : function(){
					return this.getElement();
				}
			 };
		 })(),
		 
		 statics : {
			XTYPE : 'component'
		 }
 });
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
IPT.Class.define('IPT.Toolbar' , {
		 extend : 'IPT.Container',
		 
		 constructor : function(config){
			IPT.Toolbar.callParent(this,config);
		 },
		 

		 methods :  {
			 	 baseCls : "ipt-toolbar",
				 //override
				 initialize : function(config){
				 	IPT.Toolbar.superClass.initialize.call(this,config);
				 	return this;
			 	 },
			 	 
			 	 add : function(items){
			 		if(!(items.isXTypeOf && items.isXTypeOf("button") )){
			 			$.each(items , function(i,item){
			 				item.xtype = "button";
			 			});
			 		}
			 		IPT.Toolbar.superClass.add.call(this,items);
			 	 },
			 	 
			 	 //override
				 initComponent : function(){
					 IPT.Toolbar.superClass.initComponent.call(this);
					 return this;
				 },
				 
				 tpl : function(){
						return '<div class="<%=baseCls%>">' + 
								'<div class="<%=baseCls%>-contentContainer"></div>'+
						'</div>';
				 }
		},

		 statics : {
			    XTYPE : "toolbar"
		 }
 });
IPT.widget.register(IPT.Toolbar.XTYPE, IPT.Toolbar);
IPT.Class.define('IPT.button.BaseButton' , {
		 extend : 'IPT.Component',
		 constructor : function(config){
			IPT.button.BaseButton.callParent(this,config);
		 },

		 methods :  {
				 text : "button",
				 
				 iconCls : null,
				 
				 selected : false,
				 
				 disabled : false,
				 
				 menu : null,					

				initialize : function(config){
					IPT.button.BaseButton.superClass.initialize.call(this,config);
					if($.type(config) === "string"){
						this.text = config;
					}
					return true;
				},
				
				initComponent : function(){
					IPT.button.BaseButton.superClass.initComponent.call(this);
				 	this.setText(this.text);
				 	this.setIconClass(this.iconCls);
				 	this.setMenu(this.menu);
				 	this.setSelected(this.selected);
				 	if(this.disabled){
				 		this.disable();
				 	}
					if(this.menu && !(this.menu instanceof IPT.menu.Menu)){
						this.menu = new IPT.menu.Menu(this.menu);
					}
					return true;
				},
				
				isSelected : function(){
					return this.selected;
				},
				
				isPressed : function(){
					return this.pressed;
				},
				
				setSelected : function(boolean){
					this.selected = $.trim(boolean.toString().toLowerCase()) == 'true' ? true : false;
					return this;
				},
	
				setPressed : function(boolean){
					this.pressed = $.trim(boolean.toString().toLowerCase()) == 'true' ? true : false;
					return this;
				},
	
				getText : function(){
					return this.text;
				},
	
				setText : function(text){
					$(this._getTextField()).html(text);	
					this.text = text;
					return this;
				},
				
				setIconClass : function(iconCls){
					if(!iconCls){
						return false;
					}
					var iconField = $(this._getIconField()),
						textField = $(this._getTextField());
					if(this.iconCls){
						iconField.removeClass(this.iconCls);
					}
					iconField.addClass(iconCls);
					this.iconCls = iconCls;
					return this;
				},
	
				getIconClass : function(){
					return this.iconCls;
				},

				getMenu : function(){
					return this.menu;
				},
				
				setMenu : function( menu ){
					this.menu = menu;
					return this;
				},
				
				removeMenu : function(){
					this.menu = null;
					return this;
				},
				
				showMenu : function(direction){
					//H 水平
					this.menu.show();
					var elem = this.getElement(),
						elemPosition = IPT.Css.getGlobalPosition(elem),
						size = this.getSize(),
						menuPosition = {};

					if(direction == "V"){//vitical
						menuPosition.left = elemPosition.left;
						menuPosition.top = elemPosition.top + size.height;
						//menuPosition.left = menuPosition.left + this.menu.getWidth() > IPT.Css.getScrollLeft(document.body) + IPT.$.getViewportSize().width ? menuPosition.left - this.getWidth() - this.menu.getWidth() : menuPosition.left ;
						menuPosition.top = menuPosition.top + this.menu.getHeight() > IPT.Css.getScrollTop(document.body) + IPT.Dom.getViewportHeight() ? menuPosition.top - this.getHeight() - this.menu.getHeight(): menuPosition.top ;
					}else{//horizon
						menuPosition.left = elemPosition.left + size.width;
						menuPosition.top = elemPosition.top;
						menuPosition.left = menuPosition.left + this.menu.getWidth() > IPT.Css.getScrollLeft(document.body) + IPT.Dom.getViewportWidth() ? menuPosition.left - this.getWidth() - this.menu.getWidth() : menuPosition.left ;
						menuPosition.top = menuPosition.top + this.menu.getHeight() > IPT.Css.getScrollTop(document.body) + IPT.Dom.getViewportHeight() ? menuPosition.top + this.getHeight() - this.menu.getHeight(): menuPosition.top ;
					}
					
					this.menu.showAt(menuPosition.left , menuPosition.top);
					return this;
				},
				
				hiddenMenu : function(){
					if(this.menu){
						this.menu.hidden();
					}
					return this;
				},
	
				_getTextField : function(){
					var elem = this.getElement();
					return $(elem).find(".ipt-btn-text").get(0);
				},
				
				_getIconField : function(){
					var elem = this.getElement();
					return $(elem).find(".ipt-btn-icon").get(0);
				}
		 }
 });
IPT.Class.define('IPT.button.Button' , {
		 extend : 'IPT.button.BaseButton',
		 constructor : function(config){
			IPT.button.Button.callParent(this,config);
			this.enableToggle = true;
			this.render();
		 },
		 

		 methods : {
			baseCls :"ipt-btn",
			hoverCls : "ipt-btn-hover",
			pressedCls : "ipt-btn-pressed",
			focusCls : "ipt-btn-hover",
			
			//override
			initComponent : function(){
				IPT.button.Button.superClass.initComponent.call(this);
				this._initEvent();	
			},
			
			//override
			setIconClass : function(iconCls){
				if(!iconCls){
					return false;
				}
				var iconField = $(this._getIconField()),
					textField = $(this._getTextField());
				if(this.iconCls){
					iconField.removeClass(this.iconCls);
				}
				iconField.addClass(iconCls);
				this.iconCls = iconCls;
				textField.css({
					'padding-left' : iconField.width() + 'px',
					'height' : iconField.height() + 'px',
					'lineHeight' : iconField.height() + 'px'
				});
				return this;
			},
			
			setTooltip : function(toolTip){
				this.toolTip = toolTip;
				return this;
			},

			removeToolTip : function(){
				this.toolTip = null;
				return this;
			},

			showToolTip : function(){
				this.toolTip.show();
			},
			
			//override
			showMenu : function(){
				this.constructor.superClass.showMenu.call(this, "V");
				return this;
			},
			
			//override
			_getFocusElement : function(){
				var elem = this.getElement();
				return $(elem).find("button").get(0);
			},
			
			_getSizeElement : function(){
				var elem = this.getElement();
				return $(elem).find("button").get(0);
			},
			
			_getDisabledElement : function(){
				var elem = this.getElement();
				return $(elem).find("button").get(0);
			},
			
			_getTextField : function(){
				var elem = this.getElement();
				return $(elem).find(".ipt-btn-text").get(0);
			},
			
			_getIconField : function(){
				var elem = this.getElement();
				return $(elem).find(".ipt-btn-icon").get(0);
			},
			
			//private
			_onMouseOver : function(){
				var elem = this.getElement();
				$(elem).addClass(this.hoverCls);
				return this;
			},

			_onMouseOut : function(){
				var elem = this.getElement();
				$(elem).removeClass(this.hoverCls);
				$(elem).removeClass(this.pressedCls);
				return this;
			},

			_onMouseDown : function(){
				var elem = this.getElement();
				$(elem).addClass(this.pressedCls);
				return this;
			},

			_onMouseUp : function(){
				var elem = this.getElement();
				$(elem).removeClass(this.pressedCls);
				return this;
			},

			_onFocus : function(){
				var elem = this.getElement();
				$(elem).addClass(this.focusCls);
				return this;
			},

			_onBlur : function(){
				var elem = this.getElement();
				$(elem).removeClass(this.focusCls);
				$(elem).removeClass(this.pressedCls);
				return this;
			},

			_initEvent : function(){
				var _this = this , elem = this.getElement() , button = $(elem).find("button").get(0);
				$(button).bind('mouseover' , function(){
					_this._onMouseOver.call(_this);
					_this.fireEvent('mouseover');
					return false;
				});

				$(button).bind('mouseout' , function(){
					_this._onMouseOut.call(_this);
					_this.fireEvent('mouseout');
					return false;
				});

				$(button).bind('click' , function(){
					_this.fireEvent('click');
				});

				$(button).bind('dblclick' , function(){
					_this.fireEvent('dblclick');
				});

				$(button).bind('mousedown' , function(){
					_this._onMouseDown.call(_this);
				});

				$(button).bind('mouseup' , function(){
					_this._onMouseUp.call(_this);
				});

				$(button).bind('focus' , function(){
					_this._onFocus.call(_this);
				});

				$(button).bind('blur' , function(){
					_this._onBlur.call(_this);
				});
			},
			
			tpl :function(){
				return ['<div class="<%=baseCls%>">' ,
						 	'<span class="ipt-btn-arrow ipt-btn-arrow-bottom">',
						 		'<button autocomplete="off" role="button" hidefocus="true" type="button">' ,
						 			'<span class="ipt-btn-text">&nbsp;</span>' ,
						 			'<span class="ipt-btn-icon">&nbsp;</span>' ,
						 		'</button>',
						    '</span>',
						 '</div>'].join("");
			}
		 },
		 
		 statics : {
			 XTYPE : "button"
		 }
 });
IPT.widget.register(IPT.button.Button.XTYPE, IPT.button.Button);
IPT.Class.define('IPT.menu.MenuMgr' , {
		 singleton : true,
		 
		 constructor : function(){
			this.menus = {};
			this.initialize();
 		 },
		 
		 methods : {
 			initialize : function(){
 			 	var _this = this;
 			 	$(document).bind('mousedown' , function(){
 			 		_this.hiddenAll();
 			 	});
 		 	},
 		 	
 			register : function(menu){
				var id = menu.getId();
				this.menus[id] = menu;	
				return this;
 		 	},
 		 	 
 			unRegister : function(menu){
 				var id = menu.getId();
 				this.menus[id] = null;
 				delete this.menus[id];
 				return true;	 
 		 	 },
 		 	 
 			 getMenu : function(id){
 			 	 return this.menus[id] || null;
 		 	 },
 		 	 
 		 	 hiddenAll : function(){
 		 		 for(var i in this.menus){
 		 			 this.menus[i].hidden();
 		 		 }
 		 		 return this;
 		 	 }
		 },
		 
		 statics : {
			 
		 }
 });
IPT.Class.define('IPT.menu.MenuItem' , {
		 extend : 'IPT.button.BaseButton',
		 constructor : function(config){
			IPT.menu.MenuItem.superClass.constructor.call(this,config);
		 },
		 

		 methods : {
			baseCls : "ipt-menuItem",
			hoverCls : "ipt-menuItem-hover",
			pressedCls : "ipt-menuItem-pressed", 
			focusCls : "ipt-menuItem-hover", 
			activedCls : "ipt-menuItem-actived", 
			
			//override
			initialize : function(config){
			  this.constructor.superClass.initialize.call(this , config);
		 	},
		 	
			//override
		 	initComponent : function(){
				IPT.menu.MenuItem.superClass.initComponent.call(this);
				this._initEvent();	
			},
			
			_getSizeElement : function(){
				return $(this.element).find("a")[0];
			},
			
			_getEventElement : function(){
				return $(this.element).find("a")[0];
			},
			
			_getTextField : function(){
				return $(this.element).find("." + this.baseCls + '-text')[0];				
			},

			_getIconField : function(){
				return $(this.element).find("." + this.baseCls + '-icon')[0];
			},
			//private
			_onMouseOver : function(){
				$(this.element).addClass(this.hoverCls);
				return this;
			},
			
			_onMouseOut : function(){
				$(this.element).removeClass(this.hoverCls);
				$(this.element).removeClass(this.pressedCls);
				return this;
			},

			_onMouseDown : function(){
				$(this.element).addClass(this.pressedCls);
				return this;
			},

			_onMouseUp : function(){
				$(this.element).removeClass(this.pressedCls);
				return this;
			},

			_onFocus : function(){
				$(this.element).addClass(this.focusCls);
				return this;
			},

			_onBlur : function(){
				$(this.element).removeClass(this.focusCls);
				$(this.element).removeClass(this.pressedCls);
				return this;
			},
			
			_initEvent : function(){
				var _this = this;
				var EventObject = IPT.events.EventObject;
				var elem = this.element;
				var aLink = this._getEventElement();
				
				$(aLink).bind( "mouseover" , function(){
					_this._onMouseOver.call(_this);
					_this.fireEvent( EventObject.MOUSE_OVER );
					return false;
				});

				$(aLink).bind( "mouseout" , function(){
					_this._onMouseOut.call(_this);
					_this.fireEvent( EventObject.MOUSE_OUT );
					return false;
				});

				$(aLink).bind( "click" , function(event){
					_this.fireEvent( EventObject.CLICK );
				});

				$(aLink).bind( "dblclick" , function(){
					_this.fireEvent(  EventObject.DOUBLE_CLICK  );
				});

				$(aLink).bind(  "mousedown"  , function(event){
					_this._onMouseDown.call(_this);
					IPT.Event.cancelBubble(event);
				});

				$(aLink).bind( "mouseup" , function(){
					_this._onMouseUp.call(_this);
				});

				$(aLink).bind( "focus" , function(){
					_this._onFocus.call(_this);
					_this.fireEvent( EventObject.FOCUS );
				});

				$(aLink).bind( "blur" , function(){
					_this._onBlur.call(_this);
					_this.fireEvent( EventObject.BLUR );
				});
			},
			
			tpl : function(){
				return [
				        '<div class="<%=baseCls%>">' ,
				        	'<a href="#" hidefocus="true">',
				        		'<img class="<%=baseCls%>-icon" src="../../themes/spacer.gif"/>' ,
				        		'<span class="<%=baseCls%>-text">',
				        			'&nbsp;',
				        		'</span>' ,
				        	'</a>',
				        '</div>'].join('');
			}
		 },

		 statics : {
			 XTYPE : "menuItem"
		 }
 });
IPT.widget.menuItem = IPT.menu.MenuItem;
IPT.Class.define('IPT.menu.Menu' , {
		 extend : 'IPT.Container',
		 constructor : function(config){
			IPT.menu.Menu.superClass.constructor.call(this,config);
			IPT.menu.MenuMgr.getInstance().register(this);
			this.render(document.body);
		},
		 
		 methods : {
					 baseCls : "ipt-menu",
					
					 layout : 'menu',
					 
					 items : [],
					 
					 width : "100px",
					 
					 //override
					 initialize : function(config){
						IPT.Container.prototype.initialize.call(this , config);
						//fix config infomation
					 	for(var i = 0 , len = this.items.length ; i < len ; i++){
					 		//var item = new IPT.menu.MenuItem(this.items[i]);
					 		//this.add(item);
					 		if(typeof this.items[i] === "string"){
					 			this.items[i] = { 
					 					xtype : "menuItem",
					 					text : this.items[i]
					 			}
					 		}else{
					 			this.items[i].xtype = "menuItem";
					 		}
					 	}
					 	return this;
				 	 },
				 	 
				 	 //override
					 initComponent : function(config){
						IPT.Container.prototype.initComponent.call(this,config);
					 	this._initEvent();
					 	this.hidden();
						return true;
					 },
					 
					 _initEvent : function(){
						 var _this = this ;
						 $(this.getElement()).bind("click" , function(){
							IPT.menu.MenuMgr.getInstance().hiddenAll();
						 });
					 },
					 
//					 add : function(menuItem){
//						var EventObject = IPT.events.EventObject,
//							_this = this;
//						
//					 	if(menuItem.isXTypeOf("menuItem")){
//					 		this.constructor.superClass.add.call(this,menuItem);
//					 	}
//					 	menuItem.addListener(EventObject.MOUSE_OVER , function(){
//					 		_this.setActivedItem( menuItem );
//					 	});
//				 	 },
				 	 
					 //override		 	 
				 	 insert : function( index , menuItem ){
				 		 
				 	 },
				 	 
				 	 addSeperator : function(){
				 		
				 	 },
				 	 
				 	 insertSeperator : function( index ){
				 		
				 	 },
				 	 
				 	 //override
				 	 hidden : function(){
				 		 IPT.Component.prototype.hidden.call(this);
				 		 if(this.activedItem && this.activedItem.menu){
				 			this.activedItem.menu.hidden();
				 		 }
				 		 this.setActivedItem(null);
				 		 return this;
				 	 },
				 	 
				 	 showAt : function( left , top ){
				 		this.setPosition(left , top);
				 	 },
				 	 
				 	 getActivedItem : function(){
				 		 return this.activedItem;
				 	 },
				 	 
				 	 setActivedItem : function(menuItem){
				 		//remove previous activedItem option.
					 	if(this.activedItem ){
					 		if(this.activedItem.menu){
					 			this.activedItem.hiddenMenu();
					 			this.activedItem.removeClass(this.activedItem.activedCls);
					 		}
					 	}

				 		this.activedItem = menuItem;
				 		if(this.activedItem){
						 	if(this.activedItem.menu){
						 		this.activedItem.showMenu();
						 		this.activedItem.addClass(this.activedItem.activedCls);
						 	}
				 		}
				 		return true;
				 	 },
				 	 
				 	 tpl : function(){
				 		 return ['<div class="<%=baseCls%>"></div>'].join("");				 		 
				 	 }
			 },
		 
		 statics : {
			 XTYPE : "menu"
		 }
 });
IPT.widget.menu = IPT.menu.Menu;
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
IPT.Class.define(' IPT.window.WindowMgr ' , {
		 singleton : true,

		 constructor : function(){
			this.windows = {};
		 },

		 methods : {
	 		register : function(window){
				var id = window.getId();
				this.windows[id] = window;	
				return true;
		 	},
		 	 
			unRegister : function(window){
				var id = window.getId();
				this.windows[id] = null;
				delete this.windows[id];
				return true;	 
		 	}
		 },
		 
		 statics : {

		 }
});
IPT.Class.define('IPT.window.Window' , {
		 extend : "IPT.Panel",

		 constructor : function(config){
			IPT.window.Window.callParent(this,config);
			$(this.element).css("zIndex" , "2000");
			IPT.window.WindowMgr.getInstance().register(this);
		 },

		 methods : {
				 baseCls : "ipt-window",
				 collapsible: false,
				 minimizable: false,
				 maximizable: false,
				 closable: true,
				 collapsed: false,
				 minimized: false,
				 maximized: false,
				 closed: false,
				 dragAble : true,
				 modal : false,
				 
				 initialize : function(config){
					IPT.window.Window.superClass.initialize.call(this,config);
					return true;
				 },

				 //override
				 initComponent : function(){
					IPT.window.Window.superClass._initEvent.call(this);
					IPT.window.Window.superClass.initComponent.call(this);
					this._moveToCenter();	
					this.show();
					$(this.getElement()).css("zIndex" , "100000");
					new IPT.dnd.DragSource(this.getElement() , this.getHeaderWrap());
					return true;
				 },
				 
			 	 _moveToCenter : function(){
					var elem = $(this.element),
						size = {width : IPT.Dom.getViewportWidth(), height: IPT.Dom.getViewportHeight()};
				 		position = {
				 			x : (size.width - elem.width())/2,
				 			y : (size.height - elem.height())/3
				 		};
					this.setPosition(position.x , position.y);
					return this;
			 	 },
			 	 
			 	 show : function(){
			 		IPT.window.Window.superClass.show.call(this);
			 		if(this.modal){
			 			this._showMask();
			 		}
			 		return true;
			 	 },
			 	 
			 	 hidden : function(){
			 		IPT.window.Window.superClass.hidden.call(this);
				 	this._hiddenMask();
			 	 },

			 	 destroy : function(){
			 		IPT.window.Window.superClass.destroy.call(this);
					 this._destroyMask();
					 return true;
				 },
				 
				 _initEvent : function(){
					 var _this = this;
					 $(window).bind("resize" , function(){
						_this._adjustMaskSize();
					 });
				 },
				 
			 	 _showMask : function(){
			 		 if(!this.mask){
			 			this.mask = document.createElement("div");
			 			var docSize = {
			 					width : IPT.Dom.getDocumentWidth(),
			 					height : IPT.Dom.getDocumentHeight()
			 				};
			 			$(this.mask).css({
			 				width : docSize.width + "px",
			 				height : docSize.height + "px",
			 				background : "gray",
			 				position : "absolute",
			 				top : "0px",
			 				left : "0px",
			 				zIndex : "1000",
			 				opacity : "0.2"
			 			});
			 			document.body.appendChild(this.mask);
			 		 }else{
			 			$(this.mask).css("display" , "inline");
			 		 }
			 		 return true;
			 	 },
			 	 
			 	 _hiddenMask : function(){
			 		 if(this.mask){
			 			$(this.mask).css("display" , "none");
			 		 }
			 		 return true;
			 	 },
			 	 
			 	 _destroyMask : function(){
			 		 if(this.mask){
				 		$(this.mask).remove();
				 	 }
			 		 return true;
			 	 },
			 	 
			 	 _adjustMaskSize : function(){
			 		 if(this.mask){
				 		var docSize = {
				 			width : IPT.Dom.getDocumentWidth(),
				 			height : IPT.Dom.getDocumentHeight()
				 		};
			 			$(this.mask).css({
			 				width : docSize.width + "px",
			 				height : docSize.height + "px"
			 			});
			 		 }
			 		 return true;
			 	 }
			 }
 });
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