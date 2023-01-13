<script lang="ts">
  import BlockBackground from "$lib/components/BlockBackground.svelte";
  import BlockElement from "$lib/components/BlockElement.svelte";
  import TextElement from "$lib/components/TextElement.svelte";
  import type { SvelteComponent } from "svelte";

  let elementRef: SvelteComponent | null;

  $: {
    if (elementRef) {
      console.log(elementRef);
    }
  }

  export let block;
</script>

<div class="block relative max-w-5xl">
  <BlockBackground {block} />
  {#each block.children as element}
    <BlockElement bind:this={elementRef} {element} />
  {/each}
</div>

<style>
  .block {
    padding: 24px;
  }
</style>
