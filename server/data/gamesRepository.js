import fs from "fs";

export function getGame(name) {
  const filePath = getGameFilePath(name);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Game does not exist with the name "${name}". Please provide the name of an existing game.`);
  }
  const gameString = fs.readFileSync(filePath);
  try {
    const game = JSON.parse(gameString);
    return game;  
  } catch(error) {
    throw new Error(`Game file may be corrupted. Please ensure the game is valid JSON: ${filePath}`);
  }
}

export function createGame(game) {
  const filePath = getGameFilePath(game.name);
  if (fs.existsSync(filePath)) {
    throw new Error(`Game already exists with the name "${game.name}". Please provide a new name.`);
  }
  const gameString = JSON.stringify(game);
  fs.writeFileSync(filePath, gameString);
  return game;
}

export function updateGame(game) {
  const filePath = getGameFilePath(game.name);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Game does not exist with the name "${game.name}". Please provide the name of an existing game.`);
  }
  const gameString = JSON.stringify(game);
  fs.writeFileSync(filePath, gameString);
  return game;
}

function getGameFilePath(name) {
  if (!name) {
    throw new Error(`Game must have a name specified`);
  }
  const filePath = `./data/${name}.json`;
  return filePath;
}