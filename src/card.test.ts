import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Card from './card';
import { aceHigh, pinocle } from './values';
import Deck from './deck';

describe('Card', () => {
  beforeEach(Card.resetValues);
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should have a default set of values', () => {
    expect(Card.values).toEqual(aceHigh);
  });

  it('should allow you to replace the default set of values', () => {
    const values = pinocle;
    Card.values = values;
    expect(Card.values).toEqual(values);
  });

  it('should have a name', () => {
    const card = new Card('Spades', 'Ace');
    expect(card.name).toBe('Ace of Spades');
  });

  it('should have a value', () => {
    const card = new Card('Spades', 'Ace');
    expect(card.value).toBe(14);
  });

  it('should have a value from the deck', () => {
    const deck = {
      values: {
        Ace: 1,
        King: 2,
        Queen: 3,
        Jack: 4,
      },
    };
    const card = new Card('Spades', 'Ace', deck as any);
    expect(card.value).toBe(1);
  });

  it('should throw an error if there is no value', () => {
    const card = new Card('Spades', 'Ace');
    Card.values = {
      King: 2,
      Queen: 3,
    };
    expect(() => card.value).toThrowError(
      `No value found for Ace of Spades. Valid ranks: King, Queen.`,
    );
  });

  describe('returnToDeck', () => {
    it('should add the card back to the deck', () => {
      const deck = new Deck();
      const card = deck.draw();

      vi.spyOn(deck, 'add');

      card.returnToDeck();

      expect(deck.add).toHaveBeenCalledWith(card);
      expect(deck.cards).toContain(card);
    });

    it('should not add the card back to the deck if there is no deck', () => {
      const deck = new Deck();
      const card = new Card('Spades', 'Ace');

      vi.spyOn(deck, 'add');

      card.returnToDeck();

      expect(deck.add).not.toHaveBeenCalled();
    });
  });
});
