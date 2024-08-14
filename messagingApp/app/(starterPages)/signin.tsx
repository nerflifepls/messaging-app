import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { formStyles } from "../../styles/starterPages";
import MyButton from "../../components/starterPages/button";
import { useEffect, useState } from "react";
import StarterPagesFooter from "../../components/starterPages/StarterPagesFooter";
import UserManager from "../../managers/userManager";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  function isInputsValid() {
    if (email == "" || password == "") {
      return false;
    }

    return true;
  }
  useEffect(() => {
    setButtonDisabled(!isInputsValid());
  }, [email, password]);

  async function handleSignIn() {
    if (!isInputsValid()) {
      return;
    }
    setIsLoading(true)
    const userManager = await UserManager.getInstance();
    await userManager.signInUserEmailPassword(email, password);
    setIsLoading(false)
  }

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
        <Text style={formStyles.header}>Sign in</Text>
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

        <MyButton
          text="Sign in"
          handleClick={handleSignIn}
          buttonDisabled={buttonDisabled}
          isLoading={isLoading}
        ></MyButton>
      </View>

      <StarterPagesFooter
        text={"Don't have an account?"}
        textHref="Sign up"
        pageRoute="signup"
      ></StarterPagesFooter>
    </SafeAreaView>
  );
};

export default signin;
