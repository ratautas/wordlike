import { j as json } from "../../../../chunks/index.js";
import { s as supabaseClient } from "../../../../chunks/supabase.js";
const GET = async (e) => {
  const { siteId } = e.params;
  const { data, error } = await supabaseClient.from("sites").select().eq("id", siteId);
  const [site] = data ?? [];
  return json(site?.doc, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
};
export {
  GET
};
