<script lang="ts">
    import type { Editor as EditorType } from "@tiptap/core";
    import type { ReferenceElement } from "@floating-ui/dom";

    import TextExtension from "@tiptap/extension-text";
    import Bold from "@tiptap/extension-bold";
    import Italic from "@tiptap/extension-italic";
    import Underline from "@tiptap/extension-underline";
    import Document from "@tiptap/extension-document";
    import Paragraph from "@tiptap/extension-paragraph";
    import Link from "@tiptap/extension-link";
    import Heading from "@tiptap/extension-heading";
    import Strike from "@tiptap/extension-strike";
    import TextAlign from "@tiptap/extension-text-align";
    import ListItem from "@tiptap/extension-list-item";
    import BulletList from "@tiptap/extension-bullet-list";
    import OrderedList from "@tiptap/extension-ordered-list";

    import { Editor } from "@tiptap/core";
    import { computePosition, offset, shift, flip } from "@floating-ui/dom";

    import BiChevronLeft from "~icons/bi/chevron-left";
    import BiTypeBold from "~icons/bi/type-bold";
    import BiTypeItalic from "~icons/bi/type-italic";
    import BiTextLeft from "~icons/bi/text-left";
    import BiTypeUnderline from "~icons/bi/type-underline";
    import BiTypeStrikethrough from "~icons/bi/type-strikethrough";
    import BiListOl from "~icons/bi/list-ol";
    import BiLink45deg from "~icons/bi/link-45deg";
    import BiTextCenter from "~icons/bi/text-center";
    import BiTextRight from "~icons/bi/text-right";
    import BiTextJustify from "~icons/bi/justify";
    import BiListUl from "~icons/bi/list-ul";

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

    $: showControls = isEditorFocused || isClickedOnControls || true;
    $: isBold = editor?.isActive("bold");
    $: isItalic = editor?.isActive("italic");
    $: isUnderline = editor?.isActive("underline");
    $: isStrikethrough = editor?.isActive("strike");

    // handlers:
    function handleElementMount(event: CustomEvent) {
        editorRef = event.detail;
        event.detail.innerHTML = "";
        editor = new Editor({
            element: event.detail,
            extensions: [
                Bold,
                Italic,
                Underline,
                Document,
                Paragraph,
                TextExtension,
                Link,
                Heading,
                Strike,
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                }),
                ListItem,
                BulletList,
                OrderedList,
            ],
            content: elementData.html,
            onTransaction: handleEditorTransaction,
            onFocus: handleEditorFocus,
            onBlur: handleEditorBlur,
            autofocus: true,
        });
    }

    function handleEditorTransaction(params) {
        // force re-render so `editor.isActive` works as expected
        editor = params.editor;
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

    function handleBoldClick() {
        editor.chain().focus().toggleBold().run();
    }

    function handleItalicClick() {
        editor.chain().focus().toggleItalic().run();
    }

    function handleUnderlineClick() {
        editor.chain().focus().toggleUnderline().run();
    }

    function handleStrikethroughClick() {
        editor.chain().focus().toggleStrike().run();
    }

    function handleAlignLeftClick() {
        editor.chain().focus().setTextAlign("left").run();
    }

    function handleAlignCenterClick() {
        editor.chain().focus().setTextAlign("center").run();
    }

    function handleAlignRightClick() {
        editor.chain().focus().setTextAlign("right").run();
    }

    function handleAlignJustifyClick() {
        editor.chain().focus().setTextAlign("justify").run();
    }

    function handleOrderedListClick() {
        editor.chain().focus().toggleOrderedList().run();
    }

    function handleUnorderedListClick() {
        editor.chain().focus().toggleBulletList().run();
    }

    function handleLinkClick() {
        editor.chain().focus().toggleLink({ href: "https://google.com" }).run();
    }

    function handleHeading1Click() {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
    }

    function handleHeading2Click() {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
    }

    function handleHeading3Click() {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
    }

    function handleParagraphClick() {
        editor.chain().focus().setParagraph().run();
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
            class="px-1 flex items-center h-7 rounded-tl-full rounded-bl-full"
            class:bg-gray-50={isExpanded}
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
            class="absolute left-0 top-full whitespace-normal opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"
        >
            <div class="text-sm bg-white text-left rounded">
                <button
                    on:click={handleHeading1Click}
                    type="button"
                    class="whitespace-nowrap text-left p-1 text-ellipsis overflow-hidden w-full"
                >
                    Title (h1)
                </button>
                <button
                    on:click={handleHeading2Click}
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    Subtitle (h2)
                </button>
                <button
                    on:click={handleHeading3Click}
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    Small Subtitle (h3)
                </button>
                <button
                    on:click={handleParagraphClick}
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
                    >
                        Helvetica
                    </button>
                    <button
                        type="button"
                        class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                    >
                        Open Sans
                    </button>
                </div>
            </div>
        </TextControl>
    {/if}

    <TextControl>
        <TextControlTooltip slot="tooltip">
            Bold <Kbd key="⌘" /> + <Kbd key="B" />
        </TextControlTooltip>
        <button
            class="px-2 h-7 flex items-center cursor-pointer"
            class:text-green-700={isBold}
            class:bg-green-50={isBold}
            type="button"
            on:click={handleBoldClick}
        >
            <BiTypeBold />
        </button>
    </TextControl>

    <TextControl>
        <TextControlTooltip slot="tooltip">
            Italic <Kbd key="⌘" /> + <Kbd key="I" />
        </TextControlTooltip>
        <button
            class="px-2 h-7 flex items-center cursor-pointer"
            type="button"
            class:text-green-700={isItalic}
            class:bg-green-50={isItalic}
            on:click={handleItalicClick}
        >
            <BiTypeItalic />
        </button>
    </TextControl>

    {#if isExpanded}
        <TextControl>
            <TextControlTooltip slot="tooltip">
                Underline <Kbd key="⌘" /> + <Kbd key="U" />
            </TextControlTooltip>
            <button
                class="px-2 h-7 flex items-center cursor-pointer"
                type="button"
                class:text-green-700={isUnderline}
                class:bg-green-50={isUnderline}
                on:click={handleUnderlineClick}
            >
                <BiTypeUnderline />
            </button>
        </TextControl>
    {/if}

    {#if isExpanded}
        <TextControl>
            <TextControlTooltip slot="tooltip">Strikethrough</TextControlTooltip
            >
            <button
                class="px-2 h-7 flex items-center cursor-pointer"
                type="button"
                class:text-green-700={isStrikethrough}
                class:bg-green-50={isStrikethrough}
                on:click={handleStrikethroughClick}
            >
                <BiTypeStrikethrough />
            </button>
        </TextControl>
    {/if}

    <TextControl>
        <TextControlTooltip slot="tooltip">Align Text</TextControlTooltip>
        <button
            class="px-2 h-7 flex items-center cursor-pointer group-btn"
            type="button"
        >
            <BiTextLeft />
        </button>
        <div
            slot="dropdown"
            class="absolute left-0 right-0 top-full whitespace-normal opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"
        >
            <div class="text-sm bg-white text-left rounded">
                <button
                    on:click={handleAlignLeftClick}
                    type="button"
                    class="whitespace-nowrap text-left p-1 text-ellipsis overflow-hidden w-full"
                >
                    <BiTextLeft />
                </button>
                <button
                    on:click={handleAlignCenterClick}
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    <BiTextCenter />
                </button>
                <button
                    on:click={handleAlignRightClick}
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    <BiTextRight />
                </button>
                <button
                    on:click={handleAlignJustifyClick}
                    type="button"
                    class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                >
                    <BiTextJustify />
                </button>
            </div>
        </div>
    </TextControl>

    {#if isExpanded}
        <TextControl>
            <TextControlTooltip slot="tooltip">Add List</TextControlTooltip>
            <button
                class="px-2 h-7 flex items-center cursor-pointer group-btn"
                type="button"
                on:click={handleUnorderedListClick}
            >
                <BiListUl />
            </button>
            <div
                slot="dropdown"
                class="absolute left-0 right-0 top-full whitespace-normal opacity-0 pointer-events-none pt-2 group-hover/btn:opacity-100 group-hover/btn:pointer-events-auto"
            >
                <div class="text-sm bg-white text-left rounded">
                    <button
                        on:click={handleUnorderedListClick}
                        type="button"
                        class="whitespace-nowrap text-left p-1 text-ellipsis overflow-hidden w-full"
                    >
                        <BiListUl />
                    </button>
                    <button
                        on:click={handleOrderedListClick}
                        type="button"
                        class="whitespace-nowrap p-1 text-left text-ellipsis overflow-hidden w-full"
                    >
                        <BiListOl />
                    </button>
                </div>
            </div>
        </TextControl>
    {/if}

    <TextControl>
        <TextControlTooltip slot="tooltip">Insert Link</TextControlTooltip>
        <button
            class="px-2 h-7 flex items-center cursor-pointer"
            type="button"
            on:click={handleLinkClick}
        >
            <BiLink45deg />
        </button>
    </TextControl>

    <TextControl>
        <TextControlTooltip slot="tooltip">Pick a Color</TextControlTooltip>
        <button class="px-2 h-7 flex items-center cursor-pointer" type="button">
            <div class="w-4 h-4 rounded-full bg-purple-400 border-[1px]" />
        </button>
    </TextControl>
</div>
