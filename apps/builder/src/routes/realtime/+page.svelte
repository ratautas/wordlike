<script lang="ts">
  import { browser, building, dev } from "$app/environment";
  import { subscribe, broadcast, listen } from "$lib/realtime";

  import type { PageData } from "../$types";
  export let data: PageData;

  if (browser) {
    subscribe();
    listen("click", (data) => {
      console.log("some", data);
    });
  }

  doc.set(data.doc);
</script>

<a href="/">Home</a>

<div>{JSON.stringify($doc)}</div>

<button on:click={() => broadcast("click", { payload: "payy" })}>
  klik klik
</button>

{#if data.session}
  <p>Welcome, {data.session.user.email}</p>
{:else}
  <a href="/login">Log in</a>
  <a href="/register">Register</a>
{/if}
