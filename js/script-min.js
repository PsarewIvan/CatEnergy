"use strict";function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}window.matchMedia||(window.matchMedia=function(){var t=window.styleMedia||window.media;if(!t){var n,r=document.createElement("style"),e=document.getElementsByTagName("script")[0];r.type="text/css",r.id="matchmediajs-test",e.parentNode.insertBefore(r,e),n="getComputedStyle"in window&&window.getComputedStyle(r,null)||r.currentStyle,t={matchMedium:function(e){var t="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return r.styleSheet?r.styleSheet.cssText=t:r.textContent=t,"1px"===n.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),function(l,d,e){function t(e){"object"===("undefined"==typeof module?"undefined":m(module))&&"object"===m(module.exports)?module.exports=e:"function"==typeof define&&define.amd&&define("picturefill",function(){return e}),"object"===m(l)&&(l.picturefill=e)}if(l.HTMLPictureElement)t(function(){});else{d.createElement("picture");var n,r,u=l.picturefill||{},p=/\s+\+?\d+(e\d+)?w/;u.ns="picturefill",u.srcsetSupported="srcset"in e,u.sizesSupported="sizes"in e,u.curSrcSupported="currentSrc"in e,u.trim=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},u.makeUrl=(n=d.createElement("a"),function(e){return n.href=e,n.href}),u.restrictsMixedContent=function(){return"https:"===l.location.protocol},u.matchesMedia=function(e){return l.matchMedia&&l.matchMedia(e).matches},u.getDpr=function(){return l.devicePixelRatio||1},u.getWidthFromLength=function(e){var t;if(!e||-1<e.indexOf("%")!=!1||!(0<parseFloat(e)||-1<e.indexOf("calc(")))return!1;e=e.replace("vw","%"),u.lengthEl||(u.lengthEl=d.createElement("div"),u.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden",u.lengthEl.className="helper-from-picturefill-js"),u.lengthEl.style.width="0px";try{u.lengthEl.style.width=e}catch(e){}return d.body.appendChild(u.lengthEl),(t=u.lengthEl.offsetWidth)<=0&&(t=!1),d.body.removeChild(u.lengthEl),t},u.detectTypeSupport=function(e,t){var n=new l.Image;return n.onerror=function(){u.types[e]=!1,s()},n.onload=function(){u.types[e]=1===n.width,s()},n.src=t,"pending"},u.types=u.types||{},u.initTypeDetects=function(){u.types["image/jpeg"]=!0,u.types["image/gif"]=!0,u.types["image/png"]=!0,u.types["image/svg+xml"]=d.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),u.types["image/webp"]=u.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")},u.verifyTypeSupport=function(e){var t=e.getAttribute("type");if(null===t||""===t)return!0;var n=u.types[t];return"string"==typeof n&&"pending"!==n?(u.types[t]=u.detectTypeSupport(t,n),"pending"):"function"==typeof n?(n(),"pending"):n},u.parseSize=function(e){var t=/(\([^)]+\))?\s*(.+)/g.exec(e);return{media:t&&t[1],length:t&&t[2]}},u.findWidthFromSourceSize=function(e){for(var t,n=u.trim(e).split(/\s*,\s*/),r=0,i=n.length;r<i;r++){var s=n[r],o=u.parseSize(s),a=o.length,c=o.media;if(a&&((!c||u.matchesMedia(c))&&(t=u.getWidthFromLength(a))))break}return t||Math.max(l.innerWidth||0,d.documentElement.clientWidth)},u.parseSrcset=function(e){for(var t=[];""!==e;){var n,r=(e=e.replace(/^\s+/g,"")).search(/\s/g),i=null;if(-1!==r){if(","!==(n=e.slice(0,r)).slice(-1)&&""!==n||(n=n.replace(/,+$/,""),i=""),e=e.slice(r+1),null===i){var s=e.indexOf(",");e=-1!==s?(i=e.slice(0,s),e.slice(s+1)):(i=e,"")}}else n=e,e="";(n||i)&&t.push({url:n,descriptor:i})}return t},u.parseDescriptor=function(e,t){var n,r=t||"100vw",i=e&&e.replace(/(^\s+|\s+$)/g,""),s=u.findWidthFromSourceSize(r);if(i)for(var o=i.split(" "),a=o.length-1;0<=a;a--){var c=o[a],l=c&&c.slice(c.length-1);if("h"!==l&&"w"!==l||u.sizesSupported){if("x"===l){var d=c&&parseFloat(c,10);n=d&&!isNaN(d)?d:1}}else n=parseFloat(parseInt(c,10)/s)}return n||1},u.getCandidatesFromSourceSet=function(e,t){for(var n=u.parseSrcset(e),r=[],i=0,s=n.length;i<s;i++){var o=n[i];r.push({url:o.url,resolution:u.parseDescriptor(o.descriptor,t)})}return r},u.dodgeSrcset=function(e){e.srcset&&(e[u.ns].srcset=e.srcset,e.srcset="",e.setAttribute("data-pfsrcset",e[u.ns].srcset))},u.processSourceSet=function(e){var t=e.getAttribute("srcset"),n=e.getAttribute("sizes"),r=[];return"IMG"===e.nodeName.toUpperCase()&&e[u.ns]&&e[u.ns].srcset&&(t=e[u.ns].srcset),t&&(r=u.getCandidatesFromSourceSet(t,n)),r},u.backfaceVisibilityFix=function(e){var t=e.style||{},n="webkitBackfaceVisibility"in t,r=t.zoom;n&&(t.zoom=".999",n=e.offsetWidth,t.zoom=r)},u.setIntrinsicSize=(r={},function(e,t){var n;e[u.ns]&&!l.pfStopIntrinsicSize&&(void 0===e[u.ns].dims&&(e[u.ns].dims=e.getAttribute("width")||e.getAttribute("height")),e[u.ns].dims||(t.url in r?i(e,r[t.url],t.resolution):((n=d.createElement("img")).onload=function(){if(r[t.url]=n.width,!r[t.url])try{d.body.appendChild(n),r[t.url]=n.width||n.offsetWidth,d.body.removeChild(n)}catch(e){}e.src===t.url&&i(e,r[t.url],t.resolution),e=null,n.onload=null,n=null},n.src=t.url)))}),u.applyBestCandidate=function(e,t){var n,r,i;e.sort(u.ascendingSort),i=e[(r=e.length)-1];for(var s=0;s<r;s++)if((n=e[s]).resolution>=u.getDpr()){i=n;break}i&&(i.url=u.makeUrl(i.url),t.src!==i.url&&(u.restrictsMixedContent()&&"http:"===i.url.substr(0,"http:".length).toLowerCase()?void 0!==window.console&&console.warn("Blocked mixed content image "+i.url):(t.src=i.url,u.curSrcSupported||(t.currentSrc=t.src),u.backfaceVisibilityFix(t))),u.setIntrinsicSize(t,i))},u.ascendingSort=function(e,t){return e.resolution-t.resolution},u.removeVideoShim=function(e){var t=e.getElementsByTagName("video");if(t.length){for(var n=t[0],r=n.getElementsByTagName("source");r.length;)e.insertBefore(r[0],n);n.parentNode.removeChild(n)}},u.getAllElements=function(){for(var e=[],t=d.getElementsByTagName("img"),n=0,r=t.length;n<r;n++){var i=t[n];("PICTURE"===i.parentNode.nodeName.toUpperCase()||null!==i.getAttribute("srcset")||i[u.ns]&&null!==i[u.ns].srcset)&&e.push(i)}return e},u.getMatch=function(e,t){for(var n,r=t.childNodes,i=0,s=r.length;i<s;i++){var o=r[i];if(1===o.nodeType){if(o===e)return n;if("SOURCE"===o.nodeName.toUpperCase()){null!==o.getAttribute("src")&&void 0!==("undefined"==typeof console?"undefined":m(console))&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var a=o.getAttribute("media");if(o.getAttribute("srcset")&&(!a||u.matchesMedia(a))){var c=u.verifyTypeSupport(o);if(!0===c){n=o;break}if("pending"===c)return!1}}}}return n},function(){function e(){s({reevaluate:!0})}u.initTypeDetects(),s();var t,n=setInterval(function(){s(),/^loaded|^i|^c/.test(d.readyState)&&clearInterval(n)},250);function r(){clearTimeout(t),t=setTimeout(e,60)}l.addEventListener?l.addEventListener("resize",r,!1):l.attachEvent&&l.attachEvent("onresize",r)}(),s._=u,t(s)}function i(e,t,n){t&&e.setAttribute("width",parseInt(t/n,10))}function s(e){for(var t,n,r,i,s,o=e||{},a=0,c=(t=o.elements||u.getAllElements()).length;a<c;a++)if(r=(n=t[a]).parentNode,s=i=void 0,"IMG"===n.nodeName.toUpperCase()&&(n[u.ns]||(n[u.ns]={}),o.reevaluate||!n[u.ns].evaluated)){if(r&&"PICTURE"===r.nodeName.toUpperCase()){if(u.removeVideoShim(r),!1===(i=u.getMatch(n,r)))continue}else i=void 0;(r&&"PICTURE"===r.nodeName.toUpperCase()||!u.sizesSupported&&n.srcset&&p.test(n.srcset))&&u.dodgeSrcset(n),i?(s=u.processSourceSet(i),u.applyBestCandidate(s,n)):(s=u.processSourceSet(n),void 0!==n.srcset&&!n[u.ns].srcset||u.applyBestCandidate(s,n)),n[u.ns].evaluated=!0}}}(window,window.document,new window.Image);var t=document.querySelector(".js--main-nav"),n=document.querySelector(".js--header__nav-btn");document.querySelector("js--header-burger");if(matchMedia){var e=window.matchMedia("(min-width: 768px)");e.addListener(r),r(e)}function r(e){e.matches?(t.classList.remove("display-none"),n.classList.add("display-none")):(t.classList.add("display-none"),n.classList.remove("display-none"),n.classList.remove("header__nav-btn--close"))}if(n.addEventListener("click",function(e){e.preventDefault(),t.classList.toggle("display-none"),n.classList.toggle("header__nav-btn--close")}),document.querySelector(".js-example__switch")){var i=function(e){e.matches?(c.addEventListener("click",s),l.addEventListener("click",o),d.addEventListener("click",a)):(c.removeEventListener("click",s),l.removeEventListener("click",o),d.removeEventListener("click",a))},s=function(e){e.preventDefault(),u.classList.remove(f),p.classList.add(f),d.classList.add("example__switch--after")},o=function(e){e.preventDefault(),p.classList.remove(f),u.classList.add(f),d.classList.remove("example__switch--after")},a=function(e){e.preventDefault(),p.classList.toggle(f),u.classList.toggle(f),d.classList.toggle("example__switch--after")},c=document.querySelector(".js-example__switch-btn--after"),l=document.querySelector(".js-example__switch-btn--before"),d=document.querySelector(".js-example__switch"),u=document.querySelector(".js-example__picture--after"),p=document.querySelector(".js-example__picture--before"),f="example__picture--hide";if(matchMedia){var h=window.matchMedia("(max-width: 768px)");h.addListener(i),i(h)}}document.querySelector("#ymap")&&ymaps.ready(function(){var t=new ymaps.Map("ymap",{center:[59.938631,30.3230554],zoom:17}),e=new ymaps.Placemark([59.938631,30.3230554],{balloonContentHeader:"Cat Energy",balloonContentBody:"ул. Большая <br>Конюшенная, д. 19/8 <br>Санкт-Петербург",hintContent:"Мы находимся здесь"},{iconLayout:"default#image",iconImageHref:"img/picture/map-pin.png",iconImageSize:[60,51],iconImageOffset:[-30,-51]});if(t.geoObjects.add(e),t.behaviors.disable(["scrollZoom"]),matchMedia){var n=function(e){e.matches?t.setCenter([59.938725,30.319447]):t.setCenter([59.938631,30.3230554])},r=window.matchMedia("(min-width: 1300px)");r.addListener(n),n(r)}});