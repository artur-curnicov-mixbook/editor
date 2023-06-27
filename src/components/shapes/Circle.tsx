import { useMemo } from 'react';
import { Item } from '../../domain/Item';

const RADIUS = 3;

interface Props {
  item: Item;
  index: number;
}

export function Circle({ item, index }: Props): JSX.Element {
  const { x, y } = item;

  const active = useMemo<string>(() => (item.isDragged ? 'active' : ''), [item]);

  return (
    <circle
      className={`shape ${active}`}
      cx={x + RADIUS}
      cy={y + RADIUS}
      r={RADIUS}
      data-index={index}
    />
  );
}
