import { Circle } from '../components/shapes/Circle';
import { Square } from '../components/shapes/Square';
import { Triangle } from '../components/shapes/Triangle';
import { Item } from '../domain/WorkingArea';

export const configuration: ApplicationConfiguration = {
  square: {
    width: 5,
    viewComponent: Square
  },
  circle: {
    radius: 3,
    viewComponent: Circle
  },
  triangle: {
    size: 6,
    viewComponent: Triangle
  }
};

type ItemView = (props: { item: Item }) => JSX.Element;

interface ApplicationConfiguration {
  square: {
    width: number;
    viewComponent: ItemView;
  };
  circle: {
    radius: number;
    viewComponent: ItemView;
  };
  triangle: {
    size: number;
    viewComponent: ItemView;
  };
}
