import { DEFAULT_GRID_MAX_WIDTH } from "$lib/constants";
import type { ElementType, GridElementType } from "@wordlike/schema/types";

export const MIN_WIDTH = 24;
export const MIN_HEIGHT = 24;


export function calculateGrid(
  gridElementData,
  dragDiffX,
  dragDiffY,
  resizeDirection,
  selectedElementIds
) {
  const { rows, columns, positions } = gridElementData.children?.reduce((acc, element: ElementType) => {
    if (!element) return acc;
    const isElementDragged = selectedElementIds.includes(element?.id);
    const { x, y, width, height } = isElementDragged
      ? getBoundedElement({
        elementData: element,
        diffX: dragDiffX,
        diffY: dragDiffY,
        resizeDirection,
      })
      : element.desktop;

    acc.columns.add(x);
    acc.columns.add(x + width);
    acc.rows.add(y);
    acc.rows.add(y + height);
    acc.positions.push({ x, y, width, height });

    return acc;
  }, {
    rows: new Set([0]),
    columns: new Set([0, gridElementData.width ?? DEFAULT_GRID_MAX_WIDTH]),
    positions: [],
  }
  );

  const gridRows = [...rows].sort((a, b) => a - b);
  const gridColumns = [...columns].sort((a, b) => a - b);
  const gridHeight = gridRows[gridRows.length - 1];

  const gridAreas = positions.map((position) => {
    const { x, y, width, height } = position;

    const rowStartIndex = gridRows.indexOf(y) + 1;
    const rowEndIndex = gridRows.indexOf(y + height) + 1;
    const columnStartIndex = gridColumns.indexOf(x) + 1;
    const columnEndIndex = gridColumns.indexOf(x + width) + 1;

    return {
      rowStartIndex,
      rowEndIndex,
      rowCount: gridRows.length,
      columnStartIndex,
      columnEndIndex,
      columnCount: gridColumns.length,
    };
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
}
