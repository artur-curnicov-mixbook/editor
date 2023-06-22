import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { configuration } from '../../configuration/configuration';

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
          const Shape = configuration[item.type].viewComponent;
          return <Shape key={`${item.type}-${i}`} item={item} />;
        })}
      </svg>
    </div>
  );
}
