import { useSegments } from "expo-router";
import { Text, View } from "../../../components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function BuildingsScreen() {
  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.background}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.button}
      >
        <Text style={styles.text}>Sign in with Facebook</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
  },
  background: {
    width: "100%",
    height: 200,
  },
  button: {
    width: "100%",
    height: 200,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
