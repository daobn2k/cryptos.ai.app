import { TouchViewThread } from "@/app/(tabs)/chat";
import { Colors } from "@/src/constants/Colors";
import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useDataBlog } from "@/src/hooks/useDataBlog";
import { Blog, Tweet } from "@/src/utils/blog.utils";
import { useMount, useRequest } from "ahooks";
import { uniqBy } from "lodash";
import { View } from "moti";
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "./Header";
import HightLight from "./HightLight";
import Main from "./Main";
import Related from "./Related";
import SkeletonViewBlog from "./SkeletonViewBlog";
import Source from "./Source";
import { getBlogSlugDetail, updateBlogViews } from "./service";
import { useRouter } from "expo-router";

export const ViewBlog = ({ slug }: { slug: any }) => {
  const router = useRouter();
  const { getAsyncStorage } = useCustomAsyncStorage();
  const { data, run, loading, mutate } = useRequest(getBlogSlugDetail, {
    manual: true,
    onSuccess: async (res: any) => {
      const accessToken = await getAsyncStorage("accessToken");
      if (accessToken && res) {
        onUpdateViews(res?.data?.id as string);
      }
    },
  });
  useMount(() => {
    run(slug);
  });

  const blog = useDataBlog(data?.data);

  const { run: onUpdateViews } = useRequest(updateBlogViews, { manual: true });
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
              title: tweet?.content,
              name: tweet?.twitter_user?.name,
              url: tweet?.media[0]?.media_url_https || "",
              link: `https://x.com/x/status/${tweet?.tweet_id}`,
            }))
          : [],
    };
  }, [blog?.cluster?.tweets]);

  const content = useMemo(() => {
    return blog.content;
  }, [blog.content]);
  const onPressRelated = (relate: string, blog_id?: string) => {
    router.push({
      pathname: "/threads/new-thread",
      params: {
        question: relate,
        blog_id,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Header blog={blog} onUpdateBlogs={onUpdateBlogs} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && (
          <>
            <SkeletonViewBlog />
            <Source data={source} loading={true} />
            <HightLight content={content} data={source} loading={true} />
            <Related loading={true} />
          </>
        )}
        {!loading && (
          <>
            <Main blog={blog} onUpdateBlogs={onUpdateBlogs} />
            <Source data={source} loading={loading} />
            <HightLight content={content} data={source} />
            {blog && (
              <Related
                related_questions={blog.related_questions}
                id={blog.id}
                onPressRelated={onPressRelated}
              />
            )}
          </>
        )}
        <View style={{ paddingTop: 96 }} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          // backgroundColor: "#050505",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          paddingBottom: 32,
        }}
      >
        <TouchViewThread placeholder="Ask follow-up..." onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark["background-02"],
  },
});
