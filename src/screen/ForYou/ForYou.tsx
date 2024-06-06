import CardDiscover from '@/src/components/CardDiscover';
import { ThemedView } from '@/src/components/ThemedView';
import { Blog } from '@/src/utils/blog.utils';
import { useRequest } from 'ahooks';
import { uniqBy } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { getBlogFollowings } from '../Trending/serivce';
const heightScreen = Dimensions.get('window').height;

export default function Trending() {
  const {
    data: dataBlog,
    loading: loadingBlog,
    run,
    mutate,
    runAsync,
  } = useRequest(getBlogFollowings, {
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
    run({ page: 1, take: 20 });
  }, []);

  const onScroll = (event: any) => {};
  return (
    <ParallaxScrollView
      setting={{
        snapToStart: true,
        decelerationRate: 0,
        snapToInterval: heightScreen - 250,
        onScroll,
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
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
