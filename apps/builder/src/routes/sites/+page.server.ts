import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
// import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad } from "./$types";

// Pass user session to the client
export const load: LayoutServerLoad = async (event) => {
  console.log('user', event.locals.session?.user?.id)
  const { id } = event.locals.session?.user ?? {};
  console.log('id', id)

  return {
    hi: 'hi'
    // session: await getServerSession(event)
  }
};


export const actions: Actions = {
  register: async ({ request, locals }) => {
    const { email, password } = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.sb.auth.signUp({
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

    throw redirect(303, "/")
  }
};