<script lang="ts" context="module">
  export type GuideMapParams = {
    isDragging: boolean;
    isInserting: boolean;
    selectedElementsDataMap: Record<string, ElementType>;
    rowArray: boolean[];
    columnArray: boolean[];
    columnWidth: number;
    rowHeight: number;
    gap: number;
    diffX: number | null;
    diffY: number | null;
    resizeDirection: string | null;
    elementData: ElementType;
  };

  export function getGuideMap({
    isDragging,
    isInserting,
    selectedElementsDataMap,
    rowArray,
    columnArray,
    columnWidth,
    rowHeight,
    gap,
    diffX,
    diffY,
    resizeDirection,
    elementData,
  }: GuideMapParams) {
    return rowArray.map((_: boolean, row: number) => {
      return columnArray.map((_: boolean, col: number) => {
        if (!isDragging && !isInserting) return false;

        return Object.entries(selectedElementsDataMap).some(
          ([_, selectedElementData]) => {
            const { x, y, width, height, type } = selectedElementData
              ? getPosition({
                  elementData: selectedElementData,
                  diffX,
                  diffY,
                  resizeDirection,
                  blockWidth: elementData?.desktop?.width,
                })
              : {
                  x: 0,
                  y: 0,
                  width: 0,
                  height: 0,
                  type: ELEMENT_TYPES.GRID,
                };

            if (type === ELEMENT_TYPES.GRID) return false;

            const cellLeft = col * (columnWidth + gap) + columnWidth;
            const cellRight = cellLeft - columnWidth + gap;
            const cellTop = row * (rowHeight + gap) + rowHeight;
            const cellBottom = cellTop - rowHeight + gap;

            const withinY = y <= cellTop && cellBottom <= y + height;
            const withinX = x <= cellLeft && cellRight <= x + width;
            return withinX && withinY;
          }
        );
      });
    });
  }
</script>

<script lang="ts">
  import type { ElementType, GridElementType } from "@wordlike/nebula";

  import { ELEMENT_TYPES } from "$lib/constants";
  import {
    dragDiffX,
    dragDiffY,
    resizeDirection,
    isDragging,
    isInserting,
  } from "$lib/stores/drag";
  import {
    selectedElementIds,
    selectedElementsDataMap,
  } from "$lib/stores/element";
  import { calculateGrid, getPosition } from "$lib/utils/position";

  // props:
  export let elementData: GridElementType;
  export let gridWidth: number;

  // state:
  let columnCount = 12;
  let gap = 12;
  let rowHeight = 36;

  // derived data:
  $: ({ gridHeight } = calculateGrid(
    elementData,
    $dragDiffX,
    $dragDiffY,
    $resizeDirection,
    $selectedElementIds
  ));
  $: gapPx = `${gap}px`;
  $: columnArray = Array.from(Array(columnCount)) as boolean[];
  $: columnWidth = (gridWidth + gap) / columnCount - gap;
  $: columnWidthPercent = `${(columnWidth / gridWidth) * 100}%`;
  $: rowCount = Math.floor(gridHeight / rowHeight) ?? 0;
  $: rowArray = Array.from(Array(rowCount)) as boolean[];
  $: rowHeightPx = `${rowHeight}px`;

  $: guideMap = getGuideMap({
    isDragging: $isDragging,
    isInserting: $isInserting,
    selectedElementsDataMap: $selectedElementsDataMap,
    rowArray,
    columnArray,
    columnWidth,
    rowHeight,
    gap,
    diffX: $dragDiffX,
    diffY: $dragDiffY,
    resizeDirection: $resizeDirection,
    elementData,
  });
</script>

<div
  class="flex flex-col content-start gap-[var(--gap)] opacity-0"
  class:opacity-100={$isDragging || $isInserting}
  style:--column-width={columnWidthPercent}
  style:--row-height={rowHeightPx}
  style:--gap={gapPx}
>
  {#each guideMap as row}
    <div
      class="row flex justify-between h-[var(--row-height)] gap-[var(--gap)]"
    >
      {#each row as column}
        <div
          class="column w-[var(--column-width)] text-xs border-[1px] border-solid border-dark-600 rounded-sm transition-all"
          class:shadow-[1px_1px_4px_0px_rgba(0,0,0,.1)]={column}
          class:scale-105={column}
          class:border-transparent={column}
        />
      {/each}
    </div>
  {/each}
</div>
