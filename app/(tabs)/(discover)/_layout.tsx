import { ThemedText } from '@/src/components/ThemedText';
import { Colors } from '@/src/constants/Colors';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { View } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TopTabs = () => {
  const background = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    'background'
  );
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: background,
          justifyContent: 'center',
        },
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: { position: 'relative' },
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          height: 4,
          borderRadius: 9999,
          position: 'absolute',
          bottom: 0,
          width: 32,
          left: '21%',
        },
      }}
    >
      <MaterialTopTabs.Screen
        name='trending'
        options={{
          tabBarLabel: ({ focused }) => (
            <View>
              <ThemedText
                type='font-15-600'
                color={focused ? 'text-primary' : 'text-tertiary'}
              >
                Trending
              </ThemedText>
            </View>
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name='index'
        options={{
          tabBarLabel: ({ focused }) => (
            <View>
              <ThemedText
                type='font-15-600'
                color={focused ? 'text-primary' : 'text-tertiary'}
              >
                For you
              </ThemedText>
            </View>
          ),
        }}
      />
    </MaterialTopTabs>
  );
};

export default TopTabs;
