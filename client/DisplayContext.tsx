import { createContext } from 'react';

import DisplayState from '../types/displayState';

const DisplayContext = createContext({
  displayState: DisplayState.Content,
  setDisplayState: (state: DisplayState) => { if (state) return }
});

export default DisplayContext;