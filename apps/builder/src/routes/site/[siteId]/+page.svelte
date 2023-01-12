<script lang="ts">
    import { browser, building, dev } from "$app/environment";

    import initialDoc from "$lib/mock/doc.json";

    export let data;
</script>

<a href="/">Home</a>
<a href="/sites">Sites</a>

{data.hi}

<pre>
    {JSON.stringify(data, null, 2)}
</pre>

{#if data.session}
    <p>Welcome, {data.session.user.email}</p>
{:else}
    <a href="/login">Log in</a>
    <a href="/register">Register</a>
{/if}
