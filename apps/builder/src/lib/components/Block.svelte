<script lang="ts">
  import { ref } from "$lib/actions/ref";
  import BlockBackground from "$lib/components/BlockBackground.svelte";
  import BlockElement from "$lib/components/BlockElement.svelte";
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
  import { doc } from "$lib/stores/doc";
  import { positionKey } from "$lib/stores/resolution";
  import { refs } from "$lib/stores/refs";
  import { calculateGrid } from "$lib/utils/position";

  // derived data:
  $: ({ gridAreas, gridTemplateRows, gridTemplateColumns } = calculateGrid(
    extendedBlockData,
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
  $: extendedBlockData =
    $isInserting && isHovered
      ? {
          ...blockData,
          children: [...blockData.children, $insertingElement],
        }
      : blockData;

  // props:
  export let blockData;
  export let pageId: string;
  export let blockIndex: number;

  // state:
  let width = blockData?.width ?? DEFAULT_GRID_MAX_WIDTH;
  let isUpdatingWidth = false;
  let blockRef: HTMLElement | undefined;
  let initialWidth = width;
  let isHovered = false;

  function enableWidthUpdate() {
    isUpdatingWidth = true;
    initialWidth = width;
  }

  function disableWidthUpdate() {
    doc.set({
      ...$doc,
      pages: $doc.pages.map((docPage) => {
        if (pageId !== docPage.id) return docPage;

        return {
          ...docPage,
          children: docPage.children.map((docBlock) => {
            if (blockData.id !== docBlock.id) return docBlock;

            return {
              ...docBlock,
              width,
              children: docBlock.children.map((el) => {
                const { clientWidth, offsetLeft } = $refs[el.id];

                return {
                  ...el,
                  [$positionKey]: {
                    ...el[$positionKey],
                    x: offsetLeft,
                    width: clientWidth,
                  },
                };
              }),
            };
          }),
        };
      }),
    });
    isUpdatingWidth = false;
    initialWidth = null;
  }

  function handleMouseEnter(event: MouseEvent) {
    isHovered = true;
    if (!$isInserting) return;

    const { clientX, clientY } = event;
    const { left, top } = blockRef.getBoundingClientRect();

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
  class="block relative mx-auto"
  style:--max-width={`${width}px`}
  style:--grid-template-rows={templateRows}
  style:--grid-template-columns={templateColumns}
  bind:this={blockRef}
  on:mouseenter|stopPropagation={handleMouseEnter}
  on:mouseleave|stopPropagation={() => (isHovered = false)}
  use:ref={blockData.id}
>
  <BlockBackground {blockData} />
  {#each extendedBlockData.children as element, i}
    <BlockElement {element} gridArea={gridAreas[i]} />
  {/each}
  {#if false}
    <div
      class="absolute bg-white top-2 left-1/2 p-2 w-56 -translate-x-28"
      on:mouseenter|stopPropagation={enableWidthUpdate}
      on:mousedown|stopPropagation={enableWidthUpdate}
      on:mouseleave|stopPropagation={disableWidthUpdate}
      on:mouseup|stopPropagation={disableWidthUpdate}
      on:mousemove|stopPropagation
    >
      <input type="range" bind:value={width} min="672" max="1240" />
      <input type="number" bind:value={width} min="672" max="1240" />
    </div>
    <!-- content here -->
  {/if}
</div>

<style lang="scss">
  .block {
    background-color: antiquewhite;
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);
    width: var(--max-width);
  }
</style>
