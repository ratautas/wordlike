<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let isExpanded = true;

    const dispatch = createEventDispatcher();
</script>

<div class="relative group/btn">
    <slot name="tooltip" />
    <slot />
    <slot name="dropdown" />
</div>
