import{s as t}from"./supabase-4de9858b.js";const a=async()=>{const{data:o,error:c}=await t.from("sites").select("doc").eq("id","678cb0af-0c25-4ee4-8e41-6c3c75f86308").limit(1),[e]=o;return{doc:e==null?void 0:e.doc}},s=Object.freeze(Object.defineProperty({__proto__:null,load:a},Symbol.toStringTag,{value:"Module"}));export{s as _,a as l};
