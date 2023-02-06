import { writable, derived } from 'svelte/store';
import { DEVICE_KEYS } from "@wordlike/nebula";
import type { DeviceKeyType } from "@wordlike/schema/types";

export const deviceKey = writable(DEVICE_KEYS.DESKTOP as DeviceKeyType);

export const isDesktop = derived(deviceKey, ($key) => $key === DEVICE_KEYS.DESKTOP);
// export const isTablet = derived(deviceKey, ($key) => $key === DEVICE_KEYS.TABLET);
export const isMobile = derived(deviceKey, ($key) => $key === DEVICE_KEYS.MOBILE);