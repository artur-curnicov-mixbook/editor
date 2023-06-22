import { configuration } from '../../configuration/configuration';
import { Item } from '../../domain/WorkingArea';

interface CircleParameters {
  item: Item;
}

export function Circle({ item }: CircleParameters): JSX.Element {
  const { x, y } = item;
  return <circle cx={x} cy={y} r={configuration.circle.radius} />;
}
