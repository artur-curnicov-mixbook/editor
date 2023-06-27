import { useMemo, PointerEvent } from 'react';
import { Item } from '../../domain/Item';

const SIZE = 6;
const HEIGHT = (Math.sqrt(3) / 2) * SIZE;
const HALF_SIZE = SIZE / 2;
const HALF_HEIGHT = HEIGHT / 2;

interface Props {
  item: Item;
  draggableHandlers: DraggableHandlers;
}

interface DraggableHandlers {
  onPointerDown: (evt: PointerEvent<SVGElement>) => void;
  onPointerUp: (evt: PointerEvent<SVGElement>) => void;
  onPointerMove: (evt: PointerEvent<SVGElement>) => void;
}

export function Triangle({ item, draggableHandlers }: Props): JSX.Element {
  const { x, y } = item;
  const { onPointerDown, onPointerUp, onPointerMove } = draggableHandlers;

  const active = useMemo<string>(() => (item.isMoving ? 'active' : ''), [item]);
  const trianglePoints = useMemo((): string => {
    const translatedX = x + HALF_SIZE;
    const translatedY = y + HALF_HEIGHT;

    const point1 = `${translatedX},${translatedY - HALF_HEIGHT}`;
    const point2 = `${translatedX - HALF_SIZE},${translatedY + HALF_HEIGHT}`;
    const point3 = `${translatedX + HALF_SIZE},${translatedY + HALF_HEIGHT}`;

    return `${point1} ${point2} ${point3}`;
  }, [x, y]);

  return (
    <polygon
      className={`shape ${active}`}
      points={trianglePoints}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    />
  );
}
