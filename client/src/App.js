
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Lobby from './pages/Lobby.js'
import CodeBlockPage from './pages/CodeBlockPage.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Lobby />}
            />
            <Route path="/codeblockpage/:id" element={<CodeBlockPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
