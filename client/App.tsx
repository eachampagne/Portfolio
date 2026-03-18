import { useState } from 'react';

import Galaxy from './Galaxy';
import Header from './Header';
import Content from './Content';
import ControlPanel from './ControlPanel';
import DisplayContext from './DisplayContext';

import DisplayState from '../types/displayState';

function App() {
  const [displayState, setDisplayState] = useState(DisplayState.Content);

  return (
    <DisplayContext value = {{displayState, setDisplayState}} >
      <Galaxy />
      <div className='flex flex-col items-center'>
        <Header />
        <Content />
        <ControlPanel />
      </div>
    </DisplayContext>
  )
}

export default App;
