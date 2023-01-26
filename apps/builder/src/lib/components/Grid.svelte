<script lang="ts">
  import Element from "$lib/components/Element.svelte";
  import { DEFAULT_GRID_MAX_WIDTH } from "$lib/constants";
  import Guides from "$lib/components/Guides.svelte";
  import {
    dragDiffX,
    dragDiffY,
    resizeDirection,
    isDragging,
    isInserting,
    initialMousePosition,
    mouseMoveEvent,
    mouseMoveComposedPath,
  } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";
  import { positionKey } from "$lib/stores/resolution";
  import { calculateGrid } from "$lib/utils/position";

  // props:
  export let elementData;

  // state:
  let width = elementData?.[$positionKey]?.width ?? DEFAULT_GRID_MAX_WIDTH;
  let isRelativeWidth = true;
  let gridRef: HTMLElement | undefined;
  let guidesRef: HTMLElement | undefined;
  let isHovered = false;
  let paddingY = 10;
  let paddingX = 24;

  // derived data:
  $: ({ gridAreas, gridTemplateRows, gridTemplateColumns } = calculateGrid(
    extendedElementData,
    $dragDiffX,
    $dragDiffY,
    $resizeDirection,
    $selectedElementIds
  ));

  $: templateRows = [paddingY ?? 0, ...gridTemplateRows, paddingY ?? 0]
    .map((row) => `${row}px`)
    .join(" ");

  $: templateColumns = [
    `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`,
    ...gridTemplateColumns,
    `minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`,
  ]
    .map((col) => {
      if (isNaN(col)) return col;
      return isRelativeWidth ? `${col / width}fr` : `${col}px`;
    })
    .join(" ");

  $: extendedElementData =
    $isInserting && isHovered && $insertingElement
      ? {
          ...elementData,
          children: [...elementData.children, $insertingElement],
        }
      : elementData;

  $: {
    const isInPath = $mouseMoveComposedPath.includes(gridRef);
    if (!isInPath && isHovered) {
      isHovered = false;
    } else if (isInPath && !isHovered) {
      isHovered = true;
      if ($isInserting) {
        const { clientX, clientY } = $mouseMoveEvent;
        const { left = 0, top = 0 } = guidesRef?.getBoundingClientRect() ?? {};

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
    }
  }
</script>

<div
  class="grid"
  style:--width={`${width}px`}
  style:--grid-template-rows={templateRows}
  style:--grid-template-columns={templateColumns}
  bind:this={gridRef}
>
  {#each extendedElementData.children as element, index}
    <Element elementData={element} gridData={gridAreas[index]} {index} />
  {/each}
  <div
    class="grid__guides opacity-0 pointer-events-none"
    class:opacity-100={isHovered}
    bind:this={guidesRef}
  >
    <Guides elementData={extendedElementData} gridWidth={width} />
  </div>
  {isHovered}
</div>

<style lang="scss">
  .grid {
    background-color: antiquewhite;
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);

    &__guides {
      display: grid;
      grid-area: 2/2/-2/-2;
    }
  }
</style>
