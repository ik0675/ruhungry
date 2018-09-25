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

app.use(express.json());

app.post('/api/login', (req, res) => {
  let id = req.body.id;
  let password = req.body.password;

  connection.query(`SELECT * FROM account where id='${id}'
                    AND password='${password}'`,
                    (err, rows, field) => {
    if (err)
      throw err;

    if (rows === []) {
      // incorrect id or password
      res.send(400);
    }
    else {
      res.send(200);
    }
  });
})

app.post('/api/sign_up', (req, res) => {
  let userInfo = req.body;
  let id = userInfo.id;
  let password = userInfo.password;

  connection.query(`SELECT * FROM account where id='${id}'`,
                   (err, rows, field) => {
    if (err)
      throw err;

    if (rows !== []) {
      // user already exists
      res.send(400);
    }
    else {
      connection.query(`INSERT INTO account(id, password)
                        VALUES ('${id}', '${password}')`, (err) => {
        if (err)
          throw err;

        res.send(200);
      });
    }
  });
});

app.listen(port, () => console.log(`API server running at ${port}`));
