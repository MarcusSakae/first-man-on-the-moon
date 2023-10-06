import {
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
} from "react-native";
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
const wallThicknesses: RocketSize[] = [
  { label: "Paperthin", style: { height: "25%", top: "75%" } },
  { label: "Thin", style: { height: "40%", top: "60%" } },
  { label: "Balanced", style: { height: "60%", top: "40%" } },
  { label: "Robust", style: { height: "80%", top: "20%" } },
  { label: "Superthick", style: { height: "100%", top: "0%" } },
];

const pngs: Record<string, ImageSourcePropType> = {
  blueprint: require("../assets/images/blueprint.png"),
  copper: require("../assets/images/rocket-copper.png"),
  crystal: require("../assets/images/rocket-crystal.png"),
  glass: require("../assets/images/rocket-glass.png"),
  iron: require("../assets/images/rocket-iron.png"),
  sand: require("../assets/images/rocket-sand.png"),
  silver: require("../assets/images/rocket-silver.png"),
  steel: require("../assets/images/rocket-steel.png"),
  stone: require("../assets/images/rocket-stone.png"),
  wood: require("../assets/images/rocket-wood.png"),
};

export default function RocketComposer(props: { onCommit: () => void }) {
  const [size, setSize] = useState<RocketSize>(rocketSizes[4]);
  const [thickness, setThickness] = useState<RocketSize>(wallThicknesses[0]);
  const [selectedMaterial, setSelectedMaterial] = useState("sand");
  const [bg, setBg] = useState("blueprint");
  return (
    <ImageBackground
      source={pngs[bg]}
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
        <Text style={[styles.title]}>WALL THICKNESS</Text>
        <StyledSlider
          value={0}
          onValueChange={(value) => setThickness(wallThicknesses[value])}
          text={thickness.label}
        />
        <Text style={{ color: "white", textAlign: "center", paddingTop: 10 }}>
          Thicker walls are more robust but leaves less space for air and fuel
        </Text>
        {/* MATERIAL */}
        <Text style={[styles.title]}>BUILDING MATERIAL</Text>
        <Picker
          style={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
          selectedValue={selectedMaterial}
          onValueChange={(value) => setSelectedMaterial(value)}
        >
          <Picker.Item
            style={styles.ddItem}
            label="Blueprint"
            value="blueprint"
          />
          <Picker.Item style={styles.ddItem} label="Sand" value="sand" />
          <Picker.Item style={styles.ddItem} label="Wood" value="wood" />
          <Picker.Item style={styles.ddItem} label="Stone" value="stone" />
          <Picker.Item style={styles.ddItem} label="Copper" value="copper" />
          <Picker.Item style={styles.ddItem} label="Silver" value="silver" />
          <Picker.Item style={styles.ddItem} label="Iron" value="iron" />
          <Picker.Item style={styles.ddItem} label="Steel" value="steel" />
          <Picker.Item style={styles.ddItem} label="Glass" value="glass" />
          <Picker.Item style={styles.ddItem} label="Crystal" value="crystal" />
        </Picker>
        {bg === "blueprint" && (
          <StyledButton
            text="Preview"
            onPress={() => setBg(selectedMaterial)}
          />
        )}
        {bg !== "blueprint" && (
          <StyledButton text="Reset" onPress={() => setBg("blueprint")} />
        )}
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
  ddItem: {
    color: Colors.primary,
    backgroundColor: Colors.secondary,
  },

  bgImage: { position: "absolute", left: "-28%", width: "100%" },
});
