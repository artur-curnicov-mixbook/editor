import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { Item } from '../../domain/Item';
import { ItemType } from '../../domain/ItemType';
import { Circle } from '../shapes/Circle';
import { Triangle } from '../shapes/Triangle';
import { Square } from '../shapes/Square';

export function WorkingArea(): JSX.Element {
  const items = useSelector((state: RootState) => state.workingAreaItems.items);

  return (
    <div className="working-area" data-testid="workingarea">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {items.map((item, i) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const Shape = mapping[item.type];

          return <Shape key={`${item.type}-${i}`} item={item} />;
        })}
      </svg>
    </div>
  );
}

const mapping: Record<ItemType, (props: { item: Item }) => JSX.Element> = {
  circle: Circle,
  triangle: Triangle,
  square: Square
};
