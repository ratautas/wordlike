<script lang="ts">
    import type { GridElementType } from "@wordlike/nebula";
    import { Grid } from "@wordlike/nebula";

    import BuilderElement from "$lib/components/BuilderElement.svelte";

    export let elementData: GridElementType;

    $: ({ children } = elementData);
</script>

<Grid {elementData} class="helo">
    <BuilderElement slot="el00" elementData={children[0]} />
    <BuilderElement slot="el01" elementData={children[1]} />
    <BuilderElement slot="el02" elementData={children[2]} />
    <BuilderElement slot="el03" elementData={children[3]} />
    <BuilderElement slot="el04" elementData={children[4]} />
    <BuilderElement slot="el05" elementData={children[5]} />
    <BuilderElement slot="el06" elementData={children[6]} />
    <BuilderElement slot="el07" elementData={children[7]} />
    <BuilderElement slot="el08" elementData={children[8]} />
    <BuilderElement slot="el09" elementData={children[9]} />
    <BuilderElement slot="el10" elementData={children[10]} />
    <BuilderElement slot="el11" elementData={children[11]} />
    <BuilderElement slot="el12" elementData={children[12]} />
    <BuilderElement slot="el13" elementData={children[13]} />
    <BuilderElement slot="el14" elementData={children[14]} />
    <BuilderElement slot="el15" elementData={children[15]} />
    <BuilderElement slot="el16" elementData={children[16]} />
    <BuilderElement slot="el17" elementData={children[17]} />
    <BuilderElement slot="el18" elementData={children[18]} />
    <BuilderElement slot="el19" elementData={children[19]} />
    <div slot="plane" class="relative z-[1] [grid-area:1/1/-1/-1]">
        controls + guides
    </div>
    <div slot="controls" class="relative z-[2] [grid-area:2/2/-2/-2]">
        controls
    </div>
</Grid>
