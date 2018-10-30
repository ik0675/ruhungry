// database queries related to client
const loginWithIdPw = (req, res, connection, id, password) => {
  let query = `SELECT id, name
               FROM account
               WHERE id='${id}'
                AND password='${password}'`;
  connection.query(query, (err, rows, field) => {
    if (err) {
      // database can't be accessed
      console.log('Login error', err);
      res.json({
        status: false,
        message: 'Sign in failed.\nPlease try again.'
      });
    } else {
      if (rows.length === 0) {
        // incorrect user or password
        console.log('incorrect login info');
        res.json({
          status: false,
          message: 'Incorrect Email or password.\nPlease try again'
        });
      } else {
        // login successful
        req.session.loginInfo = {id: rows[0].id, name: rows[0].name};
        res.json({
          status: true,
          message: 'Sign in successful',
          user: {
            id: rows[0].id,
            name: rows[0].name,
          }
        });
      }
    }
  });
}

const signUp = (res, connection, id, password, name) => {
  let query = `SELECT *
               FROM account
               WHERE id='${id}'`;
  connection.query(query, (err, rows, field) => {
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
        res.json({
          status: false,
          message: 'Email already exists.\nPlease try again.'
        });
      }
      else {
        query = `INSERT INTO account(id, password, name)
                  VALUES ('${id}', '${password}', '${name}')`;
        connection.query(query, (err) => {
          if (err){
            // database err
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
}

const getFriendList = (res, connection, id) => {
  let query = `SELECT friend_id
               FROM friend_list
               WHERE id='${id}'`;
  connection.query(query, (err, rows, field) => {
    if (err)
      console.log(err);

    let friends = rows;
    let friendIds = '(';
    for (let i = 0; i < friends.length; ++i) {
      friendIds += "'" + friends[i].friend_id + "'";
      if (i < friends.length - 1)
        friendIds += ',';
    }
    friendIds += ')';

    query = `SELECT id, name, socket_id
             FROM account
             WHERE id in ${friendIds}`;

    connection.query(query, (err, rows, field) => {
      let friendUsers = {onlineFriends: [], offlineFriends: []};
      for (let i = 0; i < rows.length; ++i) {
        let friend = {id: rows[i].id, name: rows[i].name};
        let status = rows[i].socket_id;
        if (status) {
          friendUsers.onlineFriends.push(friend);
        } else {
          friendUsers.offlineFriends.push(friend);
        }
      }
      res.json(friendUsers);
    });
  });
}

module.exports = {
  loginWithIdPw: loginWithIdPw,
  signUp: signUp,
  getFriendList: getFriendList,
}
