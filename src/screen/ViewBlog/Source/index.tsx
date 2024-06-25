import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { GroupAvatar } from "./GroupAvatar";
import { ItemSource } from "./ItemSource";
import { isEmpty } from "lodash";
export interface ISource {
  data: {
    name?: string;
    url?: string;
    link?: string;
    title?: string;
    tweet_id?: string;
  }[];
  loading?: boolean;
}
const Source: React.FC<ISource> = ({ data, loading }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!loading && data?.length <= 0) return false;
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
              source={require("@assets/view-blog/ic-search-2-line.png")}
              style={{ width: 16, height: 16 }}
            />
            <ThemedText>Reference</ThemedText>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => !loading && setIsVisible(!isVisible)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingStart: 12,
              }}
            >
              {!isVisible && <GroupAvatar data={data} loading={loading} />}

              <Image
                source={require("@assets/view-blog/ic-down-line.png")}
                style={{
                  width: 16,
                  height: 16,
                  transform: [{ rotate: isVisible ? "180deg" : "0deg" }],
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {isVisible && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data?.length > 0 ? (
              data.map((source: any, key) => {
                return (
                  <ItemSource
                    position={key}
                    data={source}
                    key={source.title + key + "item-source"}
                  />
                );
              })
            ) : (
              <></>
            )}
          </ScrollView>
        )}
      </ThemedView>
    </ThemedView>
  );
};

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
});
