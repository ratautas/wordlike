import type { PageData, PageLoad } from './$types';
import { supabaseClient } from "$lib/supabase";
import { doc } from "$lib/stores/doc";

export const load: PageLoad = async (event): PageData => {
  const { siteId } = event.params;
  const { data, error } = await supabaseClient
    .from('sites')
    .select()
    .eq('id', siteId);
  const [site] = data ?? [];

  doc.set(site?.doc);

  return {
    doc: site.doc,
  }
};