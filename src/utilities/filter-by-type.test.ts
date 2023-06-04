import { it, expect } from 'vitest';
import { filterByType } from './filter-by-type';

it('it should filter by type for instances of classes', () => {
  class Dog {}
  class Cat {}

  const dog = new Dog();
  const cat = new Cat();

  const list = [dog, cat, dog, cat, dog, cat];
  const result = filterByType(Dog, list);

  expect(result).toEqual([dog, dog, dog]);
});
