import { writable, derived, get } from 'svelte/store';
import { v4 as uuidv4 } from "uuid";

import { page } from "$app/stores";

import {
  dragDiffX,
  dragDiffY,
  dragMousePosition,
  initialMousePosition,
  isClickInserting,
  isDragInserting,
  isDragging,
  resizeDirection,
} from '$lib/stores/drag';
import { doc, currentPageData, currentPageIndex } from '$lib/stores/doc';
import { getPosition } from "$lib/utils/position";
import { refs } from '$lib/stores/refs';
import { positionKey } from '$lib/stores/resolution';
import { selectAll } from "$lib/utils/selectAll";
import { supabaseClient } from "$lib/supabase";

export const DEFAULT_INSERTED_ELEMENT_WIDTH = 300;
export const DEFAULT_INSERTED_ELEMENT_HEIGHT = 72;
export const INITIAL_INSERTED_PARAGRAPHS = [
  "Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way.",
  "I’m not superstitious, but I am a little stitious.",
  "And I knew exactly what to do. But in a much more real sense, I had no idea what to do.",
  "I wish there was a way to know you’re in the good old days before you’ve actually left them.",
  "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
  "I’m not saying I invented the question mark. But I’m also not saying I didn’t.",
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
    [get(positionKey)]: {
      width: DEFAULT_INSERTED_ELEMENT_WIDTH,
      height: DEFAULT_INSERTED_ELEMENT_HEIGHT,
    },
  };

  if (type === INSERTED_TYPES.PARAGRAPH) {
    element.type = "TEXT";
    element.html = `<p>${INITIAL_INSERTED_PARAGRAPHS[Math.floor(Math.random() * INITIAL_INSERTED_PARAGRAPHS.length)]}</p>`;
  }

  insertingElement.set(element);
};

export async function insertElement(closestParentId) {
  console.log(closestParentId);
  const elementData = get(insertingElement);
  const pageData = get(currentPageData);
  const pageIndex = get(currentPageIndex);
  const $refs = get(refs);
  const parentIndex = pageData.children.findIndex((el) => el.id === closestParentId);
  const closestParentRef = $refs[closestParentId];
  const elementRef = $refs[elementData.id];
  const activeElement = elementRef?.querySelector("[contenteditable]");
  const parentRect = closestParentRef.getBoundingClientRect();
  // This is a hack, we should not rely on the first child
  const elementRect = elementRef.firstChild.getBoundingClientRect();

  elementData[get(positionKey)] = {
    ...elementData[get(positionKey)],
    x: elementRect.x - parentRect.x,
    y: elementRect.y - parentRect.y,
    width: elementRect.width,
    height: elementRect.height,
  };

  doc.update((doc) => {
    // TODO: should be recursive

    isDragInserting.set(false);
    isClickInserting.set(false);
    insertingElement.set(null);
    dragMousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
    isDragging.set(false);
    resizeDirection.set(null);

    doc.pages[pageIndex].children[parentIndex].children = [
      ...doc.pages[pageIndex].children[parentIndex].children,
      elementData,
    ];

    activeElement?.focus();
    selectAll(activeElement);

    return doc;
  });
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
          [get(positionKey)]: position,
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
};