import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { ItemType, toItemType } from '../../domain/ItemType';
import { Circle } from '../shapes/Circle';
import { Triangle } from '../shapes/Triangle';
import { Square } from '../shapes/Square';
import { Droppable } from '../Droppable/Droppable';
import { DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import { workingAreaSlice } from '../../state/workingAreaSlice';
import { useMemo, useRef } from 'react';
import { calculateSvgCoordinates } from '../../application/utils';

export function WorkingArea(): JSX.Element {
  const items = useSelector((state: RootState) => state.workingAreaItems.items);
  const dispatch = useDispatch();
  const workingAreaRef = useRef<SVGSVGElement>(null);

  useDndMonitor({
    onDragEnd: handleDragEnd
  });

  const itemToShapeMapping = useMemo(() => {
    return {
      circle: Circle,
      triangle: Triangle,
      square: Square
    };
  }, []);

  function handleDragEnd(event: DragEndEvent): void {
    if (!event.over || !event.active.data.current) {
      return;
    }

    const initialX = event.active.data.current.initialX;
    const initialY = event.active.data.current.initialY;

    if (isNaN(initialX) || isNaN(initialY)) {
      return;
    }

    const [x, y] = calculateSvgCoordinates(
      event.delta,
      { x: initialX, y: initialY },
      workingAreaRef
    );
    const draggedItemType = toItemType(event.active.data.current.type);

    createItem(x, y, draggedItemType);
  }

  function createItem(x: number, y: number, type: ItemType): void {
    dispatch(workingAreaSlice.actions.addItem({ x, y, type }));
  }

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
          const Shape = itemToShapeMapping[item.type];
          return <Shape key={`${item.type}-${i}`} item={item} />;
        })}
      </svg>
    </Droppable>
  );
}
