import { useDispatch } from 'react-redux';
import './ToolBox.css';
import { WorkingAreaElementType } from '../../domain/WorkingArea';
import { addElement } from '../../state/WorkingAreaElementReducer';

const CIRCLE_SIZE = 3;
const SQUARE_SIZE = 5;
const TRIANGLE_SIZE = 6;

export const ToolBox = (): JSX.Element => {
  const dispatch = useDispatch();

  const createSquare = (width: number): void => {
    dispatch(
      addElement({
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101),
        width,
        type: WorkingAreaElementType.square
      })
    );
  };

  const createCircle = (radius: number): void => {
    dispatch(
      addElement({
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101),
        radius,
        type: WorkingAreaElementType.circle
      })
    );
  };

  const createTriangle = (size: number): void => {
    dispatch(
      addElement({
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101),
        size,
        type: WorkingAreaElementType.triangle
      })
    );
  };

  return (
    <div className="toolbox" data-testid="toolbox">
      <div className="shape" onClick={(): void => createSquare(SQUARE_SIZE)}>
        <svg
          width="50"
          height="50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <use xlinkHref="assets/shapes.svg#square" />
        </svg>
      </div>
      <div className="shape" onClick={(): void => createCircle(CIRCLE_SIZE)}>
        <svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <use xlinkHref="assets/shapes.svg#circle" />
        </svg>
      </div>
      <div className="shape" onClick={(): void => createTriangle(TRIANGLE_SIZE)}>
        <svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <use xlinkHref="assets/shapes.svg#triangle" />
        </svg>
      </div>
    </div>
  );
};
