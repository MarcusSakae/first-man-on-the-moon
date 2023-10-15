import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image, StyleSheet, useColorScheme } from "react-native";

import GlobalImages from "../../components/GlobalImages";
import Colors from "../../constants/Colors";
import { useAppSelector } from "../../state/store";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function BuildScreen() {
  const colorScheme = useColorScheme();
  const tabs = useAppSelector((state) => state.user.availableTabs);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarItemStyle: styles.tabline,
          tabBarActiveTintColor: Colors.primary,
          tabBarActiveBackgroundColor: "#fff"
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#101a29" },
            tabBarIcon: () => <Image source={GlobalImages["homeIcon"]} style={styles.icon} />,
          }}
        />
        <Tabs.Screen
          name="construction"
          options={{
            title: "Build",
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#14110f" },
            tabBarIcon: () => <Image source={GlobalImages["hammerIcon"]} style={styles.icon} />,
          }}
        />

        <Tabs.Screen
          name="astronauts"
          options={{
            title: "Astronauts",
            href: tabs.includes("astronauts") ? "astronauts" : null,
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#010101" },
            tabBarIcon: () => <Image source={GlobalImages["astrosIcon"]} style={styles.icon} />,
            tabBarBadge: 3,
            tabBarBadgeStyle: { backgroundColor: Colors.primary, color: "#000" },
          }}
        />

        <Tabs.Screen
          name="economy"
          options={{
            title: "Economy",
            tabBarItemStyle: { ...styles.tabline, backgroundColor: "#072b4d" },
            tabBarIcon: () => <Image source={GlobalImages["economyIcon"]} style={styles.icon} />,
          }}
        />
        <Tabs.Screen
          name="gather"
          options={{
            title: "Gather",
            href: tabs.includes("gather") ? "gather" : null,
            tabBarIcon: () => <Image source={GlobalImages["astrosPng"]} style={styles.icon} />,
          }}
        />
        <Tabs.Screen
          name="research"
          options={{
            href: null,
            title: "Research",
            tabBarIcon: () => <Image source={GlobalImages["astrosPng"]} style={styles.icon} />,
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
