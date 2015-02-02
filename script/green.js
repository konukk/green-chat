/*! nanoScrollerJS - v0.8.0 - (c) 2014 James Florentino; Licensed MIT */
!function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F;x={paneClass:"nano-pane",sliderClass:"nano-slider",contentClass:"nano-content",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null,documentContext:null,windowContext:null},s="scrollbar",r="scroll",k="mousedown",l="mousemove",n="mousewheel",m="mouseup",q="resize",h="drag",u="up",p="panedown",f="DOMMouseScroll",g="down",v="wheel",i="keydown",j="keyup",t="touchmove",d="Microsoft Internet Explorer"===b.navigator.appName&&/msie 7./i.test(b.navigator.appVersion)&&b.ActiveXObject,e=null,B=b.requestAnimationFrame,w=b.cancelAnimationFrame,D=c.createElement("div").style,F=function(){var a,b,c,d,e,f;for(d=["t","webkitT","MozT","msT","OT"],a=e=0,f=d.length;f>e;a=++e)if(c=d[a],b=d[a]+"ransform",b in D)return d[a].substr(0,d[a].length-1);return!1}(),E=function(a){return F===!1?!1:""===F?a:F+a.charAt(0).toUpperCase()+a.substr(1)},C=E("transform"),z=C!==!1,y=function(){var a,b,d;return a=c.createElement("div"),b=a.style,b.position="absolute",b.width="100px",b.height="100px",b.overflow=r,b.top="-9999px",c.body.appendChild(a),d=a.offsetWidth-a.clientWidth,c.body.removeChild(a),d},A=function(){var a,c,d;return c=b.navigator.userAgent,(a=/(?=.+Mac OS X)(?=.+Firefox)/.test(c))?(d=/Firefox\/\d{2}\./.exec(c),d&&(d=d[0].replace(/\D+/g,"")),a&&+d>23):!1},o=function(){function i(d,f){this.el=d,this.options=f,e||(e=y()),this.$el=a(this.el),this.doc=a(this.options.documentContext||c),this.win=a(this.options.windowContext||b),this.$content=this.$el.children("."+f.contentClass),this.$content.attr("tabindex",this.options.tabIndex||0),this.content=this.$content[0],this.previousPosition=0,this.options.iOSNativeScrolling&&null!=this.el.style.WebkitOverflowScrolling?this.nativeScrolling():this.generate(),this.createEvents(),this.addEvents(),this.reset()}return i.prototype.preventScrolling=function(a,b){if(this.isActive)if(a.type===f)(b===g&&a.originalEvent.detail>0||b===u&&a.originalEvent.detail<0)&&a.preventDefault();else if(a.type===n){if(!a.originalEvent||!a.originalEvent.wheelDelta)return;(b===g&&a.originalEvent.wheelDelta<0||b===u&&a.originalEvent.wheelDelta>0)&&a.preventDefault()}},i.prototype.nativeScrolling=function(){this.$content.css({WebkitOverflowScrolling:"touch"}),this.iOSNativeScrolling=!0,this.isActive=!0},i.prototype.updateScrollValues=function(){var a,b;a=this.content,this.maxScrollTop=a.scrollHeight-a.clientHeight,this.prevScrollTop=this.contentScrollTop||0,this.contentScrollTop=a.scrollTop,b=this.contentScrollTop>this.previousPosition?"down":this.contentScrollTop<this.previousPosition?"up":"same",this.previousPosition=this.contentScrollTop,"same"!==b&&this.$el.trigger("update",{position:this.contentScrollTop,maximum:this.maxScrollTop,direction:b}),this.iOSNativeScrolling||(this.maxSliderTop=this.paneHeight-this.sliderHeight,this.sliderTop=0===this.maxScrollTop?0:this.contentScrollTop*this.maxSliderTop/this.maxScrollTop)},i.prototype.setOnScrollStyles=function(){var a;z?(a={},a[C]="translate(0, "+this.sliderTop+"px)"):a={top:this.sliderTop},B?this.scrollRAF||(this.scrollRAF=B(function(b){return function(){b.scrollRAF=null,b.slider.css(a)}}(this))):this.slider.css(a)},i.prototype.createEvents=function(){this.events={down:function(a){return function(b){return a.isBeingDragged=!0,a.offsetY=b.pageY-a.slider.offset().top,a.pane.addClass("active"),a.doc.bind(l,a.events[h]).bind(m,a.events[u]),!1}}(this),drag:function(a){return function(b){return a.sliderY=b.pageY-a.$el.offset().top-a.offsetY,a.scroll(),a.contentScrollTop>=a.maxScrollTop&&a.prevScrollTop!==a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&0!==a.prevScrollTop&&a.$el.trigger("scrolltop"),!1}}(this),up:function(a){return function(){return a.isBeingDragged=!1,a.pane.removeClass("active"),a.doc.unbind(l,a.events[h]).unbind(m,a.events[u]),!1}}(this),resize:function(a){return function(){a.reset()}}(this),panedown:function(a){return function(b){return a.sliderY=(b.offsetY||b.originalEvent.layerY)-.5*a.sliderHeight,a.scroll(),a.events.down(b),!1}}(this),scroll:function(a){return function(b){a.updateScrollValues(),a.isBeingDragged||(a.iOSNativeScrolling||(a.sliderY=a.sliderTop,a.setOnScrollStyles()),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,g),a.prevScrollTop!==a.maxScrollTop&&a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,u),0!==a.prevScrollTop&&a.$el.trigger("scrolltop"))))}}(this),wheel:function(a){return function(b){var c;if(null!=b)return c=b.delta||b.wheelDelta||b.originalEvent&&b.originalEvent.wheelDelta||-b.detail||b.originalEvent&&-b.originalEvent.detail,c&&(a.sliderY+=-c/3),a.scroll(),!1}}(this)}},i.prototype.addEvents=function(){var a;this.removeEvents(),a=this.events,this.options.disableResize||this.win.bind(q,a[q]),this.iOSNativeScrolling||(this.slider.bind(k,a[g]),this.pane.bind(k,a[p]).bind(""+n+" "+f,a[v])),this.$content.bind(""+r+" "+n+" "+f+" "+t,a[r])},i.prototype.removeEvents=function(){var a;a=this.events,this.win.unbind(q,a[q]),this.iOSNativeScrolling||(this.slider.unbind(),this.pane.unbind()),this.$content.unbind(""+r+" "+n+" "+f+" "+t,a[r])},i.prototype.generate=function(){var a,c,d,f,g,h;return f=this.options,g=f.paneClass,h=f.sliderClass,a=f.contentClass,this.$el.find("."+g).length||this.$el.find("."+h).length||this.$el.append('<div class="'+g+'"><div class="'+h+'" /></div>'),this.pane=this.$el.children("."+g),this.slider=this.pane.find("."+h),0===e&&A()?(d=b.getComputedStyle(this.content,null).getPropertyValue("padding-right").replace(/\D+/g,""),c={right:-14,paddingRight:+d+14}):e&&(c={right:-e},this.$el.addClass("has-scrollbar")),null!=c&&this.$content.css(c),this},i.prototype.restore=function(){this.stopped=!1,this.iOSNativeScrolling||this.pane.show(),this.addEvents()},i.prototype.reset=function(){var a,b,c,f,g,h,i,j,k,l,m,n;return this.iOSNativeScrolling?void(this.contentHeight=this.content.scrollHeight):(this.$el.find("."+this.options.paneClass).length||this.generate().stop(),this.stopped&&this.restore(),a=this.content,f=a.style,g=f.overflowY,d&&this.$content.css({height:this.$content.height()}),b=a.scrollHeight+e,l=parseInt(this.$el.css("max-height"),10),l>0&&(this.$el.height(""),this.$el.height(a.scrollHeight>l?l:a.scrollHeight)),i=this.pane.outerHeight(!1),k=parseInt(this.pane.css("top"),10),h=parseInt(this.pane.css("bottom"),10),j=i+k+h,n=Math.round(j/b*j),n<this.options.sliderMinHeight?n=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&n>this.options.sliderMaxHeight&&(n=this.options.sliderMaxHeight),g===r&&f.overflowX!==r&&(n+=e),this.maxSliderTop=j-n,this.contentHeight=b,this.paneHeight=i,this.paneOuterHeight=j,this.sliderHeight=n,this.slider.height(n),this.events.scroll(),this.pane.show(),this.isActive=!0,a.scrollHeight===a.clientHeight||this.pane.outerHeight(!0)>=a.scrollHeight&&g!==r?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&g===r?this.slider.hide():this.slider.show(),this.pane.css({opacity:this.options.alwaysVisible?1:"",visibility:this.options.alwaysVisible?"visible":""}),c=this.$content.css("position"),("static"===c||"relative"===c)&&(m=parseInt(this.$content.css("right"),10),m&&this.$content.css({right:"",marginRight:m})),this)},i.prototype.scroll=function(){return this.isActive?(this.sliderY=Math.max(0,this.sliderY),this.sliderY=Math.min(this.maxSliderTop,this.sliderY),this.$content.scrollTop((this.paneHeight-this.contentHeight+e)*this.sliderY/this.maxSliderTop*-1),this.iOSNativeScrolling||(this.updateScrollValues(),this.setOnScrollStyles()),this):void 0},i.prototype.scrollBottom=function(a){return this.isActive?(this.$content.scrollTop(this.contentHeight-this.$content.height()-a).trigger(n),this.stop().restore(),this):void 0},i.prototype.scrollTop=function(a){return this.isActive?(this.$content.scrollTop(+a).trigger(n),this.stop().restore(),this):void 0},i.prototype.scrollTo=function(a){return this.isActive?(this.scrollTop(this.$el.find(a).get(0).offsetTop),this):void 0},i.prototype.stop=function(){return w&&this.scrollRAF&&(w(this.scrollRAF),this.scrollRAF=null),this.stopped=!0,this.removeEvents(),this.iOSNativeScrolling||this.pane.hide(),this},i.prototype.destroy=function(){return this.stopped||this.stop(),!this.iOSNativeScrolling&&this.pane.length&&this.pane.remove(),d&&this.$content.height(""),this.$content.removeAttr("tabindex"),this.$el.hasClass("has-scrollbar")&&(this.$el.removeClass("has-scrollbar"),this.$content.css({right:""})),this},i.prototype.flash=function(){return!this.iOSNativeScrolling&&this.isActive?(this.reset(),this.pane.addClass("flashed"),setTimeout(function(a){return function(){a.pane.removeClass("flashed")}}(this),this.options.flashDelay),this):void 0},i}(),a.fn.nanoScroller=function(b){return this.each(function(){var c,d;if((d=this.nanoscroller)||(c=a.extend({},x,b),this.nanoscroller=d=new o(this,c)),b&&"object"==typeof b){if(a.extend(d.options,b),null!=b.scrollBottom)return d.scrollBottom(b.scrollBottom);if(null!=b.scrollTop)return d.scrollTop(b.scrollTop);if(b.scrollTo)return d.scrollTo(b.scrollTo);if("bottom"===b.scroll)return d.scrollBottom(0);if("top"===b.scroll)return d.scrollTop(0);if(b.scroll&&b.scroll instanceof a)return d.scrollTo(b.scroll);if(b.stop)return d.stop();if(b.destroy)return d.destroy();if(b.flash)return d.flash()}return d.reset()})},a.fn.nanoScroller.Constructor=o}(jQuery,window,document);

// avchat.js
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.AVChatClient=e()}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){XMLHttpRequest=typeof XMLHttpRequest==="undefined"?require("xmlhttprequest").XMLHttpRequest:XMLHttpRequest;WebSocket=typeof WebSocket==="undefined"||WebSocket==null?require("ws"):WebSocket;var Promise=require("es6-promise").Promise;var EventEmitter=require("events").EventEmitter;module.exports=AVChatClient;function AVChatClient(settings){if(this instanceof AVChatClient==false){return new AVChatClient(settings)}var _emitter,_settings,_waitCommands,server,ws,keepAliveTimeout;var cmdMap={direct:"ack",sessionopen:"sessionopened",sessionadd:"sessionadded",sessionquery:"sessionquery-result",roomjoin:"roomjoined",roominvite:"roominvited",roomleave:"roomleft",roomkick:"roomkicked"};var timers=[];function auth(peerId,watchingPeerIds){return Promise.resolve({watchingPeerIds:watchingPeerIds||[]})}function groupAuth(peerId,groupId,action,groupPeerIds){return Promise.resolve({groupPeerIds:groupPeerIds||[]})}function initialize(settings){if(!settings)throw new Error("settings");if(!settings.appId)throw new Error("settings.appId");if(!settings.peerId)throw new Error("settings.peerId");if(settings.auth&&typeof settings.auth!="function"){throw new Error("sesstings.auth")}if(settings.groupAuth&&typeof settings.groupAuth!="function"){throw new Error("sesstings.groupAuth")}_settings=settings||{};_settings.auth=settings.auth||auth;_settings.groupAuth=settings.groupAuth||groupAuth;_settings.watchingPeerIds=settings.watchingPeerIds||[];_settings.sp=settings.sp;_settings.server=settings.server;_waitCommands=[];_emitter=new EventEmitter;keepAliveTimeout=6e4}initialize(settings);function _getServerInfo(appId,secure){var protocol="http://";if(typeof window!="undefined"&&window.location&&window.location.protocol=="https:"){protocol="https://"}var url=protocol+"router-g0-push.avoscloud.com/v1/route?appId="+appId;if(_settings.server&&_settings.server=="us"){url=protocol+"router-a0-push.avoscloud.com/v1/route?appId="+appId}if(secure){url+="&secure=1"}return get(url)}function _connect(){if(server&&new Date<server.expires){return new Promise(function(resolve,reject){ws=new WebSocket(server.server);_timeout("connectopen",function(){reject()});ws.onopen=function(){if(timers.length>0){clearTimeout(timers.shift()[1])}resolve(server)};ws.onclose=function(e){doClose();_emitter.emit("close",e)};ws.onmessage=function(message){var data=JSON.parse(message.data);var cmd=data.op?data.cmd+data.op:data.cmd;if(!cmd){cmd="{}"}if(_waitCommands.length>0&&_waitCommands[0][0]===cmd){_waitCommands.shift()[1](data)}if(timers.length>0&&timers[0][0]==cmd){clearTimeout(timers.shift()[1])}if(data.cmd=="session"){if(data.op=="opened"||data.op=="added"){_emitter.emit("online",data.onlineSessionPeerIds)}}else if(data.cmd=="presence"){if(data.status=="on"){_emitter.emit("online",data.sessionPeerIds)}else if(data.status=="off"){_emitter.emit("offline",data.sessionPeerIds)}}else if(data.cmd=="direct"){_emitter.emit("message",data);var msg={cmd:"ack",peerId:_settings.peerId,appId:_settings.appId,ids:[].concat(data.id)};var s=JSON.stringify(msg);ws.send(s)}else if(data.cmd=="room"){if(data.op=="members-joined"){_emitter.emit("membersJoined",data)}else if(data.op=="members-left"){_emitter.emit("membersLeft",data)}else if(data.op=="joined"){_emitter.emit("joined",data)}else if(data.op=="left"){_emitter.emit("left",data)}}}})}else{return _getServerInfo(_settings.appId,_settings.secure).then(function(result){server=result;server.expires=Date.now()+server.ttl*1e3;return _connect()})}}function _openSession(){return _settings.auth(_settings.peerId,_settings.watchingPeerIds,_settings.sp).then(function(data){_settings.watchingPeerIds=data.watchingPeerIds;return doCommand("session","open",{sessionPeerIds:data.watchingPeerIds,s:data.s,t:data.t,n:data.n,sp:data.sp})})}function _timeout(name,reject){timers.push([name,setTimeout(function(){if(reject){reject(name+"timeout")}doClose()},1e4)])}function _keepAlive(){clearTimeout(_keepAlive.handle);_keepAlive.handle=setTimeout(function(){if(ws.readyState==1){ws.send("{}");_timeout("{}");_keepAlive()}},keepAliveTimeout)}function doClose(){ws.close();clearTimeout(_keepAlive.handle);timers.forEach(function(v,i){clearTimeout(v[1])});_waitCommands.forEach(function(v){v[2]()});timers=[];_waitCommands=[]}function doCommand(cmd,op,props){_keepAlive();var msg={cmd:cmd,peerId:_settings.peerId,appId:_settings.appId};if(op){msg.op=op}if(props){for(k in props){msg[k]=props[k]}}if(!ws){return Promise.reject()}if(ws.readyState!=1){return Promise.reject(ws.readyState)}ws.send(JSON.stringify(msg));var c=typeof op=="undefined"?cmd:cmd+op;if(cmd=="direct"&&props.transient==true||["sessionremove","sessionclose"].indexOf(c)>-1){return Promise.resolve()}else{return new Promise(function(resolve,reject){_waitCommands.push([cmdMap[c]||c,resolve,reject]);_timeout(cmdMap[c]||c,reject)})}}this.open=function(){if(ws&&ws.readyState==0){return Promise.reject(0)}if(ws&&ws.readyState==1){return Promise.resolve()}timers.forEach(function(v,i){clearTimeout(v[1])});timers=[];return _connect().then(function(){return _openSession()})};this.close=function(){doCommand("session","close");doClose();return Promise.resolve()};this.send=function(msg,to,transient){var obj={msg:msg,toPeerIds:[].concat(to)};if(typeof transient!="undefined"&&transient==true){obj.transient=transient}return doCommand("direct",undefined,obj)};this.on=function(name,func){_emitter.on(name,func)};this.watch=function(peers){return _settings.auth(_settings.peerId,[].concat(peers)).then(function(data){var watch=[].concat(data.watchingPeerIds);watch.forEach(function(v,k){if(_settings.watchingPeerIds.indexOf(v)==-1){_settings.watchingPeerIds.push(v)}});return doCommand("session","add",{sessionPeerIds:[].concat(data.watchingPeerIds),s:data.s,t:data.t,n:data.n})})};this.unwatch=function(peers){peers.forEach(function(v,k){if(_settings.watchingPeerIds.indexOf(v)>-1){_settings.watchingPeerIds.splice(_settings.watchingPeerIds.indexOf(v),1)}});return doCommand("session","remove",{sessionPeerIds:[].concat(peers)})};this.getStatus=function(peers){return doCommand("session","query",{sessionPeerIds:[].concat(peers)})};this.joinGroup=function(groupId){return _settings.groupAuth(_settings.peerId,groupId,"join",[]).then(function(data){return doCommand("room","join",{roomId:groupId,s:data.s,t:data.t,n:data.n})})};this.sendToGroup=function(msg,groupId,transient){var obj={msg:msg,roomId:groupId};if(typeof transient!="undefined"&&transient==true){obj.transient=transient}return doCommand("direct",undefined,obj)};this.inviteToGroup=function(groupId,groupPeerIds){return _settings.groupAuth(_settings.peerId,groupId,"invite",[].concat(groupPeerIds)).then(function(data){return doCommand("room","invite",{roomId:groupId,roomPeerIds:[].concat(data.groupPeerIds),s:data.s,t:data.t,n:data.n})})};this.kickFromGroup=function(groupId,groupPeerIds){return _settings.groupAuth(_settings.peerId,groupId,"kick",[].concat(groupPeerIds)).then(function(data){return doCommand("room","kick",{roomId:groupId,roomPeerIds:[].concat(groupPeerIds),s:data.s,t:data.t,n:data.n})})};this.leaveGroup=function(groupId){return doCommand("room","leave",{roomId:groupId})}}function get(url){if(typeof jQuery!=="undefined"){return Promise.resolve(jQuery.getJSON.call(jQuery,url+="&cb=?"))}else{return new Promise(function(resolve,reject){var req=new XMLHttpRequest;req.open("GET",url);req.onload=function(){if(req.status==200){resolve(JSON.parse(req.responseText))}else{reject(Error(req.statusText))}};req.onerror=function(){reject(Error("Network Error"))};req.send()})}}},{"es6-promise":2,events:12,ws:undefined,xmlhttprequest:undefined}],2:[function(require,module,exports){"use strict";var Promise=require("./promise/promise").Promise;var polyfill=require("./promise/polyfill").polyfill;exports.Promise=Promise;exports.polyfill=polyfill},{"./promise/polyfill":6,"./promise/promise":7}],3:[function(require,module,exports){"use strict";var isArray=require("./utils").isArray;var isFunction=require("./utils").isFunction;function all(promises){var Promise=this;if(!isArray(promises)){throw new TypeError("You must pass an array to all.")}return new Promise(function(resolve,reject){var results=[],remaining=promises.length,promise;if(remaining===0){resolve([])}function resolver(index){return function(value){resolveAll(index,value)}}function resolveAll(index,value){results[index]=value;if(--remaining===0){resolve(results)}}for(var i=0;i<promises.length;i++){promise=promises[i];if(promise&&isFunction(promise.then)){promise.then(resolver(i),reject)}else{resolveAll(i,promise)}}})}exports.all=all},{"./utils":11}],4:[function(require,module,exports){(function(process,global){"use strict";var browserGlobal=typeof window!=="undefined"?window:{};var BrowserMutationObserver=browserGlobal.MutationObserver||browserGlobal.WebKitMutationObserver;var local=typeof global!=="undefined"?global:this===undefined?window:this;function useNextTick(){return function(){process.nextTick(flush)}}function useMutationObserver(){var iterations=0;var observer=new BrowserMutationObserver(flush);var node=document.createTextNode("");observer.observe(node,{characterData:true});return function(){node.data=iterations=++iterations%2}}function useSetTimeout(){return function(){local.setTimeout(flush,1)}}var queue=[];function flush(){for(var i=0;i<queue.length;i++){var tuple=queue[i];var callback=tuple[0],arg=tuple[1];callback(arg)}queue=[]}var scheduleFlush;if(typeof process!=="undefined"&&{}.toString.call(process)==="[object process]"){scheduleFlush=useNextTick()}else if(BrowserMutationObserver){scheduleFlush=useMutationObserver()}else{scheduleFlush=useSetTimeout()}function asap(callback,arg){var length=queue.push([callback,arg]);if(length===1){scheduleFlush()}}exports.asap=asap}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{_process:13}],5:[function(require,module,exports){"use strict";var config={instrument:false};function configure(name,value){if(arguments.length===2){config[name]=value}else{return config[name]}}exports.config=config;exports.configure=configure},{}],6:[function(require,module,exports){(function(global){"use strict";var RSVPPromise=require("./promise").Promise;var isFunction=require("./utils").isFunction;function polyfill(){var local;if(typeof global!=="undefined"){local=global}else if(typeof window!=="undefined"&&window.document){local=window}else{local=self}var es6PromiseSupport="Promise"in local&&"resolve"in local.Promise&&"reject"in local.Promise&&"all"in local.Promise&&"race"in local.Promise&&function(){var resolve;new local.Promise(function(r){resolve=r});return isFunction(resolve)}();if(!es6PromiseSupport){local.Promise=RSVPPromise}}exports.polyfill=polyfill}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./promise":7,"./utils":11}],7:[function(require,module,exports){"use strict";var config=require("./config").config;var configure=require("./config").configure;var objectOrFunction=require("./utils").objectOrFunction;var isFunction=require("./utils").isFunction;var now=require("./utils").now;var all=require("./all").all;var race=require("./race").race;var staticResolve=require("./resolve").resolve;var staticReject=require("./reject").reject;var asap=require("./asap").asap;var counter=0;config.async=asap;function Promise(resolver){if(!isFunction(resolver)){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}if(!(this instanceof Promise)){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}this._subscribers=[];invokeResolver(resolver,this)}function invokeResolver(resolver,promise){function resolvePromise(value){resolve(promise,value)}function rejectPromise(reason){reject(promise,reason)}try{resolver(resolvePromise,rejectPromise)}catch(e){rejectPromise(e)}}function invokeCallback(settled,promise,callback,detail){var hasCallback=isFunction(callback),value,error,succeeded,failed;if(hasCallback){try{value=callback(detail);succeeded=true}catch(e){failed=true;error=e}}else{value=detail;succeeded=true}if(handleThenable(promise,value)){return}else if(hasCallback&&succeeded){resolve(promise,value)}else if(failed){reject(promise,error)}else if(settled===FULFILLED){resolve(promise,value)}else if(settled===REJECTED){reject(promise,value)}}var PENDING=void 0;var SEALED=0;var FULFILLED=1;var REJECTED=2;function subscribe(parent,child,onFulfillment,onRejection){var subscribers=parent._subscribers;var length=subscribers.length;subscribers[length]=child;subscribers[length+FULFILLED]=onFulfillment;subscribers[length+REJECTED]=onRejection}function publish(promise,settled){var child,callback,subscribers=promise._subscribers,detail=promise._detail;for(var i=0;i<subscribers.length;i+=3){child=subscribers[i];callback=subscribers[i+settled];invokeCallback(settled,child,callback,detail)}promise._subscribers=null}Promise.prototype={constructor:Promise,_state:undefined,_detail:undefined,_subscribers:undefined,then:function(onFulfillment,onRejection){var promise=this;var thenPromise=new this.constructor(function(){});if(this._state){var callbacks=arguments;config.async(function invokePromiseCallback(){invokeCallback(promise._state,thenPromise,callbacks[promise._state-1],promise._detail)})}else{subscribe(this,thenPromise,onFulfillment,onRejection)}return thenPromise},"catch":function(onRejection){return this.then(null,onRejection)}};Promise.all=all;Promise.race=race;Promise.resolve=staticResolve;Promise.reject=staticReject;function handleThenable(promise,value){var then=null,resolved;try{if(promise===value){throw new TypeError("A promises callback cannot return that same promise.")}if(objectOrFunction(value)){then=value.then;if(isFunction(then)){then.call(value,function(val){if(resolved){return true}resolved=true;if(value!==val){resolve(promise,val)}else{fulfill(promise,val)}},function(val){if(resolved){return true}resolved=true;reject(promise,val)});return true}}}catch(error){if(resolved){return true}reject(promise,error);return true}return false}function resolve(promise,value){if(promise===value){fulfill(promise,value)}else if(!handleThenable(promise,value)){fulfill(promise,value)}}function fulfill(promise,value){if(promise._state!==PENDING){return}promise._state=SEALED;promise._detail=value;config.async(publishFulfillment,promise)}function reject(promise,reason){if(promise._state!==PENDING){return}promise._state=SEALED;promise._detail=reason;config.async(publishRejection,promise)}function publishFulfillment(promise){publish(promise,promise._state=FULFILLED)}function publishRejection(promise){publish(promise,promise._state=REJECTED)}exports.Promise=Promise},{"./all":3,"./asap":4,"./config":5,"./race":8,"./reject":9,"./resolve":10,"./utils":11}],8:[function(require,module,exports){"use strict";var isArray=require("./utils").isArray;function race(promises){var Promise=this;if(!isArray(promises)){throw new TypeError("You must pass an array to race.")}return new Promise(function(resolve,reject){var results=[],promise;for(var i=0;i<promises.length;i++){promise=promises[i];if(promise&&typeof promise.then==="function"){promise.then(resolve,reject)}else{resolve(promise)}}})}exports.race=race},{"./utils":11}],9:[function(require,module,exports){"use strict";function reject(reason){var Promise=this;return new Promise(function(resolve,reject){reject(reason)})}exports.reject=reject},{}],10:[function(require,module,exports){"use strict";function resolve(value){if(value&&typeof value==="object"&&value.constructor===this){return value}var Promise=this;return new Promise(function(resolve){resolve(value)})}exports.resolve=resolve},{}],11:[function(require,module,exports){"use strict";function objectOrFunction(x){return isFunction(x)||typeof x==="object"&&x!==null}function isFunction(x){return typeof x==="function"}function isArray(x){return Object.prototype.toString.call(x)==="[object Array]"}var now=Date.now||function(){return(new Date).getTime()};exports.objectOrFunction=objectOrFunction;exports.isFunction=isFunction;exports.isArray=isArray;exports.now=now},{}],12:[function(require,module,exports){function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}module.exports=EventEmitter;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;EventEmitter.defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError("n must be a positive number");this._maxListeners=n;return this};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};if(type==="error"){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er}throw TypeError('Uncaught, unspecified "error" event.')}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:len=arguments.length;args=new Array(len-1);for(i=1;i<len;i++)args[i-1]=arguments[i];handler.apply(this,args)}}else if(isObject(handler)){len=arguments.length;args=new Array(len-1);for(i=1;i<len;i++)args[i-1]=arguments[i];listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++)listeners[i].apply(this,args)}return true};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])this._events[type]=listener;else if(isObject(this._events[type]))this._events[type].push(listener);else this._events[type]=[this._events[type],listener];if(isObject(this._events[type])&&!this._events[type].warned){var m;if(!isUndefined(this._maxListeners)){m=this._maxListeners}else{m=EventEmitter.defaultMaxListeners}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[type].length);if(typeof console.trace==="function"){console.trace()}}}return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError("listener must be a function");var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments)}}g.listener=listener;this.on(type,g);return this};EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit("removeListener",type,listener)}else if(isObject(list)){for(i=length;i-->0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type]}else{list.splice(position,1)}if(this._events.removeListener)this.emit("removeListener",type,listener)}return this};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this}if(arguments.length===0){for(key in this._events){if(key==="removeListener")continue;this.removeAllListeners(key)}this.removeAllListeners("removeListener");this._events={};return this}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners)}else{while(listeners.length)this.removeListener(type,listeners[listeners.length-1])}delete this._events[type];return this};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret};EventEmitter.listenerCount=function(emitter,type){var ret;if(!emitter._events||!emitter._events[type])ret=0;else if(isFunction(emitter._events[type]))ret=1;else ret=emitter._events[type].length;return ret};function isFunction(arg){return typeof arg==="function"}function isNumber(arg){return typeof arg==="number"}function isObject(arg){return typeof arg==="object"&&arg!==null}function isUndefined(arg){return arg===void 0}},{}],13:[function(require,module,exports){var process=module.exports={};process.nextTick=function(){var canSetImmediate=typeof window!=="undefined"&&window.setImmediate;var canMutationObserver=typeof window!=="undefined"&&window.MutationObserver;var canPost=typeof window!=="undefined"&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f)}}var queue=[];if(canMutationObserver){var hiddenDiv=document.createElement("div");var observer=new MutationObserver(function(){var queueList=queue.slice();queue.length=0;queueList.forEach(function(fn){fn()})});observer.observe(hiddenDiv,{attributes:true});return function nextTick(fn){if(!queue.length){hiddenDiv.setAttribute("yes","no")}queue.push(fn)}}if(canPost){window.addEventListener("message",function(ev){var source=ev.source;if((source===window||source===null)&&ev.data==="process-tick"){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn()}}},true);return function nextTick(fn){queue.push(fn);window.postMessage("process-tick","*")}}return function nextTick(fn){setTimeout(fn,0)}}();process.title="browser";process.browser=true;process.env={};process.argv=[];function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")}},{}]},{},[1])(1)});

// EventEmitter.js
(function(){"use strict";function t(){}function i(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(r,o){var e,i,t,s,n=this.getListenersAsObject(r);for(t in n)if(n.hasOwnProperty(t))for(i=n[t].length;i--;)e=n[t][i],e.once===!0&&this.removeListener(r,e.listener),s=e.listener.apply(this,o||[]),s===this._getOnceReturnValue()&&this.removeListener(r,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);

window.Green = function (OldGreen) {
    var Green = {
        noConflict: noConflict
    };
    return Green;

    function noConflict() {
        if (window.Green === Green) {
            window.Green = OldGreen;
        }
        return Green;
    }
}(window.Green);

// 视图类 完善中...
Green._View = function(window, document, Green, EventEmitter) {
    function View() {
        this._child = null;
        this._hasMultipleChildren = false;
    }

    View.prototype.add = function(child) {
        if( !(child instanceof View) ) {
            return false;
        }
        var childNode = child;

        if (this._child instanceof Array) this._child.push(childNode);
        else if (this._child) {
            this._child = [this._child, childNode];
            this._hasMultipleChildren = true;
        }
        else this._child = childNode;

        return childNode;
    };

    View.prototype.commit = function() {
        var result = null;
        if (this._hasMultipleChildren) {
            var children = this._child;
            for (var i = 0; i < children.length; i++) {
                result[i] = children[i].commit();
            }
        }
        else if (this._child) result = this._child.commit();

        return result;
    };

    // View.prototype.create = function(class) {

    // };

    return View;

}(window, document, Green, EventEmitter);


Green._EventHandler = function(window, document, Green, EventEmitter) {
    return new EventEmitter();
}(window, document, Green, EventEmitter);

// 表情组件
Green._Expression = function(window, document, Green) {
	function Hashtable() {
	    this._hash = new Object();
	    this.put = function(key, value) {
	        if (typeof (key) != "undefined") {
	            if (this.containsKey(key) == false) {
	                this._hash[key] = typeof (value) == "undefined" ? null : value;
	                return true;
	            } else {
	                return false;
	            }
	        } else {
	            return false;
	        }
	    }
	    this.remove = function(key) { delete this._hash[key]; }
	    this.size = function() { var i = 0; for (var k in this._hash) { i++; } return i; }
	    this.get = function(key) { return this._hash[key]; }
	    this.containsKey = function(key) { return typeof (this._hash[key]) != "undefined"; }
	    this.clear = function() { for (var k in this._hash) { delete this._hash[k]; } }
	}

	var emotions = new Array();
	var categorys = new Array();// 分组
	var uSinaEmotionsHt = new Hashtable();

	// 初始化缓存，页面仅仅加载一次就可以了
	(function($) {
		var app_id = '1362404091';
		$.ajax( {
			dataType : 'jsonp',
			url : 'https://api.weibo.com/2/emotions.json?source=' + app_id,
			success : function(response) {
				var data = response.data;
				for ( var i in data) {
					if (data[i].category == '') {
						data[i].category = '默认';
					}
					if (emotions[data[i].category] == undefined) {
						emotions[data[i].category] = new Array();
						categorys.push(data[i].category);
					}
					emotions[data[i].category].push( {
						name : data[i].phrase,
						icon : data[i].icon
					});
					uSinaEmotionsHt.put(data[i].phrase, data[i].icon);
				}
			}
		});
	})($);

	//替换
	function AnalyticEmotion(s) {
		if(typeof (s) != "undefined") {
			var sArr = s.match(/\[.*?\]/g);
			for(var i = 0; i < sArr.length; i++){
				if(uSinaEmotionsHt.containsKey(sArr[i])) {
					var reStr = "<img src=\"" + uSinaEmotionsHt.get(sArr[i]) + "\" height=\"22\" width=\"22\" />";
					s = s.replace(sArr[i], reStr);
				}
			}
		}
		return s;
	}

	$.fn.SinaEmotion = function(target){
		var cat_current;
		var cat_page;
		$(this).click(function(event){
			event.stopPropagation();
			
			var width 	= target.parent().innerWidth();
			var eBottom = target.parent().outerHeight();
			var eLeft 	= target.parent().offset().left;
			
			if($('#emotions .categorys')[0]){
				$('#emotions').css({bottom: eBottom, left: eLeft});
				$('#emotions').toggle();
				return;
			}
			$('body').append('<div id="emotions"></div>');
			$('#emotions').css({bottom: eBottom, left: eLeft, width: width});
			$('#emotions').html('<div>正在加载，请稍候...</div>');
			$('#emotions').click(function(event){
				event.stopPropagation();
			});
			
			$('#emotions').html('<div style="float:right"><a href="javascript:void(0);" id="prev">&laquo;</a><a href="javascript:void(0);" id="next">&raquo;</a></div><div class="categorys"></div><div class="container"></div><div class="page"></div>');
			$('#emotions #prev').click(function(){
				showCategorys(cat_page - 1);
			});
			$('#emotions #next').click(function(){
				showCategorys(cat_page + 1);
			});
			showCategorys();
			showEmotions();
			
		});
		$('body').click(function(){
			$('#emotions').remove();
		});
		$.fn.insertText = function(text){
			this.each(function() {
				if(this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {return;}
				if (document.selection) {
					this.focus();
					var cr = document.selection.createRange();
					cr.text = text;
					cr.collapse();
					cr.select();
				}else if (this.selectionStart || this.selectionStart == '0') {
					var 
					start = this.selectionStart,
					end = this.selectionEnd;
					this.value = this.value.substring(0, start)+ text+ this.value.substring(end, this.value.length);
					this.selectionStart = this.selectionEnd = start+text.length;
				}else {
					this.value += text;
				}
			});        
			return this;
		}
		function showCategorys(){
			var page = arguments[0]?arguments[0]:0;
			if(page < 0 || page >= categorys.length / 5){
				return;
			}
			$('#emotions .categorys').html('');
			cat_page = page;
			for(var i = page * 5; i < (page + 1) * 5 && i < categorys.length; ++i){
				$('#emotions .categorys').append($('<a href="javascript:void(0);">' + categorys[i] + '</a>'));
			}
			$('#emotions .categorys a').click(function(){
				showEmotions($(this).text());
			});
			$('#emotions .categorys a').each(function(){
				if($(this).text() == cat_current){
					$(this).addClass('current');
				}
			});
		}
		function showEmotions(){
			var category = arguments[0]?arguments[0]:'默认';
			var page = arguments[1]?arguments[1] - 1:0;
			$('#emotions .container').html('');
			$('#emotions .page').html('');
			cat_current = category;
			for(var i = page * 72; i < (page + 1) * 72 && i < emotions[category].length; ++i){
				$('#emotions .container').append($('<a href="javascript:void(0);" title="' + emotions[category][i].name + '"><img src="' + emotions[category][i].icon + '" alt="' + emotions[category][i].name + '" width="22" height="22" /></a>'));
			}
			$('#emotions .container a').click(function(){
				target.insertText($(this).attr('title'));
				$('#emotions').remove();
			});
			for(var i = 1; i < emotions[category].length / 72 + 1; ++i){
				$('#emotions .page').append($('<a href="javascript:void(0);"' + (i == page + 1?' class="current"':'') + '>' + i + '</a>'));
			}
			$('#emotions .page a').click(function(){
				showEmotions(category, $(this).text());
			});
			$('#emotions .categorys a.current').removeClass('current');
			$('#emotions .categorys a').each(function(){
				if($(this).text() == category){
					$(this).addClass('current');
				}
			});
		}
	}	

	return  {
        analytic : AnalyticEmotion
    };

}(window, document, Green);

Green._Utils = function (window, document, Green) {
    function isDifferentDay(prev, next) {
        return (
            (next.getDate()     != prev.getDate())     ||
            (next.getFullYear() != prev.getFullYear()) ||
            (next.getMonth()    != prev.getMonth())
        );
    };

    function tranTime(date) {
       return this.isDifferentDay( date, new Date() ) ? 
              ( parseInt( date.getMonth() + 1 ) + '-' + date.getDate() + ' ' + date.toTimeString().substr(0,5) ) : 
              date.toTimeString().substr(0,5);
    };

    function template(tpl, data) {
        var re     = /<%([^%>]+)?%>/g, 
            reExp  = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, 
            code   = 'var r=[];\n', 
            cursor = 0;

        var add = function(line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }

        while(match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }

        add(html.substr(cursor, html.length - cursor));

        code += 'return r.join("");';

        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    };

    function freeTextarea($dom, maxHeight) {
        var ta = $dom,
            maxHeight = maxHeight || 70,
            css = (function() {
                var css = {}, i = 8,
                    z = 'width fontSize fontFamily lineHeight wordWrap wordBreak whiteSpace letterSpacing'.split(' ');

                while(i--) css[z[i]] = ta.css(z[i]);
                return $.extend(css, {position : 'absolute', left : -9999, top : 0});
            })(),

            _ta=ta.clone().css(css).attr({id : '', name : '', tabIndex : -1}),
            stCur, valCur, defHeight = ta.height(),
            both=$([ta[0], _ta[0]]),

            autoHeight = function() {
                valCur = ta.val();
                _ta.val(valCur).height(1).scrollTop(9999);

                stCur = Math.min(Math.max(defHeight, _ta.scrollTop()), maxHeight);

                both.height(stCur);
            };

        ta.after(_ta).bind("focus input change propertychange", autoHeight);
    };

    function log(msg) {
        if(!Green.debug) return;

        $('.log').append('<p>'+this.tranTime(new Date())+'：'+msg+'</p>');
    };

    return  {
        isDifferentDay : isDifferentDay,
        tranTime       : tranTime,
        template       : template,
        freeTextarea   : freeTextarea,
        log            : log
    };

}(window, document, Green);


// 状态提示组件
Green._StatusView = function(window, document, Green, Utils) {
    var StatusView = {};

    StatusView.commit = function() {
        var render = '<div class="status-view"></div>';

        this.dom = $(render);

        return this.dom;
    };

    StatusView.msg = function(log) {
        this.dom.html(log).show();
    };

    StatusView.hide = function() {
        this.dom.hide();
    };

    return StatusView;

}(window, document, Green, EventEmitter);


// 联系人组件
Green._RosterView = function (window, document, Green, Utils, EventHandler) {
    function RosterView(roster) {
        this.roster = roster;
    }

    RosterView.prototype.commit = function render() {
        var render = '<div class="roster cf" peer="'+this.roster.id+'">' +  
                        '<span class="unread-dot" style="display:none;"></span>' +   
                        '<span class="unread-dots" style="display:none"></span>' + 
                        '<span class="chat-status '+this.roster.onlineStatus+'"></span>' +  
                        '<div class="avatar-wrap">' +   
                            '<img class="avatar" src="'+this.roster.image+'">' +   
                        '</div>' +     
                        '<div class="info">' +   
                            '<div class="nick-name">' +   
                                '<div class="name" style="">'+this.roster.name+'</div>' +   
                            '</div>' +   
                        '</div>' +  
                     '</div>';

        this.dom = $(render);

        this.dom.click($.proxy(function() {
            EventHandler.trigger('rosterClick', [this]);
        }, this));

        return this.dom;
    };

    RosterView.prototype.updateUnread = function(num) {
        var unreadDom = this.dom.find(".unread-dot");
      
        this.roster.unreadCount = num;

        if(num == 0) {
            unreadDom.hide();
        } 
        else {
            unreadDom.html(num).show();
        }
    };

    RosterView.prototype.updateOnlineStatus = function(status) {
        this.roster.onlineStatus = status;

        this.dom.find(".chat-status").removeClass().addClass( 'chat-status ' + status);
    };

    return RosterView;

}(window, document, Green, Green._Utils, Green._EventHandler);


// 联系人列表组件
Green._RosterListView = function(window, document, Green, Utils, EventHandler, RosterView) {
    var RosterListView = {};

    RosterListView.commit = function(rosters) {
        var render = '<div class="contacts">'+
                        '<div class="title"><i class="icon-user"></i>&nbsp;<b>聊天联系人</b></div>'+
                        '<div class="roster-list"><div class="nano"><div class="active nano-content"></div></div></div>'+
                        '<div class="bottom cf"><div class="online-status"><div class="me-status"><span class="chat-status online"></span><div class="status-text">在线</div></div></div><div class="toggle-btn"><div class="backward" title="展开">&nbsp;<i class="icon-step-backward"></i></div><div class="forward" title="收缩"><i class="icon-step-forward"></i>&nbsp;<b>收缩</b></div></div></div>'+
                     '</div>';

        this.dom = $(render);

        this.rosterViews = {};

        $.each(rosters, function(id, roster) {
            var rosterView = new RosterView( roster );

            RosterListView.rosterViews[id] = rosterView;

            RosterListView.dom.find('.active').append( rosterView.commit() );
        });

        // 精简模式 详细模式转换
        this.dom.find('.title, .toggle-btn').click(function() {
            EventHandler.trigger('rosterListViewToggle', [!RosterListView.dom.hasClass('contacts-minus')]);
        });

        return this.dom;
    };

    RosterListView.init = function() {
        var titHeight = 40;
        var botHeight = 30;
        var offset    = 62;

        var listHeight = $(window).height() - offset;
        var innerHeight = $(window).height() - offset - titHeight - botHeight;

        var domNano = RosterListView.dom.find('.nano');
        domNano.css('height', innerHeight + 'px');
        domNano.nanoScroller();

        this.height = listHeight;
        this.innerHeight = innerHeight;
    };

    RosterListView.get = function(id) {
        return this.rosterViews[id];
    };

    RosterListView.toggle = function(status) {
        if( status ) {
            this.dom.addClass('contacts-minus');
        } 
        else {
            this.dom.removeClass('contacts-minus');
        }
    };

    RosterListView.prepend = function(id) {
        this.get(id).dom.prependTo( this.dom.find('.active') );
    };

    RosterListView.hide = function() {
        this.dom.hide();
    };

    RosterListView.show = function() {
        this.dom.show();
    };

    return RosterListView;

}(window, document, Green, Green._Utils, Green._EventHandler, Green._RosterView);


// 会话窗口组件
Green._ConverseView = function(window, document, Green, Utils, EventHandler) {
    function ConverseView(roster) {
        this.roster = roster;
    }

    ConverseView.prototype.commit = function() {
        var render = '<div class="nano" peer="'+this.roster.id+'">'+
                        '<div class="nano-content messages">'+
                            '<div class="no-more-history"><i class="icon-ban-circle"></i><b>无更多历史消息</b></div>'+
                            '<div class="loadmore"><div class="linit"><i class="icon-time"></i><b>更多历史消息</b></div><div class="lloading"><img src="./image/loading-cir.gif">历史消息加载中...</div></div>'+
                        '</div>'+
                     '</div>';

        this.dom = $(render);

        _init.call(this);

        return this.dom;
    };

    function _init() {
        var domLoadmore = this.dom.find('.loadmore');
        domLoadmore.click($.proxy(function() {
            if( domLoadmore.hasClass('loadmore-loading') ) {
                return false;
            }

            domLoadmore.addClass('loadmore-loading');

            // AVHistoryMessageQuery
            var data = {
                convid : [Green.me.id, this.roster.id],
                timestamp : this.lastMessage.timestamp,
                limit : 30
            };

            EventHandler.trigger('getHistory', [data, this]);
        }, this));



        this.lastMessage = {};

        // 是否有未读的消息
        var unreadMessages = this.roster.unreadMessages;

        if( unreadMessages.length == 0 ) {
            this.lastMessage['timestamp'] = new Date().getTime();

            domLoadmore.trigger('click');// think think!!!!
        } 
        else {
            this.lastMessage = unreadMessages[0];

            this.renderMessage(unreadMessages, 'receive') 

            this.roster.unreadMessages = [];
        }
    };

    ConverseView.prototype.renderMessage = function( messages, mode ) {
        if( !(messages instanceof Array) )  messages = [messages];

        var renderStr = '';
        var date;
        var message;
        var sendStatus;
        for(var i=0, len=messages.length; i<len; i++ ) {
            date = Utils.tranTime( new Date(messages[i].timestamp) );

            if( messages[i].from == Green.me.id ) {
                message = {'pic' : Green.me.image, 'name' : Green.me.name, 'sign' : 'me', 'message' : messages[i].data, 'date' : date};
            } 
            else {
                message = {'pic' : Green.rosters[messages[i].from].image, 'name' : Green.rosters[messages[i].from].name, 'sign' : 'you', 'message' : messages[i].data, 'date' : date};
            }

            sendStatus = '';
            if( mode == 'send') {
                sendStatus = '<div class="send-status"><img src="./image/send-loading.gif"><b>发送失败</b></div>';
            } 

            renderStr += '<div class="cf chat-item '+message.sign+'">' + 
                            '<div class="time">'+message.name+'：'+message.date+' </div>' + 
                            '<div class="chat-item-content cf">' + 
                                '<img class="avatar" src="'+message.pic+'" title="'+message.name+'" alt="'+message.name+'">' +  
                                '<div class="cloud cloud-text">' + 
                                    '<div class="cloud-pannel">' + 
                                        '<div class="cloud-body">' +  
                                            '<div class="cloud-content">'+
                                                '<pre style="white-space:pre-wrap;*white-space:pre;*word-wrap:break-word;">'+message.message+'</pre>'+
                                            '</div>' +  
                                        '</div>' +  
                                        '<div class="cloud-arrow"></div>' +  
                                    '</div>' +  
                                '</div>' +  sendStatus +
                            '</div>' +  
                         '</div>';
        }

        var domMessage = $(renderStr)

        if( mode == 'history' ) {
            var nowPosition = this.getPosition();

            this.dom.find('.loadmore').after(domMessage);

            this.scroll();
            this.adjustPosition(nowPosition);
        }

        if( mode == 'receive' || mode == 'send' ) {
            this.dom.find('.messages').append(domMessage);

            this.scroll();
            this.scrollDown();
        }

        if( mode == 'notCurrent' ) {
            this.dom.find('.messages').append(domMessage);

            this.scroll();
        }

        return domMessage;
    };

    ConverseView.prototype.showLoadmore = function() {
        this.dom.find('.loadmore').removeClass('loadmore-loading').show().find('b').html('更多历史消息');
    };

    ConverseView.prototype.showHistoryFailed = function() {
        this.dom.find('.loadmore').removeClass('loadmore-loading').show().find('b').html('加载历史信息失败 点击重试');
    }; 

    ConverseView.prototype.showNoHistory = function() {
        this.dom.find('.loadmore').hide();

        this.dom.find('.no-more-history').show();
    }

    ConverseView.prototype.scrollDown = function() {
        // this.dom.nanoScroller({ scroll: 'bottom' });
        // 貌似视觉效果好些
        var domMessage = this.dom.find('.messages');
        domMessage.stop().animate( {scrollTop : domMessage[0].scrollHeight} );
    };

    ConverseView.prototype.adjustPosition = function(pre) {
        this.dom.nanoScroller({ scrollTop: this.getPosition()-pre });
    };

    ConverseView.prototype.getPosition = function() {
        return this.dom.find('.messages')[0].scrollHeight;
    };

    ConverseView.prototype.scroll = function() {
        this.dom.nanoScroller({ preventPageScrolling: true, alwaysVisible: true });
    };

    ConverseView.prototype.destroy = function() {
        this.dom.nanoScroller({ destroy: true });
        this.dom.remove();

        delete this;
    };

    return ConverseView;

}(window, document, Green, Green._Utils, Green._EventHandler);

// 会话窗口列表管理组件
Green._ConverseListView = function(window, document, Green, Utils, EventHandler, ConverseView) {
    var ConverseListView = {};

    ConverseListView.commit = function() {
        var render = '<div class="convers"></div>';

        this.dom = $(render);

        this.converseListViews = {};

        return this.dom;
    };

    // 添加一个会话窗口
    ConverseListView.add = function(roster) {
        var view = this.get(roster.id);
        if( view ) return view;

        var converseView = new ConverseView( roster );

        this.converseListViews[roster.id] = converseView;

        this.dom.append( converseView.commit() );

        this.currentView = converseView;

        return converseView;
    };

    ConverseListView.get = function(id) {
        return this.converseListViews[id];
    };

    ConverseListView.front = function(id) {
        this.get(id).dom.css('zIndex', 100).siblings().css('zIndex', 99);
    };

    ConverseListView.show = function() {
        this.dom.show();
    };

    ConverseListView.hide = function() {
        this.dom.hide();
    };

    ConverseListView.remove = function(id) {
        this.get(id).destroy();

        delete this.converseListViews[id];
    };

    ConverseListView.removeAll = function() {
        $.each(this.converseListViews, function(k, v) {
            v.destroy();
        });

        this.converseListViews = {};

        this.currentView = null;
    };

    return ConverseListView;

}(window, document, Green, Green._Utils, Green._EventHandler, Green._ConverseView);


// 会话联系人组件
Green._ChatWithView = function(window, document, Green, Utils, EventHandler) {
    function ChatWithView(roster) {
        this.roster = roster;
    }

    ChatWithView.prototype.commit = function render() {
        var render = '<div class="chat-with cf" peer="'+this.roster.id+'">' + 
                        '<div class="list-head-status"><span class="chat-status '+this.roster.onlineStatus+'"></span></div>' + 
                        '<div class="chat-with-name">'+this.roster.name+'</div>' + 
                        '<a href="javascript:void(0);" class="chat-close"><i class="icon-remove"></i></a>' + 
                        '<a href="javascript:void(0);" class="msg-unread"><i class="icon-volume-down"></i></a>' + 
                     '</div>';

        this.dom = $(render);

        _init.call(this);

        return this.dom;
    };

    function _init() {
        this.dom.click($.proxy(function() { 
            EventHandler.trigger('chatWithClick', [this]);
        }, this));

        this.dom.find('.icon-remove').click($.proxy(function() { 
            EventHandler.trigger('chatWithRemove', [this]); 
        }, this));
    };

    ChatWithView.prototype.updateUnread = function(num) {
        var unreadDom = this.dom.find(".msg-unread");
      
        this.roster.unreadCount = num;

        if(num == 0) {
            unreadDom.hide();
        } 
        else {
            unreadDom.show();
        }
    };

    ChatWithView.prototype.updateOnlineStatus = function(status) {
        this.roster.onlineStatus = status;

        this.dom.find(".chat-status").removeClass().addClass( 'chat-status ' + status);
    };

    ChatWithView.prototype.active = function() {
        this.dom.addClass('active').siblings().removeClass('active');
    };

    ChatWithView.prototype.destroy = function() {
        this.dom.remove();

        delete this;
    };

    return ChatWithView;

}(window, document, Green, Green._Utils, Green._EventHandler);


// 会话联系人列表组件
Green._ChatWithListView = function(window, document, Green, Utils, ChatWithView, EventHandler) {
    var ChatWithListView = {};

    ChatWithListView.commit = function() {
        var render = '<div class="pannel">'+
                        '<div class="c-tit chatusr-tit"><i class="icon-comments"></i>洽谈列表</div>'+
                        '<div class="usr-list"><div class="nano"><div class="nano-content"></div></div></div>'+
                     '</div>';

        this.dom = $(render);

        this.chatWithViews = [];

        return this.dom;
    };

    ChatWithListView.add = function(roster) {
        var view = this.get(roster.id);
        if( view ) return view;

        var chatWithView = new ChatWithView( roster );

        this.chatWithViews.push(chatWithView);

        this.dom.find('.nano-content').append( chatWithView.commit() );

        this.dom.find('.nano').nanoScroller();

        return chatWithView;
    };

    ChatWithListView.get = function(id) {
        var views = this.chatWithViews;

        for( var i=0, len=views.length; i<len; i++ ) {
            if( views[i].roster.id == id ) return views[i];
        }

        return false;
    };

    ChatWithListView.prepend = function(id) {
        this.get(id).dom.prependTo( this.dom.find('.nano-content') );
    };

    ChatWithListView.show = function() {
        this.dom.show();
    };

    ChatWithListView.hide = function() {
        this.dom.hide();
    };

    ChatWithListView.remove = function(chatWithView) {
        var index = $.inArray(chatWithView, this.chatWithViews);

        if( chatWithView.dom.hasClass('active') ) {
            var next;

            if( index == this.chatWithViews.length-1 ) {
                next = this.chatWithViews[index-1];
            } 
            else {
                next = this.chatWithViews[index+1];
            }

            EventHandler.trigger('chatWithClick', [next]);
        }

        this.chatWithViews.splice(index, 1);

        chatWithView.destroy();
        
        this.dom.find('.nano').nanoScroller();
    };

    ChatWithListView.removeAll = function() {
        $.each(this.chatWithViews, function(k, v) {
            v.destroy();
        });

        this.chatWithViews = [];
    };

    return ChatWithListView;

}(window, document, Green, Green._Utils, Green._ChatWithView, Green._EventHandler);


// 聊天输入框组件
Green._InputView = function(window, document, Green, Utils, EventHandler, Expression) {
    var InputView = {};

    InputView.commit = function() {
        var render = '<div class="send cf">'+
				        '<i class="icon-smile"></i>'+
				        '<textarea  class="text" placeholder="按回车12发送"></textarea>'+
				        '<a href="javascript:void(0);" class="btn">发送</a>'+
			         '</div>';

        this.dom = $(render);

        _init.call(this);

        return this.dom;
    };

    function _init() {
        this.dom.find('.btn').click(function() {
            _send.call(InputView);

            return false;
        });

        this.dom.find('.text').keydown(function(e) {
            if(e.which == 13 || e.which == 10) {
                _send.call(InputView);

                return false;
            } 
            // else if (e.shiftKey && e.which==13 || e.which == 10) { 
            //     EventHandler.trigger('sendMessageEnter');
            // }
        });

        this.dom.find('.icon-smile').SinaEmotion(this.dom.find('.text'));
    }

    InputView.init = function() {
        Utils.freeTextarea(this.dom.find('.text'));
    }

    InputView.reset = function() {
        this.dom.find('.text').eq(0).val('').focus();
    }

    function _send() {
        var domInput = this.dom.find('.text'),
            text = domInput.val();
        
        if( text == '' ) {
            domInput.eq(0).focus();
            return false;
        }

        EventHandler.trigger('sendMessageEnter', [Expression.analytic(text)]);
    }


    return InputView;

}(window, document, Green, Green._Utils, Green._EventHandler, Green._Expression);


Green._ChatboxView = function(window, document, Green, Utils, EventHandler, ChatWithListView, ConverseListView, InputView) {
    var ChatboxView = {};

    ChatboxView.commit = function() {
        var render = '<div class="chatbox-wrap">'+
                        '<div class="chatbox cf"><div class="c-tit cf"><div class="chat-with"><img src="" /><b class="chat-name"></b></div><div class="chat-opt"><i class="icon-minus"></i>&nbsp;<i class="icon-remove"></i>&nbsp;</div></div></div>'+
                        '<div class="minus-pannel"><i class="icon-comments"></i><b class="cur-chat-name"></b></div>'+
                     '</div>';

        this.dom = $(render);

        this.dom.prepend( ChatWithListView.commit() );

        this.dom.find('.chatbox').append( ConverseListView.commit() );

        this.dom.find('.chatbox').append( InputView.commit() );

        _init.call(this);

        return this.dom;
    };

    function _init() {
        this.dom.find('.icon-minus').click(function() {
            ChatboxView.minifiy();
            return false;
        });

        this.dom.find('.minus-pannel').click(function() {
            EventHandler.trigger('chatboxMaxfiy');

            return false;
        });

        this.dom.find('.icon-remove').click(function() {
            ChatboxView.remove();
            return false;
        });
    };
    
    ChatboxView.get = function(id) {
        return this.rosterViews[id];
    };

    ChatboxView.toggle = function(status) {
        if( status ) {
            this.dom.addClass('chatbox-wrap-contacts-minus');
        }
        else {
            this.dom.removeClass('chatbox-wrap-contacts-minus');
        }
    };

    ChatboxView.isMinus = function() {
        return this.dom.hasClass('chatbox-minus');
    };

    ChatboxView.maxfiy = function() {
        this.dom.removeClass('chatbox-minus');

        if( this.dom.hasClass('chat-new-message') ) {
            this.dom.removeClass('chat-new-message');
        }
    };

    ChatboxView.minifiy = function() {
        return this.dom.addClass('chatbox-minus');
    };

    ChatboxView.beMulti = function() {
        this.dom.addClass('multi-chatbox');
    };

    ChatboxView.cleanMulti = function() {
        this.dom.removeClass('multi-chatbox');
    };

    ChatboxView.hide = function() {
        return this.dom.hide();
    };

    ChatboxView.show = function() {
        return this.dom.show();
    };

    ChatboxView.remove = function() {
        ChatWithListView.removeAll();
        ConverseListView.removeAll();

        this.hide();
    };

    return ChatboxView;

}(window, document, Green, Green._Utils, Green._EventHandler, Green._ChatWithListView, Green._ConverseListView, Green._InputView);


// 聊天服务器组件
Green._Server = function(window, document, Green, Utils, EventHandler) {
    var Server = {};

    var reconnectTimes = 0;
    var reconnectLimit = 0;

    var appId = '0s66p2ntvx0q56pk5mh8wxa7cuegr57w5abvb7nwv5dqymyo';

    var handler;

    Server.isOpen = false;

    Server.init = function() {
        handler = new AVChatClient({
            appId: appId,
            peerId: Green.me.id,
            auth: _auth, // 需要身份验证的时候加上
            // groupAuth: groupAuth,
            watchingPeerIds: Green.watch
        });

        handler.on('close', function(event) {
            _onClose(event);
        });

        handler.on('message', function(data) {
            _onMessage(data);
        });

        handler.on('online', function(rosters) {
            _onOnline(rosters);
        });

        handler.on('offline', function(rosters) {
            _onOffline(rosters);
        });

        _connect();
    }

    function _connect() {
        if( !Server.isOpen && reconnectTimes==0 ) EventHandler.trigger('onConnectStart');

        handler.open().then(function() {
            Server.isOpen = true;

            reconnectTimes = 0;

            EventHandler.trigger('onConnectSuccess');

        }, function(err) {
            EventHandler.trigger('onConnectError');
        });
    }

    function _onMessage(data) {
        // console.log(data);//---------------------
        
        var message = {'from' : data.fromPeerId, 'to' : data.peerId, 'data' : data.msg, 'timestamp' : data.timestamp};

        if( data.toPeerIds ) {
            message.to = data.toPeerIds[0];
        }

        EventHandler.trigger('messageReceived', [message]);
    }

    function _onClose(event) {
        Server.isOpen = false;

        if(reconnectTimes < reconnectLimit) {
            reconnectTimes++;

            EventHandler.trigger('onReconnect', [reconnectTimes]);

            Server.init();
        } 
        else {
            EventHandler.trigger('onConnectClose');
        }
    }

    function _onOnline(ids) {
        for(var i=0, len=ids.length; i<len; i++) {
            if( ids[i] == Green.me.id ) continue;
            
            EventHandler.trigger('online', [ ids[i] ]);
        }
    }

    function _onOffline(ids) {
        for(var i=0, len=ids.length; i<len; i++) {
            if( ids[i] == Green.me.id ) continue;

            EventHandler.trigger('offline', [ ids[i] ]);
        }
    }

    function _auth(rosterId, watchs, sp) {
        if( !Server.authUrl ) return false;
        
        return new Promise(function(resolve, reject) {
            $.post(Server.authUrl, {
                self_id: rosterId,
                watch_ids: watchs.join(':')
            }).success(function(data) {
                data = $.parseJSON(data);
                
                resolve({
                    n: data.nonce,
                    t: data.timestamp,
                    s: data.signature,
                    sp: data.sp,
                    watchingPeerIds: data.watchIds
                });
            }).error(function(err) {
                reject(err);
            });
        });
    }

    Server.getRosters = function() {
        if( !this.rostersUrl ) return false;

        var id = window.location.hash.split('#')[1] || 1;

        // 联系人列表
        $.ajax({
            type : "POST", 
            url : this.rostersUrl+'?id='+id,
            timeout : 10000,
            success : function(msg) {
                var data = $.parseJSON(msg);

                if( data.length == 0 ) return;

                Green.me    = data.me;
                Green.me.id = Green.me.id.toString();

                /////////
                Utils.log('我的身份-<b style="color:red">'+Green.me.name+'</b>');
                
                Green.watch = [];

                var rosters = {};
                for(var i = 0, len = data.rosters.length; i < len; i++) {
                    data.rosters[i]['id'] = data.rosters[i]['id'].toString();

                    Green.watch.push(data.rosters[i]['id']);

                    rosters[data.rosters[i]['id']] = {
                        id             : data.rosters[i]['id']    ,
                        name           : data.rosters[i]['name']  ,
                        image          : data.rosters[i]['image'] ,
                        unreadCount    : 0                        ,
                        onlineStatus   : 'offline'                ,
                        unreadMessages : []
                    };
                }

                Green.rosters = rosters;

                EventHandler.trigger('getRostersSuccess');
            },
            error : function() {
                
            }
        });
    };

    Server.getHistory = function(param, converse) {
        if( !this.conversationUrl ) return false;

        //请求聊天列表
        $.ajax({
            type : "POST", 
            url : this.conversationUrl,
            data : param,
            success : function(msg) {
                try {
                    var data = $.parseJSON(msg);
                    var messages = [];

                    for(var i=0, len=data.length; i<len; i++) {
                        messages.push({'from' : data[i].from, 'to' : data[i].to[0], 'data' : data[i].data, 'timestamp' : data[i].timestamp});
                    }

                } catch(e) {
                    var messages = false;
                }

                EventHandler.trigger('getHistorySuccess', [param, converse, messages]);
            },
            error : function() {
                EventHandler.trigger('getHistoryFailed', [param, converse]);
            }
        });
    };

    Server.sendMessage = function(message, dom) {
        handler.send(message.data, message.to).then(function() {
            EventHandler.trigger('sendMessageSuccess', [message, dom]);
        }, function(err) {
            EventHandler.trigger('sendMessageFailed', [message, dom]);
        });
    };

    Server.setRostersUrl = function(url) {
        this.rostersUrl = url;
    };

    Server.setConversationUrl = function(url) {
        this.conversationUrl = url;
    };

    Server.setAuthUrl = function(url) {
        this.authUrl = url;
    };

    return Server;

}(window, document, Green, Green._Utils, Green._EventHandler);


Green.init = function(window, document, Green, Utils, EventHandler, ChatboxView, RosterListView, ChatWithListView, ConverseListView, InputView, StatusView, Server) {
    Green.debug = true;

    function _commit() {
        var render = '<div class="greenchat"><div class="greenchat-inner"></div></div>';

        var dom = $(render);

        dom.append( StatusView.commit() );

        dom.append( ChatboxView.commit() );

        dom.append( RosterListView.commit(Green.rosters) );

        return dom;
    }

    function _deploy() {
        $('body').append( _commit() );
    };

    function init(options) {
        if( options.rostersUrl ) Server.setRostersUrl(options.rostersUrl);
        if( options.conversationUrl ) Server.setConversationUrl(options.conversationUrl);
        if( options.authUrl ) Server.setAuthUrl(options.authUrl);

        Server.getRosters();
    }

    /* －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
     * 事件管理
     */

    EventHandler.on('onConnectStart', function() {
       StatusView.msg('聊天初始化中...'); 
    });

    EventHandler.on('onConnectSuccess', function() {
       StatusView.hide();
    });

    EventHandler.on('onConnectClose', function() {
       StatusView.msg('连接已断开，刷新重试'); 
    });

    EventHandler.on('onReconnect', function(count) {
       StatusView.msg('连接失败，重连中('+count+')...'); 
    });

    EventHandler.on('getRostersSuccess', function() {
        _deploy();

        Server.init();

        RosterListView.init();

        InputView.init();

        StatusView.dom.css({
            height     : RosterListView.height+'px', 
            lineHeight : RosterListView.height+'px'
        }); 
    });


    EventHandler.on('rosterListViewToggle', function(status) {
        RosterListView.toggle(status);

        ChatboxView.toggle(status);
    });

    EventHandler.on('online', function(id) { 
         RosterListView.get(id).updateOnlineStatus('online');
         RosterListView.prepend(id);

         var chatWithView = ChatWithListView.get(id);
         if( chatWithView ) chatWithView.updateOnlineStatus('online');
    });

    EventHandler.on('offline', function(id) { 
         RosterListView.get(id).updateOnlineStatus('offline');

         var chatWithView = ChatWithListView.get(id);
         if( chatWithView ) chatWithView.updateOnlineStatus('offline');
    });


    EventHandler.on('rosterClick', function(rosterView) {
        ChatboxView.show();

        var chatWithView = ChatWithListView.add(rosterView.roster);

        if( ChatWithListView.chatWithViews.length > 1 ) {
            ChatboxView.beMulti();
        }

        ConverseListView.add(rosterView.roster);

        EventHandler.trigger('chatWithClick', [chatWithView]);
    });

    EventHandler.on('chatWithClick', function(chatWithView) {
        var roster = chatWithView.roster;

        RosterListView.get(roster.id).updateUnread(0);

        chatWithView.updateUnread(0);
        chatWithView.active();

        ConverseListView.front(roster.id);
        ConverseListView.currentView = ConverseListView.get(roster.id);
        ConverseListView.currentView.scroll();

        if( ChatboxView.isMinus ) ChatboxView.maxfiy(); 

        ChatboxView.dom.find('.chat-with img').attr('src', roster.image);
        ChatboxView.dom.find('.chat-with .chat-name').html(roster.name);
        ChatboxView.dom.find('.cur-chat-name').html(roster.name);
    });


    EventHandler.on('chatWithRemove', function(chatWithView) {
        ChatWithListView.remove(chatWithView);

        ConverseListView.remove(chatWithView.roster.id);

        if( ChatWithListView.chatWithViews.length == 1 ) {
            ChatboxView.cleanMulti();
        }
    });


    EventHandler.on('chatboxMaxfiy', function() {
        var curId = ConverseListView.currentView.roster.id;

        RosterListView.get(curId).updateUnread(0);

        ChatboxView.maxfiy();
    });


    EventHandler.on('sendMessageEnter', function(text) {
        if( !Server.isOpen ) alert('连接已断开，刷新重试');

        InputView.reset();

        var converseView = ConverseListView.currentView;

        var message = {
            from      : Green.me.id, 
            to        : converseView.roster.id, 
            data      : text, 
            timestamp : new Date().getTime()
        };
        var domMessage = converseView.renderMessage(message, 'send');

        Server.sendMessage(message, domMessage);
    });

    EventHandler.on('sendMessageSuccess', function(message, domMessage) {
        domMessage.addClass('send-success');
    });

    EventHandler.on('sendMessageFailed', function(message, domMessage) {
        domMessage.addClass('send-failed');
    });



    EventHandler.on('getHistory', function(param, converse) {
        // leancloud 获取聊天记录是 大于等于 
        param.timestamp -= 1; // fixed

        Server.getHistory(param, converse);
    });
    
    EventHandler.on('getHistorySuccess', function(param, converseView, data) { 
        if( data === false ) {
            converseView.showHistoryFailed();
            return false;
        }

        if( !data || data.length == 0 ) {
            converseView.showNoHistory();
            return false;
        }

        data.reverse();

        converseView.lastMessage = data[0];

        converseView.renderMessage(data, 'history');

        if( data.length < 30 ) {
            converseView.showNoHistory();
        }
        else {
            converseView.showLoadmore();
        }
    });

    EventHandler.on('getHistoryFailed', function(param, converseView) {
        converseView.showHistoryFailed();
    });



    EventHandler.on('messageReceived', function(message) {
        // 多窗口信息同步
        if( message.from == Green.me.id ) {
            if( ConverseListView.get(message.to) ) {
                var chatWithView = ChatWithListView.get(message.to);
                
                EventHandler.trigger('chatWithClick', [chatWithView]);

                ConverseListView.get(message.to).renderMessage(message, 'receive');

                ChatWithListView.prepend(message.to);
            } else {
                var rosterView = RosterListView.get(message.to);

                rosterView.roster.unreadMessages.push(message);

                EventHandler.trigger('rosterClick', [rosterView]);
            }

            RosterListView.prepend(message.to);

            return false;
        }

        var rosterView = RosterListView.get(message.from);
        if( !rosterView ) return false;

        var unreadCount = rosterView.roster.unreadCount;
        unreadCount++;

        RosterListView.prepend(message.from);

        if( ConverseListView.get(message.from) ) {// 聊天窗口存在
            var chatWithView = ChatWithListView.get(message.from);
            var converseView = ConverseListView.get(message.from);
            var isCur        = ConverseListView.currentView.roster.id == message.from;

            ChatWithListView.prepend(message.from);

            if( ChatboxView.isMinus() ) {
                ChatboxView.dom.addClass('chat-new-message');

                chatWithView.updateUnread( unreadCount );
                rosterView.updateUnread( unreadCount );

                converseView.renderMessage(message, 'notCurrent');
            } else {
                if( !isCur ) {
                    chatWithView.updateUnread( unreadCount );
                    rosterView.updateUnread( unreadCount );

                    converseView.renderMessage(message, 'notCurrent');
                } else {
                    converseView.renderMessage(message, 'receive');
                } 
            }                         

        } else {
            rosterView.updateUnread(unreadCount);

            rosterView.roster.unreadMessages.push(message);
        }
    });
    
    return init;

}(window, document, Green, Green._Utils, Green._EventHandler, Green._ChatboxView, Green._RosterListView, Green._ChatWithListView, Green._ConverseListView, Green._InputView, Green._StatusView, Green._Server);

