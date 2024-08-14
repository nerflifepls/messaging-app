import { TouchableOpacity, Image } from "react-native";
import RouterManager from "../../managers/routerManager";
import { headerButtonStyles } from "../../styles/friends";
export default function FriendsButton() {
  const router = RouterManager.getInstance().router;

  function handleClick() {
    router.push("friends");
  }
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={headerButtonStyles.container}
    >
      <Image
        style={headerButtonStyles.image}
        source={require("../../assets/sendMessagesButton.png")}
      ></Image>
    </TouchableOpacity>
  );
}
