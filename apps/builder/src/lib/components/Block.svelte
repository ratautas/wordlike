<script lang="ts">
  import BlockBackground from "$lib/components/BlockBackground.svelte";
  import BlockElement from "$lib/components/BlockElement.svelte";
  import { DEFAULT_GRID_WIDTH } from "$lib/constants";

  $: width = `${block?.width ?? DEFAULT_GRID_WIDTH}px`;

  export let block;
</script>

<div class="block relative mx-auto" style:--max-width={width}>
  <BlockBackground {block} />
  {#each block.children as element}
    <BlockElement {element} />
  {/each}
</div>

<style lang="scss">
  .block {
    width: var(--max-width);
  }
</style>
