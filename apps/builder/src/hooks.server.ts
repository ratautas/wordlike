import "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const { session, supabaseClient } = await getSupabase(event);

    // Expose the session and supabaseClient to the rest of the app
    // It will always be available via locals.session and locals.supabase in the load finctions
    event.locals.supabase = supabaseClient;
    event.locals.session = session;

    return resolve(event);
};