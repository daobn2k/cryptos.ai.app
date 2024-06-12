import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
export interface IHightLight {
  content: string;
}
const HightLight: React.FC<IHightLight> = ({ content }) => {
  return (
    <ThemedView
      style={[styles.root, { backgroundColor: Colors.dark["background-02"] }]}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Image source={require("@assets/view-blog/ic-pen-line.png")} />
        <ThemedText type="font-18-500" color="text-primary">
          HightLight
        </ThemedText>
      </View>
      <View style={{ marginBottom: 16, marginTop: 16 }}>
        <ThemedText type="font-body-md" color="text-primary">
          {content}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default HightLight;

const styles = StyleSheet.create({
  root: {
    paddingRight: 16,
    paddingLeft: 16,
  },
});
