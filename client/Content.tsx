import { useState, useContext } from 'react';

import { DisplayContext } from './DisplayContext';

import DisplayState from '../types/displayState';

function Content () {
  const { displayState, setDisplayState } = useContext(DisplayContext);
  const [left, setLeft] = useState('left-0');

  return (
    <div className={`hologram w-5/6 h-96 flex-none m-8 absolute ${left} transition-all duration-500`}>
      <h1 className='text-white'>Content!</h1>
      <button onClick={() => {setDisplayState(DisplayState.Galaxy); setLeft('left-50')}} className='bg-blue-700 text-white'>Galaxy</button>
      <button onClick={() => {setDisplayState(DisplayState.Content); setLeft('left-0')}} className='bg-blue-700 text-white'>Content</button>
      <button onClick={() => setDisplayState(DisplayState.ControlPanel)} className='bg-blue-700 text-white'>ControlPanel</button>
      <button onClick={() => setDisplayState(DisplayState.WebGLError)} className='bg-blue-700 text-white'>WebGLError</button>
    </div>

  );
}

export default Content;
