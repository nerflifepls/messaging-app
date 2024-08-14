import { Stack } from "expo-router";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import { formStyles } from "../../styles/starterPages";
import { useEffect, useState } from "react";
import MyButton from "../../components/starterPages/button";
import UserManager from "../../managers/userManager";


export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const tempData =  UserManager.tempData;
  const email = tempData.email;
  const password = tempData.password;
  const confirmPassword = tempData.confirmPassword;

  function isInputsValid() {
    if (verificationCode == "" || verificationCode.length != 4) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    setButtonDisabled(!isInputsValid());
  }, [verificationCode]);

  async function handleVerification() {
    if (!isInputsValid()) {
      return;
    }
    setIsLoading(true);
    const userManager = await UserManager.getInstance();
    var data = await userManager.verifyEmail(email, verificationCode);

    //verification successfull
    if (data.internalCode == 107){
        const newUserId = data.userId
        var data = await userManager.registerUser(newUserId, email, password, confirmPassword)
        //registration successfull
        if (data.internalCode == 210){
            userManager.signInUserEmailPassword(email, password)
        }
    }  
    setIsLoading(false);
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
        <Text style={formStyles.header}>Verify email</Text>
        <TextInput
          value={verificationCode}
          onChangeText={(text) => {
            setVerificationCode(text);
          }}
          placeholder="Verification code"
          style={formStyles.input}
        ></TextInput>

        <MyButton
          text="Verify"
          handleClick={handleVerification}
          buttonDisabled={buttonDisabled}
          isLoading={isLoading}
        ></MyButton>
      </View>
    </SafeAreaView>
  );
}
