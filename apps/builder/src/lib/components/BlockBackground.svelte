<script lang="ts">
  export let blockData;
  $: ({
    backgroundColor,
    backgroundOverlayColor,
    backgroundOverlayOpacity,
    backgroundImageProvider,
    backgroundImagePath,
    backgroundVideoProvider,
    backgroundVideoPath,
    backgroundEffect,
  } = blockData);
</script>

<div class="background">
  <img src="" alt="" class="background__image" />
  <div class="background__overlay" />
</div>
