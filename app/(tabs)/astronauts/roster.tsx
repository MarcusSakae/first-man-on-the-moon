import { FlatList, Pressable } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useAppSelector } from "../../../state/store";
import { Image, StyleSheet } from "react-native";
import GlobalStyles from "../../../components/GlobalStyles";
import GlobalImages from "../../../components/GlobalImages";

export default function RosterScreen() {
  const slots = useAppSelector((state) => state.user.astronautSlots);
  return (
    <View style={[GlobalStyles.contentContainer, { paddingHorizontal: 0 }]}>
      <Text style={[GlobalStyles.title, { paddingHorizontal: 10 }]}>Astronaut roster</Text>
      <FlatList
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        renderItem={({ item: slot }) => (
          <Pressable style={[styles.astronautSlot]} onPress={() => {}}>
            {/* {slot.astronaut_id && ( */}
            <View>
              <Image
                source={GlobalImages["astronaut"]}
                style={[GlobalStyles.buildingIcon, { opacity: slot.astronaut_id ? 1 : 0.2 }]}
              />
              {/* <Text style={GlobalStyles.buildingIconText}>astronaut name </Text> */}
            </View>
            {/* )} */}
            {!slot.astronaut_id && (
              <View style={{ flexGrow: 1, marginLeft: -20 }}>
                <Text style={styles.availableSlotText}>Slot available for astronaut</Text>
                <Text style={styles.availableSlotTextSub}>Provided by housing</Text>
              </View>
            )}
          </Pressable>
        )}
        data={slots}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  astronautSlot: {
    flexDirection: "row",
    borderColor: "#ccc",
    overflow: "hidden",
    borderWidth: 1,
    height: 100,
    alignItems: "center",
    backgroundColor: "black",
    marginBottom: 5,
  },
  availableSlotText: {
    color: "#ccc",
    fontSize: 20,
    textAlign: "center",
  },
  availableSlotTextSub: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
  },
});
