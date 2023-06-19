import { useDispatch } from 'react-redux';
import { addCircle, addSquare, addTriangle } from '../../state/WorkingAreaElementReducer';
import './ToolBox.css';

export function ToolBox(): JSX.Element {
  const dispatch = useDispatch();

  const createSquare = (): void => {
    dispatch(addSquare({ x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) }));
  };

  const createCircle = (): void => {
    dispatch(addCircle({ x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) }));
  };

  const createTriangle = (): void => {
    dispatch(
      addTriangle({ x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) })
    );
  };

  return (
    <div className="toolbox">
      <div className="shape" onClick={createSquare}>
        <svg
          width="50"
          height="50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <use xlinkHref="assets/shapes.svg#square" />
        </svg>
      </div>
      <div className="shape" onClick={createCircle}>
        <svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <use xlinkHref="assets/shapes.svg#circle" />
        </svg>
      </div>
      <div className="shape" onClick={createTriangle}>
        <svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <use xlinkHref="assets/shapes.svg#triangle" />
        </svg>
      </div>
    </div>
  );
}
