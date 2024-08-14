import makeApiCall from "../helperFunctions/makeApiCall";
import UserManager from "./userManager";

export default class FriendsManager {

    private static instance: FriendsManager;

    public static getInstance () {
        if (!FriendsManager.instance) {
            FriendsManager.instance = new FriendsManager();
        }
        return FriendsManager.instance;
    }

    public async addFriend(friendCode) {
        const userManager = await UserManager.getInstance();
        const user = userManager.user;
        var data = await makeApiCall({
          method: "post",
          endpoint: "sendFriendRequest",
          requestBody: {
            senderId: user.id,
            receiverFriendCode: friendCode,
          },
          requestHeaders: { authorization: user.token },
        });
    
        if (data.internalCode == 310 || data.internalCode == 311) {
          return true;
        }
    
        return false;
      }
    
}