const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const route = require("./router");
const { addUser, removeUser, getUserById, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

app.use(route);

io.on("connection", (socket) => {
  console.log("Someone connect to me!");

  socket.on("disconnect", () => {
    console.log("Bye! Nice to see you!");
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
      console.log("emit message to room");
      io.to(user.room).emit("message", { user: user.nickname, text });
    }
    callback();
  });
});

server.listen(PORT, () => {
  console.log(`Oh yes! I am up and listen on port ${PORT}`);
});
