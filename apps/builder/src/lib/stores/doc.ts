import { writable, derived, get } from 'svelte/store';
import { page } from "$app/stores";

export const doc = writable(null);

export const currentPageIndex = derived(
  [doc, page],
  ([$doc, $page]) => {
    return $doc?.pages?.findIndex(({ slug, isHome }) => {
      return $page.params.slug ? slug === $page.params.slug : isHome;
    });
  });

export const currentPageData = derived(
  [doc, currentPageIndex],
  ([$doc, $currentPageIndex]) => {
    return $doc?.pages?.[$currentPageIndex];
  });
