import { supabaseClient } from "$lib/supabase";
import { browser, building, dev, version } from "$app/environment";

const channel = supabaseClient.channel('room1');

// Subscribe registers your client with the server
export const subscribe = () => channel.subscribe((status) => {
  console.log({ status });
});

export const broadcast = (event, payload) => channel.send({
  type: 'broadcast',
  event,
  payload,
});

export const listen = (event, callback) => channel.on('broadcast', { event }, callback);