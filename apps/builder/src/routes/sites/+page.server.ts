import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { getServerSession, getSupabase } from "@supabase/auth-helpers-sveltekit";
import { supabaseClient } from "$lib/supabase";
import doc from "$lib/mock/doc.json";

import type { PageServerLoad } from "./$types";
// import { getServerSession } from "@supabase/auth-helpers-sveltekit";

// Pass user session to the client
export const load: PageServerLoad = async (event) => {
  const { id } = event.locals?.session?.user ?? {};

  return {
    hi: 'hi'
    // session: await getServerSession(event)
  }
};


export const actions: Actions = {
  create: async ({ locals }) => {
    const { data, error: err } = await supabaseClient
      .from('sites')
      .insert({
        doc,
        user_id: locals.session?.user.id
      })
      .select()

    console.log(locals.session?.user);

    console.log({ data })
    console.log({ err })

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

  }
};