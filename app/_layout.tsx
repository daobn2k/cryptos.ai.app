import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Colors } from '@/src/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Aspekta: require('../assets/fonts/Aspekta-400.ttf'),
    'Aspekta-Medium': require('../assets/fonts/Aspekta-500.ttf'),
    'Aspekta-Bold': require('../assets/fonts/Aspekta-600.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const bgColor = colorScheme
    ? Colors[colorScheme].background
    : Colors.dark.background;
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
