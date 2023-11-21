import { Server } from "socket.io";

const io = new Server(8001, {
    cors: {
      origin: "*",
    },
});
console.log("Server running...")

io.on("connection", socket => {
    console.log("New connection!");
})