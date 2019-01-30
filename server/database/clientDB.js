const uuid4 = require('uuid/v4');
const fileSystem = require('../api/fileSystem');

// database queries related to client
const loginWithIdPw = (req, res, connection, id, password) => {
  let query = `SELECT
                 id,
                 name,
                 img
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
      req.session.loginInfo = {
        id      : rows[0].id,
        name    : rows[0].name,
        userImg : rows[0].img,
      };
      res.json({
        status: true,
        user: {
          id      : rows[0].id,
          name    : rows[0].name,
          userImg : rows[0].img
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

const getChatNumber = (res, connection, ids) => {
  let condition = '';
  let chat_id;
  for (let i = 0; i < ids.length; ++i) {
    condition += `id='${ids[i].id}'`;
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
        values += `('${chat_id}', '${ids[i].id}', NOW())`;
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
                 ${values}`;
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

const sendMessage = (res, connection, { chat_id, id, message }) => {
  message = connection.escape(message);
  let query = `INSERT INTO
                 chat_messages
                 (
                   chat_id,
                   id,
                   message
                 )
               VALUES
               (
                 '${chat_id}',
                 '${id}',
                 ${message}
               );
              SELECT
                DATE_FORMAT(c.sent_at, '%b %d %Y at %h:%i%p') sent_at,
                a.name
              FROM
                chat_messages c
                  JOIN account a
                  ON a.id=c.id
              WHERE
                c.num=LAST_INSERT_ID();`;
  connection.select(query)
  .then(rows => {
    const sentAt = rows[1][0].sent_at;
    const name = rows[1][0].name;
    res.json({ status: true, sentAt, name })
  })
  .catch(err => {
    console.log(err);
    res.json({ status: false })
  })
}

const getMessages = (res, connection, chat_id, offset) => {
  let query = `SELECT
                 c.id,
                 a.name,
                 c.message,
                 DATE_FORMAT(c.sent_at, '%b %d %Y at %h:%i%p') sent_at
               FROM
                 chat_messages c
                   JOIN account a
                   ON c.id=a.id
               WHERE
                 c.chat_id = '${chat_id}'
               ORDER BY sent_at
               LIMIT 50
               OFFSET ${offset}`;
  connection.select(query)
  .then(rows => {
    let messages = [];
    for (let i = 0; i < rows.length; ++i) {
      const message = {
        id      : rows[i].id,
        name    : rows[i].name,
        message : rows[i].message,
        sentAt  : rows[i].sent_at
      }
      messages.push(message);
    }
    res.json({ status: true, messages })
  })
}

const getPosts = (res, connection, id, offset) => {
  const query = `SELECT
                   GROUP_CONCAT(DISTINCT p.id SEPARATOR ',') inviter_id,
                   GROUP_CONCAT(DISTINCT a.name SEPARATOR ',') inviter_name,
                   GROUP_CONCAT(DISTINCT a.img SEPARATOR ',') inviter_img,
                   GROUP_CONCAT(p.sent_to SEPARATOR ',') receiver_ids,
                   GROUP_CONCAT(a_.name SEPARATOR ',') receiver_names,
                   GROUP_CONCAT(a_.img SEPARATOR ',') receiver_imgs,
                   GROUP_CONCAT(DISTINCT p.created_at SEPARATOR ',') created_at,
                   GROUP_CONCAT(DISTINCT p.restaurant SEPARATOR ',') restaurant,
                   GROUP_CONCAT(DISTINCT p.restaurant_img_path SEPARATOR ',') restaurant_img_path,
                   GROUP_CONCAT(p.status SEPARATOR ',') status,
                   p.invitation_num
                 FROM
                   post_invitation p
                     JOIN account a
                       ON p.id=a.id
                     JOIN account a_
                       ON p.sent_to=a_.id
                 GROUP BY
                   p.invitation_num
                 HAVING
                   FIND_IN_SET('${id}', inviter_id)
                     OR
                   FIND_IN_SET('${id}', receiver_ids)
                 ORDER BY created_at DESC
                 LIMIT 15
                 OFFSET ${offset}`;
  connection.select(query)
  .then(rows => {
    let posts = [];
    for (let i = 0; i < rows.length; ++i) {
      const row = rows[i];
      const receiverIds = row.receiver_ids.split(',');
      const receiverNames = row.receiver_names.split(',');
      const status = row.status.split(',');
      const post = {
        id                : row.inviter_id,
        name              : row.inviter_name,
        img               : row.inviter_img,
        receiverIds       : receiverIds,
        receiverNames     : receiverNames,
        receiverImgs      : row.receiver_imgs,
        createdAt         : row.created_at,
        restaurant        : row.restaurant,
        restaurantImgPath : row.restaurant_img_path,
        status            : status,
        invitationNum     : row.invitation_num,
        isWaiting         : false,
      }
      posts.push(post);
    }
    res.json({ status: true, posts })
  })
  .catch(err => {
    console.log(err);
    res.json({ status: false })
  })
}

const rsvp = (res, connection, invitation_num, sent_to, status) => {
  const query = `UPDATE
                   post_invitation
                 SET
                   status = '${status}'
                 WHERE
                   invitation_num = '${invitation_num}'
                     AND
                   sent_to = '${sent_to}'`;
  connection.update(query)
  .then(() => {
    res.json({ status: true })
  })
  .catch(err => {
    console.log(err);
    res.json({ status: false })
  })
}

const getImages = (res, connection, restaurant) => {
  const query = `SELECT DISTINCT
                   img_path
                 FROM
                   restaurants
                 WHERE
                   name = '${restaurant}'`;
  connection.select(query)
  .then(img_path => {
    let imgs = [];
    for (let i = 0; i < img_path.length; ++i) {
      imgs.push(img_path[i].img_path);
    }
    res.json({ status: true, imgs })
  })
  .catch(err => {
    console.log(err);
    res.json({ status: false })
  })
}

const createInvitation = (res, connection, id, friends, restaurant) => {
  let query = `SELECT
                 img_path AS restaurant_img_path
               FROM
                 restaurants
               WHERE
                 name = '${restaurant}'`;
  connection.select(query)
  .then(restaurants => {
    if (restaurants.length > 1) {
      throw new Error('multiple restaurant image files for name = ' + restaurant);
    } else {
      const restaurant_img_path = restaurants[0].restaurant_img_path;
      let values = '';
      const invitation_num = uuid4();
      for(let i = 0; i < friends.length; ++i) {
        friend = friends[i];
        values += `('${id}', '${friend.id}', NOW(),
          '${restaurant}', '${restaurant_img_path}', '${invitation_num}')`;
        if (i < friends.length - 1) {
          values += ',';
        }
      }
      query = `INSERT INTO
                 post_invitation
                 (
                   id,
                   sent_to,
                   created_at,
                   restaurant,
                   restaurant_img_path,
                   invitation_num
                 )
               VALUES
                 ${values};
               SELECT
                 GROUP_CONCAT(DISTINCT p.id SEPARATOR ',') inviter_id,
                 GROUP_CONCAT(DISTINCT a.name SEPARATOR ',') inviter_name,
                 GROUP_CONCAT(DISTINCT a.img SEPARATOR ',') inviter_img,
                 GROUP_CONCAT(p.sent_to SEPARATOR ',') receiver_ids,
                 GROUP_CONCAT(a_.name SEPARATOR ',') receiver_names,
                 GROUP_CONCAT(a_.img SEPARATOR ',') receiver_imgs,
                 GROUP_CONCAT(DISTINCT p.created_at SEPARATOR ',') created_at,
                 GROUP_CONCAT(DISTINCT p.restaurant SEPARATOR ',') restaurant,
                 GROUP_CONCAT(DISTINCT p.restaurant_img_path SEPARATOR ',') restaurant_img_path,
                 GROUP_CONCAT(p.status SEPARATOR ',') status,
                 p.invitation_num
               FROM
                 post_invitation p
                   JOIN account a
                     ON p.id=a.id
                   JOIN account a_
                     ON p.sent_to=a_.id
               WHERE
                 p.invitation_num = '${invitation_num}'
               GROUP BY
                 p.invitation_num;`;
      return connection.select(query)
    }
  })
  .then((rows) => {
    const row = rows[1][0];
    const receiverIds = row.receiver_ids.split(',');
    const receiverNames = row.receiver_names.split(',');
    const status = row.status.split(',');
    const post = {
      id                : row.inviter_id,
      name              : row.inviter_name,
      img               : row.inviter_img,
      receiverIds       : receiverIds,
      receiverNames     : receiverNames,
      receiverImgs      : row.receiver_imgs,
      createdAt         : row.created_at,
      restaurant        : row.restaurant,
      restaurantImgPath : row.restaurant_img_path,
      status            : status,
      invitationNum     : row.invitation_num,
      isWaiting         : false,
    }
    res.json({ status: true, post });
  })
  .catch(err => {
    console.log(err);
    res.json({ status: false });
  })
}

const restaurantSearch = (res, connection, restaurant) => {
  const query = `SELECT DISTINCT
                   name
                 FROM
                   restaurants
                 WHERE
                   name LIKE '%${restaurant}%'`;
  connection.select(query)
  .then(rows => {
    let restaurants = [];
    for (let i = 0; i < rows.length; ++i) {
      restaurants.push(rows[i].name);
    }
    res.json({ status: true, restaurants });
  })
  .catch(err => {
    console.log(err);
    res.json({ status: false })
  })
}

const addRestaurant = (res, conn, restaurant, tempPath, imgPath, imgName) => {
  let query = `SELECT
                 name
               FROM
                 restaurants
               WHERE
                 name = '${restaurant}'`;
  conn.select(query)
  .then(rows => {
    if (rows.length > 0) {
      res.json({ status: false, msg: 'Restaurant by the name given already exists.' });
      return false;
    } else {
      query = `INSERT INTO
                 restaurants
                   (
                     name,
                     img_path
                   )
               VALUES
                 (
                   '${restaurant}',
                   '${imgName}'
                 )`;
      return conn.insert(query);
    }
  })
  .then(result => {
    if (result) {
      fileSystem(res, tempPath, imgPath);
    }
  })
  .catch(err => {
    console.log(err);
    res.json({ status: false, msg: 'System err. Please try again.' });
  })
}

const getAccountInfo = (res, connection, id) => {
  const query = `SELECT
                   name,
                   img
                 FROM
                   account
                 WHERE
                   id = '${id}'`;
  connection.select(query)
  .then(account => {
    const { name, img } = account[0];
    return res.json({
      status: true,
      id,
      name,
      userImg : img,
    })
  })
  .catch(err => {
    console.log(err);
    return res.json({ status: false });
  })
}

const isFriends = (res, connection, id, friend_id) => {
  const query = `SELECT
                   id,
                   friend_id
                 FROM
                   friend_list
                 WHERE
                   id = '${id}'
                     AND
                   friend_id = '${friend_id}'`;
  connection.select(query)
  .then(result => {
    if (result.length > 0) {
      // already friends
      return res.json({ status: true, data: 'friend' });
    }
    isFriendRequestSent(res, connection, id, friend_id);
  })
  .catch(err => {
    console.log(err);
    return res.json({ status: false });
  })
}

const isFriendRequestSent = (res, connection, id, friend_id) => {
  const query = `SELECT
                   id,
                   friend_id
                 FROM
                   friend_request
                 WHERE
                   id = '${id}'
                     AND
                   friend_id = '${friend_id}'`;
  connection.select(query)
  .then(result => {
    if (result.length > 0) {
      return res.json({ status: true, data: 'sent' });
    }
    return res.json({ status: true, data: 'not sent' });
  })
}

const friendRequest = (res, connection, id ,friend_id) => {
  const query = `INSERT INTO
                   friend_request
                   (
                     id,
                     friend_id
                   )
                 VALUES
                   (
                     '${id}',
                     '${friend_id}'
                   )`;
  connection.insert(query)
  .then(result => {
    return res.json({ status: true });
  })
  .catch(err => {
    console.log(err);
    return res.json({ status: false });
  })
}

module.exports = {
  loginWithIdPw   : loginWithIdPw,
  signUp          : signUp,
  getFriendList   : getFriendList,
  getPosts        : getPosts,
  getChatNumber   : getChatNumber,
  sendMessage     : sendMessage,
  getMessages     : getMessages,
  rsvp            : rsvp,
  getImages       : getImages,
  createInvitation: createInvitation,
  restaurantSearch: restaurantSearch,
  addRestaurant   : addRestaurant,
  getAccountInfo  : getAccountInfo,
  isFriends       : isFriends,
  friendRequest   : friendRequest,
}
