<script lang="ts">
  export let elementData;
</script>

<div class="text" contenteditable="true">
  {#if elementData?.html}
    {@html elementData?.html}
  {/if}
  {#if false}
    <details open>
      <pre style="font-size: xx-small;">
         {JSON.stringify(elementData?.desktop, null, 2)}
        </pre>
    </details>
  {/if}
</div>
