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
import { useCallback, useRef, PointerEvent } from 'react';
import { mapScreenToSvgCoordinates } from '../../application/utils';
import { DraggableData } from '../Draggable/Draggable';

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

  const handlePointerDown = useCallback(
    (elementIndex: number, event: PointerEvent<SVGElement>) => {
      const { current: workingAreaElement } = workingAreaRef;

      if (!workingAreaElement) return;

      const newElements = items.map((item, currentElementIndex) => {
        if (elementIndex !== currentElementIndex) return item;

        const { x, y } = getCoordinates(event, workingAreaElement);
        event.currentTarget.setPointerCapture(event.pointerId);

        return { ...item, xOffset: x, yOffset: y, isMoving: true };
      });

      dispatch(workingAreaSlice.actions.updateElements(newElements));
    },
    [dispatch, items]
  );

  const handlePointerMove = useCallback(
    (elementIndex: number, event: PointerEvent<SVGElement>) => {
      const { current: workingAreaElement } = workingAreaRef;

      if (!workingAreaElement) return;

      const newElements = items.map((item, currentElementIndex) => {
        if (elementIndex !== currentElementIndex || item.isMoving === false) return item;

        const { x, y } = getCoordinates(event, workingAreaElement);
        event.currentTarget.setPointerCapture(event.pointerId);

        return {
          ...item,
          x: item.x - (item.xOffset - x),
          y: item.y - (item.yOffset - y)
        };
      });

      dispatch(workingAreaSlice.actions.updateElements(newElements));
    },
    [dispatch, items]
  );

  const handlePointerUp = useCallback(
    (elementIndex: number) => {
      const { current: workingAreaElement } = workingAreaRef;

      if (!workingAreaElement) return;

      const newElements = items.map((item, currentElementIndex) => {
        if (elementIndex !== currentElementIndex) return item;

        return { ...item, isMoving: false };
      });

      dispatch(workingAreaSlice.actions.updateElements(newElements));
    },
    [dispatch, items]
  );

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
          return (
            <Shape
              key={`${item.type}-${i}`}
              item={item}
              draggableHandlers={{
                onPointerDown: (evt: PointerEvent<SVGElement>): void => handlePointerDown(i, evt),
                onPointerUp: (): void => handlePointerUp(i),
                onPointerMove: (evt: PointerEvent<SVGElement>): void => handlePointerMove(i, evt)
              }}
            />
          );
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

function getCoordinates(event: PointerEvent<SVGElement>, svgElement: SVGSVGElement): SVGPoint {
  const boundingClientRect = event.currentTarget.getBoundingClientRect();
  const screenX = event.clientX - boundingClientRect.left;
  const screenY = event.clientY - boundingClientRect.top;

  return mapScreenToSvgCoordinates(screenX, screenY, svgElement);
}
