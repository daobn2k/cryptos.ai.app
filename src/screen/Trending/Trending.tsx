import CardDiscover from "@/src/components/CardDiscover";
import { ThemedView } from "@/src/components/ThemedView";
import { Blog } from "@/src/utils/blog.utils";
import { useRequest } from "ahooks";
import { uniqBy } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import { getBlog } from "./serivce";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import SkeletonDiscover from "@/src/components/SkeletonDiscover";
import { useNewBlogs } from "@/src/hooks/useNewBlogs";
import ViewUnread from "@/src/components/ViewUnread";
const heightScreen = Dimensions.get("window").height;

export default function Trending() {
  const { countUnS } = useNewBlogs();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const {
    data: dataBlog,
    loading: loadingBlog,
    run,
    mutate,
  } = useRequest(getBlog, {
    manual: true,
    onSuccess(res) {
      setIsRefreshing(false);
      setFirstLoading(false);
    },
    onError() {
      setIsRefreshing(false);
      setFirstLoading(false);
    },
  });
  const {
    data: dataLoadMore,
    run: onLoadMore,
    loading: loadingMore,
  } = useRequest(getBlog, {
    manual: true,
    onSuccess: (res) => {
      if (res) {
        const data = [...dataBlog?.data, ...res.data];
        const dataMutate: any = {
          ...dataBlog,
          data: data,
        };
        mutate(dataMutate);
      }
    },
  });

  const formatData: any[] = useMemo(() => {
    if (dataBlog && dataBlog.data?.length > 0) {
      return uniqBy(dataBlog?.data, "id");
    }
    return [];
  }, [dataBlog]);

  useEffect(() => {
    run({ page: 1, take: 10 });
  }, []);

  const onNext = () => {
    const pagination =
      (dataLoadMore as any)?.pagination ?? (dataBlog as any)?.pagination;
    if (pagination) {
      const isShowMore = pagination.current_page + 1 <= pagination.total_pages;
      if (loadingBlog || loadingMore || !isShowMore) return;
      onLoadMore({ take: pagination.take, page: pagination.current_page + 1 });
    }
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    run({ page: 1, take: 10 });
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
    <ThemedView style={styles.container}>
      {countUnS > 0 && <ViewUnread handleRefresh={onRefresh} />}
      {isRefreshing && <ActivityIndicator color={"white"} />}
      {(firstLoading || loadingBlog) && (
        <ParallaxScrollView>
          <SkeletonDiscover />
          <SkeletonDiscover />
        </ParallaxScrollView>
      )}
      {!loadingBlog && (
        <Animated.FlatList
          data={formatData}
          renderItem={({ item, index }) => {
            return (
              <CardDiscover
                blog={item}
                key={item.id + index + "trending-card"}
                position={index}
                updateBlog={onUpdateBlogs}
              />
            );
          }}
          refreshing={isRefreshing}
          keyExtractor={(item: Blog) => item.id}
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={heightScreen - 284}
          onEndReachedThreshold={2}
          onEndReached={() => onNext()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => onRefresh()}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
      {loadingMore && <ActivityIndicator color={"white"} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
    position: "relative",
  },
});
