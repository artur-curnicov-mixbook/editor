import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import './WorkingArea.css';
import { Square } from '../shapes/Square';
import { Circle } from '../shapes/Circle';
import { Triangle } from '../shapes/Triangle';
import { WorkingAreaElement, WorkingAreaElementType } from '../../domain/WorkingArea';

interface ShapeParameters {
  item: WorkingAreaElement;
}

const componentMapping: Record<
  WorkingAreaElementType,
  (props: { item: WorkingAreaElement }) => JSX.Element
> = {
  [WorkingAreaElementType.circle]: Circle as (props: ShapeParameters) => JSX.Element,
  [WorkingAreaElementType.square]: Square as (props: ShapeParameters) => JSX.Element,
  [WorkingAreaElementType.triangle]: Triangle as (props: ShapeParameters) => JSX.Element
};

export const WorkingArea = (): JSX.Element => {
  const elements = useSelector((state: RootState) => state.workingAreaElements.elements);

  return (
    <div className="working-area" data-testid="workingarea">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {elements.map((item, i) => {
          const Shape = componentMapping[item.type];
          return <Shape key={`${item.type}-${i}`} item={item} />;
        })}
      </svg>
    </div>
  );
};
