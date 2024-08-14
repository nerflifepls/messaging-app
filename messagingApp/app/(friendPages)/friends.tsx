import { Stack } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageStyle,
  ActivityIndicator,
} from "react-native";
import { addFriendStyles } from "../../styles/friends";
import { useEffect, useState } from "react";
import UserManager, { user } from "../../managers/userManager";
import FriendsManager from "../../managers/friendsManager";
export default function Friends() {
  const [user, setUser] = useState({ userData: {} } as user);
  const [friendCode, setFriendCode] = useState("");
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchUserData() {
      var userManager = await UserManager.getInstance();
      setUser(userManager.user);
    }
    fetchUserData();
  }, []);

  async function addFriend() {
    if (friendCode.length != 6) {
      return;
    }
    setIsLoading(true)
    const result = await FriendsManager.getInstance().addFriend(friendCode)
    if (result == true) {
      setFriendCode("");
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerShadowVisible: false,
        }}
      ></Stack.Screen>
      <View style={addFriendStyles.container}>
        <View style={addFriendStyles.codeContainer}>
          <Text style={addFriendStyles.selfCodeLabel}>Your friend code</Text>
          <Text style={addFriendStyles.selfCodeCode}>
            {user.userData.friendCode}
          </Text>
        </View>

        <View style={[addFriendStyles.codeContainer, { marginTop: 10 }]}>
          <View style={addFriendStyles.friendContainer}>
            <Text style={addFriendStyles.sendRequestLabel}>Add a friend</Text>
            <View style={addFriendStyles.sendRequestButtonContainer}>
              <TextInput
                maxLength={6}
                style={addFriendStyles.sendRequestInput}
                onChangeText={setFriendCode}
                value={friendCode}
              ></TextInput>
              { isLoading ? <ActivityIndicator size="small" color="black" /> : <TouchableOpacity
                onPress={addFriend}
                style={addFriendStyles.sendRequestButton}
              >
                <Image
                  source={require("../../assets/sendFriendRequestButton.png")}
                  style={addFriendStyles.sendRequestButtonImage as ImageStyle}
                ></Image>
              </TouchableOpacity>}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
