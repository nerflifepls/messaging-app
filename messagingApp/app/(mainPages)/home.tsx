import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import ProfileButton from "../../components/mainPages/ProfileButton";
import { useEffect } from "react";
import UserManager from "../../managers/userManager";
import FriendsButton from "../../components/mainPages/FriendsButton";

export default function Home() {
  useEffect(() => {
    async function getUserData() {
      var userManager = await UserManager.getInstance();
      userManager.fetchUserData();
    }
    getUserData();
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerLeft: () => <ProfileButton></ProfileButton>,
          headerRight: () => <FriendsButton></FriendsButton>,
        }}
      ></Stack.Screen>
    </SafeAreaView>
  );
}
