const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
  getUserByToken,
  updateTokenForUser,
  getTokenFromEmail,
} = require("./database/users");
const secret = "mysecretkey";

module.exports.verifyTokenForUser = async (token) => {
  const user = await getUserByToken(token);
  if (!user) {
    return { internalCode: 207 };
  }
  if (user.token === token) {
    try {
      jwt.verify(token, secret);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return { internalCode: 206 };
      }
      console.log(error);
      return { status: 500, message: "internal server error" };
    }
    return { internalCode: 211 };
  }

  return { status: 401, message: "unathorized" };
};

module.exports.checkUserCredentials = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return { status: 401, message: "user not found" };
  }

  if (user.email === email && user.password === password) {
    const isPreviousTokenValid = await module.validatePreviousToken(user);
    
    if (isPreviousTokenValid) {
      return { containsToken: true, token: user.token, userId: user.id };
    }
    //if not previous token create new
    const token = jwt.sign({ userUID: user.userId }, secret, {
      expiresIn: "10d",
    });
    await updateTokenForUser(user.id, token);

    return {containsToken: true, token: token, userId: user.id };
  }

  return { containsToken: false};
};

module.validatePreviousToken = async (user) => {
  const currentToken = user.token

  if (currentToken) {
    try {
      jwt.verify(currentToken, secret);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return false
      }
      console.log(err);
      return { status: 500, message: "internal server error" };
    }

    return true
  }

  return false;
};
