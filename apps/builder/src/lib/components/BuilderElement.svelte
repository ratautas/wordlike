<script lang="ts">
    import "@wordlike/nebula/style/plane.css";
    import type { ElementType } from "@wordlike/nebula/package/schema";
    import {
        getGridVars,
        DEVICE_DEFAULTS,
        ELEMENT_TYPES,
    } from "@wordlike/nebula";

    import { refAction } from "$lib/actions/ref";
    import ElementControls from "$lib/components/ElementControls.svelte";
    import Guides from "$lib/components/Guides.svelte";
    import SideOvershoots from "$lib/components/SideOvershoots.svelte";
    import TextEditor from "$lib/components/TextEditor.svelte";
    import { selectedElementIds, insertingElement } from "$lib/stores/element";
    import { deviceKey } from "$lib/stores/resolution";
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

    let isHovered = false;
    let gridRef: HTMLElement;
    let guidesRef: HTMLElement;

    $: ({ type, id } = elementData);
    $: isGrid = type === ELEMENT_TYPES.GRID;
    $: isSelected = $selectedElementIds.includes(id);
    $: gridElementData = getGridElementsPositions({
        elementData,
        isDragging: $isDragging,
        selectedElementIds: $selectedElementIds,
        diffX: $dragDiffX,
        diffY: $dragDiffY,
        device: $deviceKey,
        resizeDirection: $resizeDirection,
    });
    $: ({ gridCssVars, elementCssVars } =
        isGrid && getGridVars(gridElementData));

    $: {
        const isInPath = $mouseMoveComposedPath.includes(gridRef);
        if (!isInPath && isHovered) {
            isHovered = false;
        } else if (isInPath && !isHovered) {
            isHovered = true;
            if ($isInserting) {
                const { clientX, clientY } = $mouseMoveEvent;
                const { left = 0, top = 0 } =
                    guidesRef?.getBoundingClientRect() ?? {};

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
</script>

{#if type === ELEMENT_TYPES.GRID}
    <div class="plane" style={gridCssVars} bind:this={gridRef}>
        {#each gridElementData.children as childElementData, i}
            <div
                class="element"
                style={elementCssVars[i]}
                use:refAction={childElementData.id}
            >
                <svelte:self elementData={childElementData} />
            </div>
        {/each}

        <div
            class="opacity-0 pointer-events-none grid [grid-area:2/2/-2/-2]"
            bind:this={guidesRef}
            class:opacity-100={isHovered}
            use:refAction={`${elementData.id}::GRID`}
        >
            <Guides elementData={gridElementData} />
        </div>
        <SideOvershoots elementData={gridElementData} {isHovered} />
    </div>
{:else if type === ELEMENT_TYPES.TEXT}
    <TextEditor {elementData} />
{:else if type === ELEMENT_TYPES.IMAGE}
    <!-- else if content here -->
{:else}
    <!-- else content here -->
{/if}
{#if isSelected}
    <ElementControls {elementData} />
{/if}
