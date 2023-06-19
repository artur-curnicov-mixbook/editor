import { WorkingAreaCircle } from '../../domain/WorkingArea';

interface CircleParameters {
  item: WorkingAreaCircle;
}

export const Circle = ({ item }: CircleParameters): JSX.Element => {
  const { x, y, radius } = item;
  return <circle cx={x} cy={y} r={radius} />;
};
