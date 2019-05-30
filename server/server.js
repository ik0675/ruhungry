const path = require("path");
const express = require("express");
const promiseifyDB = require("./database/promiseifyDB");
const crypto = require("./cipher");
const session = require("express-session");
const mySQLSession = require("express-mysql-session");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const api = require("./api");
const ioHelper = require("./ioHelper");
const mySQLStore = mySQLSession(session);

const info = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_RUHUNGRY_DATABASE,
  multipleStatements: true
};

const sessionObj = {
  secret:
    process.env.RUHUNGRY_SESSION_SECRET || "ruhungry_session_secret12321123124",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
};

const connection = new promiseifyDB(info);
const sessionStore = new mySQLStore({
  ...info,
  clearExpired: true,
  checkExpirationInterval: 900000,
  connectionLimit: 1
});

// connection.connect();

let port = process.env.PORT || 4000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(session({ ...sessionObj, store: sessionStore })); // to support session

api(app, connection, crypto);
ioHelper(io, connection);

// production mode
if (process.env.NODE_ENV === "production") {
  //static file declaration
  console.log("running in production mode");
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
} else {
  // dev mode
  console.log("running in dev mode");
  app.use(express.static(path.join(__dirname, "../client/public")));
}

http.listen(port, () => console.log(`API server running at ${port}`));
