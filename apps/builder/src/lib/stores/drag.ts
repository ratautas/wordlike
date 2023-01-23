import { writable, derived } from 'svelte/store';

import { updateDraggedElementsData } from '$lib/stores/element';
interface MousePosition {
  x: number | null;
  y: number | null;
};

type ElementRef = HTMLElement | null;
type ElementPath = ElementRef[];

export const elementPath = writable([] as ElementPath);
export const isDragging = writable(false);
export const isInserting = writable(false);
export const resizeDirection = writable();
export const initialMousePosition = writable({
  x: null,
  y: null,
} as MousePosition);
export const mousePosition = writable({
  x: null,
  y: null,
} as MousePosition);

export const dragDiffX = derived(
  [initialMousePosition, mousePosition],
  ([$initialMousePosition, $mousePosition]) => {
    if ($initialMousePosition.x === null || $mousePosition.x === null) return null;
    return $mousePosition.x - $initialMousePosition.x;
  }
);

export const dragDiffY = derived(
  [initialMousePosition, mousePosition],
  ([$initialMousePosition, $mousePosition]) => {
    if ($initialMousePosition.y === null || $mousePosition.y === null) return null;
    return $mousePosition.y - $initialMousePosition.y;
  }
);

export function dragEndHandler(event: MouseEvent) {
  // add if statement to check if the element is being dragged at all
  updateDraggedElementsData();

  mousePosition.set({ x: null, y: null });
  initialMousePosition.set({ x: null, y: null });
  elementPath.set([]);
  isDragging.set(false);
  resizeDirection.set(null);
};