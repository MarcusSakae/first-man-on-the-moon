import { Slider } from "@react-native-assets/slider";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

export function StyledButton(props: {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: Colors.primary,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "#cccccc",
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  buttonPressed: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: Colors.primary,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
