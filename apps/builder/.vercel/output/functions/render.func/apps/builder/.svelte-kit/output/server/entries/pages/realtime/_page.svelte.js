import { c as create_ssr_component, e as escape } from "../../../chunks/index3.js";
import { s as supabaseClient } from "../../../chunks/supabase.js";
supabaseClient.channel("room1");
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<a href="${"/"}">Home</a>



<button>klik klik
</button>

${data.session ? `<p>Welcome, ${escape(data.session.user.email)}</p>` : `<a href="${"/login"}">Log in</a>
  <a href="${"/register"}">Register</a>`}`;
});
export {
  Page as default
};
