!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,a)}c((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0});var u,a=!1,c="",l=[],s=[],f=[];t.getCachedActions=function(){return l},t.resetCachedActions=function(){for(;l.length>0;)l.pop()},t.setRunDry=function(e){a=e},t.setApiKey=function(e,t){if(void 0===t&&(t=!1),(null==e||"string"!=typeof e||0===e.length)&&!t)throw new Error("API key is required to interact with JackLog");c=e},t.sendAction=function(e,t){return void 0===t&&(t={}),o(void 0,void 0,void 0,(function(){return i(this,(function(n){if(null==e||"string"!=typeof e||0===e.length)throw new Error("A name is required to create an action with JackLog");if("object"!=typeof t)throw new Error("Properties need to be an object to create an action with JackLog");return l.push({name:e,properties:t}),[2,o(void 0,void 0,void 0,(function(){return i(this,(function(e){return[2,new Promise((function(e,t){s.push(e),f.push(t),null==u&&(u=setTimeout((function(){return o(void 0,void 0,void 0,(function(){var e,t,n;return i(this,(function(p){switch(p.label){case 0:u=null,p.label=1;case 1:return p.trys.push([1,3,,4]),[4,o(void 0,void 0,void 0,(function(){var e,t;return i(this,(function(n){switch(n.label){case 0:if(null==c||"string"!=typeof c||0===c.length)throw new Error("API key is required to interact with Jacklog");for(e=l.map((function(e){var t=null==e.properties?{}:e.properties;return{name:e.name,properties:r({},t)}}));l.length>0;)l.pop();return null==e||0===e.length?[2,[]]:(t={timeout:18e4,headers:{Authorization:"Key "+c,"Content-Type":"application/json"},method:"POST",body:JSON.stringify({subject:"action",verb:"createActions",params:{apiKey:c,actions:e}})},a?[3,3]:[4,fetch("https://api.jacklog.io/api",t)]);case 1:return[4,n.sent().json()];case 2:n.sent(),n.label=3;case 3:return[2,e]}}))}))];case 2:for(e=p.sent(),n=0;n<s.length;n+=1)s[n](e);return[3,4];case 3:for(t=p.sent(),n=0;n<f.length;n+=1)f[n](t);return[3,4];case 4:for(;s.length>0;)s.pop();for(;f.length>0;)f.pop();return[2]}}))}))}),1e3))}))]}))}))]}))}))}}]);