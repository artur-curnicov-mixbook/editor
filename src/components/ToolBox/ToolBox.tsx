import { useDispatch } from 'react-redux';
import './ToolBox.css';
import { addItem } from '../../state/ItemsReducer';
import { ItemType } from '../../domain/WorkingArea';

export function ToolBox(): JSX.Element {
  const dispatch = useDispatch();

  function createItem(type: ItemType): void {
    dispatch(
      addItem({
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101),
        type
      })
    );
  }

  return (
    <div className="toolbox" data-testid="toolbox">
      {Object.values(ItemType).map((itemType) => (
        <div className="shape" key={itemType} onClick={(): void => createItem(itemType)}>
          <svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={`assets/shapes.svg#${itemType}`} />
          </svg>
        </div>
      ))}
    </div>
  );
}
