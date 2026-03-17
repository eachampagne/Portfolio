import { useState, createContext, type ReactNode } from 'react';

import DisplayState from '../types/displayState';

export const DisplayContext = createContext({
  displayState: DisplayState.Content,
  setDisplayState: (state: DisplayState) => { if (state) return }
});

function DisplayContextProvider({children}: {children: ReactNode}) {
  const [displayState, setDisplayState] = useState(DisplayState.Content);

  return (
    <DisplayContext value={{
      displayState,
      setDisplayState
    }}>
      {children}
    </DisplayContext>
  );
}

export default DisplayContextProvider;