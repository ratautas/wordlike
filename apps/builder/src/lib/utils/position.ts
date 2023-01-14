import { DEFAULT_GRID_WIDTH } from "$lib/constants";

export function getPosition(elementData, diffX, diffY, control) {
  const { desktop } = elementData;
  const blockWidth = DEFAULT_GRID_WIDTH;

  switch (control) {
    case "top":
      return {
        x: desktop.x,
        y: Math.max(desktop.y + diffY, 0),
        width: desktop.width,
        height: Math.min(desktop.height - diffY, desktop.y + desktop.height)
      };
    case "right":
      return {
        x: desktop.x,
        y: desktop.y,
        width: desktop.width + diffX,
        height: desktop.height,
      };
    case "bottom":
      return {
        x: desktop.x,
        y: desktop.y,
        width: desktop.width,
        height: desktop.height + diffY,
      };
    case "left":
      return {
        x: desktop.x + diffX,
        y: desktop.y,
        width: desktop.width - diffX,
        height: desktop.height,
      };
    case "topRight":
      return {
        x: desktop.x,
        y: desktop.y + diffY,
        width: desktop.width + diffX,
        height: desktop.height - diffY,
      };
    case "topLeft":
      return {
        x: desktop.x + diffX,
        y: desktop.y + diffY,
        width: desktop.width - diffX,
        height: desktop.height - diffY,
      };
    case "bottomRight":
      return {
        x: desktop.x,
        y: desktop.y,
        width: desktop.width + diffX,
        height: desktop.height + diffY,
      };
    case "bottomLeft":
      return {
        x: desktop.x + diffX,
        y: desktop.y,
        width: desktop.width - diffX,
        height: desktop.height + diffY,
      };
    default:
      return {
        x: Math.min(Math.max(desktop.x + diffX, 0), blockWidth - desktop.width),
        y: Math.max(desktop.y + diffY, 0),
        width: desktop.width,
        height: desktop.height,
      };
  }
};

// export function limitPosition(position, block) {
//   const blockWidth = block.width ?? DEFAULT_GRID_WIDTH;
//   const x = Math.min(Math.max(position.x, 0), blockWidth - position.width);
//   const y = Math.max(position.y, 0);
//   // const width = x === 0 ? position.width + position.x : Math.min(position.width, blockWidth - x);
//   const width = x === 0 ? position.width : Math.min(position.width, blockWidth - x);
//   const height = y === 0 ? position.height + position.y : position.height;
//   return {
//     y,
//     x,
//     width,
//     height,
//   };
// }

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
        // ? limitPosition(getPosition(element, dragDiffX, dragDiffY, draggedControl), block)
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
