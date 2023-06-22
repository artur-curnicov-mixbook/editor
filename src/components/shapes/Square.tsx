import { SquareItem } from '../../domain/WorkingArea';

interface SquareParameters {
  item: SquareItem;
}

export function Square({ item }: SquareParameters): JSX.Element {
  const { x, y, width } = item;
  return <rect x={x} y={y} width={width} height={width} />;
}
