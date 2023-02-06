import {
    isDragInserting,
} from "$lib/stores/drag";
import {
    insertingElement,
    deleteSelectedElements,
    selectedElementIds,
    updateElementsPosition,
} from "$lib/stores/element";
import { isShiftPressed } from "$lib/stores/keys";
import { get } from "svelte/store";

export function handleKeyDown(event: KeyboardEvent) {
    const $isShiftPressed = get(isShiftPressed);

    if (event.key === "Shift") isShiftPressed.set(true);
    if (event.key === "Escape") {
        isDragInserting.set(false);
        insertingElement.set(null);
        selectedElementIds.set([]);
    }
    if (event.key === "Backspace") {
        // TODO: check if focused etc
        if (!document.activeElement) deleteSelectedElements();
    }

    const moveOffset = $isShiftPressed ? 10 : 1;

    if (event.key === "ArrowLeft") updateElementsPosition(-moveOffset, 0);
    if (event.key === "ArrowRight") updateElementsPosition(moveOffset, 0);
    if (event.key === "ArrowUp") updateElementsPosition(0, -moveOffset);
    if (event.key === "ArrowDown") updateElementsPosition(0, moveOffset);
}