import { writable } from "svelte/store";

export type TypeCard = {
  src: string;
  number: string;
  type: string;
  alt: string;
};

type TypeCardsStore = {
  notUsed: TypeCard[];
  used: {
    [player: number]: TypeCard[];
    inTable: TypeCard[];
  };
};

const cardsStore = writable<TypeCardsStore>();

resetStore();

export default cardsStore;

export function resetStore() {
  cardsStore.set({
    notUsed: generateDefaultSortedCardsObjects(),
    used: {
      "1": [],
      "2": [],
      inTable: [],
    },
  });
}

function fetchAllCardImageLinks() {
  const importMetaGlobSvgsObj = import.meta.glob("/**/*.svg", { eager: true });
  return Object.values(importMetaGlobSvgsObj).map((obj) => obj?.default);
}

function generateDefaultSortedCardsObjects() {
  return fetchAllCardImageLinks().map((link) => {
    return {
      src: link,
      number: link.match(/\d+/g)[0],
      type: link.match(/[^\/]*(\/)\d+/g)[0].split("/")[0],
      get alt() {
        return `carta maroc n.${this.number} of type ${this.type}`;
      },
    };
  });
}