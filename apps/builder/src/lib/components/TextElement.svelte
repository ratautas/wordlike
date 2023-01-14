<script lang="ts">
  export let element;
  $: ({ desktop } = element ?? {});
</script>

<div class="text" contenteditable="true">
  the text
  <!-- <details> -->
  <pre style="font-size: xx-small;">{JSON.stringify(desktop, null, 2)}</pre>
  <!-- </details> -->
</div>

<style lang="scss">
  .text[contenteditable="true"] {
    outline: none;
    &:focus {
      outline: none;
    }
  }
</style>
