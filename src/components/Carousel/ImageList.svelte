<script lang="ts">
  import { CldImage } from 'svelte-cloudinary';

  type Prop = {
    images: string[];
  };

  const { images }: Prop = $props();

  const cloudName = import.meta.env['PUBLIC_CLOUDINARY_CLOUD_NAME'];
</script>

{#each images as image, i}
  <CldImage
    src={image}
    alt={`Slide ${i + 1}`}
    class="border-2 rounded-xl"
    width={640}
    height={360}
    sizes="(max-width: 768px) 75vw, (max-width: 1200px) 600px, 600px"
    config={{
      cloud: {
        cloudName,
      },
    }}
  />
{/each}
