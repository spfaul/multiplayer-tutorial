import { Server } from "socket.io";

const io = new Server(8001, {
    cors: {
      origin: "*",
    },
});
const clients = new Set();
const TICK_DELAY = 1000 / 20;

function Client(socket) {
    this.socket = socket;
    this.position = {x: 0, y: 0};
}

console.log("Server running...")

io.on("connection", socket => {
    console.log("New connection!");
    let client = new Client(socket);
    clients.add(client);

    socket.on("position", (x, y) => {
        client.position = {x, y};
    });

    socket.on("disconnect", () => {
        clients.delete(client);
        clients.forEach(c => {
            c.socket.emit("removeClient", socket.id);
        })
    })
})

function tick() {
    let allData = [...clients].map(c => {
        return {
            position: c.position,
            id: c.socket.id
        }
    });
    console.log(clients.size)
    for (let c of clients) {
        c.socket.emit("playerDataUpdate", c.socket.id, allData);
    }
}

setInterval(tick, TICK_DELAY);