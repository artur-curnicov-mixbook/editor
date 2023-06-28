import { useMemo } from 'react';
import { Item } from '../../domain/Item';

const SIZE = 5;

interface Props {
  item: Item;
  isActive: boolean;
}

export function Square({ item, isActive }: Props): JSX.Element {
  const { x, y } = item;
  const active = useMemo<string>(() => (isActive ? 'active' : ''), [isActive]);

  return <rect className={`shape ${active}`} x={x} y={y} width={SIZE} height={SIZE} />;
}
