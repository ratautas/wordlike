import { DEFAULT_GRID_WIDTH } from "$lib/constants";

export const MIN_WIDTH = 100;
export const MIN_HEIGHT = 100;

// This function is used to limit position bounds to the grid
export function getPosition(elementData, diffX, diffY, resizeDirection, blockWidth = DEFAULT_GRID_WIDTH) {
  const { desktop } = elementData;

  const positon = { ...desktop };

  // Default drag behavior (without resizing)
  if (!resizeDirection) {
    const minX = Math.max(desktop.x + diffX, 0);
    const maxX = blockWidth - desktop.width;
    const minY = Math.max(desktop.y + diffY, 0);
    const maxY = blockWidth - desktop.height;

    positon.x = Math.min(minX, maxX);
    positon.y = Math.min(minY, maxY);

    return positon;
  }

  if (resizeDirection.includes("N")) {
    const minY = Math.max(desktop.y + diffY, 0);
    const maxY = desktop.y + desktop.height - MIN_HEIGHT;
    const minHeight = Math.max(desktop.height - diffY, MIN_HEIGHT);
    const maxHeight = desktop.y + desktop.height;

    positon.y = Math.min(minY, maxY);
    positon.height = Math.min(minHeight, maxHeight);
    if (resizeDirection === "N") return positon;
  }

  if (resizeDirection.includes("E")) {
    const minWidth = Math.max(desktop.width + diffX, MIN_WIDTH);
    const maxWidth = blockWidth - desktop.x;

    positon.width = Math.min(minWidth, maxWidth);
    if (resizeDirection === "E") return positon;
  }

  if (resizeDirection.includes("S")) {
    const minHeight = Math.max(desktop.height + diffY, MIN_HEIGHT);

    positon.height = Math.min(minHeight, blockWidth - desktop.y);
    if (resizeDirection === "S") return positon;
  }

  if (resizeDirection.includes("W")) {
    const minX = Math.max(desktop.x + diffX, 0);
    const maxX = desktop.x + desktop.width - MIN_WIDTH;
    const minWidth = Math.max(desktop.width - diffX, MIN_WIDTH);
    const maxWidth = desktop.x + desktop.width;

    positon.x = Math.min(minX, maxX);
    positon.width = Math.min(minWidth, maxWidth);
    if (resizeDirection === "W") return positon;
  }

  return positon;
};

export function calculateGrid(
  blockData,
  dragDiffX,
  dragDiffY,
  resizeDirection,
  selectedElementIds
) {
  const { rows, columns, positions } = blockData?.children?.reduce(
    (acc, element) => {
      const isElementDragged = selectedElementIds.includes(element.id);
      // const dragDiffX = isElementDragged ? dragDiffX : 0;
      // const dragDiffY = isElementDragged ? dragDiffY : 0;

      const { x, y, width, height } = isElementDragged
        ? getPosition(element, dragDiffX, dragDiffY, resizeDirection, blockData.width)
        : element.desktop;

      acc.columns.add(x);
      acc.columns.add(x + width);
      acc.rows.add(y);
      acc.rows.add(y + height);
      acc.positions.push({ x, y, width, height });

      return acc;
    },
    {
      rows: new Set([0]),
      columns: new Set([0, blockData.width ?? DEFAULT_GRID_WIDTH]),
      positions: [],
    }
  );

  const gridRows = [...rows].sort((a, b) => a - b);
  const gridColumns = [...columns].sort((a, b) => a - b);

  const gridAreas = positions.map((position) => {
    const { x, y, width, height } = position;

    const rowStartIndex = gridRows.indexOf(y) + 1;
    const rowEndIndex = gridRows.indexOf(y + height) + 1;
    const columnStartIndex = gridColumns.indexOf(x) + 1;
    const columnEndIndex = gridColumns.indexOf(x + width) + 1;

    return {
      rowStartIndex,
      rowEndIndex,
      columnStartIndex,
      columnEndIndex,
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

  return { gridAreas, gridTemplateRows, gridTemplateColumns };
}
