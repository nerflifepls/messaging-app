import React, { useRef, useEffect } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { formStyles } from "../../styles/starterPages";

const MyButton = ({ handleClick, buttonDisabled, text, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[
        formStyles.button,
        buttonDisabled ? formStyles.buttonDisabled : {},
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="black"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        ></ActivityIndicator>
      ) : (
        <Text
          style={[
            formStyles.buttonText,
            buttonDisabled ? formStyles.buttonTextDisabled : {},
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default MyButton;
