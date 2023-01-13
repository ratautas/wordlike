<script lang="ts">
  import TextElement from "$lib/components/TextElement.svelte";
  import { elementPath, dragDiffX, dragDiffY } from "$lib/stores/drag";
  import { selectedElementIds } from "$lib/stores/element";

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

  $: draggedControl = Object.entries(controlRefs).find(
    ([key, ref]) => ref === $elementPath[0]
  )?.[0];

  $: isElementResized = !!draggedControl;
  $: isElementDragged = !isElementResized && $elementPath.includes(elementRef);

  $: transform = isElementDragged
    ? `translate3d(${$dragDiffX}px,${$dragDiffY}px,0)`
    : null;

  $: layoutStyle = Object.entries(element.layout.default).reduce(
    (acc, [key, value]) => {
      let prop = key;
      if (key === "x") prop = "left";
      if (key === "y") prop = "top";

      acc += `${prop}:${value}px;`;
      return acc;
    },
    ""
  );

  function handleElementClick(event: MouseEvent) {
    console.log("click");
  }
  function handleElementMouseDown(event: MouseEvent) {
    selectedElementIds.set([element.id]);
  }
  function handleElementMouseUp(event: MouseEvent) {
    console.log("mouseup");
  }
  // props
  export let element;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="element relative"
  class:is-selected={$selectedElementIds.includes(element.id)}
  on:click={handleElementClick}
  on:mousedown={handleElementMouseDown}
  on:mouseup={handleElementMouseUp}
  bind:this={elementRef}
  style:transform
  style={layoutStyle}
>
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
  {isElementDragged}
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
    position: absolute;
    &.is-selected {
      outline: solid 1px red;
    }
  }

  .side {
    background-color: cadetblue;
    position: absolute;
    &:before {
      content: "";
      display: block;
      position: absolute;
    }
    &--top {
      left: math.div($size, 2);
      top: 0;
      right: math.div($size, 2);
      height: 1px;
      cursor: row-resize;
      &:before {
        height: $size;
        top: math.div($size, -2);
        width: 100%;
      }
    }
    &--right {
      right: 0;
      top: math.div($size, 2);
      bottom: math.div($size, 2);
      width: 1px;
      cursor: col-resize;
      &:before {
        width: $size;
        right: math.div($size, -2);
        height: 100%;
      }
    }
    &--bottom {
      left: math.div($size, 2);
      bottom: 0;
      right: math.div($size, 2);
      height: 1px;
      cursor: row-resize;
      &:before {
        height: $size;
        bottom: math.div($size, -2);
        width: 100%;
      }
    }
    &--left {
      left: 0;
      top: math.div($size, 2);
      bottom: math.div($size, 2);
      width: 1px;
      cursor: col-resize;
      &:before {
        width: $size;
        left: math.div($size, -2);
        height: 100%;
      }
    }
  }
  .handle {
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
