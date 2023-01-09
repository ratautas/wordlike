<script>
  export let item;
</script>

<div class="text-component">
  <div class="text-component__html" contenteditable="true">
    {@html item.html}
  </div>
  <div class="text-component__handle">hi</div>
</div>

<style>
  .text-component {
  }
  .text-component:hover {
    outline: solid 1px #000;
  }
</style>
