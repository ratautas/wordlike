import type { PageLoad } from "./$types";
import { supabaseClient } from "$lib/supabase";

export const load: PageLoad = async () => {
    const { data, error } = await supabaseClient
        .from('sites')
        .select('doc')
        .eq('id', '678cb0af-0c25-4ee4-8e41-6c3c75f86308')
        .limit(1);
    const [site] = data;

    return {
        doc: site?.doc,
    }
};