<script lang="ts">
  import Block from "$lib/components/Block.svelte";
  import Header from "../components/Header.svelte";
  import {
    elementPath,
    isDragging,
    isDragInserting,
    initialMousePosition,
    mousePosition,
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

  function handleMouseUp(event: MouseEvent) {
    // event.composedPath() returns an array of all the elements on the path,
    // starting from the element that triggered the event and
    // propagating up to the root element (document)

    // first, exclude last 4 elements (body, html, document, window)
    const elementsOnPath = event.composedPath().slice(0, -4);

    if ($isDragInserting) {
      const closestParentId = elementsOnPath.reduce((acc, el) => {
        if (!!acc) return acc;
        return Object.keys($refs).find((key) => {
          return $refs[key] === el && key !== $insertingElement.id;
        });
      }, null);
      insertElement(closestParentId);
    } else {
      // add if statement to check if the element is being dragged at all
      updateDraggedElementsData();
    }

    mousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
    elementPath.set([]);
    isDragging.set(false);
    resizeDirection.set(null);
  }

  function handleMouseDown(event: MouseEvent) {
    elementPath.set(event.path);
    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleMouseMove(event: MouseEvent) {
    if (!$isDragging) return;
    mousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(true);
    console.log("keydown", event.key);
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
