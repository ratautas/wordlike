import { get } from "svelte/store";

import { refStore } from "$lib/actions/ref";

import {
    dragMousePosition,
    hasDragged,
    initialMousePosition,
    isDragging,
    isDragInserting,
    isClickInserting,
    resizeDirection,
    dragDiffX,
    dragDiffY,
} from "$lib/stores/drag";
import {
    insertingElement,
    insertElement,
    selectedElementIds,
    updateElementsPosition,
    updateElementsSnap,
} from "$lib/stores/element";

export function handleMouseUp(event: MouseEvent) {
    const elementsOnPath = event.composedPath().slice(0, -4);
    const $refStore = get(refStore);
    const $insertingElement = get(insertingElement);
    const $selectedElementIds = get(selectedElementIds);
    const $dragDiffX = get(dragDiffX);
    const $dragDiffY = get(dragDiffY);
    const $resizeDirection = get(resizeDirection);
    const $isDragInserting = get(isDragInserting);
    const $hasDragged = get(hasDragged);

    if ($isDragInserting) {
        elementsOnPath.reverse();
        const closestParentId = elementsOnPath.reduce((acc, el) => {
            if (!!acc) return acc;
            return Object.keys($refStore).find((id) => {
                return (
                    $refStore[id].elementRef === el && id !== $insertingElement?.id
                );
            });
        }, null);
        insertElement(closestParentId);
    }

    if ($selectedElementIds.length > 0) {
        updateElementsPosition($dragDiffX, $dragDiffY);
    }

    if ($resizeDirection) {
        const snap = elementsOnPath.reduce((acc, el) => {
            if (!!acc) return acc;

            return Object.entries($refStore).reduce((dir, [key, refEntry]) => {
                if (!!dir) return dir;
                if (refEntry.overshootLeftRef === el) return "LEFT";
                if (refEntry.overshootRightRef === el) return "RIGHT";
            }, null);
        }, null);
        if (snap) updateElementsSnap(snap);
    }

    dragMousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
    isDragging.set(false);
    resizeDirection.set(null);
}
