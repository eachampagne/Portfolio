import { useState, useEffect } from 'react';

import Galaxy from './Galaxy';
import Header from './Header';
import Content from './Content';
import ControlPanel from './ControlPanel';
import DisplayContext from './DisplayContext';

import DisplayState from '../types/displayState';

function App() {
  const [displayState, setDisplayState] = useState(DisplayState.Content);

  // set body overflow according to the display state
  useEffect(() => {
    switch (displayState) {
      case DisplayState.Content:
      case DisplayState.WebGLError:
        document.body.style.overflow = 'auto';
        break;
      case DisplayState.ControlPanel:
      case DisplayState.Galaxy:
        document.body.style.overflow = 'hidden';
        // make sure not stuck somewhere besides the top
        // trying to do it synchronously didn't work the first time for some reason, but did on the next displayState change
        setTimeout(() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'}), 0);
        break;
    }
  }, [displayState]);

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
