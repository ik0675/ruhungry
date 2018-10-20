let db = require('../database/clientDB');

module.exports = (app, connection, crypto) => {
  app.post('/api/login', (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    password = crypto.cryptoCipher(password);

    db.loginWithIdPw(res, connection, id, password);
  });

  app.post('/api/login/session', (req, res) => {
    let sessionId = req.body.sessionId;

    db.loginWithSessionId(res, connection, sessionId);
  });

  app.post('/api/signUp', (req, res) => {
    let userInfo = req.body;
    let id = userInfo.id;
    let password = crypto.cryptoCipher(userInfo.password);
    let name = userInfo.name;
    let sessionId = crypto.cryptoGenerateHash(id);

    db.signUp(res, connection, id, password, name, sessionId);
  });

  app.post('/api/getFriendList', (req, res) => {
    let id = req.body.id;
    db.getFriendList(res, connection, id);
  });
}
