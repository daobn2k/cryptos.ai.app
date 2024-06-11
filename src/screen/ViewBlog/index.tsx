import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import Header from "./Header";
import { useMount, useRequest } from "ahooks";
import { getBlogSlugDetail } from "./service";
import { useDataBlog } from "@/src/hooks/useDataBlog";
import { Blog } from "@/src/utils/blog.utils";
import Main from "./Main";

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

  return (
    <ThemedView style={styles.container}>
      <Header blog={blog} onUpdateBlogs={onUpdateBlogs} />
      <Main blog={blog} onUpdateBlogs={onUpdateBlogs} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
