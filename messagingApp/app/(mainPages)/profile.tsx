import { Stack, useRouter } from "expo-router";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { profileLogOutButton, profileInformation } from "../../styles/profile";
import UserManager, { user } from "../../managers/userManager";
import { useEffect, useState } from "react";
export default function Profile() {
  const [user, setUser] = useState({ userData: {} } as user);

  async function handleLogOut() {
    const userManager = await UserManager.getInstance();
    userManager.logOut();
  }

  useEffect(() => {
    async function fetchUserData() {
      var userManager = await UserManager.getInstance();
      setUser(userManager.user);
    }
    fetchUserData();
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
      <View style={profileInformation.container}>
        <Text style={profileInformation.label}>Email</Text>
        <Text style={profileInformation.email}>{user.userData.email}</Text>
      </View>
      <TouchableOpacity
        onPress={handleLogOut}
        style={profileLogOutButton.logOutButton}
      >
        <Text style={profileLogOutButton.logOutButtonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
