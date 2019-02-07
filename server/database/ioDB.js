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
  connection.select(query)
  .then(socketIds => {
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

const newInvitation = (io, connection, invitation) => {
  const receiveIds = '(\'' + invitation.receiverIds.join('\', \'') + '\')';
  const query = `SELECT
                   socket_id
                 FROM
                   account
                 WHERE
                   id IN ${receiveIds}`;
  console.log(query);
  connection.select(query)
  .then(socketIds => {
    for (let i = 0; i < socketIds.length; ++i) {
      const socketId = socketIds[i].socket_id;
      if (socketId !== null) {
        console.log('sending new invitation to', socketId);
        io.to(socketId).emit('newInvitation', invitation);
      }
    }
  })
  .catch(err => {
    console.log('IO error in newInvitation', err);
  })
}

const rsvp = (io, connection, { invitation_num, sent_to, status }) => {
  const query = `SELECT DISTINCT
                   a.socket_id
                 FROM
                   post_invitation p
                     JOIN account a
                       ON p.id = a.id
                 WHERE
                   p.invitation_num = '${invitation_num}'`;
  connection.select(query)
  .then(socketIds => {
    const socketId = socketIds[0].socket_id;
    if (socketId !== null) {
      console.log('sending rsvp to', socketId);
      io.to(socketId).emit('rsvp', { invitation_num, sent_to, status });
    }
  })
  .catch(err => {
    console.log('IO error in rsvp', err);
  })
}

const newFriend = (io, connection, { id, requestId }) => {
  const query = `SELECT
                   name,
                   img,
                   socket_id,
                   TIMESTAMPDIFF(MINUTE, account.logout, now()) AS logout
                 FROM
                   account
                 WHERE
                   id = '${id}'
                     OR
                   id = '${requestId}'`;
  connection.select(query)
  .then(accounts => {
    for (let i = 0; i < accounts.length; ++i) {
      const friend = {
        id    : accounts[i].id,
        name  : accounts[i].name,
        img   : accounts[i].img,
        logout: accounts[i].logout,
      }
      const tgtSocket = accounts[(i + 1) % 2].socket_id;
      if (tgtSocket !== null) {
        io.to(tgtSocket).emit('friendConnected', friend);
      } else if (friend.id === id) {
        io.to(tgtSocket).emit('friendDisconnected', friend);
      }
    }
  })
  .catch(err => {
    console.log('IO error in newFriend', err);
  })
}

module.exports = {
  updateSocketIdThenEmit: updateSocketIdThenEmit,
  userLogout            : userLogout,
  sendMessage           : sendMessage,
  newInvitation         : newInvitation,
  rsvp                  : rsvp,
}
