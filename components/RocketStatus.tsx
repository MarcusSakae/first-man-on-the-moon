import { Image, ImageStyle, StyleSheet } from "react-native";
import { StyledButton } from "../components/StyledButton";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

export default function RocketStatus(props: { onCancel: () => void }) {
  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title]}>
        Rocket is <Text style={styles.emphasis}>3%</Text> complete...
      </Text>
      <Image
        source={require("../assets/images/blueprint.png")}
        resizeMode="contain"
        style={[styles.image]}
      />
      <Text style={[styles.title]}>Estimate</Text>
      <Text style={styles.dataText}>
        {"Robustness:  So so...\n"}
        {"Weight    (t):                   1000\n"}
        {"Fuel cap. (l):                   1000\n"}
        {"Air cap.  (l):                   1000\n"}
        {"Mat req (pcs):                    574\n"}
        {"Time to completion:               999"}
      </Text>
      <StyledButton text="Cancel build" onPress={props.onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.secondary,
    justifyContent: "flex-end",
    padding: 10,
    paddingBottom: 0,
    height: "100%",
  },

  title: {
    color: Colors.primary,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    textAlign: "right",
    marginTop: 5,
  },
  dataText: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    marginTop: 10,
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
  },

  image: {
    borderColor: Colors.primary,
    borderWidth: 1,
    width: "100%",
    flexShrink: 1,
  },
  emphasis: {
    color: "#fff",
    fontWeight: "bold",
  },
});
