import { View, Text, Image, TouchableOpacity } from "react-native";
import { profileButtonStyles } from "../../styles/profileButton";
import { useRouter } from "expo-router";

export default function ProfileButton(){
    const router = useRouter();
    function handleClick(){
        router.push("profile");
    }

    return (
        <TouchableOpacity onPress={handleClick} style={profileButtonStyles.container}>
            <Image style={profileButtonStyles.image} source={require("../../assets/defaultProfilePicture.png")}></Image>
        </TouchableOpacity>
    )
}