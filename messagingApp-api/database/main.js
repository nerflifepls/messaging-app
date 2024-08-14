const sqlite = require("sqlite3").verbose();
let sql;

const path = require("path");
const dirname = path.resolve();

module.exports.db = new sqlite.Database(
  dirname + "\\database\\main.db",
  sqlite.OPEN_READWRITE,
  (error) => {
    if (error) console.log(error);
  }
);

module.exports.initializeDataBase = async (db) => {
  sql = `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        friendcode VARCHAR(255), 
        email VARCHAR(255),
        password VARCHAR(255),
        token VARCHAR(255)
    );`;
  await db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS tempusers (
        email VARCHAR(255) NOT NULL,
        verificationCode VARCHAR(255)
    );`;
  await db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS friendrequests (
        senderid VARCHAR(255) NOT NULL,
        receiverid VARCHAR(255) NOT NULL,
        timestamp INT NOT NULL
    );`;
  await db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS friends (
        userA VARCHAR(255) NOT NULL,
        userB VARCHAR(255) NOT NULL
    );`;
  await db.run(sql);
};

module.exports.dropDatabase = async (db) => {
  sql = `DROP TABLE IF EXISTS users;`;
  await db.run(sql);

  sql = `DROP TABLE IF EXISTS tempusers;`;
  await db.run(sql);

  sql = `DROP TABLE IF EXISTS friendrequests;`;
  await db.run(sql);

  sql = `DROP TABLE IF EXISTS friends;`;
  await db.run(sql);
};

module.exports.runAllWrapper = async (query) => {
  const db = this.db;
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
