export default class Game {
  name;
  words;
  players;

  constructor(game) {
    Object.assign(this, game)
  }

  addPlayer(name) {
    const existingPlayer = this.players.find(p => p.name === name);
    if (existingPlayer) {
      throw new Error(`Player could not be added because a player already exists with the name: "${name}"`)
    }
    const newPlayer = { name, score: 0, plays: []};
    this.players.push(newPlayer);
  }

}