import { Slider } from "@react-native-assets/slider";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

type StyleButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  disabled?: boolean;
};
export function UpgradeButton({ onPress, text, disabled }: StyleButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        Upgrade to&nbsp;
        <Text style={styles.textPrimary}>{text}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: Colors.secondaryLight,
    borderColor: Colors.neutral,
  },
  buttonPressed: {
    backgroundColor: Colors.secondaryLighter,
    borderColor: Colors.primary,
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
  textPrimary: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
