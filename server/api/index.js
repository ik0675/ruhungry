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
        user: {
          id      : req.session.loginInfo.id,
          name    : req.session.loginInfo.name,
          userImg : req.session.loginInfo.userImg,
        }
      });
    }
  });

  app.get('/api/logout', (req, res) => {
    delete req.session.loginInfo;
    res.send('loggout');
  });

  app.post('/api/createPost', (req, res) => {
    const loginInfo = req.session.loginInfo;
    const id = loginInfo.id;
    const name = loginInfo.name;
    const post = req.body.post;
    db.createPost(res, connection, id, name, post);
  })

  app.get('/api/getPosts', (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      res.json({ status: false })
    } else {
      const id = loginInfo.id;
      const offset = req.query.offset;
      db.getPosts(res, connection, id, offset);
    }
  })

  app.get('/api/getChatNumber', (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      res.json({ status: false });
    } else if (req.query.ids === undefined) {
      res.json({ status: false });
    } else {
      const ids = JSON.parse(req.query.ids);
      let included = false;
      for (let i = 0; i < ids.length; ++i) {
        if (ids[i].id === loginInfo.id) {
          included = true;
          break;
        }
      }
      if (ids.length < 2) {
        res.json({ status: false });
      } else if (included) {
        db.getChatNumber(res, connection, ids);
      } else {
        res.json({ status: false });
      }
    }
  })

  app.post('/api/sendMessage', (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const data = req.body;
    db.sendMessage(res, connection, data);
  })

  app.get('/api/getMessages', (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const chat_id = req.query.chat_id;
    const offset = req.query.offset;
    db.getMessages(res, connection, chat_id, offset);
  })
}
