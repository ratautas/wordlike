<script lang="ts">
  import { ref } from "$lib/actions/ref";
  import TextElement from "$lib/components/TextElement.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import ElementControls from "$lib/components/ElementControls.svelte";
  import { dragDiffX, dragDiffY } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";

  // props:
  export let elementData;
  export let gridData;
  export let index;

  // derived data:
  $: gridArea =
    gridData &&
    [
      gridData?.rowStartIndex,
      gridData?.columnStartIndex,
      gridData?.rowEndIndex,
      gridData?.columnEndIndex,
    ]
      .map((i) => i + 1)
      .join("/");
  $: isSelected = $selectedElementIds.includes(elementData.id);
  $: hasMoved = isSelected && ($dragDiffX || $dragDiffY);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="element"
  class:is-selected={isSelected}
  class:cursor-grabbing={$insertingElement?.id === elementData.id}
  class:has-moved={hasMoved}
  style:grid-area={gridArea}
  use:ref={elementData.id}
>
  <!-- <pre style="font-size:10px;">{JSON.stringify(gridData, null, 1)}</pre> -->
  {#if elementData.type === "GRID"}
    <Grid {elementData} />
  {:else if elementData.type === "TEXT"}
    <TextElement {elementData} />
  {:else if elementData.type === "IMAGE"}
    <!-- else if content here -->
  {:else}
    <!-- else content here -->
  {/if}

  {#if isSelected}
    <ElementControls
      elementId={elementData.id}
      elementType={elementData.type}
    />
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
