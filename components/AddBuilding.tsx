import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "./Themed";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useState } from "react";
import { Building } from "../models/building";
import Colors from "../constants/Colors";
import { StyledButton } from "./StyledButton";

export function AddBuilding() {
  const [selected, setSelected] = useState<Building>();
  const buildings = useSelector((state: RootState) => state.buildings.availableBuildings);
  return (
    <>
      <View style={styles.buildingDetails}>
        {buildings.map((building) => {
          return (
            <Pressable
              style={[styles.buildableItem, building === selected ? styles.selected : {}]}
              key={building.name}
              onPress={() => setSelected(building)}
            >
              <Text style={[styles.itemText]}>{building.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
        <StyledButton text="Cancel" type="cancel" onPress={() => {}} />
        <StyledButton text="Build" disabled={!selected} onPress={() => setSelected(undefined)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buildingDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  itemText: {
    color: "white",
  },
  buildableItem: {
    borderColor: "transparent",
    overflow: "hidden",
    borderWidth: 2,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    position: "relative",
  },
  selected: {
    borderColor: Colors.primary,
  },
});
