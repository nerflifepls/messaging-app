import { StyleSheet } from "react-native";

export const footerStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    
    position: "absolute",
    bottom: 0,
    padding: 20,
    borderTopColor: "gray",
    borderTopWidth: 2,

    width: "100%",
    height: "fit-content",
  },

  textContainer: {
    width: "fit-content",
    height: "fit-content",

    
  },

  text: {
    textAlign: "center",
  },
  textHref: {
    marginLeft: 10,
    color: "#4287f5",
  }
});
