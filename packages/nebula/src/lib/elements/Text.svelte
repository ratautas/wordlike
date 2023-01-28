<script lang="ts">
	export let elementData;
</script>

{#if elementData?.html}
	<div class="text" contenteditable="true">
		{@html elementData?.html}
	</div>
{/if}

<style lang="scss">
	:global(.text[contenteditable='true']) {
		outline: none;
		&:focus {
			outline: none;
		}
	}
</style>
