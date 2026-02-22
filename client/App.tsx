import Galaxy from './Galaxy';

function App() {

  return (
    <>
      <div className='flex'>
        <div className='hologram w-64 h-96 flex-1 m-8'>
          <h1 className='text-white'>Rendering!</h1>
        </div>
      </div>
      <Galaxy />
    </>
  )
}

export default App;
