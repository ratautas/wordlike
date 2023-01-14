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
export const draggedControl = writable();
export const initialMousePosition = writable({
  x: null,
  y: null,
} as MousePosition);
export const draggingMousePosition = writable({
  x: null,
  y: null,
} as MousePosition);

export const dragDiffX = derived(
  [initialMousePosition, draggingMousePosition],
  ([$initialMousePosition, $draggingMousePosition]) => {
    if ($initialMousePosition.x === null || $draggingMousePosition.x === null) return null;
    return $draggingMousePosition.x - $initialMousePosition.x;
  }
);

export const dragDiffY = derived(
  [initialMousePosition, draggingMousePosition],
  ([$initialMousePosition, $draggingMousePosition]) => {
    if ($initialMousePosition.y === null || $draggingMousePosition.y === null) return null;
    return $draggingMousePosition.y - $initialMousePosition.y;
  }
);


export function dragEndHandler(event: MouseEvent) {
  // add if statement to check if the element is being dragged at all
  updateDraggedElementsData();

  draggingMousePosition.set({ x: null, y: null });
  initialMousePosition.set({ x: null, y: null });
  elementPath.set([]);
  isDragging.set(false);

  draggedControl.set(null);
}