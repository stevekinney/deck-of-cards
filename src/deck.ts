import Card from './card';
import { filterByType } from './utilities/filter-by-type';
import { pluck, push, shuffle } from './utilities/collections';
import suits from './suits';
import { aceHigh, pinocle as pinocleValues } from './values';
import {
  traditional as tradionalRanks,
  pinocle as pinocleRanks,
} from './ranks';

export default class Deck {
  public static values: CardValues = aceHigh;

  public static resetValues(): void {
    Deck.values = aceHigh;
  }

  public cards: Card[];
  public values: CardValues = Deck.values;
  public drawnCards: Card[] = [];

  constructor(
    generate: (deck: Deck) => Card[] = generateDeck,
    values: CardValues = Deck.values,
  ) {
    this.cards = generate(this);
    this.values = values;
  }

  shuffle(): void {
    this.cards = shuffle(this.cards);
  }

  sort(): void {
    this.cards.sort((a, b) => {
      if (a.suit === b.suit) {
        const first = this.values[a.rank];
        const second = this.values[b.rank];
        return Number(first) - Number(second);
      }

      return suits.indexOf(a.suit) - suits.indexOf(b.suit);
    });
  }

  add(cards: Card | Card[]): void {
    if (Array.isArray(cards)) {
      cards.forEach((card) => this.add(card));
    } else {
      push(this.cards, cards);
    }
  }

  draw(): Card;
  draw(n: number): Card[];
  draw(n: number = 1): Card[] | Card {
    const cards = this.peek(n);
    return this.pick(cards);
  }

  peek(): Card;
  peek(n: number): Card[];
  peek(n: number = 1): Card[] | Card {
    if (n === 1) return this.cards[0];
    return this.cards.slice(0, n);
  }

  pick(card: Card): Card | undefined;
  pick(cards: Card[]): Card[];
  pick(card: Card | Card[]): Card | Card[] | undefined {
    if (Array.isArray(card)) {
      return filterByType(
        Card,
        card.map((c) => this.pick(c)),
      );
    }

    const picked = pluck(this.cards, card);
    if (picked) push(this.drawnCards, picked);

    return picked;
  }

  reset(prepare: 'shuffle' | 'sort' | null = 'shuffle'): void {
    push(this.cards, this.drawnCards);
    this.drawnCards = [];
    if (prepare === 'shuffle') this.shuffle();
    if (prepare === 'sort') this.sort();
  }

  get size(): number {
    return this.cards.length + this.drawnCards.length;
  }

  get remaining(): number {
    return this.cards.length;
  }

  get isEmpty(): boolean {
    return this.cards.length === 0;
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }

  *[Symbol.iterator](): IterableIterator<Card> {
    return this.cards.values();
  }
}

export class PinocleDeck extends Deck {
  constructor() {
    super(generatePinocleDeck, pinocleValues);
  }
}

export const generateDeck = (deck: Deck | null): Card[] => {
  const cards: Card[] = [];

  for (const suit of suits) {
    for (const rank of tradionalRanks) {
      cards.push(new Card(suit, rank, deck));
    }
  }

  return cards;
};

export const generatePinocleDeck = (deck: Deck | null): Card[] => {
  const cards: Card[] = [];

  for (const suit of suits) {
    for (const rank of pinocleRanks) {
      cards.push(new Card(suit, rank, deck));
      cards.push(new Card(suit, rank, deck));
    }
  }

  return cards;
};
