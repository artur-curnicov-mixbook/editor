import { useMemo, PointerEvent } from 'react';
import { Item } from '../../domain/Item';

const SIZE = 5;

interface Props {
  item: Item;
  draggableHandlers: DraggableHandlers;
}

interface DraggableHandlers {
  onPointerDown: (evt: PointerEvent<SVGElement>) => void;
  onPointerUp: (evt: PointerEvent<SVGElement>) => void;
  onPointerMove: (evt: PointerEvent<SVGElement>) => void;
}

export function Square({ item, draggableHandlers }: Props): JSX.Element {
  const { x, y } = item;
  const { onPointerDown, onPointerUp, onPointerMove } = draggableHandlers;

  const active = useMemo<string>(() => (item.isMoving ? 'active' : ''), [item]);

  return (
    <rect
      className={`shape ${active}`}
      x={x}
      y={y}
      width={SIZE}
      height={SIZE}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    />
  );
}
