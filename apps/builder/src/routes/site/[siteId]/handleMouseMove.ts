import {
    dragMousePosition,
    isDragging,
    mouseMoveEvent,
} from "$lib/stores/drag";

let preventTracking = true;

isDragging.subscribe((value) => (preventTracking = !value));

export function handleMouseMove(event: MouseEvent) {
    mouseMoveEvent.set(event);
    if (preventTracking) return;
    dragMousePosition.set({ x: event.clientX, y: event.clientY });
}
