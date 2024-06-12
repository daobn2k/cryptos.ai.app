import { ThemedText } from "@/src/components/ThemedText";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ISource } from ".";

export const GroupAvatar: React.FC<ISource> = ({ data }) => {
  return (
    <View style={styles.list}>
      {data?.length > 0 ? (
        data.map((e, key) => {
          return (
            <View
              style={[styles.item, { marginLeft: -1 * key + 1 }]}
              key={e.id + "avatar"}
            >
              <Image
                source={{
                  uri: e.url,
                }}
                style={styles.avatar}
              />
              <View style={styles.stroke} />
            </View>
          );
        })
      ) : (
        <></>
      )}
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
