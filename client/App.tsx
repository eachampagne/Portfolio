import Galaxy from './Galaxy';

function App() {

  return (
    <>
      <Galaxy />
      <div className='flex'>
        <div className='hologram w-64 h-96 flex-1 m-8'>
          <h1 className='text-white'>Rendering!</h1>
        </div>
      </div>
    </>
  )
}

export default App;
