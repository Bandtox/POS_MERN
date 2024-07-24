const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketIo = require("socket.io");

const app = express();
const port = process.env.PORT || 80;
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/pos", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Check MongoDB connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/*", function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", function (req, res) {
  res.send("Real time POS web app running.");
});

// Define API routes for inventory and transactions
app.use("/api/inventory", require("./api/inventory"));
app.use("/api", require("./api/transactions"));

// Websocket logic for Live Cart
let liveCart;

io.on("connection", function (socket) {
  socket.on("cart-transaction-complete", function () {
    socket.broadcast.emit("update-live-cart-display", {});
  });

  // on page load, show user current cart
  socket.on("live-cart-page-loaded", function () {
    socket.emit("update-live-cart-display", liveCart);
  });

  // when client connected, make client update live cart
  socket.emit("update-live-cart-display", liveCart);

  // when the cart data is updated by the POS
  socket.on("update-live-cart", function (cartData) {
    // keep track of it
    liveCart = cartData;
    // broadcast updated live cart to all websocket clients
    socket.broadcast.emit("update-live-cart-display", liveCart);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
