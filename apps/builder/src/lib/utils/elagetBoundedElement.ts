import { DEVICE_DEFAULTS } from "@wordlike/nebula";
import type { DeviceKeyType, ElementType, GridElementType } from "@wordlike/nebula/package/schema";

export const MIN_WIDTH = 24;
export const MIN_HEIGHT = 24;

export type GetBoundedPositionParams = {
    elementData: ElementType;
    diffX: number | null;
    diffY: number | null;
    resizeDirection: string | null;
    gridElementData: GridElementType;
    device: DeviceKeyType;
};

// This function is used to limit position bounds to the grid
// TODO: prevent resizing to be smaller than inner content
export function elagetBoundedElement({
    elementData,
    gridElementData,
    diffX,
    diffY,
    resizeDirection,
    device,
}: GetBoundedPositionParams): ElementType {
    const initialPosition = elementData[device];
    const gridWidth = gridElementData[device]?.width ?? DEVICE_DEFAULTS[device].width;
    const position = { ...initialPosition };

    // Default drag behaviour (without resizing)
    if (!resizeDirection) {
        const minX = Math.max(initialPosition.x + diffX, 0);
        const maxX = gridWidth - initialPosition.width;
        const minY = Math.max(initialPosition.y + diffY, 0);
        // TODO: should be height, not width
        const maxY = gridWidth - initialPosition.height;

        if (!initialPosition.snapLeft && !initialPosition.snapRight) {
            position.x = Math.min(minX, maxX);
        }

        position.y = Math.min(minY, maxY);

        return {
            ...elementData,
            [device]: position
        }
    }

    if (resizeDirection.includes("N")) {
        const minY = Math.max(initialPosition.y + diffY, 0);
        const maxY = initialPosition.y + initialPosition.height - MIN_HEIGHT;
        const minHeight = Math.max(initialPosition.height - diffY, MIN_HEIGHT);
        const maxHeight = initialPosition.y + initialPosition.height;

        position.y = Math.min(minY, maxY);
        position.height = Math.min(minHeight, maxHeight);
        if (resizeDirection === "N") {
            return {
                ...elementData,
                [device]: position
            }
        }
    }

    if (resizeDirection.includes("E")) {
        const minWidth = Math.max(initialPosition.width + diffX, MIN_WIDTH);
        const maxWidth = gridWidth - initialPosition.x;

        position.width = Math.min(minWidth, maxWidth);
        if (resizeDirection === "E") {
            return {
                ...elementData,
                [device]: position
            }
        }
    }

    if (resizeDirection.includes("S")) {
        const minHeight = Math.max(initialPosition.height + diffY, MIN_HEIGHT);

        position.height = Math.min(minHeight, gridWidth - initialPosition.y);
        if (resizeDirection === "S") {
            return {
                ...elementData,
                [device]: position
            }
        }
    }

    if (resizeDirection.includes("W")) {
        const minX = Math.max(initialPosition.x + diffX, 0);
        const maxX = initialPosition.x + initialPosition.width - MIN_WIDTH;
        const minWidth = Math.max(initialPosition.width - diffX, MIN_WIDTH);
        const maxWidth = initialPosition.x + initialPosition.width;

        position.x = Math.min(minX, maxX);
        position.width = Math.min(minWidth, maxWidth);
        if (resizeDirection === "W") {
            return {
                ...elementData,
                [device]: position
            }
        }
    }

    return {
        ...elementData,
        [device]: position
    }
};