import { writable, derived, get } from 'svelte/store';

export const POSITION_KEYS = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile',
};

export const BREAKPOINTS = {
  DESKTOP: {
    key: 'desktop',
    value: 1224,
  },
  TABLET: {
    key: 'tablet',
    value: 768,
  },
  MOBILE: {
    key: 'mobile',
    value: 375,
  },
};

export const currentBreakpoint = writable(BREAKPOINTS.DESKTOP);

export const positionKey = derived(currentBreakpoint, ($breakpoint) => $breakpoint.key);

export const isDesktop = derived(positionKey, ($key) => $key === POSITION_KEYS.DESKTOP);
export const isTablet = derived(positionKey, ($key) => $key === POSITION_KEYS.TABLET);
export const isMobile = derived(positionKey, ($key) => $key === POSITION_KEYS.MOBILE);