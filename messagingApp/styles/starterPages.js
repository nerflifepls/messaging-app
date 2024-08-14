import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
    container: {
        padding: 20,
        width: "70%",
        height: "fit-content",
        backgroundColor: "gray",
        transform:  [{translateX: -50}],
        transform:  [{translateY: -50}],
        borderRadius: 10,

    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },

    input: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: "white",
    },

    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "white",
        transition: "all 1s ease-in-out",
    },
    buttonDisabled: {
        backgroundColor: "#c2c0c0",
        transition: "all 1s ease-in-out",
    },
    buttonText: {
        color: "black",
        textAlign: "center",
    },
    buttonTextDisabled: {
        color: "white",
    }
    
});