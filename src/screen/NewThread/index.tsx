import { TouchViewThread } from "@/app/(tabs)/chat";
import { ThemedView } from "@/src/components/ThemedView";
import { Colors } from "@/src/constants/Colors";
import { useLanguage } from "@/src/hooks/useLanguage";
import { IMessageThread } from "@/src/utils/thread.utils";
import { useRequest } from "ahooks";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
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
import * as Haptics from "expo-haptics";

export const NewThread = ({ params }: { params?: any }) => {
  const {
    data,
    loading: loadingMessage,
    mutate,
    run,
  } = useRequest(getMessages, {
    manual: true,
    onSuccess(res) {},
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
  const [threadId, setThreadId] = useState<any>();
  const [message, setMessage] = useState("");
  const [loadingThread, setLoadingThread] = useState<boolean>(false);
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
            content: prev.content + result?.text,
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

  const onSendMessage = () => {
    if (!message) return;
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
    return (data?.data as any[]) || [];
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
          ? thread?.resources?.map((t) => ({
              title: t?.title,
              name: t?.author?.username,
              url: t?.author?.avatar,
              link: t?.url,
            }))
          : [],
    };
  }, [thread.resources]);

  const { images = [] } = useMemo(() => {
    if (!thread?.images) {
      return {
        images: [],
      };
    }
    return {
      images: [],
    };
  }, [thread.images]);

  const content = useMemo(() => {
    return thread.content;
  }, [thread.content]);

  const showLoading = useMemo(() => {
    return loadingCreate || loadingThread;
  }, [loadingCreate, loadingThread]);

  const showLoadingMessage = useMemo(() => {
    return showLoading || loadingMessage;
  }, [showLoading, loadingMessage]);
  return (
    <ThemedView
      style={{ flex: 1, backgroundColor: Colors.dark["background-02"] }}
    >
      <Header title="New Thread" hiddenAction />
      <ScrollView showsVerticalScrollIndicator={false}>
        {!showLoadingMessage &&
          arrThreads?.length > 0 &&
          arrThreads.map((t, key: number) => {
            const source =
              t?.resources?.length > 0
                ? t?.resources?.map((tw: any) => ({
                    title: tw?.title,
                    name: tw?.author?.username,
                    url: tw?.author?.avatar,
                    link: tw?.url,
                  }))
                : [];
            return (
              <View key={"arr-thread" + key}>
                {t.type === "user" && (
                  <Main hiddenAction question={t?.content} />
                )}
                {t.type === "assistant" && <Source data={source} />}
                {t.type === "assistant" && (
                  <HightLight content={t?.content} data={source} />
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
        <Main hiddenAction question={thread.title} />
        <Source data={source} loading={loadingResource} />
        {!showLoading && (
          <>
            <HightLight content={content} data={source} />
            {related?.data?.length > 0 && (
              <Related
                related_questions={related?.data}
                id={params?.blog_id}
                onPressRelated={onPressRelated}
              />
            )}
          </>
        )}
        {showLoading && (
          <>
            <HightLight content={content} data={source} loading={true} />
          </>
        )}
        {loadingRelated && <Related loading={loadingRelated} />}
        <View style={{ paddingTop: 96 }} />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          paddingBottom: 32,
          gap: 8,
        }}
      >
        <TouchViewThread
          placeholder="Ask follow-up..."
          onPress={onSendMessage}
        />
      </View>
    </ThemedView>
  );
};
