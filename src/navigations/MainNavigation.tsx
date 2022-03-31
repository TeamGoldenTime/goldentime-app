import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/home';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        tabBarActiveTintColor: '#F5BA25',
        tabBarInactiveTintColor: '#595959',
        headerShown: false,
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: {
          height: hp('10%'),
          position: 'relative',
        },
      }}>
      <Tab.Screen
        name="홈"
        component={Home}
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
        name="지역"
        component={Home}
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
        name="등록"
        component={Home}
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
        name="쇼핑"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <IIcon name="ios-cart-sharp" color={color} size={size} />
            ) : (
              <IIcon name="ios-cart-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="더보기"
        component={Home}
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
