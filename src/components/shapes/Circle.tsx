import { Item } from '../../domain/Item';

const RADIUS = 3;

interface Props {
  item: Item;
}

export function Circle({ item }: Props): JSX.Element {
  const { x, y } = item;

  return <circle className="shape" cx={x + RADIUS} cy={y + RADIUS} r={RADIUS} />;
}
