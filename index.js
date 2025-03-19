const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const fishesRoute = require("./routes/fishes.route.js");

// ------------------- Home -------------------
app.get("/", function (req, res) {
  res.send("Hello World");
});

// ------------------- Routes -------------------
app.use("/fishes", fishesRoute);

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
