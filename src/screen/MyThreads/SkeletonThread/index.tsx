import { Colors } from "@/src/constants/Colors";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, View } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default function SkeletonThread() {
  const bgContainer = useThemeColor(
    {
      light: Colors.light["background-03"],
      dark: Colors.dark["background-03"],
    },
    "background-02"
  );
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: Colors.dark["border-1"],
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <View style={{ gap: 8 }}>
        <Skeleton height={16} width={240} backgroundColor={bgContainer} />
        <Skeleton height={16} width={200} backgroundColor={bgContainer} />
      </View>
      <View>
        <Skeleton width={96} height={96} />
      </View>
    </View>
  );
}
