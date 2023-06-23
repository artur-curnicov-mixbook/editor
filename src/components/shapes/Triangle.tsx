import { Item } from '../../domain/Item';

const SIZE = 6;

interface TriangleParameters {
  item: Item;
}

export function Triangle({ item }: TriangleParameters): JSX.Element {
  const { x, y } = item;

  const getTrianglePoints = (): string => {
    const height = (Math.sqrt(3) / 2) * SIZE;
    const halfSize = SIZE / 2;
    const halfHeight = height / 2;

    const point1 = `${x},${y - halfHeight}`;
    const point2 = `${x - halfSize},${y + halfHeight}`;
    const point3 = `${x + halfSize},${y + halfHeight}`;

    return `${point1} ${point2} ${point3}`;
  };

  return <polygon points={getTrianglePoints()} />;
}
