import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJson } from "../utils/fetchJsonHelper";
import Game from "../utils/Game";

function CreateGame() {
  const navigate = useNavigate();
  const [ gameName, setGameName ] = useState("");
  const [ playerName, setPlayerName ] = useState("");
  const [ err, setErr ] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Create the game on the server
      const data = await postJson("/game", { name: gameName, playerName });
      const game = new Game(data);
      // Update state with the new game information
      setGameName(game.name);
      // Navigate to the game
      navigate(`/game/${game.name}`);
    } catch(error) {
      // Update state with error information
      setErr(error.message);
      console.error(error);
    }
  }

  return (
    <form className="CreateGame" onSubmit={handleSubmit}>
      <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} className="largeToken" placeholder="Player name"></input>
      <input type="text" value={gameName} onChange={e => setGameName(e.target.value)} className="largeToken" placeholder="Generate name"></input>
      <button type="submit">New Game</button>
      <div className="errorHelpText">{err}</div>
    </form>
  );
}

export default CreateGame;
