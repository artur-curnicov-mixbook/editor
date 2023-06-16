import './App.css';
import { ToolBox } from './components/ToolBox/ToolBox';
import { WorkingArea } from './components/WorkingArea/WorkingArea';

export function App(): JSX.Element {
  return (
    <div className="app">
      <ToolBox />
      <WorkingArea />
    </div>
  );
}
