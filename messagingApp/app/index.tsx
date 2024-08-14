import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import UserManager from "../managers/userManager";
import RouterManager from "../managers/routerManager";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function Index() {
  const router = useRouter();
  RouterManager.getInstance().router = router;
  useEffect(() => {
    async function getUserManager() {
      const userManager = await UserManager.getInstance();
      const user = userManager.user;

      if (user.token) {
        router.replace("home");
      } else {
        router.replace("signin");
      }
    }
    getUserManager();
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerShadowVisible: false,
        }}
      ></Stack.Screen>
      <ActivityIndicator size="large" color="black" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>
    </SafeAreaView>
  );
}
