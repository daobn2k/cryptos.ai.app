import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import UpdateCheck from "@/src/components/UpdateCheck";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useProfile } from "@/src/hooks/useProfile";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

import React from "react";
import { ThemedText } from "@/src/components/ThemedText";

export default function RootLayout() {
  const router = useRouter();
  const { onGetInfo } = useProfile();
  const { getAsyncStorage, setAsyncStorage } = useCustomAsyncStorage();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Aspekta: require("../assets/fonts/Aspekta-400.ttf"),
    "Aspekta-Medium": require("../assets/fonts/Aspekta-500.ttf"),
    "Aspekta-Bold": require("../assets/fonts/Aspekta-600.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      checkAuth();
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

  const checkAuth = async () => {
    const token = await getAsyncStorage("accessToken");
    if (token) {
      router.replace("/trending");
      onGetInfo();
    }
  };

  const toastConfig = {
    notification: ({ _, props }: any) => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            gap: 8,
            backgroundColor: Colors.dark["bg-button-primary"],
            width: Dimensions.get("screen").width - 32,
            padding: 16,
            borderRadius: 8,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Image
            source={require("@assets/images/checkbox-circle-line.png")}
            style={{ width: 24, height: 24, resizeMode: "cover" }}
          />
          <ThemedText color="text-inverse" type="font-14-400">
            {props?.text}
          </ThemedText>
        </View>
      );
    },
  };
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
          {/* <UpdateCheck /> */}
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="views/[id]"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="threads/list"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="threads/new-thread"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
        <Toast config={toastConfig} />
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
