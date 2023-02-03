import { writable, derived, get } from 'svelte/store';
import { v4 as uuidv4 } from "uuid";

import { page } from "$app/stores";

import type { ElementType } from '@wordlike/nebula';
import { refStore } from "$lib/actions/ref";

import {
  dragMousePosition,
  initialMousePosition,
  isClickInserting,
  isDragInserting,
  isDragging,
  resizeDirection,
} from '$lib/stores/drag';
import { doc, currentPageData, currentPageIndex } from '$lib/stores/doc';
import { getBoundedElement } from "$lib/utils/getBoundedElement";
import { deviceKey } from '$lib/stores/resolution';
import { selectAll } from "$lib/utils/selectAll";
import { getGridElementsPositions } from "$lib/utils/getGridElementsPositions";
import { supabaseClient } from "$lib/supabase";
import { ELEMENT_TYPES } from '$lib/constants';

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
  PARAGRAPH: "PARAGRAPH",
  HEADING: "HEADING",
  BUTOTN: "BUTTON",
};

export const selectedElementIds = writable([] as string[]);
export const insertingElement = writable<ElementType | undefined | null>();

export const findById = (array: string[], id: string) => {
  return array?.find((i) => i.id === id || i.children && findById(i.children, id));
};

export function findElementById(id: string) {
  return derived(doc, ($doc) => {
    return findById($doc?.pages[get(currentPageIndex)].children, id);
  });
}

export function findSelectedIds(array, ids) {
  return array?.reduce((acc, el) => {
    if (ids.includes(el.id)) {
      return { ...acc, [el.id]: el };
    }
    if (el.children) {
      const childrenIds = findSelectedIds(el.children, ids);
      if (childrenIds) {
        return { ...acc, ...childrenIds };
      }
    }
    return acc;
  }, {});
}

export const selectedElementsDataMap = derived(
  [doc, selectedElementIds],
  ([$doc, $selectedElementIds]) => {
    if ($selectedElementIds.length === 0) return {};

    return findSelectedIds(
      $doc.pages[get(currentPageIndex)].children,
      $selectedElementIds
    );
  });

export function createInsertedElement(type) {
  const element = {
    id: uuidv4(),
    type,
    [get(deviceKey)]: {
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

export async function insertElement(closestParentId: string) {
  const elementData = get(insertingElement);
  const pageData = get(currentPageData);
  const pageIndex = get(currentPageIndex);
  const $refStore = get(refStore);
  const parentIndex = pageData.children.findIndex((el) => el.id === closestParentId);
  const closestParentRef = $refStore[closestParentId];
  const elementRef = $refStore[elementData.id];
  const activeElement = elementRef?.querySelector("[contenteditable]");
  const parentRect = closestParentRef.getBoundingClientRect();
  // This is a hack, we should not rely on the first child
  const elementRect = elementRef.firstChild.getBoundingClientRect();

  elementData[get(deviceKey)] = {
    ...elementData[get(deviceKey)],
    x: elementRect.x - parentRect.x,
    y: elementRect.y - parentRect.y,
    width: elementRect.width,
    height: elementRect.height,
  };

  doc.update(($doc) => {
    // TODO: should be recursive

    isDragInserting.set(false);
    isClickInserting.set(false);
    insertingElement.set(null);
    dragMousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
    isDragging.set(false);
    resizeDirection.set(null);

    $doc.pages[pageIndex].children[parentIndex].children = [
      ...$doc.pages[pageIndex].children[parentIndex].children,
      elementData,
    ];

    activeElement?.focus();
    selectAll(activeElement);

    return $doc;
  });
};

export async function deleteSelectedElements() {
  const elementIds = get(selectedElementIds);
  const pageIndex = get(currentPageIndex);

  function mapChildren(children) {
    return children?.filter((el) => !elementIds.includes(el.id))
      .map((el) => ({
        ...el,
        children: mapChildren(el.children),
      }))
  };

  doc.update(($doc) => {
    $doc.pages[pageIndex].children = mapChildren($doc.pages[pageIndex].children);

    return $doc;
  });


  selectedElementIds.set([]);
};

export async function updateElementsPosition(diffX: number | null, diffY: number | null) {
  const elementIds = get(selectedElementIds);
  const device = get(deviceKey);

  function boundElementChild(parent, element) {
    if (elementIds.includes(element.id)) {
      return getBoundedElement({
        elementData: element,
        gridElementData: parent,
        diffX,
        diffY,
        device,
        resizeDirection: get(resizeDirection),
      });
    }

    if (element.children) {
      return {
        ...element,
        children: element.children.map((child) => boundElementChild(element, child)),
      }
    }

    return element;
  };

  const pageIndex = get(currentPageIndex);

  doc.update(($doc) => {
    $doc.pages[pageIndex].children = $doc.pages[pageIndex].children.map((element) => {
      return {
        ...element,
        children: element.children.map((child) => boundElementChild(element, child)),
      }
    });
    return $doc;
  });

  // TODO: this is kinda optimistic, we should wait for the response from the server
  // we can do this, but on failure we need to revert the doc to the initial state

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


export async function updateElementsSnap(snap) {
  const elementIds = get(selectedElementIds);
  const pageIndex = get(currentPageIndex);

  console.log('updateElementsSnap');

  function mapChildren(children) {
    return children?.map((element) => {
      if (elementIds.includes(element.id)) {
        return {
          ...element,
          [get(deviceKey)]: {
            ...element[get(deviceKey)],
            ...(snap === "LEFT" ? { snapLeft: true } : {}),
            ...(snap === "RIGHT" ? { snapRight: true } : {}),
          },
          children: mapChildren(element.children),
        };
      }
      return {
        ...element,
        children: mapChildren(element.children),
      };
    });
  };

  doc.update(($doc) => {
    $doc.pages[pageIndex].children = mapChildren($doc.pages[pageIndex].children);

    return $doc;
  });

  // TODO: this is kinda optimistic, we should wait for the response from the server
  // we can do this, but on failure we need to revert the doc to the initial state

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

export function recalculatePositions() {
  function mapChildren(el) {
    if (el.type !== ELEMENT_TYPES.GRID) return el;

    const $refStore = get(refStore);

    if (!Object.keys($refStore).length) return el;

    return {
      ...el,
      children: el.children?.map((element: ElementType) => {
        const elementRef = $refStore[element.id];
        const gridRef = $refStore[`${el.id}::GRID`];
        const $deviceKey = get(deviceKey);
        const position = element[$deviceKey];
        const { x, width, snapLeft, snapRight } = position;
        const snap = snapLeft || snapRight;

        if (!elementRef) return element;
        if (!gridRef) return element;

        const gridRect = gridRef.getBoundingClientRect();
        const elementRect = elementRef.getBoundingClientRect();

        return {
          ...element,
          [$deviceKey]: {
            ...element[$deviceKey],
            x: snap ? x : elementRect.x - gridRect.x,
            y: elementRect.y - gridRect.y,
            width: snap ? width : elementRect.width,
            height: elementRect.height,
          },
          children: element.children?.map(mapChildren),
        };
      })
    }
  };

  const pageIndex = get(currentPageIndex);
  doc.update(($doc) => {
    $doc.pages[pageIndex].children = $doc.pages[pageIndex].children.map(mapChildren);

    return $doc;
  });
}