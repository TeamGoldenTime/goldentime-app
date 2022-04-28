import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RecoilRoot } from 'recoil';

import MainNavigation from './navigations/MainNavigation';
import ReportModal from './modal/report';
import LostReportStack from './navigations/LostReportStack';
import LoginModal from './modal/login';
import AbandonedModal from './modal/abandoned';
import Loading from './shared/Loading';

const Stack = createStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
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
      <LoginModal />
      <AbandonedModal />
      <Loading />
    </RecoilRoot>
  );
};

export default App;
