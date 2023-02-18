const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const port = process.env.PORT || 3001;
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(data);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    var a = true;
    if (a) {
      socket.to(data.room).emit("receive_message", data);
      a = false;
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Connected");
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
