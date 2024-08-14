import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
} from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { formStyles } from "../../styles/starterPages";
import { useEffect, useState } from "react";
import MyButton from "../../components/starterPages/button";
import makeApiCall from "../../helperFunctions/makeApiCall";
import UserManager from "../../managers/userManager";
import StarterPagesFooter from "../../components/starterPages/StarterPagesFooter";
import RouterManager from "../../managers/routerManager";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userManager = UserManager.getInstance();
  async function handleSignUp() {
    if (!isInputsValid()) {
      return;
    }
    setIsLoading(true);

    var data = await (await UserManager.getInstance()).registerTempUser(email);

    if (data.internalCode == 212) {
      (await UserManager.getInstance()).saveTempData(email, password, confirmPassword);
      RouterManager.getInstance().router.push("verifyemail");
    }
    setIsLoading(false);
  }

  function isInputsValid() {
    if (password != confirmPassword || password == "") {
      return false;
    }
    if (email == "") {
      return false;
    }

    return true;
  }

  useEffect(() => {
    setButtonDisabled(!isInputsValid());
  }, [email, password, confirmPassword]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <Stack.Screen
        options={{ headerShown: true, title: "", headerShadowVisible: false }}
      ></Stack.Screen>
      <View style={formStyles.container}>
        <Text style={formStyles.header}>Sign up</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Email"
          style={formStyles.input}
        ></TextInput>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          placeholder="Password"
          style={formStyles.input}
        ></TextInput>
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          placeholder="Confirm password"
          style={formStyles.input}
        ></TextInput>

        <MyButton
          text="Sign up"
          handleClick={handleSignUp}
          buttonDisabled={buttonDisabled}
          isLoading={isLoading}
        ></MyButton>
      </View>

      <StarterPagesFooter
        text="Already have an account?"
        textHref="Sign in"
        pageRoute="signin"
      ></StarterPagesFooter>
    </SafeAreaView>
  );
};

export default signup;
