const apiUrl = "http://192.168.1.9:6666/";
import axios from "axios";
import RouterManager from "../managers/routerManager";
import UserManager from "../managers/userManager";

interface Props {
  method: string;
  endpoint: string;
  requestBody?: object;
  requestHeaders?: object;
}
async function makeApiCall({
  method,
  endpoint,
  requestBody = {},
  requestHeaders,
}: Props) {
  const headers = {
    "Content-Type": "application/json",
    ...requestHeaders,
  };

  return await axios({
    method: method,
    url: apiUrl + endpoint,
    headers: headers,
    data: requestBody,
  })
    .then(async (response) => {
      const internalCode = response.data.internalCode;
      response.data.internalServerMessage = getErrorMessage(internalCode);
      console.log(response.data);
      if (internalCode == 206) {
        RouterManager.getInstance().resetRouterAndReplace("");
      }
      if (internalCode == 106) {
        RouterManager.getInstance().resetRouterAndReplace("signup");
      }

      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getErrorMessage(code) {
  switch (code) {
    case 101:
      return "Missing request body";
    case 102:
      return "Missing authorazation token";
    case 103:
      return "Missing email for verification";
    case 104:
      alert("Invalid email");
      return "Server error with sending verification email";
    case 105:
      alert("Wrong verification code");
      return "Wrong verification code";
    case 106:
      alert("Server error with verification email please try again");
      return "Verification code doesn't exist in database";
    case 107:
      alert("Email verified");
      return "Email verified";
    case 108:
      return "Email not verified";
    case 109: 
      return "Missing email or verification code"
    case 201:
      return "Missing email or password or confirm password";
    case 202:
      alert("Passwords do not match");
      return "Passwords do not match";
    case 203:
      alert("Email already exists");
      return "Email already exists";
    case 204:
      return "Missing email or password";
    case 205:
      alert("Invalid email or password");
      return "Invalid email or password";
    case 206:
      alert("Session expired please sign in again");
      return "Token expired";
    case 207:
      return "Unauthorized";
    case 209:
      return "Sign in successful";
    case 210:
      return "user registered successfully!";
    case 211:
      return "Authorized";
    case 212:
      alert("Verification email send successfully!");
      return "Verification email send successfully";
    case 301:
      return "Missing sender id or receiver friend code";
    case 302:
      alert("Invalid friend code");
      return "Friend code not valid";
    case 303:
      alert("You can't add your self!");
      return "User attempted to add self";
    case 304:
      alert("You already send a friend request to this user!");
      return "User attempted to send friend request to already requested user";
    case 305:
      alert("You are already friends with this user!");
      return "User attempted to send friend request to already friend user";
    case 310:
      alert("Friend request sent successfully");
      return "Friend request sent";
    case 311:
      alert("Friend added!");
      return "Friend added";
    default:
      return "Internal server error";
  }
}

export default makeApiCall;
