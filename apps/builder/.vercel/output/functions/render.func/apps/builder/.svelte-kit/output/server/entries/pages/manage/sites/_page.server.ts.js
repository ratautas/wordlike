import { AuthApiError } from "@supabase/supabase-js";
import { f as fail } from "../../../../chunks/index.js";
import { s as supabaseClient } from "../../../../chunks/supabase.js";
const load = async (event) => {
  const userId = event?.locals?.session?.user.id;
  const { data, error } = await supabaseClient.from("sites").select().eq("user_id", userId);
  return {
    sites: data
  };
};
const actions = {
  create: async ({ locals }) => {
    return;
  },
  delete: async (e) => {
    const { siteId } = Object.fromEntries(e.url.searchParams);
    const { error: err } = await supabaseClient.from("sites").delete().eq("id", siteId);
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
  }
};
export {
  actions,
  load
};
