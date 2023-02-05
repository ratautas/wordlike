import { c as create_ssr_component, e as escape } from "../../chunks/index3.js";
import "../../chunks/utils.js";
import "../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="${"min-h-screen"}"><header>${data.session ? `<a href="${"/manage/sites"}"><b>Sites</b></a>
      <p>user: ${escape(data.session.user.email)}</p>
      <form action="${"/logout"}" method="${"POST"}"><button type="${"submit"}">Logout</button></form>` : `<div><a href="${"/login"}">Login</a>
        <a href="${"/register"}">Register</a></div>`}</header>
  <h1 class="${"text-5xl font-extrabold text-center p-16"}">Home</h1></main>`;
});
export {
  Page as default
};
