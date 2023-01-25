<script lang="ts">
  import Element from "$lib/components/Element.svelte";
  import { DEFAULT_GRID_MAX_WIDTH } from "$lib/constants";
  import {
    dragDiffX,
    dragDiffY,
    resizeDirection,
    isDragging,
    isInserting,
    initialMousePosition,
  } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";
  import { positionKey } from "$lib/stores/resolution";
  import { calculateGrid } from "$lib/utils/position";

  // props:
  export let elementData;

  // state:
  let width = elementData?.[$positionKey]?.width ?? DEFAULT_GRID_MAX_WIDTH;
  let isUpdatingWidth = false;
  let gridRef: HTMLElement | undefined;
  let initialWidth = width;
  let isHovered = false;

  // derived data:
  $: ({ gridAreas, gridTemplateRows, gridTemplateColumns } = calculateGrid(
    extendedElementData,
    $dragDiffX,
    $dragDiffY,
    $resizeDirection,
    $selectedElementIds
  ));
  $: templateRows = gridTemplateRows.map((row) => `${row}px`).join(" ");
  $: templateColumns = gridTemplateColumns
    .map((col) =>
      isUpdatingWidth ? `${(col / initialWidth) * 100}%` : `${col}px`
    )
    .join(" ");
  $: extendedElementData =
    $isInserting && isHovered
      ? {
          ...elementData,
          children: [...elementData.children, $insertingElement],
        }
      : elementData;

  // methods:
  function handleMouseEnter(event: MouseEvent) {
    isHovered = true;
    if (!$isInserting) return;

    const { clientX, clientY } = event;
    const { left, top } = gridRef.getBoundingClientRect();

    initialMousePosition.set({
      x: clientX,
      y: clientY,
    });

    const x = clientX - left - 150;
    const y = clientY - top - 24;
    insertingElement.update((elementData) => {
      return {
        ...elementData,
        [$positionKey]: {
          ...elementData[$positionKey],
          x,
          y,
        },
      };
    });
    selectedElementIds.set([$insertingElement?.id]);
    isDragging.set(true);
  }
</script>

<div
  class="grid relative mx-auto"
  style:--max-width={`${width}px`}
  style:--grid-template-rows={templateRows}
  style:--grid-template-columns={templateColumns}
  bind:this={gridRef}
  on:mouseenter|stopPropagation={handleMouseEnter}
  on:mouseleave|stopPropagation={() => (isHovered = false)}
>
  {#each elementData.children as element, index}
    <Element elementData={element} gridData={gridAreas[index]} {index} />
  {/each}
</div>

<style lang="scss">
  .grid {
    background-color: antiquewhite;
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);
    width: var(--max-width);
  }
</style>
