import { Image, GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";
import Colors from "../constants/Colors";
import GlobalImages from "./GlobalImages";

export function DrawerButton(props: {
  text: string;
  isActive: boolean;
  onPress: (event: GestureResponderEvent) => void;
}) {
  let text = props.text.substring(0, 1).toUpperCase() + props.text.substring(1);
  let image = GlobalImages[props.text + "Button"];

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.drawerButton,
        { opacity: pressed ? 0.5 : 1 },
        { borderColor: props.isActive ? Colors.primary : "#666" },
      ]}
    >
      <Image source={image} style={styles.drawerImage} />
      <Text style={styles.drawerText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  drawerButton: {
    padding: 5,
    paddingHorizontal: 0,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#666",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#08070a",
    height: "100%",
    overflow: "hidden",
  },
  drawerImage: {
    height: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  drawerText: {
    color: "#fff",
    fontSize: 14,
    paddingBottom: 2,
    position: "absolute",
    textAlign: "center",
    bottom: 0,
  },
});
