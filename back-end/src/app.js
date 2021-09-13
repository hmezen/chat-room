const EventEmitter = require("events");
require("dotenv/config");
const express = require("express");
const { addUser, removeUser } = require("./users");
const { addMessage } = require("./messages");
const app = express();
const messagesRouter = require("./routes/messagesRoute");
const usersRouter = require("./routes/usersRoute");
app.use(usersRouter);
app.use(messagesRouter);
app.use(express.json());

// socket shenanigans
const cors = require("cors");
app.use(cors());
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId, name, avatarUrl, email } = socket.handshake.query;
  socket.join(roomId);

  addUser(socket.id, roomId, name, avatarUrl, email)
    .then((res) => {
      io.in(roomId).emit(USER_JOIN_CHAT_EVENT, res);
    })
    .catch((error) => {
      console.error(error);
    });

  // Listen typing events
  socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
  });
  socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
  });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    addMessage(data)
      .then((res) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, res);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    removeUser(socket.id).then((res) =>
      io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, socket.id)
    );
    socket.leave(roomId);
  });
});

// end socket shenanigans
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
