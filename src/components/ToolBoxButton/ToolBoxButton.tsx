import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ItemType } from '../../domain/ItemType';
import { addItem } from '../../state/ItemsReducer';

interface Props {
  itemType: ItemType;
}

export function ToolBoxButton(props: Props): JSX.Element {
  const { itemType } = props;

  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(
      addItem({
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101),
        type: itemType
      })
    );
  }, [itemType]);

  return (
    <div className="shape" onClick={handleClick}>
      <svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`assets/shapes.svg#${itemType}`} />
      </svg>
    </div>
  );
}
