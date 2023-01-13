<script lang="ts">
  import TextElement from "$lib/components/TextElement.svelte";
  import { dragDiffX, dragDiffY, draggedControl } from "$lib/stores/drag";
  import { selectedElementIds } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";

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

  $: layoutStyle = getLayoutStyle(
    element,
    $dragDiffX,
    $dragDiffY,
    $draggedControl,
    isElementDragged
  );

  function getLayoutStyle(
    element,
    dragDiffX,
    dragDiffY,
    draggedControl,
    isElementDragged
  ) {
    const position = isElementDragged
      ? getPosition(element, dragDiffX, dragDiffY, draggedControl)
      : element.layout.default;
    const style = {
      top: `${position.y}px`,
      left: `${position.x}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
    };
    return Object.entries(style)
      .map(([key, value]) => `${key}:${value}`)
      .join(";");
  }

  function getPosition(elementData, diffX, diffY, control) {
    const { layout } = elementData;
    switch (control) {
      case "top":
        return {
          x: layout.default.x,
          y: layout.default.y + diffY,
          width: layout.default.width,
          height: layout.default.height - diffY,
        };
      case "right":
        return {
          x: layout.default.x,
          y: layout.default.y,
          width: layout.default.width + diffX,
          height: layout.default.height,
        };
      case "bottom":
        return {
          x: layout.default.x,
          y: layout.default.y,
          width: layout.default.width,
          height: layout.default.height + diffY,
        };
      case "left":
        return {
          x: layout.default.x + diffX,
          y: layout.default.y,
          width: layout.default.width - diffX,
          height: layout.default.height,
        };
      case "topRight":
        return {
          x: layout.default.x,
          y: layout.default.y + diffY,
          width: layout.default.width + diffX,
          height: layout.default.height - diffY,
        };
      case "topLeft":
        return {
          x: layout.default.x + diffX,
          y: layout.default.y + diffY,
          width: layout.default.width - diffX,
          height: layout.default.height - diffY,
        };
      case "bottomRight":
        return {
          x: layout.default.x,
          y: layout.default.y,
          width: layout.default.width + diffX,
          height: layout.default.height + diffY,
        };
      case "bottomLeft":
        return {
          x: layout.default.x + diffX,
          y: layout.default.y,
          width: layout.default.width - diffX,
          height: layout.default.height + diffY,
        };
      default:
        return {
          x: layout.default.x + diffX,
          y: layout.default.y + diffY,
          width: layout.default.width,
          height: layout.default.height,
        };
    }
  }

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

  function handleElementMouseUp(event: MouseEvent) {
    // draggedControl.set(null);
  }

  function handleWindowKeyDown(event: KeyboardEvent) {
    console.log(event);
    if (event.key === "Shift") {
      isShiftPressed.set(true);
    }
  }

  function handleWindowKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") {
      isShiftPressed.set(false);
    }
  }

  export let element;
</script>

<svelte:window on:keydown={handleWindowKeyDown} on:keyup={handleWindowKeyUp} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="element relative"
  class:is-selected={$selectedElementIds.includes(element.id)}
  on:mousedown={handleElementMouseDown}
  on:mouseup={handleElementMouseUp}
  bind:this={elementRef}
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
  {$draggedControl}
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
    z-index: 2;
    &.is-selected {
      outline: solid 1px red;
      z-index: 3;
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
