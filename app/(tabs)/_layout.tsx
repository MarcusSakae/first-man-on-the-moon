import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Image, Pressable, StyleSheet, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import GlobalImages from "../../components/GlobalImages";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function BuildScreen() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarItemStyle: styles.tabline,
          tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#101a29" },
            tabBarIcon: () => (
              <Image source={GlobalImages["homeIcon"]} style={styles.icon} />
            ),
          }}
        />
        <Tabs.Screen
          name="construction"
          options={{
            title: "Build",
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#14110f" },
            tabBarIcon: () => (
              <Image source={GlobalImages["hammerIcon"]} style={styles.icon} />
            ),
          }}
        />

        <Tabs.Screen
          name="astronauts"
          options={{
            title: "Astronauts",
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#010101" },
            tabBarIcon: () => (
              <Image source={GlobalImages["astrosIcon"]} style={styles.icon} />
            ),
          }}
        />

        <Tabs.Screen
          name="economy"
          options={{
            title: "Economy",
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#072b4d" },
            tabBarIcon: () => (
              <Image source={GlobalImages["economyIcon"]} style={styles.icon} />
            ),
          }}
        />
        <Tabs.Screen
          name="gather"
          options={{
            title: "Gather",
            tabBarIcon: () => (
              <Image source={GlobalImages["astrosPng"]} style={styles.icon} />
            ),
          }}
        />
        <Tabs.Screen
          name="research"
          options={{
            href: null,
            title: "Research",
            tabBarIcon: () => (
              <Image source={GlobalImages["astrosPng"]} style={styles.icon} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  tabline: {
    borderTopColor: Colors.primary,
    borderTopWidth: 1,
  },
});
