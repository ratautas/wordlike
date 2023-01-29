<script lang="ts">
  import type { ElementType } from "$lib/schema";
  import Element from "$lib/components/Element.svelte";
  import ElementControls from "$lib/components/ElementControls.svelte";
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
  } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";
  import { refs } from "$lib/stores/refs";

  function handleMouseDown(event: MouseEvent) {
    const elementsOnPath = event.composedPath().slice(0, -4);

    if ($isClickInserting) {
      elementsOnPath.reverse();
      const closestParentId = elementsOnPath.reduce((acc, el) => {
        if (!!acc) return acc;
        return Object.keys($refs).find((key) => {
          return $refs[key] === el && key !== $insertingElement?.id;
        });
      }, null);

      insertElement(closestParentId);

      return;
    }

    const refId = elementsOnPath.reduce((acc, el) => {
      if (!!acc) return acc;
      return Object.keys($refs).find((key) => $refs[key] === el);
    }, null);

    const [targetElementId, direction] = refId?.split("::") ?? [];

    if (!targetElementId) return;

    if (direction) {
      resizeDirection.set(direction);
    }

    const targetElementRef = $refs[targetElementId];
    const selectedSiblingsRefs = [
      ...($refs[$selectedElementIds[0]]?.parentElement?.children ?? []),
    ];
    const isTargetSelected = $selectedElementIds.includes(targetElementId);
    const isOneOfSiblings = selectedSiblingsRefs.includes(targetElementRef);

    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });

    if ($selectedElementIds.length > 0) {
      if (isOneOfSiblings) {
        if ($isShiftPressed) {
          if (isTargetSelected) {
            selectedElementIds.set(
              $selectedElementIds.filter((id) => id !== targetElementId)
            );
          } else {
            selectedElementIds.set([...$selectedElementIds, targetElementId]);
          }
        } else if ($selectedElementIds.length === 1) {
          if ($selectedElementIds[0] !== targetElementId) {
            selectedElementIds.set([targetElementId]);
          }
        }
      } else {
        selectedElementIds.set([targetElementId]);
      }
    } else {
      selectedElementIds.set([targetElementId]);
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
        return Object.keys($refs).find((key) => {
          return $refs[key] === el && key !== $insertingElement?.id;
        });
      }, null);
      insertElement(closestParentId);
    } else if ($selectedElementIds.length > 0) {
      console.log("update?");
      updateElementsPosition($dragDiffX, $dragDiffY);
    }

    if ($resizeDirection) {
      const snap = elementsOnPath.reduce((acc, el) => {
        if (!!acc) return acc;

        return Object.entries($refs).reduce((dir, [key, $ref]) => {
          if (!!dir) return dir;
          const [id, control, direction] = key.split("::");
          if (control !== "OVERSHOOT") return dir;
          if ($ref === el) return direction;
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

  function handleFocusIn(e: FocusEvent) {
    console.log("handleFocusIn");
    // isShiftPressed.set(false);
  }

  function handleFocusOut(e: FocusEvent) {
    console.log("handleFocusOut");
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

<main class="min-h-screen bg-gray-100">
  <Header />
  {#each $currentPageData.children as elementData, index}
    <Element {elementData} {index}>
      <ElementControls slot="controls" {elementData} />
    </Element>
  {/each}
</main>
