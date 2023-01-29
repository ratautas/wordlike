import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";
import { supabaseClient } from "$lib/supabase";

export const GET: RequestHandler = async (e) => {
    const { siteId } = e.params;

    const { data, error, ...rest } = await supabaseClient
        .from('sites')
        .select()
        .eq('id', siteId);
    const [site] = data ?? [];

    console.log({ data, error, rest })

    return json(site?.doc, { status: 200 });
}
