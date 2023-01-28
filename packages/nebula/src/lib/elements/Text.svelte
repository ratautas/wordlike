<script lang="ts">
	export let elementData;
</script>

{#if elementData?.html}
	<div class="text" contenteditable="true">
		{@html elementData?.html}
	</div>
{/if}

<style lang="scss">
	.text {
		&[contenteditable='true'] {
			outline: none;
			&:focus {
				outline: none;
			}
		}

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
