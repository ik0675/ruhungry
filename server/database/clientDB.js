const uuid4 = require('uuid/v4');
const escaper = require('../api/escape');

// database queries related to client
const loginWithIdPw = (req, res, connection, id, password) => {
  let query = `SELECT
                 id, name
               FROM
                 account
               WHERE
                 id='${id}' AND password='${password}'`;
  connection.select(query)
  .then(rows => {
    if (rows.length === 0) {
      // incorrect user or password
      console.log('incorrect login info');
      res.json({
        status: false,
        msg: 'Incorrect Email or password.\nPlease try again'
      });
    } else {
      // login successful
      req.session.loginInfo = {id: rows[0].id, name: rows[0].name};
      res.json({
        status: true,
        user: {
          id: rows[0].id,
          name: rows[0].name,
        }
      });
    }
  })
  .catch(err => {
    // database err
    console.log('Login error', err);
    res.json({
      status: false,
      msg: 'Sign in failed.\nPlease try again.'
    });
  })
}

const signUp = (res, connection, id, password, name) => {
  let query = `SELECT
                 *
               FROM
                 account
               WHERE
                 id='${id}'`;
  connection.select(query)
  .then(rows => {
    if (rows.length > 0) {
      // user email already exists
      res.json({
        status: false,
        msg: 'Email already exists.\nPlease try again.'
      });
      return false;
    }
    else {
      query = `INSERT INTO
                 account
                  (
                    id,
                    password,
                    name
                  )
               VALUES
                 (
                   '${id}',
                   '${password}',
                   '${name}'
                 )`;
      return connection.insert(query);
    }
  })
  .then((status) => {
    if (status) {
      // sign up successful
      res.json({
        status: true,
        msg: 'Sign Up successful!.\nPlease sign in again.'
      });
    }
  })
  .catch(err => {
    // database err. most likely query syntax err
    console.log('Sign Up error', err);
    res.json({
      status: false,
      msg: 'Sign in failed.\nPlease try again. ERROR 1'
    });
  })
}

const getFriendList = (res, connection, id) => {
  let query = ` SELECT
                  account.id,
                  account.name,
                  account.socket_id,
                  TIMESTAMPDIFF(MINUTE, account.logout, now()) as logout
                FROM
                  account,
                  (
                     SELECT
                       friend_id
                     FROM
                       friend_list
                     WHERE
                       id='${id}'
                  ) AS friend_list
                WHERE
                  account.id=friend_list.friend_id`;
  connection.select(query)
  .then(users => {
    let friendUsers = {onlineFriends: [], offlineFriends: []};
    for (let i = 0; i < users.length; ++i) {
      let friend = {id: users[i].id, name: users[i].name, logout: users[i].logout};
      let status = users[i].socket_id;
      if (status) {
        friendUsers.onlineFriends.push(friend);
      } else {
        friendUsers.offlineFriends.push(friend);
      }
    }
    res.json(friendUsers);
  })
  .catch(err => {
    // database err
    console.log('getFriendList connection err:', err);
    res.json({
      onlineFriends: [],
      offlineFriends: []
    });
  })
}

const createPost = (res, connection, id, name, post) => {
  let query = `INSERT INTO
                post
                (
                  id,
                  name,
                  post
                )
                VALUES
                (
                  '${id}',
                  '${name}',
                  '${post}'
                )`;
    connection.insert(query)
    .then( () => {
      query = `SELECT
                 num,
                 MINUTE(TIMEDIFF(NOW(), created_at)) AS created_at
               FROM
                 post
               WHERE
                 id='${id}' AND post='${post}'
               ORDER BY num DESC
               LIMIT 1`;
      return connection.select(query)
    })
    .then( (rows) => {
      let result = {
        status: true,
        kind: 'post',
        post: post,
        author: { id, name },
        createdAt: rows[0].created_at,
        num: rows[0].num
      }
      res.json(result)
    })
    .catch( (err) => {
      console.log(err);
      res.json({ status: false })
    })
}

const getPosts = (res, connection, id) => {
  let query = `SELECT
                 friend_id AS id
               FROM
                 friend_list
               WHERE
                 id='${id}'`;
  connection.select(query)
  .then( (ids) => {
    let idArray = `('${id}'`;
    for (let i = 0; i < ids.length; ++i) {
      idArray += ", '" + ids[i].id + "'";
    }
    idArray += ')';
    query = `SELECT
               num,
               id,
               name,
               post,
               TIMESTAMPDIFF(MINUTE, created_at, NOW()) AS created_at
             FROM
               post
             WHERE
               id in ${idArray}
             ORDER BY num DESC
             LIMIT 15`;
    return connection.select(query)
  })
  .then( (posts) => {
    let result = [];
    for (let i = 0; i < posts.length; ++i) {
      let post = {
        kind: 'post',
        post: escaper.unescape(posts[i].post),
        author: { id: posts[i].id, name: posts[i].name },
        createdAt: posts[i].created_at,
        num: posts[i].num
      }
      result.push(post);
    }
    res.json(result);
  })
  .catch( err => {
    console.log(err)
    res.json({ status: false })
  })
}

const getChatNumber = (res, connection, ids) => {
  let condition = '';
  let chat_id;
  for (let i = 0; i < ids.length; ++i) {
    condition += `id='${ids[i]}'`;
    if (i < ids.length - 1)
      condition += ' OR ';
  }
  let query = `SELECT
                 chat_id
               FROM
                 chat_meta
               WHERE
                 ${condition}
               GROUP BY
                 chat_id
               HAVING
                 COUNT(DISTINCT id)=${ids.length};`;
  connection.select(query)
  .then( (chat_ids) => {
    if (chat_ids.length === 0) {
      // no exisitng chat
      // create one
      chat_id = uuid4();
      let values = '';
      for (let i = 0; i < ids.length; ++i) {
        values += `('${chat_id}', '${ids[i]}', NOW())`;
        if (i < ids.length - 1)
          values += ',';
      }
      query = `INSERT INTO
               chat_meta
                 (
                   chat_id,
                   id,
                   modified_at
                 )
               VALUES
                 ${values}`
      return connection.insert(query);
    } else if (chat_ids.length > 1) {
      // database error.
      // there shouldn't be more than one row
      res.json({ status: false });
      return false;
    } else {
      res.json({ status: true, chat_id: chat_ids[0].chat_id });
      return false;
    }
  })
  .then( (status) => {
    if (status) {
      res.json({ status: true, chat_id: chat_id });
    }
  })
  .catch( err => {
    console.log(err);
    res.json({ status: false });
  })
}

module.exports = {
  loginWithIdPw: loginWithIdPw,
  signUp: signUp,
  getFriendList: getFriendList,
  createPost: createPost,
  getPosts: getPosts,
  getChatNumber: getChatNumber,
}
