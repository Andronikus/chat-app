const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const bodyParser = require("body-parser");

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
app.use(bodyParser.json());
app.use(route);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Bye! Nice to see you!");
    const leftUser = removeUser(socket.id);

    if (leftUser) {
      io.to(leftUser.room).emit("message", {
        nickname: "admin",
        text: `${leftUser.nickname} was left chat room!`,
      });
    }
  });

  socket.on("join", ({ nickname, room }, callback) => {
    const userInfo = {
      id: socket.id,
      nickname,
      room,
    };

    const { error, user } = addUser(userInfo);

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      nickname: "admin",
      text: `${user.nickname}, Welcome to ${user.room} chat room`,
    });

    socket.broadcast.to(user.room).emit("message", {
      nickname: "admin",
      text: `${user.nickname},joined to room`,
    });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", ({ text }, callback) => {
    const user = getUserById(socket.id);

    if (user) {
      io.to(user.room).emit("message", { nickname: user.nickname, text });
    }
    callback();
  });
});

server.listen(PORT, () => {
  console.log(`Oh yes! I am up and listen on port ${PORT}`);
});
