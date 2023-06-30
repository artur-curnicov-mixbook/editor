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

const CANVAS_SIZE = 100;

export function WorkingArea(): JSX.Element {
  const { items } = useSelector((state: RootState) => state.workingAreaItems);
  const dispatch = useDispatch();
  const workingAreaRef = useRef<SVGSVGElement>(null);
  const { setNodeRef: droppableRef } = useDroppable({ id: 'droppable' });
  const [movingItem, setMovingItem] = useState<MovingItem>();

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

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const { current: workingAreaElement } = workingAreaRef;

      if (!workingAreaElement) return;
      if (!movingItem) return;

      const { clientX, clientY } = event;
      const { index, innerOffsetX, innerOffsetY } = movingItem;

      const { x, y } = mapScreenToSvgCoordinates(
        clientX - innerOffsetX,
        clientY - innerOffsetY,
        workingAreaElement
      );

      dispatch(workingAreaSlice.actions.updateItemCoordinates({ index, x, y }));
    },
    [dispatch, movingItem]
  );

  const handlePointerUp = useCallback(() => {
    setMovingItem(undefined);
  }, []);

  useWindowEventListener('pointermove', handlePointerMove);
  useWindowEventListener('pointerup', handlePointerUp);

  const handleDragStart = useCallback(
    (index: number, innerOffsetX: number, innerOffsetY: number) => {
      setMovingItem({ index, innerOffsetX, innerOffsetY });
      dispatch(workingAreaSlice.actions.setSelectedItemIndex(index));
    },
    [dispatch]
  );

  const handleOnClick = useCallback(() => {
    dispatch(workingAreaSlice.actions.setSelectedItemIndex(undefined));
  }, [dispatch]);

  return (
    <div className="working-area" ref={droppableRef} data-testid="workingarea">
      <svg
        ref={workingAreaRef}
        width="100%"
        height="100%"
        viewBox={[0, 0, CANVAS_SIZE, CANVAS_SIZE].join(' ')}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x1={-CANVAS_SIZE * 100}
          y1={-CANVAS_SIZE * 100}
          x2={CANVAS_SIZE * 100}
          y2={CANVAS_SIZE * 100}
          fill="transparent"
          onClick={handleOnClick}
        />
        {items.map((item, index) => (
          <Shape
            key={`${item.type}-${index}`}
            item={item}
            index={index}
            isMoving={movingItem?.index === index}
            handleDragStart={handleDragStart}
          />
        ))}
      </svg>
    </div>
  );
}

interface MovingItem {
  index: number;
  innerOffsetX: number;
  innerOffsetY: number;
}
