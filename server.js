const express = require("express");
const http = require("http");
const app = express();
const httpServer = http.createServer(app);
const { Server } = require("socket.io");

const STARTING_POINTS = 1000;
const BOT_NAMES = ["CPU 1", "CPU 2", "CPU 3", "CPU 4"];

const randomNumber = (min, max, decimal) => {
  return Number((Math.random() * (max - min) + min).toFixed(decimal ? 2 : 0));
};

const generateMultiplier = () => {
  return randomNumber(1, 10, true);
};

const generateBots = () => {
  return BOT_NAMES.map((name) => {
    return {
      isBot: true,
      id: name.toLowerCase(),
      name,
      points: STARTING_POINTS,
      multiplier: null, // generate random multiploer
      pointsPlaced: null, // generate random integer that is less than half of the starting points,
    };
  });
};

const playBots = () => {
  for (const bot of players.filter((p) => p.isBot)) {
    const wager = Math.floor((Math.random() * bot.points) / 2);
    const multiplier = generateMultiplier();
    current_round.push({ ...bot, pointsPlaced: wager, multiplier });
  }
};

const playGame = () => {
  randomMultiplier = generateMultiplier();
  const updatedPlayers = current_round.map((player) => {
    const temp = { ...player };

    if (player.multiplier <= randomMultiplier) {
      temp.points = Number(
        parseFloat(player.points) +
          parseFloat(player.pointsPlaced) * parseFloat(player.multiplier)
      );
      temp.won_round = true;
    } else {
      temp.points = Number(
        parseFloat(player.points) - parseFloat(player.pointsPlaced)
      );
      temp.won_round = false;
    }
    return temp;
  });

  // Sort rankings
  const sorted = updatedPlayers.sort((a, b) => b.points - a.points);
  players = [...updatedPlayers];
  io.emit("new_multiplier", { randomMultiplier });

  // make sure the results show after the chart animation is done, can also be done on client side
  setTimeout(() => {
    io.emit("round_update", {
      roundData: updatedPlayers,
      rankings: sorted,
      human: players.find((p) => p.name === username),
    });
    io.emit("game_status", { status: "done" });
  }, [2700]);

  // Clear round data for the next round
  current_round.length = 0;
};

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let players = [...generateBots()];
const current_round = [];
let username = "";

io.on("connection", async (socket) => {
  // user added their username
  socket.on("username_set", (name, callback) => {
    username = name;
    const human = {
      id: socket.id,
      name,
      points: STARTING_POINTS,
      multiplier: 2.5,
      pointsPlaced: 50,
      isBot: false,
    };
    // once the user enters their username, push to the players array
    players.push(human); // add real player
    io.emit("setup_game", { round: 0, players, human });

    // dummy bot message
    socket.emit("message", {
      username: "CPU 1",
      text: "hi guys",
    });

    callback();
  });

  socket.on("start_round", ({ username, multiplier, wager }) => {
    io.emit("game_status", { status: "hold" });
    const player = players.find((p) => p.name === username);
    if (player) {
      current_round.push({ ...player, multiplier, pointsPlaced: wager });
      playBots();
      playGame();
    }
  });

  socket.on("speed", (speed) => {
    io.emit("speed updated", speed);
  });

  // Handle player disconnection
  socket.on("disconnect", () => {
    players = players.filter((player) => player.id !== socket.id);
    io.emit("player_left", { players });
  });

  // Chat Server
  socket.on("message", ({ id, text, username }) => {
    io.emit("message", { id, text, username });
  });
});

httpServer.listen("3001", () => console.log(`Server listening on port 3001`));
