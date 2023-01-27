<script lang="ts">
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
    selectedElementsData,
  } from "$lib/stores/element";
  import { calculateGrid, getPosition } from "$lib/utils/position";

  // props:
  export let elementData;
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
  $: columnArray = Array.from(Array(columnCount));
  $: columnWidth = (gridWidth + gap) / columnCount;
  $: columnWidthPercent = `${(columnWidth / gridWidth) * 100}%`;
  $: rowCount = Math.floor(gridHeight / rowHeight) ?? 0;
  $: rowArray = Array.from(Array(rowCount));
  $: rowHeightPx = `${rowHeight}px`;
  $: selectedElementData = $selectedElementsData[$selectedElementIds[0]];
  $: ({ x, y, width, height, snapLeft, snapRight } = selectedElementData
    ? getPosition({
        elementData: selectedElementData,
        diffX: $dragDiffX,
        diffY: $dragDiffY,
        resizeDirection: $resizeDirection,
        blockWidth: elementData?.desktop?.width,
      })
    : {});
  $: colStart = snapLeft ? 0 : Math.floor((x + gap) / (columnWidth + gap));
  $: colEnd = snapRight
    ? columnArray.length
    : colStart + Math.ceil((width + gap) / (columnWidth + gap));
  $: rowStart = Math.floor((y + gap) / (rowHeight + gap));
  $: rowEnd = rowStart + Math.ceil((height + gap) / (rowHeight + gap));

  $: guideMap = rowArray.map((_, row) => {
    return columnArray.map((_, col) => {
      return (
        ($isDragging || $isInserting) &&
        selectedElementData?.type !== ELEMENT_TYPES.GRID &&
        row >= rowStart &&
        row < rowEnd &&
        col >= colStart &&
        col < colEnd
      );
    });
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
          class="column w-[var(--column-width)] border-[1px] border-solid border-dark-600"
          class:bg-red-800={column}
        />
      {/each}
    </div>
  {/each}
</div>
