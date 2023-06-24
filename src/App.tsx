import { Provider } from 'react-redux';
import './App.css';
import { ToolBox } from './components/ToolBox/ToolBox';
import { WorkingArea } from './components/WorkingArea/WorkingArea';
import { DndContext } from '@dnd-kit/core';
import { store } from './state';

export function App(): JSX.Element {
  return (
    <div className="app">
      <Provider store={store}>
        <DndContext>
          <ToolBox />
          <WorkingArea />
        </DndContext>
      </Provider>
    </div>
  );
}
