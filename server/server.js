const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");

const route = require("./router");
const {
  addUser,
  removeUser,
  getUserById,
  getUsersInRoom,
  printUsers,
} = require("./users");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(route);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Bye! Nice to see you!");
    printUsers();
    console.log("socket id:", socket.id);
    const leftUser = removeUser(socket.id);
    printUsers();

    if (leftUser) {
      io.to(leftUser.room).emit("message", {
        user: "admin",
        text: `${leftUser.nickname} was left chat room!`,
      });
    }
  });

  socket.on("join", ({ nickname, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, nickname, room });

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `${nickname}, Welcome to ${room} chat room`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${nickname},joined to room`,
    });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", ({ text }, callback) => {
    const user = getUserById(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: user.nickname, text });
    }
    callback();
  });
});

server.listen(PORT, () => {
  console.log(`Oh yes! I am up and listen on port ${PORT}`);
});
