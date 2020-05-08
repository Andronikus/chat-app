const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const route = require("./router");

const PORT = process.env.PORT || 5000;

app.use(route);

io.on("connection", (socket) => {
  console.log("Someone connect to me!", socket);

  socket.on("disconnect", () => {
    console.log("Bye! Nice to see you!");
  });
});

server.listen(PORT, () => {
  console.log(`Oh yes! I am up and listen on port ${PORT}`);
});