import {
  setElementRef,
  updateElementDimensions,
  deleteElementRef,
} from "$lib/stores/refs";

type ElementRef = HTMLElement | null;
type RefParams = {
  id: string;
  width: number;
  height: number;
};

export function ref(elementRef: ElementRef, params: RefParams) {
  const { id, width, height } = params;
  setElementRef(id, elementRef, width, height);

  return {
    update(params: RefParams) {
      const { id, width, height } = params;
      updateElementDimensions(id, width, height);
    },

    destroy() {
      deleteElementRef(id);
    },
  };
};