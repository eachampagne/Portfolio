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
  };

  const styleOpenButtonByDisplayState = () => {
    switch (displayState) {
      case DisplayState.Content:
      case DisplayState.WebGLError:
        return 'invisible';
        break;
      case DisplayState.ControlPanel:
      case DisplayState.Galaxy:
        return '';
        break;
    }
  };

  const handleHeaderClick = () => {
    setDisplayState(d => {
      if (d === DisplayState.WebGLError) {
        return DisplayState.WebGLError;
      } else {
        return DisplayState.Content;
      }
    })
  };

  return (
    <div className={`hologram w-5/6 flex-none m-8 p-8 relative text-white ${styleByDisplayState()} transition-all duration-500`} onClick={() => handleHeaderClick()}>
      <span className="">
        <a href="https://github.com/eachampagne" className="mr-1 underline text-[cyan] visited:text-[#00DDDD]">GitHub</a>
        <a href="https://www.linkedin.com/in/elizabeth-champagne/" className="my-1 underline text-[cyan] visited:text-[#00DDDD]">LinkedIn</a>
        <a href="https://dev.to/eachampagne" className="ml-1 underline text-[cyan] visited:text-[#00DDDD]">Dev.to Blog</a>
      </span>
      <h1 className="text-4xl mt-6 relative transition-all duration-500">Elizabeth Champagne</h1>
      <button className={`absolute bottom-4 right-5 ${styleOpenButtonByDisplayState()}`}>Back to Content</button>
    </div>

  );
}

export default Header;
