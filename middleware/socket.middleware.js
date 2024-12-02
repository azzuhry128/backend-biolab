const { Server } = require("socket.io");

const socket = async () => {
  const io = new Server();

  io.on("connection", (socket) => {
    console.log("connected");

    socket.on("location-update", (data) => {
      console.log("location-updated");
      io.emit("location-update:", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = socket;
