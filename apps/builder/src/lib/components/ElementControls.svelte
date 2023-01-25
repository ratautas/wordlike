<script lang="ts">
  import { ref } from "$lib/actions/ref";
  import { VERTICAL_RESIZE_TYPES, ELEMENT_TYPES } from "$lib/constants";
  // props:
  export let id: string;
  export let type: string;

  // See +page.svelte for implementation of :: syntax

  // derived data:
  $: canResizeHeight = VERTICAL_RESIZE_TYPES.includes(type);
  $: canResizeTop = type !== ELEMENT_TYPES.GRID;
</script>

<div class={`side side--e side--${type}`} use:ref={`${id}::E`} />
<div class={`side side--w side--${type}`} use:ref={`${id}::W`} />
{#if canResizeHeight}
  {#if canResizeTop}
    <div class={`side side--n side--${type}`} use:ref={`${id}::N`} />
  {/if}
  <div class={`side side--s side--${type}`} use:ref={`${id}::S`} />
  <div class={`corner corner--ne corner--${type}`} use:ref={`${id}::NE`} />
  <div class={`corner corner--nw corner--${type}`} use:ref={`${id}::NW`} />
  <div class={`corner corner--se corner--${type}`} use:ref={`${id}::SE`} />
  <div class={`corner corner--sw corner--${type}`} use:ref={`${id}::SW`} />
{/if}

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
      top: math.div($size, -2);
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
      right: math.div($size, -2);
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
      bottom: math.div($size, -2);
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
      left: math.div($size, -2);
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
