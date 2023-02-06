import { isShiftPressed } from "$lib/stores/keys";

export function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(false);
}