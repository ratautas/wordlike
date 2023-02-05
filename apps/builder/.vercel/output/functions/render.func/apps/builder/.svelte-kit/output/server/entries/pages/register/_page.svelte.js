import { c as create_ssr_component } from "../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main><h1>Register</h1>
  <form action="${"?/register"}" method="${"POST"}" class="${""}"><label for="${""}">Email </label>
    <input type="${"text"}" name="${"email"}">
    <label for="${""}">Password </label>
    <input type="${"password"}" name="${"password"}">
    <button class="${""}">Register</button></form></main>`;
});
export {
  Page as default
};
