import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-40cabda5.js';
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-40cabda5.js","_app/immutable/chunks/index-932b5f3a.js","_app/immutable/chunks/supabase-4de9858b.js","_app/immutable/chunks/browser-ponyfill-10e9505f.js","_app/immutable/chunks/navigation-34c5c503.js","_app/immutable/chunks/singletons-fa90fae2.js"];
export const stylesheets = ["_app/immutable/assets/_layout-a6343507.css"];
export const fonts = [];
