<script lang="ts">
    import type { GridElementType } from "@wordlike/schema";
    import { ELEMENT_TYPES } from "@wordlike/nebula";

    import { refAction } from "$lib/actions/ref";
    import {
        resizeDirection,
        isDragging,
        mouseMoveEvent,
    } from "$lib/stores/drag";

    // props:
    export let elementData: GridElementType;
    export let isHovered = false;

    // state:
    let guidesRef: HTMLElement | undefined;

    $: overShoot = (() => {
        if (!$isDragging) return;
        if (elementData.type !== ELEMENT_TYPES.GRID) return;
        if (!$resizeDirection) return;

        const { x, width } = guidesRef?.getBoundingClientRect() ?? {};
        const { clientX } = $mouseMoveEvent;
        if (!x || !width) return;

        if ($resizeDirection.includes("W") && clientX - x < 0) return "LEFT";
        if ($resizeDirection.includes("E") && clientX - x > width)
            return "RIGHT";
        return;
    })();

    $: growLeft = (() => {
        if (!isHovered && overShoot !== "LEFT") return 0;

        const { clientX } = $mouseMoveEvent ?? {};
        const { x } = guidesRef?.getBoundingClientRect() ?? {};
        if (!x) return 8;
        return 8 + (x - clientX) / 16;
    })();

    $: growRight = (() => {
        if (!isHovered && overShoot !== "RIGHT") return 0;

        const { clientX } = $mouseMoveEvent ?? {};
        const { x, width } = guidesRef?.getBoundingClientRect() ?? {};
        if (!x || !width) return 8;
        return 8 + (clientX - x - width) / 16;
    })();
</script>

{#if $resizeDirection}
    <div
        class="opacity-0 pointer-events-none grid [grid-area:2/2/-2/-2]"
        bind:this={guidesRef}
    />
    <div
        class="absolute left-0 bg-black inset-y-0 hover:opacity-30 opacity-0 w-[var(--grow-left)] transition-opacity"
        class:opacity-10={isHovered && overShoot === "LEFT"}
        style:--grow-left={`${growLeft}px`}
        use:refAction={`${elementData.id}::OVERSHOOT::LEFT`}
    />
    <div
        class="absolute right-0 bg-black inset-y-0 hover:opacity-30 opacity-0 w-[var(--grow-right)] transition-opacity"
        class:opacity-10={isHovered && overShoot === "RIGHT"}
        style:--grow-right={`${growRight}px`}
        use:refAction={`${elementData.id}::OVERSHOOT::RIGHT`}
    />
{/if}
