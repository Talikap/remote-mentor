
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Lobby from './pages/Lobby.js'

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
