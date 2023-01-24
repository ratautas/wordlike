<script lang="ts">
  export let element;
</script>

<div class="text" contenteditable="true">
  {#if element.html}
    {@html element.html}
  {/if}
  {#if false}
    <details open>
      <pre style="font-size: xx-small;">
         {JSON.stringify(element?.desktop, null, 2)}
        </pre>
    </details>
  {/if}
</div>

<style lang="scss">
  .text[contenteditable="true"] {
    outline: none;
    &:focus {
      outline: none;
    }
  }
</style>
