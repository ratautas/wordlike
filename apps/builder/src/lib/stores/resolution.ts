import { writable, derived } from 'svelte/store';
import { BREAKPOINTS } from "@wordlike/nebula";

export const currentBreakpoint = writable(BREAKPOINTS.DESKTOP);

export const deviceKey = derived(currentBreakpoint, ($breakpoint) => $breakpoint.key);

export const isDesktop = derived(deviceKey, ($key) => $key === BREAKPOINTS.DESKTOP.key);
export const isTablet = derived(deviceKey, ($key) => $key === BREAKPOINTS.TABLET.key);
export const isMobile = derived(deviceKey, ($key) => $key === BREAKPOINTS.MOBILE.key);