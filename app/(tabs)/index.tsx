import { Text } from "../../components/Themed";
import { useFocusEffect, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  useFocusEffect(() => router.replace("/construction"));
  return <Text>Index</Text>;
}
