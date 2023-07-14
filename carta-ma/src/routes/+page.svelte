<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import cardsStore from "$lib/database/cardStore";

  function randomizeOrder() {
    $cardsStore.notUsed = $cardsStore.notUsed.sort(() => Math.random() - 0.5);
  }

  function getFirstCard(playerNumber: number) {
    const removedCard = $cardsStore.notUsed.shift();
    $cardsStore.used[playerNumber].push(removedCard);
    $cardsStore = $cardsStore;

    console.log($cardsStore);
    return removedCard;
  }
</script>

<!-- <div class="grid grid-cols-10 gap-2 p-4 place-items-center">
  {#each $cardsStore.notUsed as thisImg (thisImg)}
    <Card src={thisImg.src} />
  {/each}
</div> -->

<div
  class="flex flex-col p-4 gap-4 fixed top-0 left-0 w-screen h-screen justify-between"
>
  {#each Object.entries($cardsStore.used).filter(([key, value]) => !isNaN(key)) as thisPlayer (thisPlayer)}
    <div
      class="flex max-h-[20vh] h-min gap-2 p-8 pb-4 pr-4 place-items-center border-4 border-blue-400 relative leading-none bg-white/20 rounded-xl overflow-auto group"
    >
      <h2
        class="font-bold text-2xl absolute top-0 left-0 px-2 pb-1 z-10 bg-blue-400 rounded-br-2xl"
      >
        {thisPlayer[0]}
      </h2>
      {#each thisPlayer[1] as thisImg (thisImg)}
        <Card src={thisImg.src} />
      {/each}
    </div>
  {/each}
</div>

<div class="fixed z-20">
  <button
    on:click={randomizeOrder}
    class="bg-black text-white p-4 rounded-2xl active:bg-slate-800 active:scale-95"
    >click me!</button
  >

  <div class="flex">
    <button
      on:click={() => getFirstCard(1)}
      class="bg-black text-white p-4 rounded-2xl active:bg-slate-800 active:scale-95"
      >player 1</button
    >
    <button
      on:click={() => getFirstCard(2)}
      class="bg-black text-white p-4 rounded-2xl active:bg-slate-800 active:scale-95"
      >player 2</button
    >
  </div>
</div>

<div />
