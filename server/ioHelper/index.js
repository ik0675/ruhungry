let db = require('../database/ioDB');
let socketToId = []
module.exports = (io, connection) => {
  // user logged in
  io.on('connection', (socket) => {
    socket.on('login', (user) => {
      console.log('Login: user logged in with id=', user);
      socketToId[socket.id] = user;
      db.updateSocketIdThenEmit(io, connection, socket, user);
    });

    // user logged out
    socket.on('logout', () => {
      let user = { ...socketToId[socket.id] };
      delete socketToId[socket.id];
      console.log('Logout: a user with id=%s and socketId=%s logged out', user.id, socket.id);
      db.userLogout(io, connection, socket, user);
    })
    // user closed out the browser
    socket.on('disconnect', () => {
      let user = { ...socketToId[socket.id] };
      if (user !== undefined) {
        delete socketToId[socket.id];
        console.log('Disconnect: a user with id=%s and socketId=%s disconnected', user.id, socket.id);
        db.userLogout(io, connection, socket, user);
      }
    });
  });
}
