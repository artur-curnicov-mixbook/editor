import { Item } from '../../domain/Item';

const SIZE = 5;

interface Props {
  item: Item;
}

export function Square({ item }: Props): JSX.Element {
  const { x, y } = item;
  return <rect x={x} y={y} width={SIZE} height={SIZE} />;
}
