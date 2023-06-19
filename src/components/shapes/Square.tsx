import { WorkingAreaSquare } from '../../domain/WorkingArea';

interface SquareParameters {
  item: WorkingAreaSquare;
}

export const Square = ({ item }: SquareParameters): JSX.Element => {
  const { x, y, width } = item;
  return <rect x={x} y={y} width={width} height={width} />;
};
