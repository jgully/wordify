import { useState } from "react";
import { postJson } from "../utils/fetchJsonHelper";

function CreateGame() {
  const initialState = {};
  const [ game, setGame ] = useState(initialState);
  const [ name, setName ] = useState("");
  const [ err, setErr ] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Create the game on the server
      const response = await postJson("/game", { name });
      const newGame = response;
      // Update state with the new game information
      setName(newGame.name);
      setGame(newGame);  
      setErr();
    } catch(error) {
      // Update state with error information
      setGame(initialState)
      setErr(error.message);
      console.error(error);
    }
  }

  return (
    <form className="CreateGame" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} className="largeToken" placeholder="Generate name"></input>
      <button type="submit">New Game</button>
      <div className="errorHelpText">{err}</div>
    </form>
  );
}

export default CreateGame