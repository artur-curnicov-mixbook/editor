import { useMemo } from 'react';
import { Item } from '../../domain/Item';

const SIZE = 6;
const HEIGHT = (Math.sqrt(3) / 2) * SIZE;
const HALF_SIZE = SIZE / 2;
const HALF_HEIGHT = HEIGHT / 2;

interface Props {
  item: Item;
}

export function Triangle({ item }: Props): JSX.Element {
  const { x, y } = item;

  const trianglePoints = useMemo((): string => {
    const translatedX = x + HALF_SIZE;
    const translatedY = y + HALF_HEIGHT;

    const point1 = `${translatedX},${translatedY - HALF_HEIGHT}`;
    const point2 = `${translatedX - HALF_SIZE},${translatedY + HALF_HEIGHT}`;
    const point3 = `${translatedX + HALF_SIZE},${translatedY + HALF_HEIGHT}`;

    return `${point1} ${point2} ${point3}`;
  }, [x, y]);

  return <polygon className="shape" points={trianglePoints} />;
}
