import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";
import Header from "./Header";
import { useMount, useRequest } from "ahooks";
import { getBlogSlugDetail } from "./service";
import { useDataBlog } from "@/src/hooks/useDataBlog";
import { Blog, Tweet } from "@/src/utils/blog.utils";
import Main from "./Main";
import { Colors } from "@/src/constants/Colors";
import Source from "./Source";
import { uniqBy } from "lodash";
import Related from "./Related";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import HightLight from "./HightLight";
import { ScrollView } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;

export const ViewBlog = ({ slug }: { slug: any }) => {
  const { data, run, loading, mutate } = useRequest(getBlogSlugDetail, {
    manual: true,
    onSuccess(res: any) {
      // if (accessToken && res) {
      //   onUpdateViews(res?.data?.id as string);
      // }
    },
  });
  useMount(() => {
    run(slug);
  });

  const blog = useDataBlog(data?.data);

  // const { run: onUpdateViews } = useRequest(updateBlogViews, { manual: true });
  const onUpdateBlogs = useCallback(
    (b: Blog) => {
      mutate({
        ...data,
        data: b,
      });
    },
    [mutate]
  );

  const { source = [] } = useMemo(() => {
    if (blog?.cluster?.tweets?.length <= 0)
      return {
        source: [],
      };

    const tweet = uniqBy(blog?.cluster?.tweets, "twitter_user_id");
    return {
      source:
        tweet?.length > 0
          ? tweet?.map((tweet: Tweet) => ({
              name: tweet?.twitter_user?.name,
              id: tweet?.twitter_user?.id,
              url: tweet?.media[0]?.media_url_https || "",
            }))
          : [],
    };
  }, [blog?.cluster?.tweets]);

  const content = useMemo(() => {
    return blog.content;
  }, [blog.content]);
  // const [message, setMessage] = useState("");
  // const onChangeText = () => {};

  return (
    <ScrollView style={styles.container}>
      <Header blog={blog} onUpdateBlogs={onUpdateBlogs} />
      <Main blog={blog} onUpdateBlogs={onUpdateBlogs} />
      {source && <Source data={source} />}
      <HightLight content={content} />
      {blog && (
        <Related related_questions={blog.related_questions} id={blog.id} />
      )}
      {/* <View>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={(text) => setMessage(text)}
          value={message}
          style={{ padding: 10 }}
        />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark["background-02"],
  },
});
