<script lang="ts">
  import BlockBackground from "$lib/components/BlockBackground.svelte";
  import BlockElement from "$lib/components/BlockElement.svelte";
  import { DEFAULT_GRID_WIDTH } from "$lib/constants";
  import { dragDiffX, dragDiffY, resizeDirection } from "$lib/stores/drag";
  import { getPosition } from "$lib/utils/position";
  import { selectedElementIds } from "$lib/stores/element";
  import { calculateGrid } from "$lib/utils/position";

  $: width = `${block?.width ?? DEFAULT_GRID_WIDTH}px`;

  $: ({ gridAreas, gridTemplateRows, gridTemplateColumns } = calculateGrid(
    block,
    $dragDiffX,
    $dragDiffY,
    $resizeDirection,
    $selectedElementIds
  ));

  export let block;
</script>

<div
  class="block relative mx-auto"
  style:--max-width={width}
  style:--grid-template-rows={gridTemplateRows.join("px ") + "px"}
  style:--grid-template-columns={gridTemplateColumns.join("px ") + "px"}
>
  <BlockBackground {block} />
  {#each block.children as element, i}
    <BlockElement {element} gridArea={gridAreas[i]} />
  {/each}
</div>

<style lang="scss">
  .block {
    border-left: solid 1px indianred;
    border-right: solid 1px indianred;
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);
    width: var(--max-width);
  }
</style>
