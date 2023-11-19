import { FlatList } from "react-native";
import GlobalStyles from "../../../components/GlobalStyles";
import { Text, View } from "../../../components/Themed";
import { useAppSelector } from "../../../state/store";
import EmptyAstronautSlot from "../../../components/EmptyAstronautSlot";
import AstronautInSlot from "../../../components/AstronautInSlot";

export default function RosterScreen() {
  const slots = useAppSelector((state) => state.user.astronautSlots);
  const astronauts = useAppSelector((state) => state.astronaut.astronauts);
  return (
    <View style={[GlobalStyles.contentContainer, { paddingHorizontal: 0 }]}>
      <Text style={[GlobalStyles.title, { paddingHorizontal: 10 }]}>Astronaut roster</Text>
      <FlatList
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        data={slots}
        keyExtractor={(item) => item.id}
        renderItem={({ item: slot }) => {
          let astronaut = astronauts.find((a) => a.id === slot.astronaut_id);
          if (!astronaut) return <EmptyAstronautSlot />;
          
          return <AstronautInSlot astronaut={astronaut} />;
        }}
      />
    </View>
  );
}
