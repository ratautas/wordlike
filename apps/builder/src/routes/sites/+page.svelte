<script lang="ts">
  import { browser, building, dev } from "$app/environment";

  import type { PageData } from "../$types";
  import initialDoc from "$lib/mock/doc.json";

  export let data: PageData;
</script>

<a href="/">Home</a>

{#if data.session}
  <p>Welcome, {data.session.user.email}</p>
{:else}
  <a href="/login">Log in</a>
  <a href="/register">Register</a>
{/if}

<main>
  <h1>Register</h1>
  <form action="?/create" method="POST">
    <button type="submit">kreate</button>
  </form>
</main>
