export enum WorkingAreaElementType {
  circle,
  square,
  triangle
}

interface Positionable {
  x: number;
  y: number;
}

export interface WorkingAreaSquare extends Positionable {
  width: number;
  type: WorkingAreaElementType.square;
}

export interface WorkingAreaCircle extends Positionable {
  radius: number;
  type: WorkingAreaElementType.circle;
}

export interface WorkingAreaTriangle extends Positionable {
  size: number;
  type: WorkingAreaElementType.triangle;
}

export type WorkingAreaElement = WorkingAreaSquare | WorkingAreaCircle | WorkingAreaTriangle;

export interface WorkingAreaElementState {
  elements: WorkingAreaElement[];
}
