<script lang="ts">
	import type { GridElementType } from '$lib/schema';
	import { ref } from '$lib/stores/ref';
	import { getGridVars } from '$lib/utils/getGridVars';

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
	@import '$lib/style/grid.css';
</style>
