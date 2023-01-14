<script lang="ts">
  import TextElement from "$lib/components/TextElement.svelte";
  import {
    dragDiffX,
    dragDiffY,
    draggedControl,
    isDragging,
  } from "$lib/stores/drag";
  import { selectedElementIds } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";
  import { getLayoutStyle } from "$lib/utils/position";

  let elementRef: HTMLElement | null;

  let controlRefs = {
    top: null as HTMLElement | null,
    right: null as HTMLElement | null,
    bottom: null as HTMLElement | null,
    left: null as HTMLElement | null,
    topRight: null as HTMLElement | null,
    topLeft: null as HTMLElement | null,
    bottomRight: null as HTMLElement | null,
    bottomLeft: null as HTMLElement | null,
  };

  $: isElementDragged = $selectedElementIds.includes(element.id);

  $: layoutStyle =
    $isDragging &&
    isElementDragged &&
    getLayoutStyle(element, $dragDiffX, $dragDiffY, $draggedControl) +
      ";position: absolute;";

  function handleElementMouseDown(event: MouseEvent) {
    if (!$selectedElementIds.includes(element.id)) {
      const previousElementIds = $isShiftPressed ? $selectedElementIds : [];
      selectedElementIds.set([element.id, ...previousElementIds]);
    }

    const control = Object.entries(controlRefs).find(([key, ref]) =>
      event.composedPath().includes(ref)
    );

    if (control) {
      draggedControl.set(control[0]);
    }
  }

  function handleWindowKeyDown(event: KeyboardEvent) {
    if (event.key === "Shift") {
      isShiftPressed.set(true);
    }
  }

  function handleWindowKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") {
      isShiftPressed.set(false);
    }
  }

  $: area = `${gridArea.rowStartIndex}/${gridArea.columnStartIndex}/${gridArea.rowEndIndex}/${gridArea.columnEndIndex}`;

  export let element;
  export let gridArea;
</script>

<svelte:window on:keydown={handleWindowKeyDown} on:keyup={handleWindowKeyUp} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="element relative"
  class:is-selected={$selectedElementIds.includes(element.id)}
  class:is-grid={!!area}
  on:mousedown={handleElementMouseDown}
  bind:this={elementRef}
  style:grid-area={area}
>
  <pre style="font-size: 10px;">{JSON.stringify(gridArea, null, 1)}</pre>
  <div class="side side--top" bind:this={controlRefs.top} />
  <div class="side side--right" bind:this={controlRefs.right} />
  <div class="side side--bottom" bind:this={controlRefs.bottom} />
  <div class="side side--left" bind:this={controlRefs.left} />
  <div class="handle handle--top-left" bind:this={controlRefs.topLeft} />
  <div class="handle handle--top-right" bind:this={controlRefs.topRight} />
  <div class="handle handle--bottom-left" bind:this={controlRefs.bottomLeft} />
  <div
    class="handle handle--bottom-right"
    bind:this={controlRefs.bottomRight}
  />
  {#if element.type === "TEXT"}
    <TextElement {element} />
    <!-- content here -->
  {:else if element.type === "IMAGE"}
    <!-- else if content here -->
  {:else}
    <!-- else content here -->
  {/if}
</div>

<style lang="scss">
  @use "sass:math";
  $size: 8px;

  .element {
    z-index: 2;
    position: relative;
    &:hover {
      .side {
        opacity: 0.5;
      }
    }
    &.is-selected {
      z-index: 3;

      .side,
      .handle {
        opacity: 1;
        &::before,
        &::after {
          opacity: 0.5;
        }
      }
    }
  }

  .side {
    background-color: cadetblue;
    position: absolute;
    opacity: 0;
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      // background-color: cadetblue;
    }
    &--top {
      left: math.div($size, 2);
      right: math.div($size, 2);
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      cursor: row-resize;
      &::before {
        height: $size;
        top: math.div($size, -2);
        left: 0;
        right: 0;
      }
    }
    &--right {
      top: math.div($size, 2);
      bottom: math.div($size, 2);
      top: 0;
      bottom: 0;
      right: 0;
      width: 1px;
      cursor: col-resize;
      &::before {
        width: $size;
        right: math.div($size, -2);
        top: 0;
        bottom: 0;
      }
    }
    &--bottom {
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      cursor: row-resize;
      &::before {
        height: $size;
        bottom: math.div($size, -2);
        left: 0;
        right: 0;
      }
    }
    &--left {
      top: math.div($size, 2);
      bottom: math.div($size, 2);
      top: 0;
      bottom: 0;
      left: 0;
      width: 1px;
      cursor: col-resize;
      &::before {
        width: $size;
        left: math.div($size, -2);
        top: 0;
        bottom: 0;
      }
    }
  }
  .handle {
    opacity: 0;
    position: absolute;
    width: $size;
    height: $size;
    border: solid 1px cadetblue;
    background-color: #fff;
    &--top-right {
      right: math.div($size, -2);
      top: math.div($size, -2);
      cursor: nesw-resize;
    }
    &--top-left {
      left: math.div($size, -2);
      top: math.div($size, -2);
      cursor: nwse-resize;
    }
    &--bottom-right {
      right: math.div($size, -2);
      bottom: math.div($size, -2);
      cursor: nwse-resize;
    }
    &--bottom-left {
      left: math.div($size, -2);
      bottom: math.div($size, -2);
      cursor: nesw-resize;
    }
  }
</style>
