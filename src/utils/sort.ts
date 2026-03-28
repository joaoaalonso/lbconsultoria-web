export const sortByType = <T extends { type: string }>(array: T[]): T[] =>
  [...array].sort(({ type: a }, { type: b }) => parseInt(a) - parseInt(b))
