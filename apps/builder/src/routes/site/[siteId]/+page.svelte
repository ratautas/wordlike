<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import Block from "$lib/components/Block.svelte";
  import Floating from "$lib/components/Floating.svelte";
  import {
    elementPath,
    isDragging,
    initialMousePosition,
    draggingMousePosition,
    dragEndHandler,
  } from "$lib/stores/drag";
  import { doc } from "$lib/stores/doc";

  function handleMouseDown(event: any) {
    elementPath.set(event.path);
    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleMouseMove(event: MouseEvent) {
    if (!$isDragging) return;
    draggingMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  $: pageData = $doc?.pages?.find(({ slug, isHome }) => {
    return $page.params.slug ? slug === $page.params.slug : isHome;
  });

  export let data: PageData;

  doc.set(data?.doc);
</script>

<main
  on:mousedown={handleMouseDown}
  on:mouseup={dragEndHandler}
  on:mousemove={handleMouseMove}
  class="min-h-screen bg-gray-100"
>
  <Floating />

  {#each pageData.children as blockData}
    <Block {blockData} pageId={pageData.id} />
  {/each}
</main>
