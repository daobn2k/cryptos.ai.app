import { ThemedText } from '@/src/components/ThemedText';
import { Colors } from '@/src/constants/Colors';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { ROUTE_PATH } from '@/src/utils/router.utilts';
import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const router = useRouter();
  const onPress = () => {
    router.push({ pathname: ROUTE_PATH.TRENDING });
  };
  const buttonPrimary = useThemeColor(
    {
      light: Colors.light['button-primary'],
      dark: Colors.dark['button-primary'],
    },
    'button-primary'
  );
  const background = useThemeColor(
    {
      light: Colors.light['background'],
      dark: Colors.dark['background'],
    },
    'background'
  );
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.top}>
        <Image
          source={require('../assets/images/sign-in.gif')}
          style={styles.gif}
        />
      </View>
      <View style={styles.main}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.viewText}>
          <ThemedText type='font-body-md' color='text-tertiary'>
            Stay up to date with the latest
          </ThemedText>
          <ThemedText type='font-body-md' color='text-tertiary'>
            Crypto news
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonPrimary }]}
          onPress={onPress}
        >
          <Image
            source={require('../assets/images/ic-x.png')}
            style={styles.icX}
          />
          <ThemedText type='font-body-md' color='text-inverse'>
            Continue with X
          </ThemedText>
        </TouchableOpacity>
        <View>
          <ThemedText type='font-11-500' color='text-tertiary'>
            Powered by GM.AI
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
  },
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    paddingTop: 16,
    flex: 1,
  },
  main: {
    alignItems: 'center',
  },
  viewText: {
    alignItems: 'center',
  },
  icX: {
    width: 24,
    height: 24,
    objectFit: 'cover',
  },
  logo: {
    width: 135,
    height: 96,
    objectFit: 'cover',
    marginBottom: 8,
  },
  button: {
    width: screenWidth - 32,
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop: 32,
  },
  gif: {},
});
