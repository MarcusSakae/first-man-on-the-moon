import { Slider } from "@react-native-assets/slider";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

export function StyledSlider(props: {
  text: string;
  onValueChange: (value: number) => void;
}) {
  return (
    <>
      <Slider
        value={0}
        minimumValue={0}
        maximumValue={4}
        step={1}
        minimumTrackTintColor="#999"
        maximumTrackTintColor="#666"
        thumbTintColor={Colors.primary}
        trackHeight={5}
        thumbSize={20}
        style={[
          {
            paddingTop: 5,
            paddingBottom: 25,
            paddingHorizontal: 15,
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        ]}
        onValueChange={props.onValueChange}
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          top: -50,
        }}
      >
        <Text style={styles.markerText}>{props.text}</Text>
      </View>
    </>
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
  markerText: {
    textTransform: "uppercase",
    position: "absolute",
    top: 25,
    color: "#fff",
    width: "100%",
    paddingLeft: 15,
    textAlign: "left",
  },
});
