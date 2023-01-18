<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { supabaseClient } from "$lib/supabase";

  import type { PageData } from "./$types";
  import initialDoc from "$lib/mock/doc.json";

  export let data: PageData;

  let { session, sites } = data;

  const handleCreateSubmit: SubmitFunction = async ({ cancel }) => {
    const { data, error } = await supabaseClient
      .from("sites")
      .insert({
        doc: initialDoc,
        user_id: session?.user.id,
      })
      .select();

    if (error) {
      cancel();
    }
    console.log(sites);

    if (data) {
      sites = [data[0], ...sites];
    }
  };

  const handleDeleteSubmit = async ({ cancel }, siteId) => {
    console.log("handleDeleteSubmit", { siteId });
    try {
      const { error } = await supabaseClient
        .from("sites")
        .delete()
        .eq("id", siteId);

      if (error) {
        console.log(error);
        cancel();
      }
      sites = sites.filter((site) => site.id !== siteId);
    } catch (error) {
      cancel();
      console.log(error);
    }
  };
</script>

<a href="/">Home</a>

{#each sites as site}
  <a href="/site/{site.id}">Edit</a>
  <form
    action="?/delete&siteId={site.id}"
    method="POST"
    use:enhance={(e) => handleDeleteSubmit(e, site.id)}
  >
    <button type="submit">delete</button>
  </form>
{/each}

{#if data.session}
  <p>Welcome, {data.session.user.email}</p>
{:else}
  <a href="/login">Log in</a>
  <a href="/register">Register</a>
{/if}

<main>
  <h1>Register</h1>
  <form action="?/create" method="POST" use:enhance={handleCreateSubmit}>
    <button type="submit">kreate</button>
  </form>
</main>
