<script lang="ts">
  import { onMount } from "svelte";

  import BlockBackground from "$lib/components/BlockBackground.svelte";
  import BlockElement from "$lib/components/BlockElement.svelte";
  import { DEFAULT_GRID_WIDTH } from "$lib/constants";
  import { dragDiffX, dragDiffY, resizeDirection } from "$lib/stores/drag";
  import { selectedElementIds } from "$lib/stores/element";
  import { calculateGrid } from "$lib/utils/position";
  import { doc } from "$lib/stores/doc";

  $: ({ gridAreas, gridTemplateRows, gridTemplateColumns } = calculateGrid(
    blockData,
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

  export let blockData;
  export let pageId;

  let width = blockData?.width ?? DEFAULT_GRID_WIDTH;
  let isUpdatingWidth = false;
  let blockRef: HTMLElement | undefined;
  let elementRefs = {};

  let initialWidth = width;

  onMount(() => {
    elementRefs = blockData?.children.reduce((acc, element) => {
      return {
        ...acc,
        [element.id]: blockRef.querySelector(`[id="${element.id}"]`),
      };
    }, []);
  });

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
              children: docBlock.children.map((docElement) => {
                const { clientWidth, offsetLeft } = elementRefs[docElement.id];

                return {
                  ...docElement,
                  desktop: {
                    ...docElement.desktop,
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
</script>

<div
  class="block relative mx-auto"
  style:--max-width={`${width}px`}
  style:--grid-template-rows={templateRows}
  style:--grid-template-columns={templateColumns}
  bind:this={blockRef}
>
  {initialWidth}
  <BlockBackground {blockData} />
  {#each blockData.children as element, i}
    <BlockElement {element} gridArea={gridAreas[i]} />
  {/each}
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
