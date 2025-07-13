<script lang="ts">
  import {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel';
  import emblaCarousel from 'embla-carousel-svelte';
  import { onMount } from 'svelte';
  import CarouselNext from './CarouselNext.svelte';
  import CarouselPrev from './CarouselPrev.svelte';
  import ImageList from './ImageList.svelte';

  type Props = {
    images: string[];
  };

  const { images }: Props = $props();

  let emblaApi: EmblaCarouselType;
  let options: EmblaOptionsType = { loop: false };
  let plugins: EmblaPluginType[] = [];
  let emblaWrapper: HTMLElement;

  let canScrollPrev = $state(false);
  let canScrollNext = $state(false);

  function onInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
    updateButtonStates();

    emblaApi.on('select', updateButtonStates);
    emblaApi.on('reInit', updateButtonStates);
  }

  function updateButtonStates() {
    canScrollPrev = emblaApi.canScrollPrev();
    canScrollNext = emblaApi.canScrollNext();
  }

  function scrollPrev() {
    emblaApi && emblaApi.scrollPrev();
  }

  function scrollNext() {
    emblaApi && emblaApi.scrollNext();
  }

  onMount(() => {
    emblaWrapper.classList.add('js-enabled');
  });
</script>

<div bind:this={emblaWrapper} class="relative hidden [&.js-enabled]:block">
  <CarouselPrev onClick={scrollPrev} disabled={!canScrollPrev} />

  <div
    class="overflow-hidden w-full"
    use:emblaCarousel={{ options, plugins }}
    onemblaInit={onInit}
  >
    <div class="flex gap-4 justify-center">
      <ImageList {images} />
    </div>
  </div>

  <CarouselNext onClick={scrollNext} disabled={!canScrollNext} />
</div>

<noscript>
  <ImageList {images} />
</noscript>
