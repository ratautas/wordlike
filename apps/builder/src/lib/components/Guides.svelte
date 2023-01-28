<script lang="ts" context="module">
  export type GuidMapParams = {
    isDragging: boolean;
    isInserting: boolean;
    selectedElementData: any;
    x: number;
    y: number;
    width: number;
    height: number;
    rowArray: boolean[];
    columnArray: boolean[];
    columnWidth: number;
    rowHeight: number;
    gap: number;
  };

  export function getGuideMap({
    isDragging,
    isInserting,
    selectedElementData,
    x,
    y,
    width,
    height,
    rowArray,
    columnArray,
    columnWidth,
    rowHeight,
    gap,
  }: GuidMapParams) {
    return rowArray.map((_: boolean, row: number) => {
      return columnArray.map((_: boolean, col: number) => {
        if (!isDragging && !isInserting) return false;
        if (selectedElementData?.type === ELEMENT_TYPES.GRID) return false;

        const cellLeft = col * (columnWidth + gap) + columnWidth;
        const cellRight = cellLeft - columnWidth + gap;
        const cellTop = row * (rowHeight + gap) + rowHeight;
        const cellBottom = cellTop - rowHeight + gap;

        const withinY = y <= cellTop && cellBottom <= y + height;
        const withinX = x <= cellLeft && cellRight <= x + width;
        return withinX && withinY;
      });
    });
  }
</script>

<script lang="ts">
  import { ELEMENT_TYPES } from "$lib/constants";
  import type { GridElementType } from "$lib/schema";
  import {
    dragDiffX,
    dragDiffY,
    resizeDirection,
    isDragging,
    isInserting,
  } from "$lib/stores/drag";
  import {
    selectedElementIds,
    selectedElementsData,
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
  $: selectedElementData = $selectedElementsData[$selectedElementIds[0]];
  $: ({ x, y, width, height } = selectedElementData
    ? getPosition({
        elementData: selectedElementData,
        diffX: $dragDiffX,
        diffY: $dragDiffY,
        resizeDirection: $resizeDirection,
        blockWidth: elementData?.desktop?.width,
      })
    : {});

  $: guideMap = getGuideMap({
    isDragging: $isDragging,
    isInserting: $isInserting,
    selectedElementData,
    x,
    y,
    width,
    height,
    rowArray,
    columnArray,
    columnWidth,
    rowHeight,
    gap,
  });
</script>

<div
  class="flex flex-col content-start gap-[var(--gap)]"
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
          class="column w-[var(--column-width)] text-xs border-[1px] border-solid border-dark-600"
          class:border-red-800={column}
        >
          {column}
        </div>
      {/each}
    </div>
  {/each}
</div>
