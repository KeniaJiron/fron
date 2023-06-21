import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Students from "./components/Students";
import "./App.css";
import Gender from "./components/Genero";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="nav-bar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/students" className="nav-link">
                Estudiantes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/genero" className="nav-link">
                Género
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/genero" element={<Gender />} />
      </Routes>
    </Router>
  );
}

export default App;
