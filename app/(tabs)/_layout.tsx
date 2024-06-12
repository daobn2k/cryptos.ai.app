import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Image, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

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
          // backgroundColor: "#00000066",
          position: "absolute",
          alignItems: "center",
          borderTopColor: "transparent",
          bottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="(discover)"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={styles.logo}
              source={
                focused
                  ? require("../../assets/menu/active-dark-home-filled.png")
                  : require("../../assets/menu/dark-home-outline.png")
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarShowLabel: false,
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
          tabBarShowLabel: false,
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
    objectFit: "cover",
  },
});
