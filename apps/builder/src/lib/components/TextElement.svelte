<script lang="ts">
  export let element;
  $: ({ layout } = element ?? {});

  function drag(node) {
    console.log(node);
    // the node has been mounted in the DOM

    return {
      update: (parameters: any) => {
        console.log(parameters);
      },
      destroy() {
        console.log("destroy");
        // the node has been removed from the DOM
      },
    };
  }

  function bar(node) {
    console.log(node);
    // the node has been mounted in the DOM
  }
</script>

<div class="text" contenteditable="true">
  the text
  <!-- <details> -->
  <pre style="font-size: xx-small;">{JSON.stringify(layout, null, 2)}</pre>
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
