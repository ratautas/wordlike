<script lang="ts">
  export let element;
  $: ({ desktop, html } = element ?? {});
</script>

<div class="text" contenteditable="true">
  {#if html}
    {@html html}
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
