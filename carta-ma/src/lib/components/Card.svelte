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
  class="hover:scale-110 transition bg-white shadow-md rounded-md"
  style="view-transition-name: {alt};"
  {src}
  {alt}
/>
