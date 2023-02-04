<script lang="ts">
  import type { ElementType } from "@wordlike/nebula/schema";
  import { ref } from "@wordlike/nebula";

  import { DEFAULT_GRID_MAX_WIDTH, ELEMENT_TYPES } from "$lib/constants";
  import Grid from "$lib/components/Grid.svelte";
  import BuilderText from "$lib/components/BuilderText.svelte";
  import { dragDiffX, dragDiffY } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";

  // props:
  export let elementData: ElementType;
  export let gridData;
  export let index: number;

  // derived data:
  $: ({
    rowStartIndex,
    columnStartIndex,
    rowEndIndex,
    columnEndIndex,
    columnCount,
  } = gridData ?? {});
  $: rowStart = rowStartIndex + 1;
  $: columnStart = snapLeft ? 1 : columnStartIndex + 1;
  $: rowEnd = rowEndIndex + 1;
  $: columnEnd = snapRight ? columnCount + 2 : columnEndIndex + 1;
  $: gridArea = gridData
    ? [rowStart, columnStart, rowEnd, columnEnd].join("/")
    : null;

  $: isSelected = $selectedElementIds.includes(id);
  $: hasMoved = isSelected && ($dragDiffX || $dragDiffY);
  $: ({ desktop, id, type } = elementData ?? {});
  $: ({ snapLeft, snapRight, paddingY } = desktop ?? {});
  $: desktopWidth = `${desktop?.width ?? DEFAULT_GRID_MAX_WIDTH}px`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class={`element element--${type}`}
  class:is-selected={isSelected}
  class:cursor-grabbing={$insertingElement?.id === id}
  class:has-moved={hasMoved}
  style:grid-area={gridArea}
  style:--desktop-width={desktopWidth}
  style:--desktop-padding-y={`${paddingY ?? 0}px`}
  use:ref={id}
>
  <!-- <pre style="font-size:10px;">{JSON.stringify(gridData, null, 1)}</pre> -->
  {#if type === ELEMENT_TYPES.GRID}
    <Grid {elementData} />
  {:else if type === ELEMENT_TYPES.TEXT}
    <BuilderText {elementData} />
  {:else if type === ELEMENT_TYPES.IMAGE}
    <!-- else if content here -->
  {:else}
    <!-- else content here -->
  {/if}
  {#if isSelected}
    <slot name="controls" />
  {/if}
</div>

<style lang="scss">
  @use "sass:math";
  $size: 8px;

  .element {
    z-index: 2;
    position: relative;
    align-self: start;
    &::before {
      content: "";
      display: block;
      position: absolute;
      inset: -0.5px;
      border: 1px solid cadetblue;
      pointer-events: none;
      opacity: 0;
      z-index: 2;
      border-radius: 0.125rem;
    }

    &--GRID {
      &::before {
        top: var(--desktop-padding-y);
        right: calc((100% - var(--desktop-width)) / 2);
        left: calc((100% - var(--desktop-width)) / 2);
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
