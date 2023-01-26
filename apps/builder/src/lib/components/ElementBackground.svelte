<script lang="ts">
  export let elementData;
  $: ({
    backgroundColor,
    backgroundOverlayColor,
    backgroundOverlayOpacity,
    backgroundImageProvider,
    backgroundImagePath,
    backgroundVideoProvider,
    backgroundVideoPath,
    backgroundEffect,
  } = elementData);
</script>

<div class="background">
  <img src="" alt="" class="background__image" />
  <div class="background__overlay" />
</div>
