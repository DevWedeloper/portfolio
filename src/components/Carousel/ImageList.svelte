<script lang="ts">
  type Prop = {
    images: string[];
  };

  const { images }: Prop = $props();
</script>

{#each images as image, i}
  <img
    src={image}
    alt={`Slide ${i + 1}`}
    width="700"
    height="500"
    class="border-2 rounded-xl"
    loading="lazy"
  />
{/each}
