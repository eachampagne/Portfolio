import { createContext } from 'react';

import DisplayState from '../types/displayState';

const DisplayContext = createContext({
  displayState: DisplayState.Content,
  setDisplayState: (() => undefined) as React.Dispatch<React.SetStateAction<DisplayState>>
});

export default DisplayContext;