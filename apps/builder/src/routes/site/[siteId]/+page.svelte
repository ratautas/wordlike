<script lang="ts">
  import type { PageData } from "./$types";
  import Block from "$lib/components/Block.svelte";
  import {
    elementPath,
    isDragging,
    initialMousePosition,
    draggingMousePosition,
    dragDiffX,
    dragDiffY,
    dragEndHandler,
  } from "$lib/stores/drag";
  import { page } from "$app/stores";
  import { doc } from "$lib/stores/doc";

  const DEFAULT_BLOCK_WIDTH = 1024;

  const handleMouseDown = (event: any) => {
    elementPath.set(event.path);
    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!$isDragging) return;
    draggingMousePosition.set({ x: event.clientX, y: event.clientY });
  };

  export let data: PageData;

  doc.set(data.doc);

  $: pageData = $doc?.pages?.find(({ slug, isHome }) => {
    return $page.params.slug ? slug === $page.params.slug : isHome;
  });
</script>

<main
  on:mousedown={handleMouseDown}
  on:mouseup={dragEndHandler}
  on:mousemove={handleMouseMove}
  class="min-h-screen bg-gray-100"
  style:--drag-x={$dragDiffX && `${$dragDiffX}px`}
  style:--drag-y={$dragDiffX && `${$dragDiffY}px`}
>
  <div class="absolute right-0">
    <a href="/">Home</a>
    <a href="/sites">Sites</a>
    {$draggingMousePosition.x}
    {$draggingMousePosition.y}
  </div>
  {#each pageData.children as block}
    <Block {block} />
  {/each}
</main>
