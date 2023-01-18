import { writable, derived, get } from 'svelte/store';

import { page } from "$app/stores";
import { doc } from '$lib/stores/doc';
import { dragDiffX, dragDiffY, resizeDirection } from '$lib/stores/drag';
import { getPosition } from "$lib/utils/position";
import { supabaseClient } from "$lib/supabase";

export const selectedElementIds = writable([] as string[]);

export const findById = (array, id) => {
  return array?.find((i) => i.id === id || i.children && findById(i.children, id));
};

export async function updateDraggedElementsData() {
  function mapChildren(children) {
    console.log('mapChildren', children);
    return children?.map((element) => {
      if (elementIds.includes(element.id)) {
        return {
          ...element,
          desktop: getPosition(element, get(dragDiffX), get(dragDiffY), get(resizeDirection))
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

  $doc.pages = $doc?.pages.map((page) => {
    return {
      ...page,
      children: mapChildren(page.children),
    }
  });

  // TODO: this is kinda optimistic, we should wait for the response from the server
  // we can do this, but on failure we need to revert the doc to the initial state
  doc.set($doc);

  const { siteId } = get(page).params;
  // const { data, error } = await supabaseClient
  //   .from('sites')
  //   .update({ doc: $doc })
  //   .eq('id', siteId)
  //   .select();

  // await supabaseClient
  //   .from('sites')
  //   .update({ doc: $doc })
  //   .eq('id', siteId)
  //   .select();
}