<script lang="ts">
  import Header from "../components/Header.svelte";
  import { isDragging, isInserting } from "$lib/stores/drag";
  import { currentPageData } from "$lib/stores/doc";
  import {
    selectedElementIds,
    recalculatePositions,
  } from "$lib/stores/element";
  import BuilderElement from "$lib/components/BuilderElement.svelte";
  import { handleMouseDown } from "./handleMouseDown";
  import { handleMouseUp } from "./handleMouseUp";
  import { handleMouseMove } from "./handleMouseMove";
  import { handleKeyDown } from "./handleKeyDown";
  import { handleKeyUp } from "./handleKeyUp";
  import { handleFocusOut } from "./handleFocusOut";
  import { handleFocusIn } from "./handleFocusIn";

  $: {
    $selectedElementIds &&
      !$isInserting &&
      !$isDragging &&
      recalculatePositions();
  }
</script>

<svelte:window
  on:keydown={handleKeyDown}
  on:keyup={handleKeyUp}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
  on:focusin={handleFocusIn}
  on:focusout={handleFocusOut}
/>
<main class="min-h-screen bg-gray-100">
  <Header />
  {#each $currentPageData.children as elementData}
    <BuilderElement {elementData} />
  {/each}
</main>
