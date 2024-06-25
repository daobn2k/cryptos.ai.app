import CardDiscover from "@/src/components/CardDiscover";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import SkeletonDiscover from "@/src/components/SkeletonDiscover";
import { ThemedView } from "@/src/components/ThemedView";
import { Blog } from "@/src/utils/blog.utils";
import { useRequest } from "ahooks";
import { uniqBy } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import { getBlogFollowings } from "../Trending/serivce";
import * as Haptics from "expo-haptics";
import { RefreshControl } from "react-native-gesture-handler";
const heightScreen = Dimensions.get("window").height;

export default function ForYou() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const {
    data: dataBlog,
    loading: loadingBlog,
    run,
    mutate,
  } = useRequest(getBlogFollowings, {
    manual: true,
    onSuccess(res) {
      setIsRefreshing(false);
    },
    onError() {
      setIsRefreshing(false);
    },
  });
  const {
    data: dataLoadMore,
    run: onLoadMore,
    loading: loadingMore,
  } = useRequest(getBlogFollowings, {
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
    run({ page: 1, take: 20 });
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
    run({ page: 1, take: 20 });
  };

  const onUpdateBlogs = (data: Blog, position: number) => {
    const newsData: Blog[] = [...dataBlog?.data];
    newsData[position] = data;
    mutate({
      ...dataBlog,
      data: newsData,
    } as any);
  };

  const onSnapItem = (index: number) => {
    setActiveIndex(index);
    const pagination =
      (dataLoadMore as any)?.pagination ?? (dataBlog as any)?.pagination;
    const isNextPage =
      pagination?.current_page * pagination?.take - 10 === index;
    if (isNextPage && !loadingMore) {
      onNext();
    }
  };

  return (
    <ThemedView style={styles.container}>
      {isRefreshing && <ActivityIndicator color={"white"} />}
      {loadingBlog && (
        <ParallaxScrollView>
          <SkeletonDiscover />
          <SkeletonDiscover />
        </ParallaxScrollView>
      )}
      {!loadingBlog && (
        <Carousel
          vertical
          data={formatData}
          renderItem={({ item, index }: any) => {
            return (
              <CardDiscover
                blog={item}
                key={item.id + index + "for-you-card"}
                position={index}
                updateBlog={onUpdateBlogs}
              />
            );
          }}
          itemHeight={heightScreen - 284}
          sliderHeight={heightScreen - 300}
          inactiveSlideOpacity={0.2}
          callbackOffsetMargin={0}
          enableSnap
          activeSlideAlignment="start"
          inactiveSlideShift={activeIndex}
          onSnapToItem={onSnapItem}
          onScrollIndexChanged={() => Haptics.selectionAsync()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => onRefresh()}
            />
          }
        />
        // <Animated.FlatList
        //   data={formatData}
        //   renderItem={({ item, index }) => {
        //     return (
        //       <CardDiscover
        //         blog={item}
        //         key={item.id + index + "for-you-card"}
        //         position={index}
        //         updateBlog={onUpdateBlogs}
        //       />
        //     );
        //   }}
        //   refreshing={isRefreshing}
        //   keyExtractor={(item: Blog) => `${item.id}-for-you`}
        //   snapToAlignment="start"
        //   decelerationRate={"fast"}
        //   snapToInterval={heightScreen - 284}
        //   onEndReachedThreshold={2}
        //   onEndReached={() => onNext()}
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={isRefreshing}
        //       onRefresh={() => onRefresh()}
        //     />
        //   }
        //   showsHorizontalScrollIndicator={false}
        //   showsVerticalScrollIndicator={false}
        // />
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
  },
});
