import { ImageBackground, ImageStyle, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "../../../components/Themed";
import { useState } from "react";
import { Slider } from "@react-native-assets/slider";

interface RocketSize {
  label: string;
  style: ImageStyle;
}
const rocketSizes: RocketSize[] = [
  { label: "Tiny", style: { height: "25%", top: "75%" } },
  { label: "Small", style: { height: "40%", top: "60%" } },
  { label: "Medium", style: { height: "60%", top: "40%" } },
  { label: "Large", style: { height: "80%", top: "20%" } },
  { label: "Hueg!", style: { height: "100%", top: "0%" } },
];

export default function RocketScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [size, setSize] = useState<RocketSize>(rocketSizes[0]);
  return (
    <ImageBackground
      source={require("../../../assets/images/blueprint.png")}
      style={styles.contentContainer}
      resizeMode="contain"
      imageStyle={[styles.bgImage, size.style]}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>SIZE</Text>
        <View
          style={{ flexDirection: "column", backgroundColor: "transparent" }}
        >
          <Slider
            value={0}
            minimumValue={0}
            maximumValue={4}
            step={1}
            minimumTrackTintColor="#666"
            maximumTrackTintColor="#333"
            thumbTintColor="#f2d031"
            trackHeight={10}
            thumbSize={20}
            style={{ padding: 20 }}
            onValueChange={(value) => setSize(rocketSizes[value])}
            CustomThumb={() => (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: "#f2d031",
                  alignItems: "center",
                }}
              >
                <Text style={styles.markerText}>{size.label}</Text>
              </View>
            )} // The custom thumb component
          />
        </View>
        <Picker
          style={{ color: "white" }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#0f1e37",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    paddingBottom: 0,
    height: "100%",
  },
  formContainer: {
    width: "58%",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: "#f2d031",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: "#f2d031",
    borderBottomWidth: 1,
    textAlign: "right",
  },
  markerText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    position: "absolute",
    top: 25,
    color: "#fff",
    width: 60,
    textAlign: "center",
  },
  bgImage: { position: "absolute", left: "-28%", width: "100%" },
});
