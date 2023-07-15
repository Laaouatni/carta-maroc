<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import cardsStore from "$lib/database/cardStore";
  import type { TypeCard } from "$lib/database/cardStore";
  import { resetStore } from "$lib/database/cardStore";

  let isPlaying = false;
  let isTurnPlayerNumber = 1;

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

  function handleCardClicked(
    playerNumber: number,
    cardClickedIndex: number,
    thisImgInfo: TypeCard,
  ) {
    if (playerNumber !== isTurnPlayerNumber) return;
    if (
      thisImgInfo.type !== $cardsStore.used.inTable.at(-1)?.type &&
      thisImgInfo.number !== $cardsStore.used.inTable.at(-1)?.number
    )
      return;

    const removedCard = $cardsStore.used[playerNumber].splice(
      cardClickedIndex,
      1,
    )[0];

    console.log({ removedCard });
    $cardsStore.used.inTable.push(removedCard);
    $cardsStore = $cardsStore;

    if (Number(removedCard.number) !== 4)
      isTurnPlayerNumber = isTurnPlayerNumber === 1 ? 2 : 1;
    if (Number(removedCard.number) === 2) {
      getFirstCard(isTurnPlayerNumber);
      getFirstCard(isTurnPlayerNumber);
    }

    return removedCard;
  }

  function handleStartClicked() {
    randomizeOrder();

    for (let i = 4; i > 0; i--) {
      getFirstCard(1);
      getFirstCard(2);
    }
    isPlaying = true;

    const removedCard = $cardsStore.notUsed.shift();
    $cardsStore.used.inTable.push(removedCard!);
    $cardsStore = $cardsStore;
  }

  function handleGetAnotherCard(playerNumber: number) {
    console.log({ notUsed: $cardsStore.notUsed, used: $cardsStore.used });
    if (
      $cardsStore.notUsed.length === 1 &&
      $cardsStore.used.inTable.length <= 1
    )
      return;
    if ($cardsStore.notUsed.length === 1) {
      $cardsStore.notUsed = $cardsStore.used.inTable;
      $cardsStore.notUsed.pop();
      $cardsStore = $cardsStore;
      $cardsStore.used.inTable = [$cardsStore.used.inTable.at(-1)!];
    }
    const removedCard = $cardsStore.notUsed.shift();
    $cardsStore.used[playerNumber].push(removedCard!);
    $cardsStore = $cardsStore;

    isTurnPlayerNumber = isTurnPlayerNumber === 1 ? 2 : 1;

    return removedCard;
  }

  $: if (
    isPlaying &&
    ($cardsStore.used[1].length === 0 || $cardsStore.used[2].length === 0)
  ) {
    console.log(`win ${$cardsStore.used[1].length === 0 ? 1 : 2}`);
    isPlaying = false;
  }

  $: if (!isPlaying) {
    resetStore();
  }
</script>

<div class="grid place-items-center w-screen h-screen">
  <!-- <div class="grid grid-cols-10 gap-2 p-4 place-items-center">
  {#each $cardsStore.notUsed as thisImg (thisImg)}
    <Card src={thisImg.src} />
  {/each}
</div> -->

  {#if isPlaying}
    <div class="flex flex-col p-4 gap-4 w-screen h-screen justify-between">
      {#each Object.entries($cardsStore.used).filter(([key, value]) => !isNaN(key)) as thisPlayer (thisPlayer)}
        <div
          class="flex max-h-[25vh] h-min gap-2 pl-8 p-3 pb-4 pr-4 place-items-center border-4 border-blue-400 relative leading-none bg-white/20 rounded-xl overflow-auto group {isTurnPlayerNumber ===
          Number(thisPlayer[0])
            ? 'border-8 border-blue-800'
            : ''}"
        >
          <h2
            class="font-bold text-2xl absolute top-0 left-0 px-2 pb-1 z-10 bg-blue-400 rounded-br-2xl"
          >
            {thisPlayer[0]}
          </h2>
          {#each thisPlayer[1] as thisImg, thisIndex (thisImg)}
            <Card
              src={thisImg.src}
              on:click={() =>
                handleCardClicked(Number(thisPlayer[0]), thisIndex, thisImg)}
            />
          {/each}
        </div>
      {/each}
    </div>

    <div class="absolute z-20 h-[30vh]">
      <!-- {#each $cardsStore.used.inTable as thisImg (`inTable-${thisImg.alt}`)}
        <Card src={thisImg.src} />
      {/each} -->
      {#if $cardsStore.used.inTable && $cardsStore.used.inTable.length > 0}
        <Card src={$cardsStore?.used?.inTable?.at(-1)?.src || ""} />
      {/if}
    </div>

    <div class="absolute w-screen flex justify-end px-4">
      <button
        on:click={() => handleGetAnotherCard(isTurnPlayerNumber)}
        class="font-extrabold text-2xl p-4 rounded-2xl bg-blue-400 shadow-xl active:bg-blue-400/70"
        >{$cardsStore.notUsed.length}</button
      >
    </div>
  {:else}
    <div class="absolute grid place-items-center z-0">
      <button on:click={handleStartClicked} class="p-4 ring">play</button>
    </div>
  {/if}

  <!-- <div class="fixed z-20">
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
</div> -->
</div>
