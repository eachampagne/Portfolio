import { useEffect, useContext } from 'react';

import DisplayContext from './DisplayContext';
import DisplayState from '../types/displayState';

import runWebgl from './webgl/main';

function Galaxy () {
  const { displayState, setDisplayState } = useContext(DisplayContext);

  useEffect(() => {
    runWebgl();
    document.getElementById('galaxy')?.addEventListener('mousedown', () => {
      setDisplayState(d => {
        switch (d) {
          case DisplayState.ControlPanel:
            return DisplayState.ControlPanel;
          case DisplayState.WebGLError:
            return DisplayState.WebGLError;
          default:
            return DisplayState.Galaxy;
        }
      });
    });
  }, []);

  return (
    <canvas id="galaxy" className="size-full fixed" ></canvas>
  );
}

export default Galaxy;