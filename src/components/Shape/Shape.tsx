import { useCallback, useRef } from 'react';
import { Item } from '../../domain/Item';
import { Circle } from '../shapes/Circle';
import { Square } from '../shapes/Square';
import { Triangle } from '../shapes/Triangle';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import classNames from 'classnames';

interface Props {
  item: Item;
  index: number;
  isMoving: boolean;
  handleDragStart(index: number, innerOffsetX: number, innerOffsetY: number): void;
}

export function Shape(props: Props): JSX.Element {
  const { item, index, isMoving, handleDragStart } = props;

  const rootRef = useRef<SVGGElement>(null);
  const { selectedItemIndex } = useSelector((state: RootState) => state.workingAreaItems);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const { current: rootElement } = rootRef;

      if (!rootElement) return;

      const { left, top } = rootElement.getBoundingClientRect();

      handleDragStart(index, event.clientX - left, event.clientY - top);
    },
    [index, handleDragStart]
  );

  const isSelected = index === selectedItemIndex;
  const ConcreteShape = ITEM_TYPE_TO_SHAPE[item.type];
  const className = classNames({ moving: isMoving, selected: isSelected });

  return (
    <g ref={rootRef} onPointerDown={handlePointerDown} className={className}>
      <ConcreteShape item={item} />
    </g>
  );
}

const ITEM_TYPE_TO_SHAPE = {
  circle: Circle,
  triangle: Triangle,
  square: Square
};
