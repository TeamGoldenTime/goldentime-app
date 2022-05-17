import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RecoilRoot } from 'recoil';

import MainNavigation from './navigations/MainNavigation';
import ReportModal from './modal/report';
import LostReportStack from './navigations/LostReportStack';
import LoginModal from './modal/login';
import AbandonedModal from './modal/abandoned';
import GlobalLoading from './shared/GlobalLoading';
import {
  APP_NAVIGATION_ABANDONED_MODAL,
  APP_NAVIGATION_CATCH_REPORT_LIST,
  APP_NAVIGATION_CATCH_REPORT_STACK,
  APP_NAVIGATION_LOST_REPORT_LIST,
  APP_NAVIGATION_LOST_REPORT_STACK,
  APP_NAVIGATION_MAIN,
  APP_NAVIGATION_REPORT_MAP,
  APP_NAVIGATION_REPORT_MODAL,
} from './navigations/constants';
import LostReportList from './screens/home/LostReportList';
import CatchReportStack from './navigations/CatchReportStack';
import CatchReportList from './screens/home/CatchReportList';
import ReportMap from './screens/map';

const Stack = createStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={APP_NAVIGATION_MAIN} component={MainNavigation} />
          <Stack.Screen
            name={APP_NAVIGATION_LOST_REPORT_STACK}
            component={LostReportStack}
          />
          <Stack.Screen
            name={APP_NAVIGATION_LOST_REPORT_LIST}
            component={LostReportList}
          />
          <Stack.Screen
            name={APP_NAVIGATION_CATCH_REPORT_LIST}
            component={CatchReportList}
          />
          <Stack.Screen
            name={APP_NAVIGATION_CATCH_REPORT_STACK}
            component={CatchReportStack}
          />
          <Stack.Screen
            name={APP_NAVIGATION_REPORT_MAP}
            component={ReportMap}
          />
          <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
            <Stack.Screen
              name={APP_NAVIGATION_REPORT_MODAL}
              component={ReportModal}
              options={{
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name={APP_NAVIGATION_ABANDONED_MODAL}
              component={AbandonedModal}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <LoginModal />
      <GlobalLoading />
    </RecoilRoot>
  );
};

export default App;
