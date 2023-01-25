<script lang="ts">
  import { ref } from "$lib/actions/ref";
  import { DEFAULT_GRID_MAX_WIDTH, ELEMENT_TYPES } from "$lib/constants";
  import TextElement from "$lib/components/TextElement.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import ElementControls from "$lib/components/ElementControls.svelte";
  import { dragDiffX, dragDiffY } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";

  // props:
  export let elementData;
  export let gridData;
  export let index: number;

  // derived data:
  $: gridArea = gridData
    ? [
        gridData?.rowStartIndex,
        gridData?.columnStartIndex,
        gridData?.rowEndIndex,
        gridData?.columnEndIndex,
      ]
        .map((i) => i + 1)
        .join("/")
    : null;
  $: isSelected = $selectedElementIds.includes(elementData.id);
  $: hasMoved = isSelected && ($dragDiffX || $dragDiffY);
  $: ({ desktop } = elementData);
  $: desktopWidth = `${desktop?.width ?? DEFAULT_GRID_MAX_WIDTH}px`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class={`element element--${elementData.type}`}
  class:is-selected={isSelected}
  class:cursor-grabbing={$insertingElement?.id === elementData.id}
  class:has-moved={hasMoved}
  style:grid-area={gridArea}
  style:--desktop-width={desktopWidth}
  use:ref={elementData.id}
>
  <!-- <pre style="font-size:10px;">{JSON.stringify(gridData, null, 1)}</pre> -->
  {#if elementData.type === ELEMENT_TYPES.GRID}
    <Grid {elementData} />
  {:else if elementData.type === ELEMENT_TYPES.TEXT}
    <TextElement {elementData} />
  {:else if elementData.type === ELEMENT_TYPES.IMAGE}
    <!-- else if content here -->
  {:else}
    <!-- else content here -->
  {/if}

  {#if isSelected}
    <ElementControls id={elementData.id} type={elementData.type} />
  {/if}
</div>

<style lang="scss">
  @use "sass:math";
  $size: 8px;

  .element {
    z-index: 2;
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      inset: -0.5px;
      border: 1px solid cadetblue;
      pointer-events: none;
      opacity: 0;
      z-index: 2;
    }

    &--GRID {
      &::before {
        right: calc((100% - var(--desktop-width) + 2px) / 2);
        left: calc((100% - var(--desktop-width) + 2px) / 2);
      }
    }

    &:hover {
      &::before {
        opacity: 0.3;
      }
    }
    &.is-selected {
      z-index: 3;
      &::before {
        opacity: 0.5;
      }
    }
  }
</style>
