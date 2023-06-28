import { ItemType } from './ItemType';
import { Positionable } from './Positionable';

export interface Item extends Positionable {
  type: ItemType;
}
