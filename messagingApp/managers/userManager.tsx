import makeApiCall from "../helperFunctions/makeApiCall";
import SyncStorage from "sync-storage";
import RouterManager from "./routerManager";
import CryptoJS from "crypto-js";

export default class UserManager {
  public user: user;
  static instance: UserManager;

  static tempData: any = {};
  private constructor() {
    this.user = {} as user;
  }
  static async getInstance() {
    if (!UserManager.instance) {
      await SyncStorage.init();
      UserManager.instance = new UserManager();
      await UserManager.instance.initializeInstance();
    }
    return UserManager.instance;
  }
  private async initializeInstance() {
    this.user.id = await SyncStorage.get("id");
    this.user.token = await SyncStorage.get("token");
  }

  public async registerTempUser(email) {
    var data = await makeApiCall({
      method: "post",
      endpoint: "registerTempUser",
      requestBody: {
        email: email,
      },
    });
    return data;
  }
  public async verifyEmail(email, verificationCode) {
    var data = await makeApiCall({
      method: "post",
      endpoint: "verifyEmail",
      requestBody: {
        email: email,
        verificationCode: verificationCode,
      },
    });
    return data;
  }
  public async registerUser(userId, email, password, confirmPassword) {
    password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    confirmPassword = CryptoJS.SHA256(confirmPassword).toString(
      CryptoJS.enc.Hex
    );

    var data = await makeApiCall({
      method: "post",
      endpoint: "registerUserEmailPassword",
      requestBody: {
        userId: userId,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
    });

    return data;
  }

  public async signInUserEmailPassword(email: string, password: string) {
    password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    var data = await makeApiCall({
      method: "get",
      endpoint: "loginUser",
      requestBody: {},
      requestHeaders: { email: email, password: password },
    });
    if (data.internalCode == 205) {
      return data.internalCode;
    }
    this.user.token = data.token;
    this.user.id = data.userId;

    //save id and token at localstorage
    await SyncStorage.set("token", this.user.token);
    await SyncStorage.set("id", this.user.id);

    //redirect to home page
    RouterManager.getInstance().resetRouterAndReplace("home");
  }

  public async fetchUserData() {
    var data = await makeApiCall({
      method: "get",
      endpoint: "getUser",
      requestBody: {},
      requestHeaders: { userId: this.user.id, authorization: this.user.token },
    });
    // data retrieved succesfully
    if (data.internalCode == 211) {
      this.user.userData = data.userData;
    }
    // unauthorized (Probably deleted token from server)
    if (data.internalCode == 207) {
      this.logOut();
    }
  }

  public async logOut() {
    await SyncStorage.remove("token");
    await SyncStorage.remove("id");

    RouterManager.getInstance().resetRouterAndReplace("");

    this.resetSelf();
  }

  private resetSelf() {
    this.user = {} as user;
  }

  







  public saveTempData(email, password, confirmPassword) {
    UserManager.tempData.email = email;
    UserManager.tempData.password = password;
    UserManager.tempData.confirmPassword = confirmPassword;
  }
}

export type user = {
  id: string;
  token: string;
  userData: any;
};
