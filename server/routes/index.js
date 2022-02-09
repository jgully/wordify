import express from "express";
import { kebabCase } from "lodash-es";
import { getGame, createGame, updateGame } from "../data/gamesRepository.js";
import Game from "../data/game.js";

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
  const { name, numberOfTurns, playerName } = request.body;
  const game = new Game({ name, numberOfTurns }, playerName);
  createGame(game);
  response.send(game);
});

router.put("/game", (request, response, next) => {
  const game = request.body;
  updateGame(game);
  response.send(game);
});

export default router;
