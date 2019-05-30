let mysql = require("mysql");

class promiseifyDB {
  constructor(info) {
    this.db = mysql.createConnection(info);
    this.db.connect(err => console.log(err));
    this.handleDisconnect(info);
    // this.db.on("error", err => {
    //   console.log("db error", err);
    //   if (err.code === "PROTOCOL_CONNECTION_LOST") {
    //     this.db = mysql.createConnection(info);
    //   } else {
    //     console.log("MYSQL ERROR CODE = ", err.code);
    //     throw err;
    //   }
    // });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  select(query) {
    return new Promise((resolve, reject) => {
      this.db.query(query, (err, rows) => {
        if (err) {
          return reject(new Error(err));
        }
        resolve(rows);
      });
    });
  }

  insert(query) {
    return new Promise((resolve, reject) => {
      this.db.query(query, err => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }

  update(query) {
    return new Promise((resolve, reject) => {
      this.db.query(query, err => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }

  escape(string) {
    return this.db.escape(string);
  }

  handleDisconnect(info) {
    this.db.on("error", err => {
      if (!err.fatal) {
        return;
      }

      if (err.code !== "PROTOCOL_CONNECTION_LOST") {
        throw err;
      }

      console.log("Re-connecting lost connection: " + err.stack);

      this.db = mysql.createConnection(info);
      this.handleDisconnect(info);
      this.db.connect(err => console.log(err));
    });
  }
}

module.exports = promiseifyDB;
