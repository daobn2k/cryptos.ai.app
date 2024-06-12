import React from "react";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GroupAvatar } from "./GroupAvatar";

export const ItemSource = () => {
  const onPress = () => {
    console.log("onPress");
  };
  return (
    <TouchableOpacity style={styles.itemBottom} onPress={onPress}>
      <ThemedText color="text-primary" type="font-heading-xs">
        Elon Musk threatens to ban Apple devices from his com
      </ThemedText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/1366208150211350534/GfAPwpyD.jpg",
            }}
            style={styles.image}
          />
          <ThemedText color="text-tertiary" type="font-11-500">
            forber
          </ThemedText>
        </View>
        <View
          style={{
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 6,
            paddingRight: 6,
            backgroundColor: Colors.dark["white-a10"],
            borderRadius: 999,
          }}
        >
          <ThemedText color="text-tertiary" type="font-10-500">
            1
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
