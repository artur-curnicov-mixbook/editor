import { CircleItem } from '../../domain/WorkingArea';

interface CircleParameters {
  item: CircleItem;
}

export function Circle({ item }: CircleParameters): JSX.Element {
  const { x, y, radius } = item;
  return <circle cx={x} cy={y} r={radius} />;
}
