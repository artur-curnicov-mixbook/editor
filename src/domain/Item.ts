import { ItemType } from './ItemType';
import { Draggable } from './Draggable';
import { Positionable } from './Positionable';

export interface Item extends Positionable, Draggable {
  type: ItemType;
}
