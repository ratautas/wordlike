<script lang="ts">
    import "@wordlike/nebula/package/style/grid.css";
    import type { ElementType } from "@wordlike/nebula/package/schema";
    import { getGridVars } from "@wordlike/nebula";

    import { refAction } from "$lib/actions/ref";
    import TextEditor from "$lib/components/TextEditor.svelte";
    import ElementControls from "$lib/components/ElementControls.svelte";
    import { ELEMENT_TYPES } from "$lib/constants";
    import { selectedElementIds, insertingElement } from "$lib/stores/element";
    import { deviceKey } from "$lib/stores/resolution";
    import {
        dragDiffX,
        dragDiffY,
        isDragging,
        resizeDirection,
    } from "$lib/stores/drag";
    import { getGridElementsPositions } from "$lib/utils/getGridElementsPositions";

    export let elementData: ElementType;

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
</script>

{#if isGrid}
    <div class="grid" style={gridCssVars}>
        {#each gridElementData.children as childElementData, i}
            <div
                class="element"
                style={elementCssVars[i]}
                use:refAction={childElementData.id}
            >
                <svelte:self elementData={childElementData} />
                <!-- controls here, maybe? -->
            </div>
        {/each}
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
