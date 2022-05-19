import React, { useEffect, useState } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  APP_NAVIGATION_MAIN,
  CATCH_REPORT_RESULT,
  CATCH_REPORT_STEP1,
  CATCH_REPORT_STEP2,
  CATCH_REPORT_STEP3,
} from './constants';
import catchReportImage from '../screens/report/catchReport/CatchReportImage';
import catchReportInfo from '../screens/report/catchReport/CatchReportInfo';
import CatchReportLocation from '../screens/report/catchReport/CatchReportLocation';
import CatchReportResult from '../screens/report/catchReport/CatchReportResult';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginModalState } from '../states/modalState';
import { sleep } from '../shared/utils';
import { userState } from '../states/authState';

const Stack = createStackNavigator();

const CatchReportStack = ({
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
        <Stack.Screen name={CATCH_REPORT_STEP1} component={catchReportImage} />
        <Stack.Screen name={CATCH_REPORT_STEP2} component={catchReportInfo} />
        <Stack.Screen
          name={CATCH_REPORT_STEP3}
          component={CatchReportLocation}
        />
        <Stack.Screen
          name={CATCH_REPORT_RESULT}
          component={CatchReportResult}
        />
      </Stack.Navigator>
    </>
  );
};

export default CatchReportStack;
