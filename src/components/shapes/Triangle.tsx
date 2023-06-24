import { Item } from '../../domain/Item';

const SIZE = 6;

export function Triangle({ item }: Props): JSX.Element {
  const { x, y } = item;

  const getTrianglePoints = (): string => {
    const height = (Math.sqrt(3) / 2) * SIZE;
    const halfSize = SIZE / 2;
    const halfHeight = height / 2;

    const translatedX = x + halfSize;
    const translatedY = y + halfHeight;

    const point1 = `${translatedX},${translatedY - halfHeight}`;
    const point2 = `${translatedX - halfSize},${translatedY + halfHeight}`;
    const point3 = `${translatedX + halfSize},${translatedY + halfHeight}`;

    return `${point1} ${point2} ${point3}`;
  };

  return <polygon points={getTrianglePoints()} />;
}

interface Props {
  item: Item;
}
