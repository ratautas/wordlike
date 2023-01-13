<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import Block from "$lib/components/Block.svelte";
  import {
    elementPath,
    isDragging,
    initialMousePosition,
    draggingMousePosition,
    dragEndHandler,
  } from "$lib/stores/drag";
  import { doc } from "$lib/stores/doc";
  import { isShiftPressed } from "$lib/stores/keys";

  const DEFAULT_BLOCK_WIDTH = 1024;

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
  <div class="absolute right-0">
    <a href="/">Home</a>
    <a href="/sites">Sites</a>
  </div>
  {#each pageData.children as block}
    <Block {block} />
  {/each}
</main>
