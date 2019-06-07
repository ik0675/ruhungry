const db = require("../database/clientDB");
const s3 = require("../s3");

module.exports = (app, connection, crypto) => {
  app.post("/api/login", (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    password = crypto.cryptoCipher(password);

    db.loginWithIdPw(req, res, connection, id, password);
  });

  app.post("/api/signUp", (req, res) => {
    let userInfo = req.body;
    let id = userInfo.id;
    let password = crypto.cryptoCipher(userInfo.password);
    let name = userInfo.name;

    db.signUp(res, connection, id, password, name);
  });

  app.post("/api/getFriendList", (req, res) => {
    let id = req.body.id;
    db.getFriendList(res, connection, id);
  });

  app.get("/api/session", (req, res) => {
    if (req.session.loginInfo === undefined) {
      res.json({
        status: false
      });
    } else {
      res.json({
        status: true,
        user: {
          id: req.session.loginInfo.id,
          name: req.session.loginInfo.name,
          userImg: req.session.loginInfo.userImg
        }
      });
    }
  });

  app.get("/api/logout", (req, res) => {
    delete req.session.loginInfo;
    res.send("loggout");
  });

  app.get("/api/getPosts/:id", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const id = req.params.id;
    db.getPosts(res, connection, id, 0);
  });

  app.get("/api/getChatNumber/:ids", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      res.json({ status: false });
    } else if (req.params.ids === undefined) {
      res.json({ status: false });
    } else {
      const ids = JSON.parse(req.params.ids);
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
  });

  app.post("/api/sendMessage", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const data = req.body;
    db.sendMessage(res, connection, data);
  });

  app.get("/api/getMessages", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const chat_id = req.query.chat_id;
    const offset = req.query.offset;
    db.getMessages(res, connection, chat_id, offset);
  });

  app.post("/api/rsvp", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const { invitation_num, sent_to, status } = req.body;
    db.rsvp(res, connection, invitation_num, sent_to, status);
  });

  app.get("/api/getImages", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const restaurant = req.query.restaurant;
    db.getImages(res, connection, restaurant);
  });

  app.post("/api/createInvitation", (req, res) => {
    const loginInfo = req.session.loginInfo;
    const id = loginInfo.id;
    const { friends, restaurant, restaurantImgPath } = req.body;
    db.createInvitation(
      res,
      connection,
      id,
      friends,
      restaurant,
      restaurantImgPath
    );
  });

  app.get(`/api/restaurant/:restaurant`, (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const restaurant = req.params.restaurant;
    db.restaurantSearch(res, connection, restaurant);
  });

  app.get("/api/checkIfRestaurantExists/:restaurant", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const restaurant = req.params.restaurant;
    db.checkIfRestaurantExists(res, connection, restaurant);
  });

  app.get("/api/getS3Url", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const { fileName, fileType } = req.query;
    const s3Params = {
      Bucket: process.env.AMAZON_S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read"
    };

    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ status: false, msg: "Internal err with s3" });
      }
      const returnData = {
        signedRequest: data,
        getUrl: `https://${s3Params.Bucket}.s3.amazonaws.com/${fileName}`
      };
      return res.json({ status: true, data: returnData });
    });
  });

  app.put("/api/addRestaurant", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const { restaurant, imgPath } = req.body;
    db.addRestaurant(res, connection, restaurant, imgPath);
  });

  app.put("/api/addProfilePic", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const imgPath = req.body.imgPath;
    const id = loginInfo.id;
    db.addProfilePic(res, connection, id, imgPath);
  });

  app.get("/api/loadAccount/:id", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const id = req.params.id;
    db.getAccountInfo(res, connection, loginInfo.id, id);
  });

  app.post("/api/isFriends", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const { id, friend_id } = req.body;
    db.isFriends(res, connection, id, friend_id);
  });

  app.post("/api/friendRequest", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const id = req.session.loginInfo.id;
    const friend_id = req.body.friend_id;
    db.friendRequest(res, connection, id, friend_id);
  });

  app.get("/api/getFriendRequests", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const id = req.session.loginInfo.id;
    db.getFriendRequests(res, connection, id);
  });

  app.post("/api/makeFriends", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const id = req.session.loginInfo.id;
    const { num, requestId, status } = req.body;
    db.makeFriends(res, connection, num, id, requestId, status);
  });

  app.get("/api/getChatRooms", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const id = req.session.loginInfo.id;
    db.getChatRooms(res, connection, id);
  });

  app.get("/api/getLastMsg/:chat_id", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const chat_id = req.params.chat_id;
    db.getLastMsg(res, connection, chat_id);
  });

  app.get("/api/friendSearch/:inFriends/:name", (req, res) => {
    const loginInfo = req.session.loginInfo;
    if (loginInfo === undefined) {
      return res.json({ status: false });
    }
    const id = loginInfo.id;
    const inFriends = req.params.inFriends;
    const name = req.params.name;
    console.log(id, inFriends, name);
    if (inFriends === "true") {
      db.searchNameInFriends(res, connection, id, name, inFriends);
    } else {
      db.searchNameNotInFriends(res, connection, id, name, inFriends);
    }
  });
};
