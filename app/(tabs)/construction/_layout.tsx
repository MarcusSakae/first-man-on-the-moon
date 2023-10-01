import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { DrawerButton } from "../../../components/DrawerButton";
import { View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
          headerShown: false,
        }}
        tabBar={({ state, navigation }) => {
          return (
            <View style={styles.navContainer}>
              {state.routeNames
                .filter((n) => n !== "index")
                .map((route) => (
                  <DrawerButton
                    onPress={() => navigation.navigate(route)}
                    isActive={state.index === state.routeNames.indexOf(route)}
                    key={route}
                    text={route}
                  />
                ))}
            </View>
          );
        }}
      >
        {/* we use index for redirecting, since 'initialRouteName' is  broken-ish on expo-router */}
        {/* https://github.com/expo/router/issues/428 */}
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="buildings" options={{ title: "Buildings" }} />
        <Tabs.Screen name="rocket" options={{ title: "Rocket" }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f1e37",
    height: 200,
    width: "100%",
    right: 0,
  },
});
