<script lang="ts">
  import {
    elementPath,
    isDragging,
    initialMousePosition,
    draggingMousePosition,
    dragDiffX,
    dragDiffY,
  } from "$lib/stores/drag";
  import IconAccessibility from "~icons/carbon/accessibility";
  import IconAccountBox from "~icons/mdi/account-box";

  $: transform = `translate3d(${$dragDiffX ?? 0}px, ${$dragDiffY ?? 0}px, 0)`;

  function handleMouseDown(event: any) {
    elementPath.set(event.path);
    isDragging.set(true);
    initialMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleMouseMove(event: MouseEvent) {
    if (!$isDragging) return;
    draggingMousePosition.set({ x: event.clientX, y: event.clientY });
  }

  function handleMouseUp(event: MouseEvent) {
    console.log("mouseup");

    draggingMousePosition.set({ x: null, y: null });
    initialMousePosition.set({ x: null, y: null });
    elementPath.set([]);
    isDragging.set(false);
  }
</script>

<div
  on:mousedown|stopPropagation={handleMouseDown}
  on:mouseup|stopPropagation={handleMouseUp}
  on:mousemove|stopPropagation={handleMouseMove}
  class="absolute cursor-pointer left-48 top-[200px] z-30 w-12 h-12 rounded-full backdrop-blur-sm drop-shadow-l border-white border-width-[1px] border-solid"
  style:transform
>
  <IconAccessibility />
  x
</div>
