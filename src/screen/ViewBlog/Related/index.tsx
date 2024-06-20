import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
const screenWidth = Dimensions.get("window").width;

export interface IRelated {
  related_questions?: string[];
  id?: string;
  onPressRelated?: (relate: string, id?: string) => void;
  loading?: boolean;
}
const Related: React.FC<IRelated> = ({
  related_questions,
  onPressRelated,
  id,
  loading,
}) => {
  const onPress = (relate: string) => {
    onPressRelated && onPressRelated(relate, id);
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
      {loading && (
        <View style={{ gap: 12 }}>
          <Skeleton height={16} width={screenWidth - 32} />
          <Skeleton height={16} width={screenWidth - 32} />
          <Skeleton height={16} width={screenWidth - 32} />
        </View>
      )}
      {!loading && (
        <View>
          {related_questions &&
            related_questions?.length > 0 &&
            related_questions.map((r, key: number) => {
              const lastItem = related_questions.length - 1 === key;
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
                    borderBottomWidth: lastItem ? 0 : 1,
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
                    source={require("@assets/view-blog/arrow_right_up_line.png")}
                    style={{ width: 24, height: 24, resizeMode: "cover" }}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      )}
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
