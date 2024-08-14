import { StyleSheet } from "react-native";

export const profileButtonStyles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        marginTop: 30,
    },

    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain",
    
        backgroundColor: "#787878",
        borderRadius: 23,
    }
});