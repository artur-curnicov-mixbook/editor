import { useMemo, PointerEvent } from 'react';
import { Item } from '../../domain/Item';

const RADIUS = 3;

interface Props {
  item: Item;
  draggableHandlers: DraggableHandlers;
}

interface DraggableHandlers {
  onPointerDown: (evt: PointerEvent<SVGElement>) => void;
  onPointerUp: (evt: PointerEvent<SVGElement>) => void;
  onPointerMove: (evt: PointerEvent<SVGElement>) => void;
}

export function Circle({ item, draggableHandlers }: Props): JSX.Element {
  const { x, y } = item;
  const { onPointerDown, onPointerUp, onPointerMove } = draggableHandlers;

  const active = useMemo<string>(() => (item.isMoving ? 'active' : ''), [item]);

  return (
    <circle
      className={`shape ${active}`}
      cx={x + RADIUS}
      cy={y + RADIUS}
      r={RADIUS}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    />
  );
}
