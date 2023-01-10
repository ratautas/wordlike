<script lang="ts">
    import { browser, building, dev, version } from "$app/environment";
    import { isLoaded, doc } from "$lib/stores/diff";

    import type { PageData } from "../$types";
    export let data: PageData;

    doc.set(data.doc);

    console.log($doc);
    console.log(data.doc);
</script>

<a href="/">Home</a>

<div>{JSON.stringify($doc)}</div>

{#if data.session}
    <p>Welcome, {data.session.user.email}</p>
{:else}
    <a href="/login">Log in</a>
    <a href="/register">Register</a>
{/if}
