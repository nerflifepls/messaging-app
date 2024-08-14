const { error } = require("console");
const { checkUserCredentials, verifyTokenForUser } = require("../jtw");
const {
  isEmailUnique,
  registerUserToDB,
  getUserByToken,
  getVerificationCodeForEmail,
  addVerificationCodeForUser,
  deleteVerificationCodes,
  registerIdToDB,
  getUserFromId,
} = require("../database/users");

const { sendEmail } = require("../transporters/transporter");
const {crypto, createHash} = require("crypto")

module.exports = function (app) {
  app.route("/registerTempUser").post(async (req, res) => {
    if (!req.body) {
      res.status(200);
      res.send({ internalCode: 101 });
      return;
    }
    const email = req.body.email;
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    if (!email) {
      res.status(200);
      res.send({ internalCode: 103 });
      return;
    }

    const emailUnique = await isEmailUnique(email);
    
    if (!emailUnique) {
      res.status(200);
      res.send({ internalCode: 203 });
      return;
    }
    
    var data = await sendEmail({
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode.toString()}`,
    });
    if (data.internalCode != 212) {
      res.status(200);
      res.send(data);
      return;
    }

    await addVerificationCodeForUser(email, verificationCode);
    res.status(200);
    res.send({ internalCode: 212 });
  });
  app.route("/verifyEmail").post(async (req, res) => {
    if (!req.body) {
      res.status(200);
      res.send({ internalCode: 101 });
      return;
    }
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;
    if (!email || !verificationCode) {
      res.status(200);
      res.send({ internalCode: 109 });
      return;
    }

    const realVerificationCode = await getVerificationCodeForEmail(email);
    if (!realVerificationCode) {
      res.status(200);
      res.send({ internalCode: 106 });
      return;
    }
    if (realVerificationCode !== verificationCode) {
      res.status(200);
      res.send({ internalCode: 105 });
      return;
    }

    deleteVerificationCodes(email);

    const { v4: uuidv4 } = require("uuid");
    var userId = uuidv4();

    registerIdToDB(userId);

    res.status(200);
    res.send({ internalCode: 107, userId: userId });
  });
  app.route("/registerUserEmailPassword").post(async (req, res) => {
    if (!req.body) {
      res.status(200);
      res.send({ internalCode: 101 });
      return;
    }
    const userId = req.body.userId;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!email || !password || !confirmPassword) {
      res.status(200);
      res.send({ internalCode: 201 });
      return;
    }

    if (password !== confirmPassword) {
      res.status(200);
      res.send({ internalCode: 202 });
      return;
    }

    const emailUnique = await isEmailUnique(email);

    if (!emailUnique) {
      res.status(200);
      res.send({ internalCode: 203 });
      return;
    }

    const { v4: uuidv4 } = require("uuid");
    const friendCode = uuidv4().split("-")[0].substring(0, 6);

    //check if userid exists in db
    var data = await getUserFromId(userId);
    if (data.lenth == 0) {
      res.status(200);
      res.send({ internalCode: 108 });
    }
    registerUserToDB(userId, friendCode, email, password);

    res.status(200);
    res.send({ internalCode: 210 });
  });

  app.route("/loginUser").get(async (req, res) => {
    const email = req.headers.email;
    const password = req.headers.password;

    if (!email || !password) {
      res.status(200);
      res.send({ internalCode: 204 });
    }

    const returnValue = await checkUserCredentials(email, password);
    const containsToken = returnValue.containsToken;

    if (!containsToken) {
      res.status(200);
      res.send({ internalCode: 205 });
      return;
    }
    res.status(200);
    res.send({
      internalCode: 209,
      token: returnValue.token,
      userId: returnValue.userId,
    });
  });

  app.route("/getUser").get(async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(200);
      res.send({ internalCode: 102 });
      return;
    }
    const isAuthorized = await verifyTokenForUser(token);

    if (isAuthorized.internalCode != 211) {
      res.status(200);
      res.send(isAuthorized);
      return;
    }

    const user = await getUserByToken(token);

    var returnData = {
      email: user.email,
      friendCode: user.friendcode,
    };

    res.status(200);
    res.send({ internalCode: 211, userData: returnData });
  });

  

  
};
