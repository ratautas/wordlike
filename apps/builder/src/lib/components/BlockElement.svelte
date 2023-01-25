<script lang="ts">
  import { ref } from "$lib/actions/ref";
  import TextElement from "$lib/components/TextElement.svelte";
  import ElementControls from "$lib/components/ElementControls.svelte";
  import { dragDiffX, dragDiffY } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";

  $: ({ rowStartIndex, columnStartIndex, rowEndIndex, columnEndIndex } =
    gridArea);

  $: area = `${rowStartIndex}/${columnStartIndex}/${rowEndIndex}/${columnEndIndex}`;
  $: isSelected = $selectedElementIds.includes(elementData.id);
  $: hasMoved = isSelected && ($dragDiffX || $dragDiffY);

  export let elementData;
  export let gridArea;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="element relative"
  class:is-selected={isSelected}
  class:cursor-grabbing={$insertingElement?.id === elementData.id}
  class:has-moved={hasMoved}
  use:ref={elementData.id}
  style:grid-area={area}
>
  <!-- <pre style="font-size:10px;">{JSON.stringify(gridArea, null, 1)}</pre> -->
  {#if elementData.type === "TEXT"}
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
      animation-iteration-count: 1;
      animation: shake 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
      z-index: 3;
      &::before {
        opacity: 0.5;
      }
    }
  }
</style>
