import { writable, derived, get } from 'svelte/store';
import { v4 as uuidv4 } from "uuid";

import { page } from "$app/stores";

import { doc } from '$lib/stores/doc';
import { isInserting } from '$lib/stores/drag';
import { dragDiffX, dragDiffY, resizeDirection } from '$lib/stores/drag';
import { getPosition } from "$lib/utils/position";
import { supabaseClient } from "$lib/supabase";

export const DEFAULT_INSERTED_ELEMENT_WIDTH = 300;
export const INITIAL_INSERTED_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
];
export const INSERTED_TYPES = {
  PARAGRAPH: "PARAGRAPH"
};

export const selectedElementIds = writable([] as string[]);
export const insertingElement = writable();

export const findById = (array, id) => {
  return array?.find((i) => i.id === id || i.children && findById(i.children, id));
};

export function createInsertedElement(type) {
  const element = {
    id: uuidv4(),
    type,
    desktop: {
      width: DEFAULT_INSERTED_ELEMENT_WIDTH,
      height: 200,
    },
  };

  if (type === INSERTED_TYPES.PARAGRAPH) {
    element.type = "TEXT";
    element.html = `<p>${INITIAL_INSERTED_PARAGRAPHS[Math.floor(Math.random() * INITIAL_INSERTED_PARAGRAPHS.length)]}</p>`;
  }

  insertingElement.set(element);
};

export function startInserting(type) {
  isInserting.set(true);
  createInsertedElement(type);
};

export async function updateDraggedElementsData() {
  function mapChildren(children) {
    return children?.map((element) => {
      if (elementIds.includes(element.id)) {
        const position = getPosition({
          elementData: element,
          diffX: get(dragDiffX),
          diffY: get(dragDiffY),
          resizeDirection: get(resizeDirection),
          blockWidth: element.width,
        });

        return {
          ...element,
          desktop: position,
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