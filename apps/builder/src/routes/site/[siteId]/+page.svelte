<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import Block from "$lib/components/Block.svelte";
  import Header from "../components/Header.svelte";
  import {
    elementPath,
    isDragging,
    initialMousePosition,
    mousePosition,
    resizeDirection,
  } from "$lib/stores/drag";
  import { doc } from "$lib/stores/doc";
  import { updateDraggedElementsData } from "$lib/stores/element";
  import { isShiftPressed } from "$lib/stores/keys";

  function handleMouseUp(event: MouseEvent) {
    console.log("handleMouseUp", event.composedPath());
    // add if statement to check if the element is being dragged at all
    updateDraggedElementsData();

    mousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
    elementPath.set([]);
    isDragging.set(false);
    resizeDirection.set(null);
  }

  function handleMouseDown(event: MouseEvent) {
    elementPath.set(event.path);
    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleMouseMove(event: MouseEvent) {
    if (!$isDragging) return;
    mousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(true);
    console.log("keydown", event.key);
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Shift") isShiftPressed.set(false);
  }

  $: pageData = $doc?.pages?.find(({ slug, isHome }) => {
    return $page.params.slug ? slug === $page.params.slug : isHome;
  });

  export let data: PageData;

  doc.set(data?.doc);
</script>

<svelte:window
  on:keydown={handleKeyDown}
  on:keyup={handleKeyUp}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
/>

<main class="min-h-screen bg-gray-100">
  <Header />
  {#each pageData.children as blockData, index}
    <Block {blockData} pageId={pageData.id} {index} />
  {/each}
</main>
