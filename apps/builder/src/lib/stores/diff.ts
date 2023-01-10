// Channel name can be any string.
// Create channels with the same name for both the broadcasting and receiving clients.

import { writable } from 'svelte/store';

export const isLoaded = writable(false);
export const doc = writable(null);

import { supabaseClient } from "$lib/supabase";
const channel = supabaseClient.channel('room1');

// Subscribe registers your client with the server
channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
        // now you can start broadcasting cursor positions
        setInterval(() => {
            channel.send({
                type: 'broadcast',
                event: 'cursor-pos',
                payload: { x: Math.random(), y: Math.random() },
            })
            console.log(status)
        }, 100);
    }
});

supabaseClient
    .channel('room1')
    .on('broadcast', { event: 'cursor-pos' }, (payload) => console.log(payload))
    .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
            // your callback function will now be called with the messages broadcast by the other client
        }
    })