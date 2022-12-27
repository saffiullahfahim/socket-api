const https = require("https");
const express = require("express");
const cors = require("cors");

const fs = require("fs");

const options = {
  key: fs.readFileSync("../ssl/api_saffiullahfahim_me.key"),
  cert: fs.readFileSync("../ssl/api_saffiullahfahim_me.crt"),
  ca: fs.readFileSync("../ssl/api_saffiullahfahim_me.ca-bundle"),
};

const app = express();
const server = https.createServer(options, app);

app.use(cors());

// socket
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  socket.on("wow", async (data) => {
    io.emit("wow", {
      type: socket.handshake.auth.name,
      data,
    });
  });
});

app.get("/", (req, res) => {
  res.send("200")
})

server.listen(6969, () => {
  console.log(`app listening to port ${6969}`);
});

