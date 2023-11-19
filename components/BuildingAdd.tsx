import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
import { Building } from "../models/building";
import { useAppSelector } from "../state/store";
import GlobalStyles from "./GlobalStyles";
import { StyledButton } from "./StyledButton";
import { View } from "./Themed";

type BuldingAddProps = {
  onBuildPress: (building: Building) => void;
  onCancelPress: () => void;
};

export function BuildingAdd({ onBuildPress, onCancelPress }: BuldingAddProps) {
  const [selected, setSelected] = useState<Building>();
  const buildings = useAppSelector((state) => state.buildings.availableBuildings);
  return (
    <>
      <View style={GlobalStyles.actionsContainer}>
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
        <StyledButton
          text="Build"
          disabled={!selected}
          onPress={() => {
            if (selected) {
              onBuildPress(selected);
              setSelected(undefined);
            }
          }}
        />
        <StyledButton text="Cancel" type="cancel" onPress={onCancelPress} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
