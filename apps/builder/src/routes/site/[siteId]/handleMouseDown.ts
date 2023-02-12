import { get } from "svelte/store";

import { refStore } from "$lib/actions/ref";

import {
    initialMousePosition,
    isDragging,
} from "$lib/stores/drag";
import {
    selectedElementIds,
} from "$lib/stores/element";
import { isShiftPressed } from "$lib/stores/keys";

export function handleMouseDown(event: MouseEvent) {
};