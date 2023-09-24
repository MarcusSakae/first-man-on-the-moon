import { View } from "./Themed";
import { StyleSheet } from "react-native";

export function HeightRuler() {
  const lines = Array.from({ length: 51 }, (_, i) =>
    i % 5 === 0 ? (
      <View key={i} style={[styles.lineStyleBold]} />
    ) : (
      <View key={i} style={[styles.lineStyle]} />
    )
  );
  return <View style={styles.heightRuler}>{lines}</View>;
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF88",
    margin: 0,
    width: "50%",
    height: 0,
  },
  lineStyleBold: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF88",
    margin: 0,
    width: "100%",
    height: 0,
  },
  heightRuler: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    right: 0,
    width: 20,
    height: "100%",
    top: 0,
    backgroundColor: "#00000000",
  },
});
