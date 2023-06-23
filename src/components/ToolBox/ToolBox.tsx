import './ToolBox.css';

import { ItemType } from '../../domain/ItemType';
import { ToolBoxButton } from '../ToolBoxButton/ToolBoxButton';

export function ToolBox(): JSX.Element {
  return (
    <div className="toolbox" data-testid="toolbox">
      {Object.values(ItemType).map((itemType) => (
        <ToolBoxButton key={itemType} itemType={itemType} />
      ))}
    </div>
  );
}
