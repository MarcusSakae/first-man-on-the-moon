import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AddBuilding } from "../../../components/AddBuilding";
import { BuildingDetails } from "../../../components/BuildingDetails";
import GlobalImages from "../../../components/GlobalImages";
import GlobalStyles from "../../../components/GlobalStyles";
import { Text, View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { BuildingSlot } from "../../../models/building";
import { RootState } from "../../../state/store";

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
                    source={GlobalImages[slot.building.name]}
                    style={GlobalStyles.buildingIcon}
                  />
                  <Text style={GlobalStyles.buildingIconText}>
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
        <View style={[GlobalStyles.partialContainer]}>
          {selected && selected.building && <BuildingDetails slot={selected} />}
          {selected && !selected.building && <AddBuilding />}
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
