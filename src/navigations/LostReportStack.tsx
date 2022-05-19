import React, { useEffect, useState } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import LostReportImage from '../screens/report/lostReport/LostReportImage';
import LostReportInfo from '../screens/report/lostReport/LostReportInfo';
import LostReportLocation from '../screens/report/lostReport/LostReportLocation';
import LostReportResult from '../screens/report/lostReport/LostReportResult';
import {
  APP_NAVIGATION_MAIN,
  LOST_REPORT_COMPLETE,
  LOST_REPORT_RESULT,
  LOST_REPORT_STEP1,
  LOST_REPORT_STEP2,
  LOST_REPORT_STEP3,
} from './constants';
import LostReportComplete from '../screens/report/lostReport/LostReportComplete';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginModalState } from '../states/modalState';
import { userState } from '../states/authState';
import { sleep } from '../shared/utils';

const Stack = createStackNavigator();

const LostReportStack = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => {
  const user = useRecoilValue(userState);
  const [loginModal, setLoginModal] = useRecoilState(loginModalState);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const checkLogin = async () => {
      if (!user) {
        if (renderCount > 1) {
          setLoginModal(false);
          await sleep(200);
          navigation.reset({
            index: 0,
            routes: [{ name: APP_NAVIGATION_MAIN }],
          });
          return;
        }
        setLoginModal(true);
        setRenderCount(renderCount + 1);
      }
    };
    checkLogin();
  }, [loginModal]);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={LOST_REPORT_STEP1} component={LostReportImage} />
        <Stack.Screen name={LOST_REPORT_STEP2} component={LostReportInfo} />
        <Stack.Screen name={LOST_REPORT_STEP3} component={LostReportLocation} />
        <Stack.Screen name={LOST_REPORT_RESULT} component={LostReportResult} />
        <Stack.Screen
          name={LOST_REPORT_COMPLETE}
          component={LostReportComplete}
        />
      </Stack.Navigator>
    </>
  );
};

export default LostReportStack;
