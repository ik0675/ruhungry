let db = require('../database/clientDB');

module.exports = (app, connection, crypto) => {
  app.post('/api/login', (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    password = crypto.cryptoCipher(password);

    db.loginWithIdPw(req, res, connection, id, password);
  });

  app.post('/api/signUp', (req, res) => {
    let userInfo = req.body;
    let id = userInfo.id;
    let password = crypto.cryptoCipher(userInfo.password);
    let name = userInfo.name;

    db.signUp(res, connection, id, password, name);
  });

  app.post('/api/getFriendList', (req, res) => {
    let id = req.body.id;
    db.getFriendList(res, connection, id);
  });

  app.get('/api/session', (req, res) => {
    if (req.session.loginInfo === undefined) {
      res.json({
        status: false
      });
    } else {
      res.json({
        status: true,
        message: 'Sign in successful',
        user: {
          id: req.session.loginInfo.id,
          name: req.session.loginInfo.name
        }
      });
    }
  });

  app.get('/api/logout', (req, res) => {
    delete req.session.loginInfo;
    res.send('loggout');
  });
}
