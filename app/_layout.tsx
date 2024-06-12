import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UpdateCheck from "@/src/components/UpdateCheck";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Aspekta: require("../assets/fonts/Aspekta-400.ttf"),
    "Aspekta-Medium": require("../assets/fonts/Aspekta-500.ttf"),
    "Aspekta-Bold": require("../assets/fonts/Aspekta-600.ttf"),
  });

  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const bgColor = colorScheme
    ? Colors[colorScheme].background
    : Colors.dark.background;
  StatusBar.setBarStyle(
    "light-content"
    // colorScheme === 'dark' ?   'light-content' : 'dark-content'
  );
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: bgColor,
              paddingTop: insets.top,
            },
          ]}
        >
          <UpdateCheck />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="views/[id]"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "relative",
  },
});
