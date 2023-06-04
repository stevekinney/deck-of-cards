import { aceHigh } from './values';
import type Deck from './deck';

export default class Card {
  public static values: CardValues = aceHigh;

  public static resetValues(): void {
    Card.values = aceHigh;
  }

  constructor(
    public suit: Suit,
    public rank: Rank,
    public deck: Deck | null = null,
  ) {
    this.suit = suit;
    this.rank = rank;
    this.deck = deck;
  }

  returnToDeck(): void {
    if (this.deck) this.deck.add(this);
  }

  get name(): CardName {
    return `${this.rank} of ${this.suit}`;
  }

  get value(): number {
    const validRanks = this.validRanks().join(', ');
    const value = this.deck?.values[this.rank] ?? Card.values[this.rank];

    if (value) return value;

    throw new Error(
      `No value found for ${this.name}. Valid ranks: ${validRanks}.`,
    );
  }

  private validRanks(): Rank[] {
    if (this.deck) return Object.keys(this.deck.values) as Rank[];
    return Object.keys(Card.values) as Rank[];
  }
}
