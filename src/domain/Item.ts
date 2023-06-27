import { ItemType } from './ItemType';
import { Moveable } from './Moveable';
import { Positionable } from './Positionable';

export interface Item extends Positionable, Moveable {
  type: ItemType;
}
