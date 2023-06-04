type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs';

type Rank =
  | 'Ace'
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 'Jack'
  | 'Queen'
  | 'King';

type PincholeRank = 'Ace' | 'King' | 'Queen' | 'Jack' | 10 | 9;

type CardName = `${Rank} of ${Suit}`;

type CardValues = readonly Partial<Record<Partial<Rank>, number>>;

type TraditionalValues = readonly Required<CardValues>;

type PinocleValues = readonly Required<Pick<TraditionalValues, PincholeRank>>;
