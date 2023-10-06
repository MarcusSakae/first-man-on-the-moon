import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import GlobalStyles from "../../../components/GlobalStyles";
import { Text, View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { BuildingSlot } from "../../../models/building";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";

const pngs: Record<string, any> = {
  house: require("../../../assets/images/isometric-house.png"),
  rocketlaunchpad: require("../../../assets/images/launchpad.png"),
  excavator: require("../../../assets/images/excavate.png"),
};

export default function BuildingsScreen() {
  const buildingSlots = useSelector(
    (state: RootState) => state.user.buildingSlots
  );
  const [selected, setSelected] = useState<BuildingSlot>();
  const selectSlot = (pressedSlot: BuildingSlot) => {
    if (selected && selected.id === pressedSlot.id)
      return setSelected(undefined);
    setSelected(pressedSlot);
  };

  return (
    <View style={[GlobalStyles.contentContainer, { paddingHorizontal: 0 }]}>
      <Text style={[GlobalStyles.title, { paddingHorizontal: 10 }]}>
        Building details
      </Text>
      <ScrollView
        style={{ height: "60%" }}
        contentContainerStyle={styles.scroll}
      >
        <View style={[styles.gridContainer]}>
          {buildingSlots.map((slot) => (
            <Pressable
              key={slot.id}
              style={[
                styles.buildingSlot,
                slot.building &&
                  slot.building.name === "excavate" &&
                  styles.excavate,
                selected?.id === slot.id && styles.selected,
              ]}
              onPress={() => selectSlot(slot)}
            >
              {slot.building && (
                <View>
                  <Image
                    source={pngs[slot.building.name]}
                    style={styles.buildingIcon}
                  />
                  <Text style={styles.buildingIconText}>
                    {slot.building.label}
                  </Text>
                </View>
              )}
              {!slot.building && <Text style={styles.addText}>+</Text>}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {selected && (
        <View
          style={[
            GlobalStyles.partialContainer,
            { backgroundColor: Colors.secondaryDark },
          ]}
        >
          <Text style={GlobalStyles.title}>Building details</Text>
          <View style={styles.buildingDetails}>
            <View style={styles.buildingSlot}>
              {selected.building && (
                <View>
                  <Image
                    source={pngs[selected.building.name]}
                    style={styles.buildingIcon}
                  />
                  <Text style={styles.buildingIconText}>
                    {selected.building.label}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    alignItems: "center",
  },
  gridContainer: {
    backgroundColor: "transparent",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 330,
  },
  buildingSlot: {
    borderColor: "#ccc",
    overflow: "hidden",
    borderWidth: 1,
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  buildingDetails: {
    flexDirection: "row",
  },
  buildingIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  buildingIconText: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 4,
    width: "100%",
    textAlign: "center",
    backgroundColor: "#000000cc",
    color: "white",
    fontSize: 16,
  },
  excavate: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#669",
    borderRadius: 15,
    opacity: 0.5,
  },
  selected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  addText: {
    color: "#999999",
    fontSize: 48,
    fontFamily: "monospace",
  },
});
