import { useContext } from 'react';

import projectsAll from './data/projects.json';

import DisplayContext from './DisplayContext';
import Project from './Project';
import DisplayState from '../types/displayState';

const projects = projectsAll.filter(project => !project.hidden);

function Content () {
  const { displayState } = useContext(DisplayContext);

  const styleByDisplayState = () => {
    switch (displayState) {
      case DisplayState.Content:
      case DisplayState.WebGLError:
        return 'top-0';
        break;
      case DisplayState.ControlPanel:
      case DisplayState.Galaxy:
        return 'top-full';
        break;
    }
  }

  // TODO: if I add tabs, make sure the height animates smoothly when switching between them
  return (
    <div className={`hologram w-5/6 flex-none m-8 p-8 relative ${styleByDisplayState()} transition-all duration-500`}>
      <h2 className='text-white text-2xl font-medium'>Projects</h2>
      {projects.map(project => <Project project={project} />)}
    </div>

  );
}

export default Content;
