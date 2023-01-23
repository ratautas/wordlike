/**
 * @file Store for all the avaible element references
 * @module app/lib/stores/refs
**/

import { writable, derived } from 'svelte/store';

type ElementRef = HTMLElement | null;
type Refs = Record<string, { elementRef: ElementRef; width: number; height: number }>;

// Kas gali būti draggable:
// - elementas
// - elementas su child elementu
// - elemento resize handles
// - range slideriai
// - elemento pridėjimo mygtukas
// - drag and drop image upload
// - draggable toolbar'as

export const elementRefs = writable<Record<string, Refs>>({});

export function setElementRef(
  id: string,
  elementRef: ElementRef,
  width: number,
  height: number
) {
  elementRefs.update((refs) => {
    refs[id] = {
      elementRef,
      width,
      height,
    };
    console.log(refs);
    return refs;
  });
};

export function updateElementDimensions(
  id: string,
  width: number,
  height: number,
) {
  elementRefs.update((refs) => {
    refs[id].width = width;
    refs[id].height = height;

    return refs;
  });
};

export function deleteElementRef(id: string) {
  elementRefs.update((refs) => {
    delete refs[id];
    return refs;
  });
};