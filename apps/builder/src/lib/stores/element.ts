import { writable, derived, get } from 'svelte/store';

import { page } from "$app/stores";
import { doc } from '$lib/stores/doc';
import { dragDiffX, dragDiffY, draggedControl } from '$lib/stores/drag';
import { getPosition } from "$lib/utils/position";
import { supabaseClient } from "$lib/supabase";

interface MousePosition {
  x: number | null;
  y: number | null;
};

type ElementRef = HTMLElement | null;
type ElementPath = ElementRef[];

export const currentElementId = writable();
export const draggedElementId = writable();
export const focusedElementId = writable();
export const selectedElementIds = writable([] as string[]);

export const updateCurrentElementData = (data: any) => {

};

export const findById = (array, id) => {
  return array?.find((i) => i.id === id || i.children && findById(i.children, id));
};

export const currentElementData = derived([doc, currentElementId], ([$doc, $currentElementId]) => {
  if (!$doc || !$currentElementId) return null;
  console.log($doc, $currentElementId)
  const el = findById($doc.pages, $currentElementId);
  console.log(el)
  // $doc?.pages.find()

});


export async function updateDraggedElementsData() {
  const mapChildren = (children) => {
    return children?.map((element) => {
      if (elementIds.includes(element.id)) {
        return {
          ...element,
          layout: {
            default: getPosition(element, get(dragDiffX), get(dragDiffY), get(draggedControl))
          },
        };
      }
      return {
        ...element,
        children: mapChildren(element.children),
      };
    });
  };

  const elementIds = get(selectedElementIds);
  const $doc = get(doc);

  const { siteId } = get(page).params;

  $doc.pages = $doc?.pages.map((page) => {
    return {
      ...page,
      children: mapChildren(page.children),
    }
  });

  // TODO: this is kinda optimistic, we should wait for the response from the server
  // we can do this, but on failure we need to revert the doc to the initial state
  doc.set($doc);

  const { data, error } = await supabaseClient
    .from('sites')
    .update({ doc: $doc })
    .eq('id', siteId)
    .select();

  // await supabaseClient
  //   .from('sites')
  //   .update({ doc: $doc })
  //   .eq('id', siteId)
  //   .select();
}