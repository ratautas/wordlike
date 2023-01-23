import {
  setElementRef,
  deleteElementRef,
} from "$lib/stores/refs";

type ElementRef = HTMLElement | null;

export function ref(elementRef: ElementRef, id: string) {
  setElementRef(id, elementRef);

  return {
    destroy() {
      deleteElementRef(id);
    },
  };
};