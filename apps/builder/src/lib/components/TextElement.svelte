<script lang="ts">
  export let element;
</script>

<div class="text" contenteditable="true">
  {#if element.html}
    {@html element.html}
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
