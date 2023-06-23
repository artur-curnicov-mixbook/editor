import { Item } from '../../domain/Item';

interface SquareParameters {
  item: Item;
}

export function Square({ item }: SquareParameters): JSX.Element {
  const { x, y } = item;
  return <rect x={x} y={y} width={5} height={5} />;
}
