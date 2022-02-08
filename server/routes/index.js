import express from "express";
import { kebabCase } from "lodash-es";
import { getGame, createGame, updateGame } from "../data/gamesRepository.js";
import Game from "../data/game.js";

const defaultNumberOfTurns = 3;
const router = express.Router();

router.get("/game/:name", (request, response, next) => {
  const name = request.params.name;
  if (!name) {
    throw new Error(`Name parameter required when requesting a game: (GET) /game/:name`);
  }

  const game = getGame(name);
  response.send(game);
});

router.post("/game", (request, response, next) => {
  const name = kebabCase(request.body.name);
  const numberOfTurns = request.body.numberOfTurns || defaultNumberOfTurns;
  if (!parseInt(numberOfTurns)) {
    throw new Error(`NumberOfTurns parameter "${numberOfTurns}" must be a valid number when creating a new game: (POST) /game?numberOfTurns=3`);
  }
  const game = new Game(numberOfTurns, name);
  createGame(game);
  response.send(game);
});

router.put("/game", (request, response, next) => {
  const game = request.body;
  updateGame(game);
  response.send(game);
});

export default router;
