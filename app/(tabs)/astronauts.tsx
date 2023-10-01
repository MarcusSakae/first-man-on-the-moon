import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { FlashList } from "@shopify/flash-list";

const DATA = [{ name: "Astro boy" }, { name: "hubbelboof" }];

function Item({ name }: { name: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
}

export default function AstronautsScreen() {
  return (
    <FlashList
      data={DATA}
      renderItem={({ item }) => <Item name={item.name} />}
      estimatedItemSize={200}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    height: 200,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
