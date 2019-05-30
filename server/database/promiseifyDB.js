let mysql = require("mysql");

class promiseifyDB {
  constructor(info) {
    this.db = mysql.createConnection(info);
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
}

module.exports = promiseifyDB;
