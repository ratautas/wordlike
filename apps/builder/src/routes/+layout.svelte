<script type="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase";
  import { invalidateAll } from "$app/navigation";

  onMount(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("auth state changed", event, session);
      invalidateAll();
    });
    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<slot />
