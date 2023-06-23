import './ToolBox.css';

import { ItemType } from '../../domain/ItemType';
import { ToolBoxShape } from '../ToolBoxShape/ToolBoxShape';

export function ToolBox(): JSX.Element {
  return (
    <div className="toolbox" data-testid="toolbox">
      {Object.values(ItemType).map((itemType) => (
        <ToolBoxShape key={itemType} itemType={itemType} />
      ))}
    </div>
  );
}
