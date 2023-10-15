import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { BuildingAdd } from "../../../components/BuildingAdd";
import { BuildingDetails } from "../../../components/BuildingDetails";
import GlobalImages from "../../../components/GlobalImages";
import GlobalStyles from "../../../components/GlobalStyles";
import { Text, View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { BuildingSlot } from "../../../models/building";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { createBuilding, demolishBuildingInSlot } from "../../../state/userSlice/userSlice";

export default function BuildingsScreen() {
  const buildingSlots = useAppSelector((state) => state.user.buildingSlots);
  const dispatch = useAppDispatch();
  const [selectedSlot, setSelectedSlot] = useState<BuildingSlot>();
  const selectSlot = (pressedSlot: BuildingSlot) => {
    if (selectedSlot && selectedSlot.id === pressedSlot.id) return setSelectedSlot(undefined);
    setSelectedSlot(pressedSlot);
  };

  return (
    <View style={[GlobalStyles.contentContainer, { paddingHorizontal: 0 }]}>
      <Text style={[GlobalStyles.title, { paddingHorizontal: 10 }]}>Building details</Text>
      <ScrollView style={{ height: "60%" }} contentContainerStyle={styles.scroll}>
        <View style={[styles.gridContainer]}>
          {buildingSlots.map((slot) => (
            <Pressable
              key={slot.id}
              style={[
                styles.buildingSlot,
                slot.building && slot.building.name === "excavate" && styles.excavate,
                selectedSlot?.id === slot.id && styles.selected,
              ]}
              onPress={() => selectSlot(slot)}
            >
              {slot.building && (
                <View>
                  <Image source={GlobalImages[slot.building.name]} style={GlobalStyles.buildingIcon} />
                  <Text style={GlobalStyles.buildingIconText}>{slot.building.label}</Text>
                </View>
              )}
              {!slot.building && <Text style={GlobalStyles.addItemText}>+</Text>}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {selectedSlot && (
        <View style={[GlobalStyles.partialContainer]}>
          {selectedSlot && selectedSlot.building && (
            <BuildingDetails
              slot={selectedSlot}
              onCancelPress={() => setSelectedSlot(undefined)}
              onUpgradePress={(building) => {
                dispatch(createBuilding({ slotId: selectedSlot.id, building }));
                setSelectedSlot(undefined);
              }}
              onDemolishPress={() => {
                dispatch(demolishBuildingInSlot({ slotId: selectedSlot.id }));
                setSelectedSlot(undefined);
              }}
            />
          )}
          {selectedSlot && !selectedSlot.building && (
            <BuildingAdd
              onCancelPress={() => setSelectedSlot(undefined)}
              onBuildPress={(building) => {
                dispatch(createBuilding({ slotId: selectedSlot.id, building }));
                setSelectedSlot(undefined);
              }}
            />
          )}
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
});
