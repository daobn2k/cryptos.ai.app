import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import React from "react";
import { Image, Linking, Pressable, StyleSheet, View } from "react-native";

interface IItemSource {
  data: { url: string; link: string; name: string; title: string };
  position: number;
}
export const ItemSource: React.FC<IItemSource> = ({ data, position }) => {
  const onPress = () => {
    Linking.openURL(data.link);
  };
  return (
    <Pressable onPress={onPress} style={styles.itemBottom}>
      <ThemedText color="text-primary" type="font-heading-xs" numberOfLines={2}>
        {data?.title}
      </ThemedText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Image
            source={
              data?.url
                ? {
                    uri: data?.url,
                  }
                : require("@assets/images/ic-google.png")
            }
            style={styles.image}
          />
          <ThemedText
            color="text-tertiary"
            type="font-11-500"
            style={{ paddingTop: 2 }}
          >
            {data?.name || "Google"}
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
            {position + 1}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemBottom: {
    backgroundColor: "#484848",
    padding: 16,
    gap: 16,
    width: 192,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "space-between",
  },
  image: {
    width: 16,
    height: 16,
    borderRadius: 100,
    resizeMode: "cover",
  },
});
