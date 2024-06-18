import { ThemedText, textStyles } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useMemo } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ISource } from "../Source";
import { ScrollView } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import RenderHtml, { RenderHTML } from "react-native-render-html";
import showdown from "showdown";
import { highlightNearbyText } from "@/src/utils/fc.untils";
import { Colors } from "@/src/constants/Colors";
const screenWidth = Dimensions.get("window").width;

export interface IHightLight extends ISource {
  content: string;
}
const HightLight: React.FC<IHightLight> = ({ content, data, loading }) => {
  const getLink = (text: string) => {
    if (!data) return "";
    const d = data?.find((e) => e.name === text);
    return `https://x.com/x/status/${d?.tweet_id}`;
  };
  const textContents = useMemo(() => {
    const s = new showdown.Converter();
    const textFormat = s.makeHtml(content);
    if (!textFormat) return "";
    const fText = highlightNearbyText(textFormat as string, getLink);
    return fText;
  }, [content]);

  console.log(textContents, "textContents");

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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {!loading &&
            data?.length > 0 &&
            data.map((source, key) => {
              return (
                <View key={key + "highlight-image"} style={{ marginRight: 8 }}>
                  <Image
                    source={{ uri: source.url }}
                    width={144}
                    height={128}
                    style={{ resizeMode: "cover", borderRadius: 8 }}
                  />
                </View>
              );
            })}
          {loading && (
            <>
              <View style={{ marginRight: 8 }}>
                <Skeleton width={144} height={128} radius={8} />
              </View>
              <View style={{ marginRight: 8 }}>
                <Skeleton width={144} height={128} radius={8} />
              </View>
              <View style={{ marginRight: 8 }}>
                <Skeleton width={144} height={128} radius={8} />
              </View>
            </>
          )}
        </ScrollView>
        {loading && (
          <View style={{ gap: 8, paddingTop: 8, paddingBottom: 8 }}>
            <Skeleton width={screenWidth - 32} height={16} />
            <Skeleton width={screenWidth - 32} height={16} />
            <Skeleton width={screenWidth - 64} height={16} />
          </View>
        )}
        {!loading && (
          <RenderHTML
            source={{ html: textContents }}
            contentWidth={screenWidth - 32}
            tagsStyles={{
              p: {
                ...textStyles["font-16-500"],
                color: Colors.dark["text-primary"],
              },
              a: {
                ...textStyles["font-11-500"],
                color: Colors.dark["text-primary"],
              },
            }}
          />
          // <ThemedText type="font-body-md" color="text-primary">
          //   {content}
          // </ThemedText>
        )}
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
