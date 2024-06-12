import { ViewAction } from "@/src/components/CardDiscover";
import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useReaction } from "@/src/hooks/useReaction";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { conditionShowTime, formatNumber } from "@/src/utils/fc.untils";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { PropsViewBlog } from "../Header";

const Main = ({ blog, onUpdateBlogs }: PropsViewBlog) => {
  const { onBear, onBull } = useReaction();
  const bgTouch = useThemeColor(
    { light: Colors.light["white-a10"], dark: Colors.dark["white-a10"] },
    "white-a10"
  );

  const onPressBull = () => {
    onBull(blog, onUpdateBlogs);
  };
  const onPressBear = () => {
    onBear(blog, onUpdateBlogs);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewHead}>
        <ThemedText type="font-heading-xl" color="text-primary">
          {blog.title}
        </ThemedText>
      </View>
      <View style={styles.footer}>
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
        <View style={styles.listViews}>
          <ViewAction
            source={require("@assets/view-blog/ic-clock-03.png")}
            value={blog.created_at ? conditionShowTime(blog.created_at) : ""}
            style={styles.touchView}
            textStyle={{ color: Colors.dark["text-tertiary"] }}
          />
          <ViewAction
            source={require("@assets/view-blog/ic-share-03.png")}
            value={formatNumber(blog?.total_shared) || 0}
            style={styles.touchView}
            textStyle={{ color: Colors.dark["text-tertiary"] }}
          />
          <ViewAction
            source={require("@assets/view-blog/ic-book-mark-view.png")}
            value={formatNumber(blog?.total_saved) || 0}
            style={styles.touchView}
            textStyle={{ color: Colors.dark["text-tertiary"] }}
          />
        </View>
      </View>
    </View>
  );
};
export default memo(Main);
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  viewHead: {
    paddingBottom: 16,
    paddingTop: 16,
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
    borderRadius: 8,
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
    borderRadius: 4,
  },
});
