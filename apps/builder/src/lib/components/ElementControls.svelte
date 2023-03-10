<script lang="ts">
  import { VERTICAL_RESIZE_TYPES, ELEMENT_TYPES } from "$lib/constants";
  import { resizeDirection } from "$lib/stores/drag";
  import type { ElementType } from "@wordlike/schema/types";
  // props:
  export let elementData: ElementType;

  // derived data:
  $: ({ id, type } = elementData ?? {});
  $: canResizeHeight = VERTICAL_RESIZE_TYPES.includes(type);
  $: canResizeTop = type !== ELEMENT_TYPES.GRID;
</script>

<div
  class="absolute inset-0 z-[-1] opacity-30  ring-dark-50 ring-opacity-5 ring-[1px] group-hover/element:opacity-100"
>
  <div
    class={`side side--e side--${type}`}
    on:mousedown={() => resizeDirection.set("E")}
  />
  <div
    class={`side side--w side--${type}`}
    on:mousedown={() => resizeDirection.set("W")}
  />
  {#if canResizeHeight}
    {#if canResizeTop}
      <div
        class={`side side--n side--${type}`}
        on:mousedown={() => resizeDirection.set("N")}
      />
    {/if}
    <div
      class={`side side--s side--${type}`}
      on:mousedown={() => resizeDirection.set("S")}
    />
    <div
      class={`corner corner--ne corner--${type}`}
      on:mousedown={() => resizeDirection.set("NE")}
    />
    <div
      class={`corner corner--nw corner--${type}`}
      on:mousedown={() => resizeDirection.set("NW")}
    />
    <div
      class={`corner corner--se corner--${type}`}
      on:mousedown={() => resizeDirection.set("SE")}
    />
    <div
      class={`corner corner--sw corner--${type}`}
      on:mousedown={() => resizeDirection.set("SW")}
    />
  {/if}
</div>

<style lang="scss">
  @use "sass:math";
  $size: 8px;

  .side {
    position: absolute;
    z-index: 4;

    &::before {
      content: "";
      display: block;
      position: absolute;
      background-color: #fff;
      min-width: $size;
      min-height: $size;
      transform: translate3d(-50%, -50%, 0);
      top: 50%;
      left: 50%;
      border-radius: math.div($size, 2);
      border: solid 1px cadetblue;
      max-width: calc(100% - ($size * 2));
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      border: dotted 1px cadetblue;
      width: 2px;
      height: 2px;
      transform: translate3d(-50%, -50%, 0);
      top: 50%;
      left: 50%;
      max-width: calc(100% - ($size * 4));
      opacity: 0.5;
    }

    &--n {
      cursor: row-resize;
      height: $size;
      top: $size * -2;
      left: 0;
      right: 0;
      &::before {
        width: 24px;
      }
      &::after {
        width: 12px;
      }
    }
    &--e {
      cursor: col-resize;
      width: $size;
      right: $size * -2;
      top: 0;
      bottom: 0;
      &::before {
        height: 24px;
      }
      &::after {
        height: 12px;
      }
    }
    &--s {
      height: $size;
      bottom: $size * -2;
      left: 0;
      right: 0;
      cursor: row-resize;
      &::before {
        width: 24px;
      }
      &::after {
        width: 12px;
      }
    }
    &--w {
      width: $size;
      left: $size * -2;
      top: 0;
      bottom: 0;
      cursor: col-resize;
      &::before {
        height: 24px;
      }
      &::after {
        height: 12px;
      }
    }

    &--GRID {
      &.side {
        &--e {
          right: calc((100% - var(--desktop-width) - math.div($size, 2)) / 2);
        }
        &--w {
          left: calc((100% - var(--desktop-width) - math.div($size, 2)) / 2);
        }
      }
    }
  }
  .corner {
    position: absolute;
    width: $size;
    height: $size;
    border: solid 1px cadetblue;
    background-color: #fff;
    border-radius: math.div($size, 2);
    z-index: 3;
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
