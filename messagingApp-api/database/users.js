const { db, runAllWrapper } = require("./main");

module.exports.isEmailUnique = async (email) => {
  const emails = await runAllWrapper("SELECT email FROM users;");

  for (let i = 0; i < emails.length; i++) {
    if (emails[i].email === email) {
      return false;
    }
  }
  return true;
};

module.exports.registerUserToDB = (id, friendCode, email, password) => {
  db.run(
    `UPDATE users SET friendcode = "${friendCode}", email = "${email}", password = "${password}" WHERE id = "${id}"`
  );
};
module.exports.registerIdToDB = (id) => {
  db.run(`INSERT INTO users (id) VALUES ("${id}")`);
};
module.exports.getUserFromId = async (id) => {
  const user = await runAllWrapper(
    "SELECT * FROM users WHERE id = '" + id + "';"
  );
  return user[0];
};
module.exports.updateTokenForUser = (id, token) => {
  db.run(`UPDATE users SET token = "${token}" WHERE id = "${id}"`);
};

module.exports.getUserByEmail = async (email) => {
  const user = await runAllWrapper(
    "SELECT * FROM users WHERE email = '" + email + "';"
  );
  return user[0];
};

module.exports.getUserByToken = async (token) => {
  const user = await runAllWrapper(
    "SELECT * FROM users WHERE token = '" + token + "';"
  );
  return user[0];
};



module.exports.getTokenFromEmail = async (email) => {
  const user = await runAllWrapper(
    "SELECT token FROM users WHERE email = '" + email + "';"
  );
  return user[0].token;
};

module.exports.addVerificationCodeForUser = async (email, verificationCode) => {
  db.run(`DELETE FROM tempusers WHERE email = "${email}";`);
  db.run(
    `INSERT INTO tempusers (email, verificationCode) VALUES ("${email}", ${verificationCode});`
  );
};
module.exports.deleteVerificationCodes = async (email) => {
  db.run(`DELETE FROM tempusers WHERE email = "${email}";`);
};
module.exports.getVerificationCodeForEmail = async (email) => {
  const user = await runAllWrapper(
    "SELECT verificationCode FROM tempusers WHERE email = '" + email + "';"
  );
  return user[0].verificationCode;
};
