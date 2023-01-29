import { getBoundedPosition } from "$lib/utils/getBoundedPosition";
import { calculateGrid } from '$lib/utils/calculateGrid';
import type { ElementType, GridElementType } from "$lib/schema";

export const MIN_WIDTH = 24;
export const MIN_HEIGHT = 24;

export function getGridCssVars(elementData: GridElementType) {
    const { gridTemplateRows, gridTemplateColumns } = calculateGrid(elementData);

    const templateRows = [paddingY ?? 0, ...gridTemplateRows, paddingY ?? 0]
        // .map((row) => `${row}px`)
        .map((row) => `minmax(${row}px, 0fr)`)
        .join(" ");

    const templateColumns = [
        `minmax(${paddingX ?? 0}px, calc(50% - ${gridWidth / 2}px))`,
        ...gridTemplateColumns,
        `minmax(${paddingX ?? 0}px, calc(50% - ${gridWidth / 2}px))`,
    ]
        .map((col) => {
            if (isNaN(col)) return col;
            return isRelativeWidth ? `${col / gridWidth}fr` : `${col}px`;
        })
        .join(" ");

    return { gridAreas, gridHeight, gridTemplateRows, gridTemplateColumns };
}
