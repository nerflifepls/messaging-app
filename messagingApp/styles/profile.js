import { StyleSheet } from "react-native";

export const profileLogOutButton = StyleSheet.create({
  logOutButton: {
    position: "absolute",
    bottom: 20,
    display: "flex",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "#ff2e2e",
    width: "50%",
    height: "fit-content",
    borderRadius: 10,
    fontSize: 20,
  },
  logOutButtonText: {
    textAlign: "center",
    color: "white",
  },
});

export const profileInformation = StyleSheet.create({
  container: {
    backgroundColor: "#919191",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "fit-content",

    alignSelf: "center",
    top: "35%",
  },
  label: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  email: {
    color: "white",
    textAlign: "center",
  },
});
