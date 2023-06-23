import { Item } from '../../domain/Item';

interface CircleParameters {
  item: Item;
}

export function Circle({ item }: CircleParameters): JSX.Element {
  const { x, y } = item;
  return <circle cx={x} cy={y} r={3} />;
}
