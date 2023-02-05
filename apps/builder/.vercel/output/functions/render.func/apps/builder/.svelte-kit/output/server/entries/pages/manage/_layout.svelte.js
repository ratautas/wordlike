import { c as create_ssr_component } from "../../../chunks/index3.js";
import "../../../chunks/utils.js";
import "../../../chunks/supabase.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="${"flex border-b-gray-200 border-[1px]"}"><ul><li class="${"flex"}"><a href="${"/"}" class="${"p-2"}">home</a>
      a<a href="${"/"}" class="${"p-2"}">sites</a>
      a<a href="${"/"}" class="${"p-2"}">teams</a>
      a<a href="${"/"}" class="${"p-2"}">domains</a>
      a<a href="${"/"}" class="${"p-2"}">billing</a>
      a<a href="${"/"}" class="${"p-2"}">account</a></li></ul>
  <form action="${"/logout"}" method="${"POST"}"><button class="${"p-2"}" type="${"submit"}">logout</button></form></header>

<main>${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
