import { ExternalLink } from "@/src/components/ExternalLink";
import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ISource } from ".";

interface IItemSource {
  data: { url: string; id: string; name: string };
}
export const ItemSource: React.FC<IItemSource> = ({ data }) => {
  const onPress = () => {
    console.log("onPress");
  };
  return (
    <ExternalLink href="">
      <Pressable onPress={onPress} style={styles.itemBottom}>
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
                uri: data?.url,
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
      </Pressable>
    </ExternalLink>
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
    resizeMode: "cover",
  },
});
