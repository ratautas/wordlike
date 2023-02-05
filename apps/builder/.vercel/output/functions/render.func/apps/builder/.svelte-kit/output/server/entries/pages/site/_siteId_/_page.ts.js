import { s as supabaseClient } from "../../../../chunks/supabase.js";
import { d as doc } from "../../../../chunks/doc.js";
const load = async (event) => {
  const { siteId } = event.params;
  const { data, error } = await supabaseClient.from("sites").select().eq("id", siteId);
  const [site] = data ?? [];
  doc.set(site?.doc);
  return {
    doc: site.doc
  };
};
export {
  load
};
