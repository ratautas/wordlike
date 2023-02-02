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
	import { DEVICE_DEFAULTS, BREAKPOINTS } from '$lib/constants';
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
</script>

<div
	class="grid"
	style:--desktop-rows={desktopRows}
	style:--desktop-columns={desktopColumns}
	style:--tablet-rows={tabletRows}
	style:--tablet-columns={tabletColumns}
	style:--mobile-rows={mobileRows}
	style:--mobile-columns={mobileColumns}
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
			{#if index === 0 && !!$$slots.el00}<slot name="el00" />{/if}
			{#if index === 1 && !!$$slots.el01}<slot name="el01" />{/if}
			{#if index === 2 && !!$$slots.el02}<slot name="el02" />{/if}
			{#if index === 3 && !!$$slots.el03}<slot name="el03" />{/if}
			{#if index === 4 && !!$$slots.el04}<slot name="el04" />{/if}
			{#if index === 5 && !!$$slots.el05}<slot name="el05" />{/if}
			{#if index === 6 && !!$$slots.el06}<slot name="el06" />{/if}
			{#if index === 7 && !!$$slots.el07}<slot name="el07" />{/if}
			{#if index === 8 && !!$$slots.el08}<slot name="el08" />{/if}
			{#if index === 9 && !!$$slots.el09}<slot name="el09" />{/if}
		</div>
	{/each}
	<slot name="plane" />
	<slot name="controls" />
</div>

<style lang="scss">
	@use 'sass:math';
	$size: 8px;

	.element {
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
	.grid {
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
