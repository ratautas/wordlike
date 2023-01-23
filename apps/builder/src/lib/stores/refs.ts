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
) {
  elementRefs.update((refs) => {
    refs[id] = elementRef;

    return refs;
  });
};

export function deleteElementRef(id: string) {
  elementRefs.update((refs) => {
    delete refs[id];
    return refs;
  });
};