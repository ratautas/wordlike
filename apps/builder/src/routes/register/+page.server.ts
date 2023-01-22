import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  register: async ({ request, locals }) => {
    const { email, password } = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.supabase.auth.signUp({
      email: email as string,
      password: password as string,
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: err.message,
        });
      }

      return fail(500, {
        error: "Something went wrong",
      });
    }

    throw redirect(303, "/");
  }
};