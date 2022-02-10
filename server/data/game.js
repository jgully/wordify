import fs from "fs";
import { customAlphabet } from "nanoid";
import { kebabCase, defaultsDeep } from "lodash-es";

const config = {
  fileNameLength: 6,
  numberOfTurns: 3,
  wordsPath: "./data/game-words.json"
}

const _defaultGame = {
  name: "",
  turns: config.numberOfTurns,
  turn: 0,
  word: "",
  words: [],
  players: [],
}

const _defaultPlayer = {
  name: "",
  plays: [],
  score: 0
}

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", config.fileNameLength);

function _getWords(turns) {
  const words = JSON.parse(fs.readFileSync(config.wordsPath));
  const selectedWords = []
  for (let i=0; i<turns; i++) {
    selectedWords.push(words[Math.floor(Math.random()*words.length)]);
  }
  return selectedWords;
}

export default class Game {

  constructor(game, playerName) {
    // Create the game using the specified values and fallback to defaults
    // Generate a random name if one is not specified
    // Add a player if one is specified
    const newGame = defaultsDeep(game, _defaultGame);
    Object.assign(this, newGame);

    if (!this.name) {
      this.name = nanoid();
    }

    if (playerName) {
      this.addPlayer(playerName);
    }

    this.validateGame();
  }

  validateGame() {
    if (!parseInt(this.turns)) {
      throw new Error(`The number of turns must be a valid number: ${this.turns}`);
    }
  }

  addPlayer(name) {
    const existingPlayer = this.players.find(p => p.name === name);
    if (existingPlayer) {
      throw new Error(`Player could not be added because a player already exists with the name: "${name}"`)
    }
    const newPlayer = defaultsDeep({ name }, _defaultPlayer);
    this.players.push(newPlayer);
  }

}