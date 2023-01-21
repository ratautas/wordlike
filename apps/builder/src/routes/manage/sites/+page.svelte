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

<main class="max-w-4xl mx-auto p-4">
  <div class="flex gap-4">
    <input type="text" class="w-10/12" placeholder="Search the sites" />
    <form
      action="?/create"
      class="w-2/12"
      method="POST"
      use:enhance={handleCreateSubmit}
    >
      <button
        type="submit"
        class="rounded px-2 py-1 bg-gradient-to-tr from-blue-400 to-blue-600 text-white"
      >
        + New
      </button>
    </form>
  </div>
  {#each sites as site}
    <div class="border-b-[1px] border-gray-200 py-6 flex">
      <img
        class="w-48 h-36"
        src="https://cdn.dribbble.com/userupload/4361632/file/original-61839d1d6a5419cf184e3027f3db55d8.png?compress=1&resize=360x240"
        alt=""
        srcset=""
      />
      <div class="w-full p-4">
        <div class="text-lg font-semibold" contenteditable="true">
          contentenditable title
        </div>
        <div>
          <a
            href="siteid.previewdomain.com"
            target="_blank"
            class="text-gray-500 text-sm"
          >
            siteid.previewdomain.com
          </a>
        </div>
        <div>
          <span class="text-gray-700 text-sm">Last updated</span>
          <span class="text-gray-700 text-sm">2 days ago</span>
        </div>
        <div class="py-2 flex">
          <a
            class="inline-block rounded px-2 py-1 bg-gradient-to-tr from-blue-400 to-blue-600 text-white mr-2"
            href="/site/{site.id}">edit</a
          >
          <form
            action="?/delete&siteId={site.id}"
            method="POST"
            use:enhance={(e) => handleDeleteSubmit(e, site.id)}
          >
            <button
              type="submit"
              class="rounded px-2 py-1 bg-gradient-to-tr from-red-400 to-red-600 text-white"
            >
              delete
            </button>
          </form>
        </div>
      </div>
    </div>
  {/each}
</main>
