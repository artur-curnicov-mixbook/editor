import { useMemo } from 'react';
import { Item } from '../../domain/Item';

const SIZE = 5;

interface Props {
  item: Item;
  index: number;
}

export function Square({ item, index }: Props): JSX.Element {
  const { x, y } = item;

  const active = useMemo<string>(() => (item.isDragged ? 'active' : ''), [item]);

  return (
    <rect className={`shape ${active}`} x={x} y={y} width={SIZE} height={SIZE} data-index={index} />
  );
}
