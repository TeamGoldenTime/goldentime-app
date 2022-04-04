import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainNavigation from './navigations/MainNavigation';
import ReportModal from './modal/report';
import LostReportStack from './navigations/LostReportStack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={MainNavigation} />
        <Stack.Screen name="lostReportStack" component={LostReportStack} />
        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
          <Stack.Screen
            name="reportModal"
            component={ReportModal}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
