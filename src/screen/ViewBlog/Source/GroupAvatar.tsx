import { ThemedText } from "@/src/components/ThemedText";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const GroupAvatar = () => {
  return (
    <View style={styles.list}>
      {[1, 2, 3, 4, 5].map((e, key) => {
        return (
          <View
            style={[styles.item, { marginLeft: -1 * key + 1 }]}
            key={key + "avatar"}
          >
            <Image
              source={{
                uri: "https://pbs.twimg.com/profile_images/1366208150211350534/GfAPwpyD.jpg",
              }}
              style={styles.avatar}
            />
            <View style={styles.stroke} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 16,
    height: 16,
    resizeMode: "center",
    borderRadius: 100,
    position: "static",
    zIndex: 2,
  },
  stroke: {
    width: 20,
    height: 20,
    backgroundColor: "black",
    position: "absolute",
    zIndex: 1,
    borderRadius: 100,
  },
});
