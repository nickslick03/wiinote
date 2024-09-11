(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();const be=(e,n)=>e===n,ye=Symbol("solid-track"),G={equals:be};let me=he;const I=1,U=2,ce={owned:null,cleanups:null,context:null,owner:null};var b=null;let J=null,we=null,g=null,w=null,k=null,K=0;function F(e,n){const t=g,s=b,l=e.length===0,i=n===void 0?s:n,o=l?ce:{owned:null,cleanups:null,context:i?i.context:null,owner:i},r=l?e:()=>e(()=>X(()=>Y(o)));b=o,g=null;try{return D(r,!0)}finally{g=t,b=s}}function P(e,n){n=n?Object.assign({},G,n):G;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=l=>(typeof l=="function"&&(l=l(t.value)),ue(t,l));return[fe.bind(t),s]}function O(e,n,t){const s=ae(e,n,!1,I);Q(s)}function xe(e,n,t){t=t?Object.assign({},G,t):G;const s=ae(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,Q(s),fe.bind(s)}function X(e){if(g===null)return e();const n=g;g=null;try{return e()}finally{g=n}}function ve(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function fe(){if(this.sources&&this.state)if(this.state===I)Q(this);else{const e=w;w=null,D(()=>W(this),!1),w=e}if(g){const e=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(e)):(g.sources=[this],g.sourceSlots=[e]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function ue(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&D(()=>{for(let l=0;l<e.observers.length;l+=1){const i=e.observers[l],o=J&&J.running;o&&J.disposed.has(i),(o?!i.tState:!i.state)&&(i.pure?w.push(i):k.push(i),i.observers&&pe(i)),o||(i.state=I)}if(w.length>1e6)throw w=[],new Error},!1)),n}function Q(e){if(!e.fn)return;Y(e);const n=K;Ae(e,e.value,n)}function Ae(e,n,t){let s;const l=b,i=g;g=b=e;try{s=e.fn(n)}catch(o){return e.pure&&(e.state=I,e.owned&&e.owned.forEach(Y),e.owned=null),e.updatedAt=t+1,ge(o)}finally{g=i,b=l}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?ue(e,s):e.value=s,e.updatedAt=t)}function ae(e,n,t,s=I,l){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:b,context:b?b.context:null,pure:t};return b===null||b!==ce&&(b.owned?b.owned.push(i):b.owned=[i]),i}function de(e){if(e.state===0)return;if(e.state===U)return W(e);if(e.suspense&&X(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<K);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===I)Q(e);else if(e.state===U){const s=w;w=null,D(()=>W(e,n[0]),!1),w=s}}function D(e,n){if(w)return e();let t=!1;n||(w=[]),k?t=!0:k=[],K++;try{const s=e();return $e(t),s}catch(s){t||(k=null),w=null,ge(s)}}function $e(e){if(w&&(he(w),w=null),e)return;const n=k;k=null,n.length&&D(()=>me(n),!1)}function he(e){for(let n=0;n<e.length;n++)de(e[n])}function W(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const l=s.state;l===I?s!==n&&(!s.updatedAt||s.updatedAt<K)&&de(s):l===U&&W(s,n)}}}function pe(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=U,t.pure?w.push(t):k.push(t),t.observers&&pe(t))}}function Y(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const i=l.pop(),o=t.observerSlots.pop();s<l.length&&(i.sourceSlots[o]=s,l[s]=i,t.observerSlots[s]=o)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)Y(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function Ee(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ge(e,n=b){throw Ee(e)}const Se=Symbol("fallback");function se(e){for(let n=0;n<e.length;n++)e[n]()}function Ce(e,n,t={}){let s=[],l=[],i=[],o=0,r=n.length>1?[]:null;return ve(()=>se(i)),()=>{let a=e()||[],h=a.length,u,c;return a[ye],X(()=>{let v,$,C,B,f,p,d,x,y;if(h===0)o!==0&&(se(i),i=[],s=[],l=[],o=0,r&&(r=[])),t.fallback&&(s=[Se],l[0]=F(m=>(i[0]=m,t.fallback())),o=1);else if(o===0){for(l=new Array(h),c=0;c<h;c++)s[c]=a[c],l[c]=F(A);o=h}else{for(C=new Array(h),B=new Array(h),r&&(f=new Array(h)),p=0,d=Math.min(o,h);p<d&&s[p]===a[p];p++);for(d=o-1,x=h-1;d>=p&&x>=p&&s[d]===a[x];d--,x--)C[x]=l[d],B[x]=i[d],r&&(f[x]=r[d]);for(v=new Map,$=new Array(x+1),c=x;c>=p;c--)y=a[c],u=v.get(y),$[c]=u===void 0?-1:u,v.set(y,c);for(u=p;u<=d;u++)y=s[u],c=v.get(y),c!==void 0&&c!==-1?(C[c]=l[u],B[c]=i[u],r&&(f[c]=r[u]),c=$[c],v.set(y,c)):i[u]();for(c=p;c<h;c++)c in C?(l[c]=C[c],i[c]=B[c],r&&(r[c]=f[c],r[c](c))):l[c]=F(A);l=l.slice(0,o=h),s=a.slice(0)}return l});function A(v){if(i[c]=v,r){const[$,C]=P(c);return r[c]=C,n(a[c],$)}return n(a[c])}}}let _e=!1;function V(e,n){return X(()=>e(n||{}))}function Z(e){const n="fallback"in e&&{fallback:()=>e.fallback};return xe(Ce(()=>e.each,e.children,n||void 0))}function Te(e,n,t){let s=t.length,l=n.length,i=s,o=0,r=0,a=n[l-1].nextSibling,h=null;for(;o<l||r<i;){if(n[o]===t[r]){o++,r++;continue}for(;n[l-1]===t[i-1];)l--,i--;if(l===o){const u=i<s?r?t[r-1].nextSibling:t[i-r]:a;for(;r<i;)e.insertBefore(t[r++],u)}else if(i===r)for(;o<l;)(!h||!h.has(n[o]))&&n[o].remove(),o++;else if(n[o]===t[i-1]&&t[r]===n[l-1]){const u=n[--l].nextSibling;e.insertBefore(t[r++],n[o++].nextSibling),e.insertBefore(t[--i],u),n[l]=t[i]}else{if(!h){h=new Map;let c=r;for(;c<i;)h.set(t[c],c++)}const u=h.get(n[o]);if(u!=null)if(r<u&&u<i){let c=o,A=1,v;for(;++c<l&&c<i&&!((v=h.get(n[c]))==null||v!==u+A);)A++;if(A>u-r){const $=n[o];for(;r<u;)e.insertBefore(t[r++],$)}else e.replaceChild(t[r++],n[o++])}else o++;else n[o++].remove()}}}const le="_$DX_DELEGATE";function Ne(e,n,t,s={}){let l;return F(i=>{l=i,n===document?e():j(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{l(),n.textContent=""}}function L(e,n,t){let s;const l=()=>{const o=document.createElement("template");return o.innerHTML=e,o.content.firstChild},i=()=>(s||(s=l())).cloneNode(!0);return i.cloneNode=i,i}function Oe(e,n=window.document){const t=n[le]||(n[le]=new Set);for(let s=0,l=e.length;s<l;s++){const i=e[s];t.has(i)||(t.add(i),n.addEventListener(i,ke))}}function ie(e,n){n==null?e.removeAttribute("class"):e.className=n}function j(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return H(e,n,s,t);O(l=>H(e,n(),l,t),s)}function ke(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const s=t[n];if(s&&!t.disabled){const l=t[`${n}Data`];if(l!==void 0?s.call(t,l,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function H(e,n,t,s,l){for(;typeof t=="function";)t=t();if(n===t)return t;const i=typeof n,o=s!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,i==="string"||i==="number"){if(i==="number"&&(n=n.toString(),n===t))return t;if(o){let r=t[0];r&&r.nodeType===3?r.data!==n&&(r.data=n):r=document.createTextNode(n),t=M(e,t,s,r)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n}else if(n==null||i==="boolean")t=M(e,t,s);else{if(i==="function")return O(()=>{let r=n();for(;typeof r=="function";)r=r();t=H(e,r,t,s)}),()=>t;if(Array.isArray(n)){const r=[],a=t&&Array.isArray(t);if(te(r,n,t,l))return O(()=>t=H(e,r,t,s,!0)),()=>t;if(r.length===0){if(t=M(e,t,s),o)return t}else a?t.length===0?re(e,r,s):Te(e,t,r):(t&&M(e),re(e,r));t=r}else if(n.nodeType){if(Array.isArray(t)){if(o)return t=M(e,t,s,n);M(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function te(e,n,t,s){let l=!1;for(let i=0,o=n.length;i<o;i++){let r=n[i],a=t&&t[e.length],h;if(!(r==null||r===!0||r===!1))if((h=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))l=te(e,r,a)||l;else if(h==="function")if(s){for(;typeof r=="function";)r=r();l=te(e,Array.isArray(r)?r:[r],Array.isArray(a)?a:[a])||l}else e.push(r),l=!0;else{const u=String(r);a&&a.nodeType===3&&a.data===u?e.push(a):e.push(document.createTextNode(u))}}return l}function re(e,n,t=null){for(let s=0,l=n.length;s<l;s++)e.insertBefore(n[s],t)}function M(e,n,t,s){if(t===void 0)return e.textContent="";const l=s||document.createTextNode("");if(n.length){let i=!1;for(let o=n.length-1;o>=0;o--){const r=n[o];if(l!==r){const a=r.parentNode===e;!i&&!o?a?e.replaceChild(l,r):e.insertBefore(l,t):a&&r.remove()}else i=!0}}else e.insertBefore(l,t);return[l]}function Ie(e,n=440){const t=e.createOscillator();t.frequency.setValueAtTime(n,e.currentTime),t.type="sine";const s=e.createGain();return t.connect(s),s.connect(e.destination),t.start(),{oscillator:t,gainNode:s}}function Le(e,n,t){n.frequency.setValueAtTime(t,e.currentTime)}function z(e,n,t,s){const i=e.currentTime+s;n.gain.linearRampToValueAtTime(t,i)}const Be=[16.35,32.7,65.41,130.81,261.63,523.25,1046.5,2093,4186.01];function Me(e,n){const t=Math.pow(2,.08333333333333333);return e*Math.pow(t,n)}const oe=["C","C♯ / D♭","D","D♯ / E♭","E","F","F♯ / G♭","G","G♯ / A♭","A","A♯ / B♭","B"];var Pe=L("<div id=cover><p class=text-3xl>Click to start the page."),qe=L('<button class="absolute top-2 left-2 bg-white rounded-full py-1 px-2 z-20 select-none">⚙'),Re=L('<div id=menu-background><div class="bg-white rounded-md p-4 flex flex-col gap-5"><h1 class="text-3xl font-bold text-center">Wiinote</h1><form id=input-container class="w-fit flex flex-col gap-5"><label class=flex><span class=pr-2>Base Note: </span><select name=base-letter class="flex-1 text-sm border-black border rounded-sm"></select></label><label class=flex><span class=pr-2>Invert every other octave: </span><input type=checkbox></label></form><footer class=text-center><a href=https://www.linkedin.com/in/nicholas-epps-597b94295/ class="text-sm text-purple-950 underline">Nicholas Epps</a></footer>'),je=L('<div id=notegrid class="absolute top-0 left-0 w-screen h-screen z-10">'),De=L('<div class="grid grid-cols-6 h-screen select-none">'),Fe=L("<option>"),Ve=L('<div class="border border-black flex items-center justify-end pr-2 text-3xl font-bold">');const ee=13,R=2,T=6;function Ge(){const[e,n]=P(!1),[t,s]=P(!1),[l,i]=P(!1),[o,r]=P(!1),[a,h]=P(0);let u,c,A;const v=()=>{u=new window.AudioContext,n(!0)},$=f=>oe[(f+a())%12],C=(f,p)=>{const d=(12-f)/12;return(p/12+d)*356%356},B=f=>{const p=f.target,d=Math.floor(f.clientX/p.clientWidth*T)+R,x=o()&&(d-R)%2===1,y=p.clientWidth/T;let m=(1-f.clientY/p.clientHeight)*ee-.5;const E=Math.floor((f.clientX-(d-R)/T*p.clientWidth)/(y/2))===((d-R)%2===0?1:0),_=o()&&E?24-m*2:o()?m*2:12;let N=(f.clientX-(d-R)/T*p.clientWidth)/(y/_)-_/2;x&&(m=12-m);const q=Me(Be[d],m+a()+N);if(t())Le(u,c,q);else{s(!0);const S=Ie(u,q);c=S.oscillator,A=S.gainNode,z(u,A,0,.1)}};return[(()=>{var f=Pe();return f.$$click=v,O(()=>ie(f,`fixed z-30 top-0 left-0 w-screen h-screen 
      bg-white flex justify-center items-center 
        ${e()?"hidden":""}`)),f})(),(()=>{var f=qe();return f.$$click=()=>i(!0),f})(),(()=>{var f=Re(),p=f.firstChild,d=p.firstChild,x=d.nextSibling,y=x.firstChild,m=y.firstChild,E=m.nextSibling,_=y.nextSibling,N=_.firstChild,q=N.nextSibling;return f.$$click=S=>{S.target.id==="menu-background"&&i(!1)},E.addEventListener("change",S=>h(S.target.selectedIndex)),j(E,V(Z,{each:oe,children:S=>(()=>{var ne=Fe();return j(ne,S),ne})()})),q.$$click=()=>r(S=>!S),O(()=>ie(f,`${l()?"":"hidden"} z-30 absolute top-0 left-0 w-screen h-screen 
      bg-black bg-opacity-50 flex justify-center items-center`)),O(()=>q.value=o()?"checked":void 0),f})(),(()=>{var f=je();return f.$$mouseup=()=>{z(u,A,0,.1)},f.$$mousedown=()=>{z(u,A,1,.1)},f.$$mousemove=B,f})(),(()=>{var f=De();return j(f,V(Z,{get each(){return Array(ee)},children:(p,d)=>V(Z,{get each(){return Array(T)},children:(x,y)=>(()=>{var m=Ve();return j(m,()=>(d()===0?$(0):$(12-d()))+(y()+(d()===0?2:1))),O(E=>{var _=`hsl(${C(a(),d())}, 65%, ${y()/T*80+20}%)`,N=`${Math.abs((o()&&y()%2===1?ee*T-T:0)-d()*6)+y()}`;return _!==E.e&&((E.e=_)!=null?m.style.setProperty("background-color",_):m.style.removeProperty("background-color")),N!==E.t&&((E.t=N)!=null?m.style.setProperty("order",N):m.style.removeProperty("order")),E},{e:void 0,t:void 0}),m})()})})),f})()]}Oe(["click","mousemove","mousedown","mouseup"]);const Ue=document.getElementById("root");Ne(()=>V(Ge,{}),Ue);
