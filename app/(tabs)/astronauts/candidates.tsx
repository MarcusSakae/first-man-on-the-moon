import { Button, FlatList, Pressable } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { Image, StyleSheet } from "react-native";
import GlobalStyles from "../../../components/GlobalStyles";
import GlobalImages from "../../../components/GlobalImages";
import { fetchAstronauts } from "../../../state/astronautSlice";
import { useEffect } from "react";
import Colors from "../../../constants/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { hireAstronaut } from "../../../state/userSlice/thunks";
import { Astronaut } from "../../../models/astronaut";
import { useNavigation } from "expo-router/src/useNavigation";
import { StackNavigationProp } from "@react-navigation/stack";


type NavigationProps = StackNavigationProp<{
  roster: undefined;
  candidates: undefined;
}>;

export default function RosterScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    dispatch(fetchAstronauts());
  }, []);

  const astronauts = useAppSelector((state) => state.astronaut.astronauts);

  const onHireClick = (astronaut: Astronaut) => {
    dispatch(hireAstronaut(astronaut));
    navigation.navigate("roster");    
  };

  return (
    <View style={[GlobalStyles.contentContainer, { paddingHorizontal: 0 }]}>
      <Text style={[GlobalStyles.title, { paddingHorizontal: 10 }]}>Astronaut roster</Text>
      <FlatList
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        data={astronauts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.astronautSlot]}>
            <View>
              <Image source={GlobalImages["astronaut"]} style={[GlobalStyles.buildingIcon]} />
            </View>
            <View style={{ flexGrow: 1, marginLeft: -20 }}>
              <Text style={styles.pilotName}>{item.name}</Text>
              <Text style={styles.costText}>
                Cost&nbsp;
                <Text style={{ color: Colors.primary }}>${item.hire_cost}</Text>
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, paddingRight: 10 }}>
                <View style={{ alignItems: "center" }}>
                  <FontAwesome5 name="dumbbell" size={14} color="#fff" />
                  <Text style={styles.statIconText}>{item.stats.strength}</Text>
                </View>
                <View>
                  <FontAwesome5 name="head-side-virus" size={14} color="#fff" />
                  <Text style={styles.statIconText}>{item.stats.mind}</Text>
                </View>
                <View>
                  <FontAwesome5 name="plane" size={14} color="#fff" />
                  <Text style={styles.statIconText}>{item.stats.charisma}</Text>
                </View>
                <View>
                  <FontAwesome5 name="bolt" size={14} color="#fff" />
                  <Text style={styles.statIconText}>{item.stats.speed}</Text>
                </View>
                <View>
                  <FontAwesome5 name="plane" size={14} color="#fff" />
                  <Text style={styles.statIconText}>{item.stats.piloting}</Text>
                </View>
                <View>
                  <FontAwesome5 name="male" size={14} color="#fff" />
                  <Text style={styles.statIconText}>{item.stats.size}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 5, marginRight: 5 }}>
              <TouchableHighlight
                style={styles.hireButton}
                underlayColor={Colors.primaryLight}
                onPress={() => onHireClick(item)}
              >
                <Text style={styles.hireButtonText}>Hire</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
      />
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
