import CardDiscover from '@/src/components/CardDiscover';
import { ThemedView } from '@/src/components/ThemedView';
import { Blog } from '@/src/utils/blog.utils';
import { useRequest } from 'ahooks';
import { uniqBy } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { getBlog } from './serivce';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import SkeletonDiscover from '@/src/components/SkeletonDiscover';
const heightScreen = Dimensions.get('window').height;

export default function Trending() {
  const {
    data: dataBlog,
    loading: loadingBlog,
    run,
    mutate,
    runAsync,
  } = useRequest(getBlog, {
    manual: true,
    onSuccess(res) {},
  });

  const formatData: any[] = useMemo(() => {
    if (dataBlog && dataBlog.data?.length > 0) {
      return uniqBy(dataBlog?.data, 'id');
    }
    return [];
  }, [dataBlog]);

  useEffect(() => {
    run({ page: 1, take: 5 });
  }, []);

  const onScroll = (event: any) => {};
  return (
    <ParallaxScrollView
      setting={{
        snapToAlignment: 'start',
        decelerationRate: 0,
        onScroll,
        snapToInterval: heightScreen - 284,
      }}
    >
      <ThemedView style={styles.container}>
        {formatData?.length > 0 &&
          !loadingBlog &&
          formatData.map((blog: Blog, key: number) => {
            return (
              <CardDiscover blog={blog} key={`trending` + key + blog.id} />
            );
          })}
        {loadingBlog && (
          <>
            <SkeletonDiscover />
            <SkeletonDiscover />
            <SkeletonDiscover />
            <SkeletonDiscover />
            <SkeletonDiscover />
          </>
        )}
      </ThemedView>
    </ParallaxScrollView>
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
