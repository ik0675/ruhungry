let db = require('../database/ioDB');

module.exports = (io, connection) => {
  // user logged in
  io.on('connection', (socket) => {
    let userConnected = undefined;
    socket.on('login', (user) => {
      console.log('Login: user logged in with id=', user);
      userConnected = user;
      db.updateSocketIdThenEmit(io, connection, socket, userConnected);
    });

    socket.on('friendConnected', (friend) => {
      console.log('friend Connect');
    });

    socket.on('friendDisconnected', (friend) => {
      console.log('friend disconnect');
    });

    // user logged out
    socket.on('logout', () => {
      console.log('Logout: a user with id=%s and socketId=%s logged out', userConnected.id, socket.id);
      db.userLogout(io, connection, socket, userConnected);
    })
    // user closed out the browser
    socket.on('disconnect', () => {
      if (userConnected !== undefined) {
        console.log('Disconnect: a user with id=%s and socketId=%s disconnected', userConnected.id, socket.id);
        db.userLogout(io, connection, socket, userConnected);
      }
    });
  });
}
