<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { supabaseClient } from "$lib/supabase";
  import type { PageData } from "./$types";

  export let data: PageData;

  const submitLogout: SubmitFunction = async ({ cancel }) => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    cancel();
  };
</script>

<main class="min-h-screen">
  <header>
    {#if data.session}
      <a href="/manage/sites"><b>Sites</b></a>
      <p>user: {data.session.user.email}</p>
      <form action="/logout" method="POST" use:enhance={submitLogout}>
        <button type="submit">Logout</button>
      </form>
    {:else}
      <div>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    {/if}
  </header>
  <h1 class="text-5xl font-extrabold text-center p-16">Home</h1>
</main>
