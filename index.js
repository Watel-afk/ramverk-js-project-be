const express = require("express");
const mongoose = require("mongoose");
const {
  authorizeSession,
  getSession,
} = require("./manager/authorization.manager.js");

const app = express();
app.use(express.json());

const authenticationsRoute = require("./routes/authentications.route.js");
const itemsRoute = require("./routes/items.route.js");
const usersRoute = require("./routes/users.route.js");

// ------------------- Home -------------------
app.get("/", function (_, res) {
  res.send(getSession());
});

// ------------------- Routes -------------------
app.use("/authentications", authenticationsRoute);
app.use("/items", authorizeSession, itemsRoute);
app.use("/users", usersRoute);

// ------------------- Start server and Initialize DB -------------------
mongoose
  .connect(
    "mongodb+srv://admin:A3KHQdKGuANRg9tD@cluster0.1dhea.mongodb.net/Node-API?retryWrites=true&w=majority&appName=cluster0"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("Connection failed", err));
