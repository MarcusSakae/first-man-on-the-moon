import { StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import { Building, BuildingSlot } from "../models/building";
import GlobalStyles from "./GlobalStyles";
import { StyledButton } from "./StyledButton";
import { View } from "./Themed";
import { UpgradeButton } from "./UpgradeButton";

type BuildingDetailsProps = {
  slot: BuildingSlot;
  onUpgradePress: (upgrade: Building) => void;
  onCancelPress: () => void;
  onDemolishPress: () => void;
};

export function BuildingDetails({ slot, onUpgradePress, onCancelPress, onDemolishPress }: BuildingDetailsProps) {
  function upgradeBuilding(slotId: string, upgradeId: string) {
    return () => Toast.show({ text1: "Astronauts" });
  }

  return (
    <>
      <Text style={[GlobalStyles.description]}>{slot.building?.description}</Text>
      <Text style={[GlobalStyles.title]}>
        <Text style={styles.superTitle}>{slot.building?.label}:&nbsp;</Text>
        Actions
      </Text>
      <View style={{}}>
        <View style={GlobalStyles.actionsContainer}>
          {slot.building?.upgrades.map((upgrade) => (
            <UpgradeButton key={upgrade.id} text={upgrade.label} onPress={() => onUpgradePress(upgrade)} />
          ))}
          {slot.building?.upgrades.length === 0 && <Text style={{ color: "#fff" }}>No upgrades available</Text>}
        </View>
        <View style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}>
          {slot.building?.name !== "excavator" && (
            <StyledButton text="Demolish" type="cancel" onPress={onDemolishPress} />
          )}
          <StyledButton text="Cancel" type="cancel" onPress={onCancelPress} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  superTitle: { color: "#fff", fontWeight: "bold" },
});
