import { useState, useEffect, useContext } from 'react';

import DisplayContext from './DisplayContext';
import DisplayState from '../types/displayState';

function ControlPanel () {
  const { displayState, setDisplayState } = useContext(DisplayContext);

  const styleByDisplayState = () => {
    switch (displayState) {
      case DisplayState.Content:
      case DisplayState.WebGLError:
        return 'top-full';
        break;
      case DisplayState.ControlPanel:
        return 'top-5/6';
        break;
      case DisplayState.Galaxy:
        return 'top-7/8';
        break;
    }
  }

  return (
    <div className={`hologram w-5/6 h-96 flex-none m-8 absolute ${styleByDisplayState()} transition-all duration-500`} onClick={() => setDisplayState(DisplayState.ControlPanel)}>
      <h1 className='text-white'>Control Panel!</h1>
    </div>

  );
}

export default ControlPanel;
