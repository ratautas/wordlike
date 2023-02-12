<script lang="ts">
  import type { ElementType } from "@wordlike/schema/types";
  import { getGridVars, ELEMENT_TYPES } from "@wordlike/nebula";

  import { refAction } from "$lib/actions/ref";
  import ElementControls from "$lib/components/ElementControls.svelte";
  import Guides from "$lib/components/Guides.svelte";
  import { isShiftPressed } from "$lib/stores/keys";
  import SideOvershoots from "$lib/components/SideOvershoots.svelte";
  import BuilderText from "$lib/components/BuilderText.svelte";
  import {
    selectedElementIds,
    insertingElement,
    hoveredElementIds,
    addHoveredElement,
    removeHoveredElement,
    elementMap,
  } from "$lib/stores/element";
  import { deviceKey } from "$lib/stores/device";
  import {
    dragDiffX,
    dragDiffY,
    isDragging,
    resizeDirection,
    isInserting,
    initialMousePosition,
    mouseMoveEvent,
    mouseMoveComposedPath,
  } from "$lib/stores/drag";
  import { getGridElementsPositions } from "$lib/utils/getGridElementsPositions";

  export let elementData: ElementType;

  let gridRef: HTMLElement;
  let planeRef: HTMLElement;

  $: ({ type, id } = elementData);
  $: isSelected = $selectedElementIds.includes(id);
  $: gridElementData = getGridElementsPositions({
    elementData: enhancedElementData,
    isDragging: $isDragging,
    selectedElementIds: $selectedElementIds,
    diffX: $dragDiffX,
    diffY: $dragDiffY,
    device: $deviceKey,
    resizeDirection: $resizeDirection,
  });
  $: ({ gridCssVars, elementCssVars } =
    type === ELEMENT_TYPES.GRID && getGridVars(gridElementData));
  $: isHovered = $hoveredElementIds.includes(id);

  function getEnhancedElementData({
    elementData,
    isInserting,
    insertingElement,
    isHovered,
    mouseMoveEvent,
    planeRef,
    deviceKey,
  }) {
    if (elementData.type !== ELEMENT_TYPES.GRID) return elementData;
    if (!isInserting) return elementData;
    if (!isHovered) return elementData;

    const { clientX, clientY } = mouseMoveEvent;
    const { left, top } = planeRef?.getBoundingClientRect();

    initialMousePosition.set({
      x: clientX,
      y: clientY,
    });

    const x = clientX - left - 150;
    const y = clientY - top - 24;

    insertingElement[deviceKey].x = x;
    insertingElement[deviceKey].y = y;

    // insertingElement.update((elementData) => {
    //   return {
    //     ...elementData,
    //     [deviceKey]: {
    //       ...elementData[deviceKey],
    //       x,
    //       y,
    //     },
    //   };
    // });
    // selectedElementIds.set([insertingElement?.id]);
    // isDragging.set(true);

    return {
      ...elementData,
      children: [insertingElement, ...elementData.children],
    };
  }

  $: enhancedElementData = getEnhancedElementData({
    elementData,
    isInserting: $isInserting,
    insertingElement: $insertingElement,
    isHovered,
    mouseMoveEvent: $mouseMoveEvent,
    planeRef,
    deviceKey: $deviceKey,
  });

  function handleElementMouseDown(event: MouseEvent, elementData: ElementType) {
    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });

    // if no element is selected, just select the clicked element
    if ($selectedElementIds.length === 0) {
      return selectedElementIds.set([elementData.id]);
    }

    // if the clicked element is already selected
    if ($selectedElementIds.includes(elementData.id)) {
      // if shift is not pressed, do nothing
      if (!$isShiftPressed) return;
      // otherwise, deselect the clicked element
      return selectedElementIds.set(
        $selectedElementIds.filter((id) => id !== elementData.id)
      );
    }

    const isSiblingSelected = $selectedElementIds.some((id) =>
      $elementMap[elementData.id].siblings.some((sibling) => sibling.id === id)
    );

    // some of the clicked element's siblings are selected
    if (isSiblingSelected) {
      const ids = $isShiftPressed ? $selectedElementIds : [];
      return selectedElementIds.set([...ids, elementData.id]);
    }
  }

  function handleElementMouseEnter(event: MouseEvent) {
    addHoveredElement(id);
  }

  function handleElementMouseLeave(event: MouseEvent) {
    removeHoveredElement(id);
  }
</script>

{#if type === ELEMENT_TYPES.GRID}
  <div
    class="plane group/plane"
    style={gridCssVars}
    bind:this={gridRef}
    use:refAction={{ id: gridElementData.id, type: "elementRef" }}
  >
    {#each gridElementData.children as childElementData, i}
      <div
        class="element group/element"
        style={elementCssVars[i]}
        on:mousedown={(e) => handleElementMouseDown(e, childElementData)}
        on:mouseenter={handleElementMouseEnter}
        on:mouseleave={handleElementMouseLeave}
        use:refAction={{ id: childElementData.id, type: "elementRef" }}
      >
        <svelte:self elementData={childElementData} />
      </div>
    {/each}

    <div
      class="opacity-0 pointer-events-none grid [grid-area:2/2/-2/-2] overflow-hidden"
      class:opacity-100={isHovered}
      bind:this={planeRef}
      use:refAction={{ id, type: "planeRef" }}
    >
      <ElementControls {elementData} />
      <Guides elementData={gridElementData} />
    </div>
    <SideOvershoots elementData={gridElementData} {isHovered} {planeRef} />
  </div>
{:else if type === ELEMENT_TYPES.TEXT}
  <BuilderText {elementData} />
{:else if type === ELEMENT_TYPES.IMAGE}
  <!-- else if content here -->
{:else}
  <!-- else content here -->
{/if}

{#if isSelected && type !== ELEMENT_TYPES.GRID}
  <ElementControls {elementData} />
{/if}
