import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { Astronaut } from "../models/astronaut";
import GlobalImages from "./GlobalImages";
import GlobalStyles from "./GlobalStyles";
import { Text } from "./Themed";

type AstronautInSlotProps = {
  astronaut: Astronaut;
};

export default function AstronautInSlot({ astronaut }: AstronautInSlotProps) {
  return (
    <View style={[styles.astronautSlot]}>
      <View>
        <Image source={GlobalImages["astronaut"]} style={[GlobalStyles.buildingIcon]} />
      </View>
      <View style={{ flexGrow: 1, marginLeft: -20 }}>
        <Text style={styles.pilotName}>{astronaut.name}</Text>
        <Text style={styles.costText}>
          Cost&nbsp;
          <Text style={{ color: Colors.primary }}>${astronaut.hire_cost}</Text>
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, paddingRight: 10 }}>
          <View style={{ alignItems: "center" }}>
            <FontAwesome5 name="dumbbell" size={14} color="#fff" />
            <Text style={styles.statIconText}>{astronaut.stats.strength}</Text>
          </View>
          <View>
            <FontAwesome5 name="head-side-virus" size={14} color="#fff" />
            <Text style={styles.statIconText}>{astronaut.stats.mind}</Text>
          </View>
          <View>
            <FontAwesome5 name="plane" size={14} color="#fff" />
            <Text style={styles.statIconText}>{astronaut.stats.charisma}</Text>
          </View>
          <View>
            <FontAwesome5 name="bolt" size={14} color="#fff" />
            <Text style={styles.statIconText}>{astronaut.stats.speed}</Text>
          </View>
          <View>
            <FontAwesome5 name="plane" size={14} color="#fff" />
            <Text style={styles.statIconText}>{astronaut.stats.piloting}</Text>
          </View>
          <View>
            <FontAwesome5 name="male" size={14} color="#fff" />
            <Text style={styles.statIconText}>{astronaut.stats.size}</Text>
          </View>
        </View>
      </View>
    </View>
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
  pilotName: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  costText: {
    color: Colors.neutral,
    textAlign: "center",
  },
  availableSlotTextSub: {
    color: Colors.neutral,
    fontSize: 12,
    textAlign: "center",
  },
  hireButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    justifyContent: "center",

    height: "100%",
  },

  hireButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  statIconText: {
    paddingTop: 3,
    color: Colors.primary,
    textAlign: "center",
  },
});
