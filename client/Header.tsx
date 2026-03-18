import { useState, useEffect, useContext } from 'react';

import DisplayContext from './DisplayContext';

import DisplayState from '../types/displayState';

function Header () {
  const { displayState } = useContext(DisplayContext);

  const [top, setTop] = useState('top-0');

  useEffect(() => {
    switch (displayState) {
      case DisplayState.Content:
      case DisplayState.WebGLError:
        setTop('top-0');
        break;
      case DisplayState.ControlPanel:
      case DisplayState.Galaxy:
        setTop('top-[-50]');
        break;
    }

  }, [displayState])

  return (
    <div className={`hologram w-5/6 h-96 flex-none m-8 absolute ${top} transition-all duration-500`}>
      <h1 className='text-white'>Header!</h1>
    </div>

  );
}

export default Header;
