import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { getJson } from "../utils/fetchJsonHelper";
import Game from "../utils/Game";


function PlayGame() {
  const params = useParams("name");
  // const navigate = useNavigate();
  const [ game, setGame ] = useState();
  const [ gameName, setGameName ] = useState(params.name);
  const [ playerName, setPlayerName ] = useState("");
  const [ err, setErr ] = useState();

  async function loadGame() {
    try {
      const data = await getJson(`/game/${gameName}`);
      const game = new Game(data);
      setGame(game);
      setGameName(game.name);
      setPlayerName(game.players[0].name);
    } catch(error) {
      // Update state with error information
      setErr(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    loadGame();
  }, [gameName]);

  return (
    <div id="game">
      <h3>Wordify {gameName}</h3>
      <h3>Player {playerName}</h3>
      <p>{JSON.stringify(game)}</p>
    </div>
  );
}

export default PlayGame;