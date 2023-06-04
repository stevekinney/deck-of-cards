import { it, expect, describe } from 'vitest';
import { first, last, shuffle, indexOf, pluck } from './collections';

describe('first', () => {
  it('should return the first item in an array', () => {
    expect(first([1, 2, 3])).toBe(1);
  });
});

describe('last', () => {
  it('should return the last item in an array', () => {
    expect(last([1, 2, 3])).toBe(3);
  });
});

describe('shuffle', () => {
  it('should shuffle an array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    expect(shuffled).not.toEqual(array);
  });

  it('should not modify the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    expect(shuffled).not.toBe(array);
  });

  it('should have the same length as the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    expect(shuffled.length).toBe(array.length);
  });

  it('should have the same items as the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);
    expect(shuffled).toEqual(expect.arrayContaining(array));
  });
});

describe('indexOf', () => {
  it('should return the index of an item in an array', () => {
    expect(indexOf([1, 2, 3], 2)).toBe(1);
  });

  it('should return null if the item is not in the array', () => {
    expect(indexOf([1, 2, 3], 4)).toBe(null);
  });
});

describe('pluck', () => {
  it('should remove an item from an array by value', () => {
    const array = [1, 2, 3];
    expect(pluck(array, 2)).toBe(2);
    expect(array).toEqual([1, 3]);
  });

  it('should return undefined if the item is not in the array', () => {
    const array = [1, 2, 3];
    expect(pluck(array, 4)).toBe(undefined);
    expect(array).toEqual([1, 2, 3]);
  });

  it('should return undefined if the array is empty', () => {
    const array: number[] = [];
    expect(pluck(array, 0)).toBe(undefined);
    expect(array).toEqual([]);
  });
});
