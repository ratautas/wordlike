// Channel name can be any string.
// Create channels with the same name for both the broadcasting and receiving clients.

import { writable } from 'svelte/store';

export const isLoaded = writable(false);
export const doc = writable(null);