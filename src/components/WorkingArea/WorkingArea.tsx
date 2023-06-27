import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { ItemType } from '../../domain/ItemType';
import { Circle } from '../shapes/Circle';
import { Triangle } from '../shapes/Triangle';
import { Square } from '../shapes/Square';
import { Droppable } from '../Droppable/Droppable';
import { DataRef, DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import { workingAreaSlice } from '../../state/workingAreaSlice';
import { useCallback, useRef, useEffect } from 'react';
import { mapScreenToSvgCoordinates } from '../../application/utils';
import { DraggableData } from '../Draggable/Draggable';
import { updateItem } from '../../domain/updateItemData';

export function WorkingArea(): JSX.Element {
  const items = useSelector((state: RootState) => state.workingAreaItems.items);
  const dispatch = useDispatch();
  const workingAreaRef = useRef<SVGSVGElement>(null);

  const createItem = useCallback(
    (x: number, y: number, type: ItemType) => {
      dispatch(
        workingAreaSlice.actions.addItem({ x, y, type, isMoving: false, xOffset: 0, yOffset: 0 })
      );
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

  const handlePointerEvent = useCallback(
    (event: PointerEvent): void => {
      const clickedItemIndex = (event.target as HTMLElement).dataset.index;
      const { current: workingAreaElement } = workingAreaRef;

      if (clickedItemIndex === undefined) return;
      if (!workingAreaElement) return;

      const intClickedItemIndex = parseInt(clickedItemIndex);
      const updatedItem = updateItem(event, items[intClickedItemIndex], workingAreaElement);

      dispatch(
        workingAreaSlice.actions.updateItems({ item: updatedItem, index: intClickedItemIndex })
      );
    },
    [dispatch, items]
  );

  useEffect(() => {
    const win: Window = window;

    win.addEventListener('pointerdown', handlePointerEvent);
    win.addEventListener('pointermove', handlePointerEvent);
    win.addEventListener('pointerup', handlePointerEvent);

    return () => {
      win.removeEventListener('pointerdown', handlePointerEvent);
      win.removeEventListener('pointermove', handlePointerEvent);
      win.removeEventListener('pointerup', handlePointerEvent);
    };
  }, [dispatch, handlePointerEvent, items]);

  return (
    <Droppable>
      <svg
        ref={workingAreaRef}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {items.map((item, i) => {
          const Shape = ITEM_TYPE_TO_SHAPE[item.type];
          return <Shape key={`${item.type}-${i}`} item={item} index={i} />;
        })}
      </svg>
    </Droppable>
  );
}

const ITEM_TYPE_TO_SHAPE = {
  circle: Circle,
  triangle: Triangle,
  square: Square
};
