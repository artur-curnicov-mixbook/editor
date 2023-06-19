import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './state';
import { App } from './App';
import '@testing-library/jest-dom';

describe('App', () => {
  test('renders ToolBox and WorkingArea components', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const toolBoxElement = getByTestId('toolbox');
    const workingAreaElement = getByTestId('workingarea');

    expect(toolBoxElement).toBeInTheDocument();
    expect(workingAreaElement).toBeInTheDocument();
  });
});
