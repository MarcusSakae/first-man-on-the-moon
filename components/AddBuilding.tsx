import { StyleSheet, Text, Image } from "react-native";
import { View } from "./Themed";
import { BuildingSlot } from "../models/building";
import GlobalStyles from "./GlobalStyles";
import { StyledButton } from "./StyledButton";
import Toast from "react-native-toast-message";
import GlobalImages from "./GlobalImages";


export function AddBuilding() {
  return (
    <View style={styles.buildingDetails}>
      <View style={GlobalStyles.buildingSlot}>
        <Text>hm</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  buildingDetails: {
    flexDirection: "row",
  },
});
