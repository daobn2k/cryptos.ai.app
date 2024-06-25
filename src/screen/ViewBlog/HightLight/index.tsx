import { ThemedText, textStyles } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import { highlightNearbyText } from "@/src/utils/fc.untils";
import { isEmpty } from "lodash";
import { Skeleton } from "moti/skeleton";
import React, { useMemo } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RenderHtml from "react-native-render-html";
import showdown from "showdown";
import { ISource } from "../Source";
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
    if (isEmpty(content)) return "";
    const textFormat = s.makeHtml(content);
    if (!textFormat) return "";
    const fText = highlightNearbyText(textFormat as string, getLink);
    return fText;
  }, [content]);

  const urls = useMemo(() => {
    return data?.length ? data?.filter((e) => e.url) : [];
  }, []);

  console.log(textContents, "textContents");

  return (
    <ThemedView
      style={[
        styles.root,
        {
          backgroundColor: Colors.dark["background-02"],
          paddingTop: data?.length > 0 ? 0 : 16,
        },
      ]}
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
      <View>
        {!loading && urls?.length > 0 && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {urls.map((source, key) => {
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
          </ScrollView>
        )}
        {loading && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ marginRight: 8 }}>
              <Skeleton width={144} height={128} radius={8} />
            </View>
            <View style={{ marginRight: 8 }}>
              <Skeleton width={144} height={128} radius={8} />
            </View>
            <View style={{ marginRight: 8 }}>
              <Skeleton width={144} height={128} radius={8} />
            </View>
          </ScrollView>
        )}
        {loading && (
          <View style={{ gap: 8, paddingTop: 8, paddingBottom: 8 }}>
            <Skeleton width={screenWidth - 32} height={16} />
            <Skeleton width={screenWidth - 32} height={16} />
            <Skeleton width={screenWidth - 64} height={16} />
          </View>
        )}
        {!loading && !isEmpty(textContents) && (
          <RenderHtml
            source={{
              html: textContents,
            }}
            contentWidth={screenWidth - 32}
            baseStyle={{ marginTop: urls?.length > 0 ? 16 : 0 }}
            classesStyles={{
              "text-link": {
                ...textStyles["font-12-500"],
                backgroundColor: "red",
                padding: 4,
                textDecorationLine: "none",
                color: Colors.dark["text-primary"],
              },
            }}
            tagsStyles={{
              body: {
                ...textStyles["font-16-500"],
                color: Colors.dark["text-primary"],
              },
              p: {
                ...textStyles["font-16-500"],
                color: Colors.dark["text-primary"],
                margin: 0,
                padding: 0,
              },
              span: {
                margin: 0,
              },
              li: {
                ...textStyles["font-16-500"],
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
  styledSpan: {
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 10,
    overflow: "hidden",
    color: "white",
  },
});
