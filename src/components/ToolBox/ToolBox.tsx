import './ToolBox.css';

import { ItemType } from '../../domain/ItemType';
import { ToolBoxShape } from '../ToolBoxShape/ToolBoxShape';
import { workingAreaSlice } from '../../state/workingAreaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../state';

export function ToolBox(): JSX.Element {
  const dispatch = useDispatch();
  const { selectedItemIndex } = useSelector((state: RootState) => state.workingAreaItems);

  const handleOnClickToFront = useCallback(() => {
    dispatch(workingAreaSlice.actions.changeSelectedItemZIndex('front'));
  }, [dispatch]);

  const handleOnClickToBack = useCallback(() => {
    dispatch(workingAreaSlice.actions.changeSelectedItemZIndex('back'));
  }, [dispatch]);

  return (
    <div className="toolbox" data-testid="toolbox">
      {Object.values(ItemType).map((itemType) => (
        <ToolBoxShape key={itemType} itemType={itemType} />
      ))}
      {selectedItemIndex !== undefined && (
        <div className="toolbox-option-group">
          <svg
            className="toolbox-option-img"
            onClick={handleOnClickToFront}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={`assets/toolbox-options.svg#bring-to-front`} />
          </svg>
          <svg
            className="toolbox-option-img"
            onClick={handleOnClickToBack}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={`assets/toolbox-options.svg#send-to-back`} />
          </svg>
        </div>
      )}
    </div>
  );
}
