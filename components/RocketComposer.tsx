import { ImageBackground, ImageStyle, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "../components/Themed";
import { StyledSlider } from "../components/StyledSlider";
import { StyledButton } from "../components/StyledButton";
import Colors from "../constants/Colors";
import { StyledRangeSlider } from "../components/StyledRangeSlider";
import { useState } from "react";
import GlobalStyles from "./GlobalStyles";

interface RocketSize {
  label: string;
  style: ImageStyle;
}
const rocketSizes: RocketSize[] = [
  { label: "Tiny", style: { height: "25%", top: "75%" } },
  { label: "Small", style: { height: "40%", top: "60%" } },
  { label: "Medium", style: { height: "60%", top: "40%" } },
  { label: "Large", style: { height: "80%", top: "20%" } },
  { label: "Huge", style: { height: "100%", top: "0%" } },
];
export default function RocketComposer(props: { onCommit: () => void }) {
  const [size, setSize] = useState<RocketSize>(rocketSizes[4]);
  const [selectedMaterial, setSelectedMaterial] = useState();

  return (
    <ImageBackground
      source={require("../assets/images/blueprint.png")}
      style={[
        GlobalStyles.contentContainer,
        { flexDirection: "row", justifyContent: "flex-end" },
      ]}
      resizeMode="contain"
      imageStyle={[styles.bgImage, size.style]}
    >
      <View style={styles.formContainer}>
        {/* SIZE  (custom margin on first title only) */}
        <Text style={[styles.title, { marginTop: -10 }]}>SIZE</Text>
        <StyledSlider
        value={4}
          onValueChange={(value) => setSize(rocketSizes[value])}
          text={size.label}
        />

        {/* MATERIAL */}
        <Text style={[styles.title]}>BUILDING MATERIAL</Text>
        <Picker
          style={{ color: "white", backgroundColor: "rgba(255,255,255,0.1)" }}
          selectedValue={selectedMaterial}
          onValueChange={(value) => setSelectedMaterial(value)}
        >
          <Picker.Item label="Sand" value="sand" />
          <Picker.Item label="Sticks" value="sticks" />
        </Picker>

        {/* MATERIAL */}
        <Text style={[styles.title]}>WALL THICKNESS</Text>
        <StyledSlider
          value={4}
          onValueChange={(value) => setSize(rocketSizes[value])}
          text={size.label}
        />
        <Text style={[styles.title]}>WALL THICKNESS</Text>
        <StyledRangeSlider
          onValueChange={([a, b]) => {
            console.log(a, b);
          }}
          text={size.label}
        />

        <View style={{ flexGrow: 1, backgroundColor: "transparent" }} />
        <StyledButton text="Commit to build" onPress={props.onCommit} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "58%",
    backgroundColor: "transparent",
    paddingVertical: 10,
    borderRadius: 5,
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
    color: "#ccc",
    height: 136,
  },

  bgImage: { position: "absolute", left: "-28%", width: "100%" },
});
