import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GroupAvatar } from "./GroupAvatar";

function Source() {
  return (
    <ThemedView
      style={[styles.root, { backgroundColor: Colors.dark["background-02"] }]}
    >
      <ThemedView
        style={[styles.container, { backgroundColor: "#333333", gap: 12 }]}
      >
        <View style={styles.top}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Image
              source={require("@assets/view-blog/ic-pen-line.png")}
              style={{ width: 16, height: 16 }}
            />
            <ThemedText>Reference</ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingStart: 12,
            }}
          >
            <GroupAvatar />
            <TouchableOpacity
              style={{
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("@assets/view-blog/ic-down-line.png")}
                style={{
                  width: 16,
                  height: 16,
                  transform: [{ rotate: "180deg" }],
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottom}></View>
      </ThemedView>
    </ThemedView>
  );
}

export default Source;

const styles = StyleSheet.create({
  root: {
    paddingBottom: 24,
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
  },
  container: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 12,
    borderRadius: 8,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottom: {},
  itemBottom: {
    backgroundColor: "#484848",
    padding: 16,
    gap: 16,
    width: 192,
    height: 96,
    borderRadius: 8,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 100,
    resizeMode: "center",
  },
});
