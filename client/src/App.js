
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Lobby from './pages/Lobby.js'
import CodeBlockPage from './pages/CodeBlockPage.js'
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar className="navbar"/>
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
