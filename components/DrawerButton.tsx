import {
  Image,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
} from "react-native";
import { Text } from "./Themed";

const pngs: Record<string, any> = {
  rocket: require("../assets/images/rocket.png"),
  buildings: require("../assets/images/buildings.png"),
};

export function DrawerButton(props: {
  text: string;
  isActive: boolean;
  onPress: (event: GestureResponderEvent) => void;
}) {
  const text =
    props.text.substring(0, 1).toUpperCase() + props.text.substring(1);

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.drawerButton,
        { opacity: pressed ? 0.5 : 1 },
        { borderColor: props.isActive ? "#ccc" : "#666" },
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
    margin: 5,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#666",
    borderWidth: 1,
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
  },
});
