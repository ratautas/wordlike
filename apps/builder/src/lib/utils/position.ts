import { DEFAULT_GRID_WIDTH } from "$lib/constants";

export function getPosition(elementData, diffX, diffY, control) {
  const { layout } = elementData;
  switch (control) {
    case "top":
      return {
        x: layout.default.x,
        y: layout.default.y + diffY,
        width: layout.default.width,
        height: layout.default.height - diffY,
      };
    case "right":
      return {
        x: layout.default.x,
        y: layout.default.y,
        width: layout.default.width + diffX,
        height: layout.default.height,
      };
    case "bottom":
      return {
        x: layout.default.x,
        y: layout.default.y,
        width: layout.default.width,
        height: layout.default.height + diffY,
      };
    case "left":
      return {
        x: layout.default.x + diffX,
        y: layout.default.y,
        width: layout.default.width - diffX,
        height: layout.default.height,
      };
    case "topRight":
      return {
        x: layout.default.x,
        y: layout.default.y + diffY,
        width: layout.default.width + diffX,
        height: layout.default.height - diffY,
      };
    case "topLeft":
      return {
        x: layout.default.x + diffX,
        y: layout.default.y + diffY,
        width: layout.default.width - diffX,
        height: layout.default.height - diffY,
      };
    case "bottomRight":
      return {
        x: layout.default.x,
        y: layout.default.y,
        width: layout.default.width + diffX,
        height: layout.default.height + diffY,
      };
    case "bottomLeft":
      return {
        x: layout.default.x + diffX,
        y: layout.default.y,
        width: layout.default.width - diffX,
        height: layout.default.height + diffY,
      };
    default:
      return {
        x: layout.default.x + diffX,
        y: layout.default.y + diffY,
        width: layout.default.width,
        height: layout.default.height,
      };
  }
};

export function calculateGrid(
  block,
  dragDiffX,
  dragDiffY,
  draggedControl,
  selectedElementIds
) {
  const { rows, columns, positions } = block?.children?.reduce(
    (acc, element) => {
      const isElementDragged = selectedElementIds.includes(element.id);
      const { x, y, width, height } = isElementDragged
        ? getPosition(element, dragDiffX, dragDiffY, draggedControl)
        : element.layout.default;

      acc.columns.add(x);
      acc.columns.add(x + width);
      acc.rows.add(y);
      acc.rows.add(y + height);
      acc.positions.push({ x, y, width, height });

      return acc;
    },
    {
      rows: new Set([0]),
      columns: new Set([0, block.width ?? DEFAULT_GRID_WIDTH]),
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
