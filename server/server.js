require("dotenv").config();
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const path = require("path");

const http = require("http");
const fs = require("fs");
const https = require("https");

const passportConfig = require("./utils/passport");

const { ROOM_CLEAN_INTERVAL } = require("./config");
const api = require("./api");

const socketHelper = require("./helpers/socketHelper");

const connections = require("./sockets/index");

let server = http.createServer(app);

if (process.env.PROD) {
  server = https.createServer(
    {
      key: fs.readFileSync(process.env.LETS_ENCRYPT_PRIVKEY),
      cert: fs.readFileSync(process.env.LETS_ENCRYPT_CERT),
    },
    app
  );
}

connections(server);

app.use(passport.initialize());
passportConfig(passport);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/api", api);

// clean rooms periodically
setInterval(socketHelper.removeInactiveRooms, ROOM_CLEAN_INTERVAL);

if (process.env.PROD) {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  // app.get("/login", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client/build/index.html"))
  // })
  //
  // app.get("/room", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client/build/index.html"))
  // })
  //
  // app.get("/room/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client/build/index.html"))
  // })
  //
  // app.get("/lobby", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client/build/index.html"))
  // })
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));
