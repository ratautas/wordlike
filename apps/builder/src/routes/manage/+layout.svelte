<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { supabaseClient } from "$lib/supabase";

  const submitLogout: SubmitFunction = async ({ cancel }) => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    cancel();
  };
</script>

<header class="flex border-b-gray-200 border-[1px]">
  <ul>
    <li class="flex">
      <a href="/" class="p-2">home</a>
      <a href="" class="p-2">sites</a>
      <a href="" class="p-2">teams</a>
      <a href="" class="p-2">domains</a>
      <a href="" class="p-2">billing</a>
      <a href="" class="p-2">account</a>
    </li>
  </ul>
  <form action="/logout" method="POST" use:enhance={submitLogout}>
    <button class="p-2" type="submit">logout</button>
  </form>
</header>

<main>
  <slot />
</main>
