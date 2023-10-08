import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { DrawerButton } from "../../../components/DrawerButton";
import { View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import GlobalStyles from "../../../components/GlobalStyles";

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
            <View style={GlobalStyles.navContainer}>
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
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="roster" options={{ title: "Roster" }} />
        <Tabs.Screen
          name="forhire"
          options={{ title: "Available candidates" }}
        />
      </Tabs>
    </>
  );
}
