export enum ItemType {
  circle = 'circle',
  square = 'square',
  triangle = 'triangle'
}

export function toItemType(value: string): ItemType {
  if (!(Object.values(ItemType) as string[]).includes(value)) {
    throw new Error(`Item type ${value} not found`);
  }

  return value as ItemType;
}
