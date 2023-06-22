export interface SquareItem extends Positionable {
  width: number;
  type: 'square';
}

export interface CircleItem extends Positionable {
  radius: number;
  type: 'circle';
}

export interface TriangleItem extends Positionable {
  size: number;
  type: 'triangle';
}

export type Item = SquareItem | CircleItem | TriangleItem;

export interface WorkingAreaState {
  items: Item[];
}

interface Positionable {
  x: number;
  y: number;
}
