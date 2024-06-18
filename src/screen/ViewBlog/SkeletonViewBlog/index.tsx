import { ViewAction } from "@/src/components/CardDiscover";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const screenWidth = Dimensions.get("window").width;

export default function SkeletonViewBlog() {
  const bgTouch = useThemeColor(
    { light: Colors.light["white-a10"], dark: Colors.dark["white-a10"] },
    "white-a10"
  );
  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 8, paddingTop: 8, gap: 8 }}>
        <Skeleton height={16} width={screenWidth - 32}></Skeleton>
        <Skeleton height={16} width={screenWidth - 64}></Skeleton>
      </View>
      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <View style={[styles.actions, { backgroundColor: bgTouch }]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              gap: 8,
            }}
          >
            <Image source={require("@assets/view-blog/ic-trade-up.png")} />
            <Skeleton height={8} width={24} />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              gap: 8,
            }}
          >
            <Image source={require("@assets/view-blog/ic-trade-down.png")} />
            <Skeleton height={8} width={24} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  actions: {
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 9999,
    position: "relative",
    backgroundColor: Colors.dark["white-a10"],
    height: 32,
  },
});
