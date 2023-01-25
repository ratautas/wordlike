<script lang="ts">
  import Block from "$lib/components/Block.svelte";
  import Element from "$lib/components/Element.svelte";
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
  import { currentPageData, doc } from "$lib/stores/doc";
  import {
    insertingElement,
    insertElement,
    selectedElementIds,
    updateDraggedElementsData,
  } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";
  import { refs } from "$lib/stores/refs";
  import { onMount } from "svelte";

  function handleMouseDown(event: MouseEvent) {
    const elementsOnPath = event.composedPath().slice(0, -4);

    if ($isClickInserting) {
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

    const refId = elementsOnPath.reduce((acc, el) => {
      if (!!acc) return acc;
      return Object.keys($refs).find((key) => $refs[key] === el);
    }, null);

    const [elementId, direction] = refId?.split("::") ?? [];

    if (!elementId) return;

    if (direction) {
      resizeDirection.set(direction);
    }

    const [firstSelectedElementId] = $selectedElementIds;
    const elementRef = $refs[elementId];
    const firstSelectedRef = $refs[firstSelectedElementId];
    const selectedSiblingsRefs = [
      ...(firstSelectedRef?.parentElement.children ?? []),
    ];
    const isTargetSelected = $selectedElementIds.includes(elementId);
    const isTargetSibling = selectedSiblingsRefs.includes(elementRef);

    if (isTargetSibling) {
      selectedElementIds.set([elementId, ...$selectedElementIds]);
    } else if (!isTargetSelected) {
      const previousElementIds = $isShiftPressed ? $selectedElementIds : [];
      selectedElementIds.set([elementId, ...previousElementIds]);
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
    } else if ($selectedElementIds.length > 0) {
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
      selectedElementIds.set([]);
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(false);
  }

  onMount(() => {
    window.doc = $doc;
  });
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
  {#if false}
    {#each $currentPageData.children as blockData, index}
      <Block {blockData} pageId={$currentPageData.id} blockIndex={index} />
    {/each}
  {:else}
    {#each $currentPageData.children as elementData, index}
      <Element {elementData} {index} />
    {/each}
  {/if}
</main>
