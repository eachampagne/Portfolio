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

  const openControlPanel = () => {
    setDisplayState(d => {
      if (d === DisplayState.WebGLError) {
        return DisplayState.WebGLError;
      } else {
        return DisplayState.ControlPanel;
      }
    });
  }

  const toggleControlPanel = () => {
    setDisplayState(d => {
      switch (d) {
        case DisplayState.ControlPanel:
          return DisplayState.Galaxy;
        case DisplayState.Galaxy:
          return DisplayState.ControlPanel;
        // the button shouldn't be accessible in Content or WebGLError mode
        default:
          return d;
      }
    })
  }

  return (
    <div className={`hologram w-5/6 h-96 flex-none m-8 fixed ${styleByDisplayState()} transition-all duration-500`} onClick={() => openControlPanel()}>
      <h1 className='text-white'>Control Panel!</h1>
      <button onClick={(event) => {event.stopPropagation(); toggleControlPanel()}} className='bg-blue-700 text-white'>{`${displayState === DisplayState.ControlPanel ? 'Close' : 'Open'} Control Panel`}</button>
    </div>

  );
}

export default ControlPanel;
