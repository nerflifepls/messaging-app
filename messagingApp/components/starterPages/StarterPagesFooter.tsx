import { View, Text, SafeAreaView } from "react-native";
import { footerStyles } from "../../styles/starterPagesFooter";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface Props{
  text: string,
  textHref: string,
  pageRoute: string
}
function StarterPagesFooter({text, textHref, pageRoute}: Props) {
  const router = useRouter();
  return (
    <View style={footerStyles.container}>
      <View style={footerStyles.textContainer}>
        <Text style={footerStyles.text}>{text}</Text>
      </View>
      <TouchableOpacity style={footerStyles.textContainer} onPress={() => {
        router.replace(pageRoute);
      }}>
        <Text style={[footerStyles.text, footerStyles.textHref]}>
          {textHref}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default StarterPagesFooter;
