import './ToolBoxShape.css';
import { ItemType } from '../../domain/ItemType';
import { Draggable } from '../Draggable/Draggable';

interface Props {
  itemType: ItemType;
}

export function ToolBoxShape(props: Props): JSX.Element {
  const { itemType } = props;

  return (
    <div className="shape">
      <Draggable name={itemType} id={itemType}>
        <svg
          className="draggable-element"
          width="50"
          height="50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <use xlinkHref={`assets/shapes.svg#${itemType}`} />
        </svg>
      </Draggable>
    </div>
  );
}
