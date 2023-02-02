import { DEFAULT_GRID_MAX_WIDTH } from "$lib/constants";
import type { ElementType, GridElementType } from "@wordlike/nebula/schema";

export const MIN_WIDTH = 24;
export const MIN_HEIGHT = 24;

export type GetPositionParams = {
  elementData: ElementType;
  diffX?: number;
  diffY?: number;
  resizeDirection?: string;
  blockWidth?: number;
};

// This function is used to limit position bounds to the grid
// TODO: prevent resizing to be smaller than inner content
export function getBoundedPosition({
  elementData,
  diffX,
  diffY,
  resizeDirection,
  blockWidth = DEFAULT_GRID_MAX_WIDTH
}: GetPositionParams) {
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
      ? getBoundedPosition({
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
