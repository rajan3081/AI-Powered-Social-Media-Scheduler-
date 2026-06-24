require("dotenv").config();

const express = require("express");

const cors = require("cors");

const http = require("http");

const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const postRoutes = require("./routes/postRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const aiRoutes = require("./routes/aiRoutes");
const startScheduler = require("./scheduler/scheduler");

const app = express();

// ================= ONLINE USERS =================

let onlineUsers = [];

// ================= DATABASE =================

connectDB();

// ================= START SCHEDULER =================

startScheduler();

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/ai", aiRoutes);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {

res.send("API Running 🚀");

});

// ================= SOCKET SERVER =================

const server = http.createServer(app);

const io = new Server(server, {

cors: {


origin: "http://localhost:5173",

methods: ["GET", "POST"]


}

});

// ================= SOCKET CONNECTION =================

io.on("connection", (socket) => {

console.log(
"✅ User Connected:",
socket.id
);

// ADD ONLINE USER

onlineUsers.push(socket.id);

io.emit(
"onlineUsers",
onlineUsers
);

// RECEIVE MESSAGE

socket.on(
"sendMessage",
(message) => {


  io.emit(
    "receiveMessage",
    message
  );

}


);

// DISCONNECT

socket.on(
"disconnect",
() => {


  onlineUsers =
    onlineUsers.filter(

      (user) =>
        user !== socket.id

    );

  io.emit(
    "onlineUsers",
    onlineUsers
  );

  console.log(
    "❌ User Disconnected"
  );

}


);

});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

console.log(
`🚀 Server running on port ${PORT}`
);

});
