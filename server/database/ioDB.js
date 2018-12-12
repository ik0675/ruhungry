// database queries related to io's
const updateSocketIdThenEmit = (io, connection, socket, user) => {
  let query = `UPDATE
                 account
               SET
                 socket_id='${socket.id}'
               WHERE
                 id='${user.id}'`;
  connection.update(query)
  .then(() => {
    // get friend list
    query = `SELECT
               account.socket_id
             FROM
               account,
               (
                 SELECT
                   friend_id
                 FROM
                   friend_list
                 WHERE
                   id='${user.id}'
               ) AS friend_list
            WHERE
              account.id=friend_list.friend_id;`
    return connection.select(query);
  })
  .then(socketIds => {
    for (let i = 0; i < socketIds.length; ++i) {
      if (socketIds[i].socket_id !== null) {
        console.log('sending friend connected socket emit to %s, with data=', socketIds[i].socket_id, user);
        io.to(socketIds[i].socket_id).emit('friendConnected', user);
      }
    }
  })
  .catch(err => {
    console.error('IO error in updateSocketIdThenEmit!', err);
  })
}

const userLogout = (io, connection, user) => {
  let query = `UPDATE
                 account
               SET
                 socket_id=null, logout=now()
               WHERE
                 id='${user.id}'`;
  connection.update(query)
  .then(() => {
    query = `SELECT
               account.socket_id,
               TIMESTAMPDIFF(MINUTE, account.logout, now()) AS logout
             FROM
               account,
               (
                 SELECT
                   friend_id
                 FROM
                   friend_list
                 WHERE
                   id='${user.id}'
               ) AS friend_list
             WHERE
               account.id=friend_list.friend_id
            `;
    return connection.select(query);
  })
  .then(socketIds => {
    for (let i = 0; i < socketIds.length; ++i) {
      if (socketIds[i].socket_id !== null) {
        user = { ...user, logout: socketIds[i].logout }
        console.log('sending friend disconnected socket emit to %s, with data=%s', socketIds[i].socket_id, user);
        io.to(socketIds[i].socket_id).emit('friendDisconnected', user);
      }
    }
  })
  .catch(err => {
    console.error('IO error in userLogout!', err);
  })
}

const sendMessage = (io, connection, data) => {
  let query = `SELECT
                 c.id,
                 a.socket_id
               FROM
                 chat_meta c
                   JOIN account a
                   ON c.id=a.id
               WHERE
                 c.chat_id = '${data.chatId}'
                   AND
                 c.id != '${data.id}'`;
  console.log(query)
  connection.select(query)
  .then(socketIds => {
    console.log('found sockets', socketIds)
    for (let i = 0; i < socketIds.length; ++i) {
      const socketId = socketIds[i].socket_id;
      if (socketId !== null) {
        console.log('sending new message to', socketId);
        io.to(socketId).emit('newMessage', data);
      }
    }
  })
  .catch(err => {
    console.log('IO error in sendMessage', err)
  })
}

module.exports = {
  updateSocketIdThenEmit: updateSocketIdThenEmit,
  userLogout            : userLogout,
  sendMessage           : sendMessage,
}
