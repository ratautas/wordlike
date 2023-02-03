<script lang="ts">
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import BubbleMenu from "@tiptap/extension-bubble-menu";
  import BiChevronLeft from "~icons/bi/chevron-left";
  import BiTypeBold from "~icons/bi/type-bold";
  import BiTypeItalic from "~icons/bi/type-italic";
  import TextControl from "./TextControl.svelte";
  import TextControlTooltip from "./TextControlTooltip.svelte";
  import Kbd from "./Kbd.svelte";

  import { Text } from "@wordlike/nebula";

  import type { TextElementType } from "@wordlike/nebula";

  // props:
  export let elementData: TextElementType;

  // state:
  let editor;
  let controlsRef;
  let isExpanded = false;

  // handlers:
  function handleElementMount(event: CustomEvent) {
    event.detail.innerHTML = "";
    editor = new Editor({
      element: event.detail,
      extensions: [
        StarterKit,
        BubbleMenu.configure({
          element: controlsRef,
        }),
      ],
      content: elementData.html,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
    });
  }

  function handleElementDestroy(el) {
    editor?.destroy();
  }
</script>

<Text
  on:focus={() => console.log("focus")}
  on:destroy={handleElementDestroy}
  on:mount={handleElementMount}
  {elementData}
/>

<div
  class="controls whitespace-nowrap bg-white text-sm text-left flex items-center"
  bind:this={controlsRef}
>
  {#if editor}
    <button
      on:click={() => (isExpanded = !isExpanded)}
      type="button"
      class="transition-transform"
      class:rotate-x-180={isExpanded}
    >
      <BiChevronLeft />
    </button>
    <button type="button" class="relative group/btn">
      <div
        class="absolute -translate-x-1/2 left-1/2 bottom-full opacity-0 pointer-events-none pb-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"
      >
        <div
          class="bg-gray-900 bg-opacity-70 text-white px-2 py-1 rounded text-sm h-7"
        />
      </div>
    </button>

    <TextControl>
      <TextControlTooltip slot="tooltip">Text style</TextControlTooltip>
      <div class="px-2 py-1">Standard Text</div>
      <div
        slot="dropdown"
        class="absolute left-0 right-0 top-full whitespace-normal opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"
      >
        <div class="text-sm bg-white text-left rounded">
          <button
            type="button"
            class="whitespace-nowrap text-left p-1 text-ellipsis overflow-hidden w-full"
            >Title (h1)</button
          >
          <button
            type="button"
            class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
            >Subtitle (h1)</button
          >
          <button
            type="button"
            class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
            >Small Subtitle (h3)</button
          >
          <button
            type="button"
            class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
            >Standard Text (p)</button
          >
        </div>
      </div>
    </TextControl>

    <TextControl>
      <TextControlTooltip slot="tooltip">
        Bold <Kbd key="⌘" /> + <Kbd key="B" />
      </TextControlTooltip>

      <div class="px-2 h-full">
        <BiTypeBold />
      </div>
    </TextControl>

    <TextControl>
      <TextControlTooltip slot="tooltip">
        Italic <Kbd key="⌘" /> + <Kbd key="I" />
      </TextControlTooltip>

      <div class="px-2 h-full">
        <BiTypeItalic />
      </div>
    </TextControl>

    <button type="button" class="relative">
      <div class="absolute">Align<kbd>cmd</kbd> + <kbd>P</kbd></div>
      <BiChevronLeft />
      <div class="absolute">
        <div class="item">
          <BiChevronLeft />
          <span>normal</span>
        </div>
      </div>
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      class:active={editor.isActive("heading", { level: 1 })}
    >
      H1
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class:active={editor.isActive("heading", { level: 2 })}
    >
      H2
    </button>
    <button
      on:click={() => editor.chain().focus().setParagraph().run()}
      class:active={editor.isActive("paragraph")}
    >
      P
    </button>
  {/if}
</div>
