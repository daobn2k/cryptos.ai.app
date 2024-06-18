import React, { memo } from "react";
import PropTypes from "prop-types";
import { ThemedView } from "@/src/components/ThemedView";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Blog } from "@/src/utils/blog.utils";
import { useSaved } from "@/src/hooks/useSaved";
import { useShare } from "@/src/hooks/useShare";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/Colors";

export interface PropsViewBlog {
  blog: Blog;
  onUpdateBlogs: (data: Blog) => void;
}

const Header: React.FC<PropsViewBlog> = ({ blog, onUpdateBlogs }) => {
  const { onClickSaved } = useSaved();
  const { onShare } = useShare();
  const router = useRouter();
  const onPressSaved = () => {
    onClickSaved(blog, onUpdateBlogs);
  };
  const onPressShare = () => {
    onShare(blog, onUpdateBlogs);
  };
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Image
          source={require("@assets/images/ic-close-line.png")}
          style={styles.icBack}
        />
      </TouchableOpacity>
      <ThemedText color="text-primary" type="font-18-500">
        Post
      </ThemedText>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={onPressSaved}>
          <Image
            source={
              blog.is_saved
                ? require("@assets/view-blog/ic-bookmark-filled.png")
                : require("@assets/view-blog/ic-bookmark.png")
            }
            style={styles.icAction}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onPressShare}>
          <Image
            source={require("@assets/view-blog/ic-share-2-line.png")}
            style={styles.icAction}
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default memo(Header);
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark["background-02"],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.dark["border-1"],
  },
  back: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  icBack: {
    width: 24,
    height: 24,
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  icAction: {
    width: 24,
    height: 24,
    resizeMode: "cover",
  },
});
