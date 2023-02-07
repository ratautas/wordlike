<script lang="ts">
  import BiTextareaT from "~icons/bi/textarea-t";
  import BiImage from "~icons/bi/image";
  import BiSuitDiamond from "~icons/bi/suit-diamond";

  import {
    dragMousePosition,
    hasDragged,
    isDragInserting,
    isClickInserting,
    isInserting,
  } from "$lib/stores/drag";
  import {
    INSERTED_TYPES,
    createInsertedElement,
    selectedElementIds,
    insertingElement,
  } from "$lib/stores/element";

  const { PARAGRAPH, HEADING, BUTTON } = INSERTED_TYPES;

  function startDragInsert(event: MouseEvent, set: string) {
    dragMousePosition.set({ x: event.clientX, y: event.clientY });
    createInsertedElement(set);
    isDragInserting.set(true);
    selectedElementIds.set([$insertingElement.id]);
  }

  function setDragInsertToClick() {
    if ($hasDragged) return;
    isClickInserting.set(true);
    isDragInserting.set(false);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<header class="sticky left-0 right-0 top-0 z-50 bg-white">
  {#if !$isInserting}
    <div class="flex p-2 justify-center">
      <button
        class="group/action flex flex-col items-center justify-center w-12 h-12 mx-1 rounded hover:bg-gray-100 relative cursor-grab"
      >
        <div
          class="flex flex-col items-center"
          on:mousedown={(e) => startDragInsert(e, PARAGRAPH)}
          on:mouseup={setDragInsertToClick}
        >
          <BiTextareaT />
          <div class="text-xs pointer-events-none">Text</div>
        </div>
        <div
          class="hidden group-hover/action:block absolute -left-8 -right-8 top-full text-xs"
        >
          <div
            class="flex p-2"
            on:mousedown={(e) => startDragInsert(e, PARAGRAPH)}
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
  {:else}
    <div class="h-16 animate-bounce flex justify-center items-center">
      drag and release or hit ESC to cancel
    </div>
  {/if}
</header>
