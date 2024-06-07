import CardDiscover from '@/src/components/CardDiscover';
import { ThemedView } from '@/src/components/ThemedView';
import { Blog } from '@/src/utils/blog.utils';
import { useRequest } from 'ahooks';
import { uniqBy } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, RefreshControl, StyleSheet } from 'react-native';
import { getBlog } from './serivce';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import SkeletonDiscover from '@/src/components/SkeletonDiscover';
import { ThemedText } from '@/src/components/ThemedText';
import Animated from 'react-native-reanimated';
const heightScreen = Dimensions.get('window').height;

export default function Trending() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const {
    data: dataBlog,
    loading: loadingBlog,
    run,
    mutate,
    runAsync,
  } = useRequest(getBlog, {
    manual: true,
    onSuccess(res) {
      setIsRefreshing(false);
    },
    onError() {
      setIsRefreshing(false);
    },
  });

  const formatData: any[] = useMemo(() => {
    if (dataBlog && dataBlog.data?.length > 0) {
      return uniqBy(dataBlog?.data, 'id');
    }
    return [];
  }, [dataBlog]);

  useEffect(() => {
    run({ page: 1, take: 10 });
  }, []);

  const onScroll = (event: any) => {};
  return (
    // <ParallaxScrollView
    //   setting={{
    //     snapToAlignment: 'start',
    //     decelerationRate: 0,
    //     onScroll,
    //     snapToInterval: heightScreen - 284,
    //   }}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={isRefreshing}
    //       onRefresh={() => {
    //         setIsRefreshing(true);
    //         run({ page: 1, take: 10 });
    //       }}
    //     />
    //   }
    // >
    <ThemedView style={styles.container}>
      <Animated.FlatList
        data={formatData}
        renderItem={({ item }) => {
          return <CardDiscover blog={item} />;
        }}
        keyExtractor={(item: Blog) => item.id}
        snapToAlignment='start'
        decelerationRate={'fast'}
        snapToInterval={heightScreen - 184}
      >
        {isRefreshing && (
          <ThemedView>
            <ThemedText type='font-15-500' color='text-primary'>
              Refreshing
            </ThemedText>
          </ThemedView>
        )}

        {/* <ThemedView style={styles.container}>
        {formatData?.length > 0 &&
          !loadingBlog &&
          formatData.map((blog: Blog, key: number) => {
            return (
              <CardDiscover blog={blog} key={`trending` + key + blog.id} />
            );
          })}
        {loadingBlog &&
          Array.from({ length: 10 }).map((_: any, key: number) => (
            <>
              <SkeletonDiscover key={'trending-skeleton' + key} />
            </>
          ))}
      </ThemedView> */}
      </Animated.FlatList>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    paddingBottom: 80,
  },
});
