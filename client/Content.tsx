import { useContext } from 'react';

import DisplayContext from './DisplayContext';
import DisplayState from '../types/displayState';

function Content () {
  const { displayState, setDisplayState } = useContext(DisplayContext);

  const styleByDisplayState = () => {
    switch (displayState) {
      case DisplayState.Content:
      case DisplayState.WebGLError:
        return 'top-0';
        break;
      case DisplayState.ControlPanel:
      case DisplayState.Galaxy:
        return 'top-full';
        break;
    }
  }

  return (
    <div className={`hologram w-5/6 h-96 flex-none m-8 relative ${styleByDisplayState()} transition-all duration-500`}>
      <h1 className='text-white'>Content!</h1>
      <button onClick={() => setDisplayState(DisplayState.Galaxy)} className='bg-blue-700 text-white'>Galaxy</button>
      <button onClick={() => setDisplayState(DisplayState.Content)} className='bg-blue-700 text-white'>Content</button>
      <button onClick={() => setDisplayState(DisplayState.ControlPanel)} className='bg-blue-700 text-white'>ControlPanel</button>
      <button onClick={() => setDisplayState(DisplayState.WebGLError)} className='bg-blue-700 text-white'>WebGLError</button>
    </div>

  );
}

export default Content;
