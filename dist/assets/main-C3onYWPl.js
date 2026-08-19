var UC=Object.defineProperty;var jC=(r,e,t)=>e in r?UC(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var $=(r,e,t)=>jC(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const hs="https://script.google.com/macros/s/AKfycbzqtSn6Xm9DSOUJTTcC_mdkvSLkUBIoNdhfr-oE2ET6WyPYQys9FWgPdecsu4sbXXA/exec",$C=()=>{};var Fc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},JC=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],a=r[t++],o=r[t++],B=((s&7)<<18|(i&63)<<12|(a&63)<<6|o&63)-65536;e[n++]=String.fromCharCode(55296+(B>>10)),e[n++]=String.fromCharCode(56320+(B&1023))}else{const i=r[t++],a=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},mh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,o=a?r[s+1]:0,B=s+2<r.length,c=B?r[s+2]:0,h=i>>2,d=(i&3)<<4|o>>4;let p=(o&15)<<2|c>>6,C=c&63;B||(C=64,a||(p=64)),n.push(t[h],t[d],t[p],t[C])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(gh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):JC(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],o=s<r.length?t[r.charAt(s)]:0;++s;const c=s<r.length?t[r.charAt(s)]:64;++s;const d=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||o==null||c==null||d==null)throw new qC;const p=i<<2|o>>4;if(n.push(p),c!==64){const C=o<<4&240|c>>2;if(n.push(C),d!==64){const m=c<<6&192|d;n.push(m)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class qC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zC=function(r){const e=gh(r);return mh.encodeByteArray(e,!0)},da=function(r){return zC(r).replace(/\./g,"")},KC=function(r){try{return mh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WC=()=>QC().__FIREBASE_DEFAULTS__,YC=()=>{if(typeof process>"u"||typeof Fc>"u")return;const r=Fc.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},XC=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&KC(r[1]);return e&&JSON.parse(e)},Sl=()=>{try{return $C()||WC()||YC()||XC()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},ZC=r=>{var e,t;return(t=(e=Sl())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},ep=r=>{const e=ZC(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Eh=()=>{var r;return(r=Sl())==null?void 0:r.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function np(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[da(JSON.stringify(t)),da(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function sp(){var e;const r=(e=Sl())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ip(){return!sp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ap(){try{return typeof indexedDB=="object"}catch{return!1}}function op(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp="FirebaseError";class ds extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=lp,Object.setPrototypeOf(this,ds.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,yh.prototype.create)}}class yh{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Bp(i,n):"Error",o=`${this.serviceName}: ${a} (${s}).`;return new ds(s,o,n)}}function Bp(r,e){try{let t=0,n="";for(;t<r.length;){const s=r.indexOf("{$",t);if(s===-1){n+=r.substring(t);break}const i=r.indexOf("}",s+2);if(i===-1){n+=r.substring(t);break}const a=r.substring(s+2,i),o=e[a];n+=r.substring(t,s)+(o!=null?String(o):`<${a}?>`),t=i+1}return n}catch{return r}}function fa(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],a=e[s];if(Nc(i)&&Nc(a)){if(!fa(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Nc(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wh(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cp(r){return(await fetch(r,{credentials:"include"})).ok}class ii{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new tp;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(dp(e))try{this.getOrInitializeService({instanceIdentifier:fr})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=fr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=fr){return this.instances.has(e)}getOptions(e=fr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(i);n===o&&a.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:hp(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=fr){return this.component?this.component.multipleInstances?e:fr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function hp(r){return r===fr?void 0:r}function dp(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new up(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(ge||(ge={}));const Cp={debug:ge.DEBUG,verbose:ge.VERBOSE,info:ge.INFO,warn:ge.WARN,error:ge.ERROR,silent:ge.SILENT},pp=ge.INFO,gp={[ge.DEBUG]:"log",[ge.VERBOSE]:"log",[ge.INFO]:"info",[ge.WARN]:"warn",[ge.ERROR]:"error"},mp=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=gp[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Dh{constructor(e){this.name=e,this._logLevel=pp,this._logHandler=mp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ge))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Cp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ge.DEBUG,...e),this._logHandler(this,ge.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ge.VERBOSE,...e),this._logHandler(this,ge.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ge.INFO,...e),this._logHandler(this,ge.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ge.WARN,...e),this._logHandler(this,ge.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ge.ERROR,...e),this._logHandler(this,ge.ERROR,...e)}}const Ep=(r,e)=>e.some(t=>r instanceof t);let xc,Oc;function yp(){return xc||(xc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wp(){return Oc||(Oc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const vh=new WeakMap,Zo=new WeakMap,_h=new WeakMap,Lo=new WeakMap,Al=new WeakMap;function Dp(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{t(Hn(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&vh.set(t,r)}).catch(()=>{}),Al.set(e,r),e}function vp(r){if(Zo.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});Zo.set(r,e)}let el={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Zo.get(r);if(e==="objectStoreNames")return r.objectStoreNames||_h.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Hn(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function _p(r){el=r(el)}function bp(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(ko(this),e,...t);return _h.set(n,e.sort?e.sort():[e]),Hn(n)}:wp().includes(r)?function(...e){return r.apply(ko(this),e),Hn(vh.get(this))}:function(...e){return Hn(r.apply(ko(this),e))}}function Ip(r){return typeof r=="function"?bp(r):(r instanceof IDBTransaction&&vp(r),Ep(r,yp())?new Proxy(r,el):r)}function Hn(r){if(r instanceof IDBRequest)return Dp(r);if(Lo.has(r))return Lo.get(r);const e=Ip(r);return e!==r&&(Lo.set(r,e),Al.set(e,r)),e}const ko=r=>Al.get(r);function Tp(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(r,e),o=Hn(a);return n&&a.addEventListener("upgradeneeded",B=>{n(Hn(a.result),B.oldVersion,B.newVersion,Hn(a.transaction),B)}),t&&a.addEventListener("blocked",B=>t(B.oldVersion,B.newVersion,B)),o.then(B=>{i&&B.addEventListener("close",()=>i()),s&&B.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const Sp=["get","getKey","getAll","getAllKeys","count"],Ap=["put","add","delete","clear"],Mo=new Map;function Lc(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Mo.get(e))return Mo.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=Ap.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Sp.includes(t)))return;const i=async function(a,...o){const B=this.transaction(a,s?"readwrite":"readonly");let c=B.store;return n&&(c=c.index(o.shift())),(await Promise.all([c[t](...o),s&&B.done]))[0]};return Mo.set(e,i),i}_p(r=>({...r,get:(e,t,n)=>Lc(e,t)||r.get(e,t,n),has:(e,t)=>!!Lc(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Rp(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Rp(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const tl="@firebase/app",kc="0.16.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=new Dh("@firebase/app"),Fp="@firebase/app-compat",Np="@firebase/analytics-compat",xp="@firebase/analytics",Op="@firebase/app-check-compat",Lp="@firebase/app-check",kp="@firebase/auth",Mp="@firebase/auth-compat",Vp="@firebase/database",Gp="@firebase/data-connect",Hp="@firebase/database-compat",Up="@firebase/functions",jp="@firebase/functions-compat",$p="@firebase/installations",Jp="@firebase/installations-compat",qp="@firebase/messaging",zp="@firebase/messaging-compat",Kp="@firebase/performance",Qp="@firebase/performance-compat",Wp="@firebase/remote-config",Yp="@firebase/remote-config-compat",Xp="@firebase/storage",Zp="@firebase/storage-compat",eg="@firebase/firestore",tg="@firebase/ai",ng="@firebase/firestore-compat",rg="firebase",sg="12.17.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="[DEFAULT]",ig={[tl]:"fire-core",[Fp]:"fire-core-compat",[xp]:"fire-analytics",[Np]:"fire-analytics-compat",[Lp]:"fire-app-check",[Op]:"fire-app-check-compat",[kp]:"fire-auth",[Mp]:"fire-auth-compat",[Vp]:"fire-rtdb",[Gp]:"fire-data-connect",[Hp]:"fire-rtdb-compat",[Up]:"fire-fn",[jp]:"fire-fn-compat",[$p]:"fire-iid",[Jp]:"fire-iid-compat",[qp]:"fire-fcm",[zp]:"fire-fcm-compat",[Kp]:"fire-perf",[Qp]:"fire-perf-compat",[Wp]:"fire-rc",[Yp]:"fire-rc-compat",[Xp]:"fire-gcs",[Zp]:"fire-gcs-compat",[eg]:"fire-fst",[ng]:"fire-fst-compat",[tg]:"fire-vertex","fire-js":"fire-js",[rg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca=new Map,ag=new Map,rl=new Map;function Mc(r,e){try{r.container.addComponent(e)}catch(t){bn.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function pa(r){const e=r.name;if(rl.has(e))return bn.debug(`There were multiple attempts to register component ${e}.`),!1;rl.set(e,r);for(const t of Ca.values())Mc(t,r);for(const t of ag.values())Mc(t,r);return!0}function og(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function lg(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},mn=new yh("app","Firebase",Bg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ii("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw mn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=sg;function bh(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:nl,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw mn.create("bad-app-name",{appName:String(s)});if(t||(t=Eh()),!t)throw mn.create("no-options");const i=Ca.get(s);if(i)if(fa(t,i.options)){if(fa(n,i.config))return i;throw mn.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(n)})}else throw mn.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const a=new fp(s);for(const B of rl.values())a.addComponent(B);const o=new cg(t,n,a);return Ca.set(s,o),o}function hg(r=nl){const e=Ca.get(r);if(!e&&r===nl&&Eh())return bh();if(!e)throw mn.create("no-app",{appName:r});return e}function ts(r,e,t){let n=ig[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${n}" with version "${e}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),bn.warn(a.join(" "));return}pa(new ii(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg="firebase-heartbeat-database",fg=1,ai="firebase-heartbeat-store";let Vo=null;function Ih(){return Vo||(Vo=Tp(dg,fg,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ai)}catch(t){console.warn(t)}}}}).catch(r=>{throw mn.create("idb-open",{originalErrorMessage:r.message})})),Vo}async function Cg(r){try{const t=(await Ih()).transaction(ai),n=await t.objectStore(ai).get(Th(r));return await t.done,n}catch(e){if(e instanceof ds)bn.warn(e.message);else{const t=mn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});bn.warn(t.message)}}}async function Vc(r,e){try{const n=(await Ih()).transaction(ai,"readwrite");await n.objectStore(ai).put(e,Th(r)),await n.done}catch(t){if(t instanceof ds)bn.warn(t.message);else{const n=mn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});bn.warn(n.message)}}}function Th(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg=1024,gg=30;class mg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new yg(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Gc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>gg){const a=wg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){bn.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Gc(),{heartbeatsToSend:n,unsentEntries:s}=Eg(this._heartbeatsCache.heartbeats),i=da(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return bn.warn(t),""}}}function Gc(){return new Date().toISOString().substring(0,10)}function Eg(r,e=pg){const t=[];let n=r.slice();for(const s of r){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Hc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Hc(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class yg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ap()?op().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Cg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Vc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Vc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Hc(r){return da(JSON.stringify({version:2,heartbeats:r})).length}function wg(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dg(r){pa(new ii("platform-logger",e=>new Pp(e),"PRIVATE")),pa(new ii("heartbeat",e=>new mg(e),"PRIVATE")),ts(tl,kc,r),ts(tl,kc,"esm2020"),ts("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Dg("");var vg="firebase",_g="12.17.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ts(vg,_g,"app");var Uc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Un,Sh;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,E){function y(){}y.prototype=E.prototype,_.F=E.prototype,_.prototype=new y,_.prototype.constructor=_,_.D=function(b,T,R){for(var v=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)v[ae-2]=arguments[ae];return E.prototype[T].apply(b,v)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,E,y){y||(y=0);const b=Array(16);if(typeof E=="string")for(var T=0;T<16;++T)b[T]=E.charCodeAt(y++)|E.charCodeAt(y++)<<8|E.charCodeAt(y++)<<16|E.charCodeAt(y++)<<24;else for(T=0;T<16;++T)b[T]=E[y++]|E[y++]<<8|E[y++]<<16|E[y++]<<24;E=_.g[0],y=_.g[1],T=_.g[2];let R=_.g[3],v;v=E+(R^y&(T^R))+b[0]+3614090360&4294967295,E=y+(v<<7&4294967295|v>>>25),v=R+(T^E&(y^T))+b[1]+3905402710&4294967295,R=E+(v<<12&4294967295|v>>>20),v=T+(y^R&(E^y))+b[2]+606105819&4294967295,T=R+(v<<17&4294967295|v>>>15),v=y+(E^T&(R^E))+b[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(R^y&(T^R))+b[4]+4118548399&4294967295,E=y+(v<<7&4294967295|v>>>25),v=R+(T^E&(y^T))+b[5]+1200080426&4294967295,R=E+(v<<12&4294967295|v>>>20),v=T+(y^R&(E^y))+b[6]+2821735955&4294967295,T=R+(v<<17&4294967295|v>>>15),v=y+(E^T&(R^E))+b[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(R^y&(T^R))+b[8]+1770035416&4294967295,E=y+(v<<7&4294967295|v>>>25),v=R+(T^E&(y^T))+b[9]+2336552879&4294967295,R=E+(v<<12&4294967295|v>>>20),v=T+(y^R&(E^y))+b[10]+4294925233&4294967295,T=R+(v<<17&4294967295|v>>>15),v=y+(E^T&(R^E))+b[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(R^y&(T^R))+b[12]+1804603682&4294967295,E=y+(v<<7&4294967295|v>>>25),v=R+(T^E&(y^T))+b[13]+4254626195&4294967295,R=E+(v<<12&4294967295|v>>>20),v=T+(y^R&(E^y))+b[14]+2792965006&4294967295,T=R+(v<<17&4294967295|v>>>15),v=y+(E^T&(R^E))+b[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=E+(T^R&(y^T))+b[1]+4129170786&4294967295,E=y+(v<<5&4294967295|v>>>27),v=R+(y^T&(E^y))+b[6]+3225465664&4294967295,R=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(R^E))+b[11]+643717713&4294967295,T=R+(v<<14&4294967295|v>>>18),v=y+(R^E&(T^R))+b[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(T^R&(y^T))+b[5]+3593408605&4294967295,E=y+(v<<5&4294967295|v>>>27),v=R+(y^T&(E^y))+b[10]+38016083&4294967295,R=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(R^E))+b[15]+3634488961&4294967295,T=R+(v<<14&4294967295|v>>>18),v=y+(R^E&(T^R))+b[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(T^R&(y^T))+b[9]+568446438&4294967295,E=y+(v<<5&4294967295|v>>>27),v=R+(y^T&(E^y))+b[14]+3275163606&4294967295,R=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(R^E))+b[3]+4107603335&4294967295,T=R+(v<<14&4294967295|v>>>18),v=y+(R^E&(T^R))+b[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(T^R&(y^T))+b[13]+2850285829&4294967295,E=y+(v<<5&4294967295|v>>>27),v=R+(y^T&(E^y))+b[2]+4243563512&4294967295,R=E+(v<<9&4294967295|v>>>23),v=T+(E^y&(R^E))+b[7]+1735328473&4294967295,T=R+(v<<14&4294967295|v>>>18),v=y+(R^E&(T^R))+b[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=E+(y^T^R)+b[5]+4294588738&4294967295,E=y+(v<<4&4294967295|v>>>28),v=R+(E^y^T)+b[8]+2272392833&4294967295,R=E+(v<<11&4294967295|v>>>21),v=T+(R^E^y)+b[11]+1839030562&4294967295,T=R+(v<<16&4294967295|v>>>16),v=y+(T^R^E)+b[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(y^T^R)+b[1]+2763975236&4294967295,E=y+(v<<4&4294967295|v>>>28),v=R+(E^y^T)+b[4]+1272893353&4294967295,R=E+(v<<11&4294967295|v>>>21),v=T+(R^E^y)+b[7]+4139469664&4294967295,T=R+(v<<16&4294967295|v>>>16),v=y+(T^R^E)+b[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(y^T^R)+b[13]+681279174&4294967295,E=y+(v<<4&4294967295|v>>>28),v=R+(E^y^T)+b[0]+3936430074&4294967295,R=E+(v<<11&4294967295|v>>>21),v=T+(R^E^y)+b[3]+3572445317&4294967295,T=R+(v<<16&4294967295|v>>>16),v=y+(T^R^E)+b[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(y^T^R)+b[9]+3654602809&4294967295,E=y+(v<<4&4294967295|v>>>28),v=R+(E^y^T)+b[12]+3873151461&4294967295,R=E+(v<<11&4294967295|v>>>21),v=T+(R^E^y)+b[15]+530742520&4294967295,T=R+(v<<16&4294967295|v>>>16),v=y+(T^R^E)+b[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=E+(T^(y|~R))+b[0]+4096336452&4294967295,E=y+(v<<6&4294967295|v>>>26),v=R+(y^(E|~T))+b[7]+1126891415&4294967295,R=E+(v<<10&4294967295|v>>>22),v=T+(E^(R|~y))+b[14]+2878612391&4294967295,T=R+(v<<15&4294967295|v>>>17),v=y+(R^(T|~E))+b[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=E+(T^(y|~R))+b[12]+1700485571&4294967295,E=y+(v<<6&4294967295|v>>>26),v=R+(y^(E|~T))+b[3]+2399980690&4294967295,R=E+(v<<10&4294967295|v>>>22),v=T+(E^(R|~y))+b[10]+4293915773&4294967295,T=R+(v<<15&4294967295|v>>>17),v=y+(R^(T|~E))+b[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=E+(T^(y|~R))+b[8]+1873313359&4294967295,E=y+(v<<6&4294967295|v>>>26),v=R+(y^(E|~T))+b[15]+4264355552&4294967295,R=E+(v<<10&4294967295|v>>>22),v=T+(E^(R|~y))+b[6]+2734768916&4294967295,T=R+(v<<15&4294967295|v>>>17),v=y+(R^(T|~E))+b[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=E+(T^(y|~R))+b[4]+4149444226&4294967295,E=y+(v<<6&4294967295|v>>>26),v=R+(y^(E|~T))+b[11]+3174756917&4294967295,R=E+(v<<10&4294967295|v>>>22),v=T+(E^(R|~y))+b[2]+718787259&4294967295,T=R+(v<<15&4294967295|v>>>17),v=y+(R^(T|~E))+b[9]+3951481745&4294967295,_.g[0]=_.g[0]+E&4294967295,_.g[1]=_.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,_.g[2]=_.g[2]+T&4294967295,_.g[3]=_.g[3]+R&4294967295}n.prototype.v=function(_,E){E===void 0&&(E=_.length);const y=E-this.blockSize,b=this.C;let T=this.h,R=0;for(;R<E;){if(T==0)for(;R<=y;)s(this,_,R),R+=this.blockSize;if(typeof _=="string"){for(;R<E;)if(b[T++]=_.charCodeAt(R++),T==this.blockSize){s(this,b),T=0;break}}else for(;R<E;)if(b[T++]=_[R++],T==this.blockSize){s(this,b),T=0;break}}this.h=T,this.o+=E},n.prototype.A=function(){var _=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);_[0]=128;for(var E=1;E<_.length-8;++E)_[E]=0;E=this.o*8;for(var y=_.length-8;y<_.length;++y)_[y]=E&255,E/=256;for(this.v(_),_=Array(16),E=0,y=0;y<4;++y)for(let b=0;b<32;b+=8)_[E++]=this.g[y]>>>b&255;return _};function i(_,E){var y=o;return Object.prototype.hasOwnProperty.call(y,_)?y[_]:y[_]=E(_)}function a(_,E){this.h=E;const y=[];let b=!0;for(let T=_.length-1;T>=0;T--){const R=_[T]|0;b&&R==E||(y[T]=R,b=!1)}this.g=y}var o={};function B(_){return-128<=_&&_<128?i(_,function(E){return new a([E|0],E<0?-1:0)}):new a([_|0],_<0?-1:0)}function c(_){if(isNaN(_)||!isFinite(_))return d;if(_<0)return S(c(-_));const E=[];let y=1;for(let b=0;_>=y;b++)E[b]=_/y|0,y*=4294967296;return new a(E,0)}function h(_,E){if(_.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(_.charAt(0)=="-")return S(h(_.substring(1),E));if(_.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=c(Math.pow(E,8));let b=d;for(let R=0;R<_.length;R+=8){var T=Math.min(8,_.length-R);const v=parseInt(_.substring(R,R+T),E);T<8?(T=c(Math.pow(E,T)),b=b.j(T).add(c(v))):(b=b.j(y),b=b.add(c(v)))}return b}var d=B(0),p=B(1),C=B(16777216);r=a.prototype,r.m=function(){if(I(this))return-S(this).m();let _=0,E=1;for(let y=0;y<this.g.length;y++){const b=this.i(y);_+=(b>=0?b:4294967296+b)*E,E*=4294967296}return _},r.toString=function(_){if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(m(this))return"0";if(I(this))return"-"+S(this).toString(_);const E=c(Math.pow(_,6));var y=this;let b="";for(;;){const T=j(y,E).g;y=F(y,T.j(E));let R=((y.g.length>0?y.g[0]:y.h)>>>0).toString(_);if(y=T,m(y))return R+b;for(;R.length<6;)R="0"+R;b=R+b}},r.i=function(_){return _<0?0:_<this.g.length?this.g[_]:this.h};function m(_){if(_.h!=0)return!1;for(let E=0;E<_.g.length;E++)if(_.g[E]!=0)return!1;return!0}function I(_){return _.h==-1}r.l=function(_){return _=F(this,_),I(_)?-1:m(_)?0:1};function S(_){const E=_.g.length,y=[];for(let b=0;b<E;b++)y[b]=~_.g[b];return new a(y,~_.h).add(p)}r.abs=function(){return I(this)?S(this):this},r.add=function(_){const E=Math.max(this.g.length,_.g.length),y=[];let b=0;for(let T=0;T<=E;T++){let R=b+(this.i(T)&65535)+(_.i(T)&65535),v=(R>>>16)+(this.i(T)>>>16)+(_.i(T)>>>16);b=v>>>16,R&=65535,v&=65535,y[T]=v<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function F(_,E){return _.add(S(E))}r.j=function(_){if(m(this)||m(_))return d;if(I(this))return I(_)?S(this).j(S(_)):S(S(this).j(_));if(I(_))return S(this.j(S(_)));if(this.l(C)<0&&_.l(C)<0)return c(this.m()*_.m());const E=this.g.length+_.g.length,y=[];for(var b=0;b<2*E;b++)y[b]=0;for(b=0;b<this.g.length;b++)for(let T=0;T<_.g.length;T++){const R=this.i(b)>>>16,v=this.i(b)&65535,ae=_.i(T)>>>16,Ee=_.i(T)&65535;y[2*b+2*T]+=v*Ee,L(y,2*b+2*T),y[2*b+2*T+1]+=R*Ee,L(y,2*b+2*T+1),y[2*b+2*T+1]+=v*ae,L(y,2*b+2*T+1),y[2*b+2*T+2]+=R*ae,L(y,2*b+2*T+2)}for(_=0;_<E;_++)y[_]=y[2*_+1]<<16|y[2*_];for(_=E;_<2*E;_++)y[_]=0;return new a(y,0)};function L(_,E){for(;(_[E]&65535)!=_[E];)_[E+1]+=_[E]>>>16,_[E]&=65535,E++}function x(_,E){this.g=_,this.h=E}function j(_,E){if(m(E))throw Error("division by zero");if(m(_))return new x(d,d);if(I(_))return E=j(S(_),E),new x(S(E.g),S(E.h));if(I(E))return E=j(_,S(E)),new x(S(E.g),E.h);if(_.g.length>30){if(I(_)||I(E))throw Error("slowDivide_ only works with positive integers.");for(var y=p,b=E;b.l(_)<=0;)y=q(y),b=q(b);var T=W(y,1),R=W(b,1);for(b=W(b,2),y=W(y,2);!m(b);){var v=R.add(b);v.l(_)<=0&&(T=T.add(y),R=v),b=W(b,1),y=W(y,1)}return E=F(_,T.j(E)),new x(T,E)}for(T=d;_.l(E)>=0;){for(y=Math.max(1,Math.floor(_.m()/E.m())),b=Math.ceil(Math.log(y)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),R=c(y),v=R.j(E);I(v)||v.l(_)>0;)y-=b,R=c(y),v=R.j(E);m(R)&&(R=p),T=T.add(R),_=F(_,v)}return new x(T,_)}r.B=function(_){return j(this,_).h},r.and=function(_){const E=Math.max(this.g.length,_.g.length),y=[];for(let b=0;b<E;b++)y[b]=this.i(b)&_.i(b);return new a(y,this.h&_.h)},r.or=function(_){const E=Math.max(this.g.length,_.g.length),y=[];for(let b=0;b<E;b++)y[b]=this.i(b)|_.i(b);return new a(y,this.h|_.h)},r.xor=function(_){const E=Math.max(this.g.length,_.g.length),y=[];for(let b=0;b<E;b++)y[b]=this.i(b)^_.i(b);return new a(y,this.h^_.h)};function q(_){const E=_.g.length+1,y=[];for(let b=0;b<E;b++)y[b]=_.i(b)<<1|_.i(b-1)>>>31;return new a(y,_.h)}function W(_,E){const y=E>>5;E%=32;const b=_.g.length-y,T=[];for(let R=0;R<b;R++)T[R]=E>0?_.i(R+y)>>>E|_.i(R+y+1)<<32-E:_.i(R+y);return new a(T,_.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Sh=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=c,a.fromString=h,Un=a}).apply(typeof Uc<"u"?Uc:typeof self<"u"?self:typeof window<"u"?window:{});var qi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ah,Js,Ph,sa,sl,Rh,Fh,Nh;(function(){var r,e=Object.defineProperty;function t(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof qi=="object"&&qi];for(var u=0;u<l.length;++u){var f=l[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var n=t(this);function s(l,u){if(u)e:{var f=n;l=l.split(".");for(var g=0;g<l.length-1;g++){var N=l[g];if(!(N in f))break e;f=f[N]}l=l[l.length-1],g=f[l],u=u(g),u!=g&&u!=null&&e(f,l,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(l){return l||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(l){return l||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(l){return l||function(u){var f=[],g;for(g in u)Object.prototype.hasOwnProperty.call(u,g)&&f.push([g,u[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function o(l){var u=typeof l;return u=="object"&&l!=null||u=="function"}function B(l,u,f){return l.call.apply(l.bind,arguments)}function c(l,u,f){return c=B,c.apply(null,arguments)}function h(l,u){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),l.apply(this,g)}}function d(l,u){function f(){}f.prototype=u.prototype,l.Z=u.prototype,l.prototype=new f,l.prototype.constructor=l,l.Ob=function(g,N,O){for(var K=Array(arguments.length-2),ue=2;ue<arguments.length;ue++)K[ue-2]=arguments[ue];return u.prototype[N].apply(g,K)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?l=>l&&AsyncContext.Snapshot.wrap(l):l=>l;function C(l){const u=l.length;if(u>0){const f=Array(u);for(let g=0;g<u;g++)f[g]=l[g];return f}return[]}function m(l,u){for(let g=1;g<arguments.length;g++){const N=arguments[g];var f=typeof N;if(f=f!="object"?f:N?Array.isArray(N)?"array":f:"null",f=="array"||f=="object"&&typeof N.length=="number"){f=l.length||0;const O=N.length||0;l.length=f+O;for(let K=0;K<O;K++)l[f+K]=N[K]}else l.push(N)}}class I{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function S(l){a.setTimeout(()=>{throw l},0)}function F(){var l=_;let u=null;return l.g&&(u=l.g,l.g=l.g.next,l.g||(l.h=null),u.next=null),u}class L{constructor(){this.h=this.g=null}add(u,f){const g=x.get();g.set(u,f),this.h?this.h.next=g:this.g=g,this.h=g}}var x=new I(()=>new j,l=>l.reset());class j{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let q,W=!1,_=new L,E=()=>{const l=Promise.resolve(void 0);q=()=>{l.then(y)}};function y(){for(var l;l=F();){try{l.h.call(l.g)}catch(f){S(f)}var u=x;u.j(l),u.h<100&&(u.h++,l.next=u.g,u.g=l)}W=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(l,u){this.type=l,this.g=this.target=u,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var l=!1,u=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const f=()=>{};a.addEventListener("test",f,u),a.removeEventListener("test",f,u)}catch{}return l}();function v(l){return/^[\s\xa0]*$/.test(l)}function ae(l,u){T.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l&&this.init(l,u)}d(ae,T),ae.prototype.init=function(l,u){const f=this.type=l.type,g=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;this.target=l.target||l.srcElement,this.g=u,u=l.relatedTarget,u||(f=="mouseover"?u=l.fromElement:f=="mouseout"&&(u=l.toElement)),this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=l.pointerType,this.state=l.state,this.i=l,l.defaultPrevented&&ae.Z.h.call(this)},ae.prototype.h=function(){ae.Z.h.call(this);const l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var Ee="closure_listenable_"+(Math.random()*1e6|0),Le=0;function Ze(l,u,f,g,N){this.listener=l,this.proxy=null,this.src=u,this.type=f,this.capture=!!g,this.ha=N,this.key=++Le,this.da=this.fa=!1}function gt(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function Bt(l,u,f){for(const g in l)u.call(f,l[g],g,l)}function en(l,u){for(const f in l)u.call(void 0,l[f],f,l)}function Ht(l){const u={};for(const f in l)u[f]=l[f];return u}const ar="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function or(l,u){let f,g;for(let N=1;N<arguments.length;N++){g=arguments[N];for(f in g)l[f]=g[f];for(let O=0;O<ar.length;O++)f=ar[O],Object.prototype.hasOwnProperty.call(g,f)&&(l[f]=g[f])}}function lr(l){this.src=l,this.g={},this.h=0}lr.prototype.add=function(l,u,f,g,N){const O=l.toString();l=this.g[O],l||(l=this.g[O]=[],this.h++);const K=Hr(l,u,g,N);return K>-1?(u=l[K],f||(u.fa=!1)):(u=new Ze(u,this.src,O,!!g,N),u.fa=f,l.push(u)),u};function Gr(l,u){const f=u.type;if(f in l.g){var g=l.g[f],N=Array.prototype.indexOf.call(g,u,void 0),O;(O=N>=0)&&Array.prototype.splice.call(g,N,1),O&&(gt(u),l.g[f].length==0&&(delete l.g[f],l.h--))}}function Hr(l,u,f,g){for(let N=0;N<l.length;++N){const O=l[N];if(!O.da&&O.listener==u&&O.capture==!!f&&O.ha==g)return N}return-1}var Ur="closure_lm_"+(Math.random()*1e6|0),Co={};function xB(l,u,f,g,N){if(Array.isArray(u)){for(let O=0;O<u.length;O++)xB(l,u[O],f,g,N);return null}return f=kB(f),l&&l[Ee]?l.J(u,f,o(g)?!!g.capture:!1,N):dC(l,u,f,!1,g,N)}function dC(l,u,f,g,N,O){if(!u)throw Error("Invalid event type");const K=o(N)?!!N.capture:!!N;let ue=go(l);if(ue||(l[Ur]=ue=new lr(l)),f=ue.add(u,f,g,K,O),f.proxy)return f;if(g=fC(),f.proxy=g,g.src=l,g.listener=f,l.addEventListener)R||(N=K),N===void 0&&(N=!1),l.addEventListener(u.toString(),g,N);else if(l.attachEvent)l.attachEvent(LB(u.toString()),g);else if(l.addListener&&l.removeListener)l.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function fC(){function l(f){return u.call(l.src,l.listener,f)}const u=CC;return l}function OB(l,u,f,g,N){if(Array.isArray(u))for(var O=0;O<u.length;O++)OB(l,u[O],f,g,N);else g=o(g)?!!g.capture:!!g,f=kB(f),l&&l[Ee]?(l=l.i,O=String(u).toString(),O in l.g&&(u=l.g[O],f=Hr(u,f,g,N),f>-1&&(gt(u[f]),Array.prototype.splice.call(u,f,1),u.length==0&&(delete l.g[O],l.h--)))):l&&(l=go(l))&&(u=l.g[u.toString()],l=-1,u&&(l=Hr(u,f,g,N)),(f=l>-1?u[l]:null)&&po(f))}function po(l){if(typeof l!="number"&&l&&!l.da){var u=l.src;if(u&&u[Ee])Gr(u.i,l);else{var f=l.type,g=l.proxy;u.removeEventListener?u.removeEventListener(f,g,l.capture):u.detachEvent?u.detachEvent(LB(f),g):u.addListener&&u.removeListener&&u.removeListener(g),(f=go(u))?(Gr(f,l),f.h==0&&(f.src=null,u[Ur]=null)):gt(l)}}}function LB(l){return l in Co?Co[l]:Co[l]="on"+l}function CC(l,u){if(l.da)l=!0;else{u=new ae(u,this);const f=l.listener,g=l.ha||l.src;l.fa&&po(l),l=f.call(g,u)}return l}function go(l){return l=l[Ur],l instanceof lr?l:null}var mo="__closure_events_fn_"+(Math.random()*1e9>>>0);function kB(l){return typeof l=="function"?l:(l[mo]||(l[mo]=function(u){return l.handleEvent(u)}),l[mo])}function rt(){b.call(this),this.i=new lr(this),this.M=this,this.G=null}d(rt,b),rt.prototype[Ee]=!0,rt.prototype.removeEventListener=function(l,u,f,g){OB(this,l,u,f,g)};function ct(l,u){var f,g=l.G;if(g)for(f=[];g;g=g.G)f.push(g);if(l=l.M,g=u.type||u,typeof u=="string")u=new T(u,l);else if(u instanceof T)u.target=u.target||l;else{var N=u;u=new T(g,l),or(u,N)}N=!0;let O,K;if(f)for(K=f.length-1;K>=0;K--)O=u.g=f[K],N=xi(O,g,!0,u)&&N;if(O=u.g=l,N=xi(O,g,!0,u)&&N,N=xi(O,g,!1,u)&&N,f)for(K=0;K<f.length;K++)O=u.g=f[K],N=xi(O,g,!1,u)&&N}rt.prototype.N=function(){if(rt.Z.N.call(this),this.i){var l=this.i;for(const u in l.g){const f=l.g[u];for(let g=0;g<f.length;g++)gt(f[g]);delete l.g[u],l.h--}}this.G=null},rt.prototype.J=function(l,u,f,g){return this.i.add(String(l),u,!1,f,g)},rt.prototype.K=function(l,u,f,g){return this.i.add(String(l),u,!0,f,g)};function xi(l,u,f,g){if(u=l.i.g[String(u)],!u)return!0;u=u.concat();let N=!0;for(let O=0;O<u.length;++O){const K=u[O];if(K&&!K.da&&K.capture==f){const ue=K.listener,Je=K.ha||K.src;K.fa&&Gr(l.i,K),N=ue.call(Je,g)!==!1&&N}}return N&&!g.defaultPrevented}function pC(l,u){if(typeof l!="function")if(l&&typeof l.handleEvent=="function")l=c(l.handleEvent,l);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(l,u||0)}function MB(l){l.g=pC(()=>{l.g=null,l.i&&(l.i=!1,MB(l))},l.l);const u=l.h;l.h=null,l.m.apply(null,u)}class gC extends b{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:MB(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Is(l){b.call(this),this.h=l,this.g={}}d(Is,b);var VB=[];function GB(l){Bt(l.g,function(u,f){this.g.hasOwnProperty(f)&&po(u)},l),l.g={}}Is.prototype.N=function(){Is.Z.N.call(this),GB(this)},Is.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Eo=a.JSON.stringify,mC=a.JSON.parse,EC=class{stringify(l){return a.JSON.stringify(l,void 0)}parse(l){return a.JSON.parse(l,void 0)}};function HB(){}function UB(){}var Ts={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function yo(){T.call(this,"d")}d(yo,T);function wo(){T.call(this,"c")}d(wo,T);var Br={},jB=null;function Oi(){return jB=jB||new rt}Br.Ia="serverreachability";function $B(l){T.call(this,Br.Ia,l)}d($B,T);function Ss(l){const u=Oi();ct(u,new $B(u))}Br.STAT_EVENT="statevent";function JB(l,u){T.call(this,Br.STAT_EVENT,l),this.stat=u}d(JB,T);function ut(l){const u=Oi();ct(u,new JB(u,l))}Br.Ja="timingevent";function qB(l,u){T.call(this,Br.Ja,l),this.size=u}d(qB,T);function As(l,u){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){l()},u)}function Ps(){this.g=!0}Ps.prototype.ua=function(){this.g=!1};function yC(l,u,f,g,N,O){l.info(function(){if(l.g)if(O){var K="",ue=O.split("&");for(let _e=0;_e<ue.length;_e++){var Je=ue[_e].split("=");if(Je.length>1){const We=Je[0];Je=Je[1];const nn=We.split("_");K=nn.length>=2&&nn[1]=="type"?K+(We+"="+Je+"&"):K+(We+"=redacted&")}}}else K=null;else K=O;return"XMLHTTP REQ ("+g+") [attempt "+N+"]: "+u+`
`+f+`
`+K})}function wC(l,u,f,g,N,O,K){l.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+N+"]: "+u+`
`+f+`
`+O+" "+K})}function jr(l,u,f,g){l.info(function(){return"XMLHTTP TEXT ("+u+"): "+vC(l,f)+(g?" "+g:"")})}function DC(l,u){l.info(function(){return"TIMEOUT: "+u})}Ps.prototype.info=function(){};function vC(l,u){if(!l.g)return u;if(!u)return null;try{const O=JSON.parse(u);if(O){for(l=0;l<O.length;l++)if(Array.isArray(O[l])){var f=O[l];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var N=g[0];if(N!="noop"&&N!="stop"&&N!="close")for(let K=1;K<g.length;K++)g[K]=""}}}}return Eo(O)}catch{return u}}var Li={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},zB={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},KB;function Do(){}d(Do,HB),Do.prototype.g=function(){return new XMLHttpRequest},KB=new Do;function Rs(l){return encodeURIComponent(String(l))}function _C(l){var u=1;l=l.split(":");const f=[];for(;u>0&&l.length;)f.push(l.shift()),u--;return l.length&&f.push(l.join(":")),f}function An(l,u,f,g){this.j=l,this.i=u,this.l=f,this.S=g||1,this.V=new Is(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new QB}function QB(){this.i=null,this.g="",this.h=!1}var WB={},vo={};function _o(l,u,f){l.M=1,l.A=Mi(tn(u)),l.u=f,l.R=!0,YB(l,null)}function YB(l,u){l.F=Date.now(),ki(l),l.B=tn(l.A);var f=l.B,g=l.S;Array.isArray(g)||(g=[String(g)]),cc(f.i,"t",g),l.C=0,f=l.j.L,l.h=new QB,l.g=Sc(l.j,f?u:null,!l.u),l.P>0&&(l.O=new gC(c(l.Y,l,l.g),l.P)),u=l.V,f=l.g,g=l.ba;var N="readystatechange";Array.isArray(N)||(N&&(VB[0]=N.toString()),N=VB);for(let O=0;O<N.length;O++){const K=xB(f,N[O],g||u.handleEvent,!1,u.h||u);if(!K)break;u.g[K.key]=K}u=l.J?Ht(l.J):{},l.u?(l.v||(l.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.B,l.v,l.u,u)):(l.v="GET",l.g.ea(l.B,l.v,null,u)),Ss(),yC(l.i,l.v,l.B,l.l,l.S,l.u)}An.prototype.ba=function(l){l=l.target;const u=this.O;u&&Fn(l)==3?u.j():this.Y(l)},An.prototype.Y=function(l){try{if(l==this.g)e:{const ue=Fn(this.g),Je=this.g.ya(),_e=this.g.ca();if(!(ue<3)&&(ue!=3||this.g&&(this.h.h||this.g.la()||gc(this.g)))){this.K||ue!=4||Je==7||(Je==8||_e<=0?Ss(3):Ss(2)),bo(this);var u=this.g.ca();this.X=u;var f=bC(this);if(this.o=u==200,wC(this.i,this.v,this.B,this.l,this.S,ue,u),this.o){if(this.U&&!this.L){t:{if(this.g){var g,N=this.g;if((g=N.g?N.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(g)){var O=g;break t}}O=null}if(l=O)jr(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Io(this,l);else{this.o=!1,this.m=3,ut(12),cr(this),Fs(this);break e}}if(this.R){l=!0;let We;for(;!this.K&&this.C<f.length;)if(We=IC(this,f),We==vo){ue==4&&(this.m=4,ut(14),l=!1),jr(this.i,this.l,null,"[Incomplete Response]");break}else if(We==WB){this.m=4,ut(15),jr(this.i,this.l,f,"[Invalid Chunk]"),l=!1;break}else jr(this.i,this.l,We,null),Io(this,We);if(XB(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ue!=4||f.length!=0||this.h.h||(this.m=1,ut(16),l=!1),this.o=this.o&&l,!l)jr(this.i,this.l,f,"[Invalid Chunked Response]"),cr(this),Fs(this);else if(f.length>0&&!this.W){this.W=!0;var K=this.j;K.g==this&&K.aa&&!K.P&&(K.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),xo(K),K.P=!0,ut(11))}}else jr(this.i,this.l,f,null),Io(this,f);ue==4&&cr(this),this.o&&!this.K&&(ue==4?_c(this.j,this):(this.o=!1,ki(this)))}else GC(this.g),u==400&&f.indexOf("Unknown SID")>0?(this.m=3,ut(12)):(this.m=0,ut(13)),cr(this),Fs(this)}}}catch{}finally{}};function bC(l){if(!XB(l))return l.g.la();const u=gc(l.g);if(u==="")return"";let f="";const g=u.length,N=Fn(l.g)==4;if(!l.h.i){if(typeof TextDecoder>"u")return cr(l),Fs(l),"";l.h.i=new a.TextDecoder}for(let O=0;O<g;O++)l.h.h=!0,f+=l.h.i.decode(u[O],{stream:!(N&&O==g-1)});return u.length=0,l.h.g+=f,l.C=0,l.h.g}function XB(l){return l.g?l.v=="GET"&&l.M!=2&&l.j.Aa:!1}function IC(l,u){var f=l.C,g=u.indexOf(`
`,f);return g==-1?vo:(f=Number(u.substring(f,g)),isNaN(f)?WB:(g+=1,g+f>u.length?vo:(u=u.slice(g,g+f),l.C=g+f,u)))}An.prototype.cancel=function(){this.K=!0,cr(this)};function ki(l){l.T=Date.now()+l.H,ZB(l,l.H)}function ZB(l,u){if(l.D!=null)throw Error("WatchDog timer not null");l.D=As(c(l.aa,l),u)}function bo(l){l.D&&(a.clearTimeout(l.D),l.D=null)}An.prototype.aa=function(){this.D=null;const l=Date.now();l-this.T>=0?(DC(this.i,this.B),this.M!=2&&(Ss(),ut(17)),cr(this),this.m=2,Fs(this)):ZB(this,this.T-l)};function Fs(l){l.j.I==0||l.K||_c(l.j,l)}function cr(l){bo(l);var u=l.O;u&&typeof u.dispose=="function"&&u.dispose(),l.O=null,GB(l.V),l.g&&(u=l.g,l.g=null,u.abort(),u.dispose())}function Io(l,u){try{var f=l.j;if(f.I!=0&&(f.g==l||To(f.h,l))){if(!l.L&&To(f.h,l)&&f.I==3){try{var g=f.Ba.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var N=g;if(N[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<l.F)ji(f),Hi(f);else break e;No(f),ut(18)}}else f.xa=N[1],0<f.xa-f.K&&N[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=As(c(f.Va,f),6e3));nc(f.h)<=1&&f.ta&&(f.ta=void 0)}else hr(f,11)}else if((l.L||f.g==l)&&ji(f),!v(u))for(N=f.Ba.g.parse(u),u=0;u<N.length;u++){let _e=N[u];const We=_e[0];if(!(We<=f.K))if(f.K=We,_e=_e[1],f.I==2)if(_e[0]=="c"){f.M=_e[1],f.ba=_e[2];const nn=_e[3];nn!=null&&(f.ka=nn,f.j.info("VER="+f.ka));const dr=_e[4];dr!=null&&(f.za=dr,f.j.info("SVER="+f.za));const Nn=_e[5];Nn!=null&&typeof Nn=="number"&&Nn>0&&(g=1.5*Nn,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const xn=l.g;if(xn){const Ji=xn.g?xn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ji){var O=g.h;O.g||Ji.indexOf("spdy")==-1&&Ji.indexOf("quic")==-1&&Ji.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(So(O,O.h),O.h=null))}if(g.G){const Oo=xn.g?xn.g.getResponseHeader("X-HTTP-Session-Id"):null;Oo&&(g.wa=Oo,Se(g.J,g.G,Oo))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-l.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var K=l;if(g.na=Tc(g,g.L?g.ba:null,g.W),K.L){rc(g.h,K);var ue=K,Je=g.O;Je&&(ue.H=Je),ue.D&&(bo(ue),ki(ue)),g.g=K}else Dc(g);f.i.length>0&&Ui(f)}else _e[0]!="stop"&&_e[0]!="close"||hr(f,7);else f.I==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?hr(f,7):Fo(f):_e[0]!="noop"&&f.l&&f.l.qa(_e),f.A=0)}}Ss(4)}catch{}}var TC=class{constructor(l,u){this.g=l,this.map=u}};function ec(l){this.l=l||10,a.PerformanceNavigationTiming?(l=a.performance.getEntriesByType("navigation"),l=l.length>0&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function tc(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function nc(l){return l.h?1:l.g?l.g.size:0}function To(l,u){return l.h?l.h==u:l.g?l.g.has(u):!1}function So(l,u){l.g?l.g.add(u):l.h=u}function rc(l,u){l.h&&l.h==u?l.h=null:l.g&&l.g.has(u)&&l.g.delete(u)}ec.prototype.cancel=function(){if(this.i=sc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function sc(l){if(l.h!=null)return l.i.concat(l.h.G);if(l.g!=null&&l.g.size!==0){let u=l.i;for(const f of l.g.values())u=u.concat(f.G);return u}return C(l.i)}var ic=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function SC(l,u){if(l){l=l.split("&");for(let f=0;f<l.length;f++){const g=l[f].indexOf("=");let N,O=null;g>=0?(N=l[f].substring(0,g),O=l[f].substring(g+1)):N=l[f],u(N,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Pn(l){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;l instanceof Pn?(this.l=l.l,Ns(this,l.j),this.o=l.o,this.g=l.g,xs(this,l.u),this.h=l.h,Ao(this,uc(l.i)),this.m=l.m):l&&(u=String(l).match(ic))?(this.l=!1,Ns(this,u[1]||"",!0),this.o=Os(u[2]||""),this.g=Os(u[3]||"",!0),xs(this,u[4]),this.h=Os(u[5]||"",!0),Ao(this,u[6]||"",!0),this.m=Os(u[7]||"")):(this.l=!1,this.i=new ks(null,this.l))}Pn.prototype.toString=function(){const l=[];var u=this.j;u&&l.push(Ls(u,ac,!0),":");var f=this.g;return(f||u=="file")&&(l.push("//"),(u=this.o)&&l.push(Ls(u,ac,!0),"@"),l.push(Rs(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&l.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&l.push("/"),l.push(Ls(f,f.charAt(0)=="/"?RC:PC,!0))),(f=this.i.toString())&&l.push("?",f),(f=this.m)&&l.push("#",Ls(f,NC)),l.join("")},Pn.prototype.resolve=function(l){const u=tn(this);let f=!!l.j;f?Ns(u,l.j):f=!!l.o,f?u.o=l.o:f=!!l.g,f?u.g=l.g:f=l.u!=null;var g=l.h;if(f)xs(u,l.u);else if(f=!!l.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var N=u.h.lastIndexOf("/");N!=-1&&(g=u.h.slice(0,N+1)+g)}if(N=g,N==".."||N==".")g="";else if(N.indexOf("./")!=-1||N.indexOf("/.")!=-1){g=N.lastIndexOf("/",0)==0,N=N.split("/");const O=[];for(let K=0;K<N.length;){const ue=N[K++];ue=="."?g&&K==N.length&&O.push(""):ue==".."?((O.length>1||O.length==1&&O[0]!="")&&O.pop(),g&&K==N.length&&O.push("")):(O.push(ue),g=!0)}g=O.join("/")}else g=N}return f?u.h=g:f=l.i.toString()!=="",f?Ao(u,uc(l.i)):f=!!l.m,f&&(u.m=l.m),u};function tn(l){return new Pn(l)}function Ns(l,u,f){l.j=f?Os(u,!0):u,l.j&&(l.j=l.j.replace(/:$/,""))}function xs(l,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);l.u=u}else l.u=null}function Ao(l,u,f){u instanceof ks?(l.i=u,xC(l.i,l.l)):(f||(u=Ls(u,FC)),l.i=new ks(u,l.l))}function Se(l,u,f){l.i.set(u,f)}function Mi(l){return Se(l,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),l}function Os(l,u){return l?u?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function Ls(l,u,f){return typeof l=="string"?(l=encodeURI(l).replace(u,AC),f&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function AC(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var ac=/[#\/\?@]/g,PC=/[#\?:]/g,RC=/[#\?]/g,FC=/[#\?@]/g,NC=/#/g;function ks(l,u){this.h=this.g=null,this.i=l||null,this.j=!!u}function ur(l){l.g||(l.g=new Map,l.h=0,l.i&&SC(l.i,function(u,f){l.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}r=ks.prototype,r.add=function(l,u){ur(this),this.i=null,l=$r(this,l);let f=this.g.get(l);return f||this.g.set(l,f=[]),f.push(u),this.h+=1,this};function oc(l,u){ur(l),u=$r(l,u),l.g.has(u)&&(l.i=null,l.h-=l.g.get(u).length,l.g.delete(u))}function lc(l,u){return ur(l),u=$r(l,u),l.g.has(u)}r.forEach=function(l,u){ur(this),this.g.forEach(function(f,g){f.forEach(function(N){l.call(u,N,g,this)},this)},this)};function Bc(l,u){ur(l);let f=[];if(typeof u=="string")lc(l,u)&&(f=f.concat(l.g.get($r(l,u))));else for(l=Array.from(l.g.values()),u=0;u<l.length;u++)f=f.concat(l[u]);return f}r.set=function(l,u){return ur(this),this.i=null,l=$r(this,l),lc(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[u]),this.h+=1,this},r.get=function(l,u){return l?(l=Bc(this,l),l.length>0?String(l[0]):u):u};function cc(l,u,f){oc(l,u),f.length>0&&(l.i=null,l.g.set($r(l,u),C(f)),l.h+=f.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],u=Array.from(this.g.keys());for(let g=0;g<u.length;g++){var f=u[g];const N=Rs(f);f=Bc(this,f);for(let O=0;O<f.length;O++){let K=N;f[O]!==""&&(K+="="+Rs(f[O])),l.push(K)}}return this.i=l.join("&")};function uc(l){const u=new ks;return u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),u}function $r(l,u){return u=String(u),l.j&&(u=u.toLowerCase()),u}function xC(l,u){u&&!l.j&&(ur(l),l.i=null,l.g.forEach(function(f,g){const N=g.toLowerCase();g!=N&&(oc(this,g),cc(this,N,f))},l)),l.j=u}function OC(l,u){const f=new Ps;if(a.Image){const g=new Image;g.onload=h(Rn,f,"TestLoadImage: loaded",!0,u,g),g.onerror=h(Rn,f,"TestLoadImage: error",!1,u,g),g.onabort=h(Rn,f,"TestLoadImage: abort",!1,u,g),g.ontimeout=h(Rn,f,"TestLoadImage: timeout",!1,u,g),a.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=l}else u(!1)}function LC(l,u){const f=new Ps,g=new AbortController,N=setTimeout(()=>{g.abort(),Rn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(l,{signal:g.signal}).then(O=>{clearTimeout(N),O.ok?Rn(f,"TestPingServer: ok",!0,u):Rn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(N),Rn(f,"TestPingServer: error",!1,u)})}function Rn(l,u,f,g,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),g(f)}catch{}}function kC(){this.g=new EC}function Po(l){this.i=l.Sb||null,this.h=l.ab||!1}d(Po,HB),Po.prototype.g=function(){return new Vi(this.i,this.h)};function Vi(l,u){rt.call(this),this.H=l,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}d(Vi,rt),r=Vi.prototype,r.open=function(l,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=l,this.D=u,this.readyState=1,Vs(this)},r.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};l&&(u.body=l),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ms(this)),this.readyState=0},r.Pa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,Vs(this)),this.g&&(this.readyState=3,Vs(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;hc(this)}else l.text().then(this.Oa.bind(this),this.ga.bind(this))};function hc(l){l.j.read().then(l.Ma.bind(l)).catch(l.ga.bind(l))}r.Ma=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var u=l.value?l.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!l.done}))&&(this.response=this.responseText+=u)}l.done?Ms(this):Vs(this),this.readyState==3&&hc(this)}},r.Oa=function(l){this.g&&(this.response=this.responseText=l,Ms(this))},r.Na=function(l){this.g&&(this.response=l,Ms(this))},r.ga=function(){this.g&&Ms(this)};function Ms(l){l.readyState=4,l.l=null,l.j=null,l.B=null,Vs(l)}r.setRequestHeader=function(l,u){this.A.append(l,u)},r.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,l.push(f[0]+": "+f[1]),f=u.next();return l.join(`\r
`)};function Vs(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Vi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function dc(l){let u="";return Bt(l,function(f,g){u+=g,u+=":",u+=f,u+=`\r
`}),u}function Ro(l,u,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=dc(f),typeof l=="string"?f!=null&&Rs(f):Se(l,u,f))}function Oe(l){rt.call(this),this.headers=new Map,this.L=l||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}d(Oe,rt);var MC=/^https?$/i,VC=["POST","PUT"];r=Oe.prototype,r.Fa=function(l){this.H=l},r.ea=function(l,u,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);u=u?u.toUpperCase():"GET",this.D=l,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():KB.g(),this.g.onreadystatechange=p(c(this.Ca,this));try{this.B=!0,this.g.open(u,String(l),!0),this.B=!1}catch(O){fc(this,O);return}if(l=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var N in g)f.set(N,g[N]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const O of g.keys())f.set(O,g.get(O));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(O=>O.toLowerCase()=="content-type"),N=a.FormData&&l instanceof a.FormData,!(Array.prototype.indexOf.call(VC,u,void 0)>=0)||g||N||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,K]of f)this.g.setRequestHeader(O,K);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(l),this.v=!1}catch(O){fc(this,O)}};function fc(l,u){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=u,l.o=5,Cc(l),Gi(l)}function Cc(l){l.A||(l.A=!0,ct(l,"complete"),ct(l,"error"))}r.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=l||7,ct(this,"complete"),ct(this,"abort"),Gi(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gi(this,!0)),Oe.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?pc(this):this.Xa())},r.Xa=function(){pc(this)};function pc(l){if(l.h&&typeof i<"u"){if(l.v&&Fn(l)==4)setTimeout(l.Ca.bind(l),0);else if(ct(l,"readystatechange"),Fn(l)==4){l.h=!1;try{const O=l.ca();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var g;if(g=O===0){let K=String(l.D).match(ic)[1]||null;!K&&a.self&&a.self.location&&(K=a.self.location.protocol.slice(0,-1)),g=!MC.test(K?K.toLowerCase():"")}f=g}if(f)ct(l,"complete"),ct(l,"success");else{l.o=6;try{var N=Fn(l)>2?l.g.statusText:""}catch{N=""}l.l=N+" ["+l.ca()+"]",Cc(l)}}finally{Gi(l)}}}}function Gi(l,u){if(l.g){l.m&&(clearTimeout(l.m),l.m=null);const f=l.g;l.g=null,u||ct(l,"ready");try{f.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function Fn(l){return l.g?l.g.readyState:0}r.ca=function(){try{return Fn(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(l){if(this.g){var u=this.g.responseText;return l&&u.indexOf(l)==0&&(u=u.substring(l.length)),mC(u)}};function gc(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.F){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function GC(l){const u={};l=(l.g&&Fn(l)>=2&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<l.length;g++){if(v(l[g]))continue;var f=_C(l[g]);const N=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const O=u[N]||[];u[N]=O,O.push(f)}en(u,function(g){return g.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Gs(l,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[l]||u}function mc(l){this.za=0,this.i=[],this.j=new Ps,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Gs("failFast",!1,l),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Gs("baseRetryDelayMs",5e3,l),this.Za=Gs("retryDelaySeedMs",1e4,l),this.Ta=Gs("forwardChannelMaxRetries",2,l),this.va=Gs("forwardChannelRequestTimeoutMs",2e4,l),this.ma=l&&l.xmlHttpFactory||void 0,this.Ua=l&&l.Rb||void 0,this.Aa=l&&l.useFetchStreams||!1,this.O=void 0,this.L=l&&l.supportsCrossDomainXhr||!1,this.M="",this.h=new ec(l&&l.concurrentRequestLimit),this.Ba=new kC,this.S=l&&l.fastHandshake||!1,this.R=l&&l.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=l&&l.Pb||!1,l&&l.ua&&this.j.ua(),l&&l.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&l&&l.detectBufferingProxy||!1,this.ia=void 0,l&&l.longPollingTimeout&&l.longPollingTimeout>0&&(this.ia=l.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=mc.prototype,r.ka=8,r.I=1,r.connect=function(l,u,f,g){ut(0),this.W=l,this.H=u||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=Tc(this,null,this.W),Ui(this)};function Fo(l){if(Ec(l),l.I==3){var u=l.V++,f=tn(l.J);if(Se(f,"SID",l.M),Se(f,"RID",u),Se(f,"TYPE","terminate"),Hs(l,f),u=new An(l,l.j,u),u.M=2,u.A=Mi(tn(f)),f=!1,a.navigator&&a.navigator.sendBeacon)try{f=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!f&&a.Image&&(new Image().src=u.A,f=!0),f||(u.g=Sc(u.j,null),u.g.ea(u.A)),u.F=Date.now(),ki(u)}Ic(l)}function Hi(l){l.g&&(xo(l),l.g.cancel(),l.g=null)}function Ec(l){Hi(l),l.v&&(a.clearTimeout(l.v),l.v=null),ji(l),l.h.cancel(),l.m&&(typeof l.m=="number"&&a.clearTimeout(l.m),l.m=null)}function Ui(l){if(!tc(l.h)&&!l.m){l.m=!0;var u=l.Ea;q||E(),W||(q(),W=!0),_.add(u,l),l.D=0}}function HC(l,u){return nc(l.h)>=l.h.j-(l.m?1:0)?!1:l.m?(l.i=u.G.concat(l.i),!0):l.I==1||l.I==2||l.D>=(l.Sa?0:l.Ta)?!1:(l.m=As(c(l.Ea,l,u),bc(l,l.D)),l.D++,!0)}r.Ea=function(l){if(this.m)if(this.m=null,this.I==1){if(!l){this.V=Math.floor(Math.random()*1e5),l=this.V++;const N=new An(this,this.j,l);let O=this.o;if(this.U&&(O?(O=Ht(O),or(O,this.U)):O=this.U),this.u!==null||this.R||(N.J=O,O=null),this.S)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,u>4096){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=wc(this,N,u),f=tn(this.J),Se(f,"RID",l),Se(f,"CVER",22),this.G&&Se(f,"X-HTTP-Session-Id",this.G),Hs(this,f),O&&(this.R?u="headers="+Rs(dc(O))+"&"+u:this.u&&Ro(f,this.u,O)),So(this.h,N),this.Ra&&Se(f,"TYPE","init"),this.S?(Se(f,"$req",u),Se(f,"SID","null"),N.U=!0,_o(N,f,null)):_o(N,f,u),this.I=2}}else this.I==3&&(l?yc(this,l):this.i.length==0||tc(this.h)||yc(this))};function yc(l,u){var f;u?f=u.l:f=l.V++;const g=tn(l.J);Se(g,"SID",l.M),Se(g,"RID",f),Se(g,"AID",l.K),Hs(l,g),l.u&&l.o&&Ro(g,l.u,l.o),f=new An(l,l.j,f,l.D+1),l.u===null&&(f.J=l.o),u&&(l.i=u.G.concat(l.i)),u=wc(l,f,1e3),f.H=Math.round(l.va*.5)+Math.round(l.va*.5*Math.random()),So(l.h,f),_o(f,g,u)}function Hs(l,u){l.H&&Bt(l.H,function(f,g){Se(u,g,f)}),l.l&&Bt({},function(f,g){Se(u,g,f)})}function wc(l,u,f){f=Math.min(l.i.length,f);const g=l.l?c(l.l.Ka,l.l,l):null;e:{var N=l.i;let ue=-1;for(;;){const Je=["count="+f];ue==-1?f>0?(ue=N[0].g,Je.push("ofs="+ue)):ue=0:Je.push("ofs="+ue);let _e=!0;for(let We=0;We<f;We++){var O=N[We].g;const nn=N[We].map;if(O-=ue,O<0)ue=Math.max(0,N[We].g-100),_e=!1;else try{O="req"+O+"_"||"";try{var K=nn instanceof Map?nn:Object.entries(nn);for(const[dr,Nn]of K){let xn=Nn;o(Nn)&&(xn=Eo(Nn)),Je.push(O+dr+"="+encodeURIComponent(xn))}}catch(dr){throw Je.push(O+"type="+encodeURIComponent("_badmap")),dr}}catch{g&&g(nn)}}if(_e){K=Je.join("&");break e}}K=void 0}return l=l.i.splice(0,f),u.G=l,K}function Dc(l){if(!l.g&&!l.v){l.Y=1;var u=l.Da;q||E(),W||(q(),W=!0),_.add(u,l),l.A=0}}function No(l){return l.g||l.v||l.A>=3?!1:(l.Y++,l.v=As(c(l.Da,l),bc(l,l.A)),l.A++,!0)}r.Da=function(){if(this.v=null,vc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var l=4*this.T;this.j.info("BP detection timer enabled: "+l),this.B=As(c(this.Wa,this),l)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ut(10),Hi(this),vc(this))};function xo(l){l.B!=null&&(a.clearTimeout(l.B),l.B=null)}function vc(l){l.g=new An(l,l.j,"rpc",l.Y),l.u===null&&(l.g.J=l.o),l.g.P=0;var u=tn(l.na);Se(u,"RID","rpc"),Se(u,"SID",l.M),Se(u,"AID",l.K),Se(u,"CI",l.F?"0":"1"),!l.F&&l.ia&&Se(u,"TO",l.ia),Se(u,"TYPE","xmlhttp"),Hs(l,u),l.u&&l.o&&Ro(u,l.u,l.o),l.O&&(l.g.H=l.O);var f=l.g;l=l.ba,f.M=1,f.A=Mi(tn(u)),f.u=null,f.R=!0,YB(f,l)}r.Va=function(){this.C!=null&&(this.C=null,Hi(this),No(this),ut(19))};function ji(l){l.C!=null&&(a.clearTimeout(l.C),l.C=null)}function _c(l,u){var f=null;if(l.g==u){ji(l),xo(l),l.g=null;var g=2}else if(To(l.h,u))f=u.G,rc(l.h,u),g=1;else return;if(l.I!=0){if(u.o)if(g==1){f=u.u?u.u.length:0,u=Date.now()-u.F;var N=l.D;g=Oi(),ct(g,new qB(g,f)),Ui(l)}else Dc(l);else if(N=u.m,N==3||N==0&&u.X>0||!(g==1&&HC(l,u)||g==2&&No(l)))switch(f&&f.length>0&&(u=l.h,u.i=u.i.concat(f)),N){case 1:hr(l,5);break;case 4:hr(l,10);break;case 3:hr(l,6);break;default:hr(l,2)}}}function bc(l,u){let f=l.Qa+Math.floor(Math.random()*l.Za);return l.isActive()||(f*=2),f*u}function hr(l,u){if(l.j.info("Error code "+u),u==2){var f=c(l.bb,l),g=l.Ua;const N=!g;g=new Pn(g||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Ns(g,"https"),Mi(g),N?OC(g.toString(),f):LC(g.toString(),f)}else ut(2);l.I=0,l.l&&l.l.pa(u),Ic(l),Ec(l)}r.bb=function(l){l?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function Ic(l){if(l.I=0,l.ja=[],l.l){const u=sc(l.h);(u.length!=0||l.i.length!=0)&&(m(l.ja,u),m(l.ja,l.i),l.h.i.length=0,C(l.i),l.i.length=0),l.l.oa()}}function Tc(l,u,f){var g=f instanceof Pn?tn(f):new Pn(f);if(g.g!="")u&&(g.g=u+"."+g.g),xs(g,g.u);else{var N=a.location;g=N.protocol,u=u?u+"."+N.hostname:N.hostname,N=+N.port;const O=new Pn(null);g&&Ns(O,g),u&&(O.g=u),N&&xs(O,N),f&&(O.h=f),g=O}return f=l.G,u=l.wa,f&&u&&Se(g,f,u),Se(g,"VER",l.ka),Hs(l,g),g}function Sc(l,u,f){if(u&&!l.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=l.Aa&&!l.ma?new Oe(new Po({ab:f})):new Oe(l.ma),u.Fa(l.L),u}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ac(){}r=Ac.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function $i(){}$i.prototype.g=function(l,u){return new Tt(l,u)};function Tt(l,u){rt.call(this),this.g=new mc(u),this.l=l,this.h=u&&u.messageUrlParams||null,l=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(l?l["X-WebChannel-Content-Type"]=u.messageContentType:l={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(l?l["X-WebChannel-Client-Profile"]=u.sa:l={"X-WebChannel-Client-Profile":u.sa}),this.g.U=l,(l=u&&u.Qb)&&!v(l)&&(this.g.u=l),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!v(u)&&(this.g.G=u,l=this.h,l!==null&&u in l&&(l=this.h,u in l&&delete l[u])),this.j=new Jr(this)}d(Tt,rt),Tt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Tt.prototype.close=function(){Fo(this.g)},Tt.prototype.o=function(l){var u=this.g;if(typeof l=="string"){var f={};f.__data__=l,l=f}else this.v&&(f={},f.__data__=Eo(l),l=f);u.i.push(new TC(u.Ya++,l)),u.I==3&&Ui(u)},Tt.prototype.N=function(){this.g.l=null,delete this.j,Fo(this.g),delete this.g,Tt.Z.N.call(this)};function Pc(l){yo.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var u=l.__sm__;if(u){e:{for(const f in u){l=f;break e}l=void 0}(this.i=l)&&(l=this.i,u=u!==null&&l in u?u[l]:void 0),this.data=u}else this.data=l}d(Pc,yo);function Rc(){wo.call(this),this.status=1}d(Rc,wo);function Jr(l){this.g=l}d(Jr,Ac),Jr.prototype.ra=function(){ct(this.g,"a")},Jr.prototype.qa=function(l){ct(this.g,new Pc(l))},Jr.prototype.pa=function(l){ct(this.g,new Rc)},Jr.prototype.oa=function(){ct(this.g,"b")},$i.prototype.createWebChannel=$i.prototype.g,Tt.prototype.send=Tt.prototype.o,Tt.prototype.open=Tt.prototype.m,Tt.prototype.close=Tt.prototype.close,Nh=function(){return new $i},Fh=function(){return Oi()},Rh=Br,sl={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Li.NO_ERROR=0,Li.TIMEOUT=8,Li.HTTP_ERROR=6,sa=Li,zB.COMPLETE="complete",Ph=zB,UB.EventType=Ts,Ts.OPEN="a",Ts.CLOSE="b",Ts.ERROR="c",Ts.MESSAGE="d",rt.prototype.listen=rt.prototype.J,Js=UB,Oe.prototype.listenOnce=Oe.prototype.K,Oe.prototype.getLastError=Oe.prototype.Ha,Oe.prototype.getLastErrorCode=Oe.prototype.ya,Oe.prototype.getStatus=Oe.prototype.ca,Oe.prototype.getResponseJson=Oe.prototype.La,Oe.prototype.getResponseText=Oe.prototype.la,Oe.prototype.send=Oe.prototype.ea,Oe.prototype.setWithCredentials=Oe.prototype.Fa,Ah=Oe}).apply(typeof qi<"u"?qi:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.8.6
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository github:le0pard/re2js
* @license MIT
*/var be,H=(be=class{},$(be,"FOLD_CASE",1),$(be,"LITERAL",2),$(be,"CLASS_NL",4),$(be,"DOT_NL",8),$(be,"ONE_LINE",16),$(be,"NON_GREEDY",32),$(be,"PERL_X",64),$(be,"UNICODE_GROUPS",128),$(be,"WAS_DOLLAR",256),$(be,"LOOKBEHIND",512),$(be,"MATCH_NL",be.CLASS_NL|be.DOT_NL),$(be,"PERL",be.CLASS_NL|be.ONE_LINE|be.PERL_X|be.UNICODE_GROUPS),$(be,"POSIX",0),$(be,"UNANCHORED",0),$(be,"ANCHOR_START",1),$(be,"ANCHOR_BOTH",2),be);const qr={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},oi=128,il=new Int32Array(oi),al=new Int32Array(oi),zi=65535;for(let r=0;r<oi;r++)r>=97&&r<=122?il[r]=r-32:il[r]=r,r>=65&&r<=90?al[r]=r+32:al[r]=r;var Xo,k=(Xo=class{static toUpperCase(r){if(r<oi)return il[r];const e=String.fromCodePoint(r).toUpperCase(),t=e.codePointAt(0)>zi?2:1;if(e.length>t)return r;const n=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=n.codePointAt(0)>zi?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}static toLowerCase(r){if(r<oi)return al[r];const e=String.fromCodePoint(r).toLowerCase(),t=e.codePointAt(0)>zi?2:1;if(e.length>t)return r;const n=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=n.codePointAt(0)>zi?2:1;return n.length>s||n.codePointAt(0)!==r?r:e.codePointAt(0)}},$(Xo,"CODES",new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["'",39],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["`",96],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]])),Xo),w=class{constructor(r,e=!1){this.data=r,this.isStride1=e,this.SIZE=e?2:3}getLo(r){return this.data[r*this.SIZE]}getHi(r){return this.data[r*this.SIZE+1]}getStride(r){return this.isStride1?1:this.data[r*this.SIZE+2]}get length(){return this.data.length/this.SIZE}};const xh=new Uint8Array(256);for(let r=0,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";r<64;r++)xh[e.charCodeAt(r)]=r;const Oh=r=>{const e=[];let t=0,n=0;for(let s=0;s<r.length;s++){let i=xh[r.charCodeAt(s)];t|=(i&31)<<n,i&32?n+=5:(e.push(t),t=0,n=0)}return e},D=(r,e)=>{const t=Oh(r),n=e?t.length/2:t.length/3,s=new Uint32Array(n*3);let i=0,a=0;for(let o=0;o<n;o++)i+=t[a++],s[o*3]=i,i+=t[a++],s[o*3+1]=i,s[o*3+2]=e?1:t[a++];return s},bg=r=>{const e=Oh(r),t=new Map;let n=0;for(let s=0;s<e.length;s+=2){n+=e[s];const i=e[s+1],a=i>>>1^-(i&1);t.set(n,n+a)}return t};var Ki=class{constructor(r){this.initializer=r,this.cache=new Map}has(r){return r in this.initializer}get(r){if(this.cache.has(r))return this.cache.get(r);const e=this.initializer[r],t=e?e():null;return this.cache.set(r,t),t}},Ln,Et=(Ln=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=bg("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new w(D("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}static get Upper(){return this.CATEGORIES.get("Lu")}},$(Ln,"_CASE_ORBIT",null),$(Ln,"_Print",null),$(Ln,"CATEGORIES",new Ki({C:()=>new w(D("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new w(D("AfgDgB",!0)),Cf:()=>new w(D("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new w(D("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new w(D("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new w(D("gg2B--B",!0)),L:()=>new w(D("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new w(D("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new w(D("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new w(D("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new w(D("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new w(D("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new w(D("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new w(D("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new w(D("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new w(D("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new w(D("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new w(D("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new w(D("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new w(D("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new w(D("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new w(D("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new w(D("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new w(D("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new w(D("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new w(D("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new w(D("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new w(D("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new w(D("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new w(D("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new w(D("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new w(D("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new w(D("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new w(D("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new w(D("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new w(D("ohIA",!0)),Zp:()=>new w(D("phIA",!0)),Zs:()=>new w(D("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new w(D("wBJIFbF",!0)),Alphabetic:()=>new w(D("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new w(D("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new w(D("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new w(D("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new w(D("7-8DE",!0)),Emoji_Modifier_Base:()=>new w(D("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new w(D("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new w(D("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new w(D("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new w(D("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new w(D("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new w(D("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new w(D("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new w(D("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new w(D("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),$(Ln,"SCRIPTS",new Ki({Adlam:()=>new w(D("go6DrCFJFB",!0)),Ahom:()=>new w(D("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new w(D("ggxCmS",!0)),Arabic:()=>new w(D("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new w(D("xpBlBDxBDCks9BE",!0)),Avestan:()=>new w(D("g4iC1BEG",!0)),Balinese:()=>new w(D("g4GsCCxB",!0)),Bamum:()=>new w(D("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new w(D("w26CdDF",!0)),Batak:()=>new w(D("g+GzBJD",!0)),Bengali:()=>new w(D("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new w(D("g17CYDY",!0)),Bhaiksuki:()=>new w(D("ggnCICsBCNLc",!0)),Bopomofo:()=>new w(D("qXB6wLqBxDf",!0)),Brahmi:()=>new w(D("ggkCtCFjBKA",!0)),Braille:()=>new w(D("ggK-H",!0)),Buginese:()=>new w(D("gwGbDB",!0)),Buhid:()=>new w(D("g6FT",!0)),Canadian_Aboriginal:()=>new w(D("ggF-TxRlC7tgCP",!0)),Carian:()=>new w(D("g1gCwB",!0)),Caucasian_Albanian:()=>new w(D("wphCzBMA",!0)),Chakma:()=>new w(D("gokC0BCR",!0)),Cham:()=>new w(D("gwqB2BKNDJDD",!0)),Cherokee:()=>new w(D("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new w(D("w9jCb",!0)),Common:()=>new w(D("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new w(D("ifNxkKzDGG",!0)),Cuneiform:()=>new w(D("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new w(D("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new w(D("w8rCiD",!0)),Cyrillic:()=>new w(D("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new w(D("gghCvC",!0)),Devanagari:()=>new w(D("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new w(D("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new w(D("ggmC7B",!0)),Duployan:()=>new w(D("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new w(D("ggsC1iBL68D",!0)),Elbasan:()=>new w(D("gohCnB",!0)),Elymaic:()=>new w(D("g-jCW",!0)),Ethiopic:()=>new w(D("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new w(D("gqjClBEcJB",!0)),Georgian:()=>new w(D("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new w(D("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new w(D("w5gCa",!0)),Grantha:()=>new w(D("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new w(D("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new w(D("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new w(D("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new w(D("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new w(D("go4C5B",!0)),Han:()=>new w(D("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new w(D("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new w(D("gojCnBJJ",!0)),Hanunoo:()=>new w(D("g5FU",!0)),Hatran:()=>new w(D("gniCSCBGE",!0)),Hebrew:()=>new w(D("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new w(D("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new w(D("giiCVCI",!0)),Inherited:()=>new w(D("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new w(D("g7iCSGH",!0)),Inscriptional_Parthian:()=>new w(D("g6iCVDH",!0)),Javanese:()=>new w(D("gsqBtCDJFB",!0)),Kaithi:()=>new w(D("gkkCiCLA",!0)),Kannada:()=>new w(D("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new w(D("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new w(D("g4nCQCoBEc",!0)),Kayah_Li:()=>new w(D("goqBtBCA",!0)),Kharoshthi:()=>new w(D("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new w(D("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new w(D("g8F9CDJHJnPf",!0)),Khojki:()=>new w(D("gwkCRCuB",!0)),Khudawadi:()=>new w(D("w1kC6BGJ",!0)),Kirat_Rai:()=>new w(D("gq7C5B",!0)),Lao:()=>new w(D("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new w(D("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new w(D("ggH3BEOEC",!0)),Limbu:()=>new w(D("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new w(D("gwhC2JKVLH",!0)),Linear_B:()=>new w(D("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new w(D("wmpBvBx1eA",!0)),Lycian:()=>new w(D("g0gCc",!0)),Lydian:()=>new w(D("gpiCZGA",!0)),Mahajani:()=>new w(D("wqkCmB",!0)),Makasar:()=>new w(D("g3nCY",!0)),Malayalam:()=>new w(D("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new w(D("giCbDA",!0)),Manichaean:()=>new w(D("g2iCmBFL",!0)),Marchen:()=>new w(D("wjnCfDVCN",!0)),Masaram_Gondi:()=>new w(D("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new w(D("gy7C6C",!0)),Meetei_Mayek:()=>new w(D("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new w(D("gg6DkGDP",!0)),Meroitic_Cursive:()=>new w(D("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new w(D("gsiCf",!0)),Miao:()=>new w(D("g47CqCF4BIQ",!0)),Modi:()=>new w(D("gwlCkCMJ",!0)),Mongolian:()=>new w(D("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new w(D("gy6CeCJFB",!0)),Multani:()=>new w(D("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new w(D("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new w(D("gkiCeJI",!0)),Nag_Mundari:()=>new w(D("wm5DpB",!0)),Nandinagari:()=>new w(D("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new w(D("gsGrBFZHKEB",!0)),Newa:()=>new w(D("gglC7CCE",!0)),Nko:()=>new w(D("g+B6BDC",!0)),Nushu:()=>new w(D("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new w(D("go4DsBENDJFB",!0)),Ogham:()=>new w(D("g0Fc",!0)),Ol_Chiki:()=>new w(D("wiHvB",!0)),Ol_Onal:()=>new w(D("wu5DqBFA",!0)),Old_Hungarian:()=>new w(D("gkjCyBOyBIF",!0)),Old_Italic:()=>new w(D("g4gCjBKC",!0)),Old_North_Arabian:()=>new w(D("g0iCf",!0)),Old_Permic:()=>new w(D("w6gCqB",!0)),Old_Persian:()=>new w(D("g9gCjBFN",!0)),Old_Sogdian:()=>new w(D("g4jCnB",!0)),Old_South_Arabian:()=>new w(D("gziCf",!0)),Old_Turkic:()=>new w(D("ggjCoC",!0)),Old_Uyghur:()=>new w(D("w7jCZ",!0)),Oriya:()=>new w(D("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new w(D("wlhCjBFjB",!0)),Osmanya:()=>new w(D("gkhCdDJ",!0)),Pahawh_Hmong:()=>new w(D("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new w(D("gjiCf",!0)),Pau_Cin_Hau:()=>new w(D("g2mC4B",!0)),Phags_Pa:()=>new w(D("giqB3B",!0)),Phoenician:()=>new w(D("goiCbEA",!0)),Psalter_Pahlavi:()=>new w(D("g8iCRIDNG",!0)),Rejang:()=>new w(D("wpqBjBMA",!0)),Runic:()=>new w(D("g1FqCEK",!0)),Samaritan:()=>new w(D("ggCtBDO",!0)),Saurashtra:()=>new w(D("gkqBlCJL",!0)),Sharada:()=>new w(D("gskC-ChsCH",!0)),Shavian:()=>new w(D("wihCvB",!0)),Siddham:()=>new w(D("gslC1BDlB",!0)),Sidetic:()=>new w(D("gqiCZ",!0)),SignWriting:()=>new w(D("gg2DrUQECO",!0)),Sinhala:()=>new w(D("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new w(D("w5jCpB",!0)),Sora_Sompeng:()=>new w(D("wmkCYIJ",!0)),Soyombo:()=>new w(D("wymCyC",!0)),Sundanese:()=>new w(D("g8G-BhIH",!0)),Sunuwar:()=>new w(D("g+mChBPJ",!0)),Syloti_Nagri:()=>new w(D("ggqBsB",!0)),Syriac:()=>new w(D("g4BNC7BDCxIK",!0)),Tagalog:()=>new w(D("g4FVKA",!0)),Tagbanwa:()=>new w(D("g7FMCCCB",!0)),Tai_Le:()=>new w(D("wqGdDE",!0)),Tai_Tham:()=>new w(D("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new w(D("g0qBiCZE",!0)),Tai_Yo:()=>new w(D("g25DeCVJB",!0)),Takri:()=>new w(D("g0lC5BHJ",!0)),Tamil:()=>new w(D("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new w(D("wz6CuCCJ",!0)),Tangut:()=>new w(D("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new w(D("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new w(D("g8BxB",!0)),Thai:()=>new w(D("hwD5BGb",!0)),Tibetan:()=>new w(D("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new w(D("wpL3BIBPA",!0)),Tirhuta:()=>new w(D("gklCnCJJ",!0)),Todhri:()=>new w(D("guhCzB",!0)),Tolong_Siki:()=>new w(D("wtnCrBFJ",!0)),Toto:()=>new w(D("w04De",!0)),Tulu_Tigalari:()=>new w(D("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new w(D("g8gCdCA",!0)),Unknown:()=>new w(D("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new w(D("gopBrJ",!0)),Vithkuqi:()=>new w(D("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new w(D("g24D5BGA",!0)),Warang_Citi:()=>new w(D("glmCyCNA",!0)),Yezidi:()=>new w(D("g0jCpBCCDB",!0)),Yi:()=>new w(D("ggoBskBE2B",!0)),Zanabazar_Square:()=>new w(D("gwmCnC",!0))})),$(Ln,"FOLD_CATEGORIES",new Ki({L:()=>new w(D("laA",!0)),LC:()=>new w(D("laA",!0)),Ll:()=>new w(D("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new w(D("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new w(D("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new w(D("5cgBgBlgHAB",!1)),Mn:()=>new w(D("5cgBgBlgHAB",!1)),Emoji:()=>new w(D("8mJA",!0)),Extended_Pictographic:()=>new w(D("8mJA",!0)),Lowercase:()=>new w(D("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new w(D("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new w(D("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),$(Ln,"FOLD_SCRIPT",new Ki({Common:()=>new w(D("8cgBgB",!1)),Greek:()=>new w(D("1FwUwU",!1)),Inherited:()=>new w(D("5cgBgBlgHAB",!1))})),Ln),Ie,Y=(Ie=class{static is32(e,t){let n=0,s=e.length;for(;n<s;){const i=n+Math.floor((s-n)/2),a=e.getLo(i),o=e.getHi(i);if(a<=t&&t<=o){const B=e.getStride(i);return(t-a)%B===0}t<a?s=i:n=i+1}return!1}static is(e,t){if(t<=Ie.MAX_LATIN1){for(let n=0;n<e.length;n++){if(t>e.getHi(n))continue;const s=e.getLo(n);if(t<s)return!1;const i=e.getStride(n);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&Ie.is32(e,t)}static isUpper(e){if(e<=Ie.MAX_LATIN1){const t=String.fromCodePoint(e);return t.toUpperCase()===t&&t.toLowerCase()!==t}return Ie.is(Et.Upper,e)}static isPrint(e){return e<=Ie.MAX_LATIN1?e>=32&&e<Ie.MAX_ASCII||e>=161&&e!==173:Ie.is(Et.Print,e)}static simpleFold(e){if(Et.CASE_ORBIT.has(e))return Et.CASE_ORBIT.get(e);const t=k.toLowerCase(e);return t!==e?t:k.toUpperCase(e)}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=Ie.MAX_ASCII&&t<=Ie.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let n=Ie.simpleFold(e);n!==e;n=Ie.simpleFold(n))if(n===t)return!0;return!1}},$(Ie,"MAX_RUNE",1114111),$(Ie,"MAX_ASCII",127),$(Ie,"MAX_LATIN1",255),$(Ie,"MAX_BMP",65535),$(Ie,"MIN_FOLD",65),$(Ie,"MAX_FOLD",125251),$(Ie,"MIN_HIGH_SURROGATE",55296),$(Ie,"MAX_HIGH_SURROGATE",56319),$(Ie,"MIN_LOW_SURROGATE",56320),$(Ie,"MAX_LOW_SURROGATE",57343),$(Ie,"MIN_SUPPLEMENTARY_CODE_POINT",65536),Ie);const Pl=256,Lh=new Uint8Array(Pl);for(let r=0;r<Pl;r++)Lh[r]=97<=r&&r<=122||65<=r&&r<=90||48<=r&&r<=57||r===95?1:0;let Go=null,Ho=null;var Pe,ne=(Pe=class{static emptyInts(){return[]}static isByteArray(e){return Array.isArray(e)||e instanceof Uint8Array}static isalnum(e){return k.CODES.get("0")<=e&&e<=k.CODES.get("9")||k.CODES.get("a")<=e&&e<=k.CODES.get("z")||k.CODES.get("A")<=e&&e<=k.CODES.get("Z")}static unhex(e){return k.CODES.get("0")<=e&&e<=k.CODES.get("9")?e-k.CODES.get("0"):k.CODES.get("a")<=e&&e<=k.CODES.get("f")?e-k.CODES.get("a")+10:k.CODES.get("A")<=e&&e<=k.CODES.get("F")?e-k.CODES.get("A")+10:-1}static escapeRune(e){let t="";if(Y.isPrint(e))Pe.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case k.CODES.get('"'):t+='\\"';break;case k.CODES.get("\\"):t+="\\\\";break;case k.CODES.get("	"):t+="\\t";break;case k.CODES.get(`
`):t+="\\n";break;case k.CODES.get("\r"):t+="\\r";break;case k.CODES.get("\b"):t+="\\b";break;case k.CODES.get("\f"):t+="\\f";break;default:{let n=e.toString(16);e<256?(t+="\\x",n.length===1&&(t+="0"),t+=n):t+=`\\x{${n}}`;break}}return t}static stringToRunes(e){const t=String(e),n=[];let s=0;for(;s<t.length;){const i=t.codePointAt(s);n.push(i),s+=i>Y.MAX_BMP?2:1}return n}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<Pl?Lh[e]===1:!1}static emptyOpContext(e,t){let n=0;return e<0&&(n|=Pe.EMPTY_BEGIN_TEXT|Pe.EMPTY_BEGIN_LINE),e===10&&(n|=Pe.EMPTY_BEGIN_LINE),t<0&&(n|=Pe.EMPTY_END_TEXT|Pe.EMPTY_END_LINE),t===10&&(n|=Pe.EMPTY_END_LINE),Pe.isWordRune(e)!==Pe.isWordRune(t)?n|=Pe.EMPTY_WORD_BOUNDARY:n|=Pe.EMPTY_NO_WORD_BOUNDARY,n}static quoteMeta(e){return e.split("").map(t=>Pe.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>Y.MAX_BMP?2:1}static toArray(e){const t=e.length,n=new Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return Go||(Go=new TextEncoder),Go.encode(e);{let t=[],n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===Y.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===Y.MIN_LOW_SURROGATE?(i=Y.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){Ho||(Ho=new TextDecoder("utf-8"));const t=e instanceof Uint8Array?e:new Uint8Array(e);return Ho.decode(t)}else{let t=[],n=0,s=0;for(;n<e.length;){let i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[n++];t[s++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[n++],o=e[n++],B=e[n++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|B&63)-Y.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(Y.MIN_HIGH_SURROGATE+(c>>10)),t[s++]=String.fromCharCode(Y.MIN_LOW_SURROGATE+(c&1023))}else{let a=e[n++],o=e[n++];t[s++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return t.join("")}}},$(Pe,"METACHARACTERS","\\.+*?()|[]{}^$"),$(Pe,"EMPTY_BEGIN_LINE",1),$(Pe,"EMPTY_END_LINE",2),$(Pe,"EMPTY_BEGIN_TEXT",4),$(Pe,"EMPTY_END_TEXT",8),$(Pe,"EMPTY_WORD_BOUNDARY",16),$(Pe,"EMPTY_NO_WORD_BOUNDARY",32),$(Pe,"EMPTY_ALL",-1),Pe);const kh=(r=[],e=0)=>{const t=Object.create(null);for(let n=0;n<r.length;n++){const s=r[n],i=e+n;t[s]=i,t[i]=s}return Object.freeze(t)};var Gn,Ir=(Gn=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Gn.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Gn.Encoding.UTF_16}},$(Gn,"Encoding",kh(["UTF_16","UTF_8"])),Gn),jc=class extends Ir{constructor(r=null){super(),this.bytes=r}getEncoding(){return Ir.Encoding.UTF_8}asCharSequence(){return ne.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},Ig=class extends Ir{constructor(r=null){super(),this.charSequence=r}getEncoding(){return Ir.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return ne.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},gr=class{static utf16(r){return new Ig(r)}static utf8(r){return ne.isByteArray(r)?new jc(r):new jc(ne.stringToUtf8ByteArray(r))}},Ct=class{static EOF(){return-8}constructor(){this.end=0}canCheckPrefix(){return!0}endPos(){return this.end}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},Tg=class extends Ct{constructor(r,e=0,t=r.length){super(),this.bytes=r,this.start=e,this.end=t}hasString(r,e){const t=r.bytes;if(t.length===0)return!0;const n=this.indexOf(this.bytes,t,this.start+e);return n!==-1&&n<=this.end-t.length}hasAnyString(r,e){return r.ac8?r.ac8.searchUTF8(this.bytes,this.start+e,this.end):!1}step(r){if(r+=this.start,r>=this.end)return Ct.EOF();const e=this.bytes[r]&255;if(e<128)return e<<3|1;if(e>=194&&e<=223&&r+1<this.end){const t=this.bytes[r+1]&255;return(t&192)!==128?e<<3|1:((e&31)<<6|t&63)<<3|2}else if(e>=224&&e<=239&&r+2<this.end){const t=this.bytes[r+1]&255;if((t&192)!==128)return e<<3|1;const n=this.bytes[r+2]&255;return(n&192)!==128?e<<3|1:((e&15)<<12|(t&63)<<6|n&63)<<3|3}else if(e>=240&&e<=244&&r+3<this.end){const t=this.bytes[r+1]&255;if((t&192)!==128)return e<<3|1;const n=this.bytes[r+2]&255;if((n&192)!==128)return e<<3|1;const s=this.bytes[r+3]&255;return(s&192)!==128?e<<3|1:((e&7)<<18|(t&63)<<12|(n&63)<<6|s&63)<<3|4}else return e<<3|1}index(r,e){e+=this.start;const t=this.indexOf(this.bytes,r.prefixUTF8,e);return t<0?t:t-e}context(r){r+=this.start;let e=-1;if(r>this.start&&r<=this.end){let n=r-1;if(e=this.bytes[n--],e>=128){let s=r-4;for(s<this.start&&(s=this.start);n>=s&&(this.bytes[n]&192)===128;)n--;n<this.start&&(n=this.start),e=this.step(n-this.start)>>3}}const t=r<this.end?this.step(r-this.start)>>3:-1;return ne.emptyOpContext(e,t)}indexOf(r,e,t=0){let n=e.length;if(n===0)return t<=this.end?t:-1;const s=e[0];let i=this.end-n;const a=typeof r.indexOf=="function";let o=t;for(;o<=i;){if(a){if(o=r.indexOf(s,o),o===-1||o>i)return-1}else{for(;o<=i&&r[o]!==s;)o++;if(o>i)return-1}let B=!0;for(let c=1;c<n;c++)if(r[o+c]!==e[c]){B=!1;break}if(B)return o;o++}return-1}prefixLength(r){return r.prefixUTF8.length}},Sg=class extends Ct{constructor(r,e=0,t=r.length){super(),this.charSequence=r,this.start=e,this.end=t}hasString(r,e){const t=this.charSequence.indexOf(r.str,this.start+e);return t!==-1&&t<=this.end-r.str.length}hasAnyString(r,e){return r.ac16?r.ac16.searchUTF16(this.charSequence,this.start+e,this.end):!1}step(r){if(r+=this.start,r>=this.end)return Ct.EOF();const e=this.charSequence.charCodeAt(r);if(e<Y.MIN_HIGH_SURROGATE||e>Y.MAX_HIGH_SURROGATE||r+1>=this.end)return e<<3|1;const t=this.charSequence.charCodeAt(r+1);return t>=Y.MIN_LOW_SURROGATE&&t<=Y.MAX_LOW_SURROGATE?(e-Y.MIN_HIGH_SURROGATE)*1024+(t-Y.MIN_LOW_SURROGATE)+Y.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(r,e){e+=this.start;const t=this.charSequence.indexOf(r.prefix,e);return t<0||t>this.end-r.prefix.length?-1:t-e}context(r){r+=this.start;const e=r>this.start&&r<=this.end?this.charSequence.charCodeAt(r-1):-1,t=r<this.end?this.charSequence.charCodeAt(r):-1;return ne.emptyOpContext(e,t)}prefixLength(r){return r.prefix.length}},Ae=class{static fromUTF8(r,e=0,t=r.length){return new Tg(r,e,t)}static fromUTF16(r,e=0,t=r.length){return new Sg(r,e,t)}},vi=class extends Error{constructor(r){super(r),this.name="RE2JSException"}},Te=class extends vi{constructor(r,e=null){let t=`error parsing regexp: ${r}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=r,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},Ag=class extends vi{constructor(r){super(r),this.name="RE2JSCompileException"}},mt=class extends vi{constructor(r){super(r),this.name="RE2JSGroupException"}},Pg=class extends vi{constructor(r){super(r),this.name="RE2JSFlagsException"}},Qs=class extends vi{constructor(r){super(r),this.name="RE2JSInternalException"}},Er,$c=(Er=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(n=>{const s=n.codePointAt(0);return s===k.CODES.get("\\")||s===k.CODES.get("$")?`\\${n}`:n}).join(""):e.indexOf("$")<0?e:e.split("").map(n=>n.codePointAt(0)===k.CODES.get("$")?"$$":n).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;const n=this.patternInput.re2();this.patternGroupCount=n.numberOfCapturingGroups(),this.groups=[],this.namedGroups=n.namedGroups,this.numberOfInstructions=n.numberOfInstructions(),t instanceof Ir?this.resetMatcherInput(t):ne.isByteArray(t)?this.resetMatcherInput(gr.utf8(t)):this.resetMatcherInput(gr.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof Ir||(ne.isByteArray(e)?e=gr.utf8(e):e=gr.utf16(e)),this.matcherInput=e,this.reset(),this}start(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new mt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new mt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){const s=this.namedGroups[e];if(!Number.isFinite(s))throw new mt(`group '${e}' not found`);e=s}const t=this.start(e),n=this.end(e);return t<0&&n<0?null:this.substring(t,n)}getNamedGroups(){if(!this.hasMatch)throw new mt("perhaps no match attempted");const e=Object.create(null);for(const t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(e<0||e>this.patternGroupCount)throw new mt(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new mt("perhaps no match attempted");if(e===0||this.hasGroups)return;const t=this.matcherInputLength,n=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount);if(!n[0])throw new mt("inconsistency in matching group data");this.groups=n[1],this.hasGroups=!0}matches(){return this.genMatch(0,H.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,H.ANCHOR_START)}find(e=null){if(e!==null){if(e<0||e>this.matcherInputLength)throw new mt(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){const t=(this.matcherInput.isUTF16Encoding()?Ae.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):Ae.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,H.UNANCHORED)}genMatch(e,t){const n=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1);return n[0]?(this.groups=n[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?ne.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let n="";const s=this.start(),i=this.end();return this.appendPos<s&&(n+=this.substring(this.appendPos,s)),this.appendPos=i,n+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),n}appendReplacementInternalJava(e){let t="",n=0;const s=e.length;let i=0;for(;i<s;){const a=e.codePointAt(i);if(a===k.CODES.get("\\")){if(n<i&&(t+=e.substring(n,i)),i++,i>=s)throw new mt("character to be escaped is missing");n=i,i++;continue}if(a===k.CODES.get("$")){if(n<i&&(t+=e.substring(n,i)),i+1>=s)throw new mt("Illegal group reference: group index is missing");const o=e.codePointAt(i+1);if(k.CODES.get("0")<=o&&o<=k.CODES.get("9")){let B=o-k.CODES.get("0"),c=i+2;for(;c<s;c++){const d=e.codePointAt(c);if(d<k.CODES.get("0")||d>k.CODES.get("9")||B*10+d-k.CODES.get("0")>this.patternGroupCount)break;B=B*10+d-k.CODES.get("0")}if(B>this.patternGroupCount)throw new mt(`n > number of groups: ${B}`);const h=this.group(B);h!==null&&(t+=h),i=c,n=i}else if(o===k.CODES.get("{")){let B=i+2;for(;B<s&&e.codePointAt(B)!==k.CODES.get("}");)B++;if(B>=s)throw new mt("named capture group is missing trailing '}'");const c=e.substring(i+2,B),h=this.group(c);h!==null&&(t+=h),i=B+1,n=i}else throw new mt("Illegal group reference");continue}i++}return n<s&&(t+=e.substring(n,s)),t}appendReplacementInternalJs(e){let t="",n=0;const s=e.length;for(let i=0;i<s-1;i++)if(e.codePointAt(i)===k.CODES.get("$")){let a=e.codePointAt(i+1);if(k.CODES.get("$")===a){n<i&&(t+=e.substring(n,i)),t+="$",i++,n=i+1;continue}else if(k.CODES.get("&")===a){n<i&&(t+=e.substring(n,i));const o=this.group(0);o!==null?t+=o:t+="$&",i++,n=i+1;continue}else if(k.CODES.get("`")===a){n<i&&(t+=e.substring(n,i)),t+=this.substring(0,this.start(0)),i++,n=i+1;continue}else if(k.CODES.get("'")===a){n<i&&(t+=e.substring(n,i)),t+=this.substring(this.end(0),this.matcherInputLength),i++,n=i+1;continue}else if(k.CODES.get("1")<=a&&a<=k.CODES.get("9")){let o=a-k.CODES.get("0");for(n<i&&(t+=e.substring(n,i)),i+=2;i<s&&(a=e.codePointAt(i),!(a<k.CODES.get("0")||a>k.CODES.get("9")||o*10+a-k.CODES.get("0")>this.patternGroupCount));i++)o=o*10+a-k.CODES.get("0");if(o>this.patternGroupCount){t+=`$${o}`,n=i,i--;continue}const B=this.group(o);B!==null&&(t+=B),n=i,i--;continue}else if(a===k.CODES.get("<")){n<i&&(t+=e.substring(n,i)),i++;let o=i+1;for(;o<e.length&&e.codePointAt(o)!==k.CODES.get(">")&&e.codePointAt(o)!==k.CODES.get(" ");)o++;if(o===e.length||e.codePointAt(o)!==k.CODES.get(">")){t+=e.substring(i-1,o+1),n=o+1,i=o;continue}const B=e.substring(i+1,o);if(Object.prototype.hasOwnProperty.call(this.namedGroups,B)){const c=this.group(B);c!==null&&(t+=c)}else t+=`$<${B}>`;n=o+1,i=o;continue}}return n<s&&(t+=e.substring(n,s)),t}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,n=!1){let s="";this.reset();const i=typeof e=="function",a=Object.keys(this.namedGroups).length>0;let o=null;if(i){if(this.groupCount()>=Er.MAX_REPLACER_ARGS)throw new mt("Too many capture groups to safely invoke replacer function");o=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,a,o):this.appendReplacement(e,n),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t,n){let s="";const i=this.start(),a=this.end();this.appendPos<i&&(s+=this.substring(this.appendPos,i)),this.appendPos=a;const o=this.buildReplacerArgs(i,t,n);return s+=String(e(...o)),s}buildReplacerArgs(e,t,n){const s=[this.group(0)],i=this.groupCount();for(let a=1;a<=i;a++){const o=this.start(a);o<0?s.push(void 0):s.push(this.substring(o,this.end(a)))}if(s.push(e),s.push(n),t){const a=this.getNamedGroups();for(const o in a)a[o]===null&&(a[o]=void 0);s.push(a)}return s}},$(Er,"MAX_REPLACER_ARGS",65535),Er),fe,M=(fe=class{static isRuneOp(e){return fe.RUNE<=e&&e<=fe.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let n of e)t+=ne.escapeRune(n);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=[],this.next=null}matchRune(e){if(this.runes.length===1){const a=this.runes[0];return this.arg&H.FOLD_CASE?Y.equalsIgnoreCase(a,e):e===a}const t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return!1;if(e<=this.runes[a+1])return!0}return!1}let n=0,s=t>>1;for(;s>1;){const a=s>>1;n+=this.runes[n+a<<1]<=e?a:0,s-=a}n+=this.runes[n<<1]<=e?1:0;const i=n-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){const a=this.runes[0];return this.arg&H.FOLD_CASE?Y.equalsIgnoreCase(a,e)?0:-1:e===a?0:-1}const t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return-1;if(e<=this.runes[a+1])return Math.floor(a/2)}return-1}let n=0,s=t>>1;for(;s>1;){const a=s>>1;n+=this.runes[n+a<<1]<=e?a:0,s-=a}n+=this.runes[n<<1]<=e?1:0;const i=n-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case fe.ALT:return`alt -> ${this.out}, ${this.arg}`;case fe.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case fe.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case fe.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case fe.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case fe.FAIL:return"fail";case fe.NOP:return`nop -> ${this.out}`;case fe.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case fe.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case fe.RUNE:return this.runes===null?"rune <null>":["rune ",fe.escapeRunes(this.runes),this.arg&H.FOLD_CASE?"/i":""," -> ",this.out].join("");case fe.RUNE1:return`rune1 ${fe.escapeRunes(this.runes)} -> ${this.out}`;case fe.RUNE_ANY:return`any -> ${this.out}`;case fe.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},$(fe,"ALT",1),$(fe,"ALT_MATCH",2),$(fe,"CAPTURE",3),$(fe,"EMPTY_WIDTH",4),$(fe,"FAIL",5),$(fe,"MATCH",6),$(fe,"NOP",7),$(fe,"RUNE",8),$(fe,"RUNE1",9),$(fe,"RUNE_ANY",10),$(fe,"RUNE_ANY_NOT_NL",11),$(fe,"LB_WRITE",12),$(fe,"LB_CHECK",13),fe),Jc=class{constructor(r){this.sparse=new Int32Array(r),this.densePcs=new Int32Array(r),this.denseCaps=null,this.size=0,this.ncap=0}init(r){this.ncap=r;const e=this.densePcs.length*r;(!this.denseCaps||this.denseCaps.length<e)&&(this.denseCaps=new Int32Array(e))}contains(r){const e=this.sparse[r];return e<this.size&&this.densePcs[e]===r}isEmpty(){return this.size===0}add(r){const e=this.size++;return this.sparse[r]=e,this.densePcs[e]=r,e}clear(){this.size=0}toString(){let r="{";for(let e=0;e<this.size;e++)e!==0&&(r+=", "),r+=this.densePcs[e];return r+="}",r}},Rg=class ol{static fromRE2(e){const t=new ol;return t.prog=e.prog,t.re2=e,t.q0=new Jc(t.prog.numInst()),t.q1=new Jc(t.prog.numInst()),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}static fromMachine(e){return ol.fromRE2(e.re2)}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?ne.emptyInts():ne.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,n){const s=this.re2.cond;if(s===ne.EMPTY_ALL||(n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let i=this.prog.numLb>0?0:t,a=t,o=this.q0,B=this.q1,c=e.step(i),h=c>>3,d=c&7,p=-1,C=0;c!==Ct.EOF()&&(c=e.step(i+d),p=c>>3,C=c&7);let m;for(i===0?m=ne.emptyOpContext(-1,h):m=e.context(i);;){if(o.isEmpty()){if(s&ne.EMPTY_BEGIN_TEXT&&i!==0||(n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&i!==0||this.matched)break;if(this.prog.numLb===0&&this.re2.prefix.length!==0&&p!==this.re2.prefixRune&&e.canCheckPrefix()){const F=e.index(this.re2,i);if(F<0)break;i+=F,c=e.step(i),h=c>>3,d=c&7,c=e.step(i+d),p=c>>3,C=c&7,m=e.context(i)}}if(i===0&&this.prog.numLb>0)for(let F=0;F<this.prog.lbStarts.length;F++)this.add(o,this.prog.lbStarts[F],i,this.matchcap,0,m);!this.matched&&(i===0||n===H.UNANCHORED)&&i>=a&&(this.ncap>0&&(this.matchcap[0]=i),this.add(o,this.prog.start,i,this.matchcap,0,m));const I=i+d;if(m=e.context(I),this.step(o,B,i,I,h,m,n,i===e.endPos()),d===0||this.ncap===0&&this.matched)break;i+=d,h=p,d=C,h!==-1&&(c=e.step(i+d),p=c>>3,C=c&7);const S=o;o=B,B=S}return B.clear(),this.matched}matchSet(e,t,n){const s=this.re2.cond;if(s===ne.EMPTY_ALL)return[];if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,a=t,o=this.q0,B=this.q1,c=e.step(i),h=c>>3,d=c&7,p=-1,C=0;c!==Ct.EOF()&&(c=e.step(i+d),p=c>>3,C=c&7);let m=i===0?ne.emptyOpContext(-1,h):e.context(i);const I=new Set;for(;!(o.isEmpty()&&(s&ne.EMPTY_BEGIN_TEXT&&i!==0||(n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&i!==0));){if(i===0&&this.prog.numLb>0)for(let L=0;L<this.prog.lbStarts.length;L++)this.add(o,this.prog.lbStarts[L],i,this.matchcap,0,m);(i===0||n===H.UNANCHORED)&&i>=a&&this.add(o,this.prog.start,i,this.matchcap,0,m);const S=i+d;m=e.context(S);for(let L=0;L<o.size;L++){const x=o.densePcs[L],j=this.prog.inst[x],q=L*this.ncap;let W=!1;switch(j.op){case M.MATCH:if(n===H.ANCHOR_BOTH&&i!==e.endPos())break;I.add(j.arg);break;case M.RUNE:W=j.matchRune(h);break;case M.RUNE1:W=h===j.runes[0];break;case M.RUNE_ANY:W=!0;break;case M.RUNE_ANY_NOT_NL:W=h!==10;break;default:continue}W&&this.add(B,j.out,S,o.denseCaps,q,m)}if(o.clear(),d===0)break;i+=d,h=p,d=C,h!==-1&&(c=e.step(i+d),p=c>>3,C=c&7);const F=o;o=B,B=F}return B.clear(),Array.from(I).sort((S,F)=>S-F)}step(e,t,n,s,i,a,o,B){const c=this.re2.longest;for(let h=0;h<e.size;h++){const d=e.densePcs[h],p=h*this.ncap;if(c&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[p])continue;const C=this.prog.inst[d];let m=!1;switch(C.op){case M.MATCH:if(o===H.ANCHOR_BOTH&&!B)break;if(this.ncap>0&&(!c||!this.matched||this.matchcap[1]<n)){e.denseCaps[p+1]=n;for(let I=0;I<this.ncap;I++)this.matchcap[I]=e.denseCaps[p+I]}c||(e.size=0),this.matched=!0;break;case M.RUNE:m=C.matchRune(i);break;case M.RUNE1:m=i===C.runes[0];break;case M.RUNE_ANY:m=!0;break;case M.RUNE_ANY_NOT_NL:m=i!==10;break;default:continue}m&&this.add(t,C.out,s,e.denseCaps,p,a)}e.clear()}add(e,t,n,s,i,a){for(;;){if(t===0||e.contains(t))return;const o=e.add(t),B=this.prog.inst[t];switch(B.op){case M.FAIL:return;case M.ALT:case M.ALT_MATCH:this.add(e,B.out,n,s,i,a),t=B.arg;continue;case M.EMPTY_WIDTH:if(!(B.arg&~a)){t=B.out;continue}return;case M.NOP:t=B.out;continue;case M.CAPTURE:if(B.arg<this.ncap){const c=s[i+B.arg];s[i+B.arg]=n,this.add(e,B.out,n,s,i,a),s[i+B.arg]=c;return}else{t=B.out;continue}case M.LB_WRITE:this.lbTable[Math.abs(B.arg)]=n,t=B.out;continue;case M.LB_CHECK:if(B.arg>0){if(this.lbTable[B.arg]===n){t=B.out;continue}}else if(this.lbTable[-B.arg]!==n){t=B.out;continue}return;case M.MATCH:case M.RUNE:case M.RUNE1:case M.RUNE_ANY:case M.RUNE_ANY_NOT_NL:if(this.ncap>0){const c=o*this.ncap;for(let h=0;h<this.ncap;h++)e.denseCaps[c+h]=s[i+h]}return;default:throw new Qs("unhandled")}}}};const qc=r=>{let e=-2128831035;for(let t=0;t<r.length;t++)e^=r[t],e=Math.imul(e,16777619);return e},Fg=(r,e)=>{if(r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0};var Ng=class{constructor(r,e,t=[]){this.nfaStates=r,this.isMatch=e,this.matchIDs=t,this.nextLatin1=new Array(Y.MAX_LATIN1+1).fill(null),this.nextLatin1Anchored=new Array(Y.MAX_LATIN1+1).fill(null),this.transKeys=[],this.transVals=[],this.lastSeen=0}},gn,xg=(gn=class{constructor(e,t=8388608){this.prog=e,this.stateCache=new Map,this.stateCount=0,this.startState=null,this.stateLimit=Math.max(1,Math.floor(t/gn.STATE_MEMORY_ESTIMATE)),this.cacheClears=0,this.failed=!1,this.clock=0}computeClosure(e){const t=new Set,n=[...e];let s=!1;const i=[];for(;n.length>0;){const o=n.pop();if(t.has(o))continue;t.add(o);const B=this.prog.getInst(o);switch(B.op){case M.MATCH:s=!0,i.includes(B.arg)||i.push(B.arg);break;case M.ALT:case M.ALT_MATCH:n.push(B.out),n.push(B.arg);break;case M.NOP:case M.CAPTURE:n.push(B.out);break;case M.EMPTY_WIDTH:case M.LB_WRITE:case M.LB_CHECK:return null}}const a=Int32Array.from(t).sort();return i.sort((o,B)=>o-B),{pcs:a,isMatch:s,matchIDs:i}}getState(e){const t=this.computeClosure(e);if(!t)return null;const n=t.pcs,s=qc(n);let i=this.stateCache.get(s);if(i)for(let o=0;o<i.length;o++){const B=i[o];if(Fg(B.nfaStates,n))return B.lastSeen=++this.clock,B}else i=[],this.stateCache.set(s,i);if(this.failed)return null;if(this.stateCount>=this.stateLimit){if(this.cacheClears++,this.cacheClears>=gn.MAX_CACHE_CLEARS)return this.failed=!0,this.stateCache.clear(),this.stateCount=0,this.startState=null,null;this.evictCache(),i=this.stateCache.get(s),i||(i=[],this.stateCache.set(s,i))}const a=new Ng(n,t.isMatch,t.matchIDs);return a.lastSeen=++this.clock,i.push(a),this.stateCount++,a}evictCache(){const e=[];for(const a of this.stateCache.values())for(let o=0;o<a.length;o++)e.push(a[o]);e.sort((a,o)=>a.lastSeen-o.lastSeen);const t=Math.max(1,Math.floor(this.stateLimit/2)),n=e.length-t,s=e.slice(n),i=new Set(s);this.stateCache.clear(),this.stateCount=0;for(let a=0;a<s.length;a++){const o=s[a];o.nextLatin1.fill(null),o.nextLatin1Anchored.fill(null),o.transKeys.length=0,o.transVals.length=0;const B=qc(o.nfaStates);let c=this.stateCache.get(B);c||(c=[],this.stateCache.set(B,c)),c.push(o),this.stateCount++}this.startState&&!i.has(this.startState)&&(this.startState=null)}step(e,t,n){if(t<=Y.MAX_LATIN1)if(n===H.UNANCHORED){const a=e.nextLatin1[t];if(a!==null)return a}else{const a=e.nextLatin1Anchored[t];if(a!==null)return a}else{const a=t+(n===H.UNANCHORED?0:Y.MAX_RUNE+1),o=e.transKeys,B=o.length;for(let c=0;c<B;c++)if(o[c]===a)return e.transVals[c]}const s=[];for(let a=0;a<e.nfaStates.length;a++){const o=e.nfaStates[a],B=this.prog.getInst(o);M.isRuneOp(B.op)&&B.matchRune(t)&&s.push(B.out)}n===H.UNANCHORED&&s.push(this.prog.start);const i=this.getState(s);if(t<=Y.MAX_LATIN1)n===H.UNANCHORED?e.nextLatin1[t]=i:e.nextLatin1Anchored[t]=i;else{const a=t+(n===H.UNANCHORED?0:Y.MAX_RUNE+1);e.transKeys.push(a),e.transVals.push(i)}return i}match(e,t,n){if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return!1;if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let s=e.endPos(),i=this.startState;if(i.isMatch)if(n===H.ANCHOR_BOTH){if(t===s)return!0}else return!0;let a=t;for(;a<s;){const o=e.step(a),B=o>>3,c=o&7;if(c===0)break;if(i=n===H.UNANCHORED&&B<=Y.MAX_LATIN1&&i.nextLatin1[B]||this.step(i,B,n),i===null)return null;if(i.lastSeen=++this.clock,i.isMatch)if(n===H.ANCHOR_BOTH){if(a+c===s)return!0}else return!0;if(i.nfaStates.length===0&&n!==H.UNANCHORED)return!1;a+=c}return!1}matchSet(e,t,n){if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return[];if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let s=e.endPos(),i=this.startState;const a=new Set,o=(c,h)=>{c.isMatch&&(n===H.ANCHOR_BOTH?h===s&&c.matchIDs.forEach(d=>a.add(d)):c.matchIDs.forEach(d=>a.add(d)))};o(i,t);let B=t;for(;B<s;){const c=e.step(B),h=c>>3,d=c&7;if(d===0)break;if(i=n===H.UNANCHORED&&h<=Y.MAX_LATIN1&&i.nextLatin1[h]||this.step(i,h,n),i===null)return null;if(i.lastSeen=++this.clock,B+=d,o(i,B),i.nfaStates.length===0&&n!==H.UNANCHORED)break}return Array.from(a).sort((c,h)=>c-h)}},$(gn,"MAX_CACHE_CLEARS",5),$(gn,"STATE_MEMORY_ESTIMATE",838),gn);const Og=32,Lg=500,Uo=256,kg=256*1024;var Mg=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(Uo),this.jobArg=new Uint8Array(Uo),this.jobPos=new Int32Array(Uo),this.jobLen=0,this.visited=new Uint32Array(0)}reset(r,e,t){this.end=e,this.jobLen=0,this.ncap=t;const n=r.numInst()*(e+1)+Og-1>>>5;this.visited.length<n?this.visited=new Uint32Array(n):this.visited.fill(0,0,n),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(r,e){const t=r*(this.end+1)+e,n=t>>>5,s=1<<(t&31);return this.visited[n]&s?!1:(this.visited[n]|=s,!0)}push(r,e,t,n){if(r.prog.getInst(e).op!==M.FAIL&&(n||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){const s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;const a=new Uint8Array(s);a.set(this.jobArg),this.jobArg=a;const o=new Int32Array(s);o.set(this.jobPos),this.jobPos=o}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=n?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(r,e,t,n,s){const i=r.longest;for(this.push(r,t,n,!1);this.jobLen>0;){this.jobLen--;let a=this.jobPc[this.jobLen],o=this.jobArg[this.jobLen]===1,B=this.jobPos[this.jobLen],c=!0;for(;!(!c&&!this.shouldVisit(a,B));){c=!1;const h=r.prog.getInst(a);switch(h.op){case M.FAIL:throw new Qs("unexpected InstFail");case M.ALT:if(o){o=!1,a=h.arg;continue}else{this.push(r,a,B,!0),a=h.out;continue}case M.ALT_MATCH:{const d=r.prog.getInst(h.out);if(M.isRuneOp(d.op)){this.push(r,h.arg,B,!1),a=h.arg,B=this.end;continue}this.push(r,h.out,this.end,!1),a=h.out;continue}case M.RUNE:{const d=e.step(B);if(d===Ct.EOF()||!h.matchRune(d>>3))break;B+=d&7,a=h.out;continue}case M.RUNE1:{const d=e.step(B);if(d===Ct.EOF()||d>>3!==h.runes[0])break;B+=d&7,a=h.out;continue}case M.RUNE_ANY_NOT_NL:{const d=e.step(B);if(d===Ct.EOF()||d>>3===10)break;B+=d&7,a=h.out;continue}case M.RUNE_ANY:{const d=e.step(B);if(d===Ct.EOF())break;B+=d&7,a=h.out;continue}case M.CAPTURE:if(o){this.cap[h.arg]=B;break}else{h.arg<this.ncap&&(this.push(r,a,this.cap[h.arg],!0),this.cap[h.arg]=B),a=h.out;continue}case M.EMPTY_WIDTH:{const d=e.context(B);if(h.arg&~d)break;a=h.out;continue}case M.NOP:a=h.out;continue;case M.MATCH:{if(s===H.ANCHOR_BOTH&&B!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=B);const d=this.matchcap[1];if((d===-1||i&&B>0&&B>d)&&this.matchcap.set(this.cap),!i||B===this.end)return!0;break}case M.LB_WRITE:case M.LB_CHECK:throw new Qs("Backtracker cannot evaluate Lookbehind instructions");default:throw new Qs("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}};const Qi=[];var Wi=class Mh{static shouldBacktrack(e){return e.numInst()<=Lg}static maxBitStateLen(e){return Mh.shouldBacktrack(e)?Math.floor(kg/e.numInst()):0}static execute(e,t,n,s,i){const a=e.cond;if(a===ne.EMPTY_ALL||(s===H.ANCHOR_START||s===H.ANCHOR_BOTH)&&n!==0||a&ne.EMPTY_BEGIN_TEXT&&n!==0)return null;const o=Qi.length>0?Qi.pop():new Mg,B=t.endPos();o.reset(e.prog,B,i);let c=!1;if(a&ne.EMPTY_BEGIN_TEXT||s===H.ANCHOR_START||s===H.ANCHOR_BOTH)o.ncap>0&&(o.cap[0]=n),o.tryBacktrack(e,t,e.prog.start,n,s)&&(c=!0);else{let d=-1;for(;n<=B&&d!==0;n+=d){if(e.prefix.length>0){const C=t.index(e,n);if(C<0)break;n+=C}if(o.ncap>0&&(o.cap[0]=n),o.tryBacktrack(e,t,e.prog.start,n,s)){c=!0;break}const p=t.step(n);d=p===Ct.EOF()?0:p&7}}if(!c)return Qi.push(o),null;const h=i===0?[]:ne.toArray(o.matchcap.subarray(0,i));return Qi.push(o),h}},zc=class{constructor(r){this.sparse=new Uint32Array(r),this.dense=new Uint32Array(r),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(r){return r<this.sparse.length&&this.sparse[r]<this.size&&this.dense[this.sparse[r]]===r}insert(r){this.contains(r)||this.insertNew(r)}insertNew(r){r>=this.sparse.length||(this.sparse[r]=this.size,this.dense[this.size]=r,this.size++)}};const Vg=(r,e,t,n)=>{const s=r.length,i=e.length;let a=0,o=0;const B=[],c=[];let h=!0,d=-1;const p=C=>{const m=C?r:e,I=C?a:o,S=C?t:n;return d>0&&m[I]<=B[d]?!1:(B.push(m[I],m[I+1]),C?a+=2:o+=2,d+=2,c.push(S),!0)};for(;a<s||o<i;)if(o>=i?h=p(!0):a>=s||e[o]<r[a]?h=p(!1):h=p(!0),!h)return null;return{merged:B,next:c}};var Gg=class{constructor(r){this.start=r.start,this.numCap=r.numCap,this.inst=new Array(r.inst.length);for(let e=0;e<r.inst.length;e++){const t=r.inst[e],n=new M(t.op);n.out=t.out,n.arg=t.arg,n.runes=t.runes?t.runes.slice():[],n.next=null,this.inst[e]=n}}};const Hg=r=>{const e=new Gg(r);for(let t=0;t<e.inst.length;t++){const n=e.inst[t];if(n.op!==M.ALT&&n.op!==M.ALT_MATCH)continue;let s="out",i="arg",a=e.inst[n[i]];if(a.op!==M.ALT&&a.op!==M.ALT_MATCH&&(s="arg",i="out",a=e.inst[n[i]],a.op!==M.ALT&&a.op!==M.ALT_MATCH))continue;const o=e.inst[n[s]];if(o.op===M.ALT||o.op===M.ALT_MATCH)continue;let B="out",c="arg",h=!1;a.out===t?h=!0:a.arg===t&&(h=!0,B="arg",c="out"),h&&(a[B]=n[s]),n[s]===a[B]&&(n[i]=a[c])}return e},Ug=r=>{if(r.inst.length>=1e3)return null;const e=new zc(r.inst.length),t=new zc(r.inst.length),n=new Array(r.inst.length),s=new Array(r.inst.length).fill(!1),i=a=>{let o=!0;const B=r.inst[a];if(t.contains(a))return!0;switch(t.insert(a),B.op){case M.ALT:case M.ALT_MATCH:{o=i(B.out)&&i(B.arg);let c=s[B.out],h=s[B.arg];if(c&&h)return!1;if(h){const m=B.out;B.out=B.arg,B.arg=m;const I=c;c=h,h=I}c&&(s[a]=!0,B.op=M.ALT_MATCH);const d=n[B.out]||[],p=n[B.arg]||[],C=Vg(d,p,B.out,B.arg);if(!C)return!1;n[a]=C.merged,B.next=new Uint32Array(C.next);break}case M.CAPTURE:case M.EMPTY_WIDTH:case M.NOP:o=i(B.out),s[a]=s[B.out],n[a]=n[B.out]?n[B.out].slice():[],B.next=new Uint32Array(Math.floor(n[a].length/2)+1).fill(B.out);break;case M.MATCH:case M.FAIL:s[a]=B.op===M.MATCH;break;case M.RUNE:{if(s[a]=!1,B.next&&B.next.length>0)break;if(e.insert(B.out),!B.runes||B.runes.length===0){n[a]=[],B.next=new Uint32Array([B.out]);break}let c=[];if(B.runes.length===1&&B.arg&H.FOLD_CASE){const h=B.runes[0];c.push(h,h);for(let d=Y.simpleFold(h);d!==h;d=Y.simpleFold(d))c.push(d,d);c.sort((d,p)=>d-p)}else for(let h=0;h<B.runes.length;h++)c.push(B.runes[h]);n[a]=c,B.next=new Uint32Array(Math.floor(c.length/2)+1).fill(B.out),B.op=M.RUNE;break}case M.RUNE1:{if(s[a]=!1,B.next&&B.next.length>0)break;e.insert(B.out);let c=[];if(B.arg&H.FOLD_CASE){const h=B.runes[0];c.push(h,h);for(let d=Y.simpleFold(h);d!==h;d=Y.simpleFold(d))c.push(d,d);c.sort((d,p)=>d-p)}else c.push(B.runes[0],B.runes[0]);n[a]=c,B.next=new Uint32Array(Math.floor(c.length/2)+1).fill(B.out),B.op=M.RUNE;break}case M.RUNE_ANY:if(s[a]=!1,B.next&&B.next.length>0)break;e.insert(B.out),n[a]=[0,Y.MAX_RUNE],B.next=new Uint32Array([B.out]);break;case M.RUNE_ANY_NOT_NL:if(s[a]=!1,B.next&&B.next.length>0)break;e.insert(B.out),n[a]=[0,9,11,Y.MAX_RUNE],B.next=new Uint32Array(Math.floor(n[a].length/2)+1).fill(B.out);break}return o};for(e.clear(),e.insert(r.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let a=0;a<r.inst.length;a++)n[a]&&(r.inst[a].runes=n[a]);return r},jg=(r,e)=>{for(let t=0;t<e.inst.length;t++){const n=e.inst[t];switch(n.op){case M.ALT:case M.ALT_MATCH:case M.RUNE:break;case M.CAPTURE:case M.EMPTY_WIDTH:case M.NOP:case M.MATCH:case M.FAIL:r.inst[t].next=null;break;case M.RUNE1:case M.RUNE_ANY:case M.RUNE_ANY_NOT_NL:r.inst[t].next=null,r.inst[t].op=n.op,r.inst[t].runes=n.runes?n.runes.slice():[];break}}};var Kc=class Vh{static compile(e){if(e.start===0||e.numLb>0)return null;const t=e.inst[e.start];if(t.op!==M.EMPTY_WIDTH||!(t.arg&ne.EMPTY_BEGIN_TEXT))return null;let n=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===M.ALT||e.inst[i].op===M.ALT_MATCH){n=!0;break}for(let i=0;i<e.inst.length;i++){const a=e.inst[i],o=e.inst[a.out].op;switch(a.op){case M.ALT:case M.ALT_MATCH:if(o===M.MATCH||e.inst[a.arg].op===M.MATCH)return null;break;case M.EMPTY_WIDTH:if(o===M.MATCH){if((a.arg&ne.EMPTY_END_TEXT)===ne.EMPTY_END_TEXT)continue;return null}break;default:if(o===M.MATCH&&n)return null;break}}let s=Hg(e);return s=Ug(s),s!==null&&jg(s,e),s}static next(e,t){const n=e.matchRunePos(t);return n>=0?e.next[n]:e.op===M.ALT_MATCH?e.out:0}static execute(e,t,n,s,i){const a=e.onepass;if(!a)return null;const o=new Int32Array(i).fill(-1);let B=!1,c=t.step(n),h=c>>3,d=c&7,p=Ct.EOF(),C=-1,m=0;c!==Ct.EOF()&&(p=t.step(n+d),p!==Ct.EOF()&&(C=p>>3,m=p&7));let I=n===0?ne.emptyOpContext(-1,h):t.context(n),S=a.start,F;for(;;){switch(F=a.inst[S],S=F.out,F.op){case M.MATCH:return s===H.ANCHOR_BOTH&&n!==t.endPos()?null:(B=!0,o.length>0&&(o[0]=0,o[1]=n),i===0?[]:ne.toArray(o));case M.RUNE:if(!F.matchRune(h))return null;break;case M.RUNE1:if(h!==F.runes[0])return null;break;case M.RUNE_ANY:break;case M.RUNE_ANY_NOT_NL:if(h===10)return null;break;case M.ALT:case M.ALT_MATCH:S=Vh.next(F,h);continue;case M.FAIL:return null;case M.NOP:continue;case M.EMPTY_WIDTH:if(F.arg&~I)return null;continue;case M.CAPTURE:F.arg<o.length&&(o[F.arg]=n);continue;default:throw new Qs("bad inst")}if(d===0)break;I=ne.emptyOpContext(h,C),n+=d,h=C,d=m,h!==-1&&(p=t.step(n+d),p!==Ct.EOF()?(C=p>>3,m=p&7):(C=-1,m=0))}return B?i===0?[]:ne.toArray(o):null}},re,P=(re=class{static isPseudoOp(e){return e>=re.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===k.CODES.get("-")?"\\":""}static fromRegexp(e){const t=new re(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=re.emptySubs(),this.runes=[],this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=re.emptySubs(),this.runes=[],this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case re.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case re.Op.EMPTY_MATCH:e+="(?:)";break;case re.Op.STAR:case re.Op.PLUS:case re.Op.QUEST:case re.Op.REPEAT:{const t=this.subs[0];switch(t.op>re.Op.CAPTURE||t.op===re.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case re.Op.STAR:e+="*";break;case re.Op.PLUS:e+="+";break;case re.Op.QUEST:e+="?";break;case re.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}";break}this.flags&H.NON_GREEDY&&(e+="?");break}case re.Op.CONCAT:for(let t of this.subs)t.op===re.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case re.Op.ALTERNATE:{let t="";for(let n of this.subs)e+=t,t="|",e+=n.appendTo();break}case re.Op.LITERAL:this.flags&H.FOLD_CASE&&(e+="(?i:");for(let t of this.runes)e+=ne.escapeRune(t);this.flags&H.FOLD_CASE&&(e+=")");break;case re.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case re.Op.ANY_CHAR:e+="(?s:.)";break;case re.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case re.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case re.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==re.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case re.Op.BEGIN_TEXT:e+="\\A";break;case re.Op.END_TEXT:this.flags&H.WAS_DOLLAR?e+="(?-m:$)":e+="\\z";break;case re.Op.BEGIN_LINE:e+="^";break;case re.Op.END_LINE:e+="$";break;case re.Op.WORD_BOUNDARY:e+="\\b";break;case re.Op.NO_WORD_BOUNDARY:e+="\\B";break;case re.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===Y.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){const n=this.runes[t]+1,s=this.runes[t+1]-1;e+=re.quoteIfHyphen(n),e+=ne.escapeRune(n),n!==s&&(e+="-",e+=re.quoteIfHyphen(s),e+=ne.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){const n=this.runes[t],s=this.runes[t+1];e+=re.quoteIfHyphen(n),e+=ne.escapeRune(n),n!==s&&(e+="-",e+=re.quoteIfHyphen(s),e+=ne.escapeRune(s))}e+="]";break;default:e+=this.op;break}return e}maxCap(){let e=0;if(this.op===re.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){const n=t.maxCap();e<n&&(e=n)}return e}equals(e){if(!(e!==null&&e instanceof re)||this.op!==e.op)return!1;switch(this.op){case re.Op.END_TEXT:if((this.flags&H.WAS_DOLLAR)!==(e.flags&H.WAS_DOLLAR))return!1;break;case re.Op.LITERAL:case re.Op.CHAR_CLASS:if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case re.Op.ALTERNATE:case re.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case re.Op.STAR:case re.Op.PLUS:case re.Op.QUEST:if((this.flags&H.NON_GREEDY)!==(e.flags&H.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case re.Op.REPEAT:if((this.flags&H.NON_GREEDY)!==(e.flags&H.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case re.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case re.Op.PLB:case re.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1;break}return!0}},$(re,"Op",kh(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),re),Qc=class{constructor(r){this.next=[Object.create(null)],this.fail=[0],this.match=[!1];for(const t of r){let n=0;for(let s=0;s<t.length;s++){const i=t[s];i in this.next[n]||(this.next.push(Object.create(null)),this.fail.push(0),this.match.push(!1),this.next[n][i]=this.next.length-1),n=this.next[n][i]}this.match[n]=!0}const e=[];for(const t in this.next[0])if(Object.prototype.hasOwnProperty.call(this.next[0],t)){const n=this.next[0][t];this.fail[n]=0,e.push(n)}for(;e.length>0;){const t=e.shift();for(const n in this.next[t])if(Object.prototype.hasOwnProperty.call(this.next[t],n)){const s=this.next[t][n];let i=this.fail[t];for(;i!==0&&!(n in this.next[i]);)i=this.fail[i];n in this.next[i]?this.fail[s]=this.next[i][n]:this.fail[s]=0,this.match[s]=this.match[s]||this.match[this.fail[s]],e.push(s)}}}searchUTF16(r,e,t){let n=0;for(let s=e;s<t;s++){const i=r.charCodeAt(s);for(;n!==0&&!(i in this.next[n]);)n=this.fail[n];if(i in this.next[n]&&(n=this.next[n][i]),this.match[n])return!0}return!1}searchUTF8(r,e,t){let n=0;for(let s=e;s<t;s++){const i=r[s];for(;n!==0&&!(i in this.next[n]);)n=this.fail[n];if(i in this.next[n]&&(n=this.next[n][i]),this.match[n])return!0}return!1}},on,ye=(on=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.ac16=null,this.ac8=null}eval(e,t){switch(this.type){case on.Type.NONE:return!0;case on.Type.EXACT:return e.hasString(this,t);case on.Type.AND:for(let n=0;n<this.subs.length;n++)if(!this.subs[n].eval(e,t))return!1;return!0;case on.Type.OR:if(this.ac16&&this.ac8)return e.hasAnyString(this,t);for(let n=0;n<this.subs.length;n++)if(this.subs[n].eval(e,t))return!0;return!1;default:return!0}}},$(on,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),on),$g=class pn{static build(e){const t=pn.fromRegexp(e);return pn.simplify(t)}static fromRegexp(e){if(!e)return new ye(ye.Type.NONE);switch(e.op){case P.Op.PLB:case P.Op.NLB:case P.Op.NO_MATCH:case P.Op.EMPTY_MATCH:case P.Op.BEGIN_LINE:case P.Op.END_LINE:case P.Op.BEGIN_TEXT:case P.Op.END_TEXT:case P.Op.WORD_BOUNDARY:case P.Op.NO_WORD_BOUNDARY:case P.Op.CHAR_CLASS:case P.Op.ANY_CHAR_NOT_NL:case P.Op.ANY_CHAR:return new ye(ye.Type.NONE);case P.Op.LITERAL:{if(e.runes.length===0||e.flags&H.FOLD_CASE)return new ye(ye.Type.NONE);const t=new ye(ye.Type.EXACT);let n="";for(let s=0;s<e.runes.length;s++)n+=String.fromCodePoint(e.runes[s]);return t.str=n,t.bytes=ne.stringToUtf8ByteArray(t.str),t}case P.Op.CAPTURE:case P.Op.PLUS:return pn.fromRegexp(e.subs[0]);case P.Op.REPEAT:return e.min>=1?pn.fromRegexp(e.subs[0]):new ye(ye.Type.NONE);case P.Op.CONCAT:{const t=new ye(ye.Type.AND);for(const n of e.subs)t.subs.push(pn.fromRegexp(n));return t}case P.Op.ALTERNATE:{const t=new ye(ye.Type.OR);for(const n of e.subs)t.subs.push(pn.fromRegexp(n));return t}default:return new ye(ye.Type.NONE)}}static simplify(e){if(e.type===ye.Type.EXACT||e.type===ye.Type.NONE)return e;if(e.type===ye.Type.AND){const t=[];for(const n of e.subs){const s=pn.simplify(n);if(s.type!==ye.Type.NONE)if(s.type===ye.Type.AND)for(let i=0;i<s.subs.length;i++)t.push(s.subs[i]);else t.push(s)}return t.length===0?new ye(ye.Type.NONE):t.length===1?t[0]:(e.subs=t,e)}if(e.type===ye.Type.OR){const t=[];for(const a of e.subs){const o=pn.simplify(a);if(o.type===ye.Type.NONE)return new ye(ye.Type.NONE);if(o.type===ye.Type.OR)for(let B=0;B<o.subs.length;B++)t.push(o.subs[B]);else t.push(o)}if(t.length===0)return new ye(ye.Type.NONE);if(t.length===1)return t[0];const n=new Set,s=[];for(const a of t)a.type===ye.Type.EXACT?n.has(a.str)||(n.add(a.str),s.push(a)):s.push(a);e.subs=s;let i=!0;for(const a of s)if(a.type!==ye.Type.EXACT){i=!1;break}return i&&s.length>1&&(e.ac16=new Qc(s.map(a=>{const o=[];for(let B=0;B<a.str.length;B++)o.push(a.str.charCodeAt(B));return o})),e.ac8=new Qc(s.map(a=>a.bytes))),e}return e}},Ot=class{constructor(r=0,e=0){this.head=r,this.tail=e}},Jg=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0}getInst(r){return this.inst[r]}numInst(){return this.inst.length}addInst(r){this.inst.push(new M(r))}skipNop(r){let e=this.inst[r];for(;e.op===M.NOP||e.op===M.CAPTURE;)e=this.inst[r],r=e.out;return e}prefix(){let r="",e=this.skipNop(this.start);if(!M.isRuneOp(e.op)||e.runes.length!==1)return[e.op===M.MATCH,r];for(;M.isRuneOp(e.op)&&e.runes.length===1&&!(e.arg&H.FOLD_CASE);)r+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===M.MATCH,r]}startCond(){let r=0,e=this.start;e:for(;;){const t=this.inst[e];switch(t.op){case M.EMPTY_WIDTH:r|=t.arg;break;case M.FAIL:return-1;case M.CAPTURE:case M.NOP:break;default:break e}e=t.out}return r}patch(r,e){let t=r.head;for(;t!==0;){const n=this.inst[t>>1];t&1?(t=n.arg,n.arg=e):(t=n.out,n.out=e)}}append(r,e){if(r.head===0)return e;if(e.head===0)return r;const t=this.inst[r.tail>>1];return r.tail&1?t.arg=e.head:t.out=e.head,new Ot(r.head,e.tail)}toString(){let r="";for(let e=0;e<this.inst.length;e++){const t=r.length;r+=e,e===this.start&&(r+="*"),r+="        ".substring(r.length-t),r+=this.inst[e],r+=`
`}return r}},Yi=class{constructor(r=0,e=new Ot,t=!1){this.i=r,this.out=e,this.nullable=t}},qg=class zr{static ANY_RUNE_NOT_NL(){return[0,k.CODES.get(`
`)-1,k.CODES.get(`
`)+1,Y.MAX_RUNE]}static ANY_RUNE(){return[0,Y.MAX_RUNE]}static compileRegexp(e){const t=new zr,n=t.compile(e);return t.prog.patch(n.out,t.newInst(M.MATCH).i),t.prog.start=n.i,t.prog}static compileSet(e){const t=new zr;if(e.length===0)return t.prog.start=t.newInst(M.FAIL).i,t.prog;let n=[];for(let i=0;i<e.length;i++){const a=t.compile(e[i]),o=t.newInst(M.MATCH);t.prog.getInst(o.i).arg=i,t.prog.patch(a.out,o.i),n.push(a.i)}let s=n[0];for(let i=1;i<n.length;i++){const a=t.newInst(M.ALT),o=t.prog.getInst(a.i);o.out=s,o.arg=n[i],s=a.i}return t.prog.start=s,t.prog}constructor(){this.prog=new Jg,this.newInst(M.FAIL)}newInst(e){return this.prog.addInst(e),new Yi(this.prog.numInst()-1,new Ot,!0)}nop(){const e=this.newInst(M.NOP);return e.out=new Ot(e.i<<1,e.i<<1),e}fail(){return new Yi}cap(e){const t=this.newInst(M.CAPTURE);return t.out=new Ot(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?this.fail():(this.prog.patch(e.out,t.i),new Yi(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;const n=this.newInst(M.ALT),s=this.prog.getInst(n.i);return s.out=e.i,s.arg=t.i,n.out=this.prog.append(e.out,t.out),n.nullable=e.nullable||t.nullable,n}loop(e,t){const n=this.newInst(M.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new Ot(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new Ot(n.i<<1|1,n.i<<1|1)),this.prog.patch(e.out,n.i),n}quest(e,t){const n=this.newInst(M.ALT),s=this.prog.getInst(n.i);return t?(s.arg=e.i,n.out=new Ot(n.i<<1,n.i<<1)):(s.out=e.i,n.out=new Ot(n.i<<1|1,n.i<<1|1)),n.out=this.prog.append(n.out,e.out),n}star(e,t){return e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return new Yi(e.i,this.loop(e,t).out,e.nullable)}empty(e){const t=this.newInst(M.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new Ot(t.i<<1,t.i<<1),t}rune(e,t){const n=this.newInst(M.RUNE);n.nullable=!1;const s=this.prog.getInst(n.i);return s.runes=e,t&=H.FOLD_CASE,(e.length!==1||Y.simpleFold(e[0])===e[0])&&(t&=-2),s.arg=t,n.out=new Ot(n.i<<1,n.i<<1),!(t&H.FOLD_CASE)&&e.length===1||e.length===2&&e[0]===e[1]?s.op=M.RUNE1:e.length===2&&e[0]===0&&e[1]===Y.MAX_RUNE?s.op=M.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===k.CODES.get(`
`)-1&&e[2]===k.CODES.get(`
`)+1&&e[3]===Y.MAX_RUNE&&(s.op=M.RUNE_ANY_NOT_NL),n}lookBehind(e,t){const n=this.newInst(M.LB_WRITE);this.prog.getInst(n.i).arg=t;const s=this.rune(zr.ANY_RUNE(),0),i=this.star(s,!0),a=this.cat(i,e);this.prog.patch(a.out,n.i);const o=this.newInst(M.LB_CHECK);return this.prog.getInst(o.i).arg=t,this.prog.lbStarts.push(a.i),Math.abs(t)>this.prog.numLb&&(this.prog.numLb=Math.abs(t)),o.out=new Ot(o.i<<1,o.i<<1),o}compile(e){switch(e.op){case P.Op.NO_MATCH:return this.fail();case P.Op.EMPTY_MATCH:return this.nop();case P.Op.LITERAL:if(e.runes.length===0)return this.nop();{let t=null;for(let n of e.runes){const s=this.rune([n],e.flags);t=t===null?s:this.cat(t,s)}return t}case P.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case P.Op.ANY_CHAR_NOT_NL:return this.rune(zr.ANY_RUNE_NOT_NL(),0);case P.Op.ANY_CHAR:return this.rune(zr.ANY_RUNE(),0);case P.Op.BEGIN_LINE:return this.empty(ne.EMPTY_BEGIN_LINE);case P.Op.END_LINE:return this.empty(ne.EMPTY_END_LINE);case P.Op.BEGIN_TEXT:return this.empty(ne.EMPTY_BEGIN_TEXT);case P.Op.END_TEXT:return this.empty(ne.EMPTY_END_TEXT);case P.Op.WORD_BOUNDARY:return this.empty(ne.EMPTY_WORD_BOUNDARY);case P.Op.NO_WORD_BOUNDARY:return this.empty(ne.EMPTY_NO_WORD_BOUNDARY);case P.Op.PLB:case P.Op.NLB:return this.lookBehind(this.compile(e.subs[0]),e.lb);case P.Op.CAPTURE:{const t=this.cap(e.cap<<1),n=this.compile(e.subs[0]),s=this.cap(e.cap<<1|1);return this.cat(this.cat(t,n),s)}case P.Op.STAR:return this.star(this.compile(e.subs[0]),(e.flags&H.NON_GREEDY)!==0);case P.Op.PLUS:return this.plus(this.compile(e.subs[0]),(e.flags&H.NON_GREEDY)!==0);case P.Op.QUEST:return this.quest(this.compile(e.subs[0]),(e.flags&H.NON_GREEDY)!==0);case P.Op.CONCAT:if(e.subs.length===0)return this.nop();{let t=null;for(let n of e.subs){const s=this.compile(n);t=t===null?s:this.cat(t,s)}return t}case P.Op.ALTERNATE:if(e.subs.length===0)return this.nop();{let t=null;for(let n of e.subs){const s=this.compile(n);t=t===null?s:this.alt(t,s)}return t}default:throw new Ag("regexp: unhandled case in compile")}}},zg=class St{static simplify(e){if(e===null)return null;switch(e.op){case P.Op.PLB:case P.Op.NLB:case P.Op.CAPTURE:{const t=St.simplify(e.subs[0]);if(t!==e.subs[0]){const n=P.fromRegexp(e);return n.runes=[],n.subs=[t],n}return e}case P.Op.CONCAT:case P.Op.ALTERNATE:{const t=[];let n=!1;for(let s=0;s<e.subs.length;s++){const i=e.subs[s],a=St.simplify(i);if(a!==i&&(n=!0),e.op===P.Op.CONCAT){if(a.op===P.Op.NO_MATCH)return new P(P.Op.NO_MATCH);if(a.op===P.Op.EMPTY_MATCH){n=!0;continue}if(a.op===P.Op.CONCAT){n=!0;for(let o=0;o<a.subs.length;o++)t.push(a.subs[o]);continue}}else if(e.op===P.Op.ALTERNATE){if(a.op===P.Op.NO_MATCH){n=!0;continue}if(a.op===P.Op.ALTERNATE){n=!0;for(let o=0;o<a.subs.length;o++)t.push(a.subs[o]);continue}}t.push(a)}if(n){if(t.length===0)return new P(e.op===P.Op.CONCAT?P.Op.EMPTY_MATCH:P.Op.NO_MATCH);if(t.length===1)return t[0];const s=P.fromRegexp(e);return s.runes=[],s.subs=t,s}return e}case P.Op.CHAR_CLASS:return e.runes===null?e:e.runes.length===0?new P(P.Op.NO_MATCH):e.runes.length===2&&e.runes[0]===0&&e.runes[1]===Y.MAX_RUNE?new P(P.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===k.CODES.get(`
`)-1&&e.runes[2]===k.CODES.get(`
`)+1&&e.runes[3]===Y.MAX_RUNE?new P(P.Op.ANY_CHAR_NOT_NL):e;case P.Op.STAR:case P.Op.PLUS:case P.Op.QUEST:{const t=St.simplify(e.subs[0]);return St.simplify1(e.op,e.flags,t,e)}case P.Op.REPEAT:{if(e.min===0&&e.max===0)return new P(P.Op.EMPTY_MATCH);const t=St.simplify(e.subs[0]);if(e.max===-1){if(e.min===0)return St.simplify1(P.Op.STAR,e.flags,t,null);if(e.min===1)return St.simplify1(P.Op.PLUS,e.flags,t,null);const s=new P(P.Op.CONCAT),i=[];for(let a=0;a<e.min-1;a++)i.push(t);return i.push(St.simplify1(P.Op.PLUS,e.flags,t,null)),s.subs=i.slice(0),St.simplify(s)}if(e.min===1&&e.max===1)return t;let n=null;if(e.min>0){n=[];for(let s=0;s<e.min;s++)n.push(t)}if(e.max>e.min){let s=St.simplify1(P.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++){const a=new P(P.Op.CONCAT);a.subs=[t,s],s=St.simplify1(P.Op.QUEST,e.flags,a,null)}if(n===null)return s;n.push(s)}if(n!==null){const s=new P(P.Op.CONCAT);return s.subs=n.slice(0),St.simplify(s)}return new P(P.Op.NO_MATCH)}}return e}static simplify1(e,t,n,s){if(n.op===P.Op.EMPTY_MATCH)return n;if(n.op===P.Op.NO_MATCH)return e===P.Op.PLUS?n:new P(P.Op.EMPTY_MATCH);if(e===n.op&&(t&H.NON_GREEDY)===(n.flags&H.NON_GREEDY))return n;if(s!==null&&s.op===e&&(s.flags&H.NON_GREEDY)===(t&H.NON_GREEDY)&&n===s.subs[0])return s;const i=new P(e);return i.flags=t,i.subs=[n],i}},pe=class{constructor(r,e){this.sign=r,this.cls=e}};const Wc=[48,57],Yc=[9,10,12,13,32,32],Xc=[48,57,65,90,95,95,97,122],Zc=new Map([["\\d",new pe(1,Wc)],["\\D",new pe(-1,Wc)],["\\s",new pe(1,Yc)],["\\S",new pe(-1,Yc)],["\\w",new pe(1,Xc)],["\\W",new pe(-1,Xc)]]),eu=[48,57,65,90,97,122],tu=[65,90,97,122],nu=[0,127],ru=[9,9,32,32],su=[0,31,127,127],iu=[48,57],au=[33,126],ou=[97,122],lu=[32,126],Bu=[33,47,58,64,91,96,123,126],cu=[9,13,32,32],uu=[65,90],hu=[48,57,65,90,95,95,97,122],du=[48,57,65,70,97,102],fu=new Map([["[:alnum:]",new pe(1,eu)],["[:^alnum:]",new pe(-1,eu)],["[:alpha:]",new pe(1,tu)],["[:^alpha:]",new pe(-1,tu)],["[:ascii:]",new pe(1,nu)],["[:^ascii:]",new pe(-1,nu)],["[:blank:]",new pe(1,ru)],["[:^blank:]",new pe(-1,ru)],["[:cntrl:]",new pe(1,su)],["[:^cntrl:]",new pe(-1,su)],["[:digit:]",new pe(1,iu)],["[:^digit:]",new pe(-1,iu)],["[:graph:]",new pe(1,au)],["[:^graph:]",new pe(-1,au)],["[:lower:]",new pe(1,ou)],["[:^lower:]",new pe(-1,ou)],["[:print:]",new pe(1,lu)],["[:^print:]",new pe(-1,lu)],["[:punct:]",new pe(1,Bu)],["[:^punct:]",new pe(-1,Bu)],["[:space:]",new pe(1,cu)],["[:^space:]",new pe(-1,cu)],["[:upper:]",new pe(1,uu)],["[:^upper:]",new pe(-1,uu)],["[:word:]",new pe(1,hu)],["[:^word:]",new pe(-1,hu)],["[:xdigit:]",new pe(1,du)],["[:^xdigit:]",new pe(-1,du)]]);var On=class kn{static charClassToString(e,t){let n="[";for(let s=0;s<t;s+=2){s>0&&(n+=" ");const i=e[s],a=e[s+1];i===a?n+=`0x${i.toString(16)}`:n+=`0x${i.toString(16)}-0x${a.toString(16)}`}return n+="]",n}static cmp(e,t,n,s){const i=e[t]-n;return i!==0?i:s-e[t+1]}static qsortIntPair(e,t,n){const s=((t+n)/2|0)&-2,i=e[s],a=e[s+1];let o=t,B=n;for(;o<=B;){for(;o<n&&kn.cmp(e,o,i,a)<0;)o+=2;for(;B>t&&kn.cmp(e,B,i,a)>0;)B-=2;if(o<=B){if(o!==B){let c=e[o];e[o]=e[B],e[B]=c,c=e[o+1],e[o+1]=e[B+1],e[B+1]=c}o+=2,B-=2}}t<B&&kn.qsortIntPair(e,t,B),o<n&&kn.qsortIntPair(e,o,n)}constructor(e=ne.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;kn.qsortIntPair(this.r,0,this.len-2);let e=2;for(let t=2;t<this.len;t+=2){const n=this.r[t],s=this.r[t+1];if(n<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=n,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return t&H.FOLD_CASE?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let n=2;n<=4;n+=2)if(this.len>=n){const s=this.r[this.len-n],i=this.r[this.len-n+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-n]=e),t>i&&(this.r[this.len-n+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=Y.MIN_FOLD&&t>=Y.MAX_FOLD)return this.appendRange(e,t);if(t<Y.MIN_FOLD||e>Y.MAX_FOLD)return this.appendRange(e,t);e<Y.MIN_FOLD&&(this.appendRange(e,Y.MIN_FOLD-1),e=Y.MIN_FOLD),t>Y.MAX_FOLD&&(this.appendRange(Y.MAX_FOLD+1,t),t=Y.MAX_FOLD);for(let n=e;n<=t;n++){this.appendRange(n,n);for(let s=Y.simpleFold(n);s!==n;s=Y.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let n=0;n<e.length;n+=2){const s=e[n],i=e[n+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=Y.MAX_RUNE&&this.appendRange(t,Y.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){const n=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(n,s);continue}for(let a=n;a<=s;a+=i)this.appendRange(a,a)}return this}appendNegatedTable(e){let t=0;for(let n=0;n<e.length;++n){const s=e.getLo(n),i=e.getHi(n),a=e.getStride(n);if(a===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let o=s;o<=i;o+=a)t<=o-1&&this.appendRange(t,o-1),t=o+1}return t<=Y.MAX_RUNE&&this.appendRange(t,Y.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let n=0;n<this.len;n+=2){const s=this.r[n],i=this.r[n+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=Y.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=Y.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let n=e.cls;return t&&(n=new kn().appendFoldedClass(n).cleanClass().toArray()),this.appendClassWithSign(n,e.sign)}toString(){return kn.charClassToString(this.r,this.len)}},Kg=class{constructor(r){this.str=r,this.position=0}pos(){return this.position}rewindTo(r){this.position=r}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(r){this.position+=r}skipString(r){this.position+=r.length}pop(){const r=this.str.codePointAt(this.position);return this.position+=ne.charCount(r),r}lookingAt(r){return this.str.startsWith(r,this.position)}rest(){return this.str.substring(this.position)}from(r){return this.str.substring(r,this.position)}toString(){return this.rest()}},J,Qg=(J=class{static unicodeTable(e){return e==="Any"?{tab:J.ANY_TABLE,fold:J.ANY_TABLE,sign:1}:e==="Ascii"?{tab:J.ASCII_TABLE,fold:J.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:Et.CATEGORIES.get("Cn"),fold:Et.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:Et.CATEGORIES.get("LC"),fold:Et.FOLD_CATEGORIES.get("LC"),sign:1}:Et.CATEGORIES.has(e)?{tab:Et.CATEGORIES.get(e),fold:Et.FOLD_CATEGORIES.get(e),sign:1}:Et.SCRIPTS.has(e)?{tab:Et.SCRIPTS.get(e),fold:Et.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<Y.MIN_FOLD||e>Y.MAX_FOLD)return e;let t=e;const n=e;for(e=Y.simpleFold(e);e!==n;e=Y.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===P.Op.EMPTY_MATCH)return null;if(e.op===P.Op.CONCAT&&e.subs.length>0){const t=e.subs[0];return t.op===P.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){const n=new P(P.Op.LITERAL);return n.flags=t,n.runes=ne.stringToRunes(e),n}static parse(e,t){return new J(e,t).parseInternal()}static parseRepeat(e){const t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);const n=J.parseInt(e);if(n===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=n;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=J.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),n<0||n>1e3||s===-2||s>1e3||s>=0&&n>s)throw new Te(J.ERR_INVALID_REPEAT_SIZE,e.from(t));return n<<16|s&Y.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){const n=e.codePointAt(t);if(n!==k.CODES.get("_")&&!ne.isalnum(n))return!1}return!0}static parseInt(e){const t=e.pos();for(;e.more()&&e.peek()>=k.CODES.get("0")&&e.peek()<=k.CODES.get("9");)e.skip(1);const n=e.from(t);return n.length===0||n.length>1&&n.codePointAt(0)===k.CODES.get("0")?-1:n.length>8?-2:parseInt(n,10)}static isCharClass(e){return e.op===P.Op.LITERAL&&e.runes.length===1||e.op===P.Op.CHAR_CLASS||e.op===P.Op.ANY_CHAR_NOT_NL||e.op===P.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case P.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case P.Op.CHAR_CLASS:for(let n=0;n<e.runes.length;n+=2)if(e.runes[n]<=t&&t<=e.runes[n+1])return!0;return!1;case P.Op.ANY_CHAR_NOT_NL:return t!==k.CODES.get(`
`);case P.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case P.Op.ANY_CHAR:break;case P.Op.ANY_CHAR_NOT_NL:J.matchRune(t,k.CODES.get(`
`))&&(e.op=P.Op.ANY_CHAR);break;case P.Op.CHAR_CLASS:t.op===P.Op.LITERAL?e.runes=new On(e.runes).appendLiteral(t.runes[0],t.flags).toArray():e.runes=new On(e.runes).appendClass(t.runes).toArray();break;case P.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=P.Op.CHAR_CLASS,e.runes=new On().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toArray();break}}static parseEscape(e){const t=e.pos();if(e.skip(1),!e.more())throw new Te(J.ERR_TRAILING_BACKSLASH);let n=e.pop();e:switch(n){case k.CODES.get("1"):case k.CODES.get("2"):case k.CODES.get("3"):case k.CODES.get("4"):case k.CODES.get("5"):case k.CODES.get("6"):case k.CODES.get("7"):if(!e.more()||e.peek()<k.CODES.get("0")||e.peek()>k.CODES.get("7"))break;case k.CODES.get("0"):{let s=n-k.CODES.get("0");for(let i=1;i<3&&!(!e.more()||e.peek()<k.CODES.get("0")||e.peek()>k.CODES.get("7"));i++)s=s*8+e.peek()-k.CODES.get("0"),e.skip(1);return s}case k.CODES.get("x"):{if(!e.more())break;if(n=e.pop(),n===k.CODES.get("{")){let a=0,o=0;for(;;){if(!e.more())break e;if(n=e.pop(),n===k.CODES.get("}"))break;const B=ne.unhex(n);if(B<0||(o=o*16+B,o>Y.MAX_RUNE))break e;a++}if(a===0)break e;return o}const s=ne.unhex(n);if(!e.more())break;n=e.pop();const i=ne.unhex(n);if(s<0||i<0)break;return s*16+i}case k.CODES.get("a"):return k.CODES.get("\x07");case k.CODES.get("f"):return k.CODES.get("\f");case k.CODES.get("n"):return k.CODES.get(`
`);case k.CODES.get("r"):return k.CODES.get("\r");case k.CODES.get("t"):return k.CODES.get("	");case k.CODES.get("v"):return k.CODES.get("\v");default:if(n<=Y.MAX_ASCII&&!ne.isalnum(n))return n;break}throw new Te(J.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new Te(J.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?J.parseEscape(e):e.pop()}static concatRunes(e,t){for(let n=0;n<t.length;n++)e.push(t[n]);return e}static hasCapture(e){if(e===null)return!1;if(e.op===P.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if(J.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new P(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>J.MAX_RUNES)throw new Te(J.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===P.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor(J.MAX_SIZE/this.repeats)?this.repeats=J.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor(J.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>J.MAX_SIZE)throw new Te(J.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let n=0;switch(e.op){case P.Op.LITERAL:n=e.runes.length;break;case P.Op.PLB:case P.Op.NLB:case P.Op.CAPTURE:case P.Op.STAR:n=2+this.calcSize(e.subs[0]);break;case P.Op.PLUS:case P.Op.QUEST:n=1+this.calcSize(e.subs[0]);break;case P.Op.CONCAT:for(let s of e.subs)n=n+this.calcSize(s);break;case P.Op.ALTERNATE:for(let s of e.subs)n=n+this.calcSize(s);e.subs.length>1&&(n=n+e.subs.length-1);break;case P.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?n=2+s:n=1+e.min*s;break}n=e.max*s+(e.max-e.min);break}}return n=Math.max(1,n),this.size===null&&(this.size=new Map),this.size.set(e,n),n}checkHeight(e){if(!(this.numRegexp<J.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>J.MAX_HEIGHT)throw new Te(J.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let n=1;for(let s of e.subs){const i=this.calcHeight(s);n<1+i&&(n=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,n),n}pop(){return this.stack.pop()}popToPseudo(){const e=this.stack.length;let t=e;for(;t>0&&!P.isPseudoOp(this.stack[t-1].op);)t--;const n=this.stack.slice(t,e);return this.stack=this.stack.slice(0,t),n}push(e){if(this.numRunes+=e.runes.length,e.op===P.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&-2))return null;e.op=P.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&-2}else if(e.op===P.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&Y.simpleFold(e.runes[0])===e.runes[2]&&Y.simpleFold(e.runes[2])===e.runes[0]||e.op===P.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&Y.simpleFold(e.runes[0])===e.runes[1]&&Y.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|H.FOLD_CASE))return null;e.op=P.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|H.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){const n=this.stack.length;if(n<2)return!1;const s=this.stack[n-1],i=this.stack[n-2];return s.op!==P.Op.LITERAL||i.op!==P.Op.LITERAL||(s.flags&H.FOLD_CASE)!==(i.flags&H.FOLD_CASE)?!1:(i.runes=J.concatRunes(i.runes,s.runes),e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1))}newLiteral(e,t){const n=this.newRegexp(P.Op.LITERAL);return n.flags=t,t&H.FOLD_CASE&&(e=J.minFoldRune(e)),n.runes=[e],n}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){const t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,n,s,i,a){let o=this.flags;if(o&H.PERL_X&&(i.more()&&i.lookingAt("?")&&(i.skip(1),o^=H.NON_GREEDY),a!==-1))throw new Te(J.ERR_INVALID_REPEAT_OP,i.from(a));const B=this.stack.length;if(B===0)throw new Te(J.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const c=this.stack[B-1];if(P.isPseudoOp(c.op))throw new Te(J.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const h=this.newRegexp(e);if(h.min=t,h.max=n,h.flags=o,h.subs=[c],this.stack[B-1]=h,this.checkLimits(h),e===P.Op.REPEAT&&(t>=2||n>=2)&&!this.repeatIsValid(h,1e3))throw new Te(J.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===P.Op.REPEAT){let n=e.max;if(n===0)return!0;if(n<0&&(n=e.min),n>t)return!1;n>0&&(t=Math.trunc(t/n))}for(let n of e.subs)if(!this.repeatIsValid(n,t))return!1;return!0}concat(){this.maybeConcat(-1,0);const e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(P.Op.EMPTY_MATCH)):this.push(this.collapse(e,P.Op.CONCAT))}alternate(){const e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(P.Op.NO_MATCH)):this.push(this.collapse(e,P.Op.ALTERNATE))}cleanAlt(e){e.op===P.Op.CHAR_CLASS&&(e.runes=new On(e.runes).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===Y.MAX_RUNE?(e.runes=[],e.op=P.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===k.CODES.get(`
`)-1&&e.runes[2]===k.CODES.get(`
`)+1&&e.runes[3]===Y.MAX_RUNE&&(e.runes=[],e.op=P.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let n=0;for(let o of e)n+=o.op===t?o.subs.length:1;let s=new Array(n).fill(null),i=0;for(let o of e)if(o.op===t){for(let B=0;B<o.subs.length;B++)s[i++]=o.subs[B];this.reuse(o)}else s[i++]=o;let a=this.newRegexp(t);if(a.subs=s,t===P.Op.ALTERNATE&&(a.subs=this.factor(a.subs),a.subs.length===1)){const o=a;a=a.subs[0],this.reuse(o)}return a}factor(e){if(e.length<2)return e;let t=0,n=e.length,s=0,i=null,a=0,o=0,B=0;for(let h=0;h<=n;h++){let d=null,p=0,C=0;if(h<n){let m=e[t+h];if(m.op===P.Op.CONCAT&&m.subs.length>0&&(m=m.subs[0]),m.op===P.Op.LITERAL&&(d=m.runes,p=m.runes.length,C=m.flags&H.FOLD_CASE),C===o){let I=0;for(;I<a&&I<p&&i[I]===d[I];)I++;if(I>0){a=I;continue}}}if(h!==B)if(h===B+1)e[s++]=e[t+B];else{const m=this.newRegexp(P.Op.LITERAL);m.flags=o,m.runes=i.slice(0,a);for(let F=B;F<h;F++)e[t+F]=this.removeLeadingString(e[t+F],a),this.checkLimits(e[t+F]);const I=this.collapse(e.slice(t+B,t+h),P.Op.ALTERNATE),S=this.newRegexp(P.Op.CONCAT);S.subs=[m,I],e[s++]=S}B=h,i=d,a=p,o=C}n=s,t=0,B=0,s=0;let c=null;for(let h=0;h<=n;h++){let d=null;if(!(h<n&&(d=J.leadingRegexp(e[t+h]),c!==null&&c.equals(d)&&(J.isCharClass(c)||c.op===P.Op.REPEAT&&c.min===c.max&&J.isCharClass(c.subs[0]))))){if(h!==B)if(h===B+1)e[s++]=e[t+B];else{const p=c;for(let I=B;I<h;I++){const S=I!==B;e[t+I]=this.removeLeadingRegexp(e[t+I],S),this.checkLimits(e[t+I])}const C=this.collapse(e.slice(t+B,t+h),P.Op.ALTERNATE),m=this.newRegexp(P.Op.CONCAT);m.subs=[p,C],e[s++]=m}B=h,c=d}}n=s,t=0,B=0,s=0;for(let h=0;h<=n;h++)if(!(h<n&&J.isCharClass(e[t+h]))){if(h!==B)if(h===B+1)e[s++]=e[t+B];else{let d=B;for(let C=B+1;C<h;C++){const m=e[t+d],I=e[t+C];(m.op<I.op||m.op===I.op&&(m.runes!==null?m.runes.length:0)<(I.runes!==null?I.runes.length:0))&&(d=C)}const p=e[t+B];e[t+B]=e[t+d],e[t+d]=p;for(let C=B+1;C<h;C++)J.mergeCharClass(e[t+B],e[t+C]),this.reuse(e[t+C]);this.cleanAlt(e[t+B]),e[s++]=e[t+B]}h<n&&(e[s++]=e[t+h]),B=h+1}n=s,t=0,B=0,s=0;for(let h=0;h<n;++h)h+1<n&&e[t+h].op===P.Op.EMPTY_MATCH&&e[t+h+1].op===P.Op.EMPTY_MATCH||(e[s++]=e[t+h]);return n=s,t=0,e.slice(t,n)}removeLeadingString(e,t){if(e.op===P.Op.CONCAT&&e.subs.length>0){const n=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=n,n.op===P.Op.EMPTY_MATCH)switch(this.reuse(n),e.subs.length){case 0:case 1:e.op=P.Op.EMPTY_MATCH,e.subs=P.emptySubs();break;case 2:{const s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length);break}return e}return e.op===P.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=P.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===P.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=P.Op.EMPTY_MATCH,e.subs=P.emptySubs();break;case 1:{const n=e;e=e.subs[0],this.reuse(n);break}}return e}return t&&this.reuse(e),this.newRegexp(P.Op.EMPTY_MATCH)}parseInternal(){if(this.flags&H.LITERAL)return J.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,n=-1;const s=new Kg(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case k.CODES.get("("):if(this.flags&H.LOOKBEHIND){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if(this.flags&H.PERL_X&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(P.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case k.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case k.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case k.CODES.get("^"):this.flags&H.ONE_LINE?this.op(P.Op.BEGIN_TEXT):this.op(P.Op.BEGIN_LINE),s.skip(1);break;case k.CODES.get("$"):this.flags&H.ONE_LINE?this.op(P.Op.END_TEXT).flags|=H.WAS_DOLLAR:this.op(P.Op.END_LINE),s.skip(1);break;case k.CODES.get("."):this.flags&H.DOT_NL?this.op(P.Op.ANY_CHAR):this.op(P.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case k.CODES.get("["):this.parseClass(s);break;case k.CODES.get("*"):case k.CODES.get("+"):case k.CODES.get("?"):{i=s.pos();let a=null;switch(s.pop()){case k.CODES.get("*"):a=P.Op.STAR;break;case k.CODES.get("+"):a=P.Op.PLUS;break;case k.CODES.get("?"):a=P.Op.QUEST;break}this.repeat(a,t,n,i,s,e);break}case k.CODES.get("{"):{i=s.pos();const a=J.parseRepeat(s);if(a<0){s.rewindTo(i),this.literal(s.pop());break}t=a>>16,n=(a&Y.MAX_BMP)<<16>>16,this.repeat(P.Op.REPEAT,t,n,i,s,e);break}case k.CODES.get("\\"):{const a=s.pos();if(s.skip(1),this.flags&H.PERL_X&&s.more())switch(s.pop()){case k.CODES.get("A"):this.op(P.Op.BEGIN_TEXT);break e;case k.CODES.get("b"):this.op(P.Op.WORD_BOUNDARY);break e;case k.CODES.get("B"):this.op(P.Op.NO_WORD_BOUNDARY);break e;case k.CODES.get("C"):throw new Te(J.ERR_INVALID_ESCAPE,"\\C");case k.CODES.get("Q"):{let c=s.rest();const h=c.indexOf("\\E");h>=0?(c=c.substring(0,h),s.skipString(c),s.skipString("\\E")):s.skipString(c);let d=0;for(;d<c.length;){const p=c.codePointAt(d);this.literal(p),d+=ne.charCount(p)}break e}case k.CODES.get("z"):this.op(P.Op.END_TEXT);break e;default:s.rewindTo(a);break}else s.rewindTo(a);const o=this.newRegexp(P.Op.CHAR_CLASS);if(o.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const c=new On;if(this.parseUnicodeClass(s,c)){o.runes=c.toArray(),this.push(o);break e}}const B=new On;if(this.parsePerlClassEscape(s,B)){o.runes=B.toArray(),this.push(o);break e}s.rewindTo(a),this.reuse(o),this.literal(J.parseEscape(s));break}default:this.literal(s.pop());break}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new Te(J.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){const t=e.pos(),n=e.rest();if(n.startsWith("(?P<")||n.startsWith("(?<")){const o=n.charAt(2)==="P"?4:3,B=n.indexOf(">");if(B<0)throw new Te(J.ERR_INVALID_NAMED_CAPTURE,n);const c=n.substring(o,B);if(e.skipString(c),e.skip(o+1),!J.isValidCaptureName(c))throw new Te(J.ERR_INVALID_NAMED_CAPTURE,n.substring(0,B+1));const h=this.op(P.Op.LEFT_PAREN);if(h.cap=++this.numCap,this.namedGroups[c])throw new Te(J.ERR_DUPLICATE_NAMED_CAPTURE,c);this.namedGroups[c]=this.numCap,h.name=c;return}e.skip(2);let s=this.flags,i=1,a=!1;e:for(;e.more();){const o=e.pop();switch(o){case k.CODES.get("i"):s|=H.FOLD_CASE,a=!0;break;case k.CODES.get("m"):s&=-17,a=!0;break;case k.CODES.get("s"):s|=H.DOT_NL,a=!0;break;case k.CODES.get("U"):s|=H.NON_GREEDY,a=!0;break;case k.CODES.get("-"):if(i<0)break e;i=-1,s=~s,a=!1;break;case k.CODES.get(":"):case k.CODES.get(")"):if(i<0){if(!a)break e;s=~s}o===k.CODES.get(":")&&this.op(P.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new Te(J.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){const e=this.newRegexp(P.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){const e=this.newRegexp(P.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(P.Op.VERTICAL_BAR)}swapVerticalBar(){const e=this.stack.length;if(e>=3&&this.stack[e-2].op===P.Op.VERTICAL_BAR&&J.isCharClass(this.stack[e-1])&&J.isCharClass(this.stack[e-3])){let t=this.stack[e-1],n=this.stack[e-3];if(t.op>n.op){const s=n;n=t,t=s,this.stack[e-3]=n}return J.mergeCharClass(n,t),this.reuse(t),this.pop(),!0}if(e>=2){const t=this.stack[e-1],n=this.stack[e-2];if(n.op===P.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=n,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new Te(J.ERR_UNEXPECTED_PAREN,this.wholeRegexp);const e=this.pop(),t=this.pop();if(t.op!==P.Op.LEFT_PAREN)throw new Te(J.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if(J.hasCapture(e))throw new Te(J.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=P.Op.PLB:t.op=P.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=P.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){const n=e.pos();if(!(this.flags&H.PERL_X)||!e.more()||e.pop()!==k.CODES.get("\\")||!e.more())return!1;e.pop();const s=e.from(n),i=Zc.has(s)?Zc.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&H.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){const n=e.rest(),s=n.indexOf(":]");if(s<0)return!1;const i=n.substring(0,s+2);e.skipString(i);const a=fu.has(i)?fu.get(i):null;if(a===null)throw new Te(J.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(a,(this.flags&H.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){const n=e.pos();if(!(this.flags&H.UNICODE_GROUPS)||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===k.CODES.get("P")&&(s=-1),!e.more())throw e.rewindTo(n),new Te(J.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let a;if(i!==k.CODES.get("{"))a=ne.runeToString(i);else{const h=e.rest(),d=h.indexOf("}");if(d<0)throw e.rewindTo(n),new Te(J.ERR_INVALID_CHAR_RANGE,e.rest());a=h.substring(0,d),e.skipString(a),e.skip(1)}a.length!==0&&a.codePointAt(0)===k.CODES.get("^")&&(s=0-s,a=a.substring(1));const o=J.unicodeTable(a);if(o===null)throw new Te(J.ERR_INVALID_CHAR_RANGE,e.from(n));o.sign<0&&(s=0-s);const B=o.tab,c=o.fold;if(!(this.flags&H.FOLD_CASE)||c===null)t.appendTableWithSign(B,s);else{const h=new On().appendTable(B).appendTable(c).cleanClass().toArray();t.appendClassWithSign(h,s)}return!0}parseClass(e){const t=e.pos();e.skip(1);const n=this.newRegexp(P.Op.CHAR_CLASS);n.flags=this.flags;const s=new On;let i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),this.flags&H.CLASS_NL||s.appendRange(k.CODES.get(`
`),k.CODES.get(`
`)));let a=!0;for(;!e.more()||e.peek()!==k.CODES.get("]")||a;){if(e.more()&&e.lookingAt("-")&&!(this.flags&H.PERL_X)&&!a){const h=e.rest();if(h==="-"||!h.startsWith("-]"))throw e.rewindTo(t),new Te(J.ERR_INVALID_CHAR_RANGE,e.rest())}a=!1;const o=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(o)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(o);const B=J.parseClassChar(e,t);let c=B;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(c=J.parseClassChar(e,t),c<B)throw new Te(J.ERR_INVALID_CHAR_RANGE,e.from(o))}this.flags&H.FOLD_CASE?s.appendFoldedRange(B,c):s.appendRange(B,c)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),n.runes=s.toArray(),this.push(n)}},$(J,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),$(J,"ERR_INVALID_CHAR_RANGE","invalid character class range"),$(J,"ERR_INVALID_ESCAPE","invalid escape sequence"),$(J,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),$(J,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),$(J,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),$(J,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),$(J,"ERR_MISSING_BRACKET","missing closing ]"),$(J,"ERR_MISSING_PAREN","missing closing )"),$(J,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),$(J,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),$(J,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),$(J,"ERR_UNEXPECTED_PAREN","unexpected )"),$(J,"ERR_NESTING_DEPTH","expression nests too deeply"),$(J,"ERR_LARGE","expression too large"),$(J,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),$(J,"MAX_HEIGHT",1e3),$(J,"MAX_SIZE",3355443),$(J,"MAX_RUNES",33554432),$(J,"ANY_TABLE",new w(new Uint32Array([0,Y.MAX_RUNE,1]))),$(J,"ASCII_TABLE",new w(new Uint32Array([0,127,1]))),$(J,"ASCII_FOLD_TABLE",new w(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),J),Wg=class Cr{static initTest(e){const t=Cr.compile(e),n=new Cr(t.expr,t.prog,t.numSubexp,t.longest);return n.cond=t.cond,n.prefix=t.prefix,n.prefixUTF8=t.prefixUTF8,n.prefixComplete=t.prefixComplete,n.prefixRune=t.prefixRune,n.prefilter=t.prefilter,n}static compile(e){return Cr.compileImpl(e,H.PERL,!1)}static compilePOSIX(e){return Cr.compileImpl(e,H.POSIX,!0)}static compileImpl(e,t,n){let s=Qg.parse(e,t);const i=s.maxCap();s=zg.simplify(s);const a=$g.build(s),o=qg.compileRegexp(s),B=new Cr(e,o,i,n);B.prefilter=a.type===ye.Type.NONE?null:a;const[c,h]=o.prefix();return B.prefixComplete=c,B.prefix=h,B.prefixUTF8=ne.stringToUtf8ByteArray(B.prefix),B.prefix.length>0&&(B.prefixRune=B.prefix.codePointAt(0)),B.namedGroups=s.namedGroups,B}static match(e,t){return Cr.compile(e).match(t)}constructor(e,t,n=0,s=0){this.expr=e,this.prog=t,this.numSubexp=n,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.machinePool=[],this.dfa=new xg(this.prog),this.onepass=Kc.compile(this.prog),this.prefilter=null}matchPrefixComplete(e,t,n,s){if((n===H.ANCHOR_START||n===H.ANCHOR_BOTH)&&t!==0)return null;let i=-1,a=-1;const o=e.prefixLength(this);if(n===H.UNANCHORED){const B=e.index(this,t);if(B<0)return null;i=t+B,a=i+o}else if(n===H.ANCHOR_BOTH){if(e.endPos()!==o||e.index(this,0)!==0)return null;i=0,a=o}else if(n===H.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,a=o}if(i<0)return null;if(s>0){const B=new Int32Array(s).fill(-1);return B[0]=i,B[1]=a,Array.from(B)}return[]}executeEngine(e,t,n,s){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,n,s);if(this.prefilter!==null&&n===H.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return Kc.execute(this,e,t,n,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=Wi.maxBitStateLen(this.prog)?Wi.execute(this,e,t,n,s):this.doExecuteNFA(e,t,n,s);if(this.prog.numLb===0){const i=this.dfa.match(e,t,n);if(i!==null)return i?[]:null;if(e.endPos()<=Wi.maxBitStateLen(this.prog))return Wi.execute(this,e,t,n,s)}return this.doExecuteNFA(e,t,n,s)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,n,s){let i=this.get();i||(i=Rg.fromRE2(this)),i.init(s);const a=i.match(e,t,n)?i.submatches():null;return this.put(i),a}match(e){return this.executeEngine(Ae.fromUTF16(e),0,H.UNANCHORED,0)!==null}matchWithGroup(e,t,n,s,i){return e instanceof Ir||(ne.isByteArray(e)?e=gr.utf8(e):e=gr.utf16(e)),this.matchMachineInput(e,t,n,s,i)}matchMachineInput(e,t,n,s,i){if(t>n)return[!1,null];const a=e.isUTF16Encoding()?Ae.fromUTF16(e.asCharSequence(),0,n):Ae.fromUTF8(e.asBytes(),0,n),o=this.executeEngine(a,t,s,2*i);return o===null?[!1,null]:[!0,o]}matchUTF8(e){return this.executeEngine(Ae.fromUTF8(e),0,H.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,n){let s=0,i=0,a="";const o=Ae.fromUTF16(e);let B=0;for(;i<=e.length;){const c=this.executeEngine(o,i,H.UNANCHORED,2);if(c===null||c.length===0)break;a+=e.substring(s,c[0]),(c[1]>s||c[0]===0)&&(a+=t(e.substring(c[0],c[1])),B++),s=c[1];const h=o.step(i)&7;if(i+h>c[1]?i+=h:i+1>c[1]?i++:i=c[1],B>=n)break}return a+=e.substring(s),a}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let n=new Array(t).fill(-1);for(let s=0;s<e.length;s++)n[s]=e[s];e=n}return e}allMatches(e,t,n=s=>s){let s=[];const i=e.endPos();t<0&&(t=i+1);let a=0,o=0,B=-1;for(;o<t&&a<=i;){const c=this.executeEngine(e,a,H.UNANCHORED,this.prog.numCap);if(c===null||c.length===0)break;let h=!0;if(c[1]===a){c[0]===B&&(h=!1);const d=e.step(a);d<0?a=i+1:a+=d&7}else a=c[1];B=c[1],h&&(s.push(n(this.pad(c))),o++)}return s}findUTF8(e){const t=this.executeEngine(Ae.fromUTF8(e),0,H.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){const t=this.executeEngine(Ae.fromUTF8(e),0,H.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){const t=this.executeEngine(Ae.fromUTF16(e),0,H.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(Ae.fromUTF16(e),0,H.UNANCHORED,2)}findUTF8Submatch(e){const t=this.executeEngine(Ae.fromUTF8(e),0,H.UNANCHORED,this.prog.numCap);if(t===null)return null;const n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.slice(t[2*s],t[2*s+1]));return n}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(Ae.fromUTF8(e),0,H.UNANCHORED,this.prog.numCap))}findSubmatch(e){const t=this.executeEngine(Ae.fromUTF16(e),0,H.UNANCHORED,this.prog.numCap);if(t===null)return null;const n=new Array(1+this.numSubexp).fill(null);for(let s=0;s<n.length;s++)2*s<t.length&&t[2*s]>=0&&(n[s]=e.substring(t[2*s],t[2*s+1]));return n}findSubmatchIndex(e){return this.pad(this.executeEngine(Ae.fromUTF16(e),0,H.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){const n=this.allMatches(Ae.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return n.length===0?null:n}findAllUTF8Index(e,t){const n=this.allMatches(Ae.fromUTF8(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAll(e,t){const n=this.allMatches(Ae.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return n.length===0?null:n}findAllIndex(e,t){const n=this.allMatches(Ae.fromUTF16(e),t,s=>s.slice(0,2));return n.length===0?null:n}findAllUTF8Submatch(e,t){const n=this.allMatches(Ae.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.slice(s[2*a],s[2*a+1]));return i});return n.length===0?null:n}findAllUTF8SubmatchIndex(e,t){const n=this.allMatches(Ae.fromUTF8(e),t);return n.length===0?null:n}findAllSubmatch(e,t){const n=this.allMatches(Ae.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.substring(s[2*a],s[2*a+1]));return i});return n.length===0?null:n}findAllSubmatchIndex(e,t){const n=this.allMatches(Ae.fromUTF16(e),t);return n.length===0?null:n}},Yg=class Kr{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(e instanceof RegExp&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let n="",s=!1,i=e.length;i===0&&(n="(?:)",s=!0);let a=!1,o=0;for(;o<i;){let c=e[o];if(c==="\\"){if(o+1<i)switch(c=e[o+1],c){case"\\":n+="\\\\",o+=2;continue;case"c":if(o+2<i){let p=e[o+2].charCodeAt(0);if(p>=65&&p<=90||p>=97&&p<=122){let C=p%32;n+="\\x",n+=(C>>4).toString(16).toUpperCase(),n+=(C&15).toString(16).toUpperCase(),o+=3,s=!0;continue}}n+="c",o+=2,s=!0;continue;case"u":if(o+2<i){if(e[o+2]==="{"){let p=o+3,C=!1,m=!1;for(;p<i;){const I=e[p];if(I==="}"){m=!0;break}if(!Kr.isHexadecimal(I))break;C=!0,p++}if(m&&C){n+="\\x",o+=2,s=!0;continue}}else if(o+5<i){let p=!0;for(let C=0;C<4;C++)if(!Kr.isHexadecimal(e[o+2+C])){p=!1;break}if(p){n+="\\x{"+e.substring(o+2,o+6)+"}",o+=6,s=!0;continue}}}n+="u",o+=2,s=!0;continue;case"x":{let p=!1;if(o+2<i&&e[o+2]==="{"){let C=o+3,m=!1,I=!1;for(;C<i;){const S=e[C];if(S==="}"){I=!0;break}if(!Kr.isHexadecimal(S))break;m=!0,C++}I&&m&&(p=!0)}else o+3<i&&Kr.isHexadecimal(e[o+2])&&Kr.isHexadecimal(e[o+3])&&(p=!0);p?(n+="\\x",o+=2):(n+="x",o+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":n+="\\"+c,o+=2;continue;default:{let p=e.codePointAt(o+1);if(p>=48&&p<=57||p>=65&&p<=90||p>=97&&p<=122){let C=ne.charCount(p);n+=e.substring(o+1,o+1+C),o+=C+1,s=!0}else{n+="\\";let C=ne.charCount(p);n+=e.substring(o+1,o+1+C),o+=C+1}continue}}}else if(c==="/"){n+="\\/",o+=1,s=!0;continue}else if(c==="[")a=!0;else if(c==="]")a=!1;else if(!a&&c==="("&&o+2<i&&e[o+1]==="?"&&e[o+2]==="<"&&o+3<i&&!"=!>)".includes(e[o+3])){n+="(?P<",o+=3,s=!0;continue}let h=e.codePointAt(o),d=ne.charCount(h);n+=e.substring(o,o+d),o+=d}const B=s?n:e;return t.length>0?`(?${t})${B}`:B}},Me,Rl=(Me=class{static quote(e){return ne.quoteMeta(e)}static quoteReplacement(e,t=!1){return $c.quoteReplacement(e,t)}static translateRegExp(e){return Yg.translate(e)}static compile(e,t=0){let n=e;if(t&Me.CASE_INSENSITIVE&&(n=`(?i)${n}`),t&Me.DOTALL&&(n=`(?s)${n}`),t&Me.MULTILINE&&(n=`(?m)${n}`),t&-544)throw new Pg("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");let s=H.PERL;t&Me.DISABLE_UNICODE_GROUPS&&(s&=-129),t&Me.LOOKBEHINDS&&(s|=H.LOOKBEHIND);const i=new Me(e,t);return i.re2Input=Wg.compileImpl(n,s,(t&Me.LONGEST_MATCH)!==0),i}static matches(e,t){return Me.compile(e).testExact(t)}static initTest(e,t,n){if(e==null)throw new Error("pattern is null");if(n==null)throw new Error("re2 is null");const s=new Me(e,t);return s.re2Input=n,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return ne.isByteArray(e)&&(e=gr.utf8(e)),new $c(this,e)}test(e){return ne.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){const t=ne.isByteArray(e)?Ae.fromUTF8(e):Ae.fromUTF16(e);return this.re2Input.executeEngine(t,0,H.ANCHOR_BOTH,0)!==null}exec(e){const t=this.matcher(e);if(!t.find())return null;const n=[t.group(0)];for(let i=1;i<=t.groupCount();i++){const a=t.group(i);n.push(a===null?void 0:a)}n.index=t.start(0),n.input=e;const s=this.namedGroups();if(Object.keys(s).length>0){const i=t.getNamedGroups();for(const a in i)i[a]===null&&(i[a]=void 0);n.groups=i}else n.groups=void 0;return n}split(e,t=0){const n=this.matcher(e),s=[];let i=0,a=0;for(;n.find();){if(a===0&&n.end()===0){a=n.end();continue}if(t>0&&s.length===t-1)break;if(a===n.start()){if(t===0){i+=1,a=n.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(n.substring(a,n.start())),a=n.end()}if(t===0&&a!==n.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(n.substring(a,n.inputLength()))}return(t!==0||s.length===0&&!(a===n.inputLength()&&a>0))&&s.push(n.substring(a,n.inputLength())),s}*matchAll(e){const t=this.matcher(e);for(;t.find();){const n=[t.group(0)];for(let i=1;i<=t.groupCount();i++){const a=t.group(i);n.push(a===null?void 0:a)}n.index=t.start(0),n.input=e;const s=this.namedGroups();if(Object.keys(s).length>0){const i=t.getNamedGroups();for(const a in i)i[a]===null&&(i[a]=void 0);n.groups=i}else n.groups=void 0;yield n}}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},$(Me,"CASE_INSENSITIVE",qr.CASE_INSENSITIVE),$(Me,"DOTALL",qr.DOTALL),$(Me,"MULTILINE",qr.MULTILINE),$(Me,"DISABLE_UNICODE_GROUPS",qr.DISABLE_UNICODE_GROUPS),$(Me,"LONGEST_MATCH",qr.LONGEST_MATCH),$(Me,"LOOKBEHINDS",qr.LOOKBEHINDS),Me);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fs="12.17.0";function Xg(r){fs=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr=new Dh("@firebase/firestore");function Qr(){return Tr.logLevel}function Q(r,...e){if(Tr.logLevel<=ge.DEBUG){const t=e.map(Fl);Tr.debug(`Firestore (${fs}): ${r}`,...t)}}function In(r,...e){if(Tr.logLevel<=ge.ERROR){const t=e.map(Fl);Tr.error(`Firestore (${fs}): ${r}`,...t)}}function Qt(r,...e){if(Tr.logLevel<=ge.WARN){const t=e.map(Fl);Tr.warn(`Firestore (${fs}): ${r}`,...t)}}function Fl(r){if(typeof r=="string")return r;try{return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Gh(r,n,t)}function Gh(r,e,t){let n=`FIRESTORE (${fs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw In(n),new Error(n)}function ee(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||Gh(e,s,n)}function ce(r,e){return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zg(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Zg(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function de(r,e){return r<e?-1:r>e?1:0}function ll(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return jo(s)===jo(i)?de(s,i):jo(s)?1:-1}return de(r.length,e.length)}const em=55296,tm=57343;function jo(r){const e=r.charCodeAt(0);return e>=em&&e<=tm}function ss(r,e,t){return r.length===e.length&&r.every((n,s)=>t(n,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,t){this.comparator=e,this.root=t||et.EMPTY}insert(e,t){return new Ne(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,et.BLACK,null,null))}remove(e){return new Ne(this.comparator,this.root.remove(e,this.comparator).copy(null,null,et.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xi(this.root,e,this.comparator,!0)}}class Xi{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class et{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??et.RED,this.left=s??et.EMPTY,this.right=i??et.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new et(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return et.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return et.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,et.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw oe(43730,{key:this.key,value:this.value});if(this.right.isRed())throw oe(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw oe(27949);return e+(this.isRed()?0:1)}}et.EMPTY=null,et.RED=!0,et.BLACK=!1;et.EMPTY=new class{constructor(){this.size=0}get key(){throw oe(57766)}get value(){throw oe(16141)}get color(){throw oe(16727)}get left(){throw oe(29726)}get right(){throw oe(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new et(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.comparator=e,this.data=new Ne(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Cu(this.data.getIterator())}getIteratorFrom(e){return new Cu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof Ue)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ue(this.comparator);return t.data=e,t}}class Cu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Z extends ds{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn="__name__";class rn{constructor(e,t,n){t===void 0?t=0:t>e.length&&oe(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&oe(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return rn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof rn?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=rn.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return de(e.length,t.length)}static compareSegments(e,t){const n=rn.isNumericId(e),s=rn.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?rn.extractNumericId(e).compare(rn.extractNumericId(t)):ll(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Un.fromString(e.substring(4,e.length-2))}}class we extends rn{construct(e,t,n){return new we(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new Z(U.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(s=>s.length>0))}return new we(t)}static emptyPath(){return new we([])}}const nm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let Nt=class Wr extends rn{construct(e,t,n){return new Wr(e,t,n)}static isValidIdentifier(e){return nm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Wr.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===sn}static keyField(){return new Wr([sn])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new Z(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let a=!1;for(;s<e.length;){const o=e[s];if(o==="\\"){if(s+1===e.length)throw new Z(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const B=e[s+1];if(B!=="\\"&&B!=="."&&B!=="`")throw new Z(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=B,s+=2}else o==="`"?(a=!a,s++):o!=="."||a?(n+=o,s++):(i(),s++)}if(i(),a)throw new Z(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Wr(t)}static emptyPath(){return new Wr([])}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e){this.fields=e,e.sort(Nt.comparator)}static empty(){return new Jt([])}unionWith(e){let t=new Ue(Nt.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Jt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ss(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Rr(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function rm(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function Hh(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.path=e}static fromPath(e){return new ie(we.fromString(e))}static fromName(e){return new ie(we.fromString(e).popFirst(5))}static empty(){return new ie(we.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&we.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return we.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ie(new we(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(r,e,t){if(!t)throw new Z(U.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function sm(r,e,t,n){if(e===!0&&n===!0)throw new Z(U.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function pu(r){if(!ie.isDocumentKey(r))throw new Z(U.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function gu(r){if(ie.isDocumentKey(r))throw new Z(U.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function _i(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function xl(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":oe(12329,{type:typeof r})}function Sr(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new Z(U.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=xl(r);throw new Z(U.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(r,e){const t={typeString:r};return e&&(t.value=e),t}function bi(r,e){if(!_i(r))throw new Z(U.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new Z(U.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu=-62135596800,Eu=1e6;class Fe{static now(){return Fe.fromMillis(Date.now())}static fromDate(e){return Fe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Eu);return new Fe(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Z(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Z(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<mu)throw new Z(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Z(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Eu}_compareTo(e){return this.seconds===e.seconds?de(this.nanoseconds,e.nanoseconds):de(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Fe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(bi(e,Fe._jsonSchema))return new Fe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-mu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Fe._jsonSchemaVersion="firestore/timestamp/1.0",Fe._jsonSchema={type:Ge("string",Fe._jsonSchemaVersion),seconds:Ge("number"),nanoseconds:Ge("number")};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new jh("Invalid base64 string: "+i):i}}(e);return new je(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new je(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return de(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}je.EMPTY_BYTE_STRING=new je("");const im=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function qn(r){if(ee(!!r,39018),typeof r=="string"){let e=0;const t=im.exec(r);if(ee(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:xe(r.seconds),nanos:xe(r.nanos)}}function xe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function zn(r){return typeof r=="string"?je.fromBase64String(r):je.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="server_timestamp",Jh="__type__",qh="__previous_value__",zh="__local_write_time__";function Ma(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Jh])==null?void 0:n.stringValue)===$h}function Ii(r){const e=r.mapValue.fields[qh];return Ma(e)?Ii(e):e}function is(r){const e=qn(r.mapValue.fields[zh].timestampValue);return new Fe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(e,t,n,s,i,a,o,B,c,h,d,p,C){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=o,this.longPollingOptions=B,this.useFetchStreams=c,this.isUsingEmulator=h,this.apiKey=d,this._customHeaders=p,this.grpcFlowControlWindow=C}}const ma="(default)";class li{constructor(e,t){this.projectId=e,this.database=t||ma}static empty(){return new li("","")}get isDefaultDatabase(){return this.database===ma}isEqual(e){return e instanceof li&&e.projectId===this.projectId&&e.database===this.database}}function om(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new Z(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new li(r.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol=-1;function Va(r){return r==null}function Bi(r){return r===0&&1/r==-1/0}function lm(r){return typeof r=="number"&&Number.isInteger(r)&&!Bi(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}function Bm(r){return typeof r=="string"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh="__type__",cm="__max__",Zi={mapValue:{}},Qh="__vector__",ci="value",as={nullValue:"NULL_VALUE"},_t={booleanValue:!0},Xe={booleanValue:!1};function $e(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ma(r)?4:um(r)?9007199254740991:Ea(r)?10:11:oe(28295,{value:r})}function Vt(r,e,t){if(r===e)return!0;const n=$e(r);if(n!==$e(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return is(r).isEqual(is(e));case 3:return function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;const o=qn(i.timestampValue),B=qn(a.timestampValue);return o.seconds===B.seconds&&o.nanos===B.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,a){return zn(i.bytesValue).isEqual(zn(a.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,a){return xe(i.geoPointValue.latitude)===xe(a.geoPointValue.latitude)&&xe(i.geoPointValue.longitude)===xe(a.geoPointValue.longitude)}(r,e);case 2:return function(i,a,o){if("integerValue"in i&&"integerValue"in a)return xe(i.integerValue)===xe(a.integerValue);let B,c;if("doubleValue"in i&&"doubleValue"in a)B=xe(i.doubleValue),c=xe(a.doubleValue);else{if(!(o!=null&&o.t))return!1;B=xe(i.integerValue??i.doubleValue),c=xe(a.integerValue??a.doubleValue)}return B===c?!!(o!=null&&o.i)||Bi(B)===Bi(c):!!(o===void 0||o.o)&&isNaN(B)&&isNaN(c)}(r,e,t);case 9:return ss(r.arrayValue.values||[],e.arrayValue.values||[],(s,i)=>Vt(s,i,t));case 10:case 11:return function(i,a,o){const B=i.mapValue.fields||{},c=a.mapValue.fields||{};if(ga(B)!==ga(c))return!1;for(const h in B)if(B.hasOwnProperty(h)&&(c[h]===void 0||!Vt(B[h],c[h],o)))return!1;return!0}(r,e,t);default:return oe(52216,{left:r})}}function ui(r,e){return(r.values||[]).find(t=>Vt(t,e))!==void 0}function bt(r,e){if(r===e)return 0;const t=$e(r),n=$e(e);if(t!==n)return de(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return de(r.booleanValue,e.booleanValue);case 2:return function(i,a){const o=xe(i.integerValue||i.doubleValue),B=xe(a.integerValue||a.doubleValue);return o<B?-1:o>B?1:o===B?0:isNaN(o)?isNaN(B)?0:-1:1}(r,e);case 3:return yu(r.timestampValue,e.timestampValue);case 4:return yu(is(r),is(e));case 5:return ll(r.stringValue,e.stringValue);case 6:return function(i,a){const o=zn(i),B=zn(a);return o.compareTo(B)}(r.bytesValue,e.bytesValue);case 7:return function(i,a){const o=i.split("/"),B=a.split("/");for(let c=0;c<o.length&&c<B.length;c++){const h=de(o[c],B[c]);if(h!==0)return h}return de(o.length,B.length)}(r.referenceValue,e.referenceValue);case 8:return function(i,a){const o=de(xe(i.latitude),xe(a.latitude));return o!==0?o:de(xe(i.longitude),xe(a.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return wu(r.arrayValue,e.arrayValue);case 10:return function(i,a){var p,C,m,I;const o=i.fields||{},B=a.fields||{},c=(p=o[ci])==null?void 0:p.arrayValue,h=(C=B[ci])==null?void 0:C.arrayValue,d=de(((m=c==null?void 0:c.values)==null?void 0:m.length)||0,((I=h==null?void 0:h.values)==null?void 0:I.length)||0);return d!==0?d:wu(c,h)}(r.mapValue,e.mapValue);case 11:return function(i,a){if(i===Zi.mapValue&&a===Zi.mapValue)return 0;if(i===Zi.mapValue)return 1;if(a===Zi.mapValue)return-1;const o=i.fields||{},B=Object.keys(o),c=a.fields||{},h=Object.keys(c);B.sort(),h.sort();for(let d=0;d<B.length&&d<h.length;++d){const p=ll(B[d],h[d]);if(p!==0)return p;const C=bt(o[B[d]],c[h[d]]);if(C!==0)return C}return de(B.length,h.length)}(r.mapValue,e.mapValue);default:throw oe(23264,{u:t})}}function yu(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return de(r,e);const t=qn(r),n=qn(e),s=de(t.seconds,n.seconds);return s!==0?s:de(t.nanos,n.nanos)}function wu(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=bt(t[s],n[s]);if(i!==void 0&&i!==0)return i}return de(t.length,n.length)}function os(r){return Bl(r)}function Bl(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=qn(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return zn(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return ie.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Bl(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${Bl(t.fields[a])}`;return s+"}"}(r.mapValue):oe(61005,{value:r})}function ia(r){switch($e(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ii(r);return e?16+ia(e):16;case 5:return 2*r.stringValue.length;case 6:return zn(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+ia(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Rr(n.fields,(i,a)=>{s+=i.length+ia(a)}),s}(r.mapValue);default:throw oe(13486,{value:r})}}function an(r){return!!r&&"integerValue"in r}function mr(r){return!!r&&"doubleValue"in r}function Kn(r){return an(r)||mr(r)}function ls(r){return!!r&&"arrayValue"in r}function Rt(r){return!!r&&"nullValue"in r}function It(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function yr(r){return!!r&&"mapValue"in r}function Ea(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Kh])==null?void 0:n.stringValue)===Qh}function cl(r){var e,t;return(t=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[ci])==null?void 0:t.arrayValue}function Ws(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return Rr(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Ws(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ws(r.arrayValue.values[t]);return e}return{...r}}function um(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===cm}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this.value=e}static empty(){return new Pt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!yr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ws(t)}setAll(e){let t=Nt.emptyPath(),n={},s=[];e.forEach((a,o)=>{if(!t.isImmediateParentOf(o)){const B=this.getFieldsMap(t);this.applyChanges(B,n,s),n={},s=[],t=o.popLast()}a?n[o.lastSegment()]=Ws(a):s.push(o.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());yr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Vt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];yr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Rr(t,(s,i)=>e[s]=i);for(const s of n)delete e[s]}clone(){return new Pt(Ws(this.value))}}function Wh(r){const e=[];return Rr(r.fields,(t,n)=>{const s=new Nt([t]);if(yr(n)){const i=Wh(n.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Jt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Bi(e)?"-0":e}}function Ll(r){return{integerValue:""+r}}function kl(r,e,t){return lm(e)?Ll(e):Ga(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(){this._=void 0}}function hm(r,e,t){return r instanceof ya?function(s,i){const a={fields:{[Jh]:{stringValue:$h},[zh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ma(i)&&(i=Ii(i)),i&&(a.fields[qh]=i),{mapValue:a}}(t,e):r instanceof hi?Xh(r,e):r instanceof di?Zh(r,e):r instanceof fi?function(s,i){const a=Yh(s,i),o=va(a)+va(s.l);return an(a)&&an(s.l)?Ll(o):Ga(s.serializer,o)}(r,e):r instanceof wa?function(s,i){return Du(s,i,Math.min)}(r,e):r instanceof Da?function(s,i){return Du(s,i,Math.max)}(r,e):void 0}function dm(r,e,t){return r instanceof hi?Xh(r,e):r instanceof di?Zh(r,e):t}function Yh(r,e){return r instanceof fi?Kn(e)?e:{integerValue:0}:null}class ya extends Ha{}class hi extends Ha{constructor(e){super(),this.elements=e}}function Xh(r,e){const t=ed(e);for(const n of r.elements)t.some(s=>Vt(s,n))||t.push(n);return{arrayValue:{values:t}}}class di extends Ha{constructor(e){super(),this.elements=e}}function Zh(r,e){let t=ed(e);for(const n of r.elements)t=t.filter(s=>!Vt(s,n));return{arrayValue:{values:t}}}class Ml extends Ha{constructor(e,t){super(),this.serializer=e,this.l=t}}class fi extends Ml{}class wa extends Ml{}class Da extends Ml{}function Du(r,e,t){if(!Kn(e))return r.l;const n=t(va(e),va(r.l));return an(e)&&an(r.l)?Ll(n):Ga(r.serializer,n)}function va(r){return xe(r.integerValue||r.doubleValue)}function ed(r){return ls(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function fm(r,e){return r.field.isEqual(e.field)&&function(n,s){return n instanceof hi&&s instanceof hi||n instanceof di&&s instanceof di?ss(n.elements,s.elements,Vt):n instanceof fi&&s instanceof fi||n instanceof wa&&s instanceof wa||n instanceof Da&&s instanceof Da?Vt(n.l,s.l):n instanceof ya&&s instanceof ya}(r.transform,e.transform)}class Cm{constructor(e,t){this.version=e,this.transformResults=t}}class wn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new wn}static exists(e){return new wn(void 0,e)}static updateTime(e){return new wn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function aa(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Ua{}function td(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new rd(r.key,wn.none()):new Ti(r.key,r.data,wn.none());{const t=r.data,n=Pt.empty();let s=new Ue(Nt.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new Fr(r.key,n,new Jt(s.toArray()),wn.none())}}function pm(r,e,t){r instanceof Ti?function(s,i,a){const o=s.value.clone(),B=_u(s.fieldTransforms,i,a.transformResults);o.setAll(B),i.convertToFoundDocument(a.version,o).setHasCommittedMutations()}(r,e,t):r instanceof Fr?function(s,i,a){if(!aa(s.precondition,i))return void i.convertToUnknownDocument(a.version);const o=_u(s.fieldTransforms,i,a.transformResults),B=i.data;B.setAll(nd(s)),B.setAll(o),i.convertToFoundDocument(a.version,B).setHasCommittedMutations()}(r,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ys(r,e,t,n){return r instanceof Ti?function(i,a,o,B){if(!aa(i.precondition,a))return o;const c=i.value.clone(),h=bu(i.fieldTransforms,B,a);return c.setAll(h),a.convertToFoundDocument(a.version,c).setHasLocalMutations(),null}(r,e,t,n):r instanceof Fr?function(i,a,o,B){if(!aa(i.precondition,a))return o;const c=bu(i.fieldTransforms,B,a),h=a.data;return h.setAll(nd(i)),h.setAll(c),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),o===null?null:o.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(d=>d.field))}(r,e,t,n):function(i,a,o){return aa(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):o}(r,e,t)}function gm(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Yh(n.transform,s||null);i!=null&&(t===null&&(t=Pt.empty()),t.set(n.field,i))}return t||null}function vu(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&ss(n,s,(i,a)=>fm(i,a))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class Ti extends Ua{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Fr extends Ua{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function nd(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function _u(r,e,t){const n=new Map;ee(r.length===t.length,32656,{h:t.length,T:r.length});for(let s=0;s<t.length;s++){const i=r[s],a=i.transform,o=e.data.field(i.field);n.set(i.field,dm(a,o,t[s]))}return n}function bu(r,e,t){const n=new Map;for(const s of r){const i=s.transform,a=t.data.field(s.field);n.set(s.field,hm(i,a,e))}return n}class rd extends Ua{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class mm extends Ua{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,t){this.position=e,this.inclusive=t}}function Iu(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],a=r.position[s];if(i.field.isKeyField()?n=ie.comparator(ie.fromName(a.referenceValue),t.key):n=bt(a,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Tu(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Vt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{}class qe extends sd{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new ym(e,t,n):t==="array-contains"?new vm(e,n):t==="in"?new _m(e,n):t==="not-in"?new bm(e,n):t==="array-contains-any"?new Im(e,n):new qe(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new wm(e,n):new Dm(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(bt(t,this.value)):t!==null&&$e(this.value)===$e(t)&&this.matchesComparison(bt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return oe(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class un extends sd{constructor(e,t){super(),this.filters=e,this.op=t,this.P=null}static create(e,t){return new un(e,t)}matches(e){return id(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.P!==null||(this.P=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.P}getFilters(){return Object.assign([],this.filters)}}function id(r){return r.op==="and"}function ad(r){return Em(r)&&id(r)}function Em(r){for(const e of r.filters)if(e instanceof un)return!1;return!0}function ul(r){if(r instanceof qe)return r.field.canonicalString()+r.op.toString()+os(r.value);if(ad(r))return r.filters.map(e=>ul(e)).join(",");{const e=r.filters.map(t=>ul(t)).join(",");return`${r.op}(${e})`}}function od(r,e){return r instanceof qe?function(n,s){return s instanceof qe&&n.op===s.op&&n.field.isEqual(s.field)&&Vt(n.value,s.value)}(r,e):r instanceof un?function(n,s){return s instanceof un&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,o)=>i&&od(a,s.filters[o]),!0):!1}(r,e):void oe(19439)}function ld(r){return r instanceof qe?function(t){return`${t.field.canonicalString()} ${t.op} ${os(t.value)}`}(r):r instanceof un?function(t){return t.op.toString()+" {"+t.getFilters().map(ld).join(" ,")+"}"}(r):"Filter"}class ym extends qe{constructor(e,t,n){super(e,t,n),this.key=ie.fromName(n.referenceValue)}matches(e){const t=ie.comparator(e.key,this.key);return this.matchesComparison(t)}}class wm extends qe{constructor(e,t){super(e,"in",t),this.keys=Bd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Dm extends qe{constructor(e,t){super(e,"not-in",t),this.keys=Bd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Bd(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(n=>ie.fromName(n.referenceValue))}class vm extends qe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ls(t)&&ui(t.arrayValue,this.value)}}class _m extends qe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ui(this.value.arrayValue,t)}}class bm extends qe{constructor(e,t){super(e,"not-in",t)}matches(e){if(ui(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ui(this.value.arrayValue,t)}}class Im extends qe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ls(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>ui(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,t="asc"){this.field=e,this.dir=t}}function Tm(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{static fromTimestamp(e){return new Be(e)}static min(){return new Be(new Fe(0,0))}static max(){return new Be(new Fe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t,n,s,i,a,o){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=o}static newInvalidDocument(e){return new ot(e,0,Be.min(),Be.min(),Be.min(),Pt.empty(),0)}static newFoundDocument(e,t,n,s){return new ot(e,1,t,Be.min(),n,s,0)}static newNoDocument(e,t){return new ot(e,2,t,Be.min(),Be.min(),Pt.empty(),0)}static newUnknownDocument(e,t){return new ot(e,3,t,Be.min(),Be.min(),Pt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Be.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Pt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Pt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Be.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ot&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ot(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci=-1;function Sm(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=Be.fromTimestamp(n===1e9?new Fe(t+1,0):new Fe(t,n));return new Qn(s,ie.empty(),e)}function Am(r){return new Qn(r.readTime,r.key,Ci)}class Qn{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Qn(Be.min(),ie.empty(),Ci)}static max(){return new Qn(Be.max(),ie.empty(),Ci)}}function Pm(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=ie.comparator(r.documentKey,e.documentKey),t!==0?t:de(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(e,t=null,n=[],s=[],i=null,a=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=o,this.R=null}}function Su(r,e=null,t=[],n=[],s=null,i=null,a=null){return new Rm(r,e,t,n,s,i,a)}function cd(r){const e=ce(r);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>ul(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),Va(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>os(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>os(n)).join(",")),e.R=t}return e.R}function ud(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!Tm(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!od(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Tu(r.startAt,e.startAt)&&Tu(r.endAt,e.endAt)}function pr(r){return!!r.isCorePipeline}function hd(r){return!!r.path&&ie.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,t=null,n=[],s=[],i=null,a="F",o=null,B=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=o,this.endAt=B,this.I=null,this.A=null,this.V=null,this.startAt,this.endAt}}function Fm(r,e,t,n,s,i,a,o){return new ja(r,e,t,n,s,i,a,o)}function Vl(r){return new ja(r)}function Au(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Nm(r){return ie.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function xm(r){return r.collectionGroup!==null}function Xs(r){const e=ce(r);if(e.I===null){e.I=[];const t=new Set;for(const i of e.explicitOrderBy)e.I.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let o=new Ue(Nt.comparator);return a.filters.forEach(B=>{B.getFlattenedFilters().forEach(c=>{c.isInequality()&&(o=o.add(c.field))})}),o})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.I.push(new ba(i,n))}),t.has(Nt.keyField().canonicalString())||e.I.push(new ba(Nt.keyField(),n))}return e.I}function ln(r){const e=ce(r);return e.A||(e.A=Om(e,Xs(r))),e.A}function Om(r,e){if(r.limitType==="F")return Su(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new ba(s.field,i)});const t=r.endAt?new _a(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new _a(r.startAt.position,r.startAt.inclusive):null;return Su(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function hl(r,e,t){return new ja(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function Lm(r,e){return ud(ln(r),ln(e))&&r.limitType===e.limitType}function Zs(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>ld(s)).join(", ")}]`),Va(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>os(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>os(s)).join(",")),`Target(${n})`}(ln(r))}; limitType=${r.limitType})`}function $a(r,e){return e.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):ie.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,e)&&function(n,s){for(const i of Xs(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,e)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,e)&&function(n,s){return!(n.startAt&&!function(a,o,B){const c=Iu(a,o,B);return a.inclusive?c<=0:c<0}(n.startAt,Xs(n),s)||n.endAt&&!function(a,o,B){const c=Iu(a,o,B);return a.inclusive?c>=0:c>0}(n.endAt,Xs(n),s))}(r,e)}function Gl(r){return(e,t)=>{let n=!1;for(const s of Xs(r)){const i=km(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function km(r,e,t){const n=r.field.isKeyField()?ie.comparator(e.key,t.key):function(i,a,o){const B=a.data.field(i),c=o.data.field(i);return B!==null&&c!==null?bt(B,c):oe(42886)}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return oe(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke,Ce;function Vm(r){switch(r){case U.OK:return oe(64938);case U.CANCELLED:case U.UNKNOWN:case U.DEADLINE_EXCEEDED:case U.RESOURCE_EXHAUSTED:case U.INTERNAL:case U.UNAVAILABLE:case U.UNAUTHENTICATED:return!1;case U.INVALID_ARGUMENT:case U.NOT_FOUND:case U.ALREADY_EXISTS:case U.PERMISSION_DENIED:case U.FAILED_PRECONDITION:case U.ABORTED:case U.OUT_OF_RANGE:case U.UNIMPLEMENTED:case U.DATA_LOSS:return!0;default:return oe(15467,{code:r})}}function dd(r){if(r===void 0)return In("GRPC error has no .code"),U.UNKNOWN;switch(r){case ke.OK:return U.OK;case ke.CANCELLED:return U.CANCELLED;case ke.UNKNOWN:return U.UNKNOWN;case ke.DEADLINE_EXCEEDED:return U.DEADLINE_EXCEEDED;case ke.RESOURCE_EXHAUSTED:return U.RESOURCE_EXHAUSTED;case ke.INTERNAL:return U.INTERNAL;case ke.UNAVAILABLE:return U.UNAVAILABLE;case ke.UNAUTHENTICATED:return U.UNAUTHENTICATED;case ke.INVALID_ARGUMENT:return U.INVALID_ARGUMENT;case ke.NOT_FOUND:return U.NOT_FOUND;case ke.ALREADY_EXISTS:return U.ALREADY_EXISTS;case ke.PERMISSION_DENIED:return U.PERMISSION_DENIED;case ke.FAILED_PRECONDITION:return U.FAILED_PRECONDITION;case ke.ABORTED:return U.ABORTED;case ke.OUT_OF_RANGE:return U.OUT_OF_RANGE;case ke.UNIMPLEMENTED:return U.UNIMPLEMENTED;case ke.DATA_LOSS:return U.DATA_LOSS;default:return oe(39323,{code:r})}}(Ce=ke||(ke={}))[Ce.OK=0]="OK",Ce[Ce.CANCELLED=1]="CANCELLED",Ce[Ce.UNKNOWN=2]="UNKNOWN",Ce[Ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ce[Ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ce[Ce.NOT_FOUND=5]="NOT_FOUND",Ce[Ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ce[Ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ce[Ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ce[Ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ce[Ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ce[Ce.ABORTED=10]="ABORTED",Ce[Ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ce[Ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ce[Ce.INTERNAL=13]="INTERNAL",Ce[Ce.UNAVAILABLE=14]="UNAVAILABLE",Ce[Ce.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Rr(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return Hh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm=new Ne(ie.comparator);function wt(){return Gm}const fd=new Ne(ie.comparator);function Yr(...r){let e=fd;for(const t of r)e=e.insert(t.key,t);return e}function Cd(r){let e=fd;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Mn(){return ei()}function pd(){return ei()}function ei(){return new Nr(r=>r.toString(),(r,e)=>r.isEqual(e))}const Hm=new Ne(ie.comparator),Um=new Ue(ie.comparator);function he(...r){let e=Um;for(const t of r)e=e.add(t);return e}const jm=new Ue(de);function $m(){return jm}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jm(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm=new Un([4294967295,4294967295],0);function Pu(r){const e=Jm().encode(r),t=new Sh;return t.update(e),new Uint8Array(t.digest())}function Ru(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Un([t,n],0),new Un([s,i],0)]}class Hl{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new qs(`Invalid padding: ${t}`);if(n<0)throw new qs(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new qs(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new qs(`Invalid padding when bitmap length is 0: ${t}`);this.m=8*e.length-t,this.p=Un.fromNumber(this.m)}v(e,t,n){let s=e.add(t.multiply(Un.fromNumber(n)));return s.compare(qm)===1&&(s=new Un([s.getBits(0),s.getBits(1)],0)),s.modulo(this.p).toNumber()}S(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.m===0)return!1;const t=Pu(e),[n,s]=Ru(t);for(let i=0;i<this.hashCount;i++){const a=this.v(n,s,i);if(!this.S(a))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Hl(i,s,t);return n.forEach(o=>a.insert(o)),a}insert(e){if(this.m===0)return;const t=Pu(e),[n,s]=Ru(t);for(let i=0;i<this.hashCount;i++){const a=this.v(n,s,i);this.D(a)}}D(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class qs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e,t,n,s,i,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Ai.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Si(Be.min(),s,new Ne(de),wt(),wt(),he())}}class Ai{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Ai(n,t,he(),he(),he())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(e,t,n,s){this.C=e,this.removedTargetIds=t,this.key=n,this.F=s}}class gd{constructor(e,t){this.targetId=e,this.O=t}}class md{constructor(e,t,n=je.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Fu{constructor(e){this.targetId=e,this.M=0,this.N=Nu(),this.L=je.EMPTY_BYTE_STRING,this.B=!1,this.U=!0}get current(){return this.B}get resumeToken(){return this.L}get k(){return this.M!==0}get q(){return this.U}$(e){e.approximateByteSize()>0&&(this.U=!0,this.L=e)}K(){let e=he(),t=he(),n=he();return this.N.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:oe(38017,{changeType:i})}}),new Ai(this.L,this.B,e,t,n)}W(){this.U=!1,this.N=Nu()}G(e,t){this.U=!0,this.N=this.N.insert(e,t)}j(e){this.U=!0,this.N=this.N.remove(e)}H(){this.M+=1}J(){this.M-=1,ee(this.M>=0,3241,{M:this.M,targetId:this.targetId})}Y(){this.U=!0,this.B=!0}}const Us="WatchChangeAggregator";class zm{constructor(e){this.Z=e,this.X=new Map,this.ee=wt(),this.te=ea(),this.ne=wt(),this.re=ea(),this.ie=new Ne(de)}se(e){for(const t of e.C)e.F&&e.F.isFoundDocument()?this._e(t,e.F):this.oe(t,e.key,e.F);for(const t of e.removedTargetIds)this.oe(t,e.key,e.F)}ae(e){this.forEachTarget(e,t=>{const n=this.X.get(t);if(n)switch(e.state){case 0:this.ue(t)&&n.$(e.resumeToken);break;case 1:n.J(),n.k||n.W(),n.$(e.resumeToken);break;case 2:n.J(),n.k||this.removeTarget(t);break;case 3:this.ue(t)&&(n.Y(),n.$(e.resumeToken));break;case 4:this.ue(t)&&(this.ce(t),n.$(e.resumeToken));break;default:oe(56790,{state:e.state})}else Q(Us,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.X.forEach((n,s)=>{this.ue(s)&&t(s)})}le(e){var t;return pr(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:hd(e)}Ee(e){const t=e.targetId,n=e.O.count,s=this.he(t);if(s){const i=s.target;if(this.le(i))if(n===0){const a=new ie(pr(i)?we.fromString(i.getPipelineDocuments()[0]):i.path);this.oe(t,a,ot.newNoDocument(a,Be.min()))}else ee(n===1,20013,"Single document existence filter with count: "+n);else{const a=this.Te(t);if(a!==n){const o=this.Pe(e),B=o?this.Re(o,e,a):1;if(B!==0){this.ce(t);const c=B===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ie=this.ie.insert(t,c)}}}}}Pe(e){const t=e.O.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let a,o;try{a=zn(n).toUint8Array()}catch(B){if(B instanceof jh)return Qt("Decoding the base64 bloom filter in existence filter failed ("+B.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw B}try{o=new Hl(a,s,i)}catch(B){return Qt(B instanceof qs?"BloomFilter error: ":"Applying bloom filter failed: ",B),null}return o.m===0?null:o}Re(e,t,n){return t.O.count===n-this.Ve(e,t.targetId)?0:2}Ve(e,t){const n=this.Z.getRemoteKeysForTarget(t);let s=0;return n.forEach(i=>{const a=this.Z.Ae(),o=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(o)||(this.oe(t,i,null),s++)}),s}de(e){const t=new Map;this.X.forEach((i,a)=>{const o=this.he(a);if(o){if(i.current&&this.le(o.target)){const B=pr(o.target)?we.fromString(o.target.getPipelineDocuments()[0]):o.target.path,c=new ie(B);this.fe(c).has(a)||this.me(a,c)||this.oe(a,c,ot.newNoDocument(c,e))}i.q&&(t.set(a,i.K()),i.W())}});let n=he();this.re.forEach((i,a)=>{let o=!0;a.forEachWhile(B=>{const c=this.he(B);return!c||c.purpose==="TargetPurposeLimboResolution"||(o=!1,!1)}),o&&(n=n.add(i))}),this.ee.forEach((i,a)=>a.setReadTime(e)),this.ne.forEach((i,a)=>a.setReadTime(e));const s=new Si(e,t,this.ie,this.ee,this.ne,n);return this.ee=wt(),this.te=ea(),this.ne=wt(),this.re=ea(),this.ie=new Ne(de),s}_e(e,t){const n=this.X.get(e);if(!n||!this.ue(e))return void Q(Us,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.me(e,t.key)?2:0;n.G(t.key,s),pr(this.he(e).target)&&this.he(e).target.getPipelineFlavor()!=="exact"?this.ne=this.ne.insert(t.key,t):this.ee=this.ee.insert(t.key,t),this.te=this.te.insert(t.key,this.fe(t.key).add(e)),this.re=this.re.insert(t.key,this.pe(t.key).add(e))}oe(e,t,n){const s=this.X.get(e);s&&this.ue(e)?(this.me(e,t)?s.G(t,1):s.j(t),this.re=this.re.insert(t,this.pe(t).delete(e)),this.re=this.re.insert(t,this.pe(t).add(e)),n&&(pr(this.he(e).target)&&this.he(e).target.getPipelineFlavor()!=="exact"?this.ne=this.ne.insert(t,n):this.ee=this.ee.insert(t,n))):Q(Us,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.X.delete(e)}Te(e){const t=this.X.get(e);if(!t)return 0;const n=t.K();return this.Z.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}H(e){let t=this.X.get(e);t||(Q(Us,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Fu(e),this.X.set(e,t)),t.H()}pe(e){let t=this.re.get(e);return t||(t=new Ue(de),this.re=this.re.insert(e,t)),t}fe(e){let t=this.te.get(e);return t||(t=new Ue(de),this.te=this.te.insert(e,t)),t}ue(e){const t=this.he(e)!==null;return t||Q(Us,"Detected inactive target",e),t}he(e){const t=this.X.get(e);return t===void 0||t.k?null:this.Z.ge(e)}ce(e){this.X.set(e,new Fu(e)),this.Z.getRemoteKeysForTarget(e).forEach(t=>{this.oe(e,t,null)})}me(e,t){return this.Z.getRemoteKeysForTarget(e).has(t)}}function ea(){return new Ne(ie.comparator)}function Nu(){return new Ne(ie.comparator)}const Km={asc:"ASCENDING",desc:"DESCENDING"},Qm={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Wm={and:"AND",or:"OR"};class Ym{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function dl(r,e){return r.useProto3Json||Va(e)?e:{value:e}}function Ia(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ul(r){const e=qn(r);return new Fe(e.seconds,e.nanos)}function Ed(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function la(r,e){return Ia(r,e.toTimestamp())}function Bn(r){return ee(!!r,49232),Be.fromTimestamp(Ul(r))}function jl(r,e){return fl(r,e).canonicalString()}function fl(r,e){const t=function(s){return new we(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?t:t.child(e)}function yd(r){const e=we.fromString(r);return ee(bd(e),10190,{key:e.toString()}),e}function Ta(r,e){return jl(r.databaseId,e.path)}function $o(r,e){const t=yd(e);if(t.get(1)!==r.databaseId.projectId)throw new Z(U.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new Z(U.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new ie(Dd(t))}function wd(r,e){return jl(r.databaseId,e)}function Xm(r){const e=yd(r);return e.length===4?we.emptyPath():Dd(e)}function Cl(r){return new we(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Dd(r){return ee(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function xu(r,e,t){return{name:Ta(r,e),fields:t.value.mapValue.fields}}function Zm(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:oe(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,h){return c.useProto3Json?(ee(h===void 0||typeof h=="string",58123),je.fromBase64String(h||"")):(ee(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),je.fromUint8Array(h||new Uint8Array))}(r,e.targetChange.resumeToken),a=e.targetChange.cause,o=a&&function(c){const h=c.code===void 0?U.UNKNOWN:dd(c.code);return new Z(h,c.message||"")}(a);t=new md(n,s,i,o||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=$o(r,n.document.name),i=Bn(n.document.updateTime),a=n.document.createTime?Bn(n.document.createTime):Be.min(),o=new Pt({mapValue:{fields:n.document.fields}}),B=ot.newFoundDocument(s,i,a,o),c=n.targetIds||[],h=n.removedTargetIds||[];t=new oa(c,h,B.key,B)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=$o(r,n.document),i=n.readTime?Bn(n.readTime):Be.min(),a=ot.newNoDocument(s,i),o=n.removedTargetIds||[];t=new oa([],o,a.key,a)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=$o(r,n.document),i=n.removedTargetIds||[];t=new oa([],i,s,null)}else{if(!("filter"in e))return oe(11601,{ye:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new Mm(s,i),o=n.targetId;t=new gd(o,a)}}return t}function eE(r,e){let t;if(e instanceof Ti)t={update:xu(r,e.key,e.value)};else if(e instanceof rd)t={delete:Ta(r,e.key)};else if(e instanceof Fr)t={update:xu(r,e.key,e.data),updateMask:cE(e.fieldMask)};else{if(!(e instanceof mm))return oe(16599,{we:e.type});t={verify:Ta(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(i,a){const o=a.transform;if(o instanceof ya)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof hi)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof di)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof fi)return{fieldPath:a.field.canonicalString(),increment:o.l};if(o instanceof wa)return{fieldPath:a.field.canonicalString(),minimum:o.l};if(o instanceof Da)return{fieldPath:a.field.canonicalString(),maximum:o.l};throw oe(20930,{transform:a.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:la(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:oe(27497)}(r,e.precondition)),t}function tE(r,e){return r&&r.length>0?(ee(e!==void 0,14353),r.map(t=>function(s,i){let a=s.updateTime?Bn(s.updateTime):Bn(i);return a.isEqual(Be.min())&&(a=Bn(i)),new Cm(a,s.transformResults||[])}(t,e))):[]}function nE(r,e){return{documents:[wd(r,e.path)]}}function rE(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=wd(r,s);const i=function(c){if(c.length!==0)return _d(un.create(c,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(c){if(c.length!==0)return c.map(h=>function(p){return{field:Xr(p.field),direction:oE(p.dir)}}(h))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const o=dl(r,e.limit);return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{be:t,parent:s}}function sE(r){let e=Xm(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){ee(n===1,65062);const h=t.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];t.where&&(i=function(d){const p=vd(d);return p instanceof un&&ad(p)?p.getFilters():[p]}(t.where));let a=[];t.orderBy&&(a=function(d){return d.map(p=>function(m){return new ba(Zr(m.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(m.direction))}(p))}(t.orderBy));let o=null;t.limit&&(o=function(d){let p;return p=typeof d=="object"?d.value:d,Va(p)?null:p}(t.limit));let B=null;t.startAt&&(B=function(d){const p=!!d.before,C=d.values||[];return new _a(C,p)}(t.startAt));let c=null;return t.endAt&&(c=function(d){const p=!d.before,C=d.values||[];return new _a(C,p)}(t.endAt)),Fm(e,s,a,i,o,"F",B,c)}function iE(r,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return oe(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function aE(r,e){return{structuredPipeline:{pipeline:{stages:e.stages.map(t=>t._toProto(r))}}}}function vd(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Zr(t.unaryFilter.field);return qe.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Zr(t.unaryFilter.field);return qe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Zr(t.unaryFilter.field);return qe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Zr(t.unaryFilter.field);return qe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return oe(61313);default:return oe(60726)}}(r):r.fieldFilter!==void 0?function(t){return qe.create(Zr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return oe(58110);default:return oe(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return un.create(t.compositeFilter.filters.map(n=>vd(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return oe(1026)}}(t.compositeFilter.op))}(r):oe(30097,{filter:r})}function oE(r){return Km[r]}function lE(r){return Qm[r]}function BE(r){return Wm[r]}function Xr(r){return{fieldPath:r.canonicalString()}}function Zr(r){return Nt.fromServerFormat(r.fieldPath)}function _d(r){return r instanceof qe?function(t){if(t.op==="=="){if(It(t.value))return{unaryFilter:{field:Xr(t.field),op:"IS_NAN"}};if(Rt(t.value))return{unaryFilter:{field:Xr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(It(t.value))return{unaryFilter:{field:Xr(t.field),op:"IS_NOT_NAN"}};if(Rt(t.value))return{unaryFilter:{field:Xr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xr(t.field),op:lE(t.op),value:t.value}}}(r):r instanceof un?function(t){const n=t.getFilters().map(s=>_d(s));return n.length===1?n[0]:{compositeFilter:{op:BE(t.op),filters:n}}}(r):oe(54877,{filter:r})}function cE(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function bd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Id(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}function pi(r,e){const t={fields:{}};return e.forEach((n,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=n._toProto(r)}),{mapValue:t}}function Td(r){return{stringValue:r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(r){return new Ym(r,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Lt(je.fromBase64String(e))}catch(t){throw new Z(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Lt(je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Lt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(bi(e,Lt._jsonSchema))return Lt.fromBase64String(e.bytes)}}Lt._jsonSchemaVersion="firestore/bytes/1.0",Lt._jsonSchema={type:Ge("string",Lt._jsonSchemaVersion),bytes:Ge("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new Z(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Nt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function uE(){return new $l(sn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Z(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Z(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return de(this._lat,e._lat)||de(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:cn._jsonSchemaVersion}}static fromJSON(e){if(bi(e,cn._jsonSchema))return new cn(e.latitude,e.longitude)}}cn._jsonSchemaVersion="firestore/geoPoint/1.0",cn._jsonSchema={type:Ge("string",cn._jsonSchemaVersion),latitude:Ge("number"),longitude:Ge("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}at.UNAUTHENTICATED=new at(null),at.GOOGLE_CREDENTIALS=new at("google-credentials-uid"),at.FIRST_PARTY=new at("first-party-uid"),at.MOCK_USER=new at("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class hE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(at.UNAUTHENTICATED))}shutdown(){}}class dE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class fE{constructor(e){this.Se=e,this.currentUser=at.UNAUTHENTICATED,this.De=0,this.forceRefresh=!1,this.auth=null}start(e,t){ee(this.xe===void 0,42304);let n=this.De;const s=B=>this.De!==n?(n=this.De,t(B)):Promise.resolve();let i=new Dn;this.xe=()=>{this.De++,this.currentUser=this.Ce(),i.resolve(),i=new Dn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const B=i;e.enqueueRetryable(async()=>{await B.promise,await s(this.currentUser)})},o=B=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=B,this.xe&&(this.auth.addAuthTokenListener(this.xe),a())};this.Se.onInit(B=>o(B)),setTimeout(()=>{if(!this.auth){const B=this.Se.getImmediate({optional:!0});B?o(B):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Dn)}},0),a()}getToken(){const e=this.De,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.De!==e?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(ee(typeof n.accessToken=="string",31837,{Fe:n}),new Ad(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.xe&&this.auth.removeAuthTokenListener(this.xe),this.xe=void 0}Ce(){const e=this.auth&&this.auth.getUid();return ee(e===null||typeof e=="string",2055,{Oe:e}),new at(e)}}class CE{constructor(e,t,n){this.Me=e,this.Ne=t,this.Le=n,this.type="FirstParty",this.user=at.FIRST_PARTY,this.Be=new Map}Ue(){return this.Le?this.Le():null}get headers(){this.Be.set("X-Goog-AuthUser",this.Me);const e=this.Ue();return e&&this.Be.set("Authorization",e),this.Ne&&this.Be.set("X-Goog-Iam-Authorization-Token",this.Ne),this.Be}}class pE{constructor(e,t,n){this.Me=e,this.Ne=t,this.Le=n}getToken(){return Promise.resolve(new CE(this.Me,this.Ne,this.Le))}start(e,t){e.enqueueRetryable(()=>t(at.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ou{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class gE{constructor(e,t){this.ke=t,this.forceRefresh=!1,this.appCheck=null,this.qe=null,this.$e=null,lg(e)&&e.settings.appCheckToken&&(this.$e=e.settings.appCheckToken)}start(e,t){ee(this.xe===void 0,3512);const n=i=>{i.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.qe;return this.qe=i.token,Q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.xe=i=>{e.enqueueRetryable(()=>n(i))};const s=i=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.xe&&this.appCheck.addTokenListener(this.xe)};this.ke.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.ke.getImmediate({optional:!0});i?s(i):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.$e)return Promise.resolve(new Ou(this.$e));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ee(typeof t.token=="string",44558,{tokenResult:t}),this.qe=t.token,new Ou(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.xe&&this.appCheck.removeTokenListener(this.xe),this.xe=void 0}}function Pd(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mE{Ke(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu="ConnectivityMonitor";class ku{constructor(){this.We=()=>this.Qe(),this.Ge=()=>this.ze(),this.je=[],this.He()}Ke(e){this.je.push(e)}shutdown(){window.removeEventListener("online",this.We),window.removeEventListener("offline",this.Ge)}He(){window.addEventListener("online",this.We),window.addEventListener("offline",this.Ge)}Qe(){Q(Lu,"Network connectivity changed: AVAILABLE");for(const e of this.je)e(0)}ze(){Q(Lu,"Network connectivity changed: UNAVAILABLE");for(const e of this.je)e(1)}static Je(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ta=null;function pl(){return ta===null?ta=function(){return 268435456+Math.round(2147483648*Math.random())}():ta++,"0x"+ta.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo="RestConnection",EE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class yE{get Ye(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ze=t+"://"+e.host,this.Xe=`projects/${n}/databases/${s}`,this.et=this.databaseId.database===ma?`project_id=${n}`:`project_id=${n}&database_id=${s}`}tt(e,t,n,s,i){const a=pl(),o=this.nt(e,t.toUriEncodedString());Q(Jo,`Sending RPC '${e}' ${a}:`,o,n);const B={"google-cloud-resource-prefix":this.Xe,"x-goog-request-params":this.et};this.rt(B,s,i);const{host:c}=new URL(o),h=wh(c);return this.it(e,o,B,n,h).then(d=>(Q(Jo,`Received RPC '${e}' ${a}: `,d),d),d=>{throw Qt(Jo,`RPC '${e}' ${a} failed with error: `,d,"url: ",o,"request:",n),d})}st(e,t,n,s,i,a){return this.tt(e,t,n,s,i)}rt(e,t,n){if(e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+fs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),n&&n.headers.forEach((s,i)=>e[i]=s),this.databaseInfo._customHeaders)for(const s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}nt(e,t){const n=EE[e];let s=`${this.Ze}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wE{constructor(e){this._t=e._t,this.ot=e.ot}ut(e){this.ct=e}lt(e){this.Et=e}ht(e){this.Tt=e}onMessage(e){this.Pt=e}close(){this.ot()}send(e){this._t(e)}Rt(){this.ct()}It(){this.Et()}At(e){this.Tt(e)}Vt(e){this.Pt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st="WebChannelConnection",js=(r,e,t)=>{r.listen(e,n=>{try{t(n)}catch(s){setTimeout(()=>{throw s},0)}})};class ns extends yE{constructor(e){super(e),this.dt=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static ft(){if(!ns.gt){const e=Fh();js(e,Rh.STAT_EVENT,t=>{t.stat===sl.PROXY?Q(st,"STAT_EVENT: detected buffering proxy"):t.stat===sl.NOPROXY&&Q(st,"STAT_EVENT: detected no buffering proxy")}),ns.gt=!0}}it(e,t,n,s,i){const a=pl();return new Promise((o,B)=>{const c=new Ah;c.setWithCredentials(!0),c.listenOnce(Ph.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case sa.NO_ERROR:const d=c.getResponseJson();Q(st,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(d)),o(d);break;case sa.TIMEOUT:Q(st,`RPC '${e}' ${a} timed out`),B(new Z(U.DEADLINE_EXCEEDED,"Request time out"));break;case sa.HTTP_ERROR:const p=c.getStatus();if(Q(st,`RPC '${e}' ${a} failed with status:`,p,"response text:",c.getResponseText()),p>0){let C=c.getResponseJson();Array.isArray(C)&&(C=C[0]);const m=C==null?void 0:C.error;if(m&&m.status&&m.message){const I=function(F){const L=F.toLowerCase().replace(/_/g,"-");return Object.values(U).indexOf(L)>=0?L:U.UNKNOWN}(m.status);B(new Z(I,m.message))}else B(new Z(U.UNKNOWN,"Server responded with status "+c.getStatus()))}else B(new Z(U.UNAVAILABLE,"Connection failed."));break;default:oe(9055,{yt:e,streamId:a,wt:c.getLastErrorCode(),bt:c.getLastError()})}}finally{Q(st,`RPC '${e}' ${a} completed.`)}});const h=JSON.stringify(s);Q(st,`RPC '${e}' ${a} sending request:`,s),c.send(t,"POST",h,n,15)})}vt(e,t,n){const s=pl(),i=[this.Ze,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},B=this.longPollingOptions.timeoutSeconds;B!==void 0&&(o.longPollingTimeout=Math.round(1e3*B)),this.useFetchStreams&&(o.useFetchStreams=!0),this.rt(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const c=i.join("");Q(st,`Creating RPC '${e}' stream ${s}: ${c}`,o);const h=a.createWebChannel(c,o);this.St(h);let d=!1,p=!1;const C=new wE({_t:m=>{p?Q(st,`Not sending because RPC '${e}' stream ${s} is closed:`,m):(d||(Q(st,`Opening RPC '${e}' stream ${s} transport.`),h.open(),d=!0),Q(st,`RPC '${e}' stream ${s} sending:`,m),h.send(m))},ot:()=>h.close()});return js(h,Js.EventType.OPEN,()=>{p||(Q(st,`RPC '${e}' stream ${s} transport opened.`),C.Rt())}),js(h,Js.EventType.CLOSE,()=>{p||(p=!0,Q(st,`RPC '${e}' stream ${s} transport closed`),C.At(),this.Dt(h))}),js(h,Js.EventType.ERROR,m=>{p||(p=!0,Qt(st,`RPC '${e}' stream ${s} transport errored. Name:`,m.name,"Message:",m.message),C.At(new Z(U.UNAVAILABLE,"The operation could not be completed")))}),js(h,Js.EventType.MESSAGE,m=>{var I;if(!p){const S=m.data[0];ee(!!S,16349);const F=S,L=(F==null?void 0:F.error)||((I=F[0])==null?void 0:I.error);if(L){Q(st,`RPC '${e}' stream ${s} received error:`,L);const x=L.status;let j=function(_){const E=ke[_];if(E!==void 0)return dd(E)}(x),q=L.message;x==="NOT_FOUND"&&q.includes("database")&&q.includes("does not exist")&&q.includes(this.databaseId.database)&&Qt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),j===void 0&&(j=U.INTERNAL,q="Unknown error status: "+x+" with message "+L.message),p=!0,C.At(new Z(j,q)),h.close()}else Q(st,`RPC '${e}' stream ${s} received:`,S),C.Vt(S)}}),ns.ft(),setTimeout(()=>{C.It()},0),C}terminate(){this.dt.forEach(e=>e.close()),this.dt=[]}St(e){this.dt.push(e)}Dt(e){this.dt=this.dt.filter(t=>t===e)}rt(e,t,n){super.rt(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Nh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DE(r){return new ns(r)}ns.gt=!1;class Rd{constructor(e,t,n=1e3,s=1.5,i=6e4){this.xt=e,this.timerId=t,this.Ct=n,this.Ft=s,this.Ot=i,this.Mt=0,this.Nt=null,this.Lt=Date.now(),this.reset()}reset(){this.Mt=0}Bt(){this.Mt=this.Ot}Ut(e){this.cancel();const t=Math.floor(this.Mt+this.kt()),n=Math.max(0,Date.now()-this.Lt),s=Math.max(0,t-n);s>0&&Q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Mt} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Nt=this.xt.enqueueAfterDelay(this.timerId,s,()=>(this.Lt=Date.now(),e())),this.Mt*=this.Ft,this.Mt<this.Ct&&(this.Mt=this.Ct),this.Mt>this.Ot&&(this.Mt=this.Ot)}qt(){this.Nt!==null&&(this.Nt.skipDelay(),this.Nt=null)}cancel(){this.Nt!==null&&(this.Nt.cancel(),this.Nt=null)}kt(){return(Math.random()-.5)*this.Mt}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu="PersistentStream";class Fd{constructor(e,t,n,s,i,a,o,B){this.xt=e,this.$t=n,this.Kt=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=o,this.listener=B,this.state=0,this.Wt=0,this.Qt=null,this.Gt=null,this.stream=null,this.zt=0,this.jt=new Rd(e,t)}Ht(){return this.state===1||this.state===5||this.Jt()}Jt(){return this.state===2||this.state===3}start(){this.zt=0,this.state!==4?this.auth():this.Yt()}async stop(){this.Ht()&&await this.close(0)}Zt(){this.state=0,this.jt.reset()}Xt(){this.Jt()&&this.Qt===null&&(this.Qt=this.xt.enqueueAfterDelay(this.$t,6e4,()=>this.en()))}tn(e){this.nn(),this.stream.send(e)}async en(){if(this.Jt())return this.close(0)}nn(){this.Qt&&(this.Qt.cancel(),this.Qt=null)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}async close(e,t){this.nn(),this.rn(),this.jt.cancel(),this.Wt++,e!==4?this.jt.reset():t&&t.code===U.RESOURCE_EXHAUSTED?(In(t.toString()),In("Using maximum backoff delay to prevent overloading the backend."),this.jt.Bt()):t&&t.code===U.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.sn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ht(t)}sn(){}auth(){this.state=1;const e=this._n(this.Wt),t=this.Wt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.Wt===t&&this.an(n,s)},n=>{e(()=>{const s=new Z(U.UNKNOWN,"Fetching auth token failed: "+n.message);return this.un(s)})})}an(e,t){const n=this._n(this.Wt);this.stream=this.cn(e,t),this.stream.ut(()=>{n(()=>this.listener.ut())}),this.stream.lt(()=>{n(()=>(this.state=2,this.Gt=this.xt.enqueueAfterDelay(this.Kt,1e4,()=>(this.Jt()&&(this.state=3),Promise.resolve())),this.listener.lt()))}),this.stream.ht(s=>{n(()=>this.un(s))}),this.stream.onMessage(s=>{n(()=>++this.zt==1?this.En(s):this.onNext(s))})}Yt(){this.state=5,this.jt.Ut(async()=>{this.state=0,this.start()})}un(e){return Q(Mu,`close with error: ${e}`),this.stream=null,this.close(4,e)}_n(e){return t=>{this.xt.enqueueAndForget(()=>this.Wt===e?t():(Q(Mu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class vE extends Fd{constructor(e,t,n,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,a),this.serializer=i}cn(e,t){return this.connection.vt("Listen",e,t)}En(e){return this.onNext(e)}onNext(e){this.jt.reset();const t=Zm(this.serializer,e),n=function(i){if(!("targetChange"in i))return Be.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?Be.min():a.readTime?Bn(a.readTime):Be.min()}(e);return this.listener.hn(t,n)}Tn(e){const t={};t.database=Cl(this.serializer),t.addTarget=function(i,a){let o;const B=a.target;if(o=pr(B)?{pipelineQuery:aE(i,B)}:hd(B)?{documents:nE(i,B)}:{query:rE(i,B).be},o.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){o.resumeToken=Ed(i,a.resumeToken);const c=dl(i,a.expectedCount);c!==null&&(o.expectedCount=c)}else if(a.snapshotVersion.compareTo(Be.min())>0){o.readTime=Ia(i,a.snapshotVersion.toTimestamp());const c=dl(i,a.expectedCount);c!==null&&(o.expectedCount=c)}return o}(this.serializer,e);const n=iE(this.serializer,e);n&&(t.labels=n),this.tn(t)}Pn(e){const t={};t.database=Cl(this.serializer),t.removeTarget=e,this.tn(t)}}class _E extends Fd{constructor(e,t,n,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,a),this.serializer=i}get Rn(){return this.zt>0}start(){this.lastStreamToken=void 0,super.start()}sn(){this.Rn&&this.In([])}cn(e,t){return this.connection.vt("Write",e,t)}En(e){return ee(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ee(!e.writeResults||e.writeResults.length===0,55816),this.listener.An()}onNext(e){ee(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.jt.reset();const t=tE(e.writeResults,e.commitTime),n=Bn(e.commitTime);return this.listener.Vn(n,t)}dn(){const e={};e.database=Cl(this.serializer),this.tn(e)}In(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>eE(this.serializer,n))};this.tn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{}class IE extends bE{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.fn=!1}mn(){if(this.fn)throw new Z(U.FAILED_PRECONDITION,"The client has already been terminated.")}tt(e,t,n,s){return this.mn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.tt(e,fl(t,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Z(U.UNKNOWN,i.toString())})}st(e,t,n,s,i){return this.mn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,o])=>this.connection.st(e,fl(t,n),s,a,o,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===U.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new Z(U.UNKNOWN,a.toString())})}terminate(){this.fn=!0,this.connection.terminate()}}function TE(r,e,t,n){return new IE(r,e,t,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SE="ComponentProvider",Vu=new Map;function AE(r,e,t,n,s){return new am(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Pd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n,s._customHeaders,s.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Nd=41943040;class yt{static withCacheSize(e){return new yt(e,yt.DEFAULT_COLLECTION_PERCENTILE,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}yt.DEFAULT_COLLECTION_PERCENTILE=10,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,yt.DEFAULT=new yt(Nd,yt.DEFAULT_COLLECTION_PERCENTILE,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),yt.DISABLED=new yt(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.pn(n),this.gn=n=>t.writeSequenceNumber(n))}pn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.gn&&this.gn(e),e}}qa.yn=-1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class RE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cs(r){if(r.code!==U.FAILED_PRECONDITION||r.message!==PE)throw r;Q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&oe(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new G((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof G?t:G.resolve(t)}catch(t){return G.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):G.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):G.reject(t)}static resolve(e){return new G((t,n)=>{t(e)})}static reject(e){return new G((t,n)=>{n(e)})}static waitFor(e){return new G((t,n)=>{let s=0,i=0,a=!1;e.forEach(o=>{++s,o.next(()=>{++i,a&&i===s&&t()},B=>n(B))}),a=!0,i===s&&t()})}static or(e){let t=G.resolve(!1);for(const n of e)t=t.next(s=>s?G.resolve(s):n());return t}static forEach(e,t){const n=[];return e.forEach((s,i)=>{n.push(t.call(this,s,i))}),this.waitFor(n)}static mapArray(e,t){return new G((n,s)=>{const i=e.length,a=new Array(i);let o=0;for(let B=0;B<i;B++){const c=B;t(e[c]).next(h=>{a[c]=h,++o,o===i&&n(a)},h=>s(h))}})}static doWhile(e,t){return new G((n,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):n()};i()})}}function FE(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ps(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu="LruGarbageCollector",NE=1048576;function Uu([r,e],[t,n]){const s=de(r,t);return s===0?de(e,n):s}class xE{constructor(e){this.Jn=e,this.buffer=new Ue(Uu),this.Yn=0}Zn(){return++this.Yn}Xn(e){const t=[e,this.Zn()];if(this.buffer.size<this.Jn)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Uu(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class OE{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.tr(6e4)}stop(){this.er&&(this.er.cancel(),this.er=null)}get started(){return this.er!==null}tr(e){Q(Hu,`Garbage collection scheduled in ${e}ms`),this.er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ps(t)?Q(Hu,"Ignoring IndexedDB error during garbage collection: ",t):await Cs(t)}await this.tr(3e5)})}}class LE{constructor(e,t){this.nr=e,this.params=t}calculateTargetCount(e,t){return this.nr.rr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return G.resolve(qa.yn);const n=new xE(t);return this.nr.forEachTarget(e,s=>n.Xn(s.sequenceNumber)).next(()=>this.nr.ir(e,s=>n.Xn(s))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.nr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.nr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(Q("LruGarbageCollector","Garbage collection skipped; disabled"),G.resolve(Gu)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Gu):this.sr(e,t))}getCacheSize(e){return this.nr.getCacheSize(e)}sr(e,t){let n,s,i,a,o,B,c;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(Q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),s=this.params.maximumSequenceNumbersToCollect):s=d,a=Date.now(),this.nthSequenceNumber(e,s))).next(d=>(n=d,o=Date.now(),this.removeTargets(e,n,t))).next(d=>(i=d,B=Date.now(),this.removeOrphanedDocuments(e,n))).next(d=>(c=Date.now(),Qr()<=ge.DEBUG&&Q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-h}ms
	Determined least recently used ${s} in `+(o-a)+`ms
	Removed ${i} targets in `+(B-o)+`ms
	Removed ${d} documents in `+(c-B)+`ms
Total Duration: ${c-h}ms`),G.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:d})))}}function kE(r,e){return new LE(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd="firestore.googleapis.com",ju=!0;class $u{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new Z(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=xd,this.ssl=ju}else this.host=e.host,this.ssl=e.ssl??ju;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=Nd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<NE)throw new Z(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(sm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Pd(e.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new Z(U.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new Z(U.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new Z(U.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new Z(U.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&function(n,s){if(n===s)return!0;if(!n||!s)return!1;const i=Object.keys(n),a=Object.keys(s);if(i.length!==a.length)return!1;for(const o of i)if(n[o]!==s[o])return!1;return!0}(this._customHeaders,e._customHeaders)}}let za=class{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new $u({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Z(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Z(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new $u(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new hE;switch(n.type){case"firstParty":return new pE(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new Z(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Vu.get(t);n&&(Q(SE,"Removing Datastore"),Vu.delete(t),n.terminate())}(this),Promise.resolve()}};function ME(r,e,t,n={}){var c;r=Sr(r,za);const s=wh(e),i=r._getSettings(),a={...i,emulatorOptions:r._getEmulatorOptions()},o=`${e}:${t}`;s&&cp(`https://${o}`),i.host!==xd&&i.host!==o&&Qt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const B={...i,host:o,ssl:s,emulatorOptions:n};if(!fa(B,a)&&(r._setSettings(B),n.mockUserToken)){let h,d;if(typeof n.mockUserToken=="string")h=n.mockUserToken,d=at.MOCK_USER;else{h=np(n.mockUserToken,(c=r._app)==null?void 0:c.options.projectId);const p=n.mockUserToken.sub||n.mockUserToken.user_id;if(!p)throw new Z(U.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new at(p)}r._authCredentials=new dE(new Ad(h,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Ka(this.firestore,e,this._query)}}class He{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new He(this.firestore,e,this._key)}toJSON(){return{type:He._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(bi(t,He._jsonSchema))return new He(e,n||null,new ie(we.fromString(t.referencePath)))}}He._jsonSchemaVersion="firestore/documentReference/1.0",He._jsonSchema={type:Ge("string",He._jsonSchemaVersion),referencePath:Ge("string")};class jn extends Ka{constructor(e,t,n){super(e,t,Vl(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new He(this.firestore,null,new ie(e))}withConverter(e){return new jn(this.firestore,e,this._path)}}function qo(r,e,...t){if(r=si(r),Uh("collection","path",e),r instanceof za){const n=we.fromString(e,...t);return gu(n),new jn(r,null,n)}{if(!(r instanceof He||r instanceof jn))throw new Z(U.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(we.fromString(e,...t));return gu(n),new jn(r.firestore,null,n)}}function nr(r,e,...t){if(r=si(r),arguments.length===1&&(e=Nl.newId()),Uh("doc","path",e),r instanceof za){const n=we.fromString(e,...t);return pu(n),new He(r,null,new ie(n))}{if(!(r instanceof He||r instanceof jn))throw new Z(U.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(we.fromString(e,...t));return pu(n),new He(r.firestore,r instanceof jn?r.converter:null,new ie(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:vt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(bi(e,vt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new vt(e.vectorValues);throw new Z(U.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}vt._jsonSchemaVersion="firestore/vectorValue/1.0",vt._jsonSchema={type:Ge("string",vt._jsonSchemaVersion),vectorValues:Ge("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VE=/^__.*__$/;class GE{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Fr(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ti(e,this.data,t,this.fieldTransforms)}}function Od(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw oe(40011,{dataSource:r})}}class Jl{constructor(e,t,n,s,i,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Jl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Sa(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Od(this.dataSource)&&VE.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class HE{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Ja(e)}createContext(e,t,n,s=!1){return new Jl({dataSource:e,methodName:t,targetDoc:n,path:Nt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function UE(r){const e=r._freezeSettings(),t=Ja(r._databaseId);return new HE(r._databaseId,!!e.ignoreUndefinedProperties,t)}function jE(r,e,t,n,s,i={}){const a=r.createContext(i.merge||i.mergeFields?2:0,e,t,s);Md("Data must be an object, but it was:",a,n);const o=Ld(n,a);let B,c;if(i.merge)B=new Jt(a.fieldMask),c=a.fieldTransforms;else if(i.mergeFields){const h=[];for(const d of i.mergeFields){const p=Qa(e,d,t);if(!a.contains(p))throw new Z(U.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);qE(h,p)||h.push(p)}B=new Jt(h),c=a.fieldTransforms.filter(d=>B.covers(d.field))}else B=null,c=a.fieldTransforms;return new GE(new Pt(o),B,c)}function gi(r,e,t){if(kd(r=si(r)))return Md("Unsupported field value:",e,r),Ld(r,e);if(r instanceof Sd)return function(s,i){if(!Od(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(s,i){const a=[];let o=0;for(const B of s){let c=gi(B,i.childContextForArray(o));c==null&&(c={nullValue:"NULL_VALUE"}),a.push(c),o++}return{arrayValue:{values:a}}}(r,e)}return function(s,i,a){if((s=si(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return kl(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const o=Fe.fromDate(s);return{timestampValue:Ia(i.serializer,o)}}if(s instanceof Fe){const o=new Fe(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Ia(i.serializer,o)}}if(s instanceof cn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Lt)return{bytesValue:Ed(i.serializer,s._byteString)};if(s instanceof He){const o=i.databaseId,B=s.firestore._databaseId;if(!B.isEqual(o))throw i.createError(`Document reference is for database ${B.projectId}/${B.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:jl(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof vt)return function(B,c){const h=B instanceof vt?B.toArray():B;return{mapValue:{fields:{[Kh]:{stringValue:Qh},[ci]:{arrayValue:{values:h.map(p=>{if(typeof p!="number")throw c.createError("VectorValues must only contain numeric values.");return Ga(c.serializer,p)})}}}}}}(s,i);if(Id(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${xl(s)}`)}(r,e)}function Ld(r,e){const t={};return Hh(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Rr(r,(n,s)=>{const i=gi(s,e.childContextForField(n));i!=null&&(t[n]=i)}),{mapValue:{fields:t}}}function kd(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Fe||r instanceof cn||r instanceof Lt||r instanceof He||r instanceof Sd||r instanceof vt||Id(r))}function Md(r,e,t){if(!kd(t)||!_i(t)){const n=xl(t);throw n==="an object"?e.createError(r+" a custom object"):e.createError(r+" "+n)}}function Qa(r,e,t){if((e=si(e))instanceof $l)return e._internalPath;if(typeof e=="string")return JE(r,e);throw Sa("Field path arguments must be of type string or ",r,!1,void 0,t)}const $E=new RegExp("[~\\*/\\[\\]]");function JE(r,e,t){if(e.search($E)>=0)throw Sa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new $l(...e.split("."))._internalPath}catch{throw Sa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Sa(r,e,t,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let o=`Function ${e}() called with invalid data`;t&&(o+=" (via `toFirestore()`)"),o+=". ";let B="";return(i||a)&&(B+=" (found",i&&(B+=` in field ${n}`),a&&(B+=` in document ${s}`),B+=")"),new Z(U.INVALID_ARGUMENT,o+r+B)}function qE(r,e){return r.some(t=>t.isEqual(e))}function Vd(r){return typeof r._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=Pt.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const a=e[s];let o;i.nestedOptions&&_i(a)?o={mapValue:{fields:new lt(i.nestedOptions).getOptionsProto(t,a)}}:a&&(o=gi(a,t)??void 0),o&&n.set(Nt.fromServerFormat(i.serverName),o)}}return n}getOptionsProto(e,t,n){const s=this._getKnownOptions(t,e);if(n){const i=new Map(rm(n,(a,o)=>[Nt.fromServerFormat(o),a!==void 0?gi(a,e):null]));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zE(r){return typeof r=="object"&&r!==null&&!!("nullValue"in r&&(r.nullValue===null||r.nullValue==="NULL_VALUE")||"booleanValue"in r&&(r.booleanValue===null||typeof r.booleanValue=="boolean")||"integerValue"in r&&(r.integerValue===null||typeof r.integerValue=="number"||typeof r.integerValue=="string")||"doubleValue"in r&&(r.doubleValue===null||typeof r.doubleValue=="number")||"timestampValue"in r&&(r.timestampValue===null||function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")}(r.timestampValue))||"stringValue"in r&&(r.stringValue===null||typeof r.stringValue=="string")||"bytesValue"in r&&(r.bytesValue===null||r.bytesValue instanceof Uint8Array)||"referenceValue"in r&&(r.referenceValue===null||typeof r.referenceValue=="string")||"geoPointValue"in r&&(r.geoPointValue===null||function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")}(r.geoPointValue))||"arrayValue"in r&&(r.arrayValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))}(r.arrayValue))||"mapValue"in r&&(r.mapValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!_i(t.fields))}(r.mapValue))||"fieldReferenceValue"in r&&(r.fieldReferenceValue===null||typeof r.fieldReferenceValue=="string")||"functionValue"in r&&(r.functionValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))}(r.functionValue))||"pipelineValue"in r&&(r.pipelineValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))}(r.pipelineValue)))}function KE(r){return new vt(r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(r){let e;return r instanceof xr?r:(e=_i(r)?ZE(r):r instanceof Array?ey(r):Gd(r,void 0),e)}function zo(r){if(r instanceof xr)return r;if(r instanceof vt)return mi(r);if(Array.isArray(r))return mi(KE(r));throw new Error("Unsupported value: "+typeof r)}function ql(r){return Bm(r)?Ba(r):z(r)}class xr{constructor(){this._protoValueType="ProtoValue"}add(e){return new V("add",[this,z(e)],"add")}asBoolean(){if(this instanceof Wn)return this;if(this instanceof ms)return new Ud(this);if(this instanceof gs)return new XE(this);if(this instanceof V)return new Hd(this);throw new Z("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new V("subtract",[this,z(e)],"subtract")}multiply(e){return new V("multiply",[this,z(e)],"multiply")}divide(e){return new V("divide",[this,z(e)],"divide")}mod(e){return new V("mod",[this,z(e)],"mod")}equal(e){return new V("equal",[this,z(e)],"equal").asBoolean()}notEqual(e){return new V("not_equal",[this,z(e)],"notEqual").asBoolean()}lessThan(e){return new V("less_than",[this,z(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new V("less_than_or_equal",[this,z(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new V("greater_than",[this,z(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new V("greater_than_or_equal",[this,z(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const n=[e,...t].map(s=>z(s));return new V("array_concat",[this,...n],"arrayConcat")}arrayContains(e){return new V("array_contains",[this,z(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new zs(e.map(z),"arrayContainsAll"):e;return new V("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new zs(e.map(z),"arrayContainsAny"):e;return new V("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new V("array_reverse",[this])}arrayLength(){return new V("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new zs(e.map(z),"equalAny"):e;return new V("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new zs(e.map(z),"notEqualAny"):e;return new V("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new V("exists",[this],"exists").asBoolean()}charLength(){return new V("char_length",[this],"charLength")}like(e){return new V("like",[this,z(e)],"like").asBoolean()}regexContains(e){return new V("regex_contains",[this,z(e)],"regexContains").asBoolean()}regexFind(e){return new V("regex_find",[this,z(e)],"regexFind")}regexFindAll(e){return new V("regex_find_all",[this,z(e)],"regexFindAll")}regexMatch(e){return new V("regex_match",[this,z(e)],"regexMatch").asBoolean()}stringContains(e){return new V("string_contains",[this,z(e)],"stringContains").asBoolean()}startsWith(e){return new V("starts_with",[this,z(e)],"startsWith").asBoolean()}endsWith(e){return new V("ends_with",[this,z(e)],"endsWith").asBoolean()}toLower(){return new V("to_lower",[this],"toLower")}toUpper(){return new V("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(z(e)),new V("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(z(e)),new V("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(z(e)),new V("rtrim",t,"rtrim")}type(){return new V("type",[this])}isType(e){return new V("is_type",[this,mi(e)],"isType").asBoolean()}stringConcat(e,...t){const n=[e,...t].map(z);return new V("string_concat",[this,...n],"stringConcat")}stringIndexOf(e){return new V("string_index_of",[this,z(e)],"stringIndexOf")}stringRepeat(e){return new V("string_repeat",[this,z(e)],"stringRepeat")}stringReplaceAll(e,t){return new V("string_replace_all",[this,z(e),z(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new V("string_replace_one",[this,z(e),z(t)],"stringReplaceOne")}concat(e,...t){const n=[e,...t].map(z);return new V("concat",[this,...n],"concat")}reverse(){return new V("reverse",[this],"reverse")}arrayFilter(e,t){return new V("array_filter",[this,z(e),t],"arrayFilter")}arrayTransform(e,t){return new V("array_transform",[this,z(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,n){return new V("array_transform",[this,z(e),z(t),n],"arrayTransformWithIndex")}arraySlice(e,t){const n=[this,z(e)];return t!==void 0&&n.push(z(t)),new V("array_slice",n,"arraySlice")}arrayFirst(){return new V("array_first",[this],"arrayFirst")}arrayFirstN(e){return new V("array_first_n",[this,z(e)],"arrayFirstN")}arrayLast(){return new V("array_last",[this],"arrayLast")}arrayLastN(e){return new V("array_last_n",[this,z(e)],"arrayLastN")}arrayMaximum(){return new V("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new V("maximum_n",[this,z(e)],"arrayMaximumN")}arrayMinimum(){return new V("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new V("minimum_n",[this,z(e)],"arrayMinimumN")}arrayIndexOf(e){return new V("array_index_of",[this,z(e),z("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new V("array_index_of",[this,z(e),z("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new V("array_index_of_all",[this,z(e)],"arrayIndexOfAll")}byteLength(){return new V("byte_length",[this],"byteLength")}ceil(){return new V("ceil",[this])}floor(){return new V("floor",[this])}abs(){return new V("abs",[this])}exp(){return new V("exp",[this])}mapGet(e){return new V("map_get",[this,mi(e)],"mapGet")}mapSet(e,t,...n){const s=[this,z(e),z(t),...n.map(z)];return new V("map_set",s,"mapSet")}mapKeys(){return new V("map_keys",[this],"mapKeys")}mapValues(){return new V("map_values",[this],"mapValues")}mapEntries(){return new V("map_entries",[this],"mapEntries")}getField(e){return new V("get_field",[this,z(e)],"get_field")}count(){return At._create("count",[this],"count")}sum(){return At._create("sum",[this],"sum")}average(){return At._create("average",[this],"average")}minimum(){return At._create("minimum",[this],"minimum")}maximum(){return At._create("maximum",[this],"maximum")}first(){return At._create("first",[this],"first")}last(){return At._create("last",[this],"last")}arrayAgg(){return At._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return At._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return At._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const n=[e,...t];return new V("maximum",[this,...n.map(z)],"logicalMaximum")}logicalMinimum(e,...t){const n=[e,...t];return new V("minimum",[this,...n.map(z)],"minimum")}vectorLength(){return new V("vector_length",[this],"vectorLength")}cosineDistance(e){return new V("cosine_distance",[this,zo(e)],"cosineDistance")}dotProduct(e){return new V("dot_product",[this,zo(e)],"dotProduct")}euclideanDistance(e){return new V("euclidean_distance",[this,zo(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new V("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new V("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new V("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new V("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new V("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new V("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new V("timestamp_add",[this,z(e),z(t)],"timestampAdd")}timestampSubtract(e,t){return new V("timestamp_subtract",[this,z(e),z(t)],"timestampSubtract")}timestampDiff(e,t){return new V("timestamp_diff",[this,ql(e),z(t)],"timestampDiff")}timestampExtract(e,t){const n=[this,z(e)];return t&&n.push(z(t)),new V("timestamp_extract",n,"timestampExtract")}documentId(){return new V("document_id",[this],"documentId")}parent(){return new V("parent",[this],"parent")}substring(e,t){const n=z(e);return new V("substring",t===void 0?[this,n]:[this,n,z(t)],"substring")}arrayGet(e){return new V("array_get",[this,z(e)],"arrayGet")}isError(){return new V("is_error",[this],"isError").asBoolean()}ifError(e){const t=new V("if_error",[this,z(e)],"ifError");return e instanceof Wn?t.asBoolean():t}isAbsent(){return new V("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new V("map_remove",[this,z(e)],"mapRemove")}mapMerge(e,...t){const n=z(e),s=t.map(z);return new V("map_merge",[this,n,...s],"mapMerge")}pow(e){return new V("pow",[this,z(e)])}trunc(e){return e===void 0?new V("trunc",[this]):new V("trunc",[this,z(e)],"trunc")}round(e){return e===void 0?new V("round",[this]):new V("round",[this,z(e)],"round")}collectionId(){return new V("collection_id",[this])}length(){return new V("length",[this])}ln(){return new V("ln",[this])}sqrt(){return new V("sqrt",[this])}stringReverse(){return new V("string_reverse",[this])}ifAbsent(e){return new V("if_absent",[this,z(e)],"ifAbsent")}ifNull(e){return new V("if_null",[this,z(e)],"ifNull")}coalesce(e,...t){return new V("coalesce",[this,z(e),...t.map(z)],"coalesce")}join(e){return new V("join",[this,z(e)],"join")}log10(){return new V("log10",[this])}arraySum(){return new V("sum",[this])}split(e){return new V("split",[this,z(e)])}timestampTruncate(e,t){const n=[this,z(e)];return t&&n.push(z(t)),new V("timestamp_trunc",n)}ascending(){return ty(this)}descending(){return ny(this)}as(e){return new WE(this,e,"as")}}class At{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,n){const s=new At(e,t);return s._methodName=n,s}as(e){return new QE(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class QE{constructor(e,t,n){this.aggregate=e,this.alias=t,this._methodName=n}_readUserData(e){this.aggregate._readUserData(e)}}class WE{constructor(e,t,n){this.expr=e,this.alias=t,this._methodName=n,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class zs extends xr{constructor(e,t){super(),this.ur=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.ur.map(t=>t._toProto(e))}}}_readUserData(e){this.ur.forEach(t=>t._readUserData(e))}}class gs extends xr{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new V("geo_distance",[this,z(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function Ba(r){return YE(r,"field")}function YE(r,e){return new gs(typeof r=="string"?sn===r?uE()._internalPath:Qa("field",r):r._internalPath,e)}class ms extends xr{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new ms(e,void 0);return t._protoValue=e,t}_toProto(e){return ee(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,zE(this._protoValue)||(this._protoValue=gi(this.value,e))}}function mi(r,e){return Gd(r,"constant")}function Gd(r,e){const t=new ms(r,e);return typeof r=="boolean"?new Ud(t):t}class V extends xr{constructor(e,t,n,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,n!==void 0&&(this._methodName=n),s!==void 0&&(this._options=s)}get _optionsUtil(){return new lt({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map(n=>n._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Wn extends xr{get _methodName(){return this._expr._methodName}countIf(){return At._create("count_if",[this],"countIf")}not(){return new V("not",[this],"not").asBoolean()}conditional(e,t){return new V("conditional",[this,e,t],"conditional")}ifError(e){const t=z(e),n=new V("if_error",[this,t],"ifError");return t instanceof Wn?n.asBoolean():n}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class Hd extends Wn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class Ud extends Wn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class XE extends Wn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function ZE(r,e){const t=[];for(const n in r)if(Object.prototype.hasOwnProperty.call(r,n)){const s=r[n];t.push(mi(n)),t.push(z(s))}return new V("map",t,"map")}function ey(r){return function(t,n){return new V("array",t.map(s=>z(s)),n)}(r,"array")}function ty(r){return new jd(ql(r),"ascending","ascending")}function ny(r){return new jd(ql(r),"descending","descending")}class jd{constructor(e,t,n){this.expr=e,this.direction=t,this._methodName=n,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Td(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class $d extends xt{get _name(){return"add_fields"}get _optionsUtil(){return new lt({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[pi(e,this.fields)]}}_readUserData(e){super._readUserData(e),Yn(this.fields,e)}}class Jd extends xt{get _name(){return"aggregate"}get _optionsUtil(){return new lt({})}constructor(e,t,n){super(n),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[pi(e,this.accumulators),pi(e,this.groups)]}}_readUserData(e){super._readUserData(e),Yn(this.groups,e),Yn(this.accumulators,e)}}class qd extends xt{get _name(){return"distinct"}get _optionsUtil(){return new lt({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[pi(e,this.groups)]}}_readUserData(e){super._readUserData(e),Yn(this.groups,e)}}class Wa extends xt{get _name(){return"collection"}get _optionsUtil(){return new lt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Er=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Er}]}}_readUserData(e){super._readUserData(e)}}class Ya extends xt{get _name(){return"collection_group"}get _optionsUtil(){return new lt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class zl extends xt{get _name(){return"database"}get _optionsUtil(){return new lt({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class Kl extends xt{get _name(){return"documents"}get _optionsUtil(){return new lt({})}constructor(e,t){if(super(t),!e||e.length===0)throw new Z(U.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const n=e.map(i=>i.startsWith("/")?i:"/"+i),s=new Set(n);if(s.size!==n.length)throw new Z(U.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.hr=n,this.Tr=s}_toProto(e){return{...super._toProto(e),args:this.hr.map(t=>({referenceValue:t}))}}_readUserData(e){super._readUserData(e)}}class Xa extends xt{get _name(){return"where"}get _optionsUtil(){return new lt({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Yn(this.condition,e)}}class Ar extends xt{get _name(){return"limit"}get _optionsUtil(){return new lt({})}constructor(e,t){ee(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[kl(e,this.limit)]}}}class Ju extends xt{get _name(){return"offset"}get _optionsUtil(){return new lt({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[kl(e,this.offset)]}}}class ry extends xt{get _name(){return"select"}get _optionsUtil(){return new lt({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[pi(e,this.selections)]}}_readUserData(e){super._readUserData(e),Yn(this.selections,e)}}class En extends xt{get _name(){return"sort"}get _optionsUtil(){return new lt({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),Yn(this.orderings,e)}}class Ql extends xt{get _name(){return"replace_with"}get _optionsUtil(){return new lt({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Td(Ql.Pr)]}}_readUserData(e){super._readUserData(e),Yn(this.map,e)}}Ql.Pr="full_replace";function Yn(r,e){return Vd(r)?r._readUserData(e):Array.isArray(r)?r.forEach(t=>t._readUserData(e)):r instanceof Map?r.forEach(t=>t._readUserData(e)):Object.values(r).forEach(t=>t._readUserData(e)),r}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e,t,n,s){this._db=e,this.userDataReader=t,this._userDataWriter=n,this.stages=s}Ar(e,t){const n=this.userDataReader.createContext(3,e);return Vd(t)?t._readUserData(n):Array.isArray(t)?t.forEach(s=>s._readUserData(n)):t.forEach(s=>s._readUserData(n)),t}where(e){const t=this.stages.map(n=>n);return this.Ar("where",e),t.push(new Xa(e,{})),new ti(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map(n=>n);return t.push(new Ar(e,{})),new ti(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const n=this.stages.map(s=>s);return"orderings"in e?n.push(new En(this.Ar("sort",e.orderings),{})):n.push(new En(this.Ar("sort",[e,...t]),{})),new ti(this._db,this.userDataReader,this._userDataWriter,n)}Vr(e){return{pipeline:{stages:this.stages.map(t=>t._toProto(e))}}}}// Copyright 2024 Google LLC* @license
class A{constructor(e,t){this.type=e,this.value=t}static dr(){return new A("ERROR",void 0)}static mr(){return new A("UNSET",void 0)}static pr(){return new A("NULL",as)}static newValue(e){return Rt(e)?new A("NULL",as):function(n){return!!n&&"booleanValue"in n}(e)?new A("BOOLEAN",e):an(e)?new A("INT",e):mr(e)?new A("DOUBLE",e):function(n){return!!n&&"timestampValue"in n&&!!n.timestampValue}(e)?new A("TIMESTAMP",e):function(n){return!!n&&"stringValue"in n}(e)?new A("STRING",e):function(n){return!!n&&"bytesValue"in n}(e)?new A("BYTES",e):e.referenceValue?new A("REFERENCE",e):e.geoPointValue?new A("GEO_POINT",e):ls(e)?new A("ARRAY",e):Ea(e)?new A("VECTOR",e):yr(e)?new A("MAP",e):new A("ERROR",void 0)}gr(){return this.type==="ERROR"||this.type==="UNSET"}yr(){return this.type==="NULL"}}function ni(r){if(!r.gr())return r.value}function zd(r){return r instanceof Wn?r._expr:r}function le(r){if((r=zd(r))instanceof gs)return new sy(r);if(r instanceof ms)return new iy(r);if(r instanceof zs)return new ay(r);if(r instanceof V){if(r.name==="add")return new By(r);if(r.name==="subtract")return new cy(r);if(r.name==="multiply")return new uy(r);if(r.name==="divide")return new hy(r);if(r.name==="mod")return new dy(r);if(r.name==="and")return new fy(r);if(r.name==="equal")return new Iy(r);if(r.name==="not_equal")return new Ty(r);if(r.name==="less_than")return new Sy(r);if(r.name==="less_than_or_equal")return new Ay(r);if(r.name==="greater_than")return new Py(r);if(r.name==="greater_than_or_equal")return new Ry(r);if(r.name==="array_concat")return new Fy(r);if(r.name==="array_reverse")return new Ny(r);if(r.name==="array_contains")return new xy(r);if(r.name==="array_contains_all")return new Oy(r);if(r.name==="array_contains_any")return new Ly(r);if(r.name==="array_length")return new ky(r);if(r.name==="array_element")return new My(r);if(r.name==="equal_any")return new Kd(r);if(r.name==="not_equal_any")return new py(r);if(r.name==="is_nan")return new gy(r);if(r.name==="is_not_nan")return new my(r);if(r.name==="is_null")return new Ey(r);if(r.name==="is_not_null")return new yy(r);if(r.name==="is_error")return new wy(r);if(r.name==="exists")return new Dy(r);if(r.name==="not")return new Za(r);if(r.name==="or")return new Cy(r);if(r.name==="xor")return new Wl(r);if(r.name==="conditional")return new vy(r);if(r.name==="maximum")return new _y(r);if(r.name==="minimum")return new by(r);if(r.name==="reverse")return new Vy(r);if(r.name==="replace_first")return new Gy(r);if(r.name==="replace_all")return new Hy(r);if(r.name==="char_length")return new Uy(r);if(r.name==="byte_length")return new jy(r);if(r.name==="like")return new $y(r);if(r.name==="regex_contains")return new Jy(r);if(r.name==="regex_match")return new qy(r);if(r.name==="string_contains")return new zy(r);if(r.name==="starts_with")return new Ky(r);if(r.name==="ends_with")return new Qy(r);if(r.name==="to_lower")return new Wy(r);if(r.name==="to_upper")return new Yy(r);if(r.name==="trim")return new Xy(r);if(r.name==="string_concat")return new Zy(r);if(r.name==="map_get")return new ew(r);if(r.name==="cosine_distance")return new tw(r);if(r.name==="dot_product")return new nw(r);if(r.name==="euclidean_distance")return new rw(r);if(r.name==="vector_length")return new sw(r);if(r.name==="unix_micros_to_timestamp")return new Bw(r);if(r.name==="timestamp_to_unix_micros")return new hw(r);if(r.name==="unix_millis_to_timestamp")return new cw(r);if(r.name==="timestamp_to_unix_millis")return new dw(r);if(r.name==="unix_seconds_to_timestamp")return new uw(r);if(r.name==="timestamp_to_unix_seconds")return new fw(r);if(r.name==="timestamp_add")return new Cw(r);if(r.name==="timestamp_subtract")return new pw(r)}throw new Error(`Unknown Expr : ${r}`)}class sy{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===sn)return A.newValue({referenceValue:Ta(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return A.newValue({timestampValue:la(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return A.newValue({timestampValue:la(e.serializer,t.createTime)});const n=t.data.field(this.expr._fieldPath);return n?Ma(n)?A.newValue(function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:la(i.serializer,Be.fromTimestamp(is(a)))};if(i.serverTimestampBehavior==="previous"){const o=Ii(a);if(o)return o}return{nullValue:"NULL_VALUE"}}(e,n)):A.newValue(n):A.mr()}}class iy{constructor(e){this.expr=e}evaluate(e,t){return A.newValue(this.expr._getValue())}}class ay{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.ur.map(s=>le(s).evaluate(e,t));return n.some(s=>s.gr())?A.dr():A.newValue({arrayValue:{values:n.map(s=>s.value)}})}}function nt(r){return mr(r)?Number(r.doubleValue):Number(r.integerValue)}function hn(r){return BigInt(r.integerValue)}const oy=BigInt("0x7fffffffffffffff"),ly=-BigInt("0x8000000000000000");class Pi{constructor(e){this.expr=e}evaluate(e,t){ee(this.expr.params.length>=2,24778);const n=le(this.expr.params[0]).evaluate(e,t),s=le(this.expr.params[1]).evaluate(e,t);let i=this.wr(n,s);for(const a of this.expr.params.slice(2)){const o=le(a).evaluate(e,t);i=this.wr(i,o)}return i}wr(e,t){if(e.gr()||t.gr())return A.dr();if(e.yr()||t.yr())return A.pr();const n=e.value,s=t.value;if(!mr(n)&&!an(n)||!mr(s)&&!an(s))return A.dr();if(mr(n)||mr(s)){const i=this.br(n,s);return i?A.newValue(i):A.dr()}if(an(n)&&an(s)){const i=this.vr(n,s);return i===void 0?A.dr():typeof i=="number"?A.newValue({doubleValue:i}):i<ly||i>oy?A.dr():A.newValue({integerValue:`${i}`})}return A.dr()}}function Tn(r,e){return $e(r)!==$e(e)?"TYPE_MISMATCH":It(r)||It(e)?"NOT_EQ":Rt(r)&&Rt(e)?"EQ":Rt(r)||Rt(e)?"NULL":ls(r)&&ls(e)?function(n,s){var a,o,B;if(((a=n.values)==null?void 0:a.length)!==((o=s.values)==null?void 0:o.length))return"NOT_EQ";let i=!1;for(let c=0;c<(((B=n.values)==null?void 0:B.length)??0);c++){const h=n.values[c],d=s.values[c];switch(Tn(h,d)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:oe(44609,{Sr:h,Dr:d})}}return i?"NULL":"EQ"}(r.arrayValue,e.arrayValue):Ea(r)&&Ea(e)||yr(r)&&yr(e)?function(n,s){const i=n.fields||{},a=s.fields||{};if(ga(i)!==ga(a))return"NOT_EQ";let o=!1;for(const B in i)if(i.hasOwnProperty(B)){if(a[B]===void 0)return"NOT_EQ";switch(Tn(i[B],a[B])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":o=!0}}return o?"NULL":"EQ"}(r.mapValue,e.mapValue):function(n,s){return Vt(n,s,{o:!1,t:!0,i:!0})}(r,e)?"EQ":"NOT_EQ"}class By extends Pi{vr(e,t){return hn(e)+hn(t)}br(e,t){return{doubleValue:nt(e)+nt(t)}}}class cy extends Pi{constructor(e){super(e),this.expr=e}vr(e,t){return hn(e)-hn(t)}br(e,t){return{doubleValue:nt(e)-nt(t)}}}class uy extends Pi{constructor(e){super(e),this.expr=e}vr(e,t){return hn(e)*hn(t)}br(e,t){return{doubleValue:nt(e)*nt(t)}}}class hy extends Pi{constructor(e){super(e),this.expr=e}vr(e,t){const n=hn(t);if(n!==BigInt(0))return hn(e)/n}br(e,t){const n=nt(t);return n===0?{doubleValue:Bi(n)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:nt(e)/n}}}class dy extends Pi{constructor(e){super(e),this.expr=e}vr(e,t){const n=hn(t);if(n!==BigInt(0))return hn(e)%n}br(e,t){const n=nt(t);if(n!==0)return{doubleValue:nt(e)%n}}}class fy{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const a of this.expr.params){const o=le(a).evaluate(e,t);switch(o.type){case"BOOLEAN":if(!((i=o.value)!=null&&i.booleanValue))return A.newValue(Xe);break;case"NULL":s=!0;break;default:n=!0}}return n?A.dr():s?A.pr():A.newValue(_t)}}class Za{constructor(e){this.expr=e}evaluate(e,t){var s;ee(this.expr.params.length===1,9634);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return A.newValue({booleanValue:!((s=n.value)!=null&&s.booleanValue)});case"NULL":return A.pr();default:return A.dr()}}}class Cy{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const a of this.expr.params){const o=le(a).evaluate(e,t);switch(o.type){case"BOOLEAN":if((i=o.value)!=null&&i.booleanValue)return A.newValue(_t);break;case"NULL":s=!0;break;default:n=!0}}return n?A.dr():s?A.pr():A.newValue(Xe)}}class Wl{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const a of this.expr.params){const o=le(a).evaluate(e,t);switch(o.type){case"BOOLEAN":n=Wl.xor(n,!!((i=o.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return A.dr()}}return s?A.pr():A.newValue({booleanValue:n})}static xor(e,t){return(e||t)&&!(e&&t)}}class Kd{constructor(e){this.expr=e}evaluate(e,t){var a,o;ee(this.expr.params.length===2,55094);let n=!1;const s=le(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":n=!0;break;case"ERROR":case"UNSET":return A.dr()}const i=le(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return A.dr()}if(n)return A.pr();for(const B of((o=(a=i.value)==null?void 0:a.arrayValue)==null?void 0:o.values)??[])switch(Rt(s.value)&&Rt(B)?"EQ":Tn(s.value,B)){case"EQ":return A.newValue(_t);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:oe(44608,{value:s.value,candidate:B})}return n?A.pr():A.newValue(Xe)}}class py{constructor(e){this.expr=e}evaluate(e,t){return new Za(new V("not",[new V("equal_any",this.expr.params)])).evaluate(e,t)}}class gy{constructor(e){this.expr=e}evaluate(e,t){ee(this.expr.params.length===1,23322);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return A.newValue(Xe);case"DOUBLE":return A.newValue({booleanValue:isNaN(nt(n.value))});case"NULL":return A.pr();default:return A.dr()}}}class my{constructor(e){this.expr=e}evaluate(e,t){return ee(this.expr.params.length===1,50406),new Za(new V("not",[new V("is_nan",this.expr.params)])).evaluate(e,t)}}class Ey{constructor(e){this.expr=e}evaluate(e,t){switch(ee(this.expr.params.length===1,23123),le(this.expr.params[0]).evaluate(e,t).type){case"NULL":return A.newValue(_t);case"UNSET":case"ERROR":return A.dr();default:return A.newValue(Xe)}}}class yy{constructor(e){this.expr=e}evaluate(e,t){return ee(this.expr.params.length===1,23167),new Za(new V("not",[new V("is_null",this.expr.params)])).evaluate(e,t)}}class wy{constructor(e){this.expr=e}evaluate(e,t){return ee(this.expr.params.length===1,5228),le(this.expr.params[0]).evaluate(e,t).type==="ERROR"?A.newValue(_t):A.newValue(Xe)}}class Dy{constructor(e){this.expr=e}evaluate(e,t){switch(ee(this.expr.params.length===1,6877),le(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return A.dr();case"UNSET":return A.newValue(Xe);default:return A.newValue(_t)}}}class vy{constructor(e){this.expr=e}evaluate(e,t){var s;ee(this.expr.params.length===3,11706);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return(s=n.value)!=null&&s.booleanValue?le(this.expr.params[1]).evaluate(e,t):le(this.expr.params[2]).evaluate(e,t);case"NULL":return le(this.expr.params[2]).evaluate(e,t);default:return A.dr()}}}class _y{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(i=>le(i).evaluate(e,t));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||bt(i.value,s.value)>0?i:s}return s===void 0?A.pr():s}}class by{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(i=>le(i).evaluate(e,t));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||bt(i.value,s.value)<0?i:s}return s===void 0?A.pr():s}}class Es{constructor(e){this.expr=e}evaluate(e,t){ee(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return A.dr()}const s=le(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return A.dr()}return this.Cr(n,s)}}class Iy extends Es{constructor(e){super(e),this.expr=e}Cr(e,t){if(e.yr()&&t.yr())return A.newValue(_t);if(e.yr()||t.yr()||It(e.value)||It(t.value)||$e(e.value)!==$e(t.value))return A.newValue(Xe);switch(Tn(e.value,t.value)){case"EQ":return A.newValue(_t);case"NOT_EQ":return A.newValue(Xe);case"NULL":return A.pr();default:oe(44615,{left:e,right:t})}}}class Ty extends Es{constructor(e){super(e),this.expr=e}Cr(e,t){switch(Tn(e.value,t.value)){case"EQ":return A.newValue(Xe);case"NOT_EQ":case"TYPE_MISMATCH":return A.newValue(_t);case"NULL":return A.pr();default:oe(44614,{left:e,right:t})}}}class Sy extends Es{constructor(e){super(e),this.expr=e}Cr(e,t){return $e(e.value)!==$e(t.value)||It(e.value)||It(t.value)?A.newValue(Xe):A.newValue({booleanValue:bt(e.value,t.value)<0})}}class Ay extends Es{constructor(e){super(e),this.expr=e}Cr(e,t){return $e(e.value)!==$e(t.value)||It(e.value)||It(t.value)?A.newValue(Xe):Tn(e.value,t.value)==="EQ"?A.newValue(_t):A.newValue({booleanValue:bt(e.value,t.value)<0})}}class Py extends Es{constructor(e){super(e),this.expr=e}Cr(e,t){return $e(e.value)!==$e(t.value)||It(e.value)||It(t.value)?A.newValue(Xe):A.newValue({booleanValue:bt(e.value,t.value)>0})}}class Ry extends Es{constructor(e){super(e),this.expr=e}Cr(e,t){return $e(e.value)!==$e(t.value)||It(e.value)||It(t.value)?A.newValue(Xe):Tn(e.value,t.value)==="EQ"?A.newValue(_t):A.newValue({booleanValue:bt(e.value,t.value)>0})}}class Fy{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Ny{constructor(e){this.expr=e}evaluate(e,t){var s;ee(this.expr.params.length===1,216);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return A.pr();case"ARRAY":{const i=((s=n.value.arrayValue)==null?void 0:s.values)??[];return A.newValue({arrayValue:{values:[...i].reverse()}})}default:return A.dr()}}}class xy{constructor(e){this.expr=e}evaluate(e,t){return ee(this.expr.params.length===2,52884),new Kd(new V("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class Oy{constructor(e){this.expr=e}evaluate(e,t){var B,c,h,d;ee(this.expr.params.length===2,1392);let n=!1;const s=le(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return A.dr()}const i=le(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return A.dr()}if(n)return A.pr();const a=((c=(B=i.value)==null?void 0:B.arrayValue)==null?void 0:c.values)??[],o=((d=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:d.values)??[];for(const p of a){let C=!1;n=!1;for(const m of o){switch(Rt(p)&&Rt(m)?"EQ":Tn(p,m)){case"EQ":C=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:oe(44613,{value:m,search:p})}if(C)break}if(!C)return A.newValue(Xe)}return A.newValue(_t)}}class Ly{constructor(e){this.expr=e}evaluate(e,t){var B,c,h,d;ee(this.expr.params.length===2,2680);let n=!1;const s=le(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return A.dr()}const i=le(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return A.dr()}if(n)return A.pr();const a=((c=(B=i.value)==null?void 0:B.arrayValue)==null?void 0:c.values)??[],o=((d=(h=s.value)==null?void 0:h.arrayValue)==null?void 0:d.values)??[];for(const p of o)for(const C of a)switch(Rt(p)&&Rt(C)?"EQ":Tn(p,C)){case"EQ":return A.newValue(_t);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:oe(60403,{value:p,search:C})}return n?A.pr():A.newValue(Xe)}}class ky{constructor(e){this.expr=e}evaluate(e,t){var s,i,a;ee(this.expr.params.length===1,38605);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return A.pr();case"ARRAY":return A.newValue({integerValue:`${((a=(i=(s=n.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:a.length)??0}`});default:return A.dr()}}}class My{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Vy{constructor(e){this.expr=e}evaluate(e,t){var s,i;ee(this.expr.params.length===1,1508);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return A.pr();case"BYTES":{const a=(s=n.value)==null?void 0:s.bytesValue;if(typeof a=="string"){const o=je.fromBase64String(a).toUint8Array();return o.reverse(),A.newValue({bytesValue:je.fromUint8Array(o).toBase64()})}return A.newValue({bytesValue:new Uint8Array(a).reverse()})}case"STRING":{const a=(i=n.value)==null?void 0:i.stringValue,o=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(a),B=Array.from(o,c=>c.segment).reverse();return A.newValue({stringValue:B.join("")})}default:return A.dr()}}}class Gy{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Hy{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Uy{constructor(e){this.expr=e}evaluate(e,t){ee(this.expr.params.length===1,19400);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return A.pr();case"STRING":{const s=function(a){let o=0;for(let B=0;B<a.length;B++){const c=a.codePointAt(B);if(c===void 0)return;if(c<=65535)if(c>=55296&&c<=57343)if(c<=56319){const h=a.codePointAt(B+1);h!==void 0&&h>=56320&&h<=57343?(o+=1,B++):o+=1}else o+=1;else o+=1;else{if(!(c<=1114111))return;o+=1,B++}}return o}(n.value.stringValue);return s===void 0?A.dr():A.newValue({integerValue:s})}default:return A.dr()}}}class jy{constructor(e){this.expr=e}evaluate(e,t){var s,i;ee(this.expr.params.length===1,8486);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BYTES":{const a=(s=n.value)==null?void 0:s.bytesValue;return typeof a=="string"?A.newValue({integerValue:je.fromBase64String(a).toUint8Array().length}):A.newValue({integerValue:new Uint8Array(a).length})}case"STRING":{const a=function(B){let c=0;for(let h=0;h<B.length;h++){const d=B.codePointAt(h);if(d===void 0)return;if(d>=55296&&d<=57343){if(!(d<=56319))return;{const p=B.codePointAt(h+1);if(p===void 0||!(p>=56320&&p<=57343))return;c+=4,h++}}else if(d<=127)c+=1;else if(d<=2047)c+=2;else if(d<=65535)c+=3;else{if(!(d<=1114111))return;c+=4,h++}}return c}((i=n.value)==null?void 0:i.stringValue);return a===void 0?A.dr():A.newValue({integerValue:a})}case"NULL":return A.pr();default:return A.dr()}}}class ys{constructor(e){this.expr=e}evaluate(e,t){var a,o;ee(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let n=!1;const s=le(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":n=!0;break;default:return A.dr()}const i=le(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":n=!0;break;default:return A.dr()}return n?A.pr():this.Fr((a=s.value)==null?void 0:a.stringValue,(o=i.value)==null?void 0:o.stringValue)}}class $y extends ys{Fr(e,t){try{const n=function(a){let o="";for(let B=0;B<a.length;B++){const c=a.charAt(B);switch(c){case"_":o+=".";break;case"%":o+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":o+="\\"+c;break;default:o+=c}}return"^"+o+"$"}(t),s=Rl.compile(n);return A.newValue({booleanValue:s.matches(e)})}catch(n){return Qt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${n}`),A.dr()}}}class Jy extends ys{Fr(e,t){try{const n=Rl.compile(t);return A.newValue({booleanValue:n.test(e)})}catch{return Qt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),A.dr()}}}class qy extends ys{Fr(e,t){try{return A.newValue({booleanValue:Rl.compile(t).matches(e)})}catch{return Qt(`Invalid regex pattern found in regex_match: ${t}, returning error`),A.dr()}}}class zy extends ys{Fr(e,t){return A.newValue({booleanValue:e.includes(t)})}}class Ky extends ys{Fr(e,t){return A.newValue({booleanValue:e.startsWith(t)})}}class Qy extends ys{Fr(e,t){return A.newValue({booleanValue:e.endsWith(t)})}}class Wy{constructor(e){this.expr=e}evaluate(e,t){var s,i;ee(this.expr.params.length===1,29079);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return A.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return A.pr();default:return A.dr()}}}class Yy{constructor(e){this.expr=e}evaluate(e,t){var s,i;ee(this.expr.params.length===1,60487);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return A.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return A.pr();default:return A.dr()}}}class Xy{constructor(e){this.expr=e}evaluate(e,t){var s,i;ee(this.expr.params.length===1,28544);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return A.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return A.pr();default:return A.dr()}}}class Zy{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(a=>le(a).evaluate(e,t));let s="",i=!1;for(const a of n)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return A.dr()}return i?A.pr():A.newValue({stringValue:s})}}class ew{constructor(e){this.expr=e}evaluate(e,t){var a,o,B,c;ee(this.expr.params.length===2,4483);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"UNSET":return A.mr();case"MAP":break;default:return A.dr()}const s=le(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return A.dr();const i=(c=(o=(a=n.value)==null?void 0:a.mapValue)==null?void 0:o.fields)==null?void 0:c[(B=s.value)==null?void 0:B.stringValue];return i===void 0?A.mr():A.newValue(i)}}class Yl{constructor(e){this.expr=e}evaluate(e,t){var c,h;ee(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let n=!1;const s=le(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":n=!0;break;default:return A.dr()}const i=le(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":n=!0;break;default:return A.dr()}if(n)return A.pr();const a=cl(s.value),o=cl(i.value);if(a===void 0||o===void 0||((c=a.values)==null?void 0:c.length)!==((h=o.values)==null?void 0:h.length))return A.dr();const B=this.Or(a,o);return B===void 0||isNaN(B)?A.dr():A.newValue({doubleValue:B})}}class tw extends Yl{Or(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return;let i=0,a=0,o=0;for(let c=0;c<n.length;c++){if(!Kn(n[c])||!Kn(s[c]))return;const h=nt(n[c]),d=nt(s[c]);i+=h*d,a+=h*h,o+=d*d}const B=Math.sqrt(a)*Math.sqrt(o);if(B!==0)return 1-Math.max(-1,Math.min(1,i/B))}}class nw extends Yl{Or(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let a=0;a<n.length;a++){if(!Kn(n[a])||!Kn(s[a]))return;i+=nt(n[a])*nt(s[a])}return i}}class rw extends Yl{Or(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let a=0;a<n.length;a++){if(!Kn(n[a])||!Kn(s[a]))return;const o=nt(n[a]),B=nt(s[a]);i+=Math.pow(o-B,2)}return Math.sqrt(i)}}class sw{constructor(e){this.expr=e}evaluate(e,t){var s;ee(this.expr.params.length===1,39044);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"VECTOR":{const i=cl(n.value);return A.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return A.pr();default:return A.dr()}}}const Ei=BigInt(-62135596800),yi=BigInt(253402300799),Aa=BigInt(1e3),$n=BigInt(1e6),iw=Ei*Aa,aw=yi*Aa+BigInt(999),ow=Ei*$n,lw=yi*$n+BigInt(999999);function Xl(r){return r>=ow&&r<=lw}function Qd(r){return r>=Ei&&r<=yi}function wi(r,e){const t=BigInt(r);return!(t<Ei||t>yi)&&!(e<0||e>=1e9)&&(t!==Ei||e===0)&&!(t===yi&&e>999999999)}function Wd(r,e){return e<0?{seconds:r-1,nanos:e+1e9}:{seconds:r,nanos:e}}function Zl(r){return BigInt(r.seconds)*$n+BigInt(Math.trunc(r.nanoseconds/1e3))}class eB{constructor(e){this.expr=e}evaluate(e,t){ee(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return this.toTimestamp(BigInt(n.value.integerValue));case"NULL":return A.pr();default:return A.dr()}}}class Bw extends eB{toTimestamp(e){if(!Xl(e))return A.dr();let t=Number(e/$n),n=Number(e%$n*BigInt(1e3));const s=Wd(t,n);return t=s.seconds,n=s.nanos,wi(t,n)?A.newValue({timestampValue:{seconds:t,nanos:n}}):A.dr()}}class cw extends eB{toTimestamp(e){if(!function(a){return a>=iw&&a<=aw}(e))return A.dr();let t=Number(e/Aa),n=Number(e%Aa*BigInt(1e6));const s=Wd(t,n);return t=s.seconds,n=s.nanos,wi(t,n)?A.newValue({timestampValue:{seconds:t,nanos:n}}):A.dr()}}class uw extends eB{toTimestamp(e){if(!Qd(e))return A.dr();const t=Number(e);return A.newValue({timestampValue:{seconds:t,nanos:0}})}}class tB{constructor(e){this.expr=e}evaluate(e,t){ee(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const n=le(this.expr.params[0]).evaluate(e,t);switch(n.type){case"TIMESTAMP":break;case"NULL":return A.pr();default:return A.dr()}const s=Ul(n.value.timestampValue);return wi(s.seconds,s.nanoseconds)?this.Mr(s):A.dr()}}class hw extends tB{Mr(e){const t=Zl(e);return Xl(t)?A.newValue({integerValue:`${t.toString()}`}):A.dr()}}class dw extends tB{Mr(e){const t=Zl(e),n=t/BigInt(1e3),s=t%BigInt(1e3);return n>BigInt(0)||s===BigInt(0)?A.newValue({integerValue:n.toString()}):A.newValue({integerValue:(n-BigInt(1)).toString()})}}class fw extends tB{Mr(e){const t=BigInt(e.seconds);return Qd(t)?A.newValue({integerValue:t.toString()}):A.dr()}}class Yd{constructor(e){this.expr=e}evaluate(e,t){ee(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let n=!1;const s=le(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":n=!0;break;default:return A.dr()}const i=le(this.expr.params[1]).evaluate(e,t);let a;switch(i.type){case"STRING":if(a=function(L){switch(L){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(i.value.stringValue),a===void 0)return A.dr();break;case"NULL":n=!0;break;default:return A.dr()}const o=le(this.expr.params[2]).evaluate(e,t);switch(o.type){case"INT":break;case"NULL":n=!0;break;default:return A.dr()}if(n)return A.pr();const B=BigInt(o.value.integerValue);let c;try{switch(a){case"microsecond":c=B;break;case"millisecond":c=B*BigInt(1e3);break;case"second":c=B*BigInt(1e6);break;case"minute":c=B*BigInt(6e7);break;case"hour":c=B*BigInt(36e8);break;case"day":c=B*BigInt(864e8);break;default:return A.dr()}if(a!=="microsecond"&&B!==BigInt(0)&&c/B!==BigInt(this.Nr(a)))return A.dr()}catch(F){return Qt(`Error during timestamp arithmetic: ${F}`),A.dr()}const h=Ul(s.value.timestampValue);if(!wi(h.seconds,h.nanoseconds))return A.dr();const d=Zl(h),p=this.Lr(d,c);if(!Xl(p))return A.dr();const C=Number(p/$n),m=p%$n,I=Number((m<0?m+$n:m)*BigInt(1e3)),S=m<0?C-1:C;return wi(S,I)?A.newValue({timestampValue:{seconds:S,nanos:I}}):A.dr()}Nr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class Cw extends Yd{Lr(e,t){return e+t}}class pw extends Yd{Lr(e,t){return e-t}}// Copyright 2024 Google LLC* @license
class dt{constructor(e,t,n){this.serializer=e,this.stages=t,this.listenOptions=n,this.isCorePipeline=!0}getPipelineCollection(){return eo(this)}getPipelineCollectionGroup(){return nB(this)}getPipelineCollectionId(){return gw(this)}getPipelineDocuments(){return gl(this)}getPipelineFlavor(){return function(t){let n="exact";return t.stages.forEach((s,i)=>{s._name!==qd.name&&s._name!==Jd.name||(n="keyless"),s._name===ry.name&&n==="exact"&&(n="augmented"),s._name===$d.name&&i<t.stages.length-1&&n==="exact"&&(n="augmented")}),n}(this)}getPipelineSourceType(){return Jn(this)}}function Jn(r){const e=r.stages[0];return e instanceof Wa||e instanceof Ya||e instanceof zl||e instanceof Kl?e._name:"unknown"}function eo(r){if(Jn(r)==="collection")return r.stages[0].Er}function nB(r){if(Jn(r)==="collection_group")return r.stages[0].collectionId}function gw(r){switch(Jn(r)){case"collection":return we.fromString(eo(r)).lastSegment();case"collection_group":return nB(r);default:return}}function gl(r){if(Jn(r)==="documents")return r.stages[0].hr}function Di(r){if((r=zd(r))instanceof gs)return`fld(${r.fieldName})`;if(r instanceof ms)return`cst(${function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof He?`ref(${t.path})`:t instanceof vt?`vec(${JSON.stringify(t)})`:JSON.stringify(t)}(r.value)})`;if(r instanceof V)return`fn(${r.name},[${r.params.map(Di).join(",")}])`;if(r.expressionType==="ListOfExpressions")return`list([${r.ur.map(Di).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(r,null,2)}`)}function mw(r){if(r instanceof $d)return`${r._name}(${na(r.fields)})`;if(r instanceof Jd){let e=`${r._name}(${na(r.accumulators)})`;return r.groups.size>0&&(e+=`grouping(${na(r.groups)})`),e}if(r instanceof qd)return`${r._name}(${na(r.groups)})`;if(r instanceof Wa)return`${r._name}(${r.Er})`;if(r instanceof Ya)return`${r._name}(${r.collectionId})`;if(r instanceof zl)return`${r._name}()`;if(r instanceof Kl)return`${r._name}(${r.hr.sort()})`;if(r instanceof Xa)return`${r._name}(${Di(r.condition)})`;if(r instanceof Ar)return`${r._name}(${r.limit})`;if(r instanceof En)return`${r._name}(${function(t){return t.map(n=>`${Di(n.expr)}${n.direction}`).join(",")}(r.orderings)})`;throw new Error(`Unrecognized stage ${r._name}`)}function na(r){return`${Array.from(r.entries()).sort().map(([e,t])=>`${e}=${Di(t)}`).join(",")}`}function vn(r){return r.stages.map(e=>mw(e)).join("|")}function Xd(r,e){return vn(r)===vn(e)}function ze(r){return r instanceof dt}function qu(r){return ze(r)?vn(r):Zs(r)}function Zd(r){return ze(r)?vn(r):function(t){return`${cd(ln(t))}|lt:${t.limitType}`}(r)}function to(r,e){return r instanceof dt&&e instanceof dt?Xd(r,e):!(r instanceof dt&&!(e instanceof dt)||!(r instanceof dt)&&e instanceof dt)&&Lm(r,e)}function ef(r){return pr(r)?vn(r):cd(r)}function tf(r,e){return r instanceof dt&&e instanceof dt?Xd(r,e):!(r instanceof dt&&!(e instanceof dt)||!(r instanceof dt)&&e instanceof dt)&&ud(r,e)}function Ew(r,e){const t=function(s){let i=!1;const a=[];for(const o of s)if(o instanceof En)if(i=!0,o.orderings.some(B=>B.expr instanceof gs&&B.expr.fieldName===sn))a.push(o);else{const B=o.orderings.map(c=>c);B.push(Ba(sn).ascending()),a.push(new En(B,{}))}else o instanceof Ar&&(i||(a.push(new En([Ba(sn).ascending()],{})),i=!0)),a.push(o);return i||a.push(new En([Ba(sn).ascending()],{})),a}(r.stages);if(r.userDataReader){const n=r.userDataReader.createContext(3,"toCorePipeline");t.forEach(s=>s._readUserData(n))}return new dt(r.userDataReader.serializer,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&pm(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Ys(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Ys(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=pd();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let o=this.applyToLocalView(a,i.mutatedFields);o=t.has(s.key)?null:o;const B=td(a,o);B!==null&&n.set(s.key,B),a.isValidDocument()||a.convertToNoDocument(Be.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),he())}isEqual(e){return this.batchId===e.batchId&&ss(this.mutations,e.mutations,(t,n)=>vu(t,n))&&ss(this.baseMutations,e.baseMutations,(t,n)=>vu(t,n))}}class rB{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){ee(e.mutations.length===n.length,58842,{Br:e.mutations.length,Ur:n.length});let s=function(){return Hm}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new rB(e,t,n,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf="";function ww(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=zu(e)),e=Dw(r.get(t),e);return zu(e)}function Dw(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case nf:t+="";break;default:t+=i}}return t}function zu(r){return r+nf+""}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,t,n,s,i=Be.min(),a=Be.min(),o=je.EMPTY_BYTE_STRING,B=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=o,this.expectedCount=B}withSequenceNumber(e){return new yn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new yn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new yn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new yn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e){this.qr=e}}function bw(r){const e=sE({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?hl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iw{constructor(){this.Yi=new Tw}addToCollectionParentIndex(e,t){return this.Yi.add(t),G.resolve()}getCollectionParents(e,t){return G.resolve(this.Yi.getEntries(t))}addFieldIndex(e,t){return G.resolve()}deleteFieldIndex(e,t){return G.resolve()}deleteAllFieldIndexes(e){return G.resolve()}createTargetIndexes(e,t){return G.resolve()}getDocumentsMatchingTarget(e,t){return G.resolve(null)}getIndexType(e,t){return G.resolve(0)}getFieldIndexes(e,t){return G.resolve([])}getNextCollectionGroupToUpdate(e){return G.resolve(null)}getMinOffset(e,t){return G.resolve(Qn.min())}getMinOffsetFromCollectionGroup(e,t){return G.resolve(Qn.min())}updateCollectionGroup(e,t,n){return G.resolve()}updateIndexEntries(e,t){return G.resolve()}}class Tw{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new Ue(we.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new Ue(we.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this.gs=e}next(){return this.gs+=2,this.gs}static ys(){return new Xn(0)}static ws(){return new Xn(-1)}}// Copyright 2024 Google LLC* @license
function rf(r,e){var n;let t=e;for(const s of r.stages)t=Aw({serializer:r.serializer,serverTimestampBehavior:(n=r.listenOptions)==null?void 0:n.serverTimestampBehavior},s,t);return t}function no(r,e){return rf(r,[e]).length>0}function Sw(r,e){return ze(r)?no(r,e):$a(r,e)}function Aw(r,e,t){if(e instanceof Wa)return function(s,i,a){return a.filter(o=>o.isFoundDocument()&&`/${o.key.getCollectionPath().canonicalString()}`===i.Er)}(0,e,t);if(e instanceof Xa)return function(s,i,a){return a.filter(o=>{const B=ni(le(i.condition).evaluate(s,o));return B!==void 0&&Vt(B,_t)})}(r,e,t);if(e instanceof Ya)return function(s,i,a){return a.filter(o=>o.isFoundDocument()&&o.key.getCollectionPath().lastSegment()===i.collectionId)}(0,e,t);if(e instanceof zl)return function(s,i,a){return a.filter(o=>o.isFoundDocument())}(0,0,t);if(e instanceof Kl)return function(s,i,a){return a.filter(o=>o.isFoundDocument()&&i.Tr.has(o.key.path.toStringWithLeadingSlash()))}(0,e,t);if(e instanceof Ar)return function(s,i,a){return a.slice(0,i.limit)}(0,e,t);if(e instanceof En)return function(s,i,a){const o=i.orderings.map(B=>({Os:le(B.expr),direction:B.direction}));return[...a].sort((B,c)=>{for(const{Os:h,direction:d}of o){const p=ni(h.evaluate(s,B)),C=ni(h.evaluate(s,c)),m=bt(p??as,C??as);if(m!==0)return d==="ascending"?m:-m}return 0})}(r,e,t);throw new Error(`Unknown stage: ${e._name}`)}function ml(r){const e=function(n){for(let s=n.stages.length-1;s>=0;s--){const i=n.stages[s];if(i instanceof En)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(r);return(t,n)=>{for(const s of e){const i=ni(le(s.expr).evaluate({serializer:r.serializer},t)),a=ni(le(s.expr).evaluate({serializer:r.serializer},n)),o=bt(i||as,a||as);if(o!==0)return s.direction==="ascending"?o:-o}return 0}}function Ko(r){for(let e=r.stages.length-1;e>=0;e--){const t=r.stages[e];if(t instanceof Ar)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(){this.changes=new Nr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ot.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?G.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fw{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(n!==null&&Ys(n.mutation,s,Jt.empty(),Fe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,he()).next(()=>n))}getLocalViewOfDocuments(e,t,n=he()){const s=Mn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(i=>{let a=Yr();return i.forEach((o,B)=>{a=a.insert(o,B.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const n=Mn();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,he()))}populateOverlays(e,t,n){const s=[];return n.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,o)=>{t.set(a,o)})})}computeViews(e,t,n,s){let i=wt();const a=ei(),o=function(){return ei()}();return t.forEach((B,c)=>{const h=n.get(c.key);s.has(c.key)&&(h===void 0||h.mutation instanceof Fr)?i=i.insert(c.key,c):h!==void 0?(a.set(c.key,h.mutation.getFieldMask()),Ys(h.mutation,c,h.mutation.getFieldMask(),Fe.now())):a.set(c.key,Jt.empty())}),this.recalculateAndSaveOverlays(e,i).next(B=>(B.forEach((c,h)=>a.set(c,h)),t.forEach((c,h)=>o.set(c,new Rw(h,a.get(c)??null))),o))}recalculateAndSaveOverlays(e,t){const n=ei();let s=new Ne((a,o)=>a-o),i=he();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const o of a)o.keys().forEach(B=>{const c=t.get(B);if(c===null)return;let h=n.get(B)||Jt.empty();h=o.applyToLocalView(c,h),n.set(B,h);const d=(s.get(o.batchId)||he()).add(B);s=s.insert(o.batchId,d)})}).next(()=>{const a=[],o=s.getReverseIterator();for(;o.hasNext();){const B=o.getNext(),c=B.key,h=B.value,d=pd();h.forEach(p=>{if(!i.has(p)){const C=td(t.get(p),n.get(p));C!==null&&d.set(p,C),i=i.add(p)}}),a.push(this.documentOverlayCache.saveOverlays(e,c,d))}return G.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,s){return ze(t)?this.getDocumentsMatchingPipeline(e,t,n,s):Nm(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):xm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):G.resolve(Mn());let o=Ci,B=i;return a.next(c=>G.forEach(c,(h,d)=>(o<d.largestBatchId&&(o=d.largestBatchId),i.get(h)?G.resolve():this.remoteDocumentCache.getEntry(e,h).next(p=>{B=B.insert(h,p)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,B,c,he())).next(h=>({batchId:o,changes:Cd(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ie(t)).next(n=>{let s=Yr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let a=Yr();return this.indexManager.getCollectionParents(e,i).next(o=>G.forEach(o,B=>{const c=function(d,p){return new ja(p,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(t,B.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,n,s).next(h=>{h.forEach((d,p)=>{a=a.insert(d,p)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(a=>this.retrieveMatchingLocalDocuments(i,a,o=>$a(t,o)))}getDocumentsMatchingPipeline(e,t,n,s){if(Jn(t)==="collection_group"){const i=nB(t);let a=Yr();return this.indexManager.getCollectionParents(e,i).next(o=>G.forEach(o,B=>{const c=function(d,p){const C=d.stages.map(m=>m instanceof Ya?new Wa(p.canonicalString(),{}):m);return new dt(d.serializer,C)}(t,B.child(i));return this.getDocumentsMatchingPipeline(e,c,n,s).next(h=>{h.forEach((d,p)=>{a=a.insert(d,p)})})}).next(()=>a))}{let i;return this.getOverlaysForPipeline(e,t,n.largestBatchId).next(a=>{switch(i=a,Jn(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s);case"documents":let o=he();for(const B of gl(t))o=o.add(ie.fromPath(B));return this.remoteDocumentCache.getEntries(e,o);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new Z("invalid-argument",`Invalid pipeline source to execute offline: ${vn(t)}`)}}).next(a=>this.retrieveMatchingLocalDocuments(i,a,o=>no(t,o)))}}retrieveMatchingLocalDocuments(e,t,n){e.forEach((i,a)=>{const o=a.getKey();t.get(o)===null&&(t=t.insert(o,ot.newInvalidDocument(o)))});let s=Yr();return t.forEach((i,a)=>{const o=e.get(i);o!==void 0&&Ys(o.mutation,a,Jt.empty(),Fe.now()),n(a)&&(s=s.insert(i,a))}),s}getOverlaysForPipeline(e,t,n){switch(Jn(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,we.fromString(eo(t)),n);case"collection_group":throw new Z("invalid-argument",`Unexpected collection group pipeline: ${vn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,gl(t).map(s=>ie.fromPath(s)));case"database":return this.documentOverlayCache.getAllOverlays(e,n);default:throw new Z("invalid-argument",`Failed to get overlays for pipeline: ${vn(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(e){this.serializer=e,this.Ks=new Map,this.Ws=new Map}getBundleMetadata(e,t){return G.resolve(this.Ks.get(t))}saveBundleMetadata(e,t){return this.Ks.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Bn(s.createTime)}}(t)),G.resolve()}getNamedQuery(e,t){return G.resolve(this.Ws.get(t))}saveNamedQuery(e,t){return this.Ws.set(t.name,function(s){return{name:s.name,query:bw(s.bundledQuery),readTime:Bn(s.readTime)}}(t)),G.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(){this.overlays=new Ne(ie.comparator),this.Qs=new Map}getOverlay(e,t){return G.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Mn();return G.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}getAllOverlays(e,t){const n=Mn();return this.overlays.forEach((s,i)=>{i.largestBatchId>t&&n.set(s,i)}),G.resolve(n)}saveOverlays(e,t,n){return n.forEach((s,i)=>{this.Yr(e,t,i)}),G.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Qs.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Qs.delete(n)),G.resolve()}getOverlaysForCollection(e,t,n){const s=Mn(),i=t.length+1,a=new ie(t.child("")),o=this.overlays.getIteratorFrom(a);for(;o.hasNext();){const B=o.getNext().value,c=B.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===i&&B.largestBatchId>n&&s.set(B.getKey(),B)}return G.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new Ne((c,h)=>c-h);const a=this.overlays.getIterator();for(;a.hasNext();){const c=a.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>n){let h=i.get(c.largestBatchId);h===null&&(h=Mn(),i=i.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const o=Mn(),B=i.getIterator();for(;B.hasNext()&&(B.getNext().value.forEach((c,h)=>o.set(c,h)),!(o.size()>=s)););return G.resolve(o)}Yr(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Qs.get(s.largestBatchId).delete(n.key);this.Qs.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new vw(t,n));let i=this.Qs.get(t);i===void 0&&(i=he(),this.Qs.set(t,i)),this.Qs.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(){this.sessionToken=je.EMPTY_BYTE_STRING}getSessionToken(e){return G.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,G.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sB{constructor(){this.Gs=new Ue(Ye.zs),this.js=new Ue(Ye.Hs)}isEmpty(){return this.Gs.isEmpty()}addReference(e,t){const n=new Ye(e,t);this.Gs=this.Gs.add(n),this.js=this.js.add(n)}Js(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Ys(new Ye(e,t))}Zs(e,t){e.forEach(n=>this.removeReference(n,t))}Xs(e){const t=new ie(new we([])),n=new Ye(t,e),s=new Ye(t,e+1),i=[];return this.js.forEachInRange([n,s],a=>{this.Ys(a),i.push(a.key)}),i}e_(){this.Gs.forEach(e=>this.Ys(e))}Ys(e){this.Gs=this.Gs.delete(e),this.js=this.js.delete(e)}t_(e){const t=new ie(new we([])),n=new Ye(t,e),s=new Ye(t,e+1);let i=he();return this.js.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Ye(e,0),n=this.Gs.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Ye{constructor(e,t){this.key=e,this.n_=t}static zs(e,t){return ie.comparator(e.key,t.key)||de(e.n_,t.n_)}static Hs(e,t){return de(e.n_,t.n_)||ie.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Qr=1,this.r_=new Ue(Ye.zs)}checkEmpty(e){return G.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Qr;this.Qr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new yw(i,t,n,s);this.mutationQueue.push(a);for(const o of s)this.r_=this.r_.add(new Ye(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return G.resolve(a)}lookupMutationBatch(e,t){return G.resolve(this.i_(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.s_(n),i=s<0?0:s;return G.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return G.resolve(this.mutationQueue.length===0?Ol:this.Qr-1)}getAllMutationBatches(e){return G.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ye(t,0),s=new Ye(t,Number.POSITIVE_INFINITY),i=[];return this.r_.forEachInRange([n,s],a=>{const o=this.i_(a.n_);i.push(o)}),G.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Ue(de);return t.forEach(s=>{const i=new Ye(s,0),a=new Ye(s,Number.POSITIVE_INFINITY);this.r_.forEachInRange([i,a],o=>{n=n.add(o.n_)})}),G.resolve(this.__(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;ie.isDocumentKey(i)||(i=i.child(""));const a=new Ye(new ie(i),0);let o=new Ue(de);return this.r_.forEachWhile(B=>{const c=B.key.path;return!!n.isPrefixOf(c)&&(c.length===s&&(o=o.add(B.n_)),!0)},a),G.resolve(this.__(o))}__(e){const t=[];return e.forEach(n=>{const s=this.i_(n);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ee(this.o_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.r_;return G.forEach(t.mutations,s=>{const i=new Ye(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.r_=n})}jr(e){}containsKey(e,t){const n=new Ye(t,0),s=this.r_.firstAfterOrEqual(n);return G.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,G.resolve()}o_(e,t){return this.s_(e)}s_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}i_(e){const t=this.s_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e){this.a_=e,this.docs=function(){return new Ne(ie.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,a=this.a_(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return G.resolve(n?n.document.mutableCopy():ot.newInvalidDocument(t))}getEntries(e,t){let n=wt();return t.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ot.newInvalidDocument(s))}),G.resolve(n)}getAllEntries(e){let t=wt();return this.docs.forEach((n,s)=>{t=t.insert(n,s.document)}),G.resolve(t)}getDocumentsMatchingQuery(e,t,n,s){let i,a;ze(t)?(i=we.fromString(eo(t)),a=h=>no(t,h)):(i=t.path,a=h=>$a(t,h));let o=wt();const B=new ie(i.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(B);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!i.isPrefixOf(h.path))break;h.path.length>i.length+1||Pm(Am(d),n)<=0||(s.has(d.key)||a(d))&&(o=o.insert(d.key,d.mutableCopy()))}return G.resolve(o)}getAllFromCollectionGroup(e,t,n,s){oe(9500)}u_(e,t){return G.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new Mw(this)}getSize(e){return G.resolve(this.size)}}class Mw extends Pw{constructor(e){super(),this.qs=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.qs.addEntry(e,s)):this.qs.removeEntry(n)}),G.waitFor(t)}getFromCache(e,t){return this.qs.getEntry(e,t)}getAllFromCache(e,t){return this.qs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(e){this.persistence=e,this.c_=new Nr(t=>ef(t),tf),this.lastRemoteSnapshotVersion=Be.min(),this.highestTargetId=0,this.l_=0,this.E_=new sB,this.targetCount=0,this.h_=Xn.ys()}forEachTarget(e,t){return this.c_.forEach((n,s)=>t(s)),G.resolve()}getLastRemoteSnapshotVersion(e){return G.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return G.resolve(this.l_)}allocateTargetId(e){return this.highestTargetId=this.h_.next(),G.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.l_&&(this.l_=t),G.resolve()}Ss(e){this.c_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.h_=new Xn(t),this.highestTargetId=t),e.sequenceNumber>this.l_&&(this.l_=e.sequenceNumber)}addTargetData(e,t){return this.Ss(t),this.targetCount+=1,G.resolve()}updateTargetData(e,t){return this.Ss(t),G.resolve()}removeTargetData(e,t){return this.c_.delete(t.target),this.E_.Xs(t.targetId),this.targetCount-=1,G.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.c_.forEach((a,o)=>{o.sequenceNumber<=t&&n.get(o.targetId)===null&&(this.c_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),s++)}),G.waitFor(i).next(()=>s)}getTargetCount(e){return G.resolve(this.targetCount)}getTargetData(e,t){const n=this.c_.get(t)||null;return G.resolve(n)}addMatchingKeys(e,t,n){return this.E_.Js(t,n),G.resolve()}removeMatchingKeys(e,t,n){this.E_.Zs(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),G.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.E_.Xs(t),G.resolve()}getMatchingKeysForTargetId(e,t){const n=this.E_.t_(t);return G.resolve(n)}containsKey(e,t){return G.resolve(this.E_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t){this.T_={},this.overlays={},this.P_=new qa(0),this.R_=!1,this.R_=!0,this.I_=new Ow,this.referenceDelegate=e(this),this.A_=new Vw(this),this.indexManager=new Iw,this.remoteDocumentCache=function(s){return new kw(s)}(n=>this.referenceDelegate.V_(n)),this.serializer=new _w(t),this.d_=new Nw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new xw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.T_[e.toKey()];return n||(n=new Lw(t,this.referenceDelegate),this.T_[e.toKey()]=n),n}getGlobalsCache(){return this.I_}getTargetCache(){return this.A_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.d_}runTransaction(e,t,n){Q("MemoryPersistence","Starting transaction:",e);const s=new Gw(this.P_.next());return this.referenceDelegate.f_(),n(s).next(i=>this.referenceDelegate.m_(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}p_(e,t){return G.or(Object.values(this.T_).map(n=>()=>n.containsKey(e,t)))}}class Gw extends RE{constructor(e){super(),this.currentSequenceNumber=e}}class iB{constructor(e){this.persistence=e,this.g_=new sB,this.y_=null}static w_(e){return new iB(e)}get b_(){if(this.y_)return this.y_;throw oe(60996)}addReference(e,t,n){return this.g_.addReference(n,t),this.b_.delete(n.toString()),G.resolve()}removeReference(e,t,n){return this.g_.removeReference(n,t),this.b_.add(n.toString()),G.resolve()}markPotentiallyOrphaned(e,t){return this.b_.add(t.toString()),G.resolve()}removeTarget(e,t){this.g_.Xs(t.targetId).forEach(s=>this.b_.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.b_.add(i.toString()))}).next(()=>n.removeTargetData(e,t))}f_(){this.y_=new Set}m_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return G.forEach(this.b_,n=>{const s=ie.fromPath(n);return this.v_(e,s).next(i=>{i||t.removeEntry(s,Be.min())})}).next(()=>(this.y_=null,t.apply(e)))}updateLimboDocument(e,t){return this.v_(e,t).next(n=>{n?this.b_.delete(t.toString()):this.b_.add(t.toString())})}V_(e){return 0}v_(e,t){return G.or([()=>G.resolve(this.g_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.p_(e,t)])}}class Pa{constructor(e,t){this.persistence=e,this.S_=new Nr(n=>ww(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=kE(this,t)}static w_(e,t){return new Pa(e,t)}f_(){}m_(e){return G.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}rr(e){const t=this.xs(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}xs(e){let t=0;return this.ir(e,n=>{t++}).next(()=>t)}ir(e,t){return G.forEach(this.S_,(n,s)=>this.Fs(e,n,s).next(i=>i?G.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.u_(e,a=>this.Fs(e,a,t).next(o=>{o||(n++,i.removeEntry(a,Be.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.S_.set(t,e.currentSequenceNumber),G.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.S_.set(n,e.currentSequenceNumber),G.resolve()}removeReference(e,t,n){return this.S_.set(n,e.currentSequenceNumber),G.resolve()}updateLimboDocument(e,t){return this.S_.set(t,e.currentSequenceNumber),G.resolve()}V_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ia(e.data.value)),t}Fs(e,t,n){return G.or([()=>this.persistence.p_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.S_.get(t);return G.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aB{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ao=n,this.Vo=s}static fo(e,t){let n=he(),s=he();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new aB(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hw(r,e){return ie.comparator(r.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(){this.mo=!1,this.po=!1,this.yo=100,this.wo=function(){return ip()?8:FE(rp())>0?6:4}()}initialize(e,t){this.bo=e,this.indexManager=t,this.mo=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.vo(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.So(e,t,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Uw;return this.Do(e,t,a).next(o=>{if(i.result=o,this.po)return this.xo(e,t,a,o.size)})}).next(()=>i.result)}xo(e,t,n,s){return ze(t)?G.resolve():n.documentReadCount<this.yo?(Qr()<=ge.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",Zs(t),"since it only creates cache indexes for collection contains","more than or equal to",this.yo,"documents"),G.resolve()):(Qr()<=ge.DEBUG&&Q("QueryEngine","Query:",Zs(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.wo*s?(Qr()<=ge.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",Zs(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ln(t))):G.resolve())}vo(e,t){if(ze(t))return G.resolve(null);let n=t;if(Au(n))return G.resolve(null);let s=ln(n);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=hl(n,null,"F"),s=ln(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(a=>{const o=he(...a);return this.bo.getDocuments(e,o).next(B=>this.indexManager.getMinOffset(e,s).next(c=>{const h=this.Co(n,B);return this.Fo(n,h,o,c.readTime)?this.vo(e,hl(n,null,"F")):this.Oo(e,h,n,c)}))})))}So(e,t,n,s){return(ze(t)?function(a){for(const o of a.stages){if(o instanceof Ar||o instanceof Ju)return!1;if(o instanceof Xa){if(o.condition instanceof Hd&&o.condition._expr.name==="exists"&&o.condition._expr.params[0]instanceof gs&&o.condition._expr.params[0].fieldName===sn)continue;return!1}}return!0}(t):Au(t))||s.isEqual(Be.min())?G.resolve(null):this.bo.getDocuments(e,n).next(i=>{const a=this.Co(t,i);return this.Fo(t,a,n,s)?G.resolve(null):(Qr()<=ge.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),qu(t)),this.Oo(e,a,t,Sm(s,Ci)).next(o=>o))})}Co(e,t){let n,s;return ze(e)?(n=new Ue(Hw),s=i=>no(e,i)):(n=new Ue(Gl(e)),s=i=>$a(e,i)),t.forEach((i,a)=>{s(a)&&(n=n.add(a))}),n}Fo(e,t,n,s){if(ze(e))return function(o){return o.stages.some(B=>B instanceof Ar||B instanceof Ju)}(e);if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Do(e,t,n){return Qr()<=ge.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",qu(t)),this.bo.getDocumentsMatchingQuery(e,t,Qn.min(),n)}Oo(e,t,n,s){return this.bo.getDocumentsMatchingQuery(e,n,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oB="LocalStore",$w=3e8;class Jw{constructor(e,t,n,s){this.persistence=e,this.Mo=t,this.serializer=s,this.No=new Ne(de),this.Lo=new Nr(i=>ef(i),tf),this.Bo=new Map,this.Uo=e.getRemoteDocumentCache(),this.A_=e.getTargetCache(),this.d_=e.getBundleCache(),this.ko(n)}ko(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Fw(this.Uo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Uo.setIndexManager(this.indexManager),this.Mo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.No))}}function qw(r,e,t,n){return new Jw(r,e,t,n)}async function af(r,e){const t=ce(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,t.ko(e),t.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],o=[];let B=he();for(const c of s){a.push(c.batchId);for(const h of c.mutations)B=B.add(h.key)}for(const c of i){o.push(c.batchId);for(const h of c.mutations)B=B.add(h.key)}return t.localDocuments.getDocuments(n,B).next(c=>({qo:c,removedBatchIds:a,addedBatchIds:o}))})})}function zw(r,e){const t=ce(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=e.batch.keys(),i=t.Uo.newChangeBuffer({trackRemovals:!0});return function(o,B,c,h){const d=c.batch,p=d.keys();let C=G.resolve();return p.forEach(m=>{C=C.next(()=>h.getEntry(B,m)).next(I=>{const S=c.docVersions.get(m);ee(S!==null,48541),I.version.compareTo(S)<0&&(d.applyToRemoteDocument(I,c),I.isValidDocument()&&(I.setReadTime(c.commitVersion),h.addEntry(I)))})}),C.next(()=>o.mutationQueue.removeMutationBatch(B,d))}(t,n,e,i).next(()=>i.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(o){let B=he();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(B=B.add(o.batch.mutations[c].key));return B}(e))).next(()=>t.localDocuments.getDocuments(n,s))})}function of(r){const e=ce(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.A_.getLastRemoteSnapshotVersion(t))}function Kw(r,e){const t=ce(r),n=e.snapshotVersion;let s=t.No;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Uo.newChangeBuffer({trackRemovals:!0});s=t.No;const o=[];e.targetChanges.forEach((h,d)=>{const p=s.get(d);if(!p)return;o.push(t.A_.removeMatchingKeys(i,h.removedDocuments,d).next(()=>t.A_.addMatchingKeys(i,h.addedDocuments,d)));let C=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(d)!==null?C=C.withResumeToken(je.EMPTY_BYTE_STRING,Be.min()).withLastLimboFreeSnapshotVersion(Be.min()):h.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(h.resumeToken,n)),s=s.insert(d,C),function(I,S,F){return I.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-I.snapshotVersion.toMicroseconds()>=$w?!0:F.addedDocuments.size+F.modifiedDocuments.size+F.removedDocuments.size>0}(p,C,h)&&o.push(t.A_.updateTargetData(i,C))});let B=wt(),c=he();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&o.push(t.persistence.referenceDelegate.updateLimboDocument(i,h))}),o.push(Qw(i,a,e.documentUpdates).next(h=>{B=h.$o,c=h.Ko})),!n.isEqual(Be.min())){const h=t.A_.getLastRemoteSnapshotVersion(i).next(d=>t.A_.setTargetsMetadata(i,i.currentSequenceNumber,n));o.push(h)}return G.waitFor(o).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,B,c)).next(()=>B)}).then(i=>(t.No=s,i))}function Qw(r,e,t){let n=he(),s=he();return t.forEach(i=>n=n.add(i)),e.getEntries(r,n).next(i=>{let a=wt();return t.forEach((o,B)=>{const c=i.get(o);B.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(o)),B.isNoDocument()&&B.version.isEqual(Be.min())?(e.removeEntry(o,B.readTime),a=a.insert(o,B)):!c.isValidDocument()||B.version.compareTo(c.version)>0||B.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(B),a=a.insert(o,B)):Q(oB,"Ignoring outdated watch update for ",o,". Current version:",c.version," Watch version:",B.version)}),{$o:a,Ko:s}})}function Ww(r,e){const t=ce(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=Ol),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function Yw(r,e){const t=ce(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return t.A_.getTargetData(n,e).next(i=>i?(s=i,G.resolve(s)):t.A_.allocateTargetId(n).next(a=>(s=new yn(e,a,"TargetPurposeListen",n.currentSequenceNumber),t.A_.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=t.No.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.No=t.No.insert(n.targetId,n),t.Lo.set(e,n.targetId)),n})}async function El(r,e,t){const n=ce(r),s=n.No.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ps(a))throw a;Q(oB,`Failed to update sequence numbers for target ${e}: ${a}`)}n.No=n.No.remove(e),n.Lo.delete(s.target)}function Ku(r,e,t){const n=ce(r);let s=Be.min(),i=he();return n.persistence.runTransaction("Execute query","readwrite",a=>function(B,c,h){const d=ce(B),p=d.Lo.get(h);return p!==void 0?G.resolve(d.No.get(p)):d.A_.getTargetData(c,h)}(n,a,ze(e)?e:ln(e)).next(o=>{if(o)return s=o.lastLimboFreeSnapshotVersion,n.A_.getMatchingKeysForTargetId(a,o.targetId).next(B=>{i=B})}).next(()=>n.Mo.getDocumentsMatchingQuery(a,e,t?s:Be.min(),t?i:he())).next(o=>(Xw(n,o),{documents:o,Wo:i})))}function Xw(r,e){e.forEach((t,n)=>{const s=n.key.getCollectionGroup(),i=r.Bo.get(s)||Be.min();n.readTime.compareTo(i)>0&&r.Bo.set(s,n.readTime)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Jo=0,this.Yo=null,this.Zo=!0}Xo(){this.Jo===0&&(this.ea("Unknown"),this.Yo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Yo=null,this.ta("Backend didn't respond within 10 seconds."),this.ea("Offline"),Promise.resolve())))}na(e){this.state==="Online"?this.ea("Unknown"):(this.Jo++,this.Jo>=1&&(this.ra(),this.ta(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ea("Offline")))}set(e){this.ra(),this.Jo=0,e==="Online"&&(this.Zo=!1),this.ea(e)}ea(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ta(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Zo?(In(t),this.Zo=!1):Q("OnlineStateTracker",t)}ra(){this.Yo!==null&&(this.Yo.cancel(),this.Yo=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn="RemoteStore";class eD{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.ia=[],this.sa=new Map,this._a=new Map,this.oa=new Map,this.aa=new Xn(1e3),this.ua=new Xn(1001),this.ca=new Set,this.la=[],this.Ea=i,this.Ea.Ke(a=>{n.enqueueAndForget(async()=>{Or(this)&&(Q(dn,"Restarting streams for network reachability change."),await async function(B){const c=ce(B);c.ca.add(4),await Ri(c),c.ha.set("Unknown"),c.ca.delete(4),await ro(c)}(this))})}),this.ha=new Zw(n,s)}}async function ro(r){if(Or(r))for(const e of r.la)await e(!0)}async function Ri(r){for(const e of r.la)await e(!1)}function yl(r,e){return r._a.get(e)||void 0}function lf(r,e){const t=ce(r),n=yl(t,e.targetId);if(n!==void 0&&t.sa.has(n))return;const s=function(o,B){const c=yl(o,B);c!==void 0&&o.oa.delete(c);const h=function(p,C){return C%2!=0?p.ua.next():p.aa.next()}(o,B);return o._a.set(B,h),o.oa.set(h,B),h}(t,e.targetId);Q(dn,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new yn(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.sa.set(s,i),uB(t)?cB(t):ws(t).Jt()&&BB(t,i)}function lB(r,e){const t=ce(r),n=ws(t),s=yl(t,e);Q(dn,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.sa.delete(s),t._a.delete(e),t.oa.delete(s),n.Jt()&&Bf(t,s),t.sa.size===0&&(n.Jt()?n.Xt():Or(t)&&t.ha.set("Unknown"))}function BB(r,e){if(r.Ta.H(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Be.min())>0){const t=r.oa.get(e.targetId);if(t===void 0)return void Q(dn,"SDK target ID not found for remote ID: "+e.targetId);const n=r.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(n)}ws(r).Tn(e)}function Bf(r,e){r.Ta.H(e),ws(r).Pn(e)}function cB(r){r.Ta=new zm({getRemoteKeysForTarget:e=>{const t=r.oa.get(e);return t!==void 0?r.remoteSyncer.getRemoteKeysForTarget(t):he()},ge:e=>r.sa.get(e)||null,Ae:()=>r.datastore.serializer.databaseId}),ws(r).start(),r.ha.Xo()}function uB(r){return Or(r)&&!ws(r).Ht()&&r.sa.size>0}function Or(r){return ce(r).ca.size===0}function cf(r){r.Ta=void 0}async function tD(r){r.ha.set("Online")}async function nD(r){r.sa.forEach((e,t)=>{BB(r,e)})}async function rD(r,e){cf(r),uB(r)?(r.ha.na(e),cB(r)):r.ha.set("Unknown")}async function sD(r,e,t){if(r.ha.set("Online"),e instanceof md&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const o of i.targetIds){if(s.sa.has(o)){const B=s.oa.get(o);B!==void 0&&(await s.remoteSyncer.rejectListen(B,a),s._a.delete(B),s.oa.delete(o)),s.sa.delete(o)}s.Ta.removeTarget(o)}}(r,e)}catch(n){Q(dn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ra(r,n)}else if(e instanceof oa?r.Ta.se(e):e instanceof gd?r.Ta.Ee(e):r.Ta.ae(e),!t.isEqual(Be.min()))try{const n=await of(r.localStore);t.compareTo(n)>=0&&await function(i,a){const o=i.Ta.de(a);o.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.sa.get(h);d&&i.sa.set(h,d.withResumeToken(c.resumeToken,a))}}),o.targetMismatches.forEach((c,h)=>{const d=i.sa.get(c);if(!d)return;i.sa.set(c,d.withResumeToken(je.EMPTY_BYTE_STRING,d.snapshotVersion)),Bf(i,c);const p=new yn(d.target,c,h,d.sequenceNumber);BB(i,p)});const B=function(h,d){const p=new Map;d.targetChanges.forEach((m,I)=>{const S=h.oa.get(I);S!==void 0&&p.set(S,m)});let C=new Ne(de);return d.targetMismatches.forEach((m,I)=>{const S=h.oa.get(m);S!==void 0&&(C=C.insert(S,I))}),new Si(d.snapshotVersion,p,C,d.documentUpdates,d.augmentedDocumentUpdates,d.resolvedLimboDocuments)}(i,o);return i.remoteSyncer.applyRemoteEvent(B)}(r,t)}catch(n){Q(dn,"Failed to raise snapshot:",n),await Ra(r,n)}}async function Ra(r,e,t){if(!ps(e))throw e;r.ca.add(1),await Ri(r),r.ha.set("Offline"),t||(t=()=>of(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{Q(dn,"Retrying IndexedDB access"),await t(),r.ca.delete(1),await ro(r)})}function uf(r,e){return e().catch(t=>Ra(r,t,e))}async function so(r){const e=ce(r),t=Zn(e);let n=e.ia.length>0?e.ia[e.ia.length-1].batchId:Ol;for(;iD(e);)try{const s=await Ww(e.localStore,n);if(s===null){e.ia.length===0&&t.Xt();break}n=s.batchId,aD(e,s)}catch(s){await Ra(e,s)}hf(e)&&df(e)}function iD(r){return Or(r)&&r.ia.length<10}function aD(r,e){r.ia.push(e);const t=Zn(r);t.Jt()&&t.Rn&&t.In(e.mutations)}function hf(r){return Or(r)&&!Zn(r).Ht()&&r.ia.length>0}function df(r){Zn(r).start()}async function oD(r){Zn(r).dn()}async function lD(r){const e=Zn(r);for(const t of r.ia)e.In(t.mutations)}async function BD(r,e,t){const n=r.ia.shift(),s=rB.from(n,e,t);await uf(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await so(r)}async function cD(r,e){e&&Zn(r).Rn&&await async function(n,s){if(function(a){return Vm(a)&&a!==U.ABORTED}(s.code)){const i=n.ia.shift();Zn(n).Zt(),await uf(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await so(n)}}(r,e),hf(r)&&df(r)}async function Qu(r,e){const t=ce(r);t.asyncQueue.verifyOperationInProgress(),Q(dn,"RemoteStore received new credentials");const n=Or(t);t.ca.add(3),await Ri(t),n&&t.ha.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.ca.delete(3),await ro(t)}async function uD(r,e){const t=ce(r);e?(t.ca.delete(2),await ro(t)):e||(t.ca.add(2),await Ri(t),t.ha.set("Unknown"))}function ws(r){return r.Pa||(r.Pa=function(t,n,s){const i=ce(t);return i.mn(),new vE(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{ut:tD.bind(null,r),lt:nD.bind(null,r),ht:rD.bind(null,r),hn:sD.bind(null,r)}),r.la.push(async e=>{e?(r.Pa.Zt(),uB(r)?cB(r):r.ha.set("Unknown")):(await r.Pa.stop(),cf(r))})),r.Pa}function Zn(r){return r.Ra||(r.Ra=function(t,n,s){const i=ce(t);return i.mn(),new _E(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{ut:()=>Promise.resolve(),lt:oD.bind(null,r),ht:cD.bind(null,r),An:lD.bind(null,r),Vn:BD.bind(null,r)}),r.la.push(async e=>{e?(r.Ra.Zt(),await so(r)):(await r.Ra.stop(),r.ia.length>0&&(Q(dn,`Stopping write stream with ${r.ia.length} pending writes`),r.ia=[]))})),r.Ra}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ia(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ia(this.observer.error,e):In("Uncaught Error in snapshot listener:",e.toString()))}Aa(){this.muted=!0}Ia(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hB{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Dn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const a=Date.now()+n,o=new hB(e,t,a,s,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Z(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function dB(r,e){if(In("AsyncQueue",`${e}: ${r}`),ps(r))return new Z(U.UNAVAILABLE,`${e}: ${r}`);throw r}class Wu{constructor(){this.activeTargetIds=$m()}La(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ba(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Na(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class hD{constructor(){this.du=new Wu,this.fu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.du.La(e),this.fu[e]||"not-current"}updateQueryState(e,t,n){this.fu[e]=t}removeLocalQueryTarget(e){this.du.Ba(e)}isLocalQueryTarget(e){return this.du.activeTargetIds.has(e)}clearQueryState(e){delete this.fu[e]}getAllActiveQueryTargets(){return this.du.activeTargetIds}isActiveQueryTarget(e){return this.du.activeTargetIds.has(e)}start(){return this.du=new Wu,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Qo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{static emptySet(e){return new wr(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||ie.comparator(t.key,n.key):(t,n)=>ie.comparator(t.key,n.key),this.keyedMap=Yr(),this.sortedSet=new Ne(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof wr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new wr;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(){this.mu=new Ne(ie.comparator)}track(e){const t=e.doc.key,n=this.mu.get(t);n?e.type!==0&&n.type===3?this.mu=this.mu.insert(t,e):e.type===3&&n.type!==1?this.mu=this.mu.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.mu=this.mu.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.mu=this.mu.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.mu=this.mu.remove(t):e.type===1&&n.type===2?this.mu=this.mu.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.mu=this.mu.insert(t,{type:2,doc:e.doc}):oe(63341,{ye:e,pu:n}):this.mu=this.mu.insert(t,e)}gu(){const e=[];return this.mu.inorderTraversal((t,n)=>{e.push(n)}),e}}class Bs{constructor(e,t,n,s,i,a,o,B,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=o,this.excludesMetadataChanges=B,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,s,i){const a=[];return t.forEach(o=>{a.push({type:0,doc:o})}),new Bs(e,t,wr.emptySet(t),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&to(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dD{constructor(){this.yu=void 0,this.wu=[]}bu(){return this.wu.some(e=>e.vu())}}class fD{constructor(){this.queries=Xu(),this.onlineState="Unknown",this.Su=new Set}terminate(){(function(t,n){const s=ce(t),i=s.queries;s.queries=Xu(),i.forEach((a,o)=>{for(const B of o.wu)B.onError(n)})})(this,new Z(U.ABORTED,"Firestore shutting down"))}}function Xu(){return new Nr(r=>Zd(r),to)}async function Cf(r,e){const t=ce(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.bu()&&e.vu()&&(n=2):(i=new dD,n=e.vu()?0:1);try{switch(n){case 0:i.yu=await t.onListen(s,!0);break;case 1:i.yu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const o=dB(a,`Initialization of query '${ze(e.query)?vn(e.query):Zs(e.query)}' failed`);return void e.onError(o)}t.queries.set(s,i),i.wu.push(e),e.Du(t.onlineState),i.yu&&e.xu(i.yu)&&fB(t)}async function pf(r,e){const t=ce(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const a=i.wu.indexOf(e);a>=0&&(i.wu.splice(a,1),i.wu.length===0?s=e.vu()?0:1:!i.bu()&&e.vu()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function CD(r,e){const t=ce(r);let n=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const o of a.wu)o.xu(s)&&(n=!0);a.yu=s}}n&&fB(t)}function pD(r,e,t){const n=ce(r),s=n.queries.get(e);if(s)for(const i of s.wu)i.onError(t);n.queries.delete(e)}function fB(r){r.Su.forEach(e=>{e.next()})}var wl;(function(r){r.Default="default",r.Cache="cache"})(wl||(wl={}));class gf{constructor(e,t,n){this.query=e,this.Cu=t,this.Fu=!1,this.Ou=null,this.onlineState="Unknown",this.options=n||{}}xu(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new Bs(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Fu?this.Mu(e)&&(this.Cu.next(e),t=!0):this.Nu(e,this.onlineState)&&(this.Lu(e),t=!0),this.Ou=e,t}onError(e){this.Cu.error(e)}Du(e){this.onlineState=e;let t=!1;return this.Ou&&!this.Fu&&this.Nu(this.Ou,e)&&(this.Lu(this.Ou),t=!0),t}Nu(e,t){if(!e.fromCache||!this.vu())return!0;const n=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Mu(e){if(e.docChanges.length>0)return!0;const t=this.Ou&&this.Ou.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Lu(e){e=Bs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Cu.next(e)}vu(){return this.options.source!==wl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(e){this.key=e}}class Ef{constructor(e){this.key=e}}class gD{constructor(e,t){this.query=e,this.Gu=t,this.zu=null,this.hasCachedResults=!1,this.current=!1,this.ju=he(),this.mutatedKeys=he(),this.Hu=ze(e)?ml(e):Gl(e),this.Ju=new wr(this.Hu)}get Yu(){return this.Gu}Zu(e,t){const n=t?t.Xu:new Yu,s=t?t.Ju:this.Ju;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,o=!1;const[B,c]=this.ec(this.query,s);e.inorderTraversal((d,p)=>{const C=s.get(d),m=Sw(this.query,p)?p:null,I=!!C&&this.mutatedKeys.has(C.key),S=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let F=!1;C&&m?C.data.isEqual(m.data)?I!==S&&(n.track({type:3,doc:m}),F=!0):this.tc(C,m)||(n.track({type:2,doc:m}),F=!0,(B&&this.Hu(m,B)>0||c&&this.Hu(m,c)<0)&&(o=!0)):!C&&m?(n.track({type:0,doc:m}),F=!0):C&&!m&&(n.track({type:1,doc:C}),F=!0,(B||c)&&(o=!0)),F&&(m?(a=a.add(m),i=S?i.add(d):i.delete(d)):(a=a.delete(d),i=i.delete(d)))});const h=this.nc(this.query);if(h)if(ze(this.query)){const d=[];a.forEach(m=>d.push(m));const p=rf(this.query,d);let C=new wr(ml(this.query));for(const m of p)C=C.add(m);a.forEach(m=>{C.has(m.key)||(i=i.delete(m.key),n.track({type:1,doc:m}))}),a=C}else{const d=this.rc(this.query);for(;a.size>h;){const p=d==="F"?a.last():a.first();a=a.delete(p.key),i=i.delete(p.key),n.track({type:1,doc:p})}}return{Ju:a,Xu:n,Fo:o,mutatedKeys:i}}nc(e){var t;return ze(e)?(t=Ko(e))==null?void 0:t.limit:e.limit||void 0}rc(e){if(ze(e)){const t=Ko(e);return t&&t.limit<0?"L":"F"}return e.limitType}ec(e,t){var n;if(ze(e)){const s=(n=Ko(e))==null?void 0:n.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.nc(this.query)?t.last():null,e.limitType==="L"&&t.size===this.nc(this.query)?t.first():null]}tc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.Ju;this.Ju=e.Ju,this.mutatedKeys=e.mutatedKeys;const a=e.Xu.gu();a.sort((h,d)=>function(C,m){const I=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return oe(20277,{ye:S})}};return I(C)-I(m)}(h.type,d.type)||this.Hu(h.doc,d.doc)),this.sc(n),s=s??!1;const o=t&&!s?this._c():[],B=this.ju.size===0&&this.current&&!s?1:0,c=B!==this.zu;return this.zu=B,a.length!==0||c?{snapshot:new Bs(this.query,e.Ju,i,a,e.mutatedKeys,B===0,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),oc:o}:{oc:o}}Du(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ju:this.Ju,Xu:new Yu,mutatedKeys:this.mutatedKeys,Fo:!1},!1)):{oc:[]}}ac(e){return!this.Gu.has(e)&&!!this.Ju.has(e)&&!this.Ju.get(e).hasLocalMutations}sc(e){e&&(e.addedDocuments.forEach(t=>this.Gu=this.Gu.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Gu=this.Gu.delete(t)),this.current=e.current)}_c(){if(!this.current)return[];const e=this.ju;this.ju=he(),this.Ju.forEach(n=>{this.ac(n.key)&&(this.ju=this.ju.add(n.key))});const t=[];return e.forEach(n=>{this.ju.has(n)||t.push(new Ef(n))}),this.ju.forEach(n=>{e.has(n)||t.push(new mf(n))}),t}uc(e){this.Gu=e.Wo,this.ju=he();const t=this.Zu(e.documents);return this.applyChanges(t,!0)}cc(){return Bs.fromInitialDocuments(this.query,this.Ju,this.mutatedKeys,this.zu===0,this.hasCachedResults)}}const CB="SyncEngine";class mD{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class ED{constructor(e){this.key=e,this.lc=!1}}class yD{constructor(e,t,n,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ec={},this.hc=new Nr(o=>Zd(o),to),this.Tc=new Map,this.Pc=new Set,this.Rc=new Ne(ie.comparator),this.Ic=new Map,this.Ac=new sB,this.Vc={},this.dc=new Map,this.fc=Xn.ws(),this.onlineState="Unknown",this.mc=void 0}get isPrimaryClient(){return this.mc===!0}}async function wD(r,e,t=!0){const n=bf(r);let s;const i=n.hc.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cc()):s=await yf(n,e,t,!0),s}async function DD(r,e){const t=bf(r);await yf(t,e,!0,!1)}async function yf(r,e,t,n){const s=await Yw(r.localStore,ze(e)?e:ln(e)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,t);let o;return n&&(o=await vD(r,e,i,a==="current",s.resumeToken)),r.isPrimaryClient&&t&&lf(r.remoteStore,s),o}async function vD(r,e,t,n,s){r.gc=(d,p,C)=>async function(I,S,F,L){let x=S.view.Zu(F);x.Fo&&(x=await Ku(I.localStore,S.query,!1).then(({documents:_})=>S.view.Zu(_,x)));const j=L&&L.targetChanges.get(S.targetId),q=L&&L.targetMismatches.get(S.targetId)!=null,W=S.view.applyChanges(x,I.isPrimaryClient,j,q);return eh(I,S.targetId,W.oc),W.snapshot}(r,d,p,C);const i=await Ku(r.localStore,e,!0),a=new gD(e,i.Wo),o=a.Zu(i.documents),B=Ai.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),c=a.applyChanges(o,r.isPrimaryClient,B);eh(r,t,c.oc);const h=new mD(e,t,a);return r.hc.set(e,h),r.Tc.has(t)?r.Tc.get(t).push(e):r.Tc.set(t,[e]),c.snapshot}async function _D(r,e,t){const n=ce(r),s=n.hc.get(e),i=n.Tc.get(s.targetId);if(i.length>1)return n.Tc.set(s.targetId,i.filter(a=>!to(a,e))),void n.hc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await El(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),t&&lB(n.remoteStore,s.targetId),Dl(n,s.targetId)}).catch(Cs)):(Dl(n,s.targetId),await El(n.localStore,s.targetId,!0))}async function bD(r,e){const t=ce(r),n=t.hc.get(e),s=t.Tc.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),lB(t.remoteStore,n.targetId))}async function ID(r,e,t){const n=ND(r);try{const s=await function(a,o){const B=ce(a),c=Fe.now(),h=o.reduce((C,m)=>C.add(m.key),he());let d,p;return B.persistence.runTransaction("Locally write mutations","readwrite",C=>{let m=wt(),I=he();return B.Uo.getEntries(C,h).next(S=>{m=S,m.forEach((F,L)=>{L.isValidDocument()||(I=I.add(F))})}).next(()=>B.localDocuments.getOverlayedDocuments(C,m)).next(S=>{d=S;const F=[];for(const L of o){const x=gm(L,d.get(L.key).overlayedDocument);x!=null&&F.push(new Fr(L.key,x,Wh(x.value.mapValue),wn.exists(!0)))}return B.mutationQueue.addMutationBatch(C,c,F,o)}).next(S=>{p=S;const F=S.applyToLocalDocumentSet(d,I);return B.documentOverlayCache.saveOverlays(C,S.batchId,F)})}).then(()=>({batchId:p.batchId,changes:Cd(d)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),function(a,o,B){let c=a.Vc[a.currentUser.toKey()];c||(c=new Ne(de)),c=c.insert(o,B),a.Vc[a.currentUser.toKey()]=c}(n,s.batchId,t),await Fi(n,s.changes),await so(n.remoteStore)}catch(s){const i=dB(s,"Failed to persist write");t.reject(i)}}async function wf(r,e){const t=ce(r);try{const n=await Kw(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Ic.get(i);a&&(ee(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lc=!0:s.modifiedDocuments.size>0?ee(a.lc,14607):s.removedDocuments.size>0&&(ee(a.lc,42227),a.lc=!1))}),await Fi(t,n,e)}catch(n){await Cs(n)}}function Zu(r,e,t){const n=ce(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.hc.forEach((i,a)=>{const o=a.view.Du(e);o.snapshot&&s.push(o.snapshot)}),function(a,o){const B=ce(a);B.onlineState=o;let c=!1;B.queries.forEach((h,d)=>{for(const p of d.wu)p.Du(o)&&(c=!0)}),c&&fB(B)}(n.eventManager,e),s.length&&n.Ec.hn(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function TD(r,e,t){const n=ce(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Ic.get(e),i=s&&s.key;if(i){let a=new Ne(ie.comparator);a=a.insert(i,ot.newNoDocument(i,Be.min()));const o=he().add(i),B=new Si(Be.min(),new Map,new Ne(de),a,wt(),o);await wf(n,B),n.Rc=n.Rc.remove(i),n.Ic.delete(e),pB(n)}else await El(n.localStore,e,!1).then(()=>Dl(n,e,t)).catch(Cs)}async function SD(r,e){const t=ce(r),n=e.batch.batchId;try{const s=await zw(t.localStore,e);vf(t,n,null),Df(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Fi(t,s)}catch(s){await Cs(s)}}async function AD(r,e,t){const n=ce(r);try{const s=await function(a,o){const B=ce(a);return B.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return B.mutationQueue.lookupMutationBatch(c,o).next(d=>(ee(d!==null,37113),h=d.keys(),B.mutationQueue.removeMutationBatch(c,d))).next(()=>B.mutationQueue.performConsistencyCheck(c)).next(()=>B.documentOverlayCache.removeOverlaysForBatchId(c,h,o)).next(()=>B.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>B.localDocuments.getDocuments(c,h))})}(n.localStore,e);vf(n,e,t),Df(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Fi(n,s)}catch(s){await Cs(s)}}function Df(r,e){(r.dc.get(e)||[]).forEach(t=>{t.resolve()}),r.dc.delete(e)}function vf(r,e,t){const n=ce(r);let s=n.Vc[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.Vc[n.currentUser.toKey()]=s}}function Dl(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Tc.get(e))r.hc.delete(n),t&&r.Ec.yc(n,t);r.Tc.delete(e),r.isPrimaryClient&&r.Ac.Xs(e).forEach(n=>{r.Ac.containsKey(n)||_f(r,n)})}function _f(r,e){r.Pc.delete(e.path.canonicalString());const t=r.Rc.get(e);t!==null&&(lB(r.remoteStore,t),r.Rc=r.Rc.remove(e),r.Ic.delete(t),pB(r))}function eh(r,e,t){for(const n of t)n instanceof mf?(r.Ac.addReference(n.key,e),PD(r,n)):n instanceof Ef?(Q(CB,"Document no longer in limbo: "+n.key),r.Ac.removeReference(n.key,e),r.Ac.containsKey(n.key)||_f(r,n.key)):oe(19791,{wc:n})}function PD(r,e){const t=e.key,n=t.path.canonicalString();r.Rc.get(t)||r.Pc.has(n)||(Q(CB,"New document in limbo: "+t),r.Pc.add(n),pB(r))}function pB(r){for(;r.Pc.size>0&&r.Rc.size<r.maxConcurrentLimboResolutions;){const e=r.Pc.values().next().value;r.Pc.delete(e);const t=new ie(we.fromString(e)),n=r.fc.next();r.Ic.set(n,new ED(t)),r.Rc=r.Rc.insert(t,n),lf(r.remoteStore,new yn(ln(Vl(t.path)),n,"TargetPurposeLimboResolution",qa.yn))}}async function Fi(r,e,t){const n=ce(r),s=[],i=[],a=[];n.hc.isEmpty()||(n.hc.forEach((o,B)=>{a.push(n.gc(B,e,t).then(c=>{var h;if((c||t)&&n.isPrimaryClient){const d=c?!c.fromCache:(h=t==null?void 0:t.targetChanges.get(B.targetId))==null?void 0:h.current;n.sharedClientState.updateQueryState(B.targetId,d?"current":"not-current")}if(c){s.push(c);const d=aB.fo(B.targetId,c);i.push(d)}}))}),await Promise.all(a),n.Ec.hn(s),await async function(B,c){const h=ce(B);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>G.forEach(c,p=>G.forEach(p.Ao,C=>h.persistence.referenceDelegate.addReference(d,p.targetId,C)).next(()=>G.forEach(p.Vo,C=>h.persistence.referenceDelegate.removeReference(d,p.targetId,C)))))}catch(d){if(!ps(d))throw d;Q(oB,"Failed to update sequence numbers: "+d)}for(const d of c){const p=d.targetId;if(!d.fromCache){const C=h.No.get(p),m=C.snapshotVersion,I=C.withLastLimboFreeSnapshotVersion(m);h.No=h.No.insert(p,I)}}}(n.localStore,i))}async function RD(r,e){const t=ce(r);if(!t.currentUser.isEqual(e)){Q(CB,"User change. New user:",e.toKey());const n=await af(t.localStore,e);t.currentUser=e,function(i,a){i.dc.forEach(o=>{o.forEach(B=>{B.reject(new Z(U.CANCELLED,a))})}),i.dc.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Fi(t,n.qo)}}function FD(r,e){const t=ce(r),n=t.Ic.get(e);if(n&&n.lc)return he().add(n.key);{let s=he();const i=t.Tc.get(e);if(!i)return s;for(const a of i??[]){const o=t.hc.get(a);s=s.unionWith(o.view.Yu)}return s}}function bf(r){const e=ce(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=wf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=FD.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=TD.bind(null,e),e.Ec.hn=CD.bind(null,e.eventManager),e.Ec.yc=pD.bind(null,e.eventManager),e}function ND(r){const e=ce(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=SD.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=AD.bind(null,e),e}class Fa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ja(e.databaseInfo.databaseId),this.sharedClientState=this.vc(e),this.persistence=this.Sc(e),await this.persistence.start(),this.localStore=this.Dc(e),this.gcScheduler=this.xc(e,this.localStore),this.indexBackfillerScheduler=this.Cc(e,this.localStore)}xc(e,t){return null}Cc(e,t){return null}Dc(e){return qw(this.persistence,new jw,e.initialUser,this.serializer)}Sc(e){return new sf(iB.w_,this.serializer)}vc(e){return new hD}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Fa.provider={build:()=>new Fa};class xD extends Fa{constructor(e){super(),this.cacheSizeBytes=e}xc(e,t){ee(this.persistence.referenceDelegate instanceof Pa,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new OE(n,e.asyncQueue,t)}Sc(e){const t=this.cacheSizeBytes!==void 0?yt.withCacheSize(this.cacheSizeBytes):yt.DEFAULT;return new sf(n=>Pa.w_(n,t),this.serializer)}}class vl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Zu(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=RD.bind(null,this.syncEngine),await uD(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new fD}()}createDatastore(e){const t=Ja(e.databaseInfo.databaseId),n=DE(e.databaseInfo);return TE(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,s,i,a,o){return new eD(n,s,i,a,o)}(this.localStore,this.datastore,e.asyncQueue,t=>Zu(this.syncEngine,t,0),function(){return ku.Je()?new ku:new mE}())}createSyncEngine(e,t){return function(s,i,a,o,B,c,h){const d=new yD(s,i,a,o,B,c);return h&&(d.mc=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=ce(s);Q(dn,"RemoteStore shutting down."),i.ca.add(5),await Ri(i),i.Ea.shutdown(),i.ha.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}vl.provider={build:()=>new vl};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er="FirestoreClient";class OD{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=at.UNAUTHENTICATED,this.clientId=Nl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{Q(er,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(Q(er,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Dn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=dB(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Wo(r,e){r.asyncQueue.verifyOperationInProgress(),Q(er,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await af(e.localStore,s),n=s)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function th(r,e){r.asyncQueue.verifyOperationInProgress();const t=await LD(r);Q(er,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>Qu(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Qu(e.remoteStore,s)),r._onlineComponents=e}async function LD(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){Q(er,"Using user provided OfflineComponentProvider");try{await Wo(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===U.FAILED_PRECONDITION||s.code===U.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Qt("Error using user provided cache. Falling back to memory cache: "+t),await Wo(r,new Fa)}}else Q(er,"Using default OfflineComponentProvider"),await Wo(r,new xD(void 0));return r._offlineComponents}async function If(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(Q(er,"Using user provided OnlineComponentProvider"),await th(r,r._uninitializedComponentsProvider._online)):(Q(er,"Using default OnlineComponentProvider"),await th(r,new vl))),r._onlineComponents}function kD(r){return If(r).then(e=>e.syncEngine)}async function Tf(r){const e=await If(r),t=e.eventManager;return t.onListen=wD.bind(null,e.syncEngine),t.onUnlisten=_D.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=DD.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=bD.bind(null,e.syncEngine),t}function MD(r,e,t={}){const n=new Dn;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,o,B,c){const h=new ff({next:p=>{h.Aa(),a.enqueueAndForget(()=>pf(i,d));const C=p.docs.has(o);!C&&p.fromCache?c.reject(new Z(U.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&p.fromCache&&B&&B.source==="server"?c.reject(new Z(U.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new gf(Vl(o.path),h,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Cf(i,d)}(await Tf(r),r.asyncQueue,e,t,n)),n.promise}function VD(r,e,t={}){const n=new Dn;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,o,B,c){const h=new ff({next:p=>{h.Aa(),a.enqueueAndForget(()=>pf(i,d)),p.fromCache&&B.source==="server"?c.reject(new Z(U.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new gf(o instanceof ti?Ew(o):o,h,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Cf(i,d)}(await Tf(r),r.asyncQueue,e,t,n)),n.promise}function GD(r,e){const t=new Dn;return r.asyncQueue.enqueueAndForget(async()=>ID(await kD(r),e,t)),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh="AsyncQueue";class rh{constructor(e=Promise.resolve()){this.Wc=[],this.Qc=!1,this.Gc=[],this.zc=null,this.jc=!1,this.Hc=!1,this.Jc=[],this.jt=new Rd(this,"async_queue_retry"),this.Yc=()=>{const n=Qo();n&&Q(nh,"Visibility state changed to "+n.visibilityState),this.jt.qt()},this.Zc=e;const t=Qo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Yc)}get isShuttingDown(){return this.Qc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Xc(),this.el(e)}enterRestrictedMode(e){if(!this.Qc){this.Qc=!0,this.Hc=e||!1;const t=Qo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Yc)}}enqueue(e){if(this.Xc(),this.Qc)return new Promise(()=>{});const t=new Dn;return this.el(()=>this.Qc&&this.Hc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Wc.push(e),this.tl()))}async tl(){if(this.Wc.length!==0){try{await this.Wc[0](),this.Wc.shift(),this.jt.reset()}catch(e){if(!ps(e))throw e;Q(nh,"Operation failed with retryable error: "+e)}this.Wc.length>0&&this.jt.Ut(()=>this.tl())}}el(e){const t=this.Zc.then(()=>(this.jc=!0,e().catch(n=>{throw this.zc=n,this.jc=!1,In("INTERNAL UNHANDLED ERROR: ",sh(n)),n}).then(n=>(this.jc=!1,n))));return this.Zc=t,t}enqueueAfterDelay(e,t,n){this.Xc(),this.Jc.indexOf(e)>-1&&(t=0);const s=hB.createAndSchedule(this,e,t,n,i=>this.nl(i));return this.Gc.push(s),s}Xc(){this.zc&&oe(47125,{rl:sh(this.zc)})}verifyOperationInProgress(){}async il(){let e;do e=this.Zc,await e;while(e!==this.Zc)}sl(e){for(const t of this.Gc)if(t.timerId===e)return!0;return!1}_l(e){return this.il().then(()=>{this.Gc.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Gc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.il()})}ol(e){this.Jc.push(e)}nl(e){const t=this.Gc.indexOf(e);this.Gc.splice(t,1)}}function sh(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class io extends za{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new rh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rh(e),this._firestoreClient=void 0,await e}}}function HD(r,e){const t=typeof r=="object"?r:hg(),n=typeof r=="string"?r:ma,s=og(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=ep("firestore");i&&ME(s,...i)}return s}function gB(r){if(r._terminated)throw new Z(U.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||UD(r),r._firestoreClient}function UD(r){var n,s,i,a;const e=r._freezeSettings(),t=AE(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new OD(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&function(B){const c=B==null?void 0:B._online.build();return{_offline:B==null?void 0:B._offline.build(c),_online:c}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jD{convertValue(e,t="none"){switch($e(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(zn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw oe(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Rr(e,(s,i)=>{n[s]=this.convertValue(i,t)}),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[ci].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>xe(a.doubleValue));return new vt(t)}convertGeoPoint(e){return new cn(xe(e.latitude),xe(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Ii(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(is(e));default:return null}}convertTimestamp(e){const t=qn(e);return new Fe(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=we.fromString(e);ee(bd(n),9688,{name:e});const s=new li(n.get(1),n.get(3)),i=new ie(n.popFirst(5));return s.isEqual(t)||In(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf extends jD{constructor(e){super(),this.firestore=e}convertBytes(e){return new Lt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new He(this.firestore,null,t)}}const ih="@firebase/firestore",ah="4.17.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Af=class{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new He(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new $D(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Qa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},$D=class extends Af{data(){return super.data()}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JD(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new Z(U.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function qD(r,e,t){let n;return n=r?r.toFirestore(e):e,n}class Ks{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Dr extends Af{constructor(e,t,n,s,i,a){super(e,t,n,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ca(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Qa("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Z(U.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Dr._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Dr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Dr._jsonSchema={type:Ge("string",Dr._jsonSchemaVersion),bundleSource:Ge("string","DocumentSnapshot"),bundleName:Ge("string"),bundle:Ge("string")};class ca extends Dr{data(e={}){return super.data(e)}}class rs{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ks(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new ca(this._firestore,this._userDataWriter,n.key,n,new Ks(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Z(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(o=>{ze(s._snapshot.query)?ml(s._snapshot.query):Gl(s.query._query);const B=new ca(s._firestore,s._userDataWriter,o.doc.key,o.doc,new Ks(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);return o.doc,{type:"added",doc:B,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(o=>i||o.type!==3).map(o=>{const B=new ca(s._firestore,s._userDataWriter,o.doc.key,o.doc,new Ks(s._snapshot.mutatedKeys.has(o.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,h=-1;return o.type!==0&&(c=a.indexOf(o.doc.key),a=a.delete(o.doc.key)),o.type!==1&&(a=a.add(o.doc),h=a.indexOf(o.doc.key)),{type:zD(o.type),doc:B,oldIndex:c,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Z(U.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=rs._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Nl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function zD(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return oe(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rs._jsonSchemaVersion="firestore/querySnapshot/1.0",rs._jsonSchema={type:Ge("string",rs._jsonSchemaVersion),bundleSource:Ge("string","QuerySnapshot"),bundleName:Ge("string"),bundle:Ge("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KD(r){r=Sr(r,He);const e=Sr(r.firestore,io),t=gB(e);return MD(t,r._key).then(n=>WD(e,r,n))}function Yo(r){r=Sr(r,Ka);const e=Sr(r.firestore,io),t=gB(e),n=new Sf(e);return JD(r._query),VD(t,r._query).then(s=>new rs(e,n,r,s))}function Lr(r,e,t){r=Sr(r,He);const n=Sr(r.firestore,io),s=qD(r.converter,e),i=UE(n);return QD(n,[jE(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,wn.none())])}function QD(r,e){const t=gB(r);return GD(t,e)}function WD(r,e,t){const n=t.docs.get(e._key),s=new Sf(r);return new Dr(r,s,e._key,n,new Ks(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){Xg(ug),pa(new ii("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),o=new io(new fE(n.getProvider("auth-internal")),new gE(a,n.getProvider("app-check-internal")),om(a,s),a);return i={useFetchStreams:t,...i},o._setSettings(i),o},"PUBLIC").setMultipleInstances(!0)),ts(ih,ah,e),ts(ih,ah,"esm2020")})();const YD={apiKey:"AIzaSyAmy7pXtqLpq7GsvYZY9xVxjQr5PyL43IE",authDomain:"dreamsai-22e7c.firebaseapp.com",projectId:"dreamsai-22e7c",storageBucket:"dreamsai-22e7c.firebasestorage.app",messagingSenderId:"590220962512",appId:"1:590220962512:web:0d2ceb339b6b1531688cd5"},XD=bh(YD),qt=HD(XD),Re={STYLISTS:"dreamsai_celebrity_stylists_v6",CELEBRITIES:"dreamsai_celebrities_v6",PROJECTS:"dreamsai_celebrity_projects_v6",ACTIVE_CONTEXT:"dreamsai_celebrity_active_context_v6"};function zt(r,e){try{const t=localStorage.getItem(r);return t?JSON.parse(t):e}catch(t){return console.warn(`[CelebrityStore] Error reading ${r} from localStorage`,t),e}}function Dt(r,e){try{localStorage.setItem(r,JSON.stringify(e))}catch(t){console.warn(`[CelebrityStore] Error saving ${r} to localStorage`,t)}}function ZD(){let r=zt(Re.STYLISTS,null),e=zt(Re.CELEBRITIES,null),t=zt(Re.PROJECTS,null);if((!r||!Array.isArray(r)||r.length===0)&&(r=[{id:"sty_ananya_01",name:"Ananya Sharma",title:"Lead Red Carpet Stylist",specialty:"High Fine & Couture Jewellery",createdAt:new Date().toISOString()},{id:"sty_rohan_02",name:"Rohan Mehta",title:"Celebrity Fashion Director",specialty:"Runway & Award Season",createdAt:new Date().toISOString()}],Dt(Re.STYLISTS,r)),(!e||!Array.isArray(e)||e.length===0)&&(e=[{id:"cel_shreya_001",name:"Shreya",category:"A-List Actress & Icon",house:"Red Carpet Gala",phone:"+91 9876543210",email:"shreya@atelier.com",createdAt:new Date().toISOString()},{id:"cel_rahul_002",name:"Rahul",category:"Fashion Icon & Artist",house:"Vogue Showcase",phone:"+91 9812345678",email:"rahul@vogue.com",createdAt:new Date().toISOString()}],Dt(Re.CELEBRITIES,e)),!t||!Array.isArray(t)||t.length===0){const n=new Date,s=new Date(n.getTime()-3*24*60*60*1e3).toISOString(),i=new Date(n.getTime()-1*24*60*60*1e3).toISOString().split("T")[0],a=new Date(n.getTime()+2*24*60*60*1e3).toISOString().split("T")[0];t=[{id:"proj_shreya_mon_001",celebrityId:"cel_shreya_001",stylistId:"sty_ananya_01",headStylist:"Natasha K",jewelleryBrand:"Ascend Fine Jewellery",code:"LB-2026-FW01",title:"Red Carpet Gala Pull (Shreya)",season:"Fall / Winter 2026",purpose:"Red Carpet Gala",status:"Active",projectStatus:"Waiting for Return",notes:"Requirement provided by Shreya. Curated by Stylist Ananya Sharma.",finalTraySharedDate:new Date(n.getTime()-5*24*60*60*1e3).toISOString().split("T")[0],followUpDate:a,returnDueDate:i,productStats:{sent:18,returned:14,pending:3,missing:1},deliverables:{completed:3,total:5},socialPosting:{status:"Pending",postingDate:"2026-08-05"},payment:{invoiceAmount:15e4,amountReceived:1e5,status:"Partial"},createdAt:s,updatedAt:s,selectedSerials:[],pdfRecords:[{id:"pdf_001",pdfTitle:"Shreya_Gala_Curation_Mon.pdf",pdfKind:"Celebrity Lookbook",generatedAt:s,itemCount:0}],activityLog:[{id:"act_001",timestamp:s,action:"Curation Initiated",details:"Lookbook created for Celebrity Shreya by Stylist Ananya Sharma."}]},{id:"proj_rahul_vogue_002",celebrityId:"cel_rahul_002",stylistId:"sty_rohan_02",headStylist:"Vikram R",jewelleryBrand:"Luxe Heritage Jewels",code:"LB-2026-FW02",title:"Vogue Cover Showcase (Rahul)",season:"Fall / Winter 2026",purpose:"Editorial Shoot",status:"Lookbook Sent",projectStatus:"Active",notes:"High priority editorial lookbook shoot.",finalTraySharedDate:new Date().toISOString().split("T")[0],followUpDate:new Date(n.getTime()+4*24*60*60*1e3).toISOString().split("T")[0],returnDueDate:new Date(n.getTime()+7*24*60*60*1e3).toISOString().split("T")[0],productStats:{sent:12,returned:12,pending:0,missing:0},deliverables:{completed:4,total:4},socialPosting:{status:"Posted",postingDate:"2026-07-30"},payment:{invoiceAmount:22e4,amountReceived:22e4,status:"Paid"},createdAt:n.toISOString(),updatedAt:n.toISOString(),selectedSerials:[],pdfRecords:[],activityLog:[]}],Dt(Re.PROJECTS,Ds(t))}}ZD();function Ds(r=[]){return Array.isArray(r)?[...r].sort((e,t)=>{const n=new Date(e.updatedAt||e.createdAt||0).getTime();return new Date(t.updatedAt||t.createdAt||0).getTime()-n}):[]}function Pf(r=[],e=[]){const t=new Map;(Array.isArray(r)?r:[]).forEach(a=>{a&&a.id&&t.set(a.id,a)});const n=new Map,s=new Map;(Array.isArray(e)?e:[]).forEach(a=>{if(!a||!a.id)return;const o=s.get(a.id);if(!o)s.set(a.id,a);else{const B=new Date(o.updatedAt||o.createdAt||0).getTime();new Date(a.updatedAt||a.createdAt||0).getTime()>B&&s.set(a.id,a)}}),Array.from(s.values()).forEach(a=>{var d,p,C,m,I,S,F,L,x,j,q,W,_,E,y,b,T,R,v,ae,Ee,Le,Ze,gt,Bt,en,Ht,ar,or,lr,Gr,Hr,Ur;const o=t.get(a.id);if(!o){n.set(a.id,{...a});return}const B=new Date(o.updatedAt||o.createdAt||0).getTime(),c=new Date(a.updatedAt||a.createdAt||0).getTime(),h=B>=c?{...a,...o}:{...o,...a};n.set(a.id,{...h,title:h.title||o.title||a.title,status:h.status||o.status||a.status,projectStatus:h.projectStatus||o.projectStatus||a.projectStatus,finalTraySharedDate:h.finalTraySharedDate||o.finalTraySharedDate||a.finalTraySharedDate||"",followUpDate:h.followUpDate||o.followUpDate||a.followUpDate||"",returnDueDate:h.returnDueDate||o.returnDueDate||a.returnDueDate||"",selectedSerials:Array.isArray(h.selectedSerials)&&h.selectedSerials.length>0?h.selectedSerials:Array.isArray(o.selectedSerials)&&o.selectedSerials.length>0?o.selectedSerials:a.selectedSerials||[],productStats:{sent:((d=h.productStats)==null?void 0:d.sent)??((p=o.productStats)==null?void 0:p.sent)??((C=a.productStats)==null?void 0:C.sent)??0,returned:((m=h.productStats)==null?void 0:m.returned)??((I=o.productStats)==null?void 0:I.returned)??((S=a.productStats)==null?void 0:S.returned)??0,pending:((F=h.productStats)==null?void 0:F.pending)??((L=o.productStats)==null?void 0:L.pending)??((x=a.productStats)==null?void 0:x.pending)??0,missing:((j=h.productStats)==null?void 0:j.missing)??((q=o.productStats)==null?void 0:q.missing)??((W=a.productStats)==null?void 0:W.missing)??0},deliverables:{completed:((_=h.deliverables)==null?void 0:_.completed)??((E=o.deliverables)==null?void 0:E.completed)??((y=a.deliverables)==null?void 0:y.completed)??0,total:((b=h.deliverables)==null?void 0:b.total)??((T=o.deliverables)==null?void 0:T.total)??((R=a.deliverables)==null?void 0:R.total)??5},socialPosting:{status:((v=h.socialPosting)==null?void 0:v.status)||((ae=o.socialPosting)==null?void 0:ae.status)||((Ee=a.socialPosting)==null?void 0:Ee.status)||"Pending",postingDate:((Le=h.socialPosting)==null?void 0:Le.postingDate)||((Ze=o.socialPosting)==null?void 0:Ze.postingDate)||((gt=a.socialPosting)==null?void 0:gt.postingDate)||""},payment:{invoiceAmount:((Bt=h.payment)==null?void 0:Bt.invoiceAmount)??((en=o.payment)==null?void 0:en.invoiceAmount)??((Ht=a.payment)==null?void 0:Ht.invoiceAmount)??0,amountReceived:((ar=h.payment)==null?void 0:ar.amountReceived)??((or=o.payment)==null?void 0:or.amountReceived)??((lr=a.payment)==null?void 0:lr.amountReceived)??0,status:((Gr=h.payment)==null?void 0:Gr.status)||((Hr=o.payment)==null?void 0:Hr.status)||((Ur=a.payment)==null?void 0:Ur.status)||"Pending"},pdfRecords:Array.isArray(h.pdfRecords)&&h.pdfRecords.length>0?h.pdfRecords:o.pdfRecords||a.pdfRecords||[],updatedAt:B>=c?o.updatedAt||new Date().toISOString():a.updatedAt||o.updatedAt||new Date().toISOString()}),t.delete(a.id)}),t.forEach((a,o)=>{n.set(o,{...a})});const i=Array.from(n.values());return Ds(i)}async function Rf(){try{const r=await Yo(qo(qt,"projects")),e=[];if(r.forEach(a=>e.push(a.data())),e.length>0){const a=zt(Re.PROJECTS,[]),o=Pf(a,e);Dt(Re.PROJECTS,o)}const t=await Yo(qo(qt,"stylists")),n=[];if(t.forEach(a=>n.push(a.data())),n.length>0){const a=zt(Re.STYLISTS,[]),o=new Map;a.forEach(B=>o.set(B.id,B)),n.forEach(B=>o.set(B.id,B)),Dt(Re.STYLISTS,Array.from(o.values()))}const s=await Yo(qo(qt,"celebrities")),i=[];if(s.forEach(a=>i.push(a.data())),i.length>0){const a=zt(Re.CELEBRITIES,[]),o=new Map;a.forEach(B=>o.set(B.id,B)),i.forEach(B=>o.set(B.id,B)),Dt(Re.CELEBRITIES,Array.from(o.values()))}try{const a=await KD(nr(qt,"app_state","active_context"));if(a.exists()){const o=a.data();o&&o.celebrityId&&Dt(Re.ACTIVE_CONTEXT,{celebrityId:o.celebrityId,projectId:o.projectId})}}catch(a){console.warn("[FirebaseSync] Note reading active context:",a)}return console.log("[FirebaseSync] Successfully pulled and merged data from Firestore."),typeof window<"u"&&typeof window.renderHomepageProjectsGateway=="function"&&window.renderHomepageProjectsGateway(),{ok:!0}}catch(r){return console.warn("[FirebaseSync] Error fetching from Firebase",r),null}}Rf();function rr(){return zt(Re.STYLISTS,[])}function Sn(r){return rr().find(t=>t.id===r)||null}function Ff({name:r,title:e="Personal Stylist",specialty:t="Couture Jewellery"}){const n=rr(),s={id:"sty_"+Date.now()+"_"+Math.random().toString(36).substr(2,4),name:r.trim(),title:e.trim(),specialty:t.trim(),createdAt:new Date().toISOString()};return n.unshift(s),Dt(Re.STYLISTS,n),Lr(nr(qt,"stylists",s.id),s).catch(i=>console.warn("Firebase sync error",i)),s}function kr(){return zt(Re.CELEBRITIES,[])}function vs(r){return kr().find(t=>t.id===r)||null}function mB({name:r,category:e="A-List Actress & Icon",house:t="",phone:n="",email:s=""}){const i=kr(),a={id:"cel_"+Date.now()+"_"+Math.random().toString(36).substr(2,4),name:r.trim(),category:e||"A-List Actress & Icon",house:t.trim(),phone:n.trim(),email:s.trim(),createdAt:new Date().toISOString()};return i.unshift(a),Dt(Re.CELEBRITIES,i),Lr(nr(qt,"celebrities",a.id),a).catch(o=>console.warn("Firebase sync error",o)),a}function Gt(r=null,e=null){let t=zt(Re.PROJECTS,[]);return t=Ds(t),r&&(t=t.filter(n=>n.celebrityId===r)),e&&(t=t.filter(n=>n.stylistId===e)),t}function Mr(r){return Gt().find(t=>t.id===r)||null}function ao({celebrityId:r,stylistId:e=null,title:t,season:n="Fall / Winter 2026",purpose:s="Red Carpet Pull",notes:i="",selectedSerials:a=null}){const o=Gt(),B=vs(r),c=B?B.name:"Celebrity",h=rr(),d=e?Sn(e):h[0]||null,p=new Date,C=`LB-${p.getFullYear()}-${(o.length+1).toString().padStart(3,"0")}`;let m=[];Array.isArray(a)&&a.length>0?m=[...a]:typeof window<"u"&&Array.isArray(window.selected)&&window.selected.length>0&&(m=[...window.selected]);const I={id:"proj_"+Date.now()+"_"+Math.random().toString(36).substr(2,4),celebrityId:r,stylistId:d?d.id:null,code:C,title:t.trim()||`${c} Curation`,season:n||"FW-2026",purpose:s||"Red Carpet Pull",status:"Curating",notes:i.trim(),createdAt:p.toISOString(),updatedAt:p.toISOString(),selectedSerials:m,pdfRecords:[],activityLog:[{id:"act_"+Date.now(),timestamp:p.toISOString(),action:"Curation Initiated",details:`Created lookbook "${t}" for Celebrity ${c}${d?` by Stylist ${d.name}`:""}${m.length?` with ${m.length} initial selected items`:""}.`}]};return o.unshift(I),Dt(Re.PROJECTS,Ds(o)),Vr(r,I.id),Lr(nr(qt,"projects",I.id),I).catch(S=>console.warn("Firebase sync error",S)),I}function sr(r,e){const t=zt(Re.PROJECTS,[]),n=t.findIndex(a=>a.id===r);if(n===-1)return null;const s={...t[n],...e,updatedAt:new Date().toISOString()};t[n]=s;const i=Ds(t);return Dt(Re.PROJECTS,i),Lr(nr(qt,"projects",s.id),s).catch(a=>console.warn("Firebase sync error",a)),s}function Nf(r,e){const t=Mr(r);if(!t)return null;const n=t.selectedSerials?t.selectedSerials.length:0,s=e.length,i=sr(r,{selectedSerials:[...e]});return n!==s&&oo(r,"Selection Updated",`curation updated: ${s} pieces selected.`),i}function oo(r,e,t){const n=Gt(),s=n.findIndex(a=>a.id===r);if(s===-1)return null;const i={id:"act_"+Date.now()+"_"+Math.random().toString(36).substr(2,3),timestamp:new Date().toISOString(),action:e,details:t};return n[s].activityLog||(n[s].activityLog=[]),n[s].activityLog.unshift(i),n[s].updatedAt=new Date().toISOString(),Dt(Re.PROJECTS,n),Lr(nr(qt,"projects",n[s].id),n[s]).catch(a=>console.warn("Firebase sync error",a)),i}function ev(r,{pdfTitle:e,pdfKind:t,itemCount:n,dataUrl:s=null}){const i=Gt(),a=i.findIndex(B=>B.id===r);if(a===-1)return null;const o={id:"pdf_"+Date.now(),pdfTitle:e,pdfKind:t||"Celebrity Lookbook",generatedAt:new Date().toISOString(),itemCount:n||0};return i[a].pdfRecords||(i[a].pdfRecords=[]),i[a].pdfRecords.unshift(o),i[a].updatedAt=new Date().toISOString(),Dt(Re.PROJECTS,i),Lr(nr(qt,"projects",i[a].id),i[a]).catch(B=>console.warn("Firebase sync error",B)),oo(r,"PDF Exported",`Generated ${t} PDF (${e}) with ${n} items.`),o}function Cn(){const r={celebrityId:null,projectId:null},e=zt(Re.ACTIVE_CONTEXT,r),t=kr(),n=Gt(),s=rr();let i=n.find(B=>B.id===e.projectId)||n[0]||null,a=i?t.find(B=>B.id===i.celebrityId)||t[0]:t.find(B=>B.id===e.celebrityId)||t[0]||null,o=i&&i.stylistId?Sn(i.stylistId):s[0]||null;return{celebrityId:a?a.id:null,projectId:i?i.id:null,stylistId:o?o.id:null,celebrity:a,project:i,stylist:o}}function Vr(r,e){const t={celebrityId:r,projectId:e,updatedAt:new Date().toISOString()};return Dt(Re.ACTIVE_CONTEXT,t),Lr(nr(qt,"app_state","active_context"),t).catch(n=>console.warn("Firebase sync active context error",n)),Cn()}const Ke=Object.freeze(Object.defineProperty({__proto__:null,API_URL:hs,addProjectPdfRecord:ev,createProject:ao,fetchDataFromFirebase:Rf,getActiveContext:Cn,getCelebrities:kr,getCelebrityById:vs,getProjectById:Mr,getProjects:Gt,getStylistById:Sn,getStylists:rr,logProjectActivity:oo,mergeProjects:Pf,saveCelebrity:mB,saveStylist:Ff,setActiveContext:Vr,sortProjectsDescending:Ds,updateProject:sr,updateProjectItems:Nf},Symbol.toStringTag,{value:"Module"}));let oh=null;const ri={filtersOpen:!1},jt={currentPage:1,pageSize:10},te={searchCelebrity:"",searchStylist:"",searchBrand:"",projectStatus:"",paymentStatus:"",returnStatus:"",socialStatus:""};function EB(r){return r.projectStatus||r.status||"Active"}function tv(r){const e=String(r||"").trim();return e==="Completed"?"proj-completed":e==="Return pending"?"proj-return":e==="Missing deliverables"?"proj-deliverables":e==="Social pending"?"proj-social":e==="Active"||e==="Lookbook Sent"?"proj-active":"proj-upcoming"}function yB(r){var e;return((e=r.payment)==null?void 0:e.status)||"Pending"}function nv(r){const e=String(r||"").trim();return e==="Paid"?"pay-paid":e==="Partial"?"pay-partial":e==="Overdue"?"pay-overdue":"pay-pending"}function wB(r){var e;return((e=r.socialPosting)==null?void 0:e.status)||"Pending"}function rv(r){const e=String(r||"").trim();return e==="Posted"?"soc-posted":e==="Verified"?"soc-verified":"soc-pending"}function Na(r){const e=r.productStats||{};return{sent:Number(e.sent||0),returned:Number(e.returned||0),pending:Number(e.pending||0),missing:Number(e.missing||0)}}function xf(r){const e=r.deliverables||{},t=Number(e.completed||0),n=Math.max(Number(e.total||0),1);return{completed:t,total:n,percent:n?Math.round(t/n*100):0}}function es(r){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(r||0))}function _l(r,e=15){if(!r)return"";const t=new Date(r);if(isNaN(t.getTime()))return"";t.setDate(t.getDate()+e);const n=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${n}-${s}-${i}`}function Ut(r){if(!r)return"—";const e=new Date(r);if(Number.isNaN(e.getTime()))return r;const t=e.getDate(),s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()],i=e.getFullYear();return`${t} ${s} ${i}`}function Of(r){if(!r)return"none";const e=new Date;e.setHours(0,0,0,0);const t=new Date(r);return Number.isNaN(t.getTime())?"none":(t.setHours(0,0,0,0),t<e?"overdue":t.getTime()===e.getTime()?"due":"future")}function lh(r){if(!r)return!1;const e=new Date;e.setHours(0,0,0,0);const t=new Date(r);return Number.isNaN(t.getTime())?!1:(t.setHours(0,0,0,0),t<e)}function sv(r){return{total:r.length,active:r.filter(e=>{const t=String(EB(e)).toLowerCase();return t==="active"||t==="lookbook sent"||t.includes("active")}).length,pendingReturns:r.filter(e=>{const t=Na(e);return t.pending>0||t.missing>0}).length,missingProducts:r.filter(e=>Na(e).missing>0).length,pendingDeliverables:r.filter(e=>{const t=xf(e);return t.completed<t.total}).length,pendingSocial:r.filter(e=>wB(e)==="Pending").length,pendingPayments:r.filter(e=>yB(e)!=="Paid").length,revenueReceived:r.reduce((e,t)=>{var n;return e+Number(((n=t.payment)==null?void 0:n.amountReceived)||0)},0)}}function Lf(r){const e=te.searchCelebrity.trim().toLowerCase(),t=te.searchStylist.trim().toLowerCase(),n=te.searchBrand.trim().toLowerCase();return r.filter(s=>{const i=vs(s.celebrityId),a=Sn(s.stylistId),o=i?i.name:"",B=a?a.name:"",c=s.jewelleryBrand||"",h=EB(s),d=yB(s),p=(()=>{const m=Na(s);return m.missing>0?"Missing":m.pending>0?"Pending":m.returned>0?"Returned":"Completed"})(),C=wB(s);return!(e&&!o.toLowerCase().includes(e)||t&&!B.toLowerCase().includes(t)||n&&!c.toLowerCase().includes(n)||te.projectStatus&&h!==te.projectStatus||te.paymentStatus&&d!==te.paymentStatus||te.returnStatus&&p!==te.returnStatus||te.socialStatus&&C!==te.socialStatus)})}function iv(){clearTimeout(oh),oh=window.setTimeout(()=>{ft()},160)}let Bh=!1;function av(){Bh||(Bh=!0,document.addEventListener("click",r=>{}))}function ov(){ri.filtersOpen=!ri.filtersOpen,ft()}function lv(r){const e=Gt(),t=Lf(e),n=Math.ceil(t.length/jt.pageSize);r<1||n>0&&r>n||(jt.currentPage=r,ft())}function Bv({onProjectSwitch:r}){ir(),ft(),fv(),cv(),av(),hh(),window.openProjectDrawer=dv,window.closeProjectDrawer=Bo,window.openNewProjectDialog=uh,window.closeNewProjectDialog=kf,window.handleStylistSelectChange=uv,window.submitNewProjectDialog=e=>hv(e,r),window.handleCelebrityChange=pv,window.handleProjectChange=(e,t,n="browse")=>Ev(e,t||r,n),window.handleCreateCelebritySubmit=yv,window.handleCreateProjectSubmit=e=>wv(e,r),window.handleQuickNewProject=()=>uh(),window.showHomepageGateway=hh,window.unlockStudioWorkspace=lo,window.updateCurrentProjectStatus=Dv,window.renderHomepageProjectsGateway=()=>ft(),window.renderDashboard=fn,window.renderProjectDashboard=fn,window.toggleHomepageProjectFilters=ov,window.changeHomepageProjectPage=lv,window.quickFilterOverview=e=>{e==="active"?(te.projectStatus=te.projectStatus==="Active"?"":"Active",te.returnStatus="",te.paymentStatus=""):e==="pendingReturns"?(te.returnStatus=te.returnStatus==="Pending"?"":"Pending",te.projectStatus="",te.paymentStatus=""):e==="missing"?(te.returnStatus=te.returnStatus==="Missing"?"":"Missing",te.projectStatus="",te.paymentStatus=""):e==="revenue"?(te.paymentStatus=te.paymentStatus==="Paid"?"":"Paid",te.projectStatus="",te.returnStatus=""):(te.projectStatus="",te.returnStatus="",te.paymentStatus=""),jt.currentPage=1,ft()},window.handleHomepageProjectFilterChange=(e,t)=>{te[e]=t,jt.currentPage=1,["searchCelebrity","searchStylist","searchBrand"].includes(e)?iv():ft()},window.clearHomepageProjectFilters=()=>{Object.assign(te,{searchCelebrity:"",searchStylist:"",searchBrand:"",projectStatus:"",paymentStatus:"",returnStatus:"",socialStatus:""}),jt.currentPage=1,ft()}}function ir(){let r=document.getElementById("dreamsaiProjectBar");if(!r){const p=document.querySelector(".top-bar")||document.body.firstElementChild||document.body;r=document.createElement("div"),r.id="dreamsaiProjectBar",r.className="dreamsai-project-bar fashion-bar",p.prepend(r)}const{celebrity:e,project:t,stylist:n}=Cn(),s=e?e.name:"Unassigned",i=n?n.name:"Unassigned Stylist",a=t?t.title:"No Active Project",o=t?t.code:"N/A",B=t?t.status:"Curating",c=t&&t.selectedSerials?t.selectedSerials.length:0,h=t&&t.pdfRecords?t.pdfRecords.length:0;let d="badge-curating";B==="Lookbook Sent"&&(d="badge-sent"),B==="Celebrity Approved"&&(d="badge-approved"),B==="Sample Reserved"&&(d="badge-reserved"),B==="Order Placed"&&(d="badge-order"),r.innerHTML=`
    <div class="project-bar-container">
      <div class="project-bar-left">
        <button class="btn-switch-projects" onclick="showHomepageGateway()" title="Return to Projects Gateway">
          <i class="fa-solid fa-grid-2-plus"></i> <span>Gateway</span>
        </button>

        <div class="project-bar-divider"></div>

        <div class="project-meta-group">
          <span class="project-pill" onclick="openProjectDrawer()" title="Click to view project details">
            <i class="fa-solid fa-layer-group"></i>
            <span class="project-title-text">${se(a)}</span>
            <span class="project-code">${se(o)}</span>
          </span>
          <span class="status-badge ${d}">${se(B)}</span>
        </div>
      </div>

      <div class="project-bar-center">
        <div class="people-pills-group">
          <span class="meta-pill stylist-pill" title="Stylist">
            <i class="fa-solid fa-user-tie"></i>
            <span class="pill-label">Stylist:</span>
            <strong>${se(i)}</strong>
          </span>
          <span class="meta-pill celebrity-pill" title="Celebrity">
            <i class="fa-solid fa-star"></i>
            <span class="pill-label">Celebrity:</span>
            <strong>${se(s)}</strong>
          </span>
        </div>
      </div>

      <div class="project-bar-right">
        <div class="project-bar-stats">
          <span class="stat-tag" title="Selected pieces">
            <i class="fa-solid fa-gem"></i>
            <strong>${c}</strong> <span class="stat-lbl">Pieces</span>
          </span>
          <span class="stat-tag" title="Exported PDFs">
            <i class="fa-solid fa-file-pdf"></i>
            <strong>${h}</strong> <span class="stat-lbl">PDFs</span>
          </span>
        </div>

        <button class="btn-project-manage fashion-btn" onclick="openProjectDrawer()" title="Open Project Manager">
          <i class="fa-solid fa-sliders"></i>
          <span>Manager</span>
        </button>
      </div>
    </div>
  `}let ch=!1;function ft(r){let e=document.getElementById("homepageProjectsGatewayContainer");e||(e=document.createElement("div"),e.id="homepageProjectsGatewayContainer",e.className="homepage-gateway-overlay",(document.querySelector(".app-main")||document.body).prepend(e));const t=document.activeElement,n=t&&t.tagName==="INPUT"?t.getAttribute("placeholder"):"",s=t&&typeof t.selectionStart=="number"?t.selectionStart:null,i=t&&typeof t.selectionEnd=="number"?t.selectionEnd:null,a=Gt();ch||(ch=!0,a.forEach(x=>{if(x.finalTraySharedDate&&!x.followUpDate){const j=_l(x.finalTraySharedDate,15);j&&(x.followUpDate=j,sr(x.id,{followUpDate:j}))}}));const o=Lf(a),{project:B}=Cn(),c=sv(a),h=o.length,d=Math.ceil(h/jt.pageSize);jt.currentPage=Math.min(jt.currentPage,Math.max(d,1));const p=jt.currentPage,C=(p-1)*jt.pageSize,m=C+jt.pageSize,I=o.slice(C,m),S=h===0?0:C+1,F=Math.min(m,h);let L="";if(h>0){let x=[];if(d<=7)for(let _=1;_<=d;_++)x.push(_);else{x.push(1),p>3&&x.push("...");const _=Math.max(2,p-1),E=Math.min(d-1,p+1);for(let y=_;y<=E;y++)x.includes(y)||x.push(y);p<d-2&&x.push("..."),x.push(d)}const j=x.map(_=>_==="..."?'<span class="hp-pagination-ellipsis">...</span>':`<button class="hp-pagination-page ${_===p?"is-active":""}"
                      onclick="window.changeHomepageProjectPage(${_})"
                      aria-label="Page ${_}">
                ${_}
              </button>`).join(""),q=p<=1,W=p>=d;L=`
      <div class="hp-pagination-container">
        <div class="hp-pagination-info">
          Showing <strong>${S}–${F}</strong> of <strong>${h}</strong> projects
        </div>
        ${d>1?`
        <div class="hp-pagination-controls" role="navigation" aria-label="Projects Pagination">
          <button class="hp-pagination-btn"
                  onclick="window.changeHomepageProjectPage(${p-1})"
                  ${q?'disabled aria-disabled="true"':""}>
            <i class="fa-solid fa-arrow-left"></i> Previous
          </button>

          <div class="hp-pagination-pages">
            ${j}
          </div>

          <button class="hp-pagination-btn"
                  onclick="window.changeHomepageProjectPage(${p+1})"
                  ${W?'disabled aria-disabled="true"':""}>
            Next <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        `:""}
      </div>
    `}if(e.innerHTML=`
    <div class="hp-gateway-wrapper">
      <div class="hp-gateway-header">
        <div class="hp-gateway-title">
          <h2><i class="fa-solid fa-gem" style="color: #d4af37; margin-right: 8px;"></i> ASCEND Communications</h2>
          <p>PR Campaign Dashboard — monitor active pulls, pending returns, client deliverables, and launch new projects.</p>
        </div>
        <div class="hp-gateway-actions">
          <button class="btn-create-project-main" onclick="openNewProjectDialog()">
            <i class="fa-solid fa-plus"></i> New Project
          </button>
        </div>
      </div>

      <!-- Direct Homepage Overview Statistics with Visual Indicators -->
      <div class="hp-overview-section">
        <div class="hp-summary-cards-grid">
          <button class="hp-summary-card card-indicator-green ${te.projectStatus==="Active"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('active')"
                  title="Filter Active Projects">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-active"><i class="fa-solid fa-chart-line"></i></div>
              <span class="hp-status-pill pill-green"><span class="pulse-dot dot-green"></span> Active</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${c.active}</span>
              <span class="summary-lbl">Active Projects</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-amber ${te.returnStatus==="Pending"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('pendingReturns')"
                  title="Filter Pending Returns">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-pending-returns"><i class="fa-solid fa-rotate-left"></i></div>
              <span class="hp-status-pill pill-amber"><span class="pulse-dot dot-amber"></span> Pending</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${c.pendingReturns}</span>
              <span class="summary-lbl">Pending Returns</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-red ${te.returnStatus==="Missing"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('missing')"
                  title="Filter Missing Products">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-missing"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <span class="hp-status-pill pill-red"><span class="pulse-dot dot-red"></span> Missing</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${c.missingProducts}</span>
              <span class="summary-lbl">Missing Products</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-slate ${!te.projectStatus&&!te.returnStatus&&!te.paymentStatus?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('all')"
                  title="View All Projects">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-total"><i class="fa-solid fa-folder-open"></i></div>
              <span class="hp-status-pill pill-slate">Total</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${c.total}</span>
              <span class="summary-lbl">Total Projects</span>
            </div>
          </button>

          <button class="hp-summary-card card-indicator-emerald ${te.paymentStatus==="Paid"?"is-filter-active":""}"
                  onclick="window.quickFilterOverview('revenue')"
                  title="Filter Settled Revenue">
            <div class="summary-card-top-row">
              <div class="summary-icon icon-revenue"><i class="fa-solid fa-indian-rupee-sign"></i></div>
              <span class="hp-status-pill pill-emerald"><i class="fa-solid fa-check"></i> Settled</span>
            </div>
            <div class="summary-info">
              <span class="summary-val">${es(c.revenueReceived||c.totalValue)}</span>
              <span class="summary-lbl">Revenue Received</span>
            </div>
          </button>
        </div>
      </div>

      <div class="hp-toolbar-actions">
        <div class="hp-section-heading">
          <h3 class="hp-section-title">Projects Directory</h3>
          <span class="hp-project-count-badge">${o.length} ${o.length===1?"Project":"Projects"}</span>
        </div>

        <button class="hp-filter-toggle-btn ${ri.filtersOpen?"is-active":""}"
                onclick="event.stopPropagation(); window.toggleHomepageProjectFilters()"
                aria-expanded="${ri.filtersOpen}"
                aria-controls="homepageProjectFilterPanel"
                aria-label="Toggle Project Filters">
          <i class="fa-solid fa-sliders"></i> Filters
        </button>
      </div>

      <div id="homepageProjectFilterPanel" class="hp-filter-toolbar ${ri.filtersOpen?"is-open":"is-collapsed"}">
        <div class="filter-inputs-row">
          <div class="input-with-icon">
            <i class="fa-solid fa-user"></i>
            <input type="text" placeholder="Search by Celebrity" value="${se(te.searchCelebrity)}" oninput="window.handleHomepageProjectFilterChange('searchCelebrity', this.value)">
          </div>
          <div class="input-with-icon">
            <i class="fa-solid fa-user-tie"></i>
            <input type="text" placeholder="Search by Stylist" value="${se(te.searchStylist)}" oninput="window.handleHomepageProjectFilterChange('searchStylist', this.value)">
          </div>
          <div class="input-with-icon">
            <i class="fa-solid fa-gem"></i>
            <input type="text" placeholder="Search by Jewellery Brand" value="${se(te.searchBrand)}" oninput="window.handleHomepageProjectFilterChange('searchBrand', this.value)">
          </div>
        </div>
        <div class="filter-selects-row">
          <select value="${se(te.projectStatus)}" onchange="window.handleHomepageProjectFilterChange('projectStatus', this.value)">
            <option value="">Project Status</option>
            <option value="Upcoming" ${te.projectStatus==="Upcoming"?"selected":""}>Upcoming</option>
            <option value="Active" ${te.projectStatus==="Active"?"selected":""}>Active</option>
            <option value="Return pending" ${te.projectStatus==="Return pending"?"selected":""}>Return pending</option>
            <option value="Missing deliverables" ${te.projectStatus==="Missing deliverables"?"selected":""}>Missing deliverables</option>
            <option value="Social pending" ${te.projectStatus==="Social pending"?"selected":""}>Social pending</option>
            <option value="Completed" ${te.projectStatus==="Completed"?"selected":""}>Completed</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('paymentStatus', this.value)">
            <option value="">Payment Status</option>
            <option value="Paid" ${te.paymentStatus==="Paid"?"selected":""}>Paid</option>
            <option value="Partial" ${te.paymentStatus==="Partial"?"selected":""}>Partial</option>
            <option value="Pending" ${te.paymentStatus==="Pending"?"selected":""}>Pending</option>
            <option value="Overdue" ${te.paymentStatus==="Overdue"?"selected":""}>Overdue</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('returnStatus', this.value)">
            <option value="">Return Status</option>
            <option value="Returned" ${te.returnStatus==="Returned"?"selected":""}>Returned</option>
            <option value="Pending" ${te.returnStatus==="Pending"?"selected":""}>Pending</option>
            <option value="Missing" ${te.returnStatus==="Missing"?"selected":""}>Missing</option>
            <option value="Completed" ${te.returnStatus==="Completed"?"selected":""}>Completed</option>
          </select>
          <select onchange="window.handleHomepageProjectFilterChange('socialStatus', this.value)">
            <option value="">Social Posting</option>
            <option value="Pending" ${te.socialStatus==="Pending"?"selected":""}>Pending</option>
            <option value="Posted" ${te.socialStatus==="Posted"?"selected":""}>Posted</option>
            <option value="Verified" ${te.socialStatus==="Verified"?"selected":""}>Verified</option>
          </select>
          <button class="btn-clear-filters" onclick="window.clearHomepageProjectFilters()">Clear Filters</button>
        </div>
      </div>

      <div class="hp-projects-cards-grid">
        ${o.length===0?'<div class="hp-project-card"><strong>No projects match the selected filters.</strong></div>':I.map(x=>{const j=B&&x.id===B.id,q=vs(x.celebrityId),W=Sn(x.stylistId),_=q?q.name:x.celebrityName||"Celebrity",E=x.headStylist||(W?W.name:"Unassigned Stylist"),y=x.finalTraySharedDate||"",b=x.followUpDate||(y?_l(y,15):""),T=x.returnDueDate||"",R=!!(y||b||T);return`
            <div class="hp-project-card ${j?"active-project":""}" onclick="window.handleProjectChange('${x.id}', null, 'browse')" role="button" tabindex="0" aria-label="Open ${se(x.title)} inventory">
              <div class="hp-card-stylist-block">
                <span class="hp-meta-label">STYLIST</span>
                <span class="hp-stylist-val">${se(E)}</span>
              </div>

              <div class="hp-card-title-block">
                <h3 class="hp-project-title">${se(x.title)}</h3>
              </div>

              <div class="hp-card-celebrity-block">
                <span class="hp-meta-label">CELEBRITY</span>
                <span class="hp-celebrity-val">${se(_)}</span>
              </div>

              ${R?`
                <div class="hp-card-divider-clean"></div>
                <div class="hp-dates-vertical">
                  ${y?`
                    <div class="hp-date-line">
                      <span class="hp-date-type">Final List</span>
                      <span class="hp-date-val">${se(Ut(y))}</span>
                    </div>
                  `:""}
                  ${b?`
                    <div class="hp-date-line">
                      <span class="hp-date-type">Follow-up</span>
                      <span class="hp-date-val">${se(Ut(b))}</span>
                    </div>
                  `:""}
                  ${T?`
                    <div class="hp-date-line">
                      <span class="hp-date-type">Return Due</span>
                      <span class="hp-date-val">${se(Ut(T))}</span>
                    </div>
                  `:""}
                </div>
              `:""}

              <div class="hp-card-footer-actions">
                <button class="hp-card-btn-dashboard" onclick="event.stopPropagation(); window.handleProjectChange('${x.id}', null, 'dashboard')" title="Open Project Dashboard">
                  <i class="fa-solid fa-gauge-high"></i> Dashboard
                </button>
                <div class="hp-card-browse-link" onclick="event.stopPropagation(); window.handleProjectChange('${x.id}', null, 'browse')" title="Open Inventory">
                  <span class="hp-browse-lbl">Inventory</span>
                  <span class="hp-arrow-link"><i class="fa-solid fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          `}).join("")}
      </div>

      ${L}
    </div>
  `,vv(),n){const x=e.querySelector(`input[placeholder="${n}"]`);x&&window.requestAnimationFrame(()=>{if(x.focus(),s!==null&&i!==null){const j=Math.min(s,x.value.length),q=Math.min(i,x.value.length);x.setSelectionRange(j,q)}})}}function cv(r){if(document.getElementById("newProjectModalOverlay"))return;const e=kr(),t=e[0]?e[0].name:"Shreya",n=`
    <div id="newProjectModalOverlay" class="project-modal-overlay" style="display: none;">
      <div class="project-modal-card fashion-theme" style="max-width: 520px;">
        <div class="project-modal-header">
          <h3><i class="fa-solid fa-folder-plus"></i> New Project</h3>
          <button class="btn-close-modal" onclick="closeNewProjectDialog()">&times;</button>
        </div>
        <form onsubmit="submitNewProjectDialog(event)" style="padding: 24px;">
          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Celebrity Name:</label>
            <input type="text" id="dialogCelebrityName" value="${se(t)}" placeholder="e.g. Shreya" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Project Title:</label>
            <input type="text" id="dialogProjectTitle" placeholder="e.g. Monday Bridal Selection" required class="pm-select" style="margin-top: 6px; width: 100%;" />
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label style="font-weight: 700; color: #1c1917; font-size: 0.9rem;">Stylist:</label>
            <select id="dialogStylistSelect" class="pm-select" onchange="handleStylistSelectChange(this.value)" style="margin-top: 6px; width: 100%;">
              <!-- Dynamic populated -->
            </select>

            <div id="newStylistInputContainer" style="display: none; margin-top: 10px;">
              <input type="text" id="dialogNewStylistName" placeholder="Enter New Stylist Name (e.g. Natasha)" class="pm-select" style="width: 100%; border-color: #d4af37;" />
            </div>
          </div>

          <button type="submit" class="btn-proceed-large" style="margin-top: 0;">
            <i class="fa-solid fa-arrow-right"></i> Create Project
          </button>
        </form>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n)}function uh(){const r=document.getElementById("newProjectModalOverlay"),e=document.getElementById("dialogStylistSelect"),t=document.getElementById("newStylistInputContainer");if(e){const n=rr();e.innerHTML=`
      ${n.map(s=>`<option value="${s.id}">${se(s.name)} (${se(s.title)})</option>`).join("")}
      <option value="__NEW_STYLIST__">+ Add New Stylist...</option>
    `}t&&(t.style.display="none"),r&&(r.style.display="flex")}function kf(){const r=document.getElementById("newProjectModalOverlay");r&&(r.style.display="none")}function uv(r){const e=document.getElementById("newStylistInputContainer"),t=document.getElementById("dialogNewStylistName");r==="__NEW_STYLIST__"?(e&&(e.style.display="block"),t&&t.focus()):e&&(e.style.display="none")}function hv(r,e){r.preventDefault();const t=document.getElementById("dialogCelebrityName"),n=document.getElementById("dialogProjectTitle"),s=document.getElementById("dialogStylistSelect"),i=document.getElementById("dialogNewStylistName");if(!t||!t.value.trim()||!n||!n.value.trim())return;const a=t.value.trim(),o=n.value.trim();let B=s?s.value:null;if(B==="__NEW_STYLIST__"){if(!i||!i.value.trim()){alert("Please enter the name of the new Stylist.");return}B=Ff({name:i.value.trim(),title:"Stylist"}).id}let h=kr().find(p=>p.name.toLowerCase()===a.toLowerCase());h||(h=mB({name:a,category:"A-List Celebrity"}));const d=ao({celebrityId:h.id,stylistId:B,title:o});Vr(h.id,d.id),ir(),ft(),kf(),Bo(),lo(),typeof e=="function"&&e(d),typeof window.switchTab=="function"&&window.switchTab("browse")}function hh(){document.body.classList.add("gateway-active");const r=document.getElementById("homepageProjectsGatewayContainer");r&&(r.style.display="block"),document.querySelectorAll(".sidebar-nav-item, .bottom-nav-item").forEach(s=>s.classList.remove("active"));const t=document.getElementById("tabDashboardBtn");t&&t.classList.add("active");const n=document.getElementById("bottomNavHome");n&&n.classList.add("active")}function lo(){document.body.classList.remove("gateway-active");const r=document.getElementById("homepageProjectsGatewayContainer");r&&(r.style.display="none")}function dv(){const r=document.getElementById("projectDrawerModal");r&&(co(),r.style.display="flex")}function Bo(){const r=document.getElementById("projectDrawerModal");r&&(r.style.display="none")}function fv(){if(document.getElementById("projectDrawerModal"))return;document.body.insertAdjacentHTML("beforeend",`
    <div id="projectDrawerModal" class="project-modal-overlay" style="display: none;">
      <div class="project-modal-card fashion-theme">
        <div class="project-modal-header">
          <h3><i class="fa-solid fa-crown"></i> Stylists &amp; Celebrities Workspace Studio</h3>
          <button class="btn-close-modal" onclick="closeProjectDrawer()">&times;</button>
        </div>
        <div class="project-modal-body" id="projectModalBody">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `)}function co(){const r=document.getElementById("projectModalBody");if(!r)return;const e=kr();rr();const{celebrity:t,project:n}=Cn(),s=t?t.id:"",i=s?Gt(s):[];r.innerHTML=`
    <div class="project-manager-grid">
      <div class="pm-section pm-sidebar">
        <h4>1. Celebrity / Muse Directory</h4>
        <div class="form-group">
          <select id="pmCelebritySelect" class="pm-select" onchange="handleCelebrityChange(this.value)">
            ${e.map(a=>`<option value="${a.id}" ${a.id===s?"selected":""}>${se(a.name)} (${se(a.category||"Celebrity")})</option>`).join("")}
          </select>
        </div>

        <button class="btn-secondary-sm full-width" onclick="toggleNewCelebrityForm()">+ Add New Celebrity</button>

        <form id="newCelebrityForm" style="display: none;" onsubmit="handleCreateCelebritySubmit(event)" class="pm-inline-form">
          <input type="text" id="newCelebrityName" placeholder="Celebrity Name (e.g. Shreya)" required />
          <select id="newCelebrityCategory" class="pm-select-sm">
            <option value="A-List Actress & Icon">A-List Actress & Icon</option>
            <option value="Red Carpet Musician">Red Carpet Musician</option>
          </select>
          <button type="submit" class="btn-primary-sm">Save Celebrity</button>
        </form>

        <hr class="pm-divider" />

        <h4>2. Celebrity Projects / Lookbooks</h4>
        <div class="project-list-box">
          ${i.length===0?'<p class="pm-empty">No projects created yet for this celebrity.</p>':""}
          ${i.map(a=>{const o=n&&a.id===n.id,B=Sn(a.stylistId),c=B?B.name:"Unassigned";return`
              <div class="project-item-card ${o?"active":""}" onclick="handleProjectChange('${a.id}')">
                <div class="pic-header">
                  <strong>${se(a.title)}</strong>
                  <span class="pic-badge">${se(a.status)}</span>
                </div>
                <div class="pic-meta">
                  <span>Stylist: ${se(c)}</span> • <span>${se(a.code)}</span>
                </div>
              </div>
            `}).join("")}
        </div>

        <button class="btn-primary-sm full-width" onclick="openNewProjectDialog()">+ New Project</button>
      </div>

      <div class="pm-section pm-details">
        ${n?Cv(n):'<p class="pm-empty">Select or create a project to proceed.</p>'}
      </div>
    </div>
  `}function Cv(r){const e=Sn(r.stylistId),t=e?e.name:"Unassigned";return`
    <div class="pd-header">
      <div>
        <h3>${se(r.title)} <small>(${se(r.code)})</small></h3>
        <p class="pd-subtitle">
          <span><i class="fa-solid fa-user-tie"></i> Stylist: <strong>${se(t)}</strong></span>
        </p>
      </div>
      <div class="pd-status-control">
        <label>Stage:</label>
        <select onchange="updateCurrentProjectStatus('${r.id}', this.value)" class="pm-select-sm fashion-status-select">
          <option value="Curating" ${r.status==="Curating"?"selected":""}>1. Curating (In)</option>
          <option value="Lookbook Sent" ${r.status==="Lookbook Sent"?"selected":""}>2. Lookbook Sent to Celebrity</option>
          <option value="Celebrity Approved" ${r.status==="Celebrity Approved"?"selected":""}>3. Celebrity Approved Pieces</option>
          <option value="Sample Reserved" ${r.status==="Sample Reserved"?"selected":""}>4. Sample Reserved / Pull</option>
          <option value="Order Placed" ${r.status==="Order Placed"?"selected":""}>5. Production / Order Placed</option>
        </select>
      </div>
    </div>

    ${r.notes?`<div class="pd-notes-box"><i class="fa-solid fa-pen-nib"></i> <strong>Notes:</strong> ${se(r.notes)}</div>`:""}

    <button class="btn-proceed-large" onclick="handleProjectChange('${r.id}')">
      <i class="fa-solid fa-circle-check"></i> Proceed with this Project
    </button>
  `}function pv(r){const e=Gt(r),t=e.length>0?e[0].id:null;Vr(r,t),co()}let ua=!1;function gv(){let r=document.getElementById("projectSwitchLoader");r||(r=document.createElement("div"),r.id="projectSwitchLoader",r.style.cssText="position: fixed; inset: 0; background: rgba(15, 17, 23, 0.4); backdrop-filter: blur(4px); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; gap: 12px; font-family: var(--font-sans);",r.innerHTML=`
      <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2.5rem; color: #c5a059;"></i>
      <span style="font-weight: 600; font-size: 0.95rem; letter-spacing: 0.05em;">Switching Project...</span>
    `,document.body.appendChild(r)),r.style.display="flex"}function Mf(){const r=document.getElementById("projectSwitchLoader");r&&(r.style.display="none")}function mv(r,e,t){Mf(),ua=!1;let n=document.getElementById("projectSwitchErrorModal");n||(n=document.createElement("div"),n.id="projectSwitchErrorModal",n.className="project-modal-overlay",document.body.appendChild(n)),n.innerHTML=`
    <div class="project-modal-card" style="max-width: 440px; padding: 24px; text-align: center;">
      <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.8rem; color: #ef4444; margin-bottom: 12px;"></i>
      <h3 style="margin: 0 0 8px; font-family: var(--font-serif); font-size: 1.3rem;">Unable to Switch Project</h3>
      <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 20px;">We encountered an issue loading project ID: <strong>${se(r||"Unknown")}</strong>.</p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button class="btn-dash-action" onclick="document.getElementById('projectSwitchErrorModal').style.display='none'">Dismiss</button>
        <button class="btn-dash-action btn-dash-primary" onclick="document.getElementById('projectSwitchErrorModal').style.display='none'; handleProjectChange('${r}', null, '${t}')">
          <i class="fa-solid fa-rotate-right"></i> Retry
        </button>
      </div>
    </div>
  `,n.style.display="flex"}function Ev(r,e,t="browse"){ua||(ua=!0,gv(),setTimeout(()=>{try{const n=Mr(r);if(!n)throw new Error(`Project ${r} not found in store.`);Vr(n.celebrityId,n.id),ir(),Bo(),lo(),typeof e=="function"&&e(n),typeof window.switchTab=="function"&&window.switchTab(t),t==="dashboard"&&fn(),Mf(),ua=!1}catch(n){console.error("Project Switch Failed:",n),mv(r,e,t)}},180))}function yv(r){r.preventDefault();const e=document.getElementById("newCelebrityName"),t=document.getElementById("newCelebrityCategory"),n=document.getElementById("newCelebrityPhone");if(!e||!e.value.trim())return;const s=mB({name:e.value,category:t?t.value:"A-List Actress & Icon",phone:n?n.value:""}),i=rr(),a=ao({celebrityId:s.id,stylistId:i[0]?i[0].id:null,title:`${s.name} Requirement`});Vr(s.id,a.id),ir(),co(),fn()}function wv(r,e){r.preventDefault();const t=document.getElementById("newProjectTitle"),n=document.getElementById("newProjectStylist"),s=document.getElementById("newProjectNotes");if(!t||!t.value.trim())return;const{celebrityId:i}=Cn();if(!i)return;const a=ao({celebrityId:i,stylistId:n?n.value:null,title:t.value,notes:s?s.value:""});Vr(i,a.id),ir(),ft(),Bo(),lo(),typeof e=="function"&&e(a),typeof window.switchTab=="function"&&window.switchTab("dashboard"),fn()}function Dv(r,e){sr(r,{status:e,projectStatus:e}),oo(r,"Stage Updated",`Curation stage updated to "${e}".`),ir(),co(),ft(),fn()}window.openQuickEditProjectModal=function(r){const e=Mr(r);if(!e)return;let t=document.getElementById("quickEditProjectModal");t||(document.body.insertAdjacentHTML("beforeend",`
      <div id="quickEditProjectModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 560px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-pen-to-square"></i> Edit Project Details</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickEditProjectModal').style.display='none'">&times;</button>
          </div>
          <form id="quickEditProjectForm" onsubmit="handleQuickEditProjectSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qeProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Project Title:</label>
              <input type="text" id="qeTitle" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Head Stylist:</label>
                <input type="text" id="qeHeadStylist" class="pm-select" required />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Jewellery Brand:</label>
                <input type="text" id="qeBrand" class="pm-select" required />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Shared Date:</label>
                <input type="date" id="qeSharedDate" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Follow-up Date:</label>
                <input type="date" id="qeFollowUpDate" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.82rem;">Return Due Date:</label>
                <input type="date" id="qeReturnDueDate" class="pm-select" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Project Status:</label>
                <select id="qeProjectStatus" class="pm-select">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Active">Active</option>
                  <option value="Return pending">Return pending</option>
                  <option value="Missing deliverables">Missing deliverables</option>
                  <option value="Social pending">Social pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Payment Status:</label>
                <select id="qePaymentStatus" class="pm-select">
                  <option value="Pending">🔴 Pending</option>
                  <option value="Partial">🟡 Partial</option>
                  <option value="Paid">🟢 Paid</option>
                  <option value="Overdue">🔴 Overdue</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Invoice Amount (₹):</label>
                <input type="number" id="qeInvoiceAmt" class="pm-select" />
              </div>
              <div>
                <label style="font-weight:700; font-size:0.85rem;">Amount Received (₹):</label>
                <input type="number" id="qeAmtReceived" class="pm-select" />
              </div>
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Project Details</button>
          </form>
        </div>
      </div>
    `),t=document.getElementById("quickEditProjectModal")),document.getElementById("qeProjectId").value=e.id,document.getElementById("qeTitle").value=e.title,document.getElementById("qeHeadStylist").value=e.headStylist||"Natasha K",document.getElementById("qeBrand").value=e.jewelleryBrand||"Ascend Fine Jewellery",document.getElementById("qeSharedDate").value=e.finalTraySharedDate||"",document.getElementById("qeFollowUpDate").value=e.followUpDate||"",document.getElementById("qeReturnDueDate").value=e.returnDueDate||"",document.getElementById("qeProjectStatus").value=e.projectStatus||e.status||"Active";const n=e.payment||{invoiceAmount:15e4,amountReceived:1e5,status:"Partial"};document.getElementById("qePaymentStatus").value=n.status||"Pending",document.getElementById("qeInvoiceAmt").value=n.invoiceAmount||0,document.getElementById("qeAmtReceived").value=n.amountReceived||0,t.style.display="flex"};window.handleQuickEditProjectSubmit=function(r){r.preventDefault();const e=document.getElementById("qeProjectId").value;if(!e)return;const t={title:document.getElementById("qeTitle").value.trim(),headStylist:document.getElementById("qeHeadStylist").value.trim(),jewelleryBrand:document.getElementById("qeBrand").value.trim(),finalTraySharedDate:document.getElementById("qeSharedDate").value,followUpDate:document.getElementById("qeFollowUpDate").value,returnDueDate:document.getElementById("qeReturnDueDate").value,projectStatus:document.getElementById("qeProjectStatus").value,status:document.getElementById("qeProjectStatus").value,payment:{invoiceAmount:parseFloat(document.getElementById("qeInvoiceAmt").value)||0,amountReceived:parseFloat(document.getElementById("qeAmtReceived").value)||0,status:document.getElementById("qePaymentStatus").value}};sr(e,t),document.getElementById("quickEditProjectModal").style.display="none",ft(),ir(),fn()};window.openQuickUpdateReturnModal=function(r){const e=Mr(r);if(!e)return;const t=e.productStats||{sent:18,returned:14,pending:3,missing:1};let n=document.getElementById("quickReturnModal");n||(document.body.insertAdjacentHTML("beforeend",`
      <div id="quickReturnModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 440px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-rotate-left"></i> Update Product Return Status</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickReturnModal').style.display='none'">&times;</button>
          </div>
          <form onsubmit="handleQuickReturnSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qrProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Total Products Sent:</label>
              <input type="number" id="qrSent" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">🟢 Products Returned:</label>
              <input type="number" id="qrReturned" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">🟡 Pending Returns:</label>
              <input type="number" id="qrPending" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="font-weight:700; font-size:0.85rem;">🔴 Missing Products:</label>
              <input type="number" id="qrMissing" class="pm-select" required />
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Product Status</button>
          </form>
        </div>
      </div>
    `),n=document.getElementById("quickReturnModal")),document.getElementById("qrProjectId").value=e.id,document.getElementById("qrSent").value=t.sent||0,document.getElementById("qrReturned").value=t.returned||0,document.getElementById("qrPending").value=t.pending||0,document.getElementById("qrMissing").value=t.missing||0,n.style.display="flex"};window.handleQuickReturnSubmit=function(r){r.preventDefault();const e=document.getElementById("qrProjectId").value;if(!e)return;const t={sent:parseInt(document.getElementById("qrSent").value)||0,returned:parseInt(document.getElementById("qrReturned").value)||0,pending:parseInt(document.getElementById("qrPending").value)||0,missing:parseInt(document.getElementById("qrMissing").value)||0};sr(e,{productStats:t}),document.getElementById("quickReturnModal").style.display="none",ft(),fn()};window.openQuickUpdateDeliverablesModal=function(r){const e=Mr(r);if(!e)return;const t=e.deliverables||{completed:3,total:5};let n=document.getElementById("quickDeliverablesModal");n||(document.body.insertAdjacentHTML("beforeend",`
      <div id="quickDeliverablesModal" class="project-modal-overlay" style="display: none;">
        <div class="project-modal-card fashion-theme" style="max-width: 440px;">
          <div class="project-modal-header">
            <h3><i class="fa-solid fa-list-check"></i> Update Deliverables</h3>
            <button class="btn-close-modal" onclick="document.getElementById('quickDeliverablesModal').style.display='none'">&times;</button>
          </div>
          <form onsubmit="handleQuickDeliverablesSubmit(event)" style="padding: 24px;">
            <input type="hidden" id="qdProjectId" />
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-weight:700; font-size:0.85rem;">Completed Deliverables:</label>
              <input type="number" id="qdCompleted" class="pm-select" required />
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="font-weight:700; font-size:0.85rem;">Total Deliverables Agreed:</label>
              <input type="number" id="qdTotal" class="pm-select" required />
            </div>
            <button type="submit" class="btn-proceed-large" style="margin-top:0;">Save Deliverables Progress</button>
          </form>
        </div>
      </div>
    `),n=document.getElementById("quickDeliverablesModal")),document.getElementById("qdProjectId").value=e.id,document.getElementById("qdCompleted").value=t.completed||0,document.getElementById("qdTotal").value=t.total||0,n.style.display="flex"};window.handleQuickDeliverablesSubmit=function(r){r.preventDefault();const e=document.getElementById("qdProjectId").value;if(!e)return;const t={completed:parseInt(document.getElementById("qdCompleted").value)||0,total:parseInt(document.getElementById("qdTotal").value)||0};sr(e,{deliverables:t}),document.getElementById("quickDeliverablesModal").style.display="none",ft(),fn()};window.quickToggleSocialPosted=function(r){const e=Mr(r);if(!e)return;const t=e.socialPosting||{status:"Pending"};let n="Posted",s=new Date().toISOString().split("T")[0];t.status==="Pending"?n="Posted":t.status==="Posted"?n="Verified":(n="Pending",s=""),sr(r,{socialPosting:{status:n,postingDate:s}}),ft(),fn()};window.toggleNewCelebrityForm=function(){const r=document.getElementById("newCelebrityForm");r&&(r.style.display=r.style.display==="none"?"flex":"none")};function vv(){if(sessionStorage.getItem("hp_followup_reminder_shown")==="true")return;const r=Gt(),e=new Date;e.setHours(0,0,0,0);const t=r.filter(n=>{if(!n.followUpDate)return!1;const s=new Date(n.followUpDate);return isNaN(s.getTime())?!1:(s.setHours(0,0,0,0),e>=s)});t.length!==0&&(sessionStorage.setItem("hp_followup_reminder_shown","true"),_v(t))}function _v(r){let e=document.getElementById("followUpReminderModalOverlay");e||(e=document.createElement("div"),e.id="followUpReminderModalOverlay",e.className="project-modal-overlay",document.body.appendChild(e));const t=r.map(n=>{const s=vs(n.celebrityId),i=Sn(n.stylistId),a=s?s.name:"Celebrity",o=i?i.name:"Stylist",B=Of(n.followUpDate),c=B==="overdue"?"Overdue":"Due Today",h=B==="overdue"?"badge-missing":"badge-pending";return`
      <div style="padding: 12px; border: 1px solid #e7e5e4; border-radius: 8px; margin-bottom: 10px; background: #fafaf9; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
        <div>
          <div style="font-weight: 700; font-size: 0.92rem; color: #1c1917;">${se(n.title)}</div>
          <div style="font-size: 0.82rem; color: #78716c; margin-top: 2px;">
            <i class="fa-solid fa-star"></i> ${se(a)} &nbsp;|&nbsp; <i class="fa-solid fa-user-tie"></i> ${se(o)}
          </div>
          <div style="font-size: 0.8rem; color: #a8a29e; margin-top: 2px;">
            Follow-up date: <strong>${Ut(n.followUpDate)}</strong>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <span class="prod-badge ${h}" style="margin:0;">${c}</span>
          <button class="btn-qa btn-qa-primary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="window.closeFollowUpReminderModal(); window.handleProjectChange('${n.id}');">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project
          </button>
        </div>
      </div>
    `}).join("");e.innerHTML=`
    <div class="project-modal-card fashion-theme" style="max-width: 540px; box-sizing: border-box;">
      <div class="project-modal-header">
        <h3><i class="fa-solid fa-bell" style="color: #fb923c;"></i> Follow-up Reminders (${r.length})</h3>
        <button class="btn-close-modal" onclick="window.closeFollowUpReminderModal()">&times;</button>
      </div>
      <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
        <p style="margin: 0 0 14px 0; font-size: 0.88rem; color: #78716c;">
          The following campaign project(s) have reached or passed their 15-day follow-up date:
        </p>
        ${t}
      </div>
      <div class="project-modal-footer" style="padding: 12px 20px; display: flex; justify-content: flex-end; background: #fafaf9; border-top: 1px solid #e7e5e4;">
        <button class="btn-qa btn-qa-secondary" onclick="window.closeFollowUpReminderModal()">Dismiss</button>
      </div>
    </div>
  `,e.style.display="flex"}window.closeFollowUpReminderModal=function(){const r=document.getElementById("followUpReminderModalOverlay");r&&(r.style.display="none")};function fn(){var en;const r=document.getElementById("projectDashboardContent")||document.getElementById("dashboardTab");if(!r)return;const{celebrity:e,project:t,stylist:n}=Cn(),s=Gt(),i=t||(s.length>0?s[0]:null);if(!i){r.innerHTML=`
      <div class="dash-empty-state">
        <i class="fa-solid fa-folder-open"></i>
        <h3>No Project Selected</h3>
        <p>Choose an existing project from the Home catalog or create a new campaign.</p>
        <button class="btn-dash-action btn-dash-primary" onclick="showHomepageGateway()">
          <i class="fa-solid fa-house"></i> Go to All Projects
        </button>
      </div>
    `;return}const a=e||vs(i.celebrityId),o=n||Sn(i.stylistId),B=a?a.name:i.celebrityName||"Celebrity",c=i.headStylist||(o?o.name:"Unassigned Stylist"),h=i.code||i.id||"N/A",d=i.jewelleryBrand||"Ascend Fine Jewellery",p=i.season||"Fall / Winter 2026",C=i.purpose||"Client Styling & PR Pull",m=EB(i),I=yB(i),S=wB(i),F=Na(i),L=xf(i),x=i.finalTraySharedDate||"",j=i.followUpDate||(x?_l(x,15):""),q=i.returnDueDate||"",W=((en=i.socialPosting)==null?void 0:en.postingDate)||"",_=Of(j),E=lh(q),y=F.sent||F.returned+F.pending+F.missing||0,b=y>0?Math.round(F.returned/y*100):F.returned>0?100:0,T=i.payment||{invoiceAmount:0,amountReceived:0},R=Number(T.invoiceAmount||0),v=Number(T.amountReceived||0),ae=Math.max(0,R-v),Ee=L.completed||0,Le=L.total||0,Ze=Le>0?Math.round(Ee/Le*100):0,gt=Array.isArray(i.selectedSerials)?i.selectedSerials.length:Array.isArray(window.selected)?window.selected.length:0,Bt=Array.isArray(i.activityLog)?i.activityLog:[];r.innerHTML=`
    <div class="dash-workspace-wrapper">
      <!-- TOP NAVIGATION & ACTION BAR -->
      <div class="dash-nav-header">
        <button class="btn-dash-back" onclick="showHomepageGateway()" title="Return to Home Gateway">
          <i class="fa-solid fa-arrow-left"></i> All Projects
        </button>

        <div class="dash-quick-actions">
          <button class="btn-dash-action" onclick="window.openQuickEditProjectModal('${i.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit Project
          </button>
          <button class="btn-dash-action" onclick="window.openQuickUpdateReturnModal('${i.id}')">
            <i class="fa-solid fa-rotate-left"></i> Manage Returns
          </button>
          <button class="btn-dash-action" onclick="window.openQuickUpdateDeliverablesModal('${i.id}')">
            <i class="fa-solid fa-list-check"></i> Update Deliverables
          </button>
          <button class="btn-dash-action" onclick="window.quickToggleSocialPosted('${i.id}')">
            <i class="fa-solid fa-share-nodes"></i> Toggle Social
          </button>
          <button class="btn-dash-action btn-dash-primary" onclick="switchTab('browse')">
            <i class="fa-solid fa-gem"></i> Browse Catalog
          </button>
        </div>
      </div>

      <!-- PROJECT HERO BANNER -->
      <div class="dash-hero-banner">
        <div class="dash-hero-meta">
          <div class="dash-eyebrow-row">
            <span class="dash-tag-stylist"><i class="fa-solid fa-user-tie"></i> Stylist: <strong>${se(c)}</strong></span>
            <span class="dash-divider">•</span>
            <span class="dash-tag-celeb"><i class="fa-solid fa-star"></i> Celebrity: <strong>${se(B)}</strong></span>
            <span class="dash-divider">•</span>
            <span class="dash-tag-code">ID: <strong>${se(h)}</strong></span>
          </div>
          <h1 class="dash-project-title">${se(i.title)}</h1>
          <p class="dash-project-subtitle">${se(d)} &nbsp;|&nbsp; ${se(p)} &nbsp;|&nbsp; ${se(C)}</p>
        </div>

        <div class="dash-hero-status-box">
          <div class="dash-status-label">Project Status</div>
          <div class="dash-status-pill-wrap">
            <span class="proj-status-badge ${tv(m)}">${se(m)}</span>
          </div>
          <div class="dash-stage-select-wrap">
            <label for="dashStageSelect">Stage:</label>
            <select id="dashStageSelect" onchange="window.updateCurrentProjectStatus('${i.id}', this.value)" class="dash-stage-select">
              <option value="Curating" ${i.status==="Curating"?"selected":""}>1. Curating</option>
              <option value="Lookbook Sent" ${i.status==="Lookbook Sent"?"selected":""}>2. Lookbook Sent</option>
              <option value="Celebrity Approved" ${i.status==="Celebrity Approved"?"selected":""}>3. Celebrity Approved</option>
              <option value="Sample Reserved" ${i.status==="Sample Reserved"?"selected":""}>4. Sample Reserved</option>
              <option value="Order Placed" ${i.status==="Order Placed"?"selected":""}>5. Order Placed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- KEY METRICS ROW -->
      <div class="dash-metrics-grid">
        <div class="dash-metric-card" onclick="switchTab('selected')" style="cursor: pointer;" title="View Pieces in Pull">
          <div class="dash-metric-icon icon-curated"><i class="fa-solid fa-gem"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${gt}</span>
            <span class="dash-metric-lbl">Curated Pieces in Pull</span>
          </div>
        </div>

        <div class="dash-metric-card" onclick="window.openQuickUpdateReturnModal('${i.id}')" style="cursor: pointer;" title="Update Return Progress">
          <div class="dash-metric-icon icon-returns"><i class="fa-solid fa-rotate-left"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${F.returned} / ${y}</span>
            <span class="dash-metric-lbl">Products Returned (${b}%)</span>
          </div>
        </div>

        <div class="dash-metric-card" onclick="window.openQuickEditProjectModal('${i.id}')" style="cursor: pointer;" title="Update Financials">
          <div class="dash-metric-icon icon-payment"><i class="fa-solid fa-indian-rupee-sign"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${es(v)}</span>
            <span class="dash-metric-lbl">Received of ${es(R)}</span>
          </div>
        </div>

        <div class="dash-metric-card" onclick="window.quickToggleSocialPosted('${i.id}')" style="cursor: pointer;" title="Toggle Social Post State">
          <div class="dash-metric-icon icon-social"><i class="fa-solid fa-share-nodes"></i></div>
          <div class="dash-metric-data">
            <span class="dash-metric-val">${se(S)}</span>
            <span class="dash-metric-lbl">Social Media Status</span>
          </div>
        </div>
      </div>

      <!-- MAIN OPERATIONAL SECTIONS GRID -->
      <div class="dash-sections-grid">
        <!-- 1. IMPORTANT DATES -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-regular fa-calendar-days"></i> Important Dates</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickEditProjectModal('${i.id}')">Edit Dates</button>
          </div>
          <div class="dash-dates-list">
            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">Final List (Shared)</span>
                <span class="dash-date-desc">Curated selection sent to stylist</span>
              </div>
              <div class="dash-date-value ${lh(x)?"text-overdue":""}">
                ${se(Ut(x))}
              </div>
            </div>

            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">15-Day Follow-up</span>
                <span class="dash-date-desc">Check-in with stylist & muse</span>
              </div>
              <div class="dash-date-value-wrap">
                <span class="dash-date-value ${_==="overdue"?"text-overdue":""}">${se(Ut(j))}</span>
                ${_==="overdue"?'<span class="dash-badge-danger">Overdue</span>':_==="due"?'<span class="dash-badge-warning">Due Today</span>':'<span class="dash-badge-neutral">Upcoming</span>'}
              </div>
            </div>

            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">Return Due Date</span>
                <span class="dash-date-desc">Expected return to inventory</span>
              </div>
              <div class="dash-date-value-wrap">
                <span class="dash-date-value ${E?"text-overdue":""}">${se(Ut(q))}</span>
                ${E?'<span class="dash-badge-danger">Past Due</span>':""}
              </div>
            </div>

            <div class="dash-date-row">
              <div class="dash-date-label-wrap">
                <span class="dash-date-name">Social Posting Date</span>
                <span class="dash-date-desc">Scheduled publication</span>
              </div>
              <div class="dash-date-value">
                ${se(W?Ut(W):"Not scheduled")}
              </div>
            </div>
          </div>
        </div>

        <!-- 2. PRODUCT STATUS & RETURNS -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-rotate-left"></i> Product Status & Returns</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickUpdateReturnModal('${i.id}')">Update Counts</button>
          </div>
          
          <div class="dash-progress-wrap">
            <div class="dash-progress-labels">
              <span>Return Completion Rate</span>
              <strong>${b}% (${F.returned}/${y})</strong>
            </div>
            <div class="dash-progress-track">
              <div class="dash-progress-fill" style="width: ${Math.min(100,Math.max(0,b))}%;"></div>
            </div>
          </div>

          <div class="dash-product-stats-grid">
            <div class="dash-pstat-box">
              <span class="dash-pstat-lbl">Sent</span>
              <span class="dash-pstat-val">${y}</span>
            </div>
            <div class="dash-pstat-box box-returned">
              <span class="dash-pstat-lbl">Returned</span>
              <span class="dash-pstat-val">${F.returned}</span>
            </div>
            <div class="dash-pstat-box box-pending">
              <span class="dash-pstat-lbl">Pending</span>
              <span class="dash-pstat-val">${F.pending}</span>
            </div>
            <div class="dash-pstat-box box-missing">
              <span class="dash-pstat-lbl">Missing</span>
              <span class="dash-pstat-val">${F.missing}</span>
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.openQuickUpdateReturnModal('${i.id}')">
              <i class="fa-solid fa-pen"></i> Quick Return Update
            </button>
            <button class="btn-dash-action" onclick="switchTab('returnProducts')">
              <i class="fa-solid fa-boxes-stacked"></i> Full Returns Workspace
            </button>
          </div>
        </div>

        <!-- 3. SOCIAL MEDIA & PR -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-share-nodes"></i> Social & PR Coverage</h3>
            <button class="dash-card-header-btn" onclick="window.quickToggleSocialPosted('${i.id}')">Toggle Status</button>
          </div>

          <div class="dash-social-details">
            <div class="dash-detail-row">
              <span class="dash-detail-lbl">Posting Status</span>
              <span class="soc-badge ${rv(S)}">${se(S)}</span>
            </div>
            <div class="dash-detail-row">
              <span class="dash-detail-lbl">Scheduled / Published Date</span>
              <span class="dash-detail-val">${se(W?Ut(W):"Pending Confirmation")}</span>
            </div>
            <div class="dash-detail-row">
              <span class="dash-detail-lbl">Celebrity Tags</span>
              <span class="dash-detail-val">@${se(B.toLowerCase().replace(/\\s+/g,""))} · @ascendjewels</span>
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.quickToggleSocialPosted('${i.id}')">
              <i class="fa-solid fa-circle-check"></i> Advance Social Stage (${S})
            </button>
          </div>
        </div>

        <!-- 4. PAYMENT & INVOICING -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-wallet"></i> Payment & Invoicing</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickEditProjectModal('${i.id}')">Edit Payment</button>
          </div>

          <div class="dash-payment-breakdown">
            <div class="dash-pay-main-row">
              <div>
                <span class="dash-pay-status-lbl">Payment Status</span>
                <div style="margin-top: 4px;">
                  <span class="soc-badge ${nv(I)}">${se(I)}</span>
                </div>
              </div>
              <div style="text-align: right;">
                <span class="dash-pay-status-lbl">Invoice Total</span>
                <div class="dash-pay-total-val">${es(R)}</div>
              </div>
            </div>

            <div class="dash-pay-sub-grid">
              <div class="dash-pay-box">
                <span class="dash-pay-box-lbl">Amount Received</span>
                <span class="dash-pay-box-val text-success">${es(v)}</span>
              </div>
              <div class="dash-pay-box">
                <span class="dash-pay-box-lbl">Outstanding Balance</span>
                <span class="dash-pay-box-val ${ae>0?"text-danger":"text-muted"}">${es(ae)}</span>
              </div>
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.openQuickEditProjectModal('${i.id}')">
              <i class="fa-solid fa-receipt"></i> Update Invoice / Payment
            </button>
          </div>
        </div>

        <!-- 5. DELIVERABLES -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-list-check"></i> Deliverables</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickUpdateDeliverablesModal('${i.id}')">Update</button>
          </div>

          <div class="dash-progress-wrap">
            <div class="dash-progress-labels">
              <span>Agreed Assets</span>
              <strong>${Ee} / ${Le} Completed (${Ze}%)</strong>
            </div>
            <div class="dash-progress-track">
              <div class="dash-progress-fill" style="width: ${Math.min(100,Math.max(0,Ze))}%;"></div>
            </div>
          </div>

          <div class="dash-deliverable-items">
            <div class="dash-deliv-item ${Ee>=1?"is-done":""}">
              <i class="fa-solid ${Ee>=1?"fa-circle-check":"fa-circle"}"></i> Lookbook Selection PDF
            </div>
            <div class="dash-deliv-item ${Ee>=2?"is-done":""}">
              <i class="fa-solid ${Ee>=2?"fa-circle-check":"fa-circle"}"></i> Celebrity Pull Dispatch
            </div>
            <div class="dash-deliv-item ${Ee>=3?"is-done":""}">
              <i class="fa-solid ${Ee>=3?"fa-circle-check":"fa-circle"}"></i> Red Carpet / Event Feature
            </div>
            <div class="dash-deliv-item ${Ee>=4?"is-done":""}">
              <i class="fa-solid ${Ee>=4?"fa-circle-check":"fa-circle"}"></i> High-Res Editorial Photography
            </div>
          </div>

          <div class="dash-card-actions-footer">
            <button class="btn-dash-action" onclick="window.openQuickUpdateDeliverablesModal('${i.id}')">
              <i class="fa-solid fa-pen-to-square"></i> Edit Deliverables
            </button>
          </div>
        </div>

        <!-- 6. PROJECT NOTES & ACTIVITY -->
        <div class="dash-section-card">
          <div class="dash-card-header">
            <h3><i class="fa-solid fa-clock-rotate-left"></i> Notes & Activity</h3>
            <button class="dash-card-header-btn" onclick="window.openQuickEditProjectModal('${i.id}')">Edit Notes</button>
          </div>

          ${i.notes?`
            <div class="dash-notes-callout">
              <i class="fa-solid fa-pen-nib"></i>
              <div>
                <strong>Curator Notes:</strong>
                <p>${se(i.notes)}</p>
              </div>
            </div>
          `:'<p class="text-muted" style="font-size:0.88rem; margin-bottom:12px;">No special notes added for this project yet.</p>'}

          <div class="dash-activity-timeline">
            ${Bt.length>0?Bt.map(Ht=>`
              <div class="dash-timeline-item">
                <div class="dash-timeline-dot"></div>
                <div class="dash-timeline-content">
                  <div class="dash-timeline-header">
                    <strong>${se(Ht.action||"Activity")}</strong>
                    <span class="dash-timeline-time">${se(Ut(Ht.timestamp))}</span>
                  </div>
                  <p class="dash-timeline-desc">${se(Ht.details||"")}</p>
                </div>
              </div>
            `).join(""):`
              <div class="dash-timeline-item">
                <div class="dash-timeline-dot"></div>
                <div class="dash-timeline-content">
                  <div class="dash-timeline-header">
                    <strong>Project Initiated</strong>
                    <span class="dash-timeline-time">${se(Ut(i.createdAt))}</span>
                  </div>
                  <p class="dash-timeline-desc">Project created for ${se(B)} by ${se(c)}.</p>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `}function se(r){return r?String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}(function(){let r=0;function e(C,m){r+=1;const I=String(r).padStart(3,"0");if(m===void 0){console.log(`[PDF TRACE ${I}] ${C}`);return}console.log(`[PDF TRACE ${I}] ${C}`,m)}function t(C,m=0){if(C==null)return C;if(m>2)return"[max-depth]";if(C instanceof Blob)return{__type:"Blob",size:C.size,type:C.type};if(Array.isArray(C)){const S=C.slice(0,8).map(F=>t(F,m+1));return C.length>8&&S.push(`...(+${C.length-8} more)`),S}if(typeof C=="function")return`[Function ${C.name||"anonymous"}]`;if(typeof C!="object")return C;const I={};return Object.keys(C).slice(0,20).forEach(S=>{I[S]=t(C[S],m+1)}),I}function n(C,m){return function(...S){e(`FN ${C}:input`,t(S));try{const F=m.apply(this,S);return F&&typeof F.then=="function"?F.then(L=>(e(`FN ${C}:output`,t(L)),L)).catch(L=>{throw e(`FN ${C}:error`,{message:(L==null?void 0:L.message)||String(L)}),L}):(e(`FN ${C}:output`,t(F)),F)}catch(F){throw e(`FN ${C}:error`,{message:(F==null?void 0:F.message)||String(F)}),F}}}async function s(C){return new Promise((m,I)=>{const S=new FileReader;S.onloadend=()=>m(S.result),S.onerror=()=>I(new Error("Unable to read file data")),S.readAsDataURL(C)})}function i(){return new Date().toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function a(C,m,I,S){C.setDrawColor(212,175,55),C.setLineWidth(1.2),C.line(m,I,m+S,I),C.setDrawColor(240,218,140),C.setLineWidth(.5),C.line(m,I+2,m+S,I+2)}function o(C,m,I){C.setFillColor(248,249,251),C.rect(0,0,m,I,"F"),C.setFillColor(255,255,255),C.setDrawColor(226,232,240),C.setLineWidth(1),C.roundedRect(18,18,m-36,I-36,12,12,"FD"),C.setDrawColor(241,245,249),C.setLineWidth(.8),C.roundedRect(24,24,m-48,I-48,8,8,"S")}function B(C,m,I,S,F,L,x){o(C,m,I);const j=68;C.setFillColor(15,23,42),C.roundedRect(S,S,m-S*2,j,10,10,"F"),a(C,S+20,S+j-6,m-S*2-40),C.setFillColor(212,175,55),C.roundedRect(S+20,S+12,140,18,4,4,"F"),C.setTextColor(15,23,42),C.setFont("helvetica","bold"),C.setFontSize(8.5),C.text("ASCEND COMMUNICATION",S+27,S+24),C.setTextColor(255,255,255),C.setFont("helvetica","bold"),C.setFontSize(18),C.text(x,S+20,S+48),C.setFont("helvetica","normal"),C.setFontSize(9.5),C.setTextColor(203,213,225),C.text(i(),m-S-20,S+24,{align:"right"}),C.setFont("helvetica","bold"),C.setTextColor(212,175,55),C.text(`Page ${F} of ${L}`,m-S-20,S+46,{align:"right"});const q=S+10,W=S+j+16,_=m-(S+10)*2,E=I-W-S-44;C.setFillColor(255,255,255),C.setDrawColor(203,213,225),C.setLineWidth(1),C.roundedRect(q,W,_,E,12,12,"FD"),C.setFillColor(241,245,249),C.roundedRect(q+12,W+12,_-24,26,6,6,"F"),C.setTextColor(51,65,85),C.setFont("helvetica","bold"),C.setFontSize(9),C.text("CURATED PRESENTATION TRAY",q+22,W+28);const y=q+16,b=W+46,T=_-32,R=E-84;return C.setFillColor(250,250,250),C.setDrawColor(241,245,249),C.setLineWidth(.75),C.roundedRect(y,b,T,R,8,8,"FD"),C.setFillColor(248,250,252),C.roundedRect(q+12,W+E-32,_-24,22,6,6,"F"),C.setTextColor(100,116,139),C.setFont("helvetica","normal"),C.setFontSize(8),C.text("Ascend Communication Executive Client Selection | Confidential & Proprietary",q+20,W+E-18),c(C,m,I,S),{imageX:y,imageY:b,imageWidth:T,imageHeight:R}}function c(C,m,I,S){a(C,S,I-S-12,m-S*2),C.setTextColor(100,116,139),C.setFont("helvetica","normal"),C.setFontSize(8.5),C.text("Prepared by Ascend Communication | Premium Portfolio Document",S,I-S+4),C.setTextColor(15,23,42),C.setFont("helvetica","bold"),C.text("Ascend Communication",m-S,I-S+4,{align:"right"})}async function h(C,m,I,S,F,L,x,j){o(C,m,I),C.setFillColor(15,23,42),C.roundedRect(S,S,m-S*2,130,14,14,"F"),a(C,S+20,S+104,m-S*2-40),C.setFillColor(212,175,55),C.roundedRect(S+20,S+16,160,20,4,4,"F"),C.setTextColor(15,23,42),C.setFont("helvetica","bold"),C.setFontSize(9),C.text("ASCEND COMMUNICATION",S+28,S+30),C.setTextColor(255,255,255),C.setFont("helvetica","normal"),C.setFontSize(10.5),C.text("Executive Portfolio & Client Presentation",S+20,S+54),C.setFont("helvetica","bold"),C.setFontSize(28),C.text(F,S+20,S+84),C.setFont("helvetica","normal"),C.setFontSize(9.5),C.setTextColor(203,213,225),C.text(`Prepared on ${i()}  |  ${j} items  |  ${L} pages`,S+20,S+120);const q=S+20,W=S+148,_=m-S*2-40,E=350;if(C.setFillColor(255,255,255),C.setDrawColor(203,213,225),C.setLineWidth(1),C.roundedRect(q,W,_,E,12,12,"FD"),x){const y=await s(x),b=C.getImageProperties(y),T=Math.min((_-20)/b.width,(E-20)/b.height),R=b.width*T,v=b.height*T,ae=q+(_-R)/2,Ee=W+(E-v)/2;C.addImage(y,"PNG",ae,Ee,R,v,void 0,"FAST")}C.setFillColor(241,245,249),C.roundedRect(S+20,I-110,m-S*2-40,60,10,10,"F"),C.setTextColor(15,23,42),C.setFont("helvetica","bold"),C.setFontSize(11),C.text("Ascend Communication Portfolio Notes",S+36,I-88),C.setFont("helvetica","normal"),C.setFontSize(9),C.setTextColor(71,85,105),C.text("High-resolution catalog generated specifically for executive client sharing, digital review, and print distribution.",S+36,I-70,{maxWidth:m-S*2-80}),c(C,m,I,S)}async function d(C){const m=Array.isArray(C==null?void 0:C.pageBlobs)?C.pageBlobs:[],I=Array.isArray(C==null?void 0:C.items)?C.items:[],S=String((C==null?void 0:C.title)||"Ascend Communication Showcase");if(!m.length)throw new Error("Generate pages first");const F=window.jspdf&&window.jspdf.jsPDF;if(!F)throw new Error("PDF library not loaded");const L=new F({orientation:"portrait",unit:"pt",format:"a4"}),x=L.internal.pageSize.getWidth(),j=L.internal.pageSize.getHeight(),q=26,W=I.length>0?I.length:m.length*6,_=m.length;e("P02 buildPdfBlob:pageSetup",{pageWidth:x,pageHeight:j,totalItems:W,totalPages:_});const E=10;for(let b=0;b<m.length;b+=E){const T=m.slice(b,b+E);(await Promise.all(T.map(v=>s(v)))).forEach((v,ae)=>{const Ee=b+ae;Ee>0&&L.addPage();const Le=B(L,x,j,q,Ee+1,m.length,S),Ze=L.getImageProperties(v),gt=Math.min(Le.imageWidth/Ze.width,Le.imageHeight/Ze.height),Bt=Ze.width*gt,en=Ze.height*gt,Ht=Le.imageX+(Le.imageWidth-Bt)/2,ar=Le.imageY+(Le.imageHeight-en)/2;L.addImage(v,"PNG",Ht,ar,Bt,en,void 0,"FAST");const or=`${Ee+1} / ${m.length}`;L.setFillColor(15,23,42),L.roundedRect(x-q-80,j-q-34,60,18,6,6,"F"),L.setFontSize(8),L.setFont("helvetica","bold"),L.setTextColor(212,175,55),L.text(or,x-q-50,j-q-22,{align:"center"})})}const y=L.output("blob");return e("P05 buildPdfBlob:done",{outputSize:y.size,outputType:y.type}),y}async function p(C){const m=Array.isArray(C==null?void 0:C.items)?C.items:[],I=String((C==null?void 0:C.title)||"Ascend Communication Catalogue"),S=Number((C==null?void 0:C.totalPages)||1),F=m.length||Number((C==null?void 0:C.itemCount)||0),L=window.jspdf&&window.jspdf.jsPDF;if(!L)throw new Error("PDF library not loaded");const x=new L({orientation:"portrait",unit:"pt",format:"a4"}),j=x.internal.pageSize.getWidth(),q=x.internal.pageSize.getHeight();return await h(x,j,q,26,I,S,null,F),x.output("blob")}s=n("blobToDataUrl",s),i=n("formatDateLabel",i),a=n("drawGoldAccentLine",a),o=n("drawPageTexture",o),B=n("drawCatalogueFrame",B),c=n("drawFooter",c),h=n("drawCoverPage",h),d=n("buildPdfBlob",d),p=n("buildCoverPdfBlob",p),window.JewelleryPdf={buildPdfBlob:d,buildCoverPdfBlob:p}})();(function(){function r(B){return String(B||"").trim().toLowerCase().includes("marked")?"marked":"unmarked"}function e(B){const c=String(B||"").trim();if(!c)return"";try{const h=new URL(c,window.location.href);return h.hostname.includes("drive.google.com")&&h.searchParams.delete("google_abuse"),h.hostname==="raw.githubusercontent.com"&&(h.pathname=h.pathname.split("/").map(d=>{try{return encodeURIComponent(decodeURIComponent(d).trim())}catch{return d}}).join("/")),h.toString()}catch{return encodeURI(c)}}function t(B){try{const c=new URL(B),h=c.searchParams.get("id");if(h)return h;const d=c.pathname.match(/\/d\/([A-Za-z0-9_-]+)/);return d?d[1]:""}catch{return""}}function n(B,c){const h=c?[B.CollageURL,B.DisplayURL]:[B.DisplayURL,B.CollageURL],d=[],p=new Set,C=m=>{const I=e(m);!I||p.has(I)||(p.add(I),d.push(I))};return h.forEach(m=>{const I=e(m);if(!I)return;const S=t(I);S&&(C(`https://lh3.googleusercontent.com/d/${S}=w700`),C(`https://drive.google.com/thumbnail?id=${S}&sz=w700`),C(`https://drive.google.com/uc?export=view&id=${S}`)),C(I)}),d}function s(B){return n(B,!1)[0]||""}function i(B){return n(B,!1)[1]||""}function a(){return[{"Serial No":"RNG-901","Brand Name":"Ascend Atelier",Type:"Rings",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80"},{"Serial No":"RNG-902","Brand Name":"VRAI Heritage",Type:"Rings",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700&auto=format&fit=crop&q=80"},{"Serial No":"NCK-401","Brand Name":"Ascend Atelier",Type:"Necklaces",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80"},{"Serial No":"NCK-402","Brand Name":"Couture Pavé",Type:"Necklaces",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&auto=format&fit=crop&q=80"},{"Serial No":"EAR-601","Brand Name":"Ascend Atelier",Type:"Earrings",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700&auto=format&fit=crop&q=80"},{"Serial No":"EAR-602","Brand Name":"VRAI Heritage",Type:"Earrings",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&auto=format&fit=crop&q=80"},{"Serial No":"BRC-301","Brand Name":"Ascend Atelier",Type:"Bracelets",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?w=700&auto=format&fit=crop&q=80"},{"Serial No":"BRC-302","Brand Name":"Couture Pavé",Type:"Bracelets",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&auto=format&fit=crop&q=80"},{"Serial No":"HJ-801","Brand Name":"Ascend Atelier",Type:"High Jewellery",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&auto=format&fit=crop&q=80"},{"Serial No":"HJ-802","Brand Name":"VRAI Heritage",Type:"High Jewellery",Status:"Available",DisplayURL:"https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=700&auto=format&fit=crop&q=80",CollageURL:"https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=700&auto=format&fit=crop&q=80"}]}function o(){const B=Array.isArray(window.data)?window.data:[];typeof window.dataBySerial<"u"&&(window.dataBySerial=new Map(B.map(c=>[c["Serial No"],c])))}window.normalizeStatus=r,window.normalizeImageUrl=e,window.extractGoogleDriveId=t,window.buildImageSourceCandidates=n,window.getPreviewImageUrl=s,window.getPreviewFallbackImageUrl=i,window.rebuildDataIndex=o,window.getFallbackCatalogData=a})();(function(){let r={name:"",purpose:"review"};function e(m){return String(m??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function t(m){return String(m||"").replace(/[\u200B-\u200D\uFEFF]/g,"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"")}function n(){let m=Array.isArray(window.selected)?window.selected:[];if(!m.length)try{const F=window.ProjectStore||(typeof ProjectStore<"u"?ProjectStore:null);if(F&&F.getActiveContext){const L=F.getActiveContext();L&&L.project&&Array.isArray(L.project.selectedSerials)&&L.project.selectedSerials.length&&(m=L.project.selectedSerials)}}catch{}const I=Array.isArray(window.data)?window.data:[],S=new Set(m.map(t));return I.filter(F=>S.has(t(F["Serial No"])))}function s(m,I){r={name:String(m||"").trim(),purpose:I==="final"?"final":"review"}}function i(){const m=document.getElementById("miniWebsiteModal"),I=document.getElementById("miniWebsitePurposeSelect"),S=document.getElementById("modalProjectContextPill");if(!m)return;let F={};try{const q=window.ProjectStore||(typeof ProjectStore<"u"?ProjectStore:null);q&&q.getActiveContext&&(F=q.getActiveContext())}catch{}const L=F.celebrity?F.celebrity.name:"Celebrity",x=F.stylist?F.stylist.name:"Stylist",j=F.project?F.project.title:"Lookbook Curation";S&&(S.innerHTML=`<i class="fa-solid fa-user-tie"></i> Stylist: <strong>${e(x)}</strong> &bull; <i class="fa-solid fa-star"></i> Celebrity: <strong>${e(L)}</strong> <span style="opacity:0.7">(${e(j)})</span>`),I&&(I.value=r.purpose||"review",I.dataset.previewBound||(I.addEventListener("change",B),I.dataset.previewBound="true")),m.classList.remove("hidden"),B()}function a(){const m=document.getElementById("miniWebsiteModal");m&&m.classList.add("hidden")}function o(m){const I=document.getElementById(m);if(!I)return;let S={};try{const ae=window.ProjectStore||(typeof ProjectStore<"u"?ProjectStore:null);ae&&ae.getActiveContext&&(S=ae.getActiveContext())}catch{}const F=S.celebrity?S.celebrity.name:"Celebrity",L=document.getElementById("miniWebsitePurposeSelect"),x=(L?L.value:r.purpose||"review")==="final"?"final":"review",j=n(),q=j.length,W=q?`${q} selected product${q===1?"":"s"}`:"No products selected yet";I.innerHTML="",I.classList.toggle("empty-state",!j.length);const _=document.createElement("p");if(_.className="preview-sub",_.style.cssText="font-weight: 600; color: #444; margin-bottom: 8px;",_.textContent=`${F} · ${x==="final"?"Showcase Lookbook":"Interactive Review"} • ${W}`,I.appendChild(_),!j.length){const ae=document.createElement("div");ae.className="mini-preview-empty",ae.style.cssText="padding: 18px 12px; text-align: center; border: 1px dashed #d4af37; border-radius: 8px; background: rgba(212,175,55,0.04); margin-top: 8px;",ae.innerHTML=`
        <i class="fa-solid fa-gem" style="font-size: 1.4rem; color: #d4af37; margin-bottom: 6px; display: block;"></i>
        <strong style="display: block; color: #1c1917; margin-bottom: 4px; font-size: 0.88rem;">No Products Selected for Preview</strong>
        <span style="font-size: 0.8rem; color: #78716c; display: block; margin-bottom: 10px;">Select pieces from the catalogue grid to populate this live lookbook preview.</span>
        <button class="btn btn-secondary btn-sm" onclick="switchTab('browse')" style="font-size: 0.78rem; padding: 4px 12px;"><i class="fa-solid fa-square-check"></i> Browse &amp; Select Items</button>
      `,I.appendChild(ae);return}const E=12,y=j.slice(0,E),b=document.createElement("div");b.className="mini-preview-grid";const T=typeof window.getPreviewImageUrl=="function"?window.getPreviewImageUrl:typeof getPreviewImageUrl=="function"?getPreviewImageUrl:null;if(y.forEach(ae=>{const Ee=document.createElement("article");Ee.className="mini-preview-card";const Le=T?T(ae):ae["Image URL"]||ae.image||ae.Image||"",Ze=e(ae["Serial No"]||""),gt=e(ae["Brand Name"]||""),Bt=e(ae.Type||"");Ee.innerHTML=`
        ${Le?`<img src="${e(Le)}" alt="${Ze}" loading="lazy" style="width:100%; aspect-ratio:1/1; object-fit:cover; display:block;">`:'<div class="mini-preview-placeholder">No image available</div>'}
        <div class="mini-preview-body" style="padding: 6px 8px;">
          <p class="mini-preview-title" style="font-weight: 700; margin: 0 0 2px; font-size: 0.82rem; color: #1c1917;">${Ze}</p>
          <p class="mini-preview-sub" style="margin: 0; font-size: 0.75rem; color: #78716c;">${gt}</p>
          <p class="mini-preview-sub" style="margin: 0; font-size: 0.72rem; color: #a8a29e;">${Bt}</p>
        </div>
      `,b.appendChild(Ee)}),I.appendChild(b),j.length>E){const ae=document.createElement("div");ae.className="mini-preview-more",ae.style.cssText="grid-column: 1 / -1; text-align: center; font-size: 12px; font-weight: 600; color: #8a6d3b; padding: 8px 12px; background: rgba(191,150,95,0.12); border-radius: 8px; margin-top: 8px;",ae.textContent=`+ ${j.length-E} more items will be included in the complete Lookbook`,I.appendChild(ae)}const R=document.createElement("div");R.style.cssText="margin-top: 12px; text-align: center;";const v=JSON.stringify(j.map(ae=>ae["Serial No"]).filter(Boolean)).replace(/"/g,"&quot;");R.innerHTML=`
      <button class="btn btn-secondary btn-sm" onclick="if(window.importLookbookSelectionToFinalTray){ window.importLookbookSelectionToFinalTray(${v}); }" style="font-size: 0.82rem; background: #18181b; color: #d4af37; border: 1px solid #d4af37; border-radius: 6px; padding: 7px 16px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> Add ${j.length} Lookbook Piece${j.length===1?"":"s"} to Final Tray
      </button>
    `,I.appendChild(R)}function B(){o("miniWebsiteModalPreview"),o("miniWebsitePreview")}function c(m,I=[],S={}){const F=new Set((Array.isArray(I)?I:[]).map(b=>t(typeof b=="object"&&(b["Serial No"]||b.id)||b))),L=m.filter(b=>{if(!b)return!1;const T=t(b["Serial No"]);return F.has(T)}),x=String(S.name||r.name||"").trim()||"Valued Client",j=S.purpose==="final"?"final":"review",q=j==="final"?"Final Showcase":"Private Client Review",W=j==="review",_=typeof API_URL<"u"?API_URL:"https://script.google.com/macros/s/AKfycby4RNwxBEfKWLWCT4Y6-LFLkObAE-j4LCDBUh5Lc3eG6zAcPN1WvUqXwOXMyWDH3nA/exec",E=typeof window.getPreviewImageUrl=="function"?window.getPreviewImageUrl:typeof getPreviewImageUrl=="function"?getPreviewImageUrl:null,y=L.map(b=>{const T=e(b["Serial No"]||"Unknown"),R=e(b["Brand Name"]||"Ascend High Jewelry"),v=e(b.Type||"Bespoke Collection");let ae=E?E(b):b["Image URL"]||b.DisplayURL||b.CollageURL||b.image||b.Image||"";ae&&typeof normalizeImageUrl=="function"&&(ae=normalizeImageUrl(ae));const Ee=ae?`<img src="${e(ae)}" alt="${T}" loading="lazy">`:'<div class="image-placeholder"><span>No Image Available</span></div>',Le=W?`
        <label class="checkbox-label" for="cb-${T}" onclick="event.stopPropagation()">
          <input type="checkbox" id="cb-${T}" class="product-checkbox" value="${T}" onchange="updateSelectedCount()">
          <span class="custom-cb"></span>
          <span class="cb-text">Select this piece</span>
        </label>
      `:"",Ze=W?`onclick="toggleCardCheckbox('${T}', event)"`:"";return`
        <article class="card" data-serial="${T}" ${Ze}>
          <div class="card-media">
            ${Ee}
            <span class="brand-tag">${R}</span>
          </div>
          <div class="card-body">
            <h3 class="piece-title">${T}</h3>
            <p class="piece-type">${v}</p>
            ${Le}
          </div>
        </article>
      `}).join("");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ASCEND — Digital Client Lookbook (${e(x)})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --gold: #bf965f;
      --gold-light: #e8cdb5;
      --gold-bg: rgba(191, 150, 95, 0.08);
      --bg: #faf8f5;
      --panel: #ffffff;
      --dark: #121620;
      --text: #242936;
      --muted: #6b7280;
      --border: #e8ded2;
      --shadow: 0 16px 40px rgba(18, 22, 32, 0.07);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding-bottom: 100px;
    }
    .header-banner {
      background: linear-gradient(135deg, #121620 0%, #1c2232 100%);
      color: #fff;
      padding: 48px 24px 40px;
      text-align: center;
      position: relative;
      border-bottom: 2px solid var(--gold);
    }
    .brand-eyebrow {
      font-size: 11px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--gold);
      font-weight: 700;
      margin-bottom: 12px;
      display: block;
    }
    .header-banner h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .header-banner p {
      font-size: 0.95rem;
      color: #9ca3af;
      max-width: 600px;
      margin: 0 auto;
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 20px;
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px 24px;
      margin-bottom: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }
    .client-pill {
      font-size: 14px;
      font-weight: 600;
      color: var(--dark);
    }
    .client-pill span {
      color: var(--gold);
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: var(--gold-bg);
      color: var(--gold);
      border: 1px solid rgba(191, 150, 95, 0.2);
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
    }
    @media (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .card-body {
        padding: 14px;
      }
      .checkbox-label {
        padding: 14px 16px;
      }
    }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .card:active {
      transform: scale(0.985);
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 48px rgba(18, 22, 32, 0.12);
      border-color: var(--gold-light);
    }
    .card-media {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      background: #f4efe9;
      overflow: hidden;
    }
    .card-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card:hover .card-media img {
      transform: scale(1.04);
    }
    .image-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--muted);
      font-size: 14px;
    }
    .brand-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(18, 22, 32, 0.85);
      backdrop-filter: blur(4px);
      color: #fff;
      font-size: 10px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
      letter-spacing: 0.5px;
    }
    .card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .piece-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 2px;
    }
    .piece-type {
      font-size: 0.85rem;
      color: var(--muted);
      margin-bottom: 16px;
    }
    .checkbox-label {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .checkbox-label:hover {
      background: var(--gold-bg);
      border-color: var(--gold);
    }
    .product-checkbox {
      display: none;
    }
    .custom-cb {
      width: 20px;
      height: 20px;
      border: 2px solid #d1d5db;
      border-radius: 6px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .custom-cb::after {
      content: "✓";
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      display: none;
    }
    .product-checkbox:checked + .custom-cb {
      background: var(--gold);
      border-color: var(--gold);
    }
    .product-checkbox:checked + .custom-cb::after {
      display: block;
    }
    .product-checkbox:checked ~ .cb-text {
      color: var(--dark);
      font-weight: 700;
    }
    .card.selected-card {
      border: 2px solid var(--gold) !important;
      background: #fffef2 !important;
      box-shadow: 0 16px 40px rgba(191, 150, 95, 0.25) !important;
    }
    .selected-ribbon {
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--gold);
      color: #000000;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 4px;
      letter-spacing: 1px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 5;
    }
    .cb-text {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text);
    }
    .floating-bar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(18, 22, 32, 0.95);
      backdrop-filter: blur(12px);
      color: #fff;
      padding: 14px 28px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 24px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      border: 1px solid rgba(191, 150, 95, 0.5);
      z-index: 9999;
      width: min(90%, 540px);
      justify-content: space-between;
    }
    .selection-counter {
      font-size: 14px;
      font-weight: 500;
    }
    .selection-counter strong {
      color: var(--gold);
      font-size: 18px;
    }
    .submit-btn {
      background: linear-gradient(135deg, #bf965f 0%, #a67c48 100%);
      color: #000000;
      border: none;
      padding: 10px 24px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(191, 150, 95, 0.4);
      white-space: nowrap;
    }
    .submit-btn:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 20px rgba(191, 150, 95, 0.6);
    }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    footer {
      text-align: center;
      padding: 40px 20px;
      font-size: 12px;
      color: var(--muted);
      border-top: 1px solid var(--border);
      margin-top: 60px;
    }
  </style>
</head>
<body>
  <header class="header-banner">
    <span class="brand-eyebrow">ASCEND HIGH JEWELLERY</span>
    <h1>Digital Celebrity Lookbook</h1>
    <p>Curated Private Selection for ${e(x)}</p>
  </header>

  <main class="container">
    <div class="meta-bar">
      <div class="client-pill">Celebrity / Muse: <span>${e(x)}</span></div>
      <div class="badge">${e(q)}</div>
    </div>

    <div class="grid">
      ${y||'<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">No products in this lookbook yet.</p>'}
    </div>
  </main>

  ${W?`
  <div class="floating-bar">
    <div class="selection-counter"><strong id="countDisplay">0</strong> pieces selected</div>
    <button id="submitBtn" class="submit-btn" onclick="submitClientSelections()">Submit Selections to Studio →</button>
  </div>

  <script>
    function toggleCardCheckbox(serial, event) {
      const cb = document.getElementById('cb-' + serial);
      const card = document.querySelector('.card[data-serial="' + serial + '"]');
      if (!cb) return;

      if (event && event.target !== cb) {
        cb.checked = !cb.checked;
      }

      if (card) {
        if (cb.checked) {
          card.classList.add('selected-card');
          if (!card.querySelector('.selected-ribbon')) {
            const media = card.querySelector('.card-media');
            if (media) {
              const ribbon = document.createElement('span');
              ribbon.className = 'selected-ribbon';
              ribbon.innerText = 'SELECTED ✓';
              media.appendChild(ribbon);
            }
          }
        } else {
          card.classList.remove('selected-card');
          const ribbon = card.querySelector('.selected-ribbon');
          if (ribbon) ribbon.remove();
        }
      }

      updateSelectedCount();
    }

    function updateSelectedCount() {
      const count = document.querySelectorAll('.product-checkbox:checked').length;
      document.getElementById('countDisplay').innerText = count;
    }

    async function submitClientSelections() {
      const checkboxes = document.querySelectorAll('.product-checkbox:checked');
      const selectedSerials = Array.from(checkboxes).map(cb => cb.value);

      if (selectedSerials.length === 0) {
        alert("Please select at least one piece before submitting.");
        return;
      }

      const btn = document.getElementById('submitBtn');
      btn.innerText = "Submitting to Studio...";
      btn.disabled = true;

      try {
        try {
          if (window.parent && typeof window.parent.importLookbookSelectionToFinalTray === 'function') {
            window.parent.importLookbookSelectionToFinalTray(selectedSerials);
          } else if (window.opener && typeof window.opener.importLookbookSelectionToFinalTray === 'function') {
            window.opener.importLookbookSelectionToFinalTray(selectedSerials);
          }
        } catch(e) {
          console.warn("Parent sync notice:", e);
        }

        const payload = {
          action: "saveProject",
          project: {
            title: "${e(x)} Approved Selection",
            status: "Celebrity Approved",
            selectedSerials: selectedSerials,
            updatedAt: new Date().toISOString()
          }
        };

        await fetch("${_}", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        btn.innerText = "Selections Approved ✓";
        btn.style.background = "#22c55e";
        alert("Thank you! Your approved pieces (" + selectedSerials.length + ") have been marked as selected and added directly to your Studio Final Tray.");
      } catch (err) {
        console.error(err);
        btn.innerText = "Approved ✓";
        btn.style.background = "#22c55e";
        alert("Selection recorded! Approved pieces added to your Studio Final Tray.");
      }
    }
  <\/script>
  `:""}

  <footer>
    &copy; 2026 Ascend Communication &bull; Executive Client Digital Selection
  </footer>
</body>
</html>`}function h(){let m={};try{const L=window.ProjectStore||(typeof ProjectStore<"u"?ProjectStore:null);L&&L.getActiveContext&&(m=L.getActiveContext())}catch{}const I=m.celebrity?m.celebrity.name:"Celebrity",S=document.getElementById("miniWebsitePurposeSelect"),F=S?S.value:"review";return s(I,F),{name:I,purpose:r.purpose}}async function d(m=null){typeof showSpinner=="function"&&showSpinner(!0),await new Promise(I=>setTimeout(I,60));try{let I=Array.isArray(window.selected)?window.selected:[];if(!I||!I.length)try{const E=window.ProjectStore||(typeof ProjectStore<"u"?ProjectStore:null);if(E&&E.getActiveContext){const y=E.getActiveContext();y&&y.project&&Array.isArray(y.project.selectedSerials)&&y.project.selectedSerials.length&&(I=y.project.selectedSerials)}}catch{}const S=Array.isArray(window.data)?window.data:[];if(!I||!I.length){alert("Select products from the catalogue first, then create the Client Lookbook.");return}const F=m||h();let L=S.length?S:[];!L.length&&typeof window.getInventoryForExport=="function"&&(L=await window.getInventoryForExport());const x=I.filter(Boolean),j=c(L,x,F),q=new Blob([j],{type:"text/html;charset=utf-8"}),W=`ascend-client-lookbook-${Date.now()}.html`;typeof window.setHtmlLookbookPreview=="function"?window.setHtmlLookbookPreview(q,W,F,x.length):typeof openBlobPreview=="function"&&openBlobPreview(q,W),typeof triggerBlobDownload=="function"&&triggerBlobDownload(q,W),a();const _=document.getElementById("postCreationShareContainer");_&&(_.style.display="block");try{const E=window.ProjectStore||(typeof ProjectStore<"u"?ProjectStore:null);let y=null;if(E&&E.getActiveContext){const R=E.getActiveContext();R&&R.project&&(y=R.project)}E&&E.updateProjectStatus&&y&&E.updateProjectStatus(y.id,"Lookbook Sent");const b=typeof window<"u"&&window.API_URL?window.API_URL:"https://script.google.com/macros/s/AKfycbx0eH7JARm9zfA7thFyCYt4LYUTcPzw0MdKFuVTAg-z6il9_r2YSJG00WiRwv2QJmQ/exec",T={action:"saveProject",project:{id:y?y.id:"proj_"+Date.now(),title:y?y.title:`${F.name} Lookbook`,celebrityName:F.name||"Valued Client",status:"Lookbook Sent",selectedSerials:x,lookbookUrl:W,itemCount:x.length,updatedAt:new Date().toISOString()}};fetch(b,{method:"POST",body:JSON.stringify(T)}).then(R=>R.json()).then(R=>{console.log("[Lookbook API] Project successfully synced to backend API:",R)}).catch(R=>{console.warn("[Lookbook API] Sync notice:",R)})}catch(E){console.warn("[Lookbook API] Sync notice:",E)}alert(`Client Lookbook generated for ${F.name||"Valued Client"} with ${x.length} piece${x.length===1?"":"s"}. Synced to backend & preview loaded!`)}catch(I){console.error("Error creating Client Lookbook:",I),alert("Unable to create Client Lookbook. Please try again.")}finally{typeof showSpinner=="function"&&showSpinner(!1)}}function p(){d(h())}async function C(){try{const m=new URLSearchParams(window.location.search),I=m.get("mode")||m.get("lookbook");if(I==="lookbook"||I==="true"){const F=(m.get("items")||"").split(",").map(_=>_.trim()).filter(Boolean),L=m.get("name")||"Valued Client",x=m.get("purpose")||"review",j=m.get("project")||"proj_"+Date.now();let q=Array.isArray(window.data)&&window.data.length?window.data:[];!q.length&&typeof window.getInventoryForExport=="function"&&(q=await window.getInventoryForExport());const W=c(q,F,{name:L,purpose:x,projId:j});return document.open(),document.write(W),document.close(),!0}}catch(m){console.warn("[Lookbook URL] Error opening lookbook web view:",m)}return!1}window.exportClientLookbook=d,window.openClientLookbookModal=i,window.closeClientLookbookModal=a,window.createClientLookbookFromModal=p,window.exportMiniWebsite=d,window.openMiniWebsiteModal=i,window.closeMiniWebsiteModal=a,window.createMiniWebsiteFromModal=p,window.updateMiniWebsiteModalPreview=B,window.checkUrlLookbookMode=C,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C):C()})();let De=[],X=[];Object.defineProperty(window,"selected",{get:()=>X,set:r=>{X=r},configurable:!0});Object.defineProperty(window,"data",{get:()=>De,set:r=>{De=r},configurable:!0});let Vf=null,ve=[],Pr=[],_n="Jewellery Catalogue",DB="none",Qe=null,Ft="",Mt=1,vr=36,Kt=1,_r=24,bl="",ha="",$s=!1,me=[],it=-1,kt=new Map,Ve=[],Gf="";function ht(r){return r==null?"":String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function $t(r,e){const t=new Date().toISOString();if(e===void 0){console.log(`[FinalTray ${t}] ${r}`);return}console.log(`[FinalTray ${t}] ${r}`,e)}function vB(){const{project:r}=Cn();r&&(Nf(r.id,X),ir(),typeof window.renderHomepageProjectsSection=="function"&&window.renderHomepageProjectsSection())}Bv({onProjectSwitch:r=>{X=r&&r.selectedSerials?[...r.selectedSerials]:[],me=r&&r.selectedSerials?[...r.selectedSerials]:[],Ve=[],Xt(),pt(),typeof window.renderDashboard=="function"&&window.renderDashboard(),typeof window.renderFinalTraySerialManager=="function"&&window.renderFinalTraySerialManager(),typeof window.renderHomepageProjectsSection=="function"&&window.renderHomepageProjectsSection()}});const{project:ra}=Cn();ra&&Array.isArray(ra.selectedSerials)&&(X=[...ra.selectedSerials],me=[...ra.selectedSerials]);typeof window.renderDashboard=="function"&&window.renderDashboard();Uv();bv();async function bv(){const r=document.getElementById("statSelected");r&&(r.innerText=X.length);const e=document.getElementById("vraiNavCartCount");e&&(e.innerText=X.length);const t=document.getElementById("hideMarked");t&&(t.checked=!0);try{const s=await(await fetch(`${hs}?t=${new Date().getTime()}`,{cache:"no-store",redirect:"follow"})).json();De=Array.isArray(s)?s:s.data||[]}catch(n){console.warn("Could not fetch remote catalog data, using fallback archive",n)}(!Array.isArray(De)||De.length===0)&&typeof window.getFallbackCatalogData=="function"&&(De=window.getFallbackCatalogData()),window.rebuildDataIndex(),X=X.filter(n=>{const s=kt.get(n);return s&&window.normalizeStatus(s.Status)!=="marked"}),jf(),pt(),tt(),updateMiniWebsiteModalPreview()}async function Iv(){if(Array.isArray(De)&&De.length)return De;try{const e=await(await fetch(`${hs}?t=${new Date().getTime()}`,{cache:"no-store",redirect:"follow"})).json();return Array.isArray(e)?e:e.data||[]}catch(r){return console.error("Failed to fetch inventory for export",r),[]}}window.getInventoryForExport=Iv;function Xt(){PB();const r=document.getElementById("browseTabBadge"),e=document.getElementById("bottomNavBadge");r&&(X.length>0?r.textContent=`${X.length}`:r.textContent=""),e&&(X.length>0?e.textContent=`${X.length}`:e.textContent="")}window.updateTabBadge=Xt;function Tv(){const r=document.getElementById("controlsContent"),e=document.getElementById("collapseBtn");!r||!e||($s=!$s,r.classList.toggle("collapsed",$s),e.textContent=$s?"+":"−",e.title=$s?"Expand controls":"Collapse controls")}function Hf(r){r&&r.stopPropagation();const e=document.getElementById("filterGalleryOverlay"),t=document.getElementById("filterGalleryBackdrop");!e||!t||(e.classList.remove("hidden"),t.classList.remove("hidden"),e.offsetWidth,e.classList.add("open"),t.classList.add("open"),_B())}function Sv(){const r=document.getElementById("filterGalleryOverlay"),e=document.getElementById("filterGalleryBackdrop");!r||!e||(r.classList.remove("open"),e.classList.remove("open"),setTimeout(()=>{r.classList.add("hidden"),e.classList.add("hidden")},300))}window.onFilterGalleryScroll=function(){const r=document.getElementById("filterSwipeContainer"),e=document.getElementById("filterTabBrand"),t=document.getElementById("filterTabType");if(!r||!e||!t)return;r.scrollLeft/r.clientWidth>.5?(e.classList.remove("active"),t.classList.add("active")):(e.classList.add("active"),t.classList.remove("active"))};window.scrollToFilterPage=function(r){const e=document.getElementById("filterSwipeContainer");e&&(r==="type"?e.scrollTo({left:e.clientWidth,behavior:"smooth"}):e.scrollTo({left:0,behavior:"smooth"}))};window.closeFilterMenu=Sv;function Uf(r){r&&r.stopPropagation();const e=document.getElementById("countSummary"),t=document.getElementById("breakdownToggleBtn");if(!e||!t)return;const n=e.classList.contains("hidden");e.classList.toggle("hidden"),t.textContent=n?"Hide brand & type breakdown":"View brand & type breakdown"}window.toggleBreakdown=Uf;function Av(r,e){const t=e.getBoundingClientRect(),n=r.offsetWidth||420,s=16;let i=t.right-n;i=Math.max(s,Math.min(i,window.innerWidth-n-s));let a=t.bottom+10;const o=r.offsetHeight||300;a+o>window.innerHeight-s&&(a=Math.max(s,t.top-o-10)),r.style.left=`${i}px`,r.style.top=`${a}px`}window.addEventListener("resize",()=>{const r=document.getElementById("controlsContent"),e=document.getElementById("filterToggleBtn");r&&e&&!r.classList.contains("hidden")&&Av(r,e)});window.toggleFilterMenu=Hf;document.addEventListener("click",r=>{const e=document.getElementById("controlsContent"),t=document.querySelector(".filter-menu-wrap");if(!e||!t)return;const n=e.contains(r.target),s=r.target.closest("#filterToggleBtn");!e.classList.contains("hidden")&&!n&&!s&&!t.contains(r.target)&&e.classList.add("hidden")});window.toggleControlsCollapse=Tv;function Pv(){const r=document.getElementById("activeFiltersContainer");if(!r)return;const e=Wt("type"),t=Wt("brand");if(e.length===0&&t.length===0){r.classList.add("hidden"),r.innerHTML="";return}r.classList.remove("hidden");let n="";t.forEach(s=>{n+=`
      <div class="filter-chip">
        ${s}
        <div class="filter-chip-remove" onclick="toggleCatalogueFilter('brand', '${s.replace(/'/g,"\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    `}),e.forEach(s=>{n+=`
      <div class="filter-chip">
        ${s}
        <div class="filter-chip-remove" onclick="toggleCatalogueFilter('type', '${s.replace(/'/g,"\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    `}),r.innerHTML=n}function _B(){const r=document.getElementById("filterTypePage"),e=document.getElementById("filterBrandPage"),t=document.getElementById("filterTypeTriggerText"),n=document.getElementById("filterBrandTriggerText"),s=document.getElementById("filterStatus"),i=document.getElementById("hideMarked"),a=document.getElementById("searchSerial"),o=Wt("type"),B=Wt("brand"),c=s?s.value:"",h=i?i.checked:!1,d=a?a.value.trim().toUpperCase():"";function p(F,L=!1,x=!1){const j=window.normalizeStatus(F.Status);return!(h&&j==="marked"||c==="marked"&&j!=="marked"||c==="unmarked"&&j==="marked"||d&&!String(F["Serial No"]||"").toUpperCase().includes(d)||!L&&o.length&&!o.includes(String(F.Type||"").trim())||!x&&B.length&&!B.includes(String(F["Brand Name"]||"").trim()))}const C=new Map;De.forEach(F=>{if(p(F,!0,!1)){const L=String(F.Type||"").trim();L&&C.set(L,(C.get(L)||0)+1)}});const m=new Map;De.forEach(F=>{if(p(F,!1,!0)){const L=String(F["Brand Name"]||"").trim();L&&m.set(L,(m.get(L)||0)+1)}});const I=Array.from(new Set(De.map(F=>String(F.Type||"").trim()).filter(Boolean))).sort((F,L)=>F.localeCompare(L)),S=Array.from(new Set(De.map(F=>String(F["Brand Name"]||"").trim()).filter(Boolean))).sort((F,L)=>F.localeCompare(L));if(r){const F=De.filter(x=>p(x,!0,!1)).length;if(t){const x=o.length?o.join(", "):"All types";t.textContent=x}let L=`
      <div class="filter-item-row ${o.length===0?"selected":""}" onclick="toggleCatalogueFilter('type','')">
        <div class="filter-item-info">
          <span class="filter-item-name">All Types</span>
          <span class="filter-item-count">${F} items</span>
        </div>
        <div class="circular-checkbox"></div>
      </div>
    `;L+=I.map(x=>{const j=C.get(x)||0;return`
        <div class="filter-item-row ${o.includes(x)?"selected":""}" onclick="toggleCatalogueFilter('type','${x.replace(/'/g,"\\'")}' )">
          <div class="filter-item-info">
            <span class="filter-item-name">${x}</span>
            <span class="filter-item-count">${j} items</span>
          </div>
          <div class="circular-checkbox"></div>
        </div>
      `}).join(""),r.innerHTML=L}if(e){const F=De.filter(x=>p(x,!1,!0)).length;if(n){const x=B.length?B.join(", "):"All brands";n.textContent=x}let L=`
      <div class="filter-item-row ${B.length===0?"selected":""}" onclick="toggleCatalogueFilter('brand','')">
        <div class="filter-item-info">
          <span class="filter-item-name">All Brands</span>
          <span class="filter-item-count">${F} items</span>
        </div>
        <div class="circular-checkbox"></div>
      </div>
    `;L+=S.map(x=>{const j=m.get(x)||0;return`
        <div class="filter-item-row ${B.includes(x)?"selected":""}" onclick="toggleCatalogueFilter('brand','${x.replace(/'/g,"\\'")}' )">
          <div class="filter-item-info">
            <span class="filter-item-name">${x}</span>
            <span class="filter-item-count">${j} items</span>
          </div>
          <div class="circular-checkbox"></div>
        </div>
      `}).join(""),e.innerHTML=L}Pv(),Lv(C),Mv(m,C),xv(),Ov()}function Wt(r){const e=r==="type"?"catalogueFilterTypes":"catalogueFilterBrands",t=window.localStorage.getItem(e);if(!t)return[];try{const n=JSON.parse(t);return Array.isArray(n)?n.filter(Boolean):[]}catch{return[]}}function xa(r,e){const t=r==="type"?"catalogueFilterTypes":"catalogueFilterBrands";window.localStorage.setItem(t,JSON.stringify(e))}function Rv(r){const e=r==="type"?document.getElementById("filterTypeOptions"):document.getElementById("filterBrandOptions");if(!e)return;const t=r==="type"?document.getElementById("filterBrandOptions"):document.getElementById("filterTypeOptions");e.classList.toggle("hidden"),t&&t.classList.add("hidden")}window.toggleFilterChoice=Rv;function Fv(r,e){const t=Wt(r);if(!e)xa(r,[]);else{const n=t.includes(e)?t.filter(s=>s!==e):[...t,e];xa(r,n)}_s(r)}window.toggleCatalogueFilter=Fv;function Nv(){xa("type",[]),xa("brand",[]);const r=document.getElementById("filterStatus"),e=document.getElementById("hideMarked"),t=document.getElementById("searchSerial");r&&(r.value=""),e&&(e.checked=!0),t&&(t.value=""),_s("clear")}window.clearCatalogueFilters=Nv;function xv(){var a,o;const r=Wt("type"),e=Wt("brand"),t=((a=document.getElementById("filterStatus"))==null?void 0:a.value)||"",n=((o=document.getElementById("searchSerial"))==null?void 0:o.value.trim())||"";let s=0;r.length&&s++,e.length&&s++,t&&s++,n&&s++;const i=document.getElementById("filterActiveBadge");i&&(s>0?(i.textContent=String(s),i.classList.remove("hidden")):(i.textContent="0",i.classList.add("hidden")))}function Ov(){const r=document.getElementById("selectAllFilteredBtn")||document.querySelector("button[onclick='selectAllByBrand()']");if(!r)return;const e=Wt("type"),t=Wt("brand"),s=bs().filter(i=>window.normalizeStatus(i.Status)!=="marked").length;t.length&&e.length?r.textContent=`Select ${t.join(", ")} + ${e.join(", ")} (${s})`:t.length?r.textContent=`Select ${t.join(", ")} (${s})`:e.length?r.textContent=`Select ${e.join(", ")} (${s})`:r.textContent=`Select visible (${s})`}function Lv(r){const e=document.getElementById("categoryBar");if(!e)return;const t=document.getElementById("filterType"),n=t?t.value:"",i=[...new Set(De.map(B=>String(B.Type||"").trim()).filter(Boolean))].sort((B,c)=>B.localeCompare(c));let a=0;i.forEach(B=>{a+=r&&r.get(B)||0});let o=`<button type="button" class="category-pill ${n?"":"active"}" onclick='selectCategory("")'>All <span class="count">${a}</span></button>`;i.forEach(B=>{const c=r&&r.get(B)||0;o+=`<button type="button" class="category-pill ${n===B?"active":""}" onclick='selectCategory("${B.replace(/'/g,"\\'")}")'>${B} <span class="count">${c}</span></button>`}),e.innerHTML=o}function kv(r){const e=document.getElementById("filterType");e&&(e.value=r),_s("type")}window.selectCategory=kv;function jf(){_B()}function Mv(r,e){const t=document.getElementById("countSummary");if(!t)return;const n=[...r.entries()].sort((a,o)=>o[1]-a[1]||a[0].localeCompare(o[0])).slice(0,10),s=[...e.entries()].sort((a,o)=>o[1]-a[1]||a[0].localeCompare(o[0])),i=a=>a.map(([o,B])=>`<span class="breakdown-pill">${o} <strong>${B}</strong></span>`).join("");t.innerHTML=`
    <div class="breakdown-group">
      <p class="breakdown-label">Brands</p>
      <div class="breakdown-pills">${i(n)||'<span class="breakdown-pill">No brands found</span>'}</div>
    </div>
    <div class="breakdown-group">
      <p class="breakdown-label">Types</p>
      <div class="breakdown-pills">${i(s)||'<span class="breakdown-pill">No types found</span>'}</div>
    </div>
  `}function Vv(r){const e=De.length,t=De.filter(h=>window.normalizeStatus(h.Status)==="marked").length,n=Math.max(0,e-t),s=document.getElementById("statTotal"),i=document.getElementById("statAvailable"),a=document.getElementById("statSelected"),o=document.getElementById("statMarked"),B=document.getElementById("gridSummary");s&&(s.textContent=String(e)),i&&(i.textContent=String(n)),a&&(a.textContent=String(X.length)),o&&(o.textContent=String(t)),B&&(B.textContent=`${r} visible item${r===1?"":"s"}`);const c=document.getElementById("gridSummaryHeading");c&&(c.textContent=`${r} visible item${r===1?"":"s"}`)}function _s(r=""){bl=document.getElementById("searchSerial")?document.getElementById("searchSerial").value.trim().toUpperCase():"",ha=document.getElementById("sortBy")?document.getElementById("sortBy").value:"",Mt=1,_B(),pt()}window.onFilterChanged=_s;window.selectAllFiltered=function(){const r=bs();let e=0;const t=[...X];r.forEach(n=>{const s=n["Serial No"];t.includes(s)||(t.push(s),e++)}),e>0?(X=t,Xt(),pt(),Zt(),alert(`Added ${e} items to your selection.`)):alert("All matching items are already selected.")};window.deselectAllFiltered=function(){const r=bs(),e=new Set(r.map(s=>s["Serial No"])),t=X.length;X=X.filter(s=>!e.has(s));const n=t-X.length;n>0?(Xt(),pt(),Zt(),alert(`Removed ${n} items from your selection.`)):alert("None of the matching items are currently selected.")};let dh=null;function $f(){clearTimeout(dh),dh=setTimeout(()=>{_s("search")},250)}window.onSearchInput=$f;function pt(){let r=bs();const e=Math.max(1,Math.ceil(r.length/vr));Mt>e&&(Mt=e);const t=(Mt-1)*vr,n=r.slice(t,t+vr);let s="";const i='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';n.forEach(a=>{const o=window.normalizeStatus(a.Status);let B=X.includes(a["Serial No"]);const c=getPreviewImageUrl(a),h=getPreviewFallbackImageUrl(a),d=h?`onerror="this.onerror=null;this.src='${h.replace(/'/g,"\\'")}';"`:"";s+=`
      <div class="card ${B?"selected":""} ${o==="marked"?"marked-card":""}" onclick='toggle("${a["Serial No"]}")'>
        <div class="card-media">
          <img src="${c}" loading="lazy" ${d}>
          <div class="select-indicator">${i}</div>
        </div>
        <p class="card-label">${a["Serial No"]}</p>
      </div>
    `}),document.getElementById("grid").innerHTML=s,Vv(r.length),Gv(r.length),Zt(),updateMiniWebsiteModalPreview()}function Gv(r){const e=document.getElementById("gridPageInfo"),t=document.querySelector("#gridPager .pager-btn:first-child"),n=document.querySelector("#gridPager .pager-btn:nth-child(3)"),s=document.getElementById("pageSize");s&&(s.value=String(vr));const i=Math.max(1,Math.ceil(r/vr));e&&(e.textContent=`Page ${Mt} of ${i}`),t&&(t.disabled=Mt<=1),n&&(n.disabled=Mt>=i)}function Jf(r){const e=De.find(t=>t["Serial No"]===r);if(e&&window.normalizeStatus(e.Status)==="marked"){alert("This item is unavailable and cannot be selected.");return}X.includes(r)?X=X.filter(t=>t!==r):X=[...X,r],vB(),Xt(),pt()}function Zt(){let r=document.getElementById("selectedArea");const e=De.filter(o=>X.includes(o["Serial No"])),t=document.getElementById("selectedSummary");t&&(e.length===0?t.textContent="0 items":t.textContent=`${e.length} item${e.length===1?"":"s"}`);const n=document.getElementById("vraiNavCartCount");n&&(n.innerText=e.length);const s=Math.max(1,Math.ceil(e.length/_r));Kt>s&&(Kt=s);const i=(Kt-1)*_r,a=e.slice(i,i+_r);if(!e.length){r.innerHTML='<div class="selection-empty">No items selected. Select items from the inventory to continue.</div>',fh(0);return}r.innerHTML=a.map(o=>{const B=getPreviewImageUrl(o),c=getPreviewFallbackImageUrl(o),h=c?`onerror="this.onerror=null;this.src='${c.replace(/'/g,"\\'")}';"`:"";return`
      <div class="selection-card">
        <button class="remove-btn" onclick="removeFromSelected('${o["Serial No"].replace(/'/g,"\\'")}')" title="Remove from selection">✕</button>
        <div class="card-media">
          <img src="${B}" alt="${o["Serial No"]}" loading="lazy" ${h}>
        </div>
        <p class="card-label">${o["Serial No"]}</p>
      </div>
    `}).join(""),fh(e.length),typeof window.updateMiniWebsiteModalPreview=="function"&&window.updateMiniWebsiteModalPreview()}window.render=pt;window.initFilter=jf;window.renderSelected=Zt;function fh(r){const e=document.getElementById("selectedPageInfo"),t=document.getElementById("selectedPrevBtn"),n=document.getElementById("selectedNextBtn"),s=document.getElementById("selectedPageSize"),i=Math.max(1,Math.ceil(r/_r));s&&(s.value=String(_r)),e&&(e.textContent=`Page ${Kt} of ${i}`),t&&(t.disabled=Kt<=1),n&&(n.disabled=Kt>=i)}function qf(){Mt<=1||(Mt-=1,pt())}function zf(){const r=bs().length,e=Math.max(1,Math.ceil(r/vr));Mt>=e||(Mt+=1,pt())}function Kf(r){const e=Number(r);!Number.isFinite(e)||e<=0||(vr=e,Mt=1,pt())}function Qf(){Kt<=1||(Kt-=1,Zt())}function Wf(){const r=De.filter(t=>X.includes(t["Serial No"])),e=Math.max(1,Math.ceil(r.length/_r));Kt>=e||(Kt+=1,Zt())}function Yf(r){const e=Number(r);!Number.isFinite(e)||e<=0||(_r=e,Kt=1,Zt())}function bs(){const r=document.getElementById("filterStatus"),e=document.getElementById("hideMarked"),t=Wt("type"),n=Wt("brand"),s=r?r.value:"",i=e?e.checked:!1;let a=De.filter(o=>{const B=window.normalizeStatus(o.Status),c=String(o.Type||"").trim(),h=String(o["Brand Name"]||"").trim(),d=String(o["Serial No"]||"").trim(),p=!t.length||t.includes(c),C=!n.length||n.includes(h),m=Ve.find(S=>S.serial===d),I=!!(m&&m.condition==="damaged");return!(!p||!C||I||i&&B==="unavailable"||s==="unavailable"&&B!=="unavailable"||s==="available"&&B==="unavailable"||bl&&!String(o["Serial No"]||"").toUpperCase().includes(bl))});return ha==="serial"?a.sort((o,B)=>String(o["Serial No"]||"").localeCompare(String(B["Serial No"]||""))):ha==="brand"?a.sort((o,B)=>String(o["Brand Name"]||"").localeCompare(String(B["Brand Name"]||""))):ha==="type"&&a.sort((o,B)=>String(o.Type||"").localeCompare(String(B.Type||""))),a}window.goToPrevPage=qf;window.goToNextPage=zf;window.changePageSize=Kf;window.goToPrevSelectedPage=Qf;window.goToNextSelectedPage=Wf;window.changeSelectedPageSize=Yf;async function uo(){if(X.length===0){alert("Please select items to prepare the PDF.");return}X.length>300&&alert("Large export detected. Compact PDF mode will be used to keep generation stable for high item counts."),cs(!0);try{const r=De.filter(s=>X.includes(s["Serial No"]));let e;try{e=await r_(X)}catch(s){console.warn("Server collage failed, using browser fallback",s);const i=oC(X,6);e=[];for(const a of i){const o=De.filter(c=>a.includes(c["Serial No"]));let B=await aC(o);a.length<6&&(B=await lC(B)),e.push(B)}}if(e.length===0)throw new Error("Unable to prepare the PDF pages");const t=e.flatMap(s=>s._missingItems||[]);ve=e,Vf=ve[0],Pr=r,_n="Client Catalogue",DB="selection",Qe=null,await SB();const n=ve.length>1?`${ve.length} pages prepared. `:"";t.length?alert(`${n}PDF ready.

⚠️ ${t.length} item${t.length===1?"":"s"} had no loadable image and show a placeholder:
${t.join(", ")}`):ve.length>1&&alert(`${n}Preview updated.`)}catch(r){console.error(r),alert("Error preparing the PDF. Please try different images.")}finally{cs(!1)}}async function bB(r=!1){var n,s,i;let e=[...me];if(!e.length){const a=document.getElementById("finalTraySearchInput")||document.getElementById("serialBulkInput");if(a&&a.value){const o=a.value.split(/[\s,;\n]+/).map(B=>B.trim()).filter(Boolean);o.length&&(br(o),e=[...me])}}if(!e.length&&Array.isArray(X)&&X.length&&(br(X),e=[...me]),!e.length)try{const a=window.ProjectStore||(typeof Ke<"u"?Ke:null);if(a&&a.getActiveContext){const o=a.getActiveContext();o&&o.project&&Array.isArray(o.project.selectedSerials)&&o.project.selectedSerials.length&&(br(o.project.selectedSerials),e=[...me])}}catch{}if(!Oa(e).length&&(!me||!me.length)){alert("Please select items from the inventory or add serials to the Client Kit first.");return}if(!r){eC(a=>{bB(!0)},r);return}e.length>300&&alert("Large export detected. Compact PDF mode will be used to keep generation stable."),cs(!0),Vn(`Preparing Client Kit PDF for ${e.length} item(s)...`,!1);try{const a=Oa(e);if(!a.length){alert("No matching items found in inventory for the Client Kit serials."),Vn("No matching items found in inventory.",!0);return}const o=oC(a,6),B=[];for(const h of o){let d=await aC(h);h.length<6&&(d=await lC(d)),B.push(d)}if(!B.length)throw new Error("Unable to prepare Client Kit PDF pages");ve=B,Vf=ve[0],Pr=a,_n="Client Kit Catalogue",DB="final-tray",Qe=null,await SB(),Vn(`Done. Client Kit PDF generated for ${a.length} item(s).`,!1),typeof us=="function"&&(us(),typeof tr=="function"&&tr());const c=document.getElementById("finalTrayPostActions");c&&(c.classList.remove("hidden-actions"),c.classList.add("visible-actions"));try{const h=window.ProjectStore||(typeof Ke<"u"?Ke:null),p=(h&&h.getActiveContext?h.getActiveContext():{}).project;if(h&&h.updateProject&&p){const C=new Date().toISOString().split("T")[0],m=p.finalTraySharedDate||C;let I=p.followUpDate;if(!I){const x=new Date(m);x.setDate(x.getDate()+15);const j=x.getFullYear(),q=String(x.getMonth()+1).padStart(2,"0"),W=String(x.getDate()).padStart(2,"0");I=`${j}-${q}-${W}`}let S=p.returnDueDate;if(!S){const x=new Date(m);x.setDate(x.getDate()+7);const j=x.getFullYear(),q=String(x.getMonth()+1).padStart(2,"0"),W=String(x.getDate()).padStart(2,"0");S=`${j}-${q}-${W}`}const F="Waiting for Return";h.updateProject(p.id,{status:F,projectStatus:F,finalTraySharedDate:m,followUpDate:I,returnDueDate:S,selectedSerials:e,productStats:{sent:a.length,returned:0,pending:a.length,missing:0},deliverables:{completed:0,total:5},socialPosting:{status:"Pending",postingDate:""},payment:{invoiceAmount:((n=p.payment)==null?void 0:n.invoiceAmount)||0,amountReceived:((s=p.payment)==null?void 0:s.amountReceived)||0,status:((i=p.payment)==null?void 0:i.status)||"Pending"}})&&typeof window.renderHomepageProjectsGateway=="function"&&window.renderHomepageProjectsGateway()}}catch(h){console.warn("Could not persist final tray project summary",h)}}catch(a){console.error("Error preparing Client Kit PDF:",a),alert("Error preparing Client Kit PDF. Please try again."),Vn("Error preparing Client Kit PDF.",!0)}finally{cs(!1)}}window.generateFinalTrayFromSerials=bB;function Hv(r){const e=String(r||"").replace(/\r/g,`
`).split(/[\n,;]+/).map(n=>n.trim()).filter(Boolean),t=[];return e.forEach(n=>{const s=n.match(/[A-Za-z]+\s*-\s*[A-Za-z0-9]+/g);if(s&&s.length){s.forEach(a=>{const o=Yt(a);o&&t.push(o)});return}const i=Yt(n);i&&t.push(i)}),[...new Set(t)]}function Uv(){const r=document.getElementById("finalTraySearchInput"),e=document.getElementById("serialBulkInput");r&&(r.addEventListener("input",()=>{it=-1,tt()}),r.addEventListener("keydown",t=>{const n=Zf(r.value||"");if(t.key==="ArrowDown"){if(t.preventDefault(),!n.length)return;it=Math.min(it+1,n.length-1),tt();return}if(t.key==="ArrowUp"){if(t.preventDefault(),!n.length)return;it=Math.max(it-1,0),tt();return}if(t.key==="Enter"||t.key===","||t.key===";"){t.preventDefault();const s=it>=0&&n[it]?n[it]:r.value;br([s])>0&&(r.value=""),it=-1,tt()}t.key==="Backspace"&&!r.value&&me.length&&(me=me.slice(0,-1),tt())}),r.addEventListener("blur",()=>{setTimeout(()=>{it=-1,tt()},120)}),r.addEventListener("focus",()=>{tt()}),e&&e.addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key==="Enter"&&(t.preventDefault(),IB())}))}function jv(){const r=[],e=new Set;return De.forEach(t=>{const n=Yt(t["Serial No"]||"");!n||e.has(n)||(e.add(n),r.push(n))}),r}function br(r){const e=Array.isArray(r)?r:[],t=new Set(me);let n=0;return e.forEach(s=>{const i=Yt(s);!i||t.has(i)||(t.add(i),me.push(i),n+=1)}),n>0&&typeof us=="function"&&(us(),typeof tr=="function"&&tr()),n}function Xf(r){const e=Array.isArray(r)?r.filter(Boolean):[];if(!e.length)return 0;let t=[...X];e.forEach(i=>{const a=Yt(i);a&&!t.includes(a)&&t.push(a)}),X=t;const n=br(e);vB(),Xt(),pt(),tt(),updateMiniWebsiteModalPreview(),Vn(`Imported ${e.length} lookbook item${e.length===1?"":"s"} into Client Kit!`,!1);const s=document.getElementById("postCreationShareContainer");return s&&(s.style.display="block"),n}window.importLookbookSelectionToFinalTray=Xf;function $v(r){const e=Yt(r);e&&(me=me.filter(t=>t!==e),Array.isArray(Ve)&&(Ve=Ve.filter(t=>t.serial!==e),typeof tr=="function"&&tr()),tt())}function IB(){const r=document.getElementById("serialBulkInput"),e=Hv(r?r.value:""),t=br(e);r&&t>0&&(r.value=""),t===0&&e.length>0?Vn("All parsed serials are already in the final list.",!1):t>0&&Vn(`Added ${t} code${t===1?"":"s"} to Client Kit list.`,!1),it=-1,tt()}function Zf(r){const e=Yt(r||"");if(!e)return[];const t=me.filter(a=>a.includes(e)),n=new Set(t),i=jv().filter(a=>a.includes(e)&&!n.has(a)&&me.indexOf(a)===-1).slice(0,10);return[...t,...i].slice(0,12)}function TB(r,e=null){if(!r)return{available:!1,reason:"Invalid item",project:null};const t=String(r).trim();if(!t)return{available:!1,reason:"Invalid item",project:null};if(typeof kt<"u"&&kt&&kt.has(t)){const s=kt.get(t);if(String(s.Status||"").toLowerCase()==="missing")return{available:!1,reason:"Marked as Missing",project:null}}const n=window.ProjectStore||(typeof Ke<"u"?Ke:null);if(n&&typeof n.getProjects=="function"){const s=n.getProjects();for(const i of s){if(e&&i.id===e)continue;const a=String(i.projectStatus||i.status||"").toLowerCase(),o=a==="completed"||a==="returned";if(!!i.finalTraySharedDate&&!o&&Array.isArray(i.selectedSerials)&&i.selectedSerials.includes(t)){const c=n.getCelebrityById?n.getCelebrityById(i.celebrityId):null,h=n.getStylistById?n.getStylistById(i.stylistId):null,d=c?c.name:i.title||"Another Project",p=h?h.name:"",C=i.returnDueDate||"";return{available:!1,reason:`Out with ${d}${p?" (Stylist: "+p+")":""}`,project:i,projectTitle:i.title,celebrityName:d,stylistName:p,returnDueDate:C}}}}return{available:!0,reason:"Available",project:null}}window.isProductAvailableForFinalTray=TB;function eC(r,e=!1){if(e){r();return}const t=window.ProjectStore||(typeof Ke<"u"?Ke:null),s=(t&&t.getActiveContext?t.getActiveContext():{}).project,i=s?s.id:null;let a=[...me];if(!a.length&&Array.isArray(X)&&X.length&&(a=[...X]),!a.length&&s&&Array.isArray(s.selectedSerials)&&(a=[...s.selectedSerials]),!a.length){r();return}const o=[],B=[];if(a.forEach(c=>{const h=TB(c,i);if(h.available)o.push(c);else{const d=typeof kt<"u"&&kt?kt.get(c):null,p=d&&(d.Title||d.Name)||c,C=d?d.Brand||(s==null?void 0:s.jewelleryBrand)||"Ascend Fine Jewellery":(s==null?void 0:s.jewelleryBrand)||"Ascend Fine Jewellery";B.push({serial:c,title:p,brand:C,reason:h.reason,projectTitle:h.projectTitle||"Another Project",celebrityName:h.celebrityName||"Client",stylistName:h.stylistName||"",returnDueDate:h.returnDueDate||""})}}),B.length===0){r();return}Jv({activeProject:s,availableSerials:o,unavailableItems:B,onContinueAvailable:()=>{me=[...o],X=[...o],t&&t.updateProjectItems&&i&&t.updateProjectItems(i,o),tt(),r(!0)}})}function Jv({activeProject:r,availableSerials:e,unavailableItems:t,onContinueAvailable:n}){let s=document.getElementById("unavailableProductsModalOverlay");s||(s=document.createElement("div"),s.id="unavailableProductsModalOverlay",s.className="project-modal-overlay",document.body.appendChild(s));const i=t.map(o=>`
    <div style="padding: 12px; border: 1px solid #fecaca; border-radius: 8px; margin-bottom: 10px; background: #fff5f5;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #991b1b;">
          <i class="fa-solid fa-xmark" style="color: #dc2626;"></i> ${ht(o.title)} (${ht(o.serial)})
        </div>
        <span class="prod-badge badge-missing" style="margin: 0; font-size: 0.75rem;">Unavailable</span>
      </div>
      <div style="font-size: 0.82rem; color: #7f1d1d; margin-top: 4px;">
        Brand: <strong>${ht(o.brand)}</strong> &nbsp;|&nbsp; ${ht(o.reason)}
      </div>
      ${o.returnDueDate?`<div style="font-size: 0.8rem; color: #991b1b; margin-top: 2px;"><i class="fa-solid fa-clock"></i> Expected Return: <strong>${formatDateDisplay(o.returnDueDate)}</strong></div>`:""}
    </div>
  `).join(""),a=e.length>0;s.innerHTML=`
    <div class="project-modal-card fashion-theme" style="max-width: 560px; box-sizing: border-box;">
      <div class="project-modal-header" style="background: #fff1f2; border-bottom: 1px solid #fecdd3;">
        <h3 style="color: #9f1239;"><i class="fa-solid fa-triangle-exclamation" style="color: #e11d48;"></i> ${a?"Some Selected Products Are Unavailable":"All Selected Products Are Unavailable"}</h3>
        <button class="btn-close-modal" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'">&times;</button>
      </div>

      <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
        <p style="margin: 0 0 14px 0; font-size: 0.88rem; color: #44403c;">
          ${a?`<strong>${t.length}</strong> of your selected products are currently committed to other active projects and cannot be included in a new Client Kit:`:"No selected products are currently available for Client Kit sharing:"}
        </p>

        ${i}

        ${a?`
          <div style="padding: 10px 14px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin-top: 14px; color: #166534; font-size: 0.86rem; font-weight: 600;">
            <i class="fa-solid fa-check" style="color: #16a34a;"></i> ${e.length} product(s) are available and ready to be shared.
          </div>
        `:""}
      </div>

      <div class="project-modal-footer" style="padding: 14px 20px; display: flex; flex-direction: column; gap: 10px; background: #fafaf9; border-top: 1px solid #e7e5e4;">
        <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
          <button class="btn-qa btn-qa-secondary" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'">Cancel</button>

          <button class="btn-qa btn-qa-secondary" style="border-color: #d4af37; color: #854d0e; background: #fefce8;" onclick="window.handleGenerateUnavailablePdfClick()">
            <i class="fa-solid fa-file-pdf"></i> Generate Unavailable PDF
          </button>

          ${a?`
            <button class="btn-qa btn-qa-primary" onclick="document.getElementById('unavailableProductsModalOverlay').style.display='none'; window._onContinueAvailableAction();">
              <i class="fa-solid fa-arrow-right"></i> Continue with ${e.length} Available
            </button>
          `:""}
        </div>
      </div>
    </div>
  `,window._onContinueAvailableAction=n,window._lastUnavailableModalData={activeProject:r,unavailableItems:t},s.style.display="flex"}window.handleGenerateUnavailablePdfClick=async function(){const r=window._lastUnavailableModalData;if(!r||!r.unavailableItems||!r.unavailableItems.length)return;const e=await qv(r.activeProject,r.unavailableItems);if(!e||!e.blob)return;Ni(e.blob,e.fileName);const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),n=r.activeProject?r.activeProject.title:"Jewellery Curation",s=encodeURIComponent(`📄 *PRODUCT AVAILABILITY UPDATE — ${n.toUpperCase()}*
Document File: ${e.fileName}

Some requested pieces are currently unavailable with other projects. Please see the attached PDF for details.`),i=t?`https://api.whatsapp.com/send?text=${s}`:`https://web.whatsapp.com/send?text=${s}`;if(navigator.canShare){const a=new File([e.blob],e.fileName,{type:"application/pdf"});if(navigator.canShare({files:[a]}))try{await navigator.share({files:[a],title:"Unavailable Products Update",text:`📄 Unavailable Products Update - ${n}`});return}catch{}}ho(i)};async function qv(r,e){const t=window.jspdf&&window.jspdf.jsPDF;if(!t)return alert("PDF generator library is loading. Please try again."),null;const n=new t({orientation:"portrait",unit:"pt",format:"a4"}),s=n.internal.pageSize.getWidth(),i=n.internal.pageSize.getHeight(),a=36;n.setFillColor(24,24,27),n.rect(0,0,s,75,"F"),n.setFillColor(212,175,55),n.rect(0,75,s,4,"F"),n.setFont("helvetica","bold"),n.setFontSize(18),n.setTextColor(255,255,255),n.text("PRODUCT AVAILABILITY UPDATE",a,42),n.setFontSize(9),n.setFont("helvetica","normal"),n.setTextColor(212,175,55),n.text("ASCEND HIGH JEWELRY CURATION",a,58);const o=r?r.title:"Jewellery Curation",B=formatDateDisplay(new Date().toISOString().split("T")[0]);let c=105;n.setFontSize(11),n.setFont("helvetica","bold"),n.setTextColor(24,24,27),n.text(`Project: ${o}`,a,c),n.setFontSize(9.5),n.setFont("helvetica","normal"),n.setTextColor(115,115,115),c+=16,n.text(`Generated Date: ${B}   |   Total Excluded Items: ${e.length}`,a,c),c+=24,n.setFillColor(245,245,244),n.rect(a,c,s-a*2,24,"F"),n.setDrawColor(231,229,228),n.rect(a,c,s-a*2,24,"S"),n.setFont("helvetica","bold"),n.setFontSize(9),n.setTextColor(24,24,27),n.text("Serial Code",a+10,c+15),n.text("Product Details",a+110,c+15),n.text("Availability Status",a+280,c+15),n.text("Expected Return",a+440,c+15),c+=24,e.forEach((p,C)=>{c>i-60&&(n.addPage(),c=40);const m=C%2===0?[255,255,255]:[250,250,249];n.setFillColor(m[0],m[1],m[2]),n.rect(a,c,s-a*2,36,"F"),n.setDrawColor(240,238,237),n.rect(a,c,s-a*2,36,"S"),n.setFont("helvetica","bold"),n.setFontSize(8.5),n.setTextColor(24,24,27),n.text(String(p.serial),a+10,c+21),n.setFont("helvetica","normal"),n.setFontSize(8.5);const I=String(p.title).length>28?String(p.title).substring(0,26)+"...":String(p.title);n.text(I,a+110,c+15),n.setFontSize(7.5),n.setTextColor(120,113,108),n.text(`Brand: ${p.brand}`,a+110,c+27),n.setFontSize(8.5),n.setTextColor(180,83,9),n.text(p.reason,a+280,c+21),n.setTextColor(87,83,78);const S=p.returnDueDate?formatDateDisplay(p.returnDueDate):"Pending";n.text(S,a+440,c+21),c+=36}),c+=20,c<i-40&&(n.setFontSize(8),n.setFont("helvetica","italic"),n.setTextColor(168,162,158),n.text("This document is an inventory availability notice. Available pieces will be shared in a separate Client Kit.",a,c));const h=n.output("blob"),d=`Unavailable_Products_${String(o).replace(/[^a-zA-Z0-9_-]/g,"_")}_${new Date().toISOString().split("T")[0]}.pdf`;return{blob:h,fileName:d}}function tt(){const r=document.getElementById("finalTrayList"),e=document.getElementById("finalTrayListMeta"),t=document.getElementById("finalTraySearchInput"),n=document.getElementById("finalTraySuggestions");if(!r||!e||!n||!t)return;if(e.textContent=`${me.length} code${me.length===1?"":"s"} in Client Kit list`,!me||me.length===0)r.innerHTML='<span class="panel-meta">0 items</span>';else{const i=new Map,a=window.ProjectStore||(typeof Ke<"u"?Ke:null),o=a&&a.getActiveContext?a.getActiveContext():{},B=o.project?o.project.id:null;Array.isArray(window.data)&&window.data.length>0&&window.data.forEach(c=>{const h=Yt(c["Serial No"]||"");h&&!i.has(h)&&i.set(h,c)}),r.innerHTML=me.map(c=>{const h=Yt(c),d=i.get(h),p=TB(c,B),C=!p.available;if(d){const m=typeof window.getPreviewImageUrl=="function"?window.getPreviewImageUrl(d):d.image||d["Image URL"]||"",I=typeof window.getPreviewFallbackImageUrl=="function"?window.getPreviewFallbackImageUrl(d):"",S=I?`onerror="this.onerror=null;this.src='${I.replace(/'/g,"\\'")}';"`:`onerror="this.onerror=null;this.classList.add('img-error');"`,F=d.Title||d.Name||d["Serial No"]||c,L=d.Brand||d.Category||d.Type||"Piece",x=d.Price||d.MRP||"",j=x?`₹${x}`:"",q=j?`<div class="ft-card-footer"><span class="ft-card-price">${ht(j)}</span></div>`:"",W=C?`<span class="ft-card-badge ft-badge-unavailable" title="${ht(p.reason)}"><i class="fa-solid fa-triangle-exclamation"></i> Unavailable</span>`:'<span class="ft-card-badge ft-badge-available"><i class="fa-solid fa-circle-check"></i> Available</span>';return`
          <div class="final-tray-card ${C?"ft-card-disabled":""}">
            <button type="button" class="final-tray-card-remove" data-serial="${ht(c)}" title="Remove ${ht(c)}">✕</button>
            <div class="ft-card-media">
              <img src="${m}" alt="${ht(F)}" loading="lazy" ${S}>
            </div>
            <div class="ft-card-info">
              <div class="ft-card-header">
                <span class="ft-card-category">${ht(L)}</span>
                ${W}
              </div>
              <h4 class="ft-card-title">${ht(F)}</h4>
              ${q}
            </div>
          </div>
        `}else{const m=C?`<span class="ft-card-badge ft-badge-unavailable" title="${ht(p.reason)}"><i class="fa-solid fa-triangle-exclamation"></i> Unavailable</span>`:'<span class="ft-card-badge ft-badge-unknown"><i class="fa-solid fa-code"></i> Code Item</span>';return`
          <div class="final-tray-card ft-card-custom ${C?"ft-card-disabled":""}">
            <button type="button" class="final-tray-card-remove" data-serial="${ht(c)}" title="Remove ${ht(c)}">✕</button>
            <div class="ft-card-media ft-custom-media">
              <i class="fa-solid fa-box-archive"></i>
            </div>
            <div class="ft-card-info">
              <div class="ft-card-header">
                <span class="ft-card-category">Custom Code</span>
                ${m}
              </div>
              <h4 class="ft-card-title">${ht(c)}</h4>
            </div>
          </div>
        `}}).join(""),r.querySelectorAll(".final-tray-card-remove").forEach(c=>{c.addEventListener("click",()=>{$v(c.getAttribute("data-serial")||"")})})}const s=Zf(t.value||"");if(!s.length||document.activeElement!==t){n.classList.add("hidden"),n.innerHTML="";return}it>=s.length&&(it=s.length-1),n.innerHTML=s.map((i,a)=>`
    <button type="button" class="final-tray-suggestion ${a===it?"active":""}" data-serial="${i}">${i}</button>
  `).join(""),n.querySelectorAll(".final-tray-suggestion").forEach((i,a)=>{i.addEventListener("mouseenter",()=>{it=a,tt()}),i.addEventListener("mousedown",o=>{o.preventDefault();const B=i.getAttribute("data-serial")||"";br([B])>0&&(t.value=""),it=-1,tt()})}),n.classList.remove("hidden")}function Yt(r){return String(r||"").replace(/[\u200B-\u200D\uFEFF]/g,"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"")}function Oa(r){const e=new Map;De.forEach(i=>{const a=Yt(i["Serial No"]||"");a&&e.set(a,i)});const t=[...e.keys()],n=[],s=new Set;return r.forEach(i=>{const a=Yt(i);if(!a)return;let o=e.get(a);if(!o){const B=t.filter(c=>c.endsWith(a));B.length===1&&(o=e.get(B[0]))}if(o){const B=String(o["Serial No"]||"");s.has(B)||(s.add(B),n.push(o))}}),n}function zv(){var B,c;const r=((B=document.getElementById("filterBrand"))==null?void 0:B.value)||"",e=((c=document.getElementById("filterType"))==null?void 0:c.value)||"",n=bs().filter(h=>window.normalizeStatus(h.Status)!=="unavailable");if(n.length===0){alert("No available items match these filters.");return}let s=0;const i=[...X];n.forEach(h=>{const d=h["Serial No"];i.includes(d)||(i.push(d),s++)}),s>0&&(X=i),pt(),Xt();const a=[r,e].filter(Boolean),o=a.length>0?a.join(" "):"matching";alert(s===0?`All ${o} items are already in your selection.`:`Added ${s} ${o} item${s===1?"":"s"} to selection.`)}function Kv(r){X=X.filter(e=>e!==r),Xt(),Zt()}function tC(){if(X.length===0){alert("No items selected.");return}confirm(`Clear all ${X.length} selected items?`)&&(X=[],Xt(),Zt())}function nC(){const r=X.filter(e=>{const t=kt.get(e);return t&&window.normalizeStatus(t.Status)==="unavailable"});if(r.length===0){alert("No unavailable items in selection.");return}confirm(`Remove ${r.length} unavailable item(s)?`)&&(X=X.filter(e=>{const t=kt.get(e);return!(t&&window.normalizeStatus(t.Status)==="unavailable")}),Xt(),Zt())}window.removeFromSelected=Kv;window.clearAllSelected=tC;window.removeMarkedFromSelected=nC;window.addBulkSerialsToFinalTray=IB;function Vn(r,e){const t=document.getElementById("serialFeedback");t.textContent=r,t.style.color=e?"#b42318":"#155724"}function rC(){const r=document.getElementById("pdfMeta");if(r){if(!ve.length){r.textContent="No PDF generated yet";return}r.textContent=`${_n} · ${ve.length} page${ve.length===1?"":"s"} · ${Pr.length} code${Pr.length===1?"":"s"}`}}function sC(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)}function Qv(){if(!Qe){alert("Please generate a PDF first.");return}window.open(Ft,"_blank","noopener,noreferrer")||(window.location.href=Ft)}window.openPdfPreview=Qv;let Il=[];function iC(){Il.forEach(r=>URL.revokeObjectURL(r)),Il=[]}function Ch(r,e){const t=document.getElementById(r);if(t){if(!e||!e.length){t.innerHTML="",t.classList.add("hidden");return}t.innerHTML=e.map((n,s)=>{const i=URL.createObjectURL(n);return Il.push(i),`
      <div class="pdf-page-preview-wrapper">
        <div class="pdf-page-badge"><i class="fa-solid fa-file-lines"></i> Page ${s+1} of ${e.length}</div>
        <img src="${i}" alt="PDF Page ${s+1}" class="pdf-page-image" onclick="window.openPdfPreview()" title="Click to view full PDF" />
      </div>
    `}).join(""),t.classList.remove("hidden")}}function Wv(){const r=document.getElementById("pdfPreviewFrame"),e=document.getElementById("previewPlaceholder"),t=document.getElementById("pdfVisualPagesPreview"),n=document.getElementById("finalTrayVisualPagesPreview"),s=document.getElementById("finalTrayPreviewPanel"),i=document.getElementById("mobilePdfPreviewAction"),a=document.getElementById("postCreationShareContainer");Ft&&(URL.revokeObjectURL(Ft),Ft=""),iC(),Qe=null,r&&(r.removeAttribute("src"),r.classList.remove("visible")),t&&(t.innerHTML="",t.classList.add("hidden")),n&&(n.innerHTML="",n.classList.add("hidden")),s&&s.classList.add("hidden"),e&&(e.classList.remove("hidden"),e.innerHTML="<strong>Generate a PDF to preview it here.</strong><span>The preview will update after a selection or final tray PDF is created.</span>"),i&&i.classList.add("hidden"),a&&(a.style.display="none"),rC()}function Yv(r){const e=document.getElementById("pdfPreviewFrame"),t=document.getElementById("previewPlaceholder"),n=document.getElementById("mobilePdfPreviewAction"),s=document.getElementById("postCreationShareContainer"),i=sC();Ft&&URL.revokeObjectURL(Ft),Qe=r,Ft=URL.createObjectURL(r),iC(),Ch("pdfVisualPagesPreview",ve),Ch("finalTrayVisualPagesPreview",ve);const a=document.getElementById("finalTrayPreviewPanel");if(a&&ve&&ve.length>0){a.classList.remove("hidden");const o=document.getElementById("finalTrayPdfMeta");o&&(o.textContent=`${_n||"Kit"} · ${ve.length} page${ve.length===1?"":"s"} · ${Pr?Pr.length:0} items`)}e&&(i?(e.removeAttribute("src"),e.classList.remove("visible")):(e.src=Ft,e.classList.add("visible"))),t&&t.classList.add("hidden"),n&&n.classList.remove("hidden"),s&&(s.style.display="block"),rC()}function Xv(r,e,t,n){const s=document.getElementById("pdfPreviewFrame"),i=document.getElementById("previewPlaceholder"),a=document.getElementById("mobilePdfPreviewAction"),o=document.getElementById("postCreationShareContainer"),B=document.getElementById("pdfMeta"),c=sC();Ft&&URL.revokeObjectURL(Ft),Qe=r,Ft=URL.createObjectURL(r),s&&(c?(s.removeAttribute("src"),s.classList.remove("visible")):(s.src=Ft,s.classList.add("visible"))),i&&i.classList.add("hidden"),a&&a.classList.remove("hidden"),o&&(o.style.display="block"),B&&(B.textContent=`Client Lookbook · ${t.name||"Valued Client"} · ${n} piece${n===1?"":"s"}`)}window.setHtmlLookbookPreview=Xv;async function SB(){if(!ve.length)return Wv(),null;if(!window.JewelleryPdf||typeof window.JewelleryPdf.buildPdfBlob!="function")throw new Error("PDF builder not loaded");const r=await window.JewelleryPdf.buildPdfBlob({pageBlobs:ve,items:Pr,title:_n});return Yv(r),r}async function La(){return Qe||SB()}function AB(){return`${String(_n||"Jewellery PDF").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"jewellery-pdf"}.pdf`}async function ka(){if(!ve.length){alert("Generate a PDF first.");return}try{const r=await La();Ni(r,AB())}catch(r){console.error(r),alert("Unable to build PDF. Please try again.")}}function Zv(){if(!Qe&&!ve.length){alert("Generate a PDF first.");return}const r=Qe||null;if(r){Ni(r,AB());return}ka()}async function e_(r=[]){const e=(r&&r.length?r:[...me]).map(t=>String(t||"").trim()).filter(Boolean);if(!e.length)return{ok:!1,updatedCount:0,missingSerials:[],skipped:!0};try{const t=await i_(e),n=Number(t&&t.updatedCount?t.updatedCount:0),s=Array.isArray(t&&t.missingSerials)?t.missingSerials:[],i=Oa(e);i.forEach(a=>{const o=String(a["Serial No"]||"").trim();if(!o)return;a.Status="Marked & Delivered";const B=kt.get(o);B&&(B.Status="Marked & Delivered")}),X=X.filter(a=>{const o=kt.get(a);return o&&window.normalizeStatus(o.Status)!=="unavailable"});try{const a=Ke,B=(a&&a.getActiveContext?a.getActiveContext():{}).project;if(a&&a.updateProject&&B){const c=new Date().toISOString().split("T")[0],h=B.finalTraySharedDate||c;let d=B.followUpDate;if(!d){const C=new Date(h);C.setDate(C.getDate()+15);const m=C.getFullYear(),I=String(C.getMonth()+1).padStart(2,"0"),S=String(C.getDate()).padStart(2,"0");d=`${m}-${I}-${S}`}a.updateProject(B.id,{status:"Delivered",projectStatus:"Delivered",finalTraySharedDate:h,followUpDate:d,returnDueDate:B.returnDueDate||c,productStats:{sent:i.length,returned:i.length,pending:0,missing:s.length},deliverables:{completed:5,total:5}})&&typeof window.renderHomepageProjectsGateway=="function"&&window.renderHomepageProjectsGateway()}}catch(a){console.warn("Could not update project state after Client Kit share",a)}return pt(),tt(),Xt(),updateMiniWebsiteModalPreview(),us(),{ok:!0,updatedCount:n,missingSerials:s}}catch(t){return console.warn("Could not mark final tray items as delivered",t),{ok:!1,updatedCount:0,missingSerials:[],error:t&&t.message?t.message:String(t)}}}async function t_(){try{if(!Qe&&(!ve||ve.length===0))if(Array.isArray(X)&&X.length>0)await uo();else if(Array.isArray(me)&&me.length>0)typeof window.generateFinalTrayFromSerials=="function"&&await window.generateFinalTrayFromSerials();else{alert("Please select items from the inventory grid first to export a PDF.");return}await fo()}catch(r){console.error("Error in exportAndSharePdfToWhatsApp:",r),alert("Unable to export PDF: "+(r.message||r))}}function ho(r){try{window.open(r,"_blank","width=700,height=800,noopener,noreferrer")||(window.location.href=r)}catch{window.location.href=r}}async function fo(r=!1){if(!r){eC(h=>{fo(!0)},r);return}const e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),t="[shareCurrentPdf]";let n=null;console.log(t,"start",{isMobile:e,hasCanShare:!!navigator.canShare,selectedCount:Array.isArray(X)?X.length:0,hasLastPdfBlob:!!Qe,collageCount:Array.isArray(ve)?ve.length:0}),navigator.canShare||(console.log(t,"opening fallback popup before share"),n=window.open("about:blank","_blank","width=700,height=800,noopener,noreferrer"));let s=Qe;if(!s&&ve&&ve.length)try{console.log(t,"rebuilding PDF blob from existing collage pages"),cs(!0),s=await La(),console.log(t,"rebuild success",{hasPdfBlob:!!s})}catch(h){console.error(t,"rebuild failed",h)}finally{cs(!1)}if(!s&&Array.isArray(X)&&X.length>0)try{console.log(t,"generating selection PDF for sharing"),await uo(),s=Qe,console.log(t,"selection PDF generation complete",{hasPdfBlob:!!s})}catch(h){console.error(t,"selection PDF generation failed",h)}if(!s){n&&n.close(),Array.isArray(X)&&X.length>0?alert("The PDF is still being prepared. Please wait a moment and try again."):alert("Please select items first, then tap Share PDF via WhatsApp again.");return}if(DB==="final-tray"||Array.isArray(me)&&me.length>0){console.log(t,"marking final tray items as delivered before WhatsApp share");const h=await e_();h&&h.ok&&Vn(`Marked ${h.updatedCount||me.length} item(s) as delivered.`,!1)}const a=AB(),o=new File([s],a,{type:"application/pdf"});if(console.log(t,"prepared file",{fileName:a,size:o.size,type:o.type}),navigator.canShare&&navigator.canShare({files:[o]})){console.log(t,"attempting native Web Share API"),n&&n.close();try{await navigator.share({files:[o],title:_n||"Jewellery PDF Catalogue",text:`📄 ${_n||"Jewellery PDF Catalogue"}`}),console.log(t,"native share success");return}catch(h){if(console.log(t,"native share aborted or failed",h),h&&h.name==="AbortError")return}}console.log(t,"falling back to download + WhatsApp composer"),Ni(s,a);const B=encodeURIComponent(`📄 *${(_n||"ASCEND HIGH JEWELRY CURATION PDF").toUpperCase()}*
Document File: ${a}

The PDF preview catalogue has been downloaded to your device. Please attach it using the 📎 paperclip icon to send.`),c=e?`https://api.whatsapp.com/send?text=${B}`:`https://web.whatsapp.com/send?text=${B}`;console.log(t,"opening WhatsApp URL",{waUrl:c,isMobile:e}),n&&!n.closed?(n.location.href=c,n.focus()):ho(c)}async function n_(){return!Qe&&!ve.length&&(typeof window.generateFinalTrayFromSerials=="function"&&me&&me.length>0?await window.generateFinalTrayFromSerials():X&&X.length>0&&await uo()),fo()}function Ni(r,e){const t=URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=e,n.style.display="none",document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>{URL.revokeObjectURL(t)},2e3)}function cs(r){document.getElementById("spinner").classList.toggle("hidden",!r)}async function r_(r){const e=await fetch(hs,{method:"POST",body:JSON.stringify({action:"buildAllCollages",selected:r})});if(!e.ok)throw new Error(`Server returned ${e.status}`);const t=await e.json();if(!t.ok||!Array.isArray(t.pages)||t.pages.length===0)throw new Error(t.error||"Invalid server collage response");const n=[];for(const s of t.pages){if(!s.base64)continue;if(s.debug&&s.debug.insertedImages===0)throw new Error("Server could not insert any images on a page");const i=o_(s.base64,s.mimeType||"image/png");if(await a_(i))throw new Error("Server returned a blank/white collage page");n.push(i)}if(n.length===0)throw new Error("Server returned no valid collage pages");return n}async function s_(r){const e=`srv-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;$t("server:request",{requestId:e,action:"buildAndMarkFinalTray",serialCount:r.length,serialPreview:r.slice(0,8)});const t=await fetch(hs,{method:"POST",body:JSON.stringify({action:"buildAndMarkFinalTray",serials:r})});if($t("server:http",{requestId:e,ok:t.ok,status:t.status,statusText:t.statusText}),!t.ok)throw new Error(`Server returned ${t.status}`);const n=await t.text();$t("server:raw",{requestId:e,length:n.length,preview:n.slice(0,260)});let s;try{s=JSON.parse(n)}catch(i){throw $t("server:parse-error",{requestId:e,message:i&&i.message?i.message:String(i)}),new Error("Server returned invalid JSON")}return $t("server:payload",{requestId:e,ok:!!s.ok,pageCount:Array.isArray(s.pages)?s.pages.length:0,updatedCount:Number(s.updatedCount||0),missingCount:Array.isArray(s.missingSerials)?s.missingSerials.length:0,error:s.error||""}),s}async function i_(r){const e=`mark-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;$t("server:mark-only:request",{requestId:e,action:"markFinalTrayOnly",serialCount:r.length,serialPreview:r.slice(0,8)});const t=await fetch(hs,{method:"POST",body:JSON.stringify({action:"markFinalTrayOnly",serials:r})});if($t("server:mark-only:http",{requestId:e,ok:t.ok,status:t.status,statusText:t.statusText}),!t.ok)throw new Error(`Server returned ${t.status}`);const n=await t.text();$t("server:mark-only:raw",{requestId:e,length:n.length,preview:n.slice(0,260)});let s;try{s=JSON.parse(n)}catch(o){throw $t("server:mark-only:parse-error",{requestId:e,message:o&&o.message?o.message:String(o)}),new Error("Server returned invalid JSON")}$t("server:mark-only:payload",{requestId:e,ok:!!s.ok,updatedCount:Number(s.updatedCount||0),missingCount:Array.isArray(s.missingSerials)?s.missingSerials.length:0,error:s.error||""});const i=String(s&&s.error?s.error:"");if(!s.ok&&/(unsupported|unknown|invalid|action)/i.test(i)){$t("server:mark-only:fallback-legacy",{requestId:e,error:i});const o=await s_(r);return{ok:!!o.ok,updatedCount:Number(o.updatedCount||0),missingSerials:Array.isArray(o.missingSerials)?o.missingSerials:[],error:o.error||""}}return s}async function a_(r){return new Promise(e=>{const t=URL.createObjectURL(r),n=new Image;n.onload=()=>{try{const s=Math.max(1,Math.min(400,n.width)),i=Math.max(1,Math.min(400,n.height)),a=document.createElement("canvas");a.width=s,a.height=i;const o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(n,0,0,s,i);const B=o.getImageData(0,0,s,i).data;let c=0,h=0;const d=10;for(let p=0;p<B.length;p+=4*d){const C=B[p],m=B[p+1],I=B[p+2];h++,C>245&&m>245&&I>245&&c++}URL.revokeObjectURL(t),e(c/h>.99)}catch{URL.revokeObjectURL(t),e(!1)}},n.onerror=()=>{URL.revokeObjectURL(t),e(!1)},n.src=t})}function o_(r,e){const t=atob(r),n=t.length,s=new Uint8Array(n);for(let i=0;i<n;i++)s[i]=t.charCodeAt(i);return new Blob([s],{type:e})}function l_(r){return new Promise((e,t)=>{const n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>t(new Error(`Failed to load image: ${r}`)),n.src=r})}async function B_(r){const e=buildImageSourceCandidates(r,!0),t=[];for(const n of e)try{return await l_(n)}catch{t.push(n)}throw console.warn(`[${r["Serial No"]}] All image sources failed (${t.length} tried):`,t),new Error(`Image not found for ${r["Serial No"]}`)}function ph(r,e,t,n,s,i){r.beginPath(),r.moveTo(e+i,t),r.lineTo(e+n-i,t),r.quadraticCurveTo(e+n,t,e+n,t+i),r.lineTo(e+n,t+s-i),r.quadraticCurveTo(e+n,t+s,e+n-i,t+s),r.lineTo(e+i,t+s),r.quadraticCurveTo(e,t+s,e,t+s-i),r.lineTo(e,t+i),r.quadraticCurveTo(e,t,e+i,t),r.closePath()}async function aC(r){const h=document.createElement("canvas");h.width=1240,h.height=1371;const d=h.getContext("2d");d.fillStyle="#ffffff",d.fillRect(0,0,1240,1371);const p=[],C=await Promise.all(r.map(async m=>{try{return{id:m["Serial No"],image:await B_(m)}}catch{return p.push(m["Serial No"]),{id:m["Serial No"],image:null}}}));for(let m=0;m<6;m++){const I=m%2,S=Math.floor(m/2),F=I*620,L=S*457,x=C[m];if(d.save(),d.beginPath(),d.rect(F,L,620,421),d.clip(),x&&x.image){const j=x.image,q=14,W=620-q*2,_=421-q*2,E=Math.max(W/j.width,_/j.height),y=j.width*E,b=j.height*E,T=F+q+(W-y)/2,R=L+q+(_-b)/2;d.drawImage(j,T,R,y,b)}else d.fillStyle="#f0ebe4",d.fillRect(F,L,620,421),x&&(d.fillStyle="#999999",d.font="bold 18px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText("Image unavailable",F+620/2,L+421/2));d.restore(),d.save(),ph(d,F,L,620,457,10),d.clip(),d.fillStyle="#1f2431",d.fillRect(F,L+421,620,36),d.restore(),x&&(d.fillStyle="#ffffff",d.font="bold 22px 'Arial'",d.textAlign="center",d.textBaseline="middle",d.fillText(String(x.id||""),F+620/2,L+421+36/2)),d.save(),d.strokeStyle="#d8c8b8",d.lineWidth=1.5,ph(d,F+.75,L+.75,620-1.5,457-1.5,10),d.stroke(),d.restore()}return new Promise((m,I)=>{h.toBlob(S=>{if(!S){I(new Error("Unable to build collage blob"));return}S._missingItems=p,m(S)},"image/png",.96)})}function oC(r,e){const t=[];for(let n=0;n<r.length;n+=e)t.push(r.slice(n,n+e));return t}async function lC(r){return new Promise(e=>{const t=URL.createObjectURL(r),n=new Image;n.onload=()=>{try{const s=document.createElement("canvas");s.width=n.width,s.height=n.height;const i=s.getContext("2d",{willReadFrequently:!0});i.drawImage(n,0,0);const a=i.getImageData(0,0,s.width,s.height).data,o=x=>{const j=a[x],q=a[x+1],W=a[x+2];return a[x+3]<10||j>245&&q>245&&W>245},B=x=>{for(let j=0;j<s.width;j++){const q=(x*s.width+j)*4;if(!o(q))return!0}return!1},c=x=>{for(let j=0;j<s.height;j++){const q=(j*s.width+x)*4;if(!o(q))return!0}return!1};let h=0;for(;h<s.height&&!B(h);)h++;let d=s.height-1;for(;d>=0&&!B(d);)d--;let p=0;for(;p<s.width&&!c(p);)p++;let C=s.width-1;for(;C>=0&&!c(C);)C--;if(URL.revokeObjectURL(t),p>=C||h>=d){e(r);return}const m=8;p=Math.max(0,p-m),h=Math.max(0,h-m),C=Math.min(s.width-1,C+m),d=Math.min(s.height-1,d+m);const I=C-p+1,S=d-h+1,F=document.createElement("canvas");F.width=I,F.height=S,F.getContext("2d").drawImage(s,p,h,I,S,0,0,I,S),F.toBlob(x=>{e(x||r)},"image/png",.95)}catch{URL.revokeObjectURL(t),e(r)}},n.onerror=()=>{URL.revokeObjectURL(t),e(r)},n.src=t})}function PB(){let r=document.getElementById("floatingSelectionBar");r||(r=document.createElement("div"),r.id="floatingSelectionBar",r.className="floating-selection-bar",document.body.appendChild(r));const e=document.getElementById("browseTab"),t=e&&e.classList.contains("active");if(X.length===0||!t){r.style.display="none";return}r.style.display="flex",r.innerHTML=`
    <div class="fsb-info">
      <i class="fa-solid fa-gem"></i> <strong>${X.length}</strong> Piece${X.length===1?"":"s"} Selected
    </div>
    <button class="fsb-btn-proceed" onclick="switchTab('selected')">
      Proceed to Export &amp; Share <i class="fa-solid fa-arrow-right"></i>
    </button>
  `}async function c_(){if(X.length===0){alert("Please select at least 1 item to share.");return}const{celebrity:r,project:e,stylist:t}=Cn(),n=De.filter(h=>X.includes(h["Serial No"])),s=r?r.name:"Celebrity",i=t?t.name:"Stylist",a=e?e.title:"Curation Pull",o=`${s.replace(/[^a-zA-Z0-9]/g,"_")}_Curation.pdf`;if(Qe&&navigator.canShare)try{const h=new File([Qe],o,{type:"application/pdf"});if(navigator.canShare({files:[h]})){await navigator.share({files:[h],title:`${s} Lookbook - ${a}`,text:`✨ ASCEND ATELIER CURATION
📁 Project: ${a}
👑 Celebrity: ${s}
👤 Stylist: ${i}`}),console.log("[WebShare] Direct PDF file shared successfully!");return}}catch(h){if(h.name!=="AbortError")console.warn("[WebShare] Native share failed, falling back to Web WhatsApp",h);else return}typeof ka=="function"&&Qe&&ka();let B=`✨ *ASCEND ATELIER CURATION PDF*
`;B+=`---------------------------
`,B+=`📁 *Project:* ${a}
`,B+=`👑 *Celebrity:* ${s}
`,B+=`👤 *Stylist:* ${i}
`,B+=`💎 *Total Selected Pieces:* ${n.length}

`,B+=`📄 *PDF Document:* Attached below (${o})

`,B+=`*Curated Piece Serials:*
`,n.slice(0,10).forEach((h,d)=>{B+=`${d+1}. ${h["Serial No"]} (${h.Type||"Jewellery"})
`}),n.length>10&&(B+=`...and ${n.length-10} more pieces.
`),B+=`
Ascend High Jewelry Studio`;const c=`https://web.whatsapp.com/send?text=${encodeURIComponent(B)}`;ho(c),alert(`✅ PDF downloaded as "${o}".

WhatsApp Web has been opened. Please click the 📎 (Paperclip / Attachment) icon in WhatsApp to attach the downloaded PDF file.`)}function u_(r){return r?r.returnStatus==="received"?"Received":r.returnStatus==="missing"?"Missing":"Pending Return":"Pending Return"}function h_(r){return r&&r.condition==="damaged"?"Damaged":"Good"}function BC(){const r=Ve.length,e=Ve.filter(i=>i.returnStatus==="received").length,t=Ve.filter(i=>i.returnStatus==="pending").length,n=Ve.filter(i=>i.returnStatus==="missing").length,s=Ve.filter(i=>i.condition==="damaged").length;return{total:r,received:e,pending:t,missing:n,damaged:s}}function cC(){const r=document.getElementById("returnSummaryCards");if(!r)return;const e=BC();r.innerHTML=[{label:"Total Sent",value:e.total},{label:"Received",value:e.received},{label:"Pending",value:e.pending},{label:"Missing",value:e.missing},{label:"Damaged",value:e.damaged}].map(t=>`
    <div class="return-summary-card">
      <strong>${t.value}</strong>
      <span>${t.label}</span>
    </div>
  `).join("")}function uC(){const r=document.getElementById("returnProductsList");if(!r)return;const e=Ve.filter(t=>{const n=(Gf||"").trim().toUpperCase();return n?[t.serial,t.name,t.code,t.category].some(s=>String(s||"").toUpperCase().includes(n)):!0});if(!Ve||Ve.length===0){r.innerHTML='<div class="selection-empty">No return products loaded yet. Load from the Client Kit to begin.</div>',document.getElementById("returnSummaryCards").innerHTML="";return}r.innerHTML=e.map(t=>{const n=u_(t),s=h_(t),i=t.returnStatus==="received"?"received":t.returnStatus==="missing"?"missing":"pending",a=t.condition==="damaged"?"damaged":"good",o=t.image||"";return`
      <div class="return-product-card ${t.returnStatus==="received"?"is-received":""} ${t.condition==="damaged"?"is-damaged":""}">
        <img src="${o}" alt="${t.name||t.serial}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=400&q=80';">
        <div class="return-product-meta">
          <div class="return-product-title">${t.name||t.serial}</div>
          <div class="return-product-subtext">Code: ${t.code||t.serial}</div>
          <div class="return-product-subtext">Category: ${t.category||"—"}</div>
          <div class="return-product-subtext">Quantity Sent: ${t.quantity||1}</div>
          <div class="return-product-badges">
            <span class="return-status-pill ${i}">${n}</span>
            <span class="return-condition-pill ${a}">${s}</span>
          </div>
        </div>
        <div class="return-product-actions">
          <select data-serial="${t.serial}" onchange="window.updateReturnProductStatus('${t.serial}', this.value)">
            <option value="pending" ${t.returnStatus==="pending"?"selected":""}>Pending Return</option>
            <option value="received" ${t.returnStatus==="received"?"selected":""}>Received</option>
            <option value="missing" ${t.returnStatus==="missing"?"selected":""}>Missing</option>
          </select>
          <select data-serial="${t.serial}" onchange="window.updateReturnProductCondition('${t.serial}', this.value)">
            <option value="good" ${t.condition==="good"?"selected":""}>Good</option>
            <option value="damaged" ${t.condition==="damaged"?"selected":""}>Damaged</option>
          </select>
          <button type="button" class="secondary" onclick="window.markReturnProductReceived('${t.serial}')">Mark Received</button>
          <button type="button" class="secondary btn-missing-action" onclick="window.markReturnProductMissing('${t.serial}')">Mark Missing</button>
        </div>
      </div>
    `}).join(""),cC()}function RB(){cC(),uC()}function FB(){Array.isArray(De)&&(De.forEach(r=>{const e=String(r["Serial No"]||"").trim(),t=Ve.find(s=>s.serial===e);if(!t)return;t.returnStatus==="received"&&t.condition==="good"?r.Status="Unmarked":(r.Status="Marked & Delivered",t.condition==="damaged"&&!String(r.Notes||"").includes("Damaged on return")&&(r.Notes=(r.Notes||"")+(r.Notes?" | ":"")+"Damaged on return"))}),typeof pt=="function"&&pt())}function us(){const r=window.ProjectStore||(typeof Ke<"u"?Ke:null);let e=null;r&&r.getActiveContext&&(e=r.getActiveContext().project);const t=me.length?me:Array.isArray(X)&&X.length?X:e&&Array.isArray(e.selectedSerials)?e.selectedSerials:[],n=[...new Set(t.filter(Boolean))],s=Oa(n),i=new Map;Array.isArray(Ve)&&Ve.forEach(a=>{a&&a.serial&&i.set(a.serial,a)}),e&&Array.isArray(e.returnProductsState)&&e.returnProductsState.forEach(a=>{a&&a.serial&&!i.has(a.serial)&&i.set(a.serial,a)}),Ve=s.map(a=>{const o=String(a["Serial No"]||"").trim();return i.has(o)?i.get(o):{serial:o,name:String(a.Description||a.Name||a.Type||o),code:o,category:String(a.Type||"Jewellery"),quantity:1,image:typeof getPreviewImageUrl=="function"?getPreviewImageUrl(a):a.image||"",returnStatus:"pending",condition:"good"}}),RB(),FB()}function hC(r=!1){us()}function d_(r){Gf=r||"",uC()}function tr(){const r=window.ProjectStore||(typeof Ke<"u"?Ke:null);if(r&&r.updateProject&&r.getActiveContext){const e=r.getActiveContext().project;if(e){const t=BC(),n={sent:t.total,returned:t.received,pending:t.pending,missing:t.missing};let s=e.projectStatus||e.status||"Active";s!=="Completed"&&(t.pending>0?s="Waiting for Return":t.total>0&&(s="Waiting for Deliverables")),r.updateProject(e.id,{returnProductsState:[...Ve],productStats:n,status:s,projectStatus:s}),typeof window.renderProjectBar=="function"&&window.renderProjectBar()}}}function NB(r,e){const t=Ve.find(n=>n.serial===r);t&&(t.returnStatus=e,RB(),FB(),tr())}function f_(r,e){const t=Ve.find(n=>n.serial===r);t&&(t.condition=e,RB(),FB(),tr())}function C_(r){NB(r,"received")}function p_(r){NB(r,"missing")}function Tl(r){typeof window.unlockStudioWorkspace=="function"&&window.unlockStudioWorkspace();const e={dashboard:{btn:"tabOverviewBtn",section:"dashboardTab"},browse:{btn:"tabBrowseBtn",section:"browseTab"},selected:{btn:"tabSelectedBtn",section:"selectedTab"},finalTray:{btn:"tabFinalTrayBtn",section:"finalTrayTab"},returnProducts:{btn:"tabReturnProductsBtn",section:"returnProductsTab"}},t=document.getElementById("tabDashboardBtn");t&&t.classList.remove("active"),Object.keys(e).forEach(s=>{const i=document.getElementById(e[s].btn),a=document.getElementById(e[s].section),o={dashboard:"bottomNavHome",browse:"bottomNavBrowse",selected:"bottomNavSelected",finalTray:"bottomNavFinalTray",returnProducts:"bottomNavReturns"},B=o[s]?document.getElementById(o[s]):null;s===r?(i&&i.classList.add("active"),a&&a.classList.add("active"),B&&B.classList.add("active")):(i&&i.classList.remove("active"),a&&a.classList.remove("active"),B&&B.classList.remove("active"))});const n=document.querySelector(".page-shell");n&&(n.classList.remove("browse-active","dashboard-active"),r==="browse"?n.classList.add("browse-active"):r==="dashboard"&&n.classList.add("dashboard-active")),r==="dashboard"&&renderDashboard(),r==="selected"&&Zt(),r==="finalTray"&&typeof tt=="function"&&tt(),r==="returnProducts"&&hC(),window.scrollTo({top:0,behavior:"smooth"}),PB()}async function g_(){const r=window.ProjectStore||(typeof Ke<"u"?Ke:null);let e={};r&&r.getActiveContext&&(e=r.getActiveContext());const t=e.celebrity?e.celebrity.name:"Celebrity",n=e.stylist?e.stylist.name:"Stylist",s=e.project?e.project.title:"Lookbook Selection",i=e.project?e.project.id:"proj_"+Date.now();let a=Array.isArray(window.selected)?window.selected:[];if(!a.length&&e.project&&Array.isArray(e.project.selectedSerials)&&(a=e.project.selectedSerials),!a.length){alert("Select pieces from the catalogue first to create and share the Lookbook.");return}const B=`${window.location.origin+window.location.pathname}?mode=lookbook&project=${encodeURIComponent(i)}&name=${encodeURIComponent(t)}&items=${encodeURIComponent(a.join(","))}`,c=`${t.replace(/[^a-zA-Z0-9]/g,"_")}_Lookbook.pdf`;let h=Qe;if(!h&&typeof La=="function"&&ve.length)try{h=await La()}catch(C){console.warn("Could not generate PDF blob for sharing:",C)}if(h&&navigator.canShare)try{const C=new File([h],c,{type:"application/pdf"});if(navigator.canShare({files:[C]})){await navigator.share({files:[C],title:`${t} Lookbook - ${s}`,text:`✨ ASCEND ATELIER CURATION LOOKBOOK
📁 Project: ${s}
👑 Celebrity: ${t}
👤 Stylist: ${n}
🔗 Web Version: ${B}`});return}}catch(C){if(C.name==="AbortError")return;console.warn("[WebShare] Native file share failed, falling back",C)}h&&Ni(h,c);let d=`✨ *ASCEND ATELIER DIGITAL CLIENT LOOKBOOK*
`;d+=`---------------------------
`,d+=`📁 *Project:* ${s}
`,d+=`👑 *Celebrity / Client:* ${t}
`,d+=`👤 *Stylist:* ${n}
`,d+=`💎 *Curated Pieces:* ${a.length}

`,d+=`🔗 *Open Interactive Web Lookbook:*
${B}

`,d+="Ascend High Jewelry Studio";const p=`https://web.whatsapp.com/send?text=${encodeURIComponent(d)}`;ho(p)}function m_(){const r=window.ProjectStore||(typeof Ke<"u"?Ke:null);let e={};r&&r.getActiveContext&&(e=r.getActiveContext());let t=Array.isArray(window.selected)&&window.selected.length?[...window.selected]:[];if(!t.length&&e.project&&Array.isArray(e.project.selectedSerials)&&(t=[...e.project.selectedSerials]),!t.length)return alert("No lookbook items found to import. Select pieces or load an active project first."),0;const n=Xf(t);return typeof Tl=="function"&&Tl("finalTray"),n}window.toggle=Jf;window.removeFromSelected=function(r){Jf(r)};window.syncCurrentSelectionToProject=vB;window.shareSelectionToWhatsApp=c_;window.shareLookbookToWhatsApp=g_;window.importApprovedProjectToFinalTray=m_;window.renderFloatingSelectionBar=PB;window.switchTab=Tl;window.toggleMobileSidebar=function(){const r=document.getElementById("appSidebar"),e=document.getElementById("sidebarOverlay");r&&e&&(r.classList.toggle("is-open"),e.classList.toggle("is-visible"))};window.renderDashboard=function(){if(typeof window.renderProjectDashboard=="function"){window.renderProjectDashboard();return}};window.loadReturnProductsFromFinalTray=hC;window.handleReturnProductsSearch=d_;window.updateReturnProductStatus=NB;window.updateReturnProductCondition=f_;window.markReturnProductReceived=C_;window.markReturnProductMissing=p_;window.generateSelectionPdf=uo;window.downloadCurrentPdf=ka;window.downloadCoverPdf=Zv;window.shareCurrentPdf=fo;window.exportAndSharePdfToWhatsApp=t_;window.addBulkSerialsToFinalTray=IB;window.generateFinalTrayFromSerials=bB;window.shareFinalTrayPdf=n_;window.clearAllSelected=tC;window.removeMarkedFromSelected=nC;window.selectAllByBrand=zv;window.toggleFilterMenu=Hf;window.toggleBreakdown=Uf;window.onSearchInput=$f;window.onFilterChanged=_s;window.goToPrevPage=qf;window.goToNextPage=zf;window.changePageSize=Kf;window.goToPrevSelectedPage=Qf;window.goToNextSelectedPage=Wf;window.changeSelectedPageSize=Yf;
