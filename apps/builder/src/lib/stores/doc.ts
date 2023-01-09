import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { svelteSyncedStore } from "@syncedstore/svelte";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";
import initialDoc from "$lib/mock/doc.json";
import { browser, building, dev, version } from "$app/environment";

// Create your SyncedStore store
// export const store = syncedStore({ todos: [] });
export const store = syncedStore({});
// Export a Svelte store
export const docStore = svelteSyncedStore(store);

// // Create a document that syncs automatically using Y-WebRTC
if (browser) {
  const doc = getYjsDoc(store);
  const { connect, disconnect } = new WebrtcProvider("uniq-id1", doc);
  const persist = new IndexeddbPersistence("uniq-id1", doc);
}
