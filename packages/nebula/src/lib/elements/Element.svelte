<script lang="ts">
	import type { ElementType } from '$lib/schema';
	import type { GridDataType } from '$lib/utils/getGridArea';

	import { ELEMENT_TYPES } from '$lib/constants';
	import Grid from '$lib/elements/Grid.svelte';
	import { ref } from '$lib/stores/ref';
	import { getGridArea } from '$lib/utils/getGridArea';

	export let elementData: ElementType;
	export let gridData: GridDataType;

	$: ({ desktop, id, type } = elementData ?? {});
	$: gridArea = getGridArea(gridData);
	console.log(elementData);
</script>

<div class={`element element--${type}`} use:ref={id}>
	<!-- <pre style="font-size:10px;">{JSON.stringify(gridData, null, 1)}</pre> -->
	{#if type === ELEMENT_TYPES.GRID}
		<Grid {elementData}>
			<!-- maybe add slot here for rendering self? -->
		</Grid>
	{:else if type === ELEMENT_TYPES.TEXT}
		text
		<!-- <TextEditor {elementData} /> -->
	{:else if type === ELEMENT_TYPES.IMAGE}
		<!-- else if content here -->
	{/if}
	<slot><!-- optional fallback --></slot>
	<slot name="controls" />
</div>

<style lang="scss">
	@use 'sass:math';
	$size: 8px;

	.element {
		z-index: 2;
		position: relative;
		align-self: start;
	}
</style>
