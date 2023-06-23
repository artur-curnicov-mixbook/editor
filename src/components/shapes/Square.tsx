import { Item } from '../../domain/Item';

const SIZE = 5;

interface SquareParameters {
  item: Item;
}

export function Square({ item }: SquareParameters): JSX.Element {
  const { x, y } = item;
  return <rect x={x} y={y} width={SIZE} height={SIZE} />;
}
