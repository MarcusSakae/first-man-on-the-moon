import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Image, Pressable, StyleSheet, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { Text, View } from "../../components/Themed";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const homePng = require("../../assets/images/home.png");

export default function BuildScreen() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        }}
      >
        {/* we use index for redirecting, since 'initialRouteName' is  broken-ish on expo-router */}
        {/* https://github.com/expo/router/issues/428 */}
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarItemStyle: { backgroundColor: "#14110f" },
            tabBarIcon: () => <Image source={homePng} style={[styles.icon]} />,
          }}
          />
        <Tabs.Screen
          name="construction"
          options={{
            title: "Build",
            tabBarItemStyle: { backgroundColor: "#11192a" },
            tabBarIcon: ({ color }) => (
              <Image
              source={require("../../assets/images/hammer.png")}
              style={[styles.icon, { width: 24, height: 24 }]}
              />
              ),
            }}
            />

        <Tabs.Screen
          name="astronauts"
          options={{
            title: "Astronauts",
            tabBarItemStyle: { backgroundColor: "#010101" },
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../assets/images/astronaut2.png")}
                style={styles.icon}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="work"
          options={{
            title: "Work",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="gather"
          options={{
            title: "Gather",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="research"
          options={{
            title: "Research",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
});
