<script lang="ts">
  export let block;
  $: ({
    backgroundColor,
    backgroundOverlayColor,
    backgroundOverlayOpacity,
    backgroundImageProvider,
    backgroundImagePath,
    backgroundVideoProvider,
    backgroundVideoPath,
    backgroundEffect,
  } = block);
</script>

<div class="background">
  <img src="" alt="" class="background__image" />
  <div class="background__overlay" />
</div>
