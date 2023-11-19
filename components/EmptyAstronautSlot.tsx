import { Image, StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import GlobalImages from "./GlobalImages";
import GlobalStyles from "./GlobalStyles";
import { Text } from "./Themed";

type NavigationProps = StackNavigationProp<{
  roster: undefined;
  candidates: undefined;
}>;

export default function EmptyAstronautSlot() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableHighlight
      style={[styles.astronautSlot]}
      underlayColor={Colors.secondary}
      onPress={() => navigation.navigate("candidates")}
    >
      <>
        <View>
          <Image source={GlobalImages["astronaut"]} style={[GlobalStyles.buildingIcon, { opacity: 0.2 }]} />
        </View>
        <View style={{ flexGrow: 1, marginLeft: -20 }}>
          <Text style={styles.availableSlotText}>Slot available</Text>
          <Text style={styles.availableSlotTextSub}>Provided by housing</Text>
        </View>
        <View style={{ marginRight: 20 }}>
          <FontAwesome5 name="chevron-right" size={24} color="#fff" />
        </View>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  astronautSlot: {
    flexDirection: "row",
    borderColor: Colors.neutral,
    overflow: "hidden",
    borderWidth: 1,
    height: 100,
    alignItems: "center",
    backgroundColor: "black",
    marginBottom: 5,
  },
  availableSlotText: {
    color: Colors.neutral,
    fontSize: 20,
    textAlign: "center",
  },
  availableSlotTextSub: {
    color: Colors.neutral,
    fontSize: 12,
    textAlign: "center",
  },
});
