import { useContext } from 'react';

import DisplayContext from './DisplayContext';
import { paramControls } from './webgl/main';
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
        return 'top-1/2';
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
    <div className={`hologram w-5/6 flex-none m-8 p-8 text-white fixed ${styleByDisplayState()} transition-all duration-500`} onClick={() => openControlPanel()}>
      <h2 className='text-2xl font-medium mb-6'>Control Panel</h2>
      <button onClick={(event) => {event.stopPropagation(); toggleControlPanel()}} className='absolute right-5 top-4 text-white'>{`${displayState === DisplayState.ControlPanel ? 'Close' : 'Open'} Control Panel`}</button>
      <div className="px-8">
        {paramControls.map((control) => {
          return (
            <div className="flex">
              <span className="flex-none">{control.name}</span>
              {/* TODO: make a slider React component. Dealing with the vanilla one is ridiculous. */}
              <div className="flex-grow"/>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                defaultValue={control.startingValue}
                onChange={e => control.set(parseFloat(e.target.value))}
                className="flex-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ControlPanel;
