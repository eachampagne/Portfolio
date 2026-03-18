import { useEffect, useContext } from 'react';

import DisplayContext from './DisplayContext';
import DisplayState from '../types/displayState';

import runWebgl from './webgl/main';

function Galaxy () {
  const { displayState, setDisplayState } = useContext(DisplayContext);

  useEffect(() => {
    runWebgl();
    document.getElementById('galaxy')?.addEventListener('click', () => {
      setDisplayState(DisplayState.Galaxy);
    });
  }, []);

  return (
    <canvas id="galaxy" className="size-full fixed" ></canvas>
  );
}

export default Galaxy;