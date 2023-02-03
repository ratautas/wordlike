<script lang="ts">
	import { onMount, createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();

	export let elementData;

	let elementRef: HTMLDivElement;

	onMount(() => dispatch('mount', elementRef));
	onDestroy(() => dispatch('destroy'));
</script>

<div class="text" bind:this={elementRef} on:focus={(e) => dispatch('focus', e)}>
	{@html elementData?.html}
</div>

<style lang="scss">
	.text {
		overflow-wrap: break-word;

		:global(h1) {
			font-size: 2rem;
			font-weight: 700;
		}
		:global(h2) {
			font-size: 1.5rem;
			font-weight: 700;
		}
		:global(h3) {
			font-size: 1.3rem;
			font-weight: 700;
		}
		:global(h4) {
			font-size: 1rem;
			font-weight: 700;
		}
	}
</style>
