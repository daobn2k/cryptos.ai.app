import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useDataBlog } from "@/src/hooks/useDataBlog";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Blog } from "@/src/utils/blog.utils";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useState } from "react";
import { Dimensions, Image, Linking, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  adjustHexColor,
  conditionShowTime,
  formatNumber,
} from "../utils/fc.untils";
import { useSaved } from "../hooks/useSaved";
import { useReaction } from "../hooks/useReaction";
import { useShare } from "../hooks/useShare";
import { getColors } from "react-native-image-colors";
import { useRouter } from "expo-router";

interface CardViewProps {
  blog: Blog;
  updateBlog: (data: Blog, position: number) => void;
  position: number;
}
const screenWidth = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const CardDiscover: React.FC<CardViewProps> = ({
  blog,
  updateBlog,
  position,
}) => {
  const router = useRouter();
  const [color, setColor] = useState(null);
  const { onClickSaved } = useSaved();
  const { onShare } = useShare();
  const { onBear, onBull } = useReaction();
  const data = useDataBlog(blog);
  const bgContainer = useThemeColor(
    {
      light: Colors.light["skeleton-from"],
      dark: Colors.dark["skeleton-from"],
    },
    "skeleton-from"
  );
  const bgTouch = useThemeColor(
    { light: Colors.light["white-a10"], dark: Colors.dark["white-a10"] },
    "white-a10"
  );
  const handleImageLoad = async () => {
    try {
      const result: any = await getColors(data.image_url, {
        fallback: "#050505",
        cache: true,
        key: data.image_url,
      });
      const color: any = adjustHexColor(result.detail);
      setColor(color);
    } catch (error) {
      console.error("Error extracting colors:", error);
    }
  };

  const onPressSaved = () => {
    onClickSaved(blog, updateBlog, position);
  };
  const onPressBull = () => {
    onBull(blog, updateBlog, position);
  };
  const onPressBear = () => {
    onBear(blog, updateBlog, position);
  };
  const onPressShare = () => {
    onShare(blog, updateBlog, position);
  };
  const onPressViewBlog = () => {
    router.push({
      pathname: "/views/[id]",
      params: {
        id: data.slug,
      },
    });
  };

  return (
    <LinearGradient
      colors={[
        "rgba(0, 0, 0, 0) 0%",
        "rgba(0, 0, 0, 0) 53%",
        "rgba(0, 0, 0, 0.45)",
      ]}
      style={{
        ...styles.container,
        backgroundColor: color ? String(color) : bgContainer,
        minHeight: heightScreen - 300,
      }}
    >
      <TouchableOpacity onPress={onPressViewBlog}>
        <View style={styles.viewImage}>
          <Image
            blurRadius={16}
            source={{ uri: data.image_url }}
            style={{
              width: screenWidth - 32 - 16,
              height: 327,
              resizeMode: "cover",
              position: "absolute",
              top: 8,
              left: 8,
              right: 8,
              bottom: 8,
              aspectRatio: 1,
              borderRadius: 12,
            }}
          />
          <Image
            source={{ uri: data.image_url }}
            style={{
              width: screenWidth - 32 - 16,
              height: 327,
              resizeMode: "contain",
            }}
            onLoad={handleImageLoad}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.main}>
        <TouchableOpacity onPress={onPressViewBlog}>
          <View style={styles.top}>
            <ThemedText type="font-heading-lg" color="white-a100">
              {data.title}
            </ThemedText>
            <ThemedText type="font-body-md" color="white-a80">
              {data.description}
            </ThemedText>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.footer}>
            <View style={[styles.actions, { backgroundColor: bgTouch }]}>
              <ViewAction
                onPress={onPressBull}
                source={
                  data.reaction === "BULL"
                    ? require("@assets/home/active-trade-up.png")
                    : require("@assets/home/home-trade-up.png")
                }
                value={formatNumber(data.total_bull)}
                style={
                  data.reaction === "BULL" ? styles.touchActive : styles.touch
                }
                textStyle={{
                  color:
                    data?.reaction === "BULL"
                      ? Colors.dark["text-success"]
                      : Colors.dark["white-a80"],
                }}
              />
              <View style={styles.lineAbsolute}>
                {!data?.reaction && <View style={styles.line} />}
              </View>
              <ViewAction
                onPress={onPressBear}
                source={
                  data.reaction === "BEAR"
                    ? require("@assets/home/active-trade-down.png")
                    : require("@assets/home/home-trade-down.png")
                }
                value={formatNumber(data.total_bear)}
                style={
                  data.reaction === "BEAR" ? styles.touchActive : styles.touch
                }
                textStyle={{
                  color:
                    data?.reaction === "BEAR"
                      ? Colors.dark["text-danger"]
                      : Colors.dark["white-a80"],
                }}
              />
            </View>
            <View style={styles.listViews}>
              <ViewAction
                source={require("@assets/home/home-clock.png")}
                value={
                  data.created_at ? conditionShowTime(data.created_at) : ""
                }
                style={styles.touchView}
              />
              <ViewAction
                source={require("@assets/home/home-share.png")}
                value={formatNumber(data.total_shared)}
                style={styles.touchView}
                onPress={onPressShare}
              />
              <ViewAction
                onPress={onPressSaved}
                source={
                  data.is_saved
                    ? require("@assets/home/active-bookmark-filled.png")
                    : require("@assets/home/home-bookmark-outline.png")
                }
                value={formatNumber(data.total_saved)}
                style={styles.touchView}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default memo(CardDiscover);

export const ViewAction = ({
  value,
  source,
  onPress,
  style,
  textStyle,
}: {
  value: string | number;
  source: any;
  onPress?: () => void;
  style?: any;
  textStyle?: any;
}) => {
  return (
    <TouchableOpacity style={[styles.touch, style]} onPress={onPress}>
      <Image source={source} style={styles.imageAction} />
      <ThemedText type="font-12-500" color="white-a80" style={textStyle}>
        {value}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
  },
  main: {
    paddingTop: 6,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  top: {
    gap: 8,
    flex: 1,
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    gap: 23,
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewImage: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    position: "relative",
  },
  images: {
    width: screenWidth - 32 - 16,
    height: 300,
    resizeMode: "cover",
  },

  imageAction: {
    width: 16,
    height: 16,
    objectFit: "contain",
  },
  actions: {
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 9999,
    position: "relative",
  },

  touch: {
    flexDirection: "row",
    gap: 4,
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 9999,
  },
  touchView: {
    flexDirection: "row",
    gap: 4,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  lineAbsolute: {
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 16,
    width: 1,
    backgroundColor: Colors.dark["white-a20"],
  },
  listViews: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
  },
  touchActive: {
    backgroundColor: Colors.dark["white-a100"],
  },
});
