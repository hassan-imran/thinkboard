import { Route, Routes } from "react-router";
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';

const App = () => {
  return (
    <div className="relative h-full w-full  ">
      {/* <button onClick={() => toast.success("Hello Toast!")} className='btn btn-soft'>Toast me!</button> */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#605dFF40_100%)]" />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/notes/:id' element={<NoteDetailPage />} />
        
      </Routes>
    </div>
  )
}

export default App