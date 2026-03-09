import { useEffect } from 'react';

import runWebgl from './webgl/main';

function Galaxy () {


  useEffect(() => {
    runWebgl();
  }, []);

  return (
    <canvas id="galaxy" className="size-full fixed"></canvas>
  );
}

export default Galaxy;