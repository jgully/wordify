import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./Welcome";
import JoinGame from "./game/JoinGame";
import PlayGame from "./game/PlayGame";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome></Welcome>} />
          <Route path="/game">
            <Route index element={<JoinGame></JoinGame>} />
            <Route path=":name" element={<PlayGame></PlayGame>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
