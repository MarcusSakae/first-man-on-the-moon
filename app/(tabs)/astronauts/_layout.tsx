import { useRouter, useSegments } from "expo-router";
import { Stack } from "expo-router/stack";
import { DrawerButton } from "../../../components/DrawerButton";
import GlobalStyles from "../../../components/GlobalStyles";
import { View } from "../../../components/Themed";

export default function TabLayout({ segment }: any) {
  const router = useRouter();
  const segments = useSegments();
  const currentSegment = segments[segments.length - 1];

  return (
    <>
      <Stack
        screenOptions={({ route, navigation }) => {
          return { headerShown: false };
        }}
      >
        <Stack.Screen name="roster" options={{ title: "Roster" }} />
        <Stack.Screen name="candidates" options={{ title: "Available candidates" }} />
      </Stack>
      <View style={GlobalStyles.navContainer}>
        {["roster", "candidates"].map((route) => (
          <DrawerButton
            onPress={() => router.replace(`/${segment}/${route}`)}
            isActive={currentSegment === route}
            key={route}
            text={route}
          />
        ))}
      </View>
    </>
  );
}
