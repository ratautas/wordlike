import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";
import { supabaseClient } from "$lib/supabase";

export const GET: RequestHandler = async (e) => {
    const { siteId } = e.params;

    const { data, error } = await supabaseClient
        .from('sites')
        .select()
        .eq('id', siteId);
    const [site] = data ?? [];

    return json(site?.doc, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
