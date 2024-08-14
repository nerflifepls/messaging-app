const {
  getUserFromFriendCode,
  saveFriendRequest,
  getFriendRequestFromTo,
  makeFriends,
  deleteFriendRequest,
  getFriendsAB,
} = require("../database/friendRequests.js");
const { verifyTokenForUser } = require("../jtw.js");
module.exports = function (app) {
  app.route("/sendFriendRequest").post(async (req, res) => {
    //check if user is authorized
    if (!req.headers.authorization) {
      res.status(200);
      res.send({ internalCode: 102 });
      return;
    }
    const isAuthorized = await verifyTokenForUser(req.headers.authorization);
    if (isAuthorized.internalCode != 211) {
      res.status(200);
      res.send(isAuthorized);
      return;
    }

    if (!req.body) {
      res.status(200);
      res.send({ internalCode: 101 });
      return;
    }
    const senderId = req.body.senderId;
    const receiverFriendCode = req.body.receiverFriendCode;
    const timestamp = Date.now();

    if (!receiverFriendCode || !senderId) {
      res.status(200);
      res.send({ internalCode: 301 });
      return;
    }

    const receiverUser = await getUserFromFriendCode(receiverFriendCode);

    if (!receiverUser) {
      res.status(200);
      res.send({ internalCode: 302 });
      return;
    }

    if (receiverUser.id === senderId) {
      res.status(200);
      res.send({ internalCode: 303 });
      return;
    }
    //check if users already friends
    const friends = await getFriendsAB(senderId, receiverUser.id);
    if (friends.length != 0) {
      res.status(200);
      res.send({ internalCode: 305 });
      return;
    }

    //check if sender already send a friend request to user
    var friendRequestsFromTo = await getFriendRequestFromTo(
      senderId,
      receiverUser.id
    );
    if (friendRequestsFromTo.length != 0) {
      res.status(200);
      res.send({ internalCode: 304 });
      return;
    }

    //check if receiver already send a friend request to user and if yes just make them friends
    var friendRequestsFromTo = await getFriendRequestFromTo(
      receiverUser.id,
      senderId
    );
    if (friendRequestsFromTo != 0) {
      //delete request from sender to receiver and from receiver to sender
      await deleteFriendRequest(senderId, receiverUser.id);
      await deleteFriendRequest(receiverUser.id, senderId);
      //add friends
      await makeFriends(senderId, receiverUser.id);

      res.status(200);
      res.send({ internalCode: 311 });
      return;
    }

    await saveFriendRequest(senderId, receiverUser.id, timestamp);

    res.status(200);
    res.send({ internalCode: 310 });
  });

};
