import { getBoundedPosition } from "$lib/utils/getBoundedPosition";
import { DEVICE_DEFAULTS } from "$lib/constants";
import type { ElementType, GridElementType } from "$lib/schema";

export const MIN_WIDTH = 24;
export const MIN_HEIGHT = 24;

export type GridCalculationParams = {
    elementData: GridElementType;
    device: string; // TODO: enum
};

export function calculateGrid({
    elementData,
    device
}: GridCalculationParams) {
    if (!elementData) return {};
    const { rows, columns, positions } = elementData
        .children?.reduce((acc, element: ElementType) => {
            const { x, y, width, height } = element[device] ?? DEVICE_DEFAULTS[device];

            acc.columns.add(x);
            acc.columns.add(x + width);
            acc.rows.add(y);
            acc.rows.add(y + height);
            acc.positions.push({ x, y, width, height });

            return acc;
        }, {
            rows: new Set([0]),
            columns: new Set([0, elementData[device] ?? DEVICE_DEFAULTS[device]]),
            positions: [],
        }
        );

    const gridRows = [...rows].sort((a, b) => a - b);
    const gridColumns = [...columns].sort((a, b) => a - b);
    const gridHeight = gridRows[gridRows.length - 1];

    const gridAreas = positions.map((position) => {
        const { x, y, width, height, snapLeft, snapRight } = position;

        const rowStartIndex = gridRows.indexOf(y) + 2;
        const rowEndIndex = gridRows.indexOf(y + height) + 2;
        const columnCount = gridColumns.length;
        const columnStartIndex = snapLeft ? 1 : gridColumns.indexOf(x) + 2;
        const columnEndIndex = snapRight ? columnCount + 2 : gridColumns.indexOf(x + width) + 2;
        return [rowStartIndex, columnStartIndex, rowEndIndex, columnEndIndex].join("/");
    });

    const { gridTemplateRows } = gridRows
        .filter((i) => i > 0)
        .reduce(
            (acc, row) => {
                const currentRow = row - acc.previousRow;
                return {
                    gridTemplateRows: [...acc.gridTemplateRows, currentRow],
                    previousRow: acc.previousRow + currentRow,
                };
            },
            {
                gridTemplateRows: [],
                previousRow: 0,
            }
        );

    const { gridTemplateColumns } = gridColumns
        .filter((i) => i > 0)
        .reduce(
            (acc, column) => {
                const currentColumn = column - acc.previousColumn;
                return {
                    gridTemplateColumns: [...acc.gridTemplateColumns, currentColumn],
                    previousColumn: acc.previousColumn + currentColumn,
                };
            },
            {
                gridTemplateColumns: [],
                previousColumn: 0,
            }
        );

    return { gridAreas, gridHeight, gridTemplateRows, gridTemplateColumns };
};
