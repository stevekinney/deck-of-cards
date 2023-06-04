export const first = <T extends unknown>(array: T[]): T => array[0];

export const last = <T extends unknown>(array: T[]): T =>
  array[array.length - 1];

export const shuffle = <T extends unknown>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
};

export const indexOf = <T extends unknown>(
  array: T[],
  item: T,
): number | null => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) return i;
  }

  return null;
};

export const pluck = <T extends unknown>(
  array: T[],
  item: T,
): T | undefined => {
  const index = indexOf(array, item);

  if (index === null) {
    return undefined;
  }

  return array.splice(index, 1)[0];
};

export const push = <T extends unknown>(array: T[], items: T | T[]): void => {
  if (!items) return;
  if (!Array.isArray(items)) items = [items];
  items = items.filter((i) => !array.includes(i));
  array.push(...items);
};
