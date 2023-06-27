import { mapScreenToSvgCoordinates } from '../application/utils';
import { Item } from './Item';

export function updateItem(
  event: PointerEvent,
  item: Item,
  workingAreaElement: SVGSVGElement
): Item {
  switch (event.type) {
    case 'pointerdown':
      return handlePointerDown(event, item, workingAreaElement);
    case 'pointermove':
      if (item.isMoving) return handlePointerMove(event, item, workingAreaElement);
      return item;
    case 'pointerup':
      return handlePointerUp(item);
    default:
      return item;
  }
}

const handlePointerDown = (
  event: PointerEvent,
  item: Item,
  workingAreaElement: SVGSVGElement
): Item => {
  const { x, y } = mapScreenToSvgCoordinates(event.movementX, event.movementY, workingAreaElement);
  (event.target as Element).setPointerCapture(event.pointerId);

  return { ...item, xOffset: x, yOffset: y, isMoving: true };
};

const handlePointerMove = (
  event: PointerEvent,
  item: Item,
  workingAreaElement: SVGSVGElement
): Item => {
  const { x, y } = mapScreenToSvgCoordinates(event.movementX, event.movementY, workingAreaElement);

  return {
    ...item,
    x: item.x - (item.xOffset - x),
    y: item.y - (item.yOffset - y)
  };
};

const handlePointerUp = (item: Item): Item => {
  return { ...item, isMoving: false };
};
