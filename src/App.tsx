import {  Route, Routes, BrowserRouter  } from 'react-router-dom';
import ListPage from './Page/List';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
