<script lang="ts">
    import type { Editor as EditorType } from "@tiptap/core";
    import type { ReferenceElement } from "@floating-ui/dom";

    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import { computePosition, offset, shift, flip } from "@floating-ui/dom";

    import BiChevronLeft from "~icons/bi/chevron-left";
    import BiTypeBold from "~icons/bi/type-bold";
    import BiTypeItalic from "~icons/bi/type-italic";
    import BiTextLeft from "~icons/bi/text-left";
    import BiTypeUnderline from "~icons/bi/type-underline";
    import BiTypeStrikethrough from "~icons/bi/type-strikethrough";
    import BiListOl from "~icons/bi/list-ol";
    import BiLink45deg from "~icons/bi/link-45deg";

    import type { TextElementType } from "@wordlike/nebula/package/schema";
    import { Text } from "@wordlike/nebula";

    import TextControl from "./TextControl.svelte";
    import TextControlTooltip from "./TextControlTooltip.svelte";
    import Kbd from "./Kbd.svelte";

    // props:
    export let elementData: TextElementType;

    // state:
    let editor: EditorType;
    let controlsRef: HTMLElement;
    let editorRef: HTMLElement;
    let isExpanded = false;
    let isEditorFocused = false;
    let isClickedOnControls = false;

    let top = "0px";
    let left = "0px";
    let transform = "translate3d(0, 0, 0)";

    $: showControls = isEditorFocused || isClickedOnControls;

    // handlers:
    function handleElementMount(event: CustomEvent) {
        editorRef = event.detail;
        event.detail.innerHTML = "";
        editor = new Editor({
            element: event.detail,
            extensions: [StarterKit],
            content: elementData.html,
            onTransaction: handleEditorTransaction,
            onFocus: handleEditorFocus,
            onBlur: handleEditorBlur,
            autofocus: true,
        });
    }

    function handleEditorTransaction({ editor }) {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
        if (!isEditorFocused) return;

        const selection = window.getSelection();
        const range: ReferenceElement = selection.getRangeAt(0);
        // selectionBookmark = editor.state.selection.getBookmark();

        computePosition(range, controlsRef, {
            placement: "top",
            middleware: [offset(10), shift(), flip()],
        }).then(({ x, y }) => {
            top = `${y}px`;
            left = `${x}px`;
            transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }

    function handleEditorFocus({ editor, event }) {
        isEditorFocused = true;
    }

    function handleEditorBlur({ editor, event }) {
        console.log("Save Your Content Here");
        isEditorFocused = false;
    }

    function handleElementDestroy() {
        if (!editor) return;
        editor.destroy();
        editor = null;
    }

    function handleMoreClick() {
        isExpanded = !isExpanded;
    }

    function handleControlsClick(event: MouseEvent) {
        event.stopPropagation();
        // refocus back to the editor and select previous text
        isEditorFocused = true;
        editor.chain().focus().setTextSelection(editor.state.selection);
        isClickedOnControls = false;
    }
</script>

<Text
    on:destroy={handleElementDestroy}
    on:mount={handleElementMount}
    {elementData}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="opacity-0 z-10 absolute controls whitespace-nowrap bg-white text-sm text-left flex items-center rounded-full"
    class:opacity-100={showControls}
    class:pointer-events-auto={showControls}
    style:top
    style:left
    bind:this={controlsRef}
    on:click={handleControlsClick}
    on:mousedown={() => (isClickedOnControls = true)}
>
    <TextControl>
        <TextControlTooltip slot="tooltip">
            {isExpanded ? "Less" : "More"} Tools
        </TextControlTooltip>
        <button
            class="px-1 flex items-center h-full rounded-tl-full rounded-bl-full"
            class:rotate-180={isExpanded}
            type="button"
            on:click={handleMoreClick}
        >
            <BiChevronLeft />
        </button>
    </TextControl>

    <TextControl>
        <TextControlTooltip slot="tooltip">Text style</TextControlTooltip>
        <div class="px-2 py-1 w-12 overflow-hidden text-ellipsis">Text</div>
        <div
            slot="dropdown"
            class="absolute left-0 right-0 top-full whitespace-normal opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"
        >
            <div class="text-sm bg-white text-left rounded">
                <button
                    type="button"
                    class="whitespace-nowrap text-left p-1 text-ellipsis overflow-hidden w-full"
                >
                    Title (h1)
                </button>
                <button
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    Subtitle (h1)
                </button>
                <button
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    Small Subtitle (h3)
                </button>
                <button
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    Text (p)
                </button>
            </div>
        </div>
    </TextControl>

    {#if isExpanded}
        <TextControl>
            <TextControlTooltip slot="tooltip">Font</TextControlTooltip>
            <div class="px-2 py-1">Font Family</div>
            <div
                slot="dropdown"
                class="absolute left-0 right-0 top-full whitespace-normal opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"
            >
                <div class="text-sm bg-white text-left rounded">
                    <button
                        type="button"
                        class="whitespace-nowrap text-left p-1 text-ellipsis overflow-hidden w-full"
                        >Helvetica</button
                    >
                    <button
                        type="button"
                        class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                        >Open Sans</button
                    >
                </div>
            </div>
        </TextControl>
    {/if}

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

    {#if isExpanded}
        <TextControl>
            <TextControlTooltip slot="tooltip">
                Underline <Kbd key="⌘" /> + <Kbd key="U" />
            </TextControlTooltip>
            <div class="px-2 h-full">
                <BiTypeUnderline />
            </div>
        </TextControl>
    {/if}

    {#if isExpanded}
        <TextControl>
            <TextControlTooltip slot="tooltip">Strikethrough</TextControlTooltip
            >
            <div class="px-2 h-full">
                <BiTypeStrikethrough />
            </div>
        </TextControl>
    {/if}

    <TextControl>
        <TextControlTooltip slot="tooltip">Align Text</TextControlTooltip>
        <div class="px-2 h-full">
            <BiTextLeft />
        </div>
    </TextControl>

    <TextControl>
        <TextControlTooltip slot="tooltip">Add List</TextControlTooltip>
        <div class="px-2 h-full">
            <BiListOl />
        </div>
    </TextControl>

    <TextControl>
        <TextControlTooltip slot="tooltip">Insert Link</TextControlTooltip>
        <div class="px-2 h-full">
            <BiLink45deg />
        </div>
    </TextControl>

    <TextControl>
        <TextControlTooltip slot="tooltip">Pick a Color</TextControlTooltip>
        <div class="px-2 h-full">
            <div class="w-4 h-4 rounded-full bg-purple-400 border-[1px]" />
        </div>
    </TextControl>
</div>
