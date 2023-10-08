import { Slider } from "@react-native-assets/slider";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

type StyleButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  type?: "primary" | "cancel";
  disabled?: boolean;
};
export function StyledButton({
  onPress,
  text,
  type = "primary",
  disabled,
}: StyleButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        type === "cancel" && styles.buttonCancel,
        pressed && !disabled && styles.buttonPressed,
        pressed && type === "cancel" && !disabled && styles.buttonPressedCancel,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: Colors.secondaryLight,
    borderColor: Colors.neutral,
  },
  buttonCancel: {
    backgroundColor: Colors.warningDark,
  },
  buttonPressed: {
    backgroundColor: Colors.secondaryLighter,
    borderColor: Colors.primary,
  },
  buttonPressedCancel: {
    backgroundColor: Colors.warning,
  },
  buttonDisabled: {
    opacity: 0.5,
    borderColor: "transparent",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
