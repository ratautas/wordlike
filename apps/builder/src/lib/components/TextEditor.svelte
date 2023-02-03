<script lang="ts">
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import BubbleMenu from "@tiptap/extension-bubble-menu";

  import { Text } from "@wordlike/nebula";

  import type { TextElementType } from "@wordlike/nebula";

  // props:
  export let elementData: TextElementType;

  // state:
  let editor;
  let controlsRef;

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
  class="controls whitespace-nowrap bg-white text-sm"
  bind:this={controlsRef}
>
  {#if editor}
    <div class="select">
      <input
        list="ice-cream-flavors"
        id="ice-cream-choice"
        name="ice-cream-choice"
        placeholder="Choose a flavor"
      />
      <datalist id="ice-cream-flavors">
        <option value="Chocolate">hi</option>
        <option value="Coconut">hi</option>
        <option value="Mint">ho</option>
        <option value="Strawberry">ii</option>
        <option value="Vanilla">asd</option>
      </datalist>
    </div>
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
