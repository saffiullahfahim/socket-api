const https = require("https");

const fs = require("fs");

const options = {
  key: fs.readFileSync("../ssl/api_saffiullahfahim_me.key"),
  cert: fs.readFileSync("../ssl/api_saffiullahfahim_me.crt"),
  ca: fs.readFileSync("../ssl/api_saffiullahfahim_me.ca-bundle"),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("success");
});

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

server.listen(6969, () => {
  console.log(`app listening to port ${6969}`);
});

