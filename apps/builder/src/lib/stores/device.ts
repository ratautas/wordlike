import { writable, derived } from 'svelte/store';
import { DEVICE_KEYS } from "@wordlike/nebula";

export const deviceKey = writable(DEVICE_KEYS.DESKTOP);

export const isDesktop = derived(deviceKey, ($key) => $key === DEVICE_KEYS.DESKTOP);
// export const isTablet = derived(deviceKey, ($key) => $key === DEVICE_KEYS.TABLET);
export const isMobile = derived(deviceKey, ($key) => $key === DEVICE_KEYS.MOBILE);