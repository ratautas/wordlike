<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import Block from "$lib/components/Block.svelte";
  import Floating from "$lib/components/Floating.svelte";
  import Header from "../components/Header.svelte";
  import {
    elementPath,
    isDragging,
    initialMousePosition,
    mousePosition,
    dragEndHandler,
  } from "$lib/stores/drag";
  import { doc } from "$lib/stores/doc";
  import BiTextareaT from "~icons/bi/textarea-t";
  import BiImage from "~icons/bi/image";
  import BiSuitDiamond from "~icons/bi/suit-diamond";
  import MdiFormatTextbox from "~icons/mdi/format-textbox";
  import CarbonTextCreation from "~icons/carbon/text-creation";
  import FluentTextField20Regular from "~icons/fluent/text-field-20-regular";
  import IconParkOutlineText from "~icons/icon-park-outline/text";
  import { isShiftPressed } from "$lib/stores/keys";

  function handleMouseDown(event: any) {
    elementPath.set(event.path);
    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleMouseMove(event: MouseEvent) {
    if (!$isDragging) return;
    mousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleClick(event: MouseEvent) {}

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
  on:mouseup={dragEndHandler}
  on:mousemove={handleMouseMove}
  on:click={handleClick}
/>

<main class="min-h-screen bg-gray-100">
  <Header />
  <!-- <Floating /> -->

  {#each pageData.children as blockData, index}
    <Block {blockData} pageId={pageData.id} {index} />
  {/each}
</main>
