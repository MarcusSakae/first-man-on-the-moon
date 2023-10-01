import { useSegments } from "expo-router";
import { Text, View } from "../../../components/Themed";

export default function BuildingsScreen() {
  const [_, path] = useSegments();

  return (
    <View>
      <Text>Buildings</Text>
    </View>
  );
};
