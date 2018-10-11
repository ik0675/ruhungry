let express = require('express');
let info = require('./mysql_info');
let mysql = require('mysql');
let app = express();

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

  connection.query(`SELECT id, name FROM account where id='${id}'
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
})

app.post('/api/signUp', (req, res) => {
  let userInfo = req.body;
  let id = userInfo.id;
  let password = userInfo.password;
  let name = userInfo.name;

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
        connection.query(`INSERT INTO account(id, password, name)
                          VALUES ('${id}', '${password}', '${name}')`,
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

app.listen(port, () => console.log(`API server running at ${port}`));
