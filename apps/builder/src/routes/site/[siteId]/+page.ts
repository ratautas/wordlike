import type { PageData, PageLoad } from './$types';
import { supabaseClient } from "$lib/supabase";

export const load: PageLoad = async (event): PageData => {
  const { siteId } = event.params;
  const { data, error } = await supabaseClient
    .from('sites')
    .select()
    .eq('id', siteId);
  const [{ doc }] = data ?? [{}];

  return {
    hi: 'hi',
    doc,
  }
};