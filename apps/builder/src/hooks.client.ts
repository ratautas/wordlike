import "$lib/supabase";
// import { supabaseClient } from '$lib/supabase'

// // import {
// //     REALTIME_LISTEN_TYPES,
// //     REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
// //     REALTIME_PRESENCE_LISTEN_EVENTS,
// //     REALTIME_SUBSCRIBE_STATES,
// //     RealtimeChannel,
// //     PostgrestResponse,
// //     RealtimeChannelSendResponse,
// //     RealtimePostgresInsertPayload,
// // } from '@supabase/supabase-js'




// // Channel name can be any string.
// // Create channels with the same name for both the broadcasting and receiving clients.
// const channel = supabaseClient.channel('room1')

// // Subscribe registers your client with the server
// channel.subscribe((status) => {
//     if (status === 'SUBSCRIBED') {
//         // now you can start broadcasting cursor positions
//         setInterval(() => {
//             channel.send({
//                 type: 'broadcast',
//                 event: 'cursor-pos',
//                 payload: { x: Math.random(), y: Math.random() },
//             })
//             console.log(status)
//         }, 100)
//     }
// })