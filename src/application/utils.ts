export function mapScreenToSvgCoordinates(
  screenX: number,
  screenY: number,
  svgElement: SVGSVGElement
): SVGPoint {
  const point = svgElement.createSVGPoint();

  point.x = screenX;
  point.y = screenY;

  const screenCTM = svgElement.getScreenCTM();

  if (!screenCTM) throw new Error('Unable to get screen CTM');

  const svgPoint = point.matrixTransform(screenCTM.inverse());

  return svgPoint;
}
