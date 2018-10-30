// database queries related to io's
const updateSocketIdThenEmit = (io, connection, socket, user) => {
  let query = `UPDATE account
               SET socket_id='${socket.id}'
               WHERE id='${user.id}'`;
  connection.query(query, (err) => {
    if (err){
      // database err
      console.log(err);
    }

    // get friend list
    query = `SELECT friend_id
             FROM friend_list
             WHERE id='${user.id}'`;
    connection.query(query, (err, rows, field) => {
      if (err) {
        // database err
        console.log(err);
      }
      let friendList = rows;
      for (let i = 0; i < friendList.length; ++i) {
        let friendId = friendList[i].friend_id;
        query = `SELECT socket_id
                 FROM account
                 WHERE id='${friendId}'`;
        connection.query(query, (err, rows, field) => {
          if (err) {
            // database err
            console.log(err);
          }
          // emit socket to every friend
          let socketIds = rows;
          for (let j = 0; j < socketIds.length; ++j) {
            if (socketIds[j].socket_id !== null) {
              console.log('sending friend connected socket emit to %s, with data=', socketIds[j].socket_id, user);
              io.to(socketIds[j].socket_id).emit('friendConnected', user);
            }
          }
        });
      }
    });
  });
}

const userLogout = (io, connection, socket, user) => {
  let query = `UPDATE account
               SET socket_id=null
               WHERE id='${user.id}'`;
  connection.query(query, (err) => {
    if (err) {
      // database err
      console.log(err);
    }

    // get friend list
    query = `SELECT friend_id
             FROM friend_list
             WHERE id='${user.id}'`;
    connection.query(query, (err, rows, field) => {
      if (err) {
        // database err
        console.log(err);
      }
      let friendList = rows;
      for (let i = 0; i < friendList.length; ++i) {
        let friendId = friendList[i].friend_id;
        query = `SELECT socket_id
                 FROM account
                 WHERE id='${friendId}'`;
        connection.query(query, (err, rows, field) => {
          if (err) {
            // database err
            console.log(err);
          }
          // emit socket to every friend
          let socketIds = rows;
          for (let j = 0; j < socketIds.length; ++j) {
            if (socketIds[j].socket_id !== null) {
              console.log('sending friend disconnected socket emit to %s, with data=%s', socketIds[j].socket_id, user);
              io.to(socketIds[j].socket_id).emit('friendDisconnected', user);
            }
          }
        });
      }
    });
  });
}

module.exports = {
  updateSocketIdThenEmit: updateSocketIdThenEmit,
  userLogout: userLogout,
}
