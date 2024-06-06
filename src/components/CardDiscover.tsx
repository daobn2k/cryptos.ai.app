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

interface CardViewProps {
  blog: Blog;
}
const screenWidth = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const CardDiscover: React.FC<CardViewProps> = ({ blog }) => {
  const [color, setColor] = useState(null);
  const data = useDataBlog(blog);
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
  // const handleImageLoad = async () => {
  //   try {
  //     const result: any = await getColors(data.image_url, {
  //       fallback: 'rgba(0, 0, 0, 0.9)',
  //     });
  //     console.log(result, 'result.dominant');

  //     const color: any = adjustHexColor(result.dominant);
  //     setColor(color);
  //   } catch (error) {
  //     console.error('Error extracting colors:', error);
  //   }
  // };

  if (!data) return <></>;
  return (
    <LinearGradient
      colors={[
        'rgba(0, 0, 0, 0) 0%',
        'rgba(0, 0, 0, 0) 53%',
        'rgba(0, 0, 0, 0.45)',
      ]}
      style={{
        ...styles.container,
        backgroundColor: color ? String(color) : bgContainer,
        minHeight: heightScreen - 300,
      }}
    >
      <View style={styles.viewImage}>
        <Image
          blurRadius={16}
          source={{ uri: data.image_url }}
          style={{
            width: screenWidth - 32 - 16,
            height: 327,
            resizeMode: 'cover',
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            bottom: 8,
            aspectRatio: 1,
            borderRadius: 12,
          }}
        />
        <Image
          source={{ uri: data.image_url }}
          style={{
            width: screenWidth - 32 - 16,
            height: 327,
            resizeMode: 'contain',
          }}
          // onLoad={handleImageLoad}
        />
      </View>
      <View style={styles.main}>
        <View style={styles.top}>
          <ThemedText type='font-heading-lg' color='white-a100'>
            {data.title}
          </ThemedText>
          <ThemedText type='font-body-md' color='white-a80'>
            {data.description}
          </ThemedText>
        </View>
        <View style={styles.footer}>
          <View style={[styles.actions, { backgroundColor: bgTouch }]}>
            <ViewAction
              source={require('@assets/home/home-trade-up.png')}
              value={data.total_bull}
            />
            <View style={styles.lineAbsolute}>
              {!data?.reaction && <View style={styles.line} />}
            </View>
            <ViewAction
              source={require('@assets/home/home-trade-down.png')}
              value={data.total_bear}
            />
          </View>
          <View style={styles.listViews}>
            <ViewAction
              source={require('@assets/home/home-clock.png')}
              value={data.created_at ? conditionShowTime(data.created_at) : ''}
            />
            <ViewAction
              source={require('@assets/home/home-share.png')}
              value={data.total_shared}
            />
            <ViewAction
              source={require('@assets/home/home-bookmark-outline.png')}
              value={data.total_saved}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CardDiscover;

const ViewAction = ({
  value,
  source,
  onPress,
}: {
  value: string | number;
  source: any;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={[styles.touch]} onPress={onPress}>
      <Image source={source} style={styles.imageAction} />
      <ThemedText type='font-12-500' color='white-a80'>
        {value}
      </ThemedText>
    </TouchableOpacity>
  );
};

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
