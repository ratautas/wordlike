import{S as i,i as l,s as r,F as u,G as f,H as c,I as p,f as _,t as m,o as d}from"../../chunks/index-932b5f3a.js";import{s as $}from"../../chunks/supabase-4de9858b.js";import{i as g}from"../../chunks/navigation-34c5c503.js";function h(a){let e;const o=a[1].default,s=u(o,a,a[0],null);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,n){s&&s.m(t,n),e=!0},p(t,[n]){s&&s.p&&(!e||n&1)&&f(s,o,t,t[0],e?p(o,t[0],n,null):c(t[0]),null)},i(t){e||(_(s,t),e=!0)},o(t){m(s,t),e=!1},d(t){s&&s.d(t)}}}function b(a,e,o){let{$$slots:s={},$$scope:t}=e;return d(()=>{const{data:{subscription:n}}=$.auth.onAuthStateChange((v,C)=>{g()});return()=>{n.unsubscribe()}}),a.$$set=n=>{"$$scope"in n&&o(0,t=n.$$scope)},[t,s]}class y extends i{constructor(e){super(),l(this,e,b,h,r,{})}}export{y as default};