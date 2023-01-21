import { AuthApiError } from "@supabase/supabase-js";
import { fail, type Actions } from "@sveltejs/kit";
import { supabaseClient } from "$lib/supabase";
import doc from "$lib/mock/doc.json";
import type { PageData, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event): PageData => {
  const userId = event?.locals?.session?.user.id;
  const { data, error } = await supabaseClient
    .from('sites')
    .select()
    .eq('user_id', userId);

  console.log(data, error)

  return {
    hi: 'hi',
    sites: data,
  }
};

export const actions: Actions = {
  create: async ({ locals }) => {
    // FOR SOM FKN REASON, THIS IS FIRING TWICE, disabling for now
    return;
    const { data, error: err } = await supabaseClient
      .from('sites')
      .insert({
        doc,
        user_id: locals.session?.user.id
      })
      .select();

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

    return data
  },
  delete: async (e) => {
    const { siteId } = Object.fromEntries(e.url.searchParams);
    const { error: err } = await supabaseClient
      .from('sites')
      .delete()
      .eq('id', siteId)

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