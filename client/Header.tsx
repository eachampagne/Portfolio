import { useContext } from 'react';

import DisplayContext from './DisplayContext';
import DisplayState from '../types/displayState';

function Header () {
  const { displayState, setDisplayState } = useContext(DisplayContext);

  const styleByDisplayState = () => {
    switch (displayState) {
      case DisplayState.Content:
      case DisplayState.WebGLError:
        return 'top-0';
        break;
      case DisplayState.ControlPanel:
      case DisplayState.Galaxy:
        return 'top-[-96]';
        break;
    }
  }

  return (
    <div className={`hologram w-5/6 h-96 flex-none m-8 relative ${styleByDisplayState()} transition-all duration-500`} onClick={() => setDisplayState(DisplayState.Content)}>
      <h1 className='text-white'>Header!</h1>
    </div>

  );
}

export default Header;
