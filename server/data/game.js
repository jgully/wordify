import fs from "fs";
import shortid from "shortid";
import { kebabCase } from "lodash-es";

const _wordsPath = "./data/game-words.json";
const _defaultNumberOfTurns = 3;

function _getWords(numberOfTurns) {
  const words = JSON.parse(fs.readFileSync(_wordsPath));
  const selectedWords = []
  for (let i=0; i<numberOfTurns; i++) {
    selectedWords.push(words[Math.floor(Math.random()*words.length)]);
  }
  return selectedWords;
}

export default class Game {
  name;
  words;
  players;

  constructor(game, playerName) {
    Object.assign(this, game);
    this.numberOfTurns = this.numberOfTurns || _defaultNumberOfTurns;
    this.name = kebabCase(this.name) || shortid.generate();
    this.words = this.words || _getWords(this.numberOfTurns);
    this.players = this.players || [];
    if (playerName) {
      this.addPlayer(playerName);
    }

    this.validateGame();
  }

  validateGame() {
    if (!parseInt(this.numberOfTurns)) {
      throw new Error(`NumberOfTurns "${this.numberOfTurns}" must be a valid number.`);
    }
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