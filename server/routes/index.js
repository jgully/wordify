import express from "express";
import { getGame, createGame, updateGame } from "../data/gamesRepository.js";
import Game from "../data/game.js";

const defaultNumberOfTurns = 3;
const router = express.Router();

router.get("/game/:name", async (request, response, next) => {
  try {
    const name = request.params.name;
    if (!name) {
      throw new Error(`Name parameter required when requesting a game: (GET) /game/:name`);
    }

    const game = getGame(name);
    response.send(game);
  } catch (error) {
   return next(error);
  }
});

router.post("/game", async (request, response, next) => {
  try {
    const name = request.body.name;
    const numberOfTurns = request.body.numberOfTurns || defaultNumberOfTurns;
    if (!parseInt(numberOfTurns)) {
      throw new Error(`NumberOfTurns parameter "${numberOfTurns}" must be a valid number when creating a new game: (POST) /game?numberOfTurns=3`);
    }
    const game = new Game(numberOfTurns, name);
    createGame(game);
    response.send(game);
  } catch(error) {
    return next(error);
  }
});

router.put("/game", async (request, response, next) => {
  try {
    const game = request.body;
    updateGame(game);
    response.send(game);
  } catch(error) {
    return next(error);
  }
});

export default router;
