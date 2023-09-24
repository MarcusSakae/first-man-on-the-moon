import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export function HeightIndicator({ height }: { height: number }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: height - 10,
        right: 30,
        backgroundColor: "trasparent",
      }}
    >
      <Text>{height}</Text>
      <Ionicons name="md-navigate-outline" style={styles.rotated} size={24} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  rotated: {
    transform: [{ rotate: "45deg" }],
  },
});
