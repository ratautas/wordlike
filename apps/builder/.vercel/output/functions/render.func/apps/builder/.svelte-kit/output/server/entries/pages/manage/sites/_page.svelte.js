import { c as create_ssr_component, d as each, f as add_attribute, e as escape } from "../../../../chunks/index3.js";
import "../../../../chunks/utils.js";
import "../../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { session, sites } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="${"max-w-4xl mx-auto p-4"}"><div class="${"flex gap-4"}"><input type="${"text"}" class="${"w-10/12"}" placeholder="${"Search the sites"}">
    <form action="${"?/create"}" class="${"w-2/12"}" method="${"POST"}"><button type="${"submit"}" class="${"rounded px-2 py-1 bg-gradient-to-tr from-blue-400 to-blue-600 text-white"}">+ New
      </button></form></div>
  ${each(sites, (site) => {
    return `<div class="${"border-b-[1px] border-gray-200 py-6 flex"}"><img class="${"w-48 h-36"}" src="${"https://cdn.dribbble.com/userupload/4361632/file/original-61839d1d6a5419cf184e3027f3db55d8.png?compress=1&resize=360x240"}" alt="${""}" srcset="${""}">
      <div class="${"w-full p-4"}"><div class="${"text-lg font-semibold"}" contenteditable="${"true"}">contentenditable title
        </div>
        <div><a${add_attribute("href", `https://${site.id}.stebink.vercel.app`, 0)} target="${"_blank"}" rel="${"noopener noreferrer"}" class="${"text-gray-500 text-sm"}">${escape(`${site.id}.stebink.vercel.app`)}
          </a></div>
        <div><span class="${"text-gray-700 text-sm"}">Last updated</span>
          <span class="${"text-gray-700 text-sm"}">2 days ago</span></div>
        <div class="${"py-2 flex"}"><a class="${"inline-block rounded px-2 py-1 bg-gradient-to-tr from-blue-400 to-blue-600 text-white mr-2"}" href="${"/site/" + escape(site.id, true)}">edit</a>
          <form action="${"?/delete&siteId=" + escape(site.id, true)}" method="${"POST"}"><button type="${"submit"}" class="${"rounded px-2 py-1 bg-gradient-to-tr from-red-400 to-red-600 text-white"}">delete
            </button></form>
        </div></div>
    </div>`;
  })}</main>`;
});
export {
  Page as default
};
