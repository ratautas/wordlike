import { DEFAULT_DESKTOP_GRID_WIDTH } from "$lib/constants";
import type { ElementType, GridElementType } from "@wordlike/nebula";

export const MIN_WIDTH = 24;
export const MIN_HEIGHT = 24;

// This function is used to limit position bounds to the grid
// TODO: prevent resizing to be smaller than inner content
export function getBoundedPosition({
    elementData,
    diffX,
    diffY,
    resizeDirection,
    blockWidth = DEFAULT_DESKTOP_GRID_WIDTH
}) {
    const { desktop } = elementData;

    const position = { ...desktop };

    // Default drag behaviour (without resizing)
    if (!resizeDirection) {
        const minX = Math.max(desktop.x + diffX, 0);
        const maxX = blockWidth - desktop.width;
        const minY = Math.max(desktop.y + diffY, 0);
        const maxY = blockWidth - desktop.height;

        if (!desktop.snapLeft && !desktop.snapRight) {
            position.x = Math.min(minX, maxX);
        }

        position.y = Math.min(minY, maxY);

        return position;
    }

    if (resizeDirection.includes("N")) {
        const minY = Math.max(desktop.y + diffY, 0);
        const maxY = desktop.y + desktop.height - MIN_HEIGHT;
        const minHeight = Math.max(desktop.height - diffY, MIN_HEIGHT);
        const maxHeight = desktop.y + desktop.height;

        position.y = Math.min(minY, maxY);
        position.height = Math.min(minHeight, maxHeight);
        if (resizeDirection === "N") return position;
    }

    if (resizeDirection.includes("E")) {
        const minWidth = Math.max(desktop.width + diffX, MIN_WIDTH);
        const maxWidth = blockWidth - desktop.x;

        position.width = Math.min(minWidth, maxWidth);
        if (resizeDirection === "E") return position;
    }

    if (resizeDirection.includes("S")) {
        const minHeight = Math.max(desktop.height + diffY, MIN_HEIGHT);

        position.height = Math.min(minHeight, blockWidth - desktop.y);
        if (resizeDirection === "S") return position;
    }

    if (resizeDirection.includes("W")) {
        const minX = Math.max(desktop.x + diffX, 0);
        const maxX = desktop.x + desktop.width - MIN_WIDTH;
        const minWidth = Math.max(desktop.width - diffX, MIN_WIDTH);
        const maxWidth = desktop.x + desktop.width;

        position.x = Math.min(minX, maxX);
        position.width = Math.min(minWidth, maxWidth);
        if (resizeDirection === "W") return position;
    }

    return position;
};