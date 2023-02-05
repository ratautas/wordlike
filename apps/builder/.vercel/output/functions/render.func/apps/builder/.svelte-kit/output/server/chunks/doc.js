import { d as derived, w as writable } from "./index2.js";
import { p as page } from "./stores.js";
const doc = writable();
const currentPageIndex = derived(
  [doc, page],
  ([$doc, $page]) => {
    return $doc.pages.findIndex(({ slug, isHome }) => {
      return $page.params.slug ? slug === $page.params.slug : isHome;
    });
  }
);
const currentPageData = derived(
  [doc, currentPageIndex],
  ([$doc, $currentPageIndex]) => {
    return $doc?.pages[$currentPageIndex];
  }
);
export {
  currentPageData as a,
  currentPageIndex as c,
  doc as d
};
