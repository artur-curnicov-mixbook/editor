import './WorkingArea.css';
import { WorkingAreaElement } from '../../interfaces/WorkingArea/WorkingAreaElement.interface';
import { useDispatch, useSelector } from 'react-redux';
import { addCircle, addSquare, addTriangle } from '../../state/WorkingAreaElementReducer';
import { RootState } from '../../state';

const CIRCLE_SIZE = 3;
const SQUARE_SIZE = 5;
const TRIANGLE_SIZE = 6;

export function WorkingArea(): JSX.Element {
  const dispatch = useDispatch();

  const circles = useSelector((state: RootState) => state.workingAreaElements.circles);
  const squares = useSelector((state: RootState) => state.workingAreaElements.squares);
  const triangles = useSelector((state: RootState) => state.workingAreaElements.triangles);

  const createCircle = (): void => {
    dispatch(addCircle({ x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) }));
  };

  const createSquare = (): void => {
    dispatch(addSquare({ x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) }));
  };

  const createTriangle = (): void => {
    dispatch(
      addTriangle({ x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) })
    );
  };

  const getTrianglePoints = (x: number, y: number, size: number): string => {
    const height = (Math.sqrt(3) / 2) * size;
    const halfSize = size / 2;
    const halfHeight = height / 2;

    const point1 = `${x},${y - halfHeight}`;
    const point2 = `${x - halfSize},${y + halfHeight}`;
    const point3 = `${x + halfSize},${y + halfHeight}`;

    return `${point1} ${point2} ${point3}`;
  };

  return (
    <div className="working-area">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {circles.map((item: WorkingAreaElement, i: number) => (
          <circle key={`circle-${i}`} cx={item.x} cy={item.y} r={CIRCLE_SIZE} />
        ))}
        {squares.map((item: WorkingAreaElement, i: number) => (
          <rect
            key={`square-${i}`}
            x={item.x}
            y={item.y}
            width={SQUARE_SIZE}
            height={SQUARE_SIZE}
          />
        ))}
        {triangles.map((item: WorkingAreaElement, i: number) => (
          <polygon
            key={`triangle-${i}`}
            points={getTrianglePoints(item.x, item.y, TRIANGLE_SIZE)}
          />
        ))}
      </svg>

      <button onClick={createCircle}>Generate circle</button>
      <button onClick={createSquare}>Generate square</button>
      <button onClick={createTriangle}>Generate triangle</button>
    </div>
  );
}
