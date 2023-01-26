import { writable, derived } from 'svelte/store';

import { updateDraggedElementsData } from '$lib/stores/element';
interface MousePosition {
  x: number | null;
  y: number | null;
};

type ElementRef = HTMLElement | null;
type ElementPath = ElementRef[];

export const mouseDownComposedPath = writable([] as ElementPath);
export const isDragging = writable(false);
export const isDragInserting = writable(false);
export const isClickInserting = writable(false);
export const resizeDirection = writable();
export const mouseMoveEvent = writable<MouseEvent>();
export const initialMousePosition = writable({
  x: null,
  y: null,
} as MousePosition);
export const dragMousePosition = writable({
  x: null,
  y: null,
} as MousePosition);

export const dragDiffX = derived(
  [initialMousePosition, dragMousePosition],
  ([$initialMousePosition, $dragMousePosition]) => {
    if ($initialMousePosition.x === null || $dragMousePosition.x === null) return null;
    return $dragMousePosition.x - $initialMousePosition.x;
  }
);

export const dragDiffY = derived(
  [initialMousePosition, dragMousePosition],
  ([$initialMousePosition, $dragMousePosition]) => {
    if ($initialMousePosition.y === null || $dragMousePosition.y === null) return null;
    return $dragMousePosition.y - $initialMousePosition.y;
  }
);

export const hasDragged = derived(
  [dragDiffX, dragDiffY],
  ([$x, $y]) => {
    return $x !== null && $x !== 0 && $y !== null && $y !== 0;
  });

export const isInserting = derived(
  [isDragInserting, isClickInserting],
  ([$isDragInserting, $isClickInserting]) => {
    return $isDragInserting || $isClickInserting;
  });

export const mouseMoveComposedPath = derived(
  [mouseMoveEvent],
  ([$mouseMoveEvent]) => {
    const path = $mouseMoveEvent?.composedPath().slice(0, -4) ?? []; // shave off the last 4 elements (the body, html, document, window)
    path.reverse(); // reverse the path so that the first element is the root element
    return path;
  }
)