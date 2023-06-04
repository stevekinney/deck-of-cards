import type Card from './card';

export default class Hand {
  public cards: Set<Card>;

  constructor(cards: Card[] = []) {
    this.cards = new Set(cards);
  }

  get size(): number {
    return this.cards.size;
  }

  get isEmpty(): boolean {
    return this.size === 0;
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty;
  }

  add(cards: Card | Card[]): void {
    if (Array.isArray(cards)) {
      cards.forEach((card) => this.add(card));
    } else {
      this.cards.add(cards);
    }
  }

  remove(cards: Card | Card[]): void {
    if (Array.isArray(cards)) {
      cards.forEach((card) => this.remove(card));
    } else {
      this.cards.delete(cards);
    }
  }

  returnToDeck(card: Card | Card[]): void {
    if (Array.isArray(card)) return this.returnAllToDeck(card);

    this.remove(card);
    card.returnToDeck();
  }

  returnAllToDeck(cards: Card[] = [...this.cards]): void {
    cards.forEach((card) => this.returnToDeck(card));
  }

  moveTo(hand: Hand, card: Card): void {
    this.remove(card);
    hand.add(card);
  }

  *[Symbol.iterator](): IterableIterator<Card> {
    return this.cards.values();
  }
}
