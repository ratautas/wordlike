<script lang="ts">
    import type { TextElementType } from "@wordlike/nebula/package/schema";
    import { Text } from "@wordlike/nebula";

    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import BubbleMenu from "@tiptap/extension-bubble-menu";
    import BiChevronLeft from "~icons/bi/chevron-left";
    import BiTypeBold from "~icons/bi/type-bold";
    import BiTypeItalic from "~icons/bi/type-italic";
    import BiTextLeft from "~icons/bi/text-left";
    import BiTypeUnderline from "~icons/bi/type-underline";
    import BiTypeStrikethrough from "~icons/bi/type-strikethrough";
    import BiListOl from "~icons/bi/list-ol";
    import BiLink45deg from "~icons/bi/link-45deg";
    import TextControl from "./TextControl.svelte";
    import TextControlTooltip from "./TextControlTooltip.svelte";
    import Kbd from "./Kbd.svelte";

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
                    tippyOptions: {
                        maxWidth: "none",
                    },
                }),
            ],
            content: elementData.html,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor;
            },
            onBeforeCreate({ editor }) {
                // Before the view is created.
            },
            onCreate({ editor }) {
                // The editor is ready.
            },
            onUpdate({ editor }) {
                // The content has changed.
            },
            onSelectionUpdate({ editor }) {
                console.log(
                    "selection",
                    editor.state.selection.$anchor,
                    editor.state.selection.anchor
                );
                // The selection has changed.
            },
            onFocus({ editor, event }) {
                console.log("focus", editor, event);
                // The editor is focused.
            },
            onBlur({ editor, event }) {
                // The editor isn’t focused anymore.
            },
            onDestroy() {
                // The editor is being destroyed.
            },
        });

        editor.on("transaction", ({ editor, transaction }) => {
            console.log("transaction", editor, transaction);
        });

        console.log(editor);
    }

    function handleElementDestroy(el) {
        editor?.destroy();
    }

    function handleMoreClick() {
        isExpanded = !isExpanded;
    }
</script>

<Text
    on:destroy={handleElementDestroy}
    on:mount={handleElementMount}
    {elementData}
/>

<div
    class="controls whitespace-nowrap bg-white text-sm text-left flex items-center rounded-full"
    bind:this={controlsRef}
>
    {#if editor}
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
                <TextControlTooltip slot="tooltip"
                    >Strikethrough</TextControlTooltip
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
    {/if}
</div>
