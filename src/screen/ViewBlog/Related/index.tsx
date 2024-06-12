import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
export interface IRelated {
  related_questions: string[];
  id?: string;
}
const Related: React.FC<IRelated> = ({ related_questions, id }) => {
  const onPress = (relate: string) => {
    console.log(relate, "relate");
    console.log(id, "id");
  };
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
        <Image source={require("@assets/view-blog/ic-compass.png")} />
        <ThemedText type="font-18-500" color="text-primary">
          Related
        </ThemedText>
      </View>
      <View>
        {related_questions?.length > 0 &&
          related_questions.map((r, key: number) => {
            return (
              <TouchableOpacity
                key={"related" + key + r}
                style={{
                  flexDirection: "row",
                  paddingBottom: 16,
                  paddingTop: 16,
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#2B2B2B",
                }}
                onPress={() => onPress(r)}
              >
                <ThemedText
                  type="font-16-500"
                  color="text-primary"
                  style={{ flex: 1 }}
                >
                  {r}
                </ThemedText>
                <Image
                  source={require("@assets/view-blog/ic-right-line.png")}
                  style={{ width: 24, height: 24, resizeMode: "cover" }}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </ThemedView>
  );
};

export default Related;

const styles = StyleSheet.create({
  root: {
    paddingRight: 16,
    paddingLeft: 16,
  },
});
