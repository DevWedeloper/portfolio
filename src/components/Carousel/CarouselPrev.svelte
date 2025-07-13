<script lang="ts">
  type Props = {
    disabled: boolean;
    onClick: () => void;
  };

  const { disabled, onClick }: Props = $props();
</script>

<button
  onclick={onClick}
  aria-label="Previous slide"
  {disabled}
  class="disabled:pointer-events-none disabled:opacity-50 absolute top-1/2 -translate-y-1/2 left-[-2.5rem] bg-background border cursor-default focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-medium gap-2 h-8 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center outline-none rounded-full shadow-xs shrink-0 size-9 text-sm transition-all w-8"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="w-4 h-4"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
</button>
