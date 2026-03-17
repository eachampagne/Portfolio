import Galaxy from './Galaxy';
import Header from './Header';
import Content from './Content';
import ControlPanel from './ControlPanel';
import DisplayContextProvider from './DisplayContext';

function App() {
  return (
    <DisplayContextProvider>
      <Galaxy />
      <div className='flex flex-col items-center relative'>
        <Header />
        <Content />
        <ControlPanel />
      </div>
    </DisplayContextProvider>
  )
}

export default App;
