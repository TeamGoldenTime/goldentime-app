import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import Map from '../screens/map';
import More from '../screens/more';
import Detective from '../screens/detective';
import Report from '../modal/report';

const Tab = createBottomTabNavigator();

const MainNavigation = ({ setShowReportModal }) => {
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
          position: 'absolute',
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
        component={Map}
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
        component={Report}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            setShowReportModal(true);
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
        name="의뢰"
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
        name="더보기"
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
