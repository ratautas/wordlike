import { AuthApiError } from "@supabase/supabase-js";
import { f as fail, r as redirect } from "../../../chunks/index.js";
const actions = {
  register: async ({ request, locals }) => {
    const { email, password } = Object.fromEntries(await request.formData());
    const { data, error: err } = await locals.supabase.auth.signUp({
      email,
      password
    });
    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: err.message
        });
      }
      return fail(500, {
        error: "Something went wrong"
      });
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
