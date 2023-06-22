export interface Item extends Positionable {
  type: ItemType;
}

export enum ItemType {
  CIRCLE = 'circle',
  SQUARE = 'square',
  TRIANGLE = 'triangle'
}

interface Positionable {
  x: number;
  y: number;
}
