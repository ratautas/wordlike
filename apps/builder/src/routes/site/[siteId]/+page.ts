import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { supabaseClient } from "$lib/supabase";

export const load: PageLoad = async (event) => {
  const userId = event?.locals?.session?.user.id;
  const { siteId } = event.params;
  const { data, error } = await supabaseClient
    .from('sites')
    .select()
    .eq('id', siteId);

  const [{ doc }] = data;


  return {
    hi: 'hi',
    doc,
  }
};