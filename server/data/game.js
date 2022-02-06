import fs from "fs";
import shortid from "shortid";

const _wordsPath = "./data/game-words.json";

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

  constructor(numberOfTurns, name) {
    this.words = _getWords(numberOfTurns);
    this.name = name ? name : shortid.generate()
    this.players = [];
  }

}