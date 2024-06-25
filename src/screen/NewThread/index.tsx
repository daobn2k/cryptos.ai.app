import { stylesFocus } from "@/app/(tabs)/chat";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import { useLanguage } from "@/src/hooks/useLanguage";
import { IMessageThread } from "@/src/utils/thread.utils";
import { useRequest } from "ahooks";
import * as Haptics from "expo-haptics";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../ViewBlog/Header";
import HightLight from "../ViewBlog/HightLight";
import Main from "../ViewBlog/Main";
import Related from "../ViewBlog/Related";
import Source from "../ViewBlog/Source";
import {
  createThread,
  getMessageThread,
  getMessages,
  getRelatedThread,
} from "./service";
import Constants from "expo-constants";
import { textStyles } from "@/src/components/ThemedText";
import { useCustomAsyncStorage } from "@/src/hooks/useAsyncStorage";
import { isEmpty } from "lodash";

export const NewThread = ({ params }: { params?: any }) => {
  const { getAsyncStorage } = useCustomAsyncStorage();
  const {
    data,
    loading: loadingMessage,
    mutate,
    run,
  } = useRequest(getMessages, {
    manual: true,
    onSuccess(res) {
      setLoadingThread(false);
      setLoadingResource(false);
    },
  });
  const { loading: loadingCreate, runAsync: onCreate } = useRequest(
    createThread,
    {
      manual: true,
      onSuccess(res) {},
    }
  );
  const {
    data: related,
    run: onGetRelated,
    mutate: mutateRelated,
  } = useRequest(getRelatedThread, {
    manual: true,
    onFinally() {
      setLoadingRelated(false);
    },
  });
  const [thread, setThread] = useState<{
    title: string;
    content: string;
    resources?: any[];
    images?: any[];
  }>({
    title: "",
    content: "",
    resources: [],
    images: [],
  });
  const [showInput, setShowInput] = useState(false);
  const [threadId, setThreadId] = useState<any>();
  const [message, setMessage] = useState("");
  const [loadingThread, setLoadingThread] = useState<boolean>(true);
  const [loadingResource, setLoadingResource] = useState<boolean>(true);
  const [loadingRelated, setLoadingRelated] = useState<boolean>(true);

  const { language } = useLanguage();

  const onOpen = async (data: {
    question?: string;
    thread_id?: string;
    blog_id?: string;
  }) => {
    setThreadId(data.thread_id);
    setThread({ ...thread, title: data?.question || "" });
    if (data.thread_id) {
      run(data.thread_id, language);
      onGetRelated(data.thread_id);
    }
    if (data.question && !data.thread_id) {
      const body: any = { name: data.question };
      if (data.blog_id) {
        body.blog_id = data.blog_id;
      }
      const res: any = await onCreate(body);
      setLoadingThread(true);
      setLoadingResource(true);
      if (res?.data && res?.status_code === 200) {
        const body = { question: data.question, thread_id: res.data.id };
        setThreadId(res.data.id);
        streamMessage(body);
      } else {
        setLoadingThread(false);
        setLoadingResource(false);
      }
    }
  };

  const streamMessage = async (data: {
    question: string;
    thread_id?: string;
  }) => {
    try {
      mutateRelated(undefined);
      setLoadingThread(true);
      setLoadingResource(true);
      await getMessageThread(
        { ...data, language: language },
        (result) => {
          setThread((prev) => ({
            ...prev,
            title: data?.question || "",
            content: result?.text ? prev.content + result?.text : prev.content,
          }));
          Haptics.selectionAsync();
        },
        async () => {
          if (data.thread_id) {
            onGetRelated(data.thread_id);
            const res = await getMessages(data.thread_id, language, 2);
            if (res?.data?.length > 0) {
              const data: IMessageThread = res?.data[res?.data.length - 1];

              setThread((p) => ({
                ...p,
                resources: data.resources,
                images: data.images,
              }));
            }
            setLoadingResource(false);
          }
        }
      );
      setLoadingThread(false);
    } catch (error) {
      setLoadingThread(false);
      setLoadingResource(false);
      console.error("error");
    }
  };

  const onSendMessage = async () => {
    const token = await getAsyncStorage("accessToken");
    if (!message && !token) return;
    Keyboard.dismiss();
    setMessage("");
    setShowInput(false);
    buildNewData();
    const data = { question: message, thread_id: threadId };
    streamMessage(data);
  };
  const onPressRelated = (relate: any) => {
    console.log(relate, "relate");

    if (!relate) return;
    buildNewData(relate);
    const data = { question: relate, thread_id: threadId };
    streamMessage(data);
  };

  const buildNewData = (relate?: string) => {
    const newThreads = [
      ...arrThreads,
      { type: "user", content: thread.title },
      {
        type: "assistant",
        content: thread.content,
        resources: thread.resources,
        images: thread.images,
      },
      {
        type: "line",
      },
    ];
    mutate({ ...data, data: newThreads } as any);
    setThread({ title: relate ?? message, content: "" });
    setMessage("");
  };

  const arrThreads = useMemo(() => {
    return (data?.data as any[]) || [{ type: "user" }];
  }, [data?.data]);

  useEffect(() => {
    if (params) {
      onOpen(params);
    }
  }, [params]);

  const { source = [] } = useMemo(() => {
    if (!thread?.resources)
      return {
        source: [],
      };
    return {
      source:
        thread?.resources?.length > 0
          ? thread?.resources?.map((t: any) => ({
              title: t?.title,
              name: t?.author?.username,
              url: t?.author?.avatar,
              link: t?.url,
            }))
          : [],
    };
  }, [thread.resources]);

  const content = useMemo(() => {
    return thread.content;
  }, [thread.content]);

  const showLoading = useMemo(() => {
    return loadingCreate || loadingThread;
  }, [loadingCreate, loadingThread]);

  const showLoadingMessage = useMemo(() => {
    return showLoading || loadingMessage;
  }, [showLoading, loadingMessage]);
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
    <ThemedView
      style={{ flex: 1, backgroundColor: Colors.dark["background-02"] }}
    >
      <Header title="New Thread" hiddenAction />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!showLoadingMessage &&
          arrThreads?.length > 0 &&
          arrThreads.map((t, key: number) => {
            const dataSource =
              t?.resources?.length > 0
                ? t?.resources?.map((tw: any) => ({
                    title: tw?.title || "",
                    name: tw?.author?.username || "",
                    url: tw?.author?.avatar || "",
                    link: tw?.url || "",
                  }))
                : [];
            return (
              <View key={"arr-thread" + key}>
                {t.type === "user" && (
                  <Main hiddenAction question={t?.content} />
                )}
                {dataSource?.length > 0 && t.type === "assistant" && (
                  <Source data={dataSource} />
                )}
                {t.type === "assistant" && !isEmpty(t?.content) && (
                  <HightLight content={t?.content} data={dataSource} />
                )}
                {t.type === "line" && (
                  <View
                    style={{
                      borderBottomColor: Colors.dark["white-a20"],
                      borderBottomWidth: 1,
                      marginLeft: 16,
                      marginRight: 16,
                    }}
                  />
                )}
              </View>
            );
          })}
        {thread?.title && <Main hiddenAction question={thread?.title} />}
        <Source data={source} loading={loadingResource} />
        {!showLoading && !isEmpty(content) && (
          <>
            <HightLight content={content} data={source} />
          </>
        )}
        {showLoading && (
          <>
            <HightLight content={content} data={source} loading={true} />
          </>
        )}
        {!loadingRelated && related?.data?.length > 0 && (
          <Related
            related_questions={related?.data}
            id={params?.blog_id}
            onPressRelated={onPressRelated}
          />
        )}
        {loadingRelated && <Related loading={loadingRelated} />}
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
              },
              !showInput
                ? { ...stylesFocus }
                : { borderRadius: 0, paddingTop: 16, paddingBottom: 16 },
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
              onChangeText={(text) => setMessage(text)}
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
    </ThemedView>
  );
};
