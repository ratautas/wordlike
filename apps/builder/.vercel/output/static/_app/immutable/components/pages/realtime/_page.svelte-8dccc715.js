import{S as P,i as R,s as S,k as b,q as p,a as E,e as O,l as h,m as y,r as d,h as r,c as A,n as q,b as m,J as k,O as T,B,u as W}from"../../../chunks/index-932b5f3a.js";import{s as x}from"../../../chunks/supabase-4de9858b.js";const C=x.channel("room1"),J=()=>C.subscribe(o=>{console.log({status:o})}),U=(o,e)=>C.send({type:"broadcast",event:o,payload:e}),$=(o,e)=>C.on("broadcast",{event:o},e);function j(o){let e,n,i,l,a;return{c(){e=b("a"),n=p("Log in"),i=E(),l=b("a"),a=p("Register"),this.h()},l(s){e=h(s,"A",{href:!0});var c=y(e);n=d(c,"Log in"),c.forEach(r),i=A(s),l=h(s,"A",{href:!0});var _=y(l);a=d(_,"Register"),_.forEach(r),this.h()},h(){q(e,"href","/login"),q(l,"href","/register")},m(s,c){m(s,e,c),k(e,n),m(s,i,c),m(s,l,c),k(l,a)},p:B,d(s){s&&r(e),s&&r(i),s&&r(l)}}}function w(o){let e,n,i=o[0].session.user.email+"",l;return{c(){e=b("p"),n=p("Welcome, "),l=p(i)},l(a){e=h(a,"P",{});var s=y(e);n=d(s,"Welcome, "),l=d(s,i),s.forEach(r)},m(a,s){m(a,e,s),k(e,n),k(e,l)},p(a,s){s&1&&i!==(i=a[0].session.user.email+"")&&W(l,i)},d(a){a&&r(e)}}}function z(o){let e,n,i,l,a,s,c,_,H;function L(t,f){return t[0].session?w:j}let v=L(o),u=v(o);return{c(){e=b("a"),n=p("Home"),i=E(),l=b("button"),a=p("klik klik"),s=E(),u.c(),c=O(),this.h()},l(t){e=h(t,"A",{href:!0});var f=y(e);n=d(f,"Home"),f.forEach(r),i=A(t),l=h(t,"BUTTON",{});var N=y(l);a=d(N,"klik klik"),N.forEach(r),s=A(t),u.l(t),c=O(),this.h()},h(){q(e,"href","/")},m(t,f){m(t,e,f),k(e,n),m(t,i,f),m(t,l,f),k(l,a),m(t,s,f),u.m(t,f),m(t,c,f),_||(H=T(l,"click",o[1]),_=!0)},p(t,[f]){v===(v=L(t))&&u?u.p(t,f):(u.d(1),u=v(t),u&&(u.c(),u.m(c.parentNode,c)))},i:B,o:B,d(t){t&&r(e),t&&r(i),t&&r(l),t&&r(s),u.d(t),t&&r(c),_=!1,H()}}}function D(o,e,n){let{data:i}=e;J(),$("click",a=>{console.log("some",a)});const l=()=>U("click",{payload:"payy"});return o.$$set=a=>{"data"in a&&n(0,i=a.data)},[i,l]}class I extends P{constructor(e){super(),R(this,e,D,z,S,{data:0})}}export{I as default};