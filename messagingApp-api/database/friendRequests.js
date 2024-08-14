const { db, runAllWrapper } = require("./main");


module.exports.getUserFromFriendCode = async (friendcode) => {
    const user = await runAllWrapper(
        `SELECT * FROM users WHERE friendcode = "${friendcode}";`
    );
    return user[0];
};
module.exports.getFriendsAB = async (userA, userB) => {
    const sql = `SELECT * FROM friends WHERE userA = "${userA}" AND userB = "${userB}" OR userA = "${userB}" AND userB = "${userA}";`;
    return await runAllWrapper(sql);
}

module.exports.saveFriendRequest = async (senderid, receiverid, timestamp) => {
    const sql = `INSERT INTO friendrequests (senderid, receiverid, timestamp) VALUES ("${senderid}", "${receiverid}", "${timestamp}");`;
    db.run(sql);
}

module.exports.getFriendRequestFromTo = async (senderid, receiverid) => {
    const sql = `SELECT * FROM friendrequests WHERE senderid = "${senderid}" AND receiverid = "${receiverid}";`;
    return await runAllWrapper(sql);
}

module.exports.makeFriends = async (userA, userB) => {
    const sql = `INSERT INTO friends (userA, userB) VALUES ("${userA}", "${userB}");`;
    db.run(sql);
}

module.exports.deleteFriendRequest = async (senderid, receiverid) => {
    const sql = `DELETE FROM friendrequests WHERE senderid = "${senderid}" AND receiverid = "${receiverid}";`;
    db.run(sql);
}