import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';

import HomeIndex from '../screens/home';
import ReportMap from '../screens/map';
import More from '../screens/more';
import Detective from '../screens/detective';
import ReportModal from '../modal/report';
import {
  APP_NAVIGATION_REPORT_MAP,
  APP_NAVIGATION_REPORT_MODAL,
  MAIN_NAVIGATION_DETECTIVE,
  MAIN_NAVIGATION_HOME,
  MAIN_NAVIGATION_MAP,
  MAIN_NAVIGATION_MORE,
  MAIN_NAVIGATION_REGISTER,
} from './constants';
import { APP_COLOR } from '../shared/styles';

const Tab = createBottomTabNavigator();

interface MainNavigationProps {
  navigation: NavigationProp<any>;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={MAIN_NAVIGATION_HOME}
      screenOptions={{
        tabBarActiveTintColor: APP_COLOR,
        tabBarInactiveTintColor: '#595959',
        headerShown: false,
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: {
          height: hp('10%'),
        },
      }}>
      <Tab.Screen
        name={MAIN_NAVIGATION_HOME}
        component={HomeIndex}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <IIcon name="ios-home-sharp" color={color} size={size} />
            ) : (
              <IIcon name="ios-home-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name={MAIN_NAVIGATION_MAP}
        component={ReportMap}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(APP_NAVIGATION_REPORT_MAP);
          },
        })}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MCIcon name="map-marker" color={color} size={size} />
            ) : (
              <MCIcon name="map-marker-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name={MAIN_NAVIGATION_REGISTER}
        component={ReportModal}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(APP_NAVIGATION_REPORT_MODAL);
          },
        })}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MCIcon name="plus-circle" color={color} size={size} />
            ) : (
              <MCIcon name="plus-circle-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name={MAIN_NAVIGATION_DETECTIVE}
        component={Detective}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MCIcon name="shield-crown" color={color} size={size} />
            ) : (
              <MCIcon name="shield-crown-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name={MAIN_NAVIGATION_MORE}
        component={More}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MIcon name="more-horiz" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
