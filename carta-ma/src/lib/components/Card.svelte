<script lang="ts">
  export let src: string;

  // @ts-ignore
  const alt = src
    .match(/[^\/]*(\/)\d+/g)[0]
    .split("/")
    .reverse()
    .join(" ");
</script>

<img
  class="h-full hover:scale-110 transition bg-white shadow-md rounded-md {$$props.class}"
  style="view-transition-name: {alt};"
  {src}
  {alt}
/>
