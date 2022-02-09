import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJson, putJson } from "../utils/fetchJsonHelper";
import Game from "../utils/Game";

function JoinGame() {
  const navigate = useNavigate();
  const [ gameName, setGameName ] = useState("");
  const [ playerName, setPlayerName ] = useState("");
  const [ err, setErr ] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Validate the game exists
      const data = await getJson(`/game/${gameName}`);
      const game = new Game(data);
      // Update state with the new game information
      setGameName(game.name);
      // Add the player and update the game
      game.addPlayer(playerName);
      await putJson(`/game`, game);
      // Navigate to the game
      navigate(`/game/${game.name}`);
    } catch(error) {
      // Update state with error information
      setErr(error.message);
      console.error(error);
    }
  }

  return (
    <form className="JoinGame" onSubmit={handleSubmit}>
      <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} className="largeToken" placeholder="Player name"></input>
      <input type="text" value={gameName} onChange={e => setGameName(e.target.value)} className="largeToken" placeholder="Game name"></input>
      <button type="submit">Join Game</button>
      <div className="errorHelpText">{err}</div>
    </form>
  );
}

export default JoinGame;
