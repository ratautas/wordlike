<script lang="ts">
  import { browser, building, dev } from "$app/environment";

  import type { PageData } from "../$types";
  import initialDoc from "$lib/mock/doc.json";

  export let data: PageData;
  console.log(data.hi);
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
  <form action="?/register" method="POST" class="auth-form">
    <label for=""> Email </label>
    <input type="text" name="email" />
    <label for=""> Password </label>
    <input type="password" name="password" />
    <button class="btn btn-primary">Register</button>
  </form>
</main>
