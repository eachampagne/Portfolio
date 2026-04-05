import { useEffect, useEffectEvent, useContext } from 'react';

import DisplayContext from './DisplayContext';
import DisplayState from '../types/displayState';

import runWebgl from './webgl/main';

function Galaxy () {
  const { setDisplayState } = useContext(DisplayContext);

  const webglErrorCallback = () => {
    setDisplayState(DisplayState.WebGLError);
  }

  // useEffectEvent removes webglErrorCallback and setDisplayState effect dependencies
  // this should only trigger once, and should *not* rerun even if the component rerenders or they change some other way
  const onMount = useEffectEvent(() => {
    runWebgl(webglErrorCallback);
    // TODO: does this need a cleanup function?
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
  });

  useEffect(() => {
    onMount();
  }, []);

  return (
    <canvas id="galaxy" className="size-full fixed" ></canvas>
  );
}

export default Galaxy;