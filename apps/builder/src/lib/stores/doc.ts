import { writable, derived } from 'svelte/store';
import { page } from "$app/stores";
import type { DocType } from '@wordlike/nebula';

export const doc = writable<DocType>();

export const currentPageIndex = derived(
  [doc, page],
  ([$doc, $page]) => {
    return $doc.pages.findIndex(({ slug, isHome }) => {
      return $page.params.slug ? slug === $page.params.slug : isHome;
    });
  });

export const currentPageData = derived(
  [doc, currentPageIndex],
  ([$doc, $currentPageIndex]) => {
    return $doc?.pages[$currentPageIndex];
  });
