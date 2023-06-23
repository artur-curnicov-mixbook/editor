import { Item } from '../../domain/Item';

const RADIUS = 3;

interface CircleParameters {
  item: Item;
}

export function Circle({ item }: CircleParameters): JSX.Element {
  const { x, y } = item;
  return <circle cx={x} cy={y} r={RADIUS} />;
}
