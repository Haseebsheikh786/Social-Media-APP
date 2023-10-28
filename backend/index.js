const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./db/index");
const cors = require("cors");
const { register } = require("./controller/authController");
const app = express();
const port = process.env.PORT || 8080;
const multer = require("multer");
app.use(express.static("uploads"));
const morgan = require("morgan");
const path = require("path");
const { createPost } = require("./controller/postController");

app.use(cors());

app.use(express.json());

app.use(morgan("default"));

app.use(express.static(path.resolve(__dirname, "build")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads"); 
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/auth/signup", upload.single("pic"), register);
app.post("/post", upload.single("pic"), createPost);
app.use("/auth", require("./routes/authRoutes"));
app.use("/post", require("./routes/postRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/chat", require("./routes/chatRoutes"));
app.use("/message", require("./routes/messageRoutes"));
connectDb();
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io", socket.id);

  socket.on("setup", (user) => {
    socket.join(user);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
