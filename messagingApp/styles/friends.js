import { StyleSheet } from "react-native";

export const headerButtonStyles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#787878",
    borderRadius: 23,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});

export const addFriendStyles = StyleSheet.create({
  container: {
    width: "80%",
    height: "fit-content",
    backgroundColor: "#c7c7c7",
    borderRadius: 10,

    alignSelf: "center",
    padding: 20,
  },

  codeContainer: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    padding: 5,
  },
  selfCodeLabel: {
    textAlign: "center",
    fontSize: 20,
  },
  selfCodeCode: {
    textAlign: "center",
    color: "#47adaa",
  },

  friendContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },

  sendRequestLabel: {
    width: "100%",
    height: "fit-content",
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },

  sendRequestButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sendRequestButton: {
    width: 46,
    height: 46,
    marginRight: 10,
  },
  sendRequestButtonImage: {
    flex: 1,
    borderRadius: 23,
    width: null,
    height: null,
    resizeMode: "contain",
    backgroundColor: "#787878",
  },
  sendRequestInput: {
    backgroundColor: "#d4d4d4",
    color: "#47adaa",
    width: "60%",
    height: 30,
    borderRadius: 5,
    padding: 5,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 10,
    textAlign: "center",
    fontSize: 20,
  },
});
