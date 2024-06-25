import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { Blog } from "@/src/utils/blog.utils";
import { useMount, useRequest } from "ahooks";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardThread from "./CardThread";
import SkeletonThread from "./SkeletonThread";
import { getThread } from "./service";

export const MyThreads = () => {
  const router = useRouter();
  const [tab, setTab] = useState<"thread" | "saved">("thread");

  const {
    run,
    loading,
    data: dataBlog,
    mutate,
  } = useRequest(getThread, { manual: true });

  useMount(() => {
    run(
      {
        page: 1,
        take: 20,
      },
      tab
    );
  });

  const dataMemo = useMemo(() => {
    return dataBlog?.data;
  }, [dataBlog]);

  const onPressTab = (tab: "thread" | "saved") => {
    setTab(tab);
    run(
      {
        page: 1,
        take: 20,
      },
      tab
    );
  };
  const onUpdateBlogs = (data: Blog, position: number) => {
    const newsData: any[] = [...dataBlog?.data];
    newsData[position] = data;
    mutate({
      ...dataBlog,
      data: newsData,
    } as any);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 12,
          paddingTop: 12,
          paddingRight: 16,
          paddingLeft: 16,
          borderWidth: 1,
          borderColor: Colors.dark["border-1"],
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={require("@assets/images/ic-close-line.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <ThemedText color="text-primary" type="font-18-500">
          Thread
        </ThemedText>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Image
            source={require("@assets/images/ic-search-line.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            alignItems: "center",
            gap: 8,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 999,
              paddingBottom: 6,
              paddingTop: 6,
              paddingRight: 12,
              paddingLeft: 12,
              backgroundColor:
                tab === "thread"
                  ? Colors.dark["bg-button-primary"]
                  : Colors.dark["background-03"],
            }}
            onPress={() => onPressTab("thread")}
          >
            <ThemedText
              type="font-body-sm"
              color={tab === "thread" ? "text-inverse" : "text-tertiary"}
            >
              My Threads
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 999,
              paddingBottom: 6,
              paddingTop: 6,
              paddingRight: 12,
              paddingLeft: 12,
              backgroundColor:
                tab === "saved"
                  ? Colors.dark["bg-button-primary"]
                  : Colors.dark["background-03"],
            }}
            onPress={() => onPressTab("saved")}
          >
            <ThemedText
              type="font-body-sm"
              color={tab === "saved" ? "text-inverse" : "text-tertiary"}
            >
              Saved
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 16, paddingTop: 0 }}>
        {!loading &&
          dataMemo?.length > 0 &&
          dataMemo?.map((item: Blog, position: number) => {
            return (
              <CardThread
                data={item}
                updateBlog={onUpdateBlogs}
                position={position}
                tab={tab}
                key={tab + position}
              />
            );
          })}
        {loading && (
          <>
            <SkeletonThread />
            <SkeletonThread />
            <SkeletonThread />
            <SkeletonThread />
            <SkeletonThread />
          </>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark["background-02"],
  },
  touchView: {
    flexDirection: "row",
    gap: 4,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});
