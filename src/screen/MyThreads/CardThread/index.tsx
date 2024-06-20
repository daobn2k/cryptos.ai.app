import { ViewAction } from "@/src/components/CardDiscover";
import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useDataBlog } from "@/src/hooks/useDataBlog";
import { useReaction } from "@/src/hooks/useReaction";
import { useSaved } from "@/src/hooks/useSaved";
import { useShare } from "@/src/hooks/useShare";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Blog } from "@/src/utils/blog.utils";
import { conditionShowTime, formatNumber } from "@/src/utils/fc.untils";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CardThread({
  data,
  updateBlog,
  position,
  tab,
}: {
  data: Blog;
  updateBlog: (data: Blog, position: number) => void;
  position: number;
  tab: "thread" | "saved";
}) {
  const router = useRouter();
  const blog = useDataBlog(data);
  const { onClickSaved } = useSaved();
  const { onShare } = useShare();
  const { onBear, onBull } = useReaction();
  const bgTouch = useThemeColor(
    { light: Colors.light["white-a10"], dark: Colors.dark["white-a10"] },
    "white-a10"
  );
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

  const onPressView = () => {
    if (tab === "thread") {
      router.push({
        pathname: "/threads/new-thread",
        params: {
          thread_id: blog.id,
          question: blog.title,
        },
      });
    }
    if (tab === "saved") {
      router.push({
        pathname: "/views/[id]",
        params: {
          id: blog.slug,
        },
      });
    }
  };

  const url = useMemo(() => {
    return blog?.messages?.[0]?.images?.[0] || blog.image_url;
  }, [blog]);
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: Colors.dark["border-1"],
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", gap: 16 }}
        onPress={() => onPressView()}
      >
        <View style={{ flex: 1 }}>
          <ThemedText type="font-16-500" color="text-primary">
            {blog?.name || blog.title}
          </ThemedText>
          <ThemedText
            type="font-body-sm"
            color="text-tertiary"
            style={{ marginTop: 4 }}
            numberOfLines={3}
          >
            {blog?.messages?.[0]?.content || blog.description}
          </ThemedText>
        </View>
        {url && (
          <Image
            source={{ uri: url }}
            width={96}
            height={96}
            style={{ borderRadius: 8, resizeMode: "cover" }}
          />
        )}
      </TouchableOpacity>
      <View style={styles.footer}>
        {tab === "saved" && (
          <View style={[styles.actions, { backgroundColor: bgTouch }]}>
            <ViewAction
              onPress={onPressBull}
              source={
                blog?.reaction === "BULL"
                  ? require("@assets/home/active-trade-up.png")
                  : require("@assets/view-blog/ic-trade-up.png")
              }
              value={formatNumber(blog?.total_bull) || 0}
              style={
                blog?.reaction === "BULL" ? styles.touchActive : styles.touch
              }
              textStyle={{
                color:
                  blog?.reaction === "BULL"
                    ? Colors.dark["text-success"]
                    : Colors.dark["text-secondary"],
              }}
            />
            <View style={styles.lineAbsolute}>
              {!blog?.reaction && <View style={styles.line} />}
            </View>
            <ViewAction
              onPress={onPressBear}
              source={
                blog?.reaction === "BEAR"
                  ? require("@assets/home/active-trade-down.png")
                  : require("@assets/view-blog/ic-trade-down.png")
              }
              value={formatNumber(blog?.total_bear) || 0}
              style={
                blog?.reaction === "BEAR" ? styles.touchActive : styles.touch
              }
              textStyle={{
                color:
                  blog?.reaction === "BEAR"
                    ? Colors.dark["text-danger"]
                    : Colors.dark["text-secondary"],
              }}
            />
          </View>
        )}

        <View style={styles.listViews}>
          <ViewAction
            source={require("@assets/view-blog/ic-clock-03.png")}
            value={blog.created_at ? conditionShowTime(blog.created_at) : ""}
            style={styles.touchView}
            textStyle={{ color: Colors.dark["text-tertiary"] }}
          />
          {tab === "saved" && (
            <>
              <ViewAction
                source={require("@assets/view-blog/ic-share-03.png")}
                value={formatNumber(blog?.total_shared) || 0}
                style={styles.touchView}
                onPress={onPressShare}
                textStyle={{ color: Colors.dark["text-tertiary"] }}
              />
              <ViewAction
                onPress={onPressSaved}
                source={require("@assets/view-blog/ic-book-mark-view.png")}
                value={formatNumber(blog?.total_saved) || 0}
                style={styles.touchView}
                textStyle={{ color: Colors.dark["text-tertiary"] }}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 16,
    flexDirection: "row",
    gap: 23,
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 9999,
    position: "relative",
    backgroundColor: Colors.dark["white-a10"],
  },
  touch: {
    flexDirection: "row",
    gap: 4,
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
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
    borderRadius: 9999,
  },
});
