<script lang="ts">
  import BiTextareaT from "~icons/bi/textarea-t";
  import BiImage from "~icons/bi/image";
  import BiSuitDiamond from "~icons/bi/suit-diamond";

  import {
    isDragInserting,
    isClickInserting,
    hasDragged,
    dragMousePosition,
  } from "$lib/stores/drag";
  import { INSERTED_TYPES, createInsertedElement } from "$lib/stores/element";

  let dragDelay = 250;
  let isClick = false;
  let interactionStart: number;
  let showActions = true;

  function handleParagraphMouseDown(event: MouseEvent) {
    interactionStart = Date.now();
    dragMousePosition.set({ x: event.clientX, y: event.clientY });
    createInsertedElement(INSERTED_TYPES.PARAGRAPH);
    isDragInserting.set(true);
    setTimeout(() => {
      isDragInserting.set(!isClick);
      showActions = false;
    }, dragDelay);
  }

  function handleParagraphMouseUp(event: MouseEvent) {
    isClick = true;
    isClickInserting.set(true);
    isDragInserting.set(false);
  }

  function handleWindowMouseUp(event: MouseEvent) {}
</script>

<svelte:window on:mouseup={handleWindowMouseUp} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<header class="sticky left-0 right-0 top-0 z-50 bg-white">
  <div
    class="flex p-2 justify-center relative z-20"
    class:opacity-0={!showActions}
  >
    <button
      class="group/action flex flex-col items-center justify-center w-12 h-12 mx-1 rounded hover:bg-gray-100 relative cursor-grab"
    >
      <BiTextareaT class="pointer-events-none" />
      <div class="text-xs pointer-events-none">Text</div>
      <div
        class="hidden group-hover/action:block absolute -left-8 -right-8 top-full text-xs"
      >
        <div
          class="flex p-2"
          on:mouseup={handleParagraphMouseUp}
          on:mousedown={handleParagraphMouseDown}
        >
          Paragraph <span>(default)</span> [t]
        </div>
        <div class="flex">Heading [h]</div>
        <div class="flex">Button [b]</div>
        <div class="flex">Custom 1</div>
        <div class="flex">Custom 2</div>
        <div class="flex">Edit Custom Elements</div>
      </div>
    </button>
    <button
      class="group/action flex flex-col items-center justify-center w-12 h-12 mx-1 rounded hover:bg-gray-100 relative"
    >
      <BiImage class="pointer-events-none" />
      <div class="text-xs pointer-events-none">Image</div>
      <div
        class="hidden group-hover/action:block absolute -left-8 -right-8 top-full text-xs"
      >
        <div class="flex">Media Library <span>(default)</span> [m]</div>
        <div class="flex">Upload [u]</div>
        <div class="flex">Icon [i]</div>
        <div class="flex">Free Resources [f]</div>
        <div class="flex">GIFs [g]</div>
      </div>
    </button>
    <button
      class="group/action flex flex-col items-center justify-center w-12 h-12 mx-1 rounded hover:bg-gray-100 relative"
    >
      <BiSuitDiamond class="pointer-events-none" />
      <div class="text-xs pointer-events-none">Shape</div>
      <div
        class="hidden group-hover/action:block absolute -left-8 -right-8 top-full text-xs"
      >
        <div class="flex">Rectangle [r]</div>
        <div class="flex">Line [l]</div>
        <div class="flex">Polylgon [p]</div>
        <div class="flex">Draw [d]</div>
      </div>
    </button>
  </div>
  <!-- content here -->
  <div
    class="h-16 animate-bounce flex justify-center items-center absolute inset-0 opacity-0"
    class:opacity-100={!showActions}
  >
    drag and release
  </div>
  $isClickInserting: {$isClickInserting}, $isDragInserting: {$isDragInserting},
  $hasDragged: {$hasDragged}
</header>
