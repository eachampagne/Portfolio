import Galaxy from './Galaxy';
import Header from './Header';
import Content from './Content';
import ControlPanel from './ControlPanel';

function App() {

  return (
    <>
      <Galaxy />
      <div className='flex flex-col items-center'>
        <Header />
        <Content />
        <ControlPanel />
      </div>
    </>
  )
}

export default App;
