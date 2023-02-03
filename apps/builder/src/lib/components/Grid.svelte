<script lang="ts">
  import type { GridElementType } from "@wordlike/nebula";

  import { ref } from "$lib/actions/ref";
  import Element from "$lib/components/Element.svelte";
  import { DEFAULT_GRID_MAX_WIDTH, ELEMENT_TYPES } from "$lib/constants";
  import ElementControls from "$lib/components/ElementControls.svelte";
  import Guides from "$lib/components/Guides.svelte";
  import {
    dragDiffX,
    dragDiffY,
    resizeDirection,
    isDragging,
    isInserting,
    initialMousePosition,
    mouseMoveEvent,
    mouseMoveComposedPath,
  } from "$lib/stores/drag";
  import { selectedElementIds, insertingElement } from "$lib/stores/element";
  import { deviceKey } from "$lib/stores/device";
  import { calculateGrid } from "$lib/utils/position";

  // props:
  export let elementData: GridElementType;

  // state:
  let gridWidth = elementData?.[$deviceKey]?.width ?? DEFAULT_GRID_MAX_WIDTH;
  let isRelativeWidth = true;
  let gridRef: HTMLElement | undefined;
  let guidesRef: HTMLElement | undefined;
  let isHovered = false;
  let paddingY = 10;
  let paddingX = 24;

  // derived data:
  $: ({ gridAreas, gridTemplateRows, gridTemplateColumns } = calculateGrid(
    extendedElementData,
    $dragDiffX,
    $dragDiffY,
    $resizeDirection,
    $selectedElementIds
  ));

  $: templateRows = [paddingY ?? 0, ...gridTemplateRows, paddingY ?? 0]
    // .map((row) => `${row}px`)
    .map((row) => `minmax(${row}px, 0fr)`)
    .join(" ");

  $: templateColumns = [
    `minmax(${paddingX ?? 0}px, calc(50% - ${gridWidth / 2}px))`,
    ...gridTemplateColumns,
    `minmax(${paddingX ?? 0}px, calc(50% - ${gridWidth / 2}px))`,
  ]
    .map((col) => {
      if (isNaN(col)) return col;
      return isRelativeWidth ? `${col / gridWidth}fr` : `${col}px`;
    })
    .join(" ");

  $: extendedElementData =
    $isInserting && isHovered && $insertingElement
      ? {
          ...elementData,
          children: [...elementData.children, $insertingElement],
        }
      : elementData;

  $: {
    const isInPath = $mouseMoveComposedPath.includes(gridRef);
    if (!isInPath && isHovered) {
      isHovered = false;
    } else if (isInPath && !isHovered) {
      isHovered = true;
      if ($isInserting) {
        const { clientX, clientY } = $mouseMoveEvent;
        const { left = 0, top = 0 } = guidesRef?.getBoundingClientRect() ?? {};

        initialMousePosition.set({
          x: clientX,
          y: clientY,
        });

        const x = clientX - left - 150;
        const y = clientY - top - 24;
        insertingElement.update((elementData) => {
          return {
            ...elementData,
            [$deviceKey]: {
              ...elementData[$deviceKey],
              x,
              y,
            },
          };
        });
        selectedElementIds.set([$insertingElement?.id]);
        isDragging.set(true);
      }
    }
  }

  $: overShoot = (() => {
    if (!$isDragging) return;
    if (elementData.type !== ELEMENT_TYPES.GRID) return;
    if (!$resizeDirection) return;

    const { x, width } = guidesRef?.getBoundingClientRect() ?? {};
    const { clientX } = $mouseMoveEvent;
    if (!x || !width) return;

    if ($resizeDirection.includes("W") && clientX - x < 0) return "LEFT";
    if ($resizeDirection.includes("E") && clientX - x > width) return "RIGHT";
    return;
  })();

  $: growLeft = (() => {
    if (!isHovered && overShoot !== "LEFT") return 0;

    const { clientX } = $mouseMoveEvent ?? {};
    const { x } = guidesRef?.getBoundingClientRect() ?? {};
    if (!x) return 8;
    return 8 + (x - clientX) / 16;
  })();

  $: growRight = (() => {
    if (!isHovered && overShoot !== "RIGHT") return 0;

    const { clientX } = $mouseMoveEvent ?? {};
    const { x, width } = guidesRef?.getBoundingClientRect() ?? {};
    if (!x || !width) return 8;
    return 8 + (clientX - x - width) / 16;
  })();
</script>

<div
  class="grid relative grid-cols-[var(--grid-template-columns)] grid-rows-[var(--grid-template-rows)]"
  class:cursor-[e-resize]={overShoot === "RIGHT"}
  class:cursor-[w-resize]={overShoot === "LEFT"}
  style:--width={`${gridWidth}px`}
  style:--grid-template-rows={templateRows}
  style:--grid-template-columns={templateColumns}
  bind:this={gridRef}
>
  {#each extendedElementData.children as elementData, index}
    <Element {elementData} {index} gridData={gridAreas[index]}>
      <ElementControls slot="controls" {elementData} />
    </Element>
  {/each}
  <div
    class="opacity-0 pointer-events-none grid col-start-2 row-start-2 col-end-[-2] row-end-[-2]"
    class:opacity-100={isHovered}
    bind:this={guidesRef}
    use:ref={`${elementData.id}::GRID`}
  >
    <Guides elementData={extendedElementData} {gridWidth} />
  </div>
  <div
    class="absolute left-0 bg-black inset-y-0 hover:opacity-30 opacity-0 w-[var(--grow-left)] transition-opacity"
    class:opacity-10={isHovered && overShoot === "LEFT"}
    style:--grow-left={`${growLeft}px`}
    use:ref={`${elementData.id}::OVERSHOOT::LEFT`}
  />
  <div
    class="absolute right-0 bg-black inset-y-0 hover:opacity-30 opacity-0 w-[var(--grow-right)] transition-opacity"
    class:opacity-10={isHovered && overShoot === "RIGHT"}
    style:--grow-right={`${growRight}px`}
    use:ref={`${elementData.id}::OVERSHOOT::RIGHT`}
  />
</div>
