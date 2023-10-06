import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export function HeightIndicator({ altitude }: { altitude: number }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: altitude * 2 - 10,
        right: 30,
        backgroundColor: "trasparent",
      }}
    >
      <Text
        style={{
          position: "absolute",
          right: "100%",
          width: 100,
          padding: 5,
          textAlign: "right",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        {(altitude * 100).toFixed(0)}
      </Text>
      <Ionicons
        name="md-navigate-outline"
        style={styles.rotated}
        size={24}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rotated: {
    transform: [{ rotate: "45deg" }],
  },
});
