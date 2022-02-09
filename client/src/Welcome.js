import CreateGame from "./game/CreateGame";

function Welcome() {
  return (
    <div>
      <header>
        <h1>Wordify</h1>
        <p>
        It's like Wordle but for teams of Shopifolk
        </p>
      </header>
      <CreateGame></CreateGame>
    </div>
  );
}

export default Welcome