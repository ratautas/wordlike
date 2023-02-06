import { get } from "svelte/store";

import { refStore } from "$lib/actions/ref";

import {
    initialMousePosition,
    isDragging,
    isClickInserting,
} from "$lib/stores/drag";
import {
    insertingElement,
    insertElement,
    selectedElementIds,
} from "$lib/stores/element";
import { isShiftPressed } from "$lib/stores/keys";

export function handleMouseDown(event: MouseEvent) {
    const $refStore = get(refStore);
    const $selectedElementIds = get(selectedElementIds);
    const $isShiftPressed = get(isShiftPressed);
    const $isClickInserting = get(isClickInserting);
    const $insertingElement = get(insertingElement);

    const elementsOnPath = event.composedPath().slice(0, -4) as HTMLElement[];

    if ($isClickInserting) {
        elementsOnPath.reverse();

        const closestParentId = elementsOnPath.reduce((prev, el) => {
            if (!!prev) return prev;
            return Object.keys($refStore).find((key) => {
                return (
                    $refStore[key].elementRef === el && key !== $insertingElement?.id
                );
            });
        }, null);

        insertElement(closestParentId);

        return;
    }

    const refId = elementsOnPath.reduce((acc, elOnPath) => {
        if (!!acc) return acc;
        return Object.keys($refStore).find((key) => {
            return $refStore[key].elementRef === elOnPath;
        });
    }, null);

    if (!refId) return;

    const targetElementRef = $refStore[refId].elementRef;
    const selectedSiblingsRefs = [
        ...($refStore[$selectedElementIds[0]]?.elementRef?.parentElement
            ?.children ?? []),
    ];
    const isTargetSelected = $selectedElementIds.includes(refId);
    const isOneOfSiblings = selectedSiblingsRefs.includes(targetElementRef);

    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });

    if ($selectedElementIds.length > 0) {
        if (isOneOfSiblings) {
            if ($isShiftPressed) {
                if (isTargetSelected) {
                    selectedElementIds.set(
                        $selectedElementIds.filter((id) => id !== refId)
                    );
                } else {
                    selectedElementIds.set([...$selectedElementIds, refId]);
                }
            } else if ($selectedElementIds.length === 1) {
                if ($selectedElementIds[0] !== refId) {
                    selectedElementIds.set([refId]);
                }
            }
        } else {
            selectedElementIds.set([refId]);
        }
    } else {
        selectedElementIds.set([refId]);
    }
}