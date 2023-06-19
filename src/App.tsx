import { Provider } from 'react-redux';
import './App.css';
import { ToolBox } from './components/ToolBox/ToolBox';
import { WorkingArea } from './components/WorkingArea/WorkingArea';
import { store } from './state';

export const App = (): JSX.Element => {
  return (
    <div className="app">
      <Provider store={store}>
        <ToolBox />
        <WorkingArea />
      </Provider>
    </div>
  );
};
