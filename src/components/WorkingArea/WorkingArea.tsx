import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { ItemType } from '../../domain/ItemType';
import { DataRef, DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { workingAreaSlice } from '../../state/workingAreaSlice';
import { useCallback, useRef, useState } from 'react';
import { mapScreenToSvgCoordinates } from '../../application/utils';
import { DraggableData } from '../Draggable/Draggable';
import { Shape } from '../Shape/Shape';
import { useWindowEventListener } from '../../hooks/useWindowEventListener';
import { Item } from '../../domain/Item';

export function WorkingArea(): JSX.Element {
  const { items, draggingItemIndex } = useSelector((state: RootState) => state.workingAreaItems);
  const dispatch = useDispatch();
  const workingAreaRef = useRef<SVGSVGElement>(null);
  const { setNodeRef: droppableRef } = useDroppable({ id: 'droppable' });

  const createItem = useCallback(
    (x: number, y: number, type: ItemType) => {
      dispatch(workingAreaSlice.actions.addItem({ x, y, type }));
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

  const [priorMouseCoordinates, setPriorMouseCoordinates] = useState({ x: 0, y: 0 });

  const setPriorMouseSvgCoordinates = useCallback((x: number, y: number): void => {
    const { current: workingAreaElement } = workingAreaRef;

    if (!workingAreaElement) return;

    setPriorMouseCoordinates(mapScreenToSvgCoordinates(x, y, workingAreaElement));
  }, []);

  const calculateUpdatedCoordinates = useCallback(
    (draggingItem: Item, currentMouseCoordinates: DOMPoint): [x: number, y: number] => {
      return [
        draggingItem.x - (priorMouseCoordinates.x - currentMouseCoordinates.x),
        draggingItem.y - (priorMouseCoordinates.y - currentMouseCoordinates.y)
      ];
    },
    [priorMouseCoordinates]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const { current: workingAreaElement } = workingAreaRef;

      if (!workingAreaElement) return;
      if (draggingItemIndex === undefined) return;

      const currentMouseCoordinates = mapScreenToSvgCoordinates(
        event.movementX,
        event.movementY,
        workingAreaElement
      );

      const [x, y] = calculateUpdatedCoordinates(items[draggingItemIndex], currentMouseCoordinates);

      dispatch(workingAreaSlice.actions.updateItemCoordinates({ index: draggingItemIndex, x, y }));
    },
    [calculateUpdatedCoordinates, dispatch, draggingItemIndex, items]
  );

  const handlePointerUp = useCallback(() => {
    dispatch(workingAreaSlice.actions.setDraggingItemIndex(undefined));
  }, [dispatch]);

  useWindowEventListener('pointermove', handlePointerMove);
  useWindowEventListener('pointerup', handlePointerUp);

  const itemIsActive = useCallback(
    (itemIndex: number) => itemIndex === draggingItemIndex,
    [draggingItemIndex]
  );

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
            isActive={itemIsActive(index)}
            onPointerDown={setPriorMouseSvgCoordinates}
          />
        ))}
      </svg>
    </div>
  );
}
