import {
  Image,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
} from "react-native";
import { Text } from "./Themed";
import Colors from "../constants/Colors";

const pngs: Record<string, any> = {
  rocket: require("../assets/images/rocket.png"),
  buildings: require("../assets/images/buildings.png"),
  forhire: require("../assets/images/forhire.png"),
  roster: require("../assets/images/roster.png"),
};

export function DrawerButton(props: {
  text: string;
  isActive: boolean;
  onPress: (event: GestureResponderEvent) => void;
}) {
  let text = props.text.substring(0, 1).toUpperCase() + props.text.substring(1);
  if (props.text == "forhire") {
    text = "Available\nCandidates";
  }

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.drawerButton,
        { opacity: pressed ? 0.5 : 1 },
        { borderColor: props.isActive ? Colors.primary : "#666" },
      ]}
    >
      <Image source={pngs[props.text]} style={styles.drawerImage} />
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
  },
  drawerImage: {
    width: 128,
    height: 128,
    resizeMode: "contain",
  },
  drawerText: {
    color: "#fff",
    fontSize: 16,
    paddingBottom: 10,
    position: "absolute",
    textAlign: "center",
    bottom: 0,
  },
});
