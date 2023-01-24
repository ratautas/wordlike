<script lang="ts">
  import Block from "$lib/components/Block.svelte";
  import Header from "../components/Header.svelte";
  import {
    dragMousePosition,
    hasDragged,
    initialMousePosition,
    isDragging,
    isDragInserting,
    isClickInserting,
    mouseDownComposedPath,
    mouseMoveEvent,
    resizeDirection,
  } from "$lib/stores/drag";
  import { currentPageData } from "$lib/stores/doc";
  import {
    updateDraggedElementsData,
    insertingElement,
    insertElement,
  } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";
  import { refs } from "$lib/stores/refs";

  function handleMouseDown(event: MouseEvent) {
    mouseDownComposedPath.set(event.composedPath());
    if ($isClickInserting) {
      const elementsOnPath = event.composedPath().slice(0, -4);
      elementsOnPath.reverse();
      const closestParentId = elementsOnPath.reduce((acc, el) => {
        if (!!acc) return acc;
        return Object.keys($refs).find((key) => {
          return $refs[key] === el && key !== $insertingElement.id;
        });
      }, null);
      insertElement(closestParentId);

      return;
    }

    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleMouseUp(event: MouseEvent) {
    const elementsOnPath = event.composedPath().slice(0, -4);
    elementsOnPath.reverse();

    if ($isDragInserting) {
      // if the element hasn't been dragged, then it's a click
      if (!$hasDragged) {
        isClickInserting.set(true);
        isDragInserting.set(false);
        return;
      }
      const closestParentId = elementsOnPath.reduce((acc, el) => {
        if (!!acc) return acc;
        return Object.keys($refs).find((key) => {
          return $refs[key] === el && key !== $insertingElement.id;
        });
      }, null);
      insertElement(closestParentId);
    } else {
      console.log("not click dragging");
      // TODO: add if statement to check if the element is being dragged at all
      updateDraggedElementsData();
    }
    dragMousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
    mouseDownComposedPath.set([]);
    isDragging.set(false);
    resizeDirection.set(null);
  }

  function handleMouseMove(event: MouseEvent) {
    mouseMoveEvent.set(event);
    if (!$isDragging) return;
    dragMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(true);
    if (event.key === "Escape") {
      isDragInserting.set(false);
      insertingElement.set(null);
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(false);
  }
</script>

<svelte:window
  on:keydown={handleKeyDown}
  on:keyup={handleKeyUp}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
/>

<main class="min-h-screen bg-gray-100">
  <Header />
  {#each $currentPageData.children as blockData, index}
    <Block {blockData} pageId={$currentPageData.id} blockIndex={index} />
  {/each}
</main>
