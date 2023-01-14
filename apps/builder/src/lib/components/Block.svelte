<script lang="ts">
  import BlockBackground from "$lib/components/BlockBackground.svelte";
  import BlockElement from "$lib/components/BlockElement.svelte";
  import { DEFAULT_GRID_WIDTH } from "$lib/constants";
  import { dragDiffX, dragDiffY, draggedControl } from "$lib/stores/drag";
  import { getPosition } from "$lib/utils/position";
  import { selectedElementIds } from "$lib/stores/element";

  function calculateGrid(
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

        const columnStart = x;
        const columnEnd = x + width;
        const rowStart = y;
        const rowEnd = y + height;

        acc.columns.add(columnStart);
        acc.columns.add(columnEnd);
        acc.rows.add(rowStart);
        acc.rows.add(rowEnd);

        acc.positions.push({
          id: element.id,
          rowStart,
          rowEnd,
          columnStart,
          columnEnd,
        });

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

    const gridPositions = positions.map((position) => {
      const { rowStart, rowEnd, columnStart, columnEnd } = position;
      const rowStartIndex = gridRows.indexOf(rowStart) + 1;
      const rowEndIndex = gridRows.indexOf(rowEnd) + 1;
      const columnStartIndex = gridColumns.indexOf(columnStart) + 1;
      const columnEndIndex = gridColumns.indexOf(columnEnd) + 1;

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
        (acc, row, index) => {
          if (index === 0) {
            return {
              gridTemplateRows: [...acc.gridTemplateRows, row],
              lastRow: row,
            };
          }
          const newRow = row - acc.lastRow;
          return {
            gridTemplateRows: [...acc.gridTemplateRows, newRow],
            lastRow: acc.lastRow + newRow,
          };
        },
        {
          gridTemplateRows: [],
          lastRow: 0,
        }
      );

    const { gridTemplateColumns } = gridColumns
      .filter((i) => i > 0)
      .reduce(
        (acc, column, index) => {
          if (index === 0) {
            return {
              gridTemplateColumns: [...acc.gridTemplateColumns, column],
              lastColumn: column,
            };
          }
          const newColumn = column - acc.lastColumn;
          return {
            gridTemplateColumns: [...acc.gridTemplateColumns, newColumn],
            lastColumn: acc.lastColumn + newColumn,
          };
        },
        {
          gridTemplateColumns: [],
          lastColumn: 0,
        }
      );

    return { gridPositions, gridTemplateRows, gridTemplateColumns };
  }

  $: width = `${block?.width ?? DEFAULT_GRID_WIDTH}px`;

  $: ({ gridPositions, gridTemplateRows, gridTemplateColumns } = calculateGrid(
    $dragDiffX,
    $dragDiffY,
    $draggedControl,
    $selectedElementIds
  ));

  export let block;
</script>

<div
  class="block relative mx-auto"
  style:--max-width={width}
  style:--grid-template-rows={gridTemplateRows.join("px ") + "px"}
  style:--grid-template-columns={gridTemplateColumns.join("px ") + "px"}
>
  <BlockBackground {block} />
  {#each block.children as element, i}
    <BlockElement {element} gridArea={gridPositions[i]} />
  {/each}
</div>

<style lang="scss">
  .block {
    border-left: solid 1px indianred;
    border-right: solid 1px indianred;
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);
    width: var(--max-width);
  }
</style>
