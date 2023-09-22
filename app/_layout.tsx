import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import rootReducer from "../state/rootReducer";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const store = configureStore({
  reducer: rootReducer
})


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  ("");
  return (
    <ThemeProvider value={DarkTheme}>
      <Provider store={store}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
      </Provider>
    </ThemeProvider>
  );
}
