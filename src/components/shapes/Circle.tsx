import { useMemo } from 'react';
import { Item } from '../../domain/Item';

const RADIUS = 3;

interface Props {
  item: Item;
  isActive: boolean;
}

export function Circle({ item, isActive }: Props): JSX.Element {
  const { x, y } = item;
  const active = useMemo<string>(() => (isActive ? 'active' : ''), [isActive]);

  return <circle className={`shape ${active}`} cx={x + RADIUS} cy={y + RADIUS} r={RADIUS} />;
}
