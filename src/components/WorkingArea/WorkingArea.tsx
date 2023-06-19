import { useState } from 'react';
import './WorkingArea.css';
import { WorkingAreaElement } from '../../interfaces/WorkingArea/WorkingAreaElement.interface';

const CIRCLE_SIZE = 3;
const SQUARE_SIZE = 5;
const TRIANGLE_SIZE = 6;

export function WorkingArea(): JSX.Element {
  const [circles, setCircles] = useState<WorkingAreaElement[]>([]);
  const [squares, setSquares] = useState<WorkingAreaElement[]>([]);
  const [triangles, setTriangles] = useState<WorkingAreaElement[]>([]);

  const addCircle = (): void => {
    setCircles([
      ...circles,
      { x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) }
    ]);
  };

  const addSquare = (): void => {
    setSquares([
      ...squares,
      { x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) }
    ]);
  };

  const addTriangle = (): void => {
    setTriangles([
      ...triangles,
      { x: Math.floor(Math.random() * 101), y: Math.floor(Math.random() * 101) }
    ]);
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

      <button onClick={addCircle}>Generate circle</button>
      <button onClick={addSquare}>Generate square</button>
      <button onClick={addTriangle}>Generate triangle</button>
    </div>
  );
}
