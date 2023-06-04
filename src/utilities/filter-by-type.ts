export const filterByType = <T extends abstract new (...args: any) => any>(
  kind: T,
  list: any[],
): InstanceType<T>[] => {
  return list.filter((item) => item instanceof kind);
};
