import { Routes, Route } from 'react-router-dom'
import BoardsDisplay from './pages/BoardsDisplay';
import PostsDisplay from './pages/PostsDisplay';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BoardsDisplay />} />
        <Route path='/posts/:boardId' element={<PostsDisplay />} />
      </Routes>
    </>
  )
}

export default App;
