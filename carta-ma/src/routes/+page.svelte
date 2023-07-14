<!-- <script lang="ts">
  import Card from "$lib/components/Card.svelte";



  function randomTheCardOrder() {
    imgsLinks = imgsLinks.sort(() => Math.random() - 0.5);
  }
</script>

<div class="grid grid-cols-10 gap-2 p-4 place-items-center">
  {#each imgsLinks as thisImg (thisImg)}
    <Card src={thisImg} />
  {/each}
</div>

<button class="p-4 ring-2 active:bg-gray-100" on:click={randomTheCardOrder}
  >Click Me</button
> -->

<script>
  import cardsStore from "$lib/database/cardStore";

  console.log($cardsStore)
</script>
