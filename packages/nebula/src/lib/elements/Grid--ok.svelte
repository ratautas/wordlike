<script lang="ts" context="module">
	export function getTemplateRows({ elementData, gridTemplateRows, device }) {
		return [
			elementData[device]?.paddingY ?? DEVICE_DEFAULTS[device].paddingY,
			...gridTemplateRows,
			elementData[device]?.paddingY ?? DEVICE_DEFAULTS[device].paddingY
		]
			.map((row) => `minmax(${row}px, 0fr)`)
			.join(' ');
	}

	export function getTemplateColumns({ elementData, gridTemplateColumns, device }) {
		const paddingX = elementData[device]?.paddingX ?? DEVICE_DEFAULTS[device].paddingX;
		const width = elementData[device]?.width ?? DEVICE_DEFAULTS[device].width;

		return [
			`minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`,
			...gridTemplateColumns,
			`minmax(${paddingX ?? 0}px, calc(50% - ${width / 2}px))`
		]
			.map((col) => {
				if (isNaN(col)) return col;
				return `${(col / width).toPrecision(3)}fr`;
			})
			.join(' ');
	}

	export function getGridVars(elementData) {
		return Object.values(BREAKPOINTS).reduce((acc, breakpoint) => {
			const device = breakpoint.key;
			const { gridTemplateRows, gridTemplateColumns, gridAreas } = calculateGrid({
				elementData,
				device
			});

			const templateRows = getTemplateRows({
				elementData,
				gridTemplateRows,
				device
			});
			const templateColumns = getTemplateColumns({
				elementData,
				gridTemplateColumns,
				device
			});

			return {
				...acc,
				[`${device}Areas`]: gridAreas,
				[`${device}Rows`]: templateRows,
				[`${device}Columns`]: templateColumns
			};
		}, {});
	}
</script>

<script lang="ts">
	import { DEVICE_DEFAULTS, BREAKPOINTS, ELEMENT_TYPES } from '$lib/constants';
	import Text from '$lib/elements/Text.svelte';
	import type { GridElementType } from '$lib/schema';
	import { ref } from '$lib/stores/ref';
	import { calculateGrid } from '$lib/utils/calculateGrid';

	export let elementData: GridElementType;

	$: ({
		desktopRows,
		desktopColumns,
		desktopAreas,
		tabletRows,
		tabletColumns,
		tabletAreas,
		mobileRows,
		mobileColumns,
		mobileAreas
	} = getGridVars(elementData));

	let gridRef;
</script>

<div
	class="grid"
	style:--desktop-rows={desktopRows}
	style:--desktop-columns={desktopColumns}
	style:--tablet-rows={tabletRows}
	style:--tablet-columns={tabletColumns}
	style:--mobile-rows={mobileRows}
	style:--mobile-columns={mobileColumns}
	bind:this={gridRef}
	use:ref={elementData.id}
>
	{#each elementData.children as child, index}
		<div
			class={`element element--${child.type}`}
			style:--desktop-area={desktopAreas?.[index]}
			style:--tablet-area={tabletAreas?.[index]}
			style:--mobile-area={mobileAreas?.[index]}
			use:ref={child.id}
		>
			{#if child.type === ELEMENT_TYPES.GRID}
				<!-- TODO: pass / inherit slots: -->
				<svelte:self elementData={child} />
			{:else if child.type === ELEMENT_TYPES.TEXT}
				<Text elementData={child} />
				<!-- <TextEditor {elementData} /> -->
			{:else if child.type === ELEMENT_TYPES.IMAGE}
				<!-- else if content here -->
			{/if}
		</div>
	{/each}
	<slot name="grid-controls" />
</div>

<style lang="scss">
	@use 'sass:math';
	$size: 8px;

	:global(.element) {
		z-index: 3;
		position: relative;
		align-self: start;
		grid-area: var(--desktop-area);
		@media screen and (max-width: 1024px) {
			grid-area: var(--tablet-area);
		}
		@media screen and (max-width: 768px) {
			grid-area: var(--mobile-area);
		}
	}
	:global(.grid) {
		display: grid;
		position: relative;
		grid-template-rows: var(--desktop-rows);
		grid-template-columns: var(--desktop-columns);
		@media screen and (max-width: 1024px) {
			grid-template-rows: var(--tablet-rows);
			grid-template-columns: var(--tablet-columns);
		}
		@media screen and (max-width: 768px) {
			grid-template-rows: var(--mobile-rows);
			grid-template-columns: var(--mobile-columns);
		}
	}
</style>
