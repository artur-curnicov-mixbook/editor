import { configuration } from '../../configuration/configuration';
import { Item } from '../../domain/WorkingArea';

interface SquareParameters {
  item: Item;
}

export function Square({ item }: SquareParameters): JSX.Element {
  const { x, y } = item;
  return (
    <rect x={x} y={y} width={configuration.square.width} height={configuration.square.width} />
  );
}
