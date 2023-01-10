import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad } from "./$types";

// Pass user session to the client
export const load: LayoutServerLoad = async (event) => {
  console.log("+layout.server.ts");
  return {
    session: await getServerSession(event)
  }
};