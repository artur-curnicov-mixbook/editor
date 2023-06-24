import { Positionable } from '../domain/Positionable';

export function calculateSvgCoordinates(
  initialPosition: Positionable,
  deltaPosition: Positionable,
  svgRef: React.RefObject<SVGSVGElement>
): number[] {
  const screenX = initialPosition.x + deltaPosition.x;
  const screenY = initialPosition.y + deltaPosition.y;

  const svgCoordonates = mapScreenToSvgCoordinates(screenX, screenY, svgRef);

  return [svgCoordonates.x, svgCoordonates.y];
}

function mapScreenToSvgCoordinates(
  screenX: number,
  screenY: number,
  svgRef: React.RefObject<SVGSVGElement>
): SVGPoint {
  if (svgRef.current) {
    const svg = svgRef.current;
    const point = svg.createSVGPoint();
    point.x = screenX;
    point.y = screenY;

    const screenCTM = svg.getScreenCTM();
    if (screenCTM) {
      const svgPoint = point.matrixTransform(screenCTM.inverse());
      return svgPoint;
    }
  }

  throw Error('Can not map screen coordinates to SVG coordinates');
}
