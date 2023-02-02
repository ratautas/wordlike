<script lang="ts">
    import type { ElementType } from "@wordlike/nebula/schema";

    import TextEditor from "$lib/components/TextEditor.svelte";
    import BuilderGrid from "./BuilderGrid.svelte";
    import { ELEMENT_TYPES } from "$lib/constants";
    import { selectedElementIds, insertingElement } from "$lib/stores/element";

    export let elementData: ElementType;

    $: ({ type, id } = elementData);
    $: isSelected = $selectedElementIds.includes(id);
</script>

<!-- <pre style="font-size:10px;">{JSON.stringify(gridData, null, 1)}</pre> -->
{#if type === ELEMENT_TYPES.GRID}
    <BuilderGrid {elementData} />
{:else if type === ELEMENT_TYPES.TEXT}
    <TextEditor {elementData} />
{:else if type === ELEMENT_TYPES.IMAGE}
    <!-- else if content here -->
{:else}
    <!-- else content here -->
{/if}
{#if isSelected}
    <slot name="controls" />
{/if}
