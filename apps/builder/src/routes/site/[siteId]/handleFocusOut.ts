import { recalculatePositions } from "$lib/stores/element";

export function handleFocusIn(e: FocusEvent) { }

export function handleFocusOut(e: FocusEvent) {
    recalculatePositions();
}