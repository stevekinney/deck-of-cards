import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Deck, { PinocleDeck, generateDeck } from './deck';
import Card from './card';
import { aceHigh } from './values';

describe('Deck', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  afterEach(Deck.resetValues);

  it('should default to a standard deck', () => {
    const deck = new Deck();
    expect(deck.cards.length).toBe(52);
    expect(deck.size).toBe(52);
  });

  it('should default to a standard deck with aces high', () => {
    expect(Deck.values).toEqual(aceHigh);
  });

  it('should allow you to replace the default set of values', () => {
    const values = { Ace: 1 };
    Deck.values = values;
    expect(Deck.values).toEqual(values);
  });

  it('should allow you to replace the default set of values for a single deck', () => {
    const values = { Ace: 1 };
    const deck = new Deck(() => [], values);
    expect(deck.values).toEqual(values);
  });

  it('should an an array of drawn cards', () => {
    const deck = new Deck();
    expect(deck.drawnCards.length).toBe(0);
  });

  it('should have a default value of ace high', () => {
    const deck = new Deck(() => []);
    expect(deck.values['Ace']).toBe(14);
  });

  it('should allow you to pass in your own card values', () => {
    const deck = new Deck(() => [], { Ace: 1 });
    expect(deck.values['Ace']).toBe(1);
  });

  it('should have a length equal to the total number of cards', () => {
    const deck = new Deck(() => [
      new Card('Spades', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
    ]);

    deck.draw();

    expect(deck.size).toBe(4);
  });

  it('should keep track of the drawn cards', () => {
    const deck = new Deck(() => [
      new Card('Spades', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
    ]);

    const card = deck.draw();

    expect(deck.drawnCards).toEqual([card]);
  });

  describe('shuffle', () => {
    it('should return a new array when shuffling', () => {
      const deck = new Deck();
      const cards = [...deck.cards];

      deck.shuffle();

      expect(deck.cards).not.toEqual(cards);
    });

    it('should return the same cards', () => {
      const deck = new Deck();
      const cards = [...deck.cards];

      deck.shuffle();

      expect(deck.cards.length).toBe(cards.length);
      expect(deck.cards.every((card) => cards.includes(card))).toBe(true);
    });
  });

  describe('sort', () => {
    it('should sort the cards', () => {
      const deck = new Deck();

      deck.shuffle();
      deck.sort();

      expect(deck.cards[0].name).toBe('2 of Clubs');
      expect(deck.cards[deck.cards.length - 1].name).toBe('Ace of Spades');
    });
  });

  describe('pick', () => {
    it('should pick a card', () => {
      const deck = new Deck();
      const target = deck.cards[0];
      const card = deck.pick(target);

      expect(card).toBeInstanceOf(Card);
    });

    it('should return undefined if the card is not found', () => {
      const deck = new Deck();
      const card = deck.pick(new Card('Spades', 'Ace'));

      expect(card).toBeUndefined();
    });

    it('should remove the card from the deck', () => {
      const deck = new Deck();
      const target = deck.cards[0];
      const card = deck.pick(target);

      expect(deck.cards).not.toContain(card);
    });

    it('should add the card to the drawn cards', () => {
      const deck = new Deck();
      const target = deck.cards[0];
      const card = deck.pick(target);

      expect(deck.drawnCards).toContain(card);
    });

    it('should pick out multiple cards', () => {
      const deck = new Deck();
      const target = deck.cards.slice(0, 3);
      const cards = deck.pick(target);

      expect(cards.length).toBe(3);
      expect(cards.every((card) => card instanceof Card)).toBe(true);
      expect(deck.drawnCards).toEqual(cards);
      expect(deck.cards).not.toContain([...cards]);
    });
  });

  describe('add', () => {
    it('should add a card', () => {
      const deck = new Deck();
      const card = new Card('Spades', 'Ace');

      deck.add(card);

      expect(deck.cards.length).toBe(53);
      expect(deck.cards[deck.cards.length - 1]).toBe(card);
    });

    it('should add an array of cards', () => {
      const deck = new Deck();
      const cards = [
        new Card('Spades', 'Ace'),
        new Card('Clubs', 'Ace'),
        new Card('Hearts', 'Ace'),
        new Card('Diamonds', 'Ace'),
      ];

      deck.add(cards);

      expect(deck.cards.length).toBe(56);
      expect(deck.cards[deck.cards.length - 4]).toBe(cards[0]);
      expect(deck.cards[deck.cards.length - 3]).toBe(cards[1]);
      expect(deck.cards[deck.cards.length - 2]).toBe(cards[2]);
      expect(deck.cards[deck.cards.length - 1]).toBe(cards[3]);
    });

    it('should not add a card twice', () => {
      const deck = new Deck();
      const card = new Card('Spades', 'Ace');

      deck.add(card);
      deck.add(card);

      expect(deck.cards.length).toBe(53);
    });
  });

  describe('draw', () => {
    it('should draw cards', () => {
      const cards = [
        new Card('Spades', 'Ace'),
        new Card('Clubs', 'Ace'),
        new Card('Hearts', 'Ace'),
        new Card('Diamonds', 'Ace'),
      ];
      const deck = new Deck(() => [...cards]);
      const [first, second] = deck.draw(2);

      expect(first).toBe(cards[0]);
      expect(second).toBe(cards[1]);
      expect(deck.drawnCards).toEqual([first, second]);
    });

    it('should remove the cards from the deck', () => {
      const deck = new Deck();
      const cards = deck.draw(3);

      expect(deck.remaining).toBe(49);
      expect(deck.cards).not.toContain(cards[0]);
      expect(deck.drawnCards).toEqual(cards);
    });

    it('should return an empty array if there are no cards left', () => {
      const deck = new Deck(() => []);
      const cards = deck.draw(3);

      expect(cards).toEqual([]);
    });

    it('should return all the cards if there are less than the number requested', () => {
      const cards = [
        new Card('Spades', 'Ace'),
        new Card('Clubs', 'Ace'),
        new Card('Hearts', 'Ace'),
        new Card('Diamonds', 'Ace'),
      ];
      const deck = new Deck(() => [...cards]);
      const drawn = deck.draw(5);

      expect(drawn).toEqual(cards);
      expect(deck.isEmpty).toBe(true);
    });

    it('should draw a card', () => {
      const cards = [
        new Card('Spades', 'Ace'),
        new Card('Clubs', 'Ace'),
        new Card('Hearts', 'Ace'),
        new Card('Diamonds', 'Ace'),
      ];
      const deck = new Deck(() => [...cards]);
      const card = deck.draw();

      expect(card).toBe(cards[0]);
      expect(deck.drawnCards).toEqual([card]);
    });

    it('should remove the card', () => {
      const deck = new Deck();
      const card = deck.draw();

      expect(deck.remaining).toBe(51);
      expect(deck.cards).not.toContain(card);
      expect(deck.drawnCards).toEqual([card]);
    });

    it('should return undefined if there are no cards left', () => {
      const deck = new Deck(() => []);
      const card = deck.draw();

      expect(card).toBeUndefined();
    });
  });

  describe('isEmpty', () => {
    it('should return true if there are no cards left', () => {
      const deck = new Deck(() => []);
      expect(deck.isEmpty).toBe(true);
    });

    it('should return false if there are cards left', () => {
      const deck = new Deck();
      expect(deck.isEmpty).toBe(false);
    });
  });

  describe('isNotEmpty', () => {
    it('should return false if there are no cards left', () => {
      const deck = new Deck(() => []);
      expect(deck.isNotEmpty).toBe(false);
    });

    it('should return true if there are cards left', () => {
      const deck = new Deck();
      expect(deck.isNotEmpty).toBe(true);
    });
  });

  describe('reset', () => {
    it('should reset the deck', () => {
      const deck = new Deck();
      deck.shuffle();
      deck.draw(3);
      deck.reset();

      expect(deck.cards.length).toBe(52);
      expect(deck.drawnCards.length).toBe(0);
    });

    it('should shuffle the deck if directed', () => {
      const deck = new Deck();

      vi.spyOn(deck, 'shuffle');
      vi.spyOn(deck, 'sort');

      deck.draw(3);
      deck.reset('shuffle');

      expect(deck.shuffle).toHaveBeenCalled();
      expect(deck.sort).not.toHaveBeenCalled();
    });

    it('should sort the deck if directed', () => {
      const deck = new Deck();

      vi.spyOn(deck, 'shuffle');
      vi.spyOn(deck, 'sort');

      deck.draw(3);
      deck.reset('sort');

      expect(deck.shuffle).not.toHaveBeenCalled();
      expect(deck.sort).toHaveBeenCalled();
    });

    it('should shuffle the deck by default', () => {
      const deck = new Deck();

      vi.spyOn(deck, 'shuffle');
      vi.spyOn(deck, 'sort');

      deck.draw(3);
      deck.reset();

      expect(deck.shuffle).toHaveBeenCalled();
      expect(deck.sort).not.toHaveBeenCalled();
    });

    it('should append the drawn cards the deck if directed', () => {
      const deck = new Deck();

      vi.spyOn(deck, 'shuffle');
      vi.spyOn(deck, 'sort');

      deck.draw(3);
      deck.reset(null);

      expect(deck.shuffle).not.toHaveBeenCalled();
      expect(deck.sort).not.toHaveBeenCalled();
    });
  });
});

describe('PinocleDeck', () => {
  it('should have cards', () => {
    const deck = new PinocleDeck();
    expect(deck.cards.length).toBe(48);
  });

  it('should have values', () => {
    const deck = new PinocleDeck();
    expect(deck.values).toBeDefined();
  });

  it('should only have Aces, 10s, Kings, Queens, Jacks, and 9s', () => {
    const deck = new PinocleDeck();
    expect(
      deck.cards.every(
        (card) =>
          card.rank === 'Ace' ||
          card.rank === 10 ||
          card.rank === 'King' ||
          card.rank === 'Queen' ||
          card.rank === 'Jack' ||
          card.rank === 9,
      ),
    ).toBe(true);
  });
});

describe('generateDeck', () => {
  it('should generate a deck', () => {
    const cards = generateDeck(null);
    expect(cards.length).toBe(52);
  });

  it('should generate a deck with 4 suits', () => {
    const cards = generateDeck(null);
    expect(cards.filter((card) => card.suit === 'Spades').length).toBe(13);
    expect(cards.filter((card) => card.suit === 'Hearts').length).toBe(13);
    expect(cards.filter((card) => card.suit === 'Clubs').length).toBe(13);
    expect(cards.filter((card) => card.suit === 'Diamonds').length).toBe(13);
  });
});
