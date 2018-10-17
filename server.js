let express = require('express');
let info = require('./mysql_info');
let mysql = require('mysql');
let crypto = require('./cipher');

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let ioHelper = require('./ioHelper');

let connection = mysql.createConnection(info);

connection.connect((err) => {
  if (err)
    throw err;
  console.log(`Connected to database at localhost`);
});


let port = process.env.PORT || 4000;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/api/login', (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  password = crypto.cryptoCipher(password);

  connection.query(`SELECT id, name, session_id FROM account where id='${id}'
                    AND password='${password}'`,
                    (err, rows, field) => {
    if (err) {
      // database can't be accessed
      console.log('Login error', err);
      res.json({
        status: false,
        message: 'Sign in failed.\nPlease try again.'
      });
    }
    else {
      if (rows.length === 0) {
        // incorrect user or password
        console.log('incorrect login info');
        res.json({
          status: false,
          message: 'Incorrect Email or password.\nPlease try again'
        });
      }
      else {
        // login successful
        console.log('logged in');
        console.log('session_id', rows[0].session_id);
        res.json({
          status: true,
          message: 'Sign in successful',
          user: {
            id: rows[0].id,
            name: rows[0].name,
            sessionId: rows[0].session_id,
          }
        });
      }
    }
  });
})

app.post('/api/login/session', (req, res) => {
  let sessionId = req.body.sessionId;

  connection.query(`SELECT id, name, session_id FROM account where session_id='${sessionId}'`,
                    (err, rows, field) => {
    if (err) {
      // database can't be accessed
      console.log('Login error', err);
      res.json({
        status: false,
      });
    }
    else {
      if (rows.length === 0) {
        // incorrect user or password
        console.log('incorrect session_id');
        res.json({
          status: false,
        });
      }
      else {
        // login successful
        console.log('logged in');
        res.json({
          status: true,
          message: 'Sign in successful',
          user: {
            id: rows[0].id,
            name: rows[0].name
          }
        });
      }
    }
  });
});

app.post('/api/signUp', (req, res) => {
  let userInfo = req.body;
  let id = userInfo.id;
  let password = crypto.cryptoCipher(userInfo.password);
  let name = userInfo.name;
  let sessionId = crypto.cryptoGenerateHash(id);

  connection.query(`SELECT * FROM account where id='${id}'`,
                   (err, rows, field) => {
    if (err) {
      // database can't be accessed
      console.log('Sign Up error', err);
      res.json({
        status: false,
        message: 'Sign in failed.\nPlease try again. ERROR 1'
      });
    }
    else {
      if (rows.length > 0) {
        // user email already exists
        console.log('User email already exist');
        res.json({
          status: false,
          message: 'Email already exists.\nPlease try again.'
        });
      }
      else {
        connection.query(`INSERT INTO account(id, password, name, session_id)
                          VALUES ('${id}', '${password}', '${name}', '${sessionId}')`,
                          (err) => {
          if (err){
            // database can't be reached
            console.log(err);
            res.json({
              status: false,
              message: 'Sign in failed.\nPlease try again. ERROR 2'
            });
          }
          else {
            // sign up successful
            res.json({
              status: true,
              message: 'Sign Up successful!.\nPlease sign in again.'
            });
          }
        });
      }
    }
  });
});

io.on('connection', (socket) => {
  console.log('a user connected with id=', socket.id);

  socket.on('loggedIn', (user) => {
    console.log('a user logged in ', user);
  });
});

http.listen(port, () => console.log(`API server running at ${port}`));
