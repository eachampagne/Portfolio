import { useEffect } from 'react';

import runWebgl from './webgl/main';

function Galaxy () {


  useEffect(() => {
    runWebgl();
  }, []);

  return (
    <canvas id="galaxy" className="w-[480] h-[360]"></canvas>
  );
}

export default Galaxy;