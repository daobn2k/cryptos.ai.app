import { ThemedText } from '@/src/components/ThemedText';
import { Colors } from '@/src/constants/Colors';
import { useDataBlog } from '@/src/hooks/useDataBlog';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Blog } from '@/src/utils/blog.utils';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { conditionShowTime } from '../utils/fc.untils';
import { Skeleton } from 'moti/skeleton';

const screenWidth = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const SkeletonDiscover: React.FC = () => {
  const bgContainer = useThemeColor(
    {
      light: Colors.light['skeleton-from'],
      dark: Colors.dark['skeleton-from'],
    },
    'skeleton-from'
  );
  const bgTouch = useThemeColor(
    { light: Colors.light['white-a10'], dark: Colors.dark['white-a10'] },
    'white-a10'
  );
  return (
    <LinearGradient
      colors={[
        'rgba(0, 0, 0, 0) 0%',
        'rgba(0, 0, 0, 0) 53%',
        'rgba(0, 0, 0, 0.45)',
      ]}
      style={{
        ...styles.container,
        backgroundColor: bgContainer,
        maxHeight: heightScreen - 75,
        minHeight: heightScreen - 75,
      }}
    >
      <View style={styles.viewImage}>
        <Skeleton width={screenWidth - 32 - 16} height={327} />
      </View>
      <View style={styles.main}>
        <View style={styles.top}>
          <Skeleton
            height={16}
            width={screenWidth - 64}
            backgroundColor={bgContainer}
          />
          <Skeleton
            height={16}
            width={screenWidth - 64}
            backgroundColor={bgContainer}
          />
          <Skeleton
            height={16}
            width={(screenWidth - 48) / 2}
            backgroundColor={bgContainer}
          />
        </View>
        <View style={styles.footer}>
          <View style={[styles.actions, { backgroundColor: bgTouch }]}>
            <TouchableOpacity style={[styles.touch]}>
              <Image
                source={require('@assets/home/home-trade-up.png')}
                style={styles.imageAction}
              />
              <Skeleton height={12} width={20} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touch]}>
              <Image
                source={require('@assets/home/home-trade-up.png')}
                style={styles.imageAction}
              />
              <Skeleton height={12} width={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SkeletonDiscover;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  main: {
    paddingTop: 6,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  top: {
    gap: 8,
    flex: 1,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 23,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImage: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    position: 'relative',
  },
  images: {
    width: screenWidth - 32 - 16,
    height: 300,
    resizeMode: 'cover',
  },

  imageAction: {
    width: 16,
    height: 16,
  },
  actions: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 9999,
    position: 'relative',
  },
  touch: {
    flexDirection: 'row',
    gap: 4,
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 16,
    width: 1,
    backgroundColor: Colors.dark['white-a20'],
  },
  listViews: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'flex-end',
  },
});
