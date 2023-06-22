import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { Item } from '../../domain/WorkingArea';
import { Square } from '../shapes/Square';
import { Circle } from '../shapes/Circle';
import { Triangle } from '../shapes/Triangle';

export function WorkingArea(): JSX.Element {
  const elements = useSelector((state: RootState) => state.workingAreaItems.items);

  function renderShape(item: Item, i: number): JSX.Element {
    switch (item.type) {
      case 'square':
        return <Square key={`square-${i}`} item={item} />;
      case 'circle':
        return <Circle key={`circle-${i}`} item={item} />;
      case 'triangle':
        return <Triangle key={`triangle-${i}`} item={item} />;
    }
  }

  return (
    <div className="working-area" data-testid="workingarea">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {elements.map((item, i) => renderShape(item, i))}
      </svg>
    </div>
  );
}
