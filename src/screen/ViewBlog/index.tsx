import { Colors } from "@/src/constants/Colors";
import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { useDataBlog } from "@/src/hooks/useDataBlog";
import { Blog, Tweet } from "@/src/utils/blog.utils";
import { useMount, useRequest } from "ahooks";
import { uniqBy } from "lodash";
import { View } from "moti";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "./Header";
import HightLight from "./HightLight";
import Main from "./Main";
import Related from "./Related";
import SkeletonViewBlog from "./SkeletonViewBlog";
import Source from "./Source";
import { getBlogSlugDetail, updateBlogViews } from "./service";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { textStyles } from "@/src/components/ThemedText";

export const ViewBlog = ({ slug, blog_id }: { slug: any; blog_id: any }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showInput, setShowInput] = useState(false);

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
              url: tweet?.media?.[0]?.media_url_https || "",
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

  const onSendMessage = () => {
    const token = getAsyncStorage("accessToken");

    if (!token || !message) return;
    Keyboard.dismiss();
    setMessage("");
    setShowInput(false);
    router.push({
      pathname: "/threads/new-thread",
      params: {
        question: message,
        blog_id: blog_id,
      },
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowInput(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowInput(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 16 + Constants.statusBarHeight : 0
        }
      >
        <View
          style={[
            {
              position: "absolute",
              bottom: 32,
              left: 0,
              right: 0,
            },
            showInput ? { paddingLeft: 0, paddingRight: 0, bottom: 0 } : {},
          ]}
        >
          <View
            style={[
              {
                gap: 8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 999,
                backgroundColor: Colors.dark["background-03"],
                marginLeft: 16,
                marginRight: 16,
              },
              showInput && {
                borderRadius: 0,
                paddingTop: 16,
                paddingBottom: 16,
                marginLeft: 0,
                marginRight: 0,
              },
            ]}
          >
            <TextInput
              onFocus={() => setShowInput(true)}
              multiline
              numberOfLines={3}
              style={{
                ...textStyles["font-16-400"],
                color: Colors.dark["text-primary"],
                padding: 0,
                flex: 1,
              }}
              value={message}
              placeholder="Ask follow-up..."
              selectionColor={Colors.dark["text-link"]}
              placeholderTextColor={Colors.dark["text-secondary"]}
              onChangeText={(text: string) => setMessage(text)}
              maxLength={100}
            />
            <TouchableOpacity
              onPress={(event) => {
                onSendMessage();
                event.preventDefault();
                event.stopPropagation();
              }}
              style={{ padding: 4 }}
            >
              <Image
                source={
                  message
                    ? require("@assets/view-blog/ic-send-fill.png")
                    : require("@assets/profile/ic-send-meassge.png")
                }
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark["background-02"],
  },
});
