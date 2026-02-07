export const groupBy = <KEY extends string, VALUE>(
  array: VALUE[],
  key: (value: VALUE) => KEY | null | undefined,
): Map<KEY, VALUE[]> => {
  const result = new Map<KEY, VALUE[]>();
  for (const item of array) {
    const itemKey = key(item);
    if (itemKey === null || itemKey === undefined) continue;
    const existingList = result.get(itemKey) || [];
    existingList.push(item);
    result.set(itemKey, existingList);
  }
  return result;
};
