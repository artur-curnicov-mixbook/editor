import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { ItemType } from '../../domain/ItemType';
import { Circle } from '../shapes/Circle';
import { Triangle } from '../shapes/Triangle';
import { Square } from '../shapes/Square';
import { DataRef, DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { workingAreaSlice } from '../../state/workingAreaSlice';
import { useCallback, useRef, useEffect, CSSProperties, useState } from 'react';
import { mapScreenToSvgCoordinates } from '../../application/utils';
import { DraggableData } from '../Draggable/Draggable';
import { updateItem } from '../../domain/updateItemData';
import { Item } from '../../domain/Item';

export function WorkingArea(): JSX.Element {
  const items = useSelector((state: RootState) => state.workingAreaItems.items);
  const dispatch = useDispatch();
  const workingAreaRef = useRef<SVGSVGElement>(null);
  const { setNodeRef: droppableRef } = useDroppable({ id: 'droppable' });

  const createItem = useCallback(
    (x: number, y: number, type: ItemType) => {
      dispatch(workingAreaSlice.actions.addItem({ x, y, type, xOffset: 0, yOffset: 0 }));
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { current: workingAreaElement } = workingAreaRef;
      const { current: dragData } = event.active.data as DataRef<DraggableData>;

      if (!workingAreaElement) return;
      if (!event.over || !dragData) return;

      const { initialX, initialY } = dragData;

      if (isNaN(initialX) || isNaN(initialY)) return;

      const screenX = initialX + event.delta.x;
      const screenY = initialY + event.delta.y;

      const { x, y } = mapScreenToSvgCoordinates(screenX, screenY, workingAreaElement);

      createItem(x, y, dragData.type);
    },
    [createItem]
  );

  useDndMonitor({
    onDragEnd: handleDragEnd
  });

  const [draggingItemIndex, setDraggingItemIndex] = useState<number>();

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const { current: workingAreaElement } = workingAreaRef;

      if (!workingAreaElement) return;
      if (!draggingItemIndex) return;

      const { x, y } = mapScreenToSvgCoordinates(event.clientX, event.clientX, workingAreaElement);

      dispatch(workingAreaSlice.actions.updateItems({ index: draggingItemIndex, x, y }));
    },
    [dispatch, draggingItemIndex]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingItemIndex(undefined);
  }, []);

  useWindowEventListener('pointermove', handlePointerMove);
  useWindowEventListener('pointerup', handlePointerUp);

  return (
    <div className="working-area" ref={droppableRef} data-testid="workingarea">
      <svg
        ref={workingAreaRef}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {items.map((item, index) => (
          <Shape
            key={`${item.type}-${index}`}
            item={item}
            index={index}
            onPointerDown={setDraggingItemIndex}
          />
        ))}
      </svg>
    </div>
  );
}

function Shape(props: {
  item: Item;
  index: number;
  onPointerDown(index: number): void;
}): JSX.Element {
  const { item, index, onPointerDown } = props;

  const handlePointerDown = useCallback(() => {
    onPointerDown(index);
  }, [index, onPointerDown]);

  const Item2 = ITEM_TYPE_TO_SHAPE[item.type];

  return (
    <g onPointerDown={handlePointerDown}>
      <Item2 item={item} index={index} />
    </g>
  );
}

const ITEM_TYPE_TO_SHAPE = {
  circle: Circle,
  triangle: Triangle,
  square: Square
};

function useWindowEventListener<T extends keyof GlobalEventHandlersEventMap>(
  eventName: T,
  listener: (event: GlobalEventHandlersEventMap[T]) => void
): void {
  useEffect(() => {
    window.addEventListener(eventName, listener);

    return (): void => {
      window.removeEventListener(eventName, listener);
    };
  }, [eventName, listener]);
}
