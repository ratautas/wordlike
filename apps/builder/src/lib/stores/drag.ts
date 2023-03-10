import { writable, derived } from 'svelte/store';
interface MousePosition {
  x: number | null;
  y: number | null;
};

type ElementRef = HTMLElement | null;
type ElementPath = ElementRef[];

export const isDragging = writable(false);
export const isDragInserting = writable(false);
export const isClickInserting = writable(false);
export const resizeDirection = writable<string | null>(null);
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
    return $mouseMoveEvent?.composedPath() ?? [];
  }
)