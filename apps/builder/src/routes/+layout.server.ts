import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad, PageData } from "./$types";

// Pass user session to the client
export const load: LayoutServerLoad = async (event): PageData => {
  const session = await getServerSession(event);

  return {
    session,
  }
};