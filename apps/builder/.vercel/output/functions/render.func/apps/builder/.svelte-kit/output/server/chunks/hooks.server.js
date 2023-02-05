import "./supabase.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
const handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event);
  event.locals.supabase = supabaseClient;
  event.locals.session = session;
  return resolve(event);
};
export {
  handle
};
