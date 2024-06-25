import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useNewBlogs } from "@/src/hooks/useNewBlogs";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TopTabs = () => {
  const { gUnSeen } = useNewBlogs();
  const background = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  useEffect(() => {
    gUnSeen();
    const intervalId = setInterval(() => {
      gUnSeen();
    }, 10000); // 20 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: background,
          justifyContent: "center",
        },
        tabBarLabelStyle: { position: "relative" },
        tabBarIndicatorStyle: {
          display: "none",
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="trending"
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 48 }} />
              <View
                style={{
                  position: "relative",
                }}
              >
                <ThemedText
                  type="font-15-600"
                  color={focused ? "text-primary" : "text-tertiary"}
                >
                  Trending
                </ThemedText>
                {focused && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginTop: 32,
                        width: 32,
                        height: 4,
                        backgroundColor: "#FFFFFFE5",
                        borderRadius: 4,
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  position: "relative",
                }}
              >
                <ThemedText
                  type="font-15-600"
                  color={focused ? "text-primary" : "text-tertiary"}
                >
                  For you
                </ThemedText>
                {focused && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginTop: 32,
                        width: 32,
                        height: 4,
                        backgroundColor: "#FFFFFFE5",
                        borderRadius: 4,
                      }}
                    />
                  </View>
                )}
              </View>
              <View style={{ marginLeft: 48 }}></View>
            </View>
          ),
        }}
      />
    </MaterialTopTabs>
  );
};

export default TopTabs;
