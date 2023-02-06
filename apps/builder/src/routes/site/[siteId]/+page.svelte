<script lang="ts">
  import { refStore } from "$lib/actions/ref";

  import Header from "../components/Header.svelte";
  import {
    dragMousePosition,
    hasDragged,
    initialMousePosition,
    isDragging,
    isDragInserting,
    isClickInserting,
    isInserting,
    mouseMoveEvent,
    resizeDirection,
    dragDiffX,
    dragDiffY,
  } from "$lib/stores/drag";
  import { currentPageData } from "$lib/stores/doc";
  import {
    insertingElement,
    insertElement,
    deleteSelectedElements,
    selectedElementIds,
    updateElementsPosition,
    recalculatePositions,
    updateElementsSnap,
    elementMap,
  } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";
  import BuilderElement from "$lib/components/BuilderElement.svelte";

  function handleMouseDown(event: MouseEvent) {
    const elementsOnPath = event.composedPath().slice(0, -4) as HTMLElement[];

    if ($isClickInserting) {
      elementsOnPath.reverse();

      const closestParentId = elementsOnPath.reduce((prev, el) => {
        if (!!prev) return prev;
        return Object.keys($refStore).find((key) => {
          return (
            $refStore[key].elementRef === el && key !== $insertingElement?.id
          );
        });
      }, null);

      insertElement(closestParentId);

      return;
    }

    const refId = elementsOnPath.reduce((acc, elOnPath) => {
      if (!!acc) return acc;
      return Object.keys($refStore).find((key) => {
        return $refStore[key].elementRef === elOnPath;
      });
    }, null);

    if (!refId) return;

    const targetElementRef = $refStore[refId].elementRef;
    const selectedSiblingsRefs = [
      ...($refStore[$selectedElementIds[0]]?.elementRef?.parentElement
        ?.children ?? []),
    ];
    const isTargetSelected = $selectedElementIds.includes(refId);
    const isOneOfSiblings = selectedSiblingsRefs.includes(targetElementRef);

    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });

    if ($selectedElementIds.length > 0) {
      if (isOneOfSiblings) {
        if ($isShiftPressed) {
          if (isTargetSelected) {
            selectedElementIds.set(
              $selectedElementIds.filter((id) => id !== refId)
            );
          } else {
            selectedElementIds.set([...$selectedElementIds, refId]);
          }
        } else if ($selectedElementIds.length === 1) {
          if ($selectedElementIds[0] !== refId) {
            selectedElementIds.set([refId]);
          }
        }
      } else {
        selectedElementIds.set([refId]);
      }
    } else {
      selectedElementIds.set([refId]);
    }
  }

  function handleMouseUp(event: MouseEvent) {
    const elementsOnPath = event.composedPath().slice(0, -4);

    if ($isDragInserting) {
      // if the element hasn't been dragged, then it's a click
      if (!$hasDragged) {
        isClickInserting.set(true);
        isDragInserting.set(false);
        return;
      }

      elementsOnPath.reverse();
      const closestParentId = elementsOnPath.reduce((acc, el) => {
        if (!!acc) return acc;
        return Object.keys($refStore).find((id) => {
          return (
            $refStore[id].elementRef === el && id !== $insertingElement?.id
          );
        });
      }, null);
      insertElement(closestParentId);
    } else if ($selectedElementIds.length > 0) {
      updateElementsPosition($dragDiffX, $dragDiffY);
    }

    if ($resizeDirection) {
      const snap = elementsOnPath.reduce((acc, el) => {
        if (!!acc) return acc;

        return Object.entries($refStore).reduce((dir, [key, refEntry]) => {
          if (!!dir) return dir;
          if (refEntry.overshootLeftRef === el) return "LEFT";
          if (refEntry.overshootRightRef === el) return "RIGHT";
        }, null);
      }, null);
      if (snap) updateElementsSnap(snap);
    }

    dragMousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
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
    if (event.key === "Backspace") {
      // TODO: check if focused etc
      if (!document.activeElement) deleteSelectedElements();
    }

    const moveOffset = $isShiftPressed ? 10 : 1;

    if (event.key === "ArrowLeft") updateElementsPosition(-moveOffset, 0);
    if (event.key === "ArrowRight") updateElementsPosition(moveOffset, 0);
    if (event.key === "ArrowUp") updateElementsPosition(0, -moveOffset);
    if (event.key === "ArrowDown") updateElementsPosition(0, moveOffset);
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(false);
  }

  function handleFocusIn(e: FocusEvent) {}

  function handleFocusOut(e: FocusEvent) {
    recalculatePositions();
  }

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
<!-- <details open>
  <pre style="font-size:9px">{JSON.stringify($elementMap, null, 2)}</pre>
</details> -->
<main class="min-h-screen bg-gray-100">
  <Header />
  {#each $currentPageData.children as elementData}
    <BuilderElement {elementData} />
  {/each}
</main>
