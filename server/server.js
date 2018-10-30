let express = require('express');
let info = require('./mysql_info');
let mysql = require('mysql');
let crypto = require('./cipher');
let session = require('express-session');
let mySQLSession = require('express-mysql-session');

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let api = require('./api');
let ioHelper = require('./ioHelper');
let sessionObj = require('./sessionSecret');
let mySQLStore = mySQLSession(session);

let connection = mysql.createConnection(info);
let sessionStore = new mySQLStore({...info,
                                   clearExpired: true,
                                   checkExpirationInterval: 900000,
                                   connectionLimit: 1});

connection.connect((err) => {
  if (err)
    throw err;
  console.log(`Connected to database at localhost`);
});


let port = process.env.PORT || 4000;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(session({...sessionObj, store: sessionStore}));  // to support session

api(app, connection, crypto);
ioHelper(io, connection);

http.listen(port, () => console.log(`API server running at ${port}`));
