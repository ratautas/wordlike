<script lang="ts">
	// props:
	export let elementData: GridElementType;

	// state:
	let gridWidth = elementData?.desktop.width ?? DEFAULT_GRID_MAX_WIDTH;
	let paddingY = elementData?.desktop.paddingY ?? 0;
	let paddingX = elementData?.desktop.paddingX ?? 0;

	let gridRef: HTMLElement | undefined;
	let gridAreas;
	let gridTemplateRows;
	let gridTemplateColumns;

	$: templateRows = [paddingY ?? 0, ...gridTemplateRows, paddingY ?? 0]
		.map((row) => `minmax(${row}px, 0fr)`)
		.join(' ');

	$: templateColumns = [
		`minmax(${paddingX ?? 0}px, calc(50% - ${gridWidth / 2}px))`,
		...gridTemplateColumns,
		`minmax(${paddingX ?? 0}px, calc(50% - ${gridWidth / 2}px))`
	]
		.map((col) => {
			if (isNaN(col)) return col;
			return `${col / gridWidth}fr`;
		})
		.join(' ');
</script>

<div
	class="grid"
	style:--width={`${gridWidth}px`}
	style:--grid-template-rows={templateRows}
	style:--grid-template-columns={templateColumns}
	bind:this={gridRef}
>
	{#each elementData.children as element, index}
		<Element elementData={element} {index} gridData={gridAreas[index]}>
			<ElementControls slot="controls" elementData={element} />
		</Element>
	{/each}
</div>

<style lang="scss">
	:global(.grid) {
		display: grid;
		position: relative;
		grid-template-rows: var(--grid-template-rows);
		grid-template-columns: var(--grid-template-columns);
		@media screen and (max-width: 768px) {
			grid-template-rows: var(--grid-template-rows);
			grid-template-columns: var(--grid-template-columns);
		}
	}
</style>
