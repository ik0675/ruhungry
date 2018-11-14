let mysql = require('mysql');

class promiseifyDB {
  constructor(info) {
    this.db = mysql.createConnection(info);
  }

  connect() {
    this.db.connect((err) => {
      if (err)
        throw err;
      console.log(`Connected to database at localhost`);
    });
  }

  close() {
    this.db.close();
  }

  select(query) {
    return new Promise( (resolve, reject) => {
      this.db.query(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }

  insert(query) {
    return new Promise( (resolve, reject) => {
      this.db.query(query, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      })
    })
  }

  update(query) {
    return new Promise( (resolve, reject) => {
      this.db.query(query, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      })
    })
  }
}

module.exports = promiseifyDB;
