# Wordify Services

## Developer Information
Wordify is broken into two primary pieces, the `client` and the `services`.  To run the application locally you will need to run both, the client to interact with the game, and the services to persist the game state across players.

### Services
```bash
cd ./services
npm start
# node services will be available: http://localhost:3001
```

### Client
```bash
cd ./client
npm start
# client application will be available: http://localhost:3000
```