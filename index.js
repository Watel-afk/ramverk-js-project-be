const express = require("express");
const mongoose = require("mongoose");
const {
  authorizeSession,
  getSession,
  sessionExist,
  getUsername,
} = require("./manager/authorization.manager.js");

const cors = require("cors");
const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "sessionId"],
  })
);
app.use("/images", express.static("images"));

const authenticationsRoute = require("./routes/authentications.route.js");
const itemsRoute = require("./routes/items.route.js");
const itemListingsRoute = require("./routes/itemListing.route.js");
const usersRoute = require("./routes/users.route.js");

// ------------------- Home -------------------
app.get("/", function (_, res) {
  res.send(getSession());
});

// ------------------- Routes -------------------
app.use("/authentications", authenticationsRoute);
app.use("/items", authorizeSession, itemsRoute);
app.use("/item-listings", authorizeSession, itemListingsRoute);
app.use("/users", usersRoute);

const server = http.createServer(app);

// ------------------- WebSocket -------------------
const WebSocket = require("ws");
const { getUserByName } = require("./factory/user.factory.js");
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionExist(sessionId)) {
    console.log("invalid session");
    ws.close();
    return;
  }

  const intervalId = setInterval(async () => {
    const username = getUsername(sessionId);
    const user = await getUserByName(username);

    if (user !== null) {
      ws.send(
        JSON.stringify({
          _id: user._id,
          username: user.username,
          balance: user.balance,
        })
      );
    }
  }, 5000);

  ws.on("close", () => {
    clearInterval(intervalId);
  });
});

// ------------------- Start server and Initialize DB -------------------
mongoose
  .connect(
    "mongodb+srv://admin:A3KHQdKGuANRg9tD@cluster0.1dhea.mongodb.net/Node-API?retryWrites=true&w=majority&appName=cluster0"
  )
  .then(() => {
    console.log("Connected to database");
    server.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => console.log("Connection failed", err));
