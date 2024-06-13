import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Image, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { ThemedText } from "@/src/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => (
          <BlurView
            intensity={20}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "#00000066",
            }}
          />
        ),
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"]["text-primary"],
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          alignItems: "center",
          borderTopColor: "transparent",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: ({ color, focused }) => {
            return (
              <ThemedText
                type="font-11-500"
                color={focused ? "text-primary" : "text-tertiary"}
              >
                Search
              </ThemedText>
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={styles.logo}
              source={
                focused
                  ? require("../../assets/menu/active-dark-search-filled.png")
                  : require("../../assets/menu/dark-search-outline.png")
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(discover)"
        options={{
          tabBarLabel: ({ color, focused }) => {
            return (
              <ThemedText
                type="font-11-500"
                color={focused ? "text-primary" : "text-tertiary"}
              >
                Discover
              </ThemedText>
            );
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.logo}
              source={
                focused
                  ? require("../../assets/menu/ic-compass-fill.png")
                  : require("../../assets/menu/ic-compass-line.png")
              }
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name='discover'
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/menu/active-dark-calendar-filled.png')
                  : require('../../assets/menu/dark-calendar-outline.png')
              }
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ color, focused }) => {
            return (
              <ThemedText
                type="font-11-500"
                color={focused ? "text-primary" : "text-tertiary"}
              >
                Profile
              </ThemedText>
            );
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.logo}
              source={
                focused
                  ? require("../../assets/menu/active-dark-user-filled.png")
                  : require("../../assets/menu/dark-user-outline.png")
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 24,
    height: 24,
    objectFit: "contain",
  },
});
