<script lang="ts">
  import TextElement from "$lib/components/TextElement.svelte";
  import {
    dragDiffX,
    dragDiffY,
    isClickInserting,
    resizeDirection,
  } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";
  import { ref } from "$lib/actions/ref";

  let elementRef: HTMLElement | null;

  let resizeDirectionRefs = {
    N: null as HTMLElement | null,
    E: null as HTMLElement | null,
    S: null as HTMLElement | null,
    W: null as HTMLElement | null,
    NE: null as HTMLElement | null,
    NW: null as HTMLElement | null,
    SE: null as HTMLElement | null,
    SW: null as HTMLElement | null,
  };

  function handleElementMouseDown(event: MouseEvent) {
    if ($isClickInserting) return;
    if (!$selectedElementIds.includes(element.id)) {
      const previousElementIds = $isShiftPressed ? $selectedElementIds : [];
      selectedElementIds.set([element.id, ...previousElementIds]);
    }

    const directionEntry = Object.entries(resizeDirectionRefs).find(
      ([key, ref]) => event.composedPath().includes(ref)
    );

    if (directionEntry) {
      resizeDirection.set(directionEntry[0]);
    }
  }

  $: ({ rowStartIndex, columnStartIndex, rowEndIndex, columnEndIndex } =
    gridArea);

  $: area = `${rowStartIndex}/${columnStartIndex}/${rowEndIndex}/${columnEndIndex}`;
  $: isSelected = $selectedElementIds.includes(element.id);
  $: hasMoved = isSelected && ($dragDiffX || $dragDiffY);

  export let element;
  export let gridArea;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="element relative"
  class:is-selected={isSelected}
  class:cursor-grabbing={$insertingElement?.id === element.id}
  class:has-moved={hasMoved}
  on:mousedown={handleElementMouseDown}
  bind:this={elementRef}
  use:ref={element.id}
  style:grid-area={area}
>
  <!-- <pre style="font-size:10px;">{JSON.stringify(gridArea, null, 1)}</pre> -->
  {#if element.type === "TEXT"}
    <TextElement {element} />
    <!-- content here -->
  {:else if element.type === "IMAGE"}
    <!-- else if content here -->
  {:else}
    <!-- else content here -->
  {/if}
  <div class="side side--n" bind:this={resizeDirectionRefs.N} />
  <div class="side side--e" bind:this={resizeDirectionRefs.E} />
  <div class="side side--s" bind:this={resizeDirectionRefs.S} />
  <div class="side side--w" bind:this={resizeDirectionRefs.W} />
  <div class="handle handle--ne" bind:this={resizeDirectionRefs.NE} />
  <div class="handle handle--nw" bind:this={resizeDirectionRefs.NW} />
  <div class="handle handle--se" bind:this={resizeDirectionRefs.SE} />
  <div class="handle handle--sw" bind:this={resizeDirectionRefs.SW} />
</div>

<style lang="scss">
  @use "sass:math";
  $size: 8px;

  @keyframes shake {
    0% {
      transform: translate(0.5px, 0.25px) rotate(0deg);
    }
    10% {
      transform: translate(-0.25px, -0.5px) rotate(-0.25deg);
    }
    20% {
      transform: translate(-0.75px, 0px) rotate(0.25deg);
    }
    30% {
      transform: translate(0px, 0.5px) rotate(0deg);
    }
    40% {
      transform: translate(0.25px, -0.25px) rotate(0.25deg);
    }
    50% {
      transform: translate(-0.25px, 0.5px) rotate(-0.25deg);
    }
    60% {
      transform: translate(-0.75px, 0.25px) rotate(0deg);
    }
    70% {
      transform: translate(0.5px, 0.25px) rotate(-0.25deg);
    }
    80% {
      transform: translate(-0.25px, -0.25px) rotate(0.25deg);
    }
    90% {
      transform: translate(0.5px, 0.5px) rotate(0deg);
    }
    100% {
      transform: translate(0.25px, -0.5px) rotate(-0.25deg);
    }
  }

  // write fast keyframe shake animation:

  .element {
    z-index: 2;
    position: relative;
    &:hover {
      .side {
        opacity: 0.5;
      }
    }

    &.is-selected {
      animation-iteration-count: 1;
      animation: shake 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
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
    &--n {
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
    &--e {
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
    &--s {
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
    &--w {
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
    border-radius: math.div($size, 2);
    &--ne {
      right: math.div($size, -2);
      top: math.div($size, -2);
      cursor: nesw-resize;
    }
    &--nw {
      left: math.div($size, -2);
      top: math.div($size, -2);
      cursor: nwse-resize;
    }
    &--se {
      right: math.div($size, -2);
      bottom: math.div($size, -2);
      cursor: nwse-resize;
    }
    &--sw {
      left: math.div($size, -2);
      bottom: math.div($size, -2);
      cursor: nesw-resize;
    }
  }
</style>
