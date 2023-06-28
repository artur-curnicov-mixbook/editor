import { useCallback, PointerEvent } from 'react';
import { Item } from '../../domain/Item';
import { Circle } from '../shapes/Circle';
import { Square } from '../shapes/Square';
import { Triangle } from '../shapes/Triangle';
import { useDispatch } from 'react-redux';
import { workingAreaSlice } from '../../state/workingAreaSlice';

interface Props {
  item: Item;
  index: number;
  isActive: boolean;
  onPointerDown(x: number, y: number): void;
}

export function Shape(props: Props): JSX.Element {
  const { item, index, isActive, onPointerDown } = props;

  const dispatch = useDispatch();

  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
      onPointerDown(event.movementX, event.movementY);
      dispatch(workingAreaSlice.actions.setDraggingItemIndex(index));
    },
    [dispatch, index, onPointerDown]
  );

  const ConcreteShape = ITEM_TYPE_TO_SHAPE[item.type];

  return (
    <g onPointerDown={handlePointerDown}>
      <ConcreteShape item={item} isActive={isActive} />
    </g>
  );
}

const ITEM_TYPE_TO_SHAPE = {
  circle: Circle,
  triangle: Triangle,
  square: Square
};
