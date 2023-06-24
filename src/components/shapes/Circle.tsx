import { Item } from '../../domain/Item';

const RADIUS = 3;

export function Circle({ item }: Props): JSX.Element {
  const { x, y } = item;
  return <circle cx={x + RADIUS} cy={y + RADIUS} r={RADIUS} />;
}

interface Props {
  item: Item;
}
