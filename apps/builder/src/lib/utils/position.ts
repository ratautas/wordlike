import { DEFAULT_GRID_WIDTH } from "$lib/constants";

export const MIN_WIDTH = 100;
export const MIN_HEIGHT = 100;

export function getPosition(elementData, diffX, diffY, control) {
  const { desktop } = elementData;
  const blockWidth = DEFAULT_GRID_WIDTH;

  switch (control) {
    case "N": {
      const y = Math.max(desktop.y + diffY, 0);
      const maxY = desktop.y + desktop.height - MIN_HEIGHT;
      const height = Math.max(desktop.height - diffY, MIN_HEIGHT);
      const maxHeight = desktop.y + desktop.height;

      return {
        x: desktop.x,
        y: Math.min(y, maxY),
        width: desktop.width,
        height: Math.min(height, maxHeight),
      };
    };

    case "E": {
      const width = Math.max(desktop.width + diffX, MIN_WIDTH);

      return {
        x: desktop.x,
        y: desktop.y,
        height: desktop.height,
        width: Math.min(width, blockWidth - desktop.x),
      };
    };

    case "S": {
      const height = desktop.height + diffY;

      return {
        x: desktop.x,
        y: desktop.y,
        width: desktop.width,
        height: Math.max(height, MIN_HEIGHT),
      };
    };

    case "W": {
      const x = Math.max(desktop.x + diffX, 0);
      const maxX = desktop.x + desktop.width - MIN_WIDTH;
      const width = Math.max(desktop.width - diffX, MIN_WIDTH);
      const maxWidth = desktop.x + desktop.width;

      return {
        x: Math.min(x, maxX),
        y: desktop.y,
        height: desktop.height,
        width: Math.min(width, maxWidth),
      };
    };

    case "NE": {
      const y = Math.max(desktop.y + diffY, 0);
      const maxY = desktop.y + desktop.height - MIN_HEIGHT;
      const height = Math.max(desktop.height - diffY, MIN_HEIGHT);
      const maxHeight = desktop.y + desktop.height;
      const width = Math.max(desktop.width + diffX, MIN_WIDTH);

      return {
        x: desktop.x,
        y: Math.min(y, maxY),
        width: Math.min(width, blockWidth - desktop.x),
        height: Math.min(height, maxHeight),
      }
    };

    case "NW": {
      const x = Math.max(desktop.x + diffX, 0);
      const maxX = desktop.x + desktop.width - MIN_WIDTH;
      const width = Math.max(desktop.width - diffX, MIN_WIDTH);
      const maxWidth = desktop.x + desktop.width;
      const y = Math.max(desktop.y + diffY, 0);
      const maxY = desktop.y + desktop.height - MIN_HEIGHT;
      const height = Math.max(desktop.height - diffY, MIN_HEIGHT);
      const maxHeight = desktop.y + desktop.height;

      return {
        x: Math.min(x, maxX),
        y: Math.min(y, maxY),
        width: Math.min(width, maxWidth),
        height: Math.min(height, maxHeight),
      }
    };

    case "SE": {
      const width = Math.max(desktop.width + diffX, MIN_WIDTH);
      const height = desktop.height + diffY;

      return {
        x: desktop.x,
        y: desktop.y,
        width: Math.min(width, blockWidth - desktop.x),
        height: Math.max(height, MIN_HEIGHT),
      }
    };

    case "SW": {
      const x = Math.max(desktop.x + diffX, 0);
      const maxX = desktop.x + desktop.width - MIN_WIDTH;
      const width = Math.max(desktop.width - diffX, MIN_WIDTH);
      const maxWidth = desktop.x + desktop.width;
      const height = desktop.height + diffY;

      return {
        x: Math.min(x, maxX),
        y: desktop.y,
        width: Math.min(width, maxWidth),
        height: Math.max(height, MIN_HEIGHT),
      }
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
