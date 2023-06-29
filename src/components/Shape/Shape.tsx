import { useCallback, useRef } from 'react';
import { Item } from '../../domain/Item';
import { Circle } from '../shapes/Circle';
import { Square } from '../shapes/Square';
import { Triangle } from '../shapes/Triangle';

interface Props {
  item: Item;
  index: number;
  isActive: boolean;
  onPointerDown(index: number, innerOffsetX: number, innerOffsetY: number): void;
}

export function Shape(props: Props): JSX.Element {
  const { item, index, isActive, onPointerDown } = props;

  const rootRef = useRef<SVGGElement>(null);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const { current: rootElement } = rootRef;

      if (!rootElement) return;

      const { left, top } = rootElement.getBoundingClientRect();

      onPointerDown(index, event.clientX - left, event.clientY - top);
    },
    [index, onPointerDown]
  );

  const ConcreteShape = ITEM_TYPE_TO_SHAPE[item.type];

  return (
    <g ref={rootRef} onPointerDown={handlePointerDown}>
      <ConcreteShape item={item} isActive={isActive} />
    </g>
  );
}

const ITEM_TYPE_TO_SHAPE = {
  circle: Circle,
  triangle: Triangle,
  square: Square
};
