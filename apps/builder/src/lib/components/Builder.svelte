<script lang="ts">
  import { browser, building, dev, version } from "$app/environment";
  import { onDestroy } from "svelte";

  import Text from "$lib/components/Text.svelte";
  import doc from "$lib/mock/doc.json";

  // export let data: PageData;
</script>

{#each doc.children as component}
  {#if component.type === "GRID"}
    <div class="grid">
      {#each component.children as item}
        {#if item.type === "TEXT"}
          <Text {item} />
        {:else}
          <h1>Welcome to SvelteKit</h1>
          <p>
            Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
            documentation
          </p>
        {/if}
      {/each}
    </div>
  {/if}
{/each}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 24px;
  }
</style>
