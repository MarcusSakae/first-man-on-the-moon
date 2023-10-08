import { StyleSheet, Text, Image } from "react-native";
import { View } from "./Themed";
import { BuildingSlot } from "../models/building";
import GlobalStyles from "./GlobalStyles";
import { StyledButton } from "./StyledButton";
import Toast from "react-native-toast-message";
import GlobalImages from "./GlobalImages";


export function BuildingDetails({slot}: { slot: BuildingSlot }) {
  return (
    <View style={styles.buildingDetails}>
      <View style={GlobalStyles.buildingSlot}>
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
      </View>
      <View style={{ flexDirection: "row" }}>
        <StyledButton
          text="Upgrade"
          onPress={() =>
            Toast.show({
              text1: "Astronauts",
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buildingDetails: {
    flexDirection: "row",
  },
});
