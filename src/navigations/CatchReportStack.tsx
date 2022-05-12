import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LostReportLocation from '../screens/report/lostReport/LostReportLocation';
import {
  CATCH_REPORT_RESULT,
  CATCH_REPORT_STEP1,
  CATCH_REPORT_STEP2,
  CATCH_REPORT_STEP3,
  LOST_REPORT_COMPLETE,
} from './constants';
import LostReportComplete from '../screens/report/lostReport/LostReportComplete';
import catchReportImage from '../screens/report/catchReport/CatchReportImage';
import catchReportInfo from '../screens/report/catchReport/CatchReportInfo';
import CatchReportLocation from '../screens/report/catchReport/CatchReportLocation';

const Stack = createStackNavigator();

const CatchReportStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={CATCH_REPORT_STEP1} component={catchReportImage} />
        <Stack.Screen name={CATCH_REPORT_STEP2} component={catchReportInfo} />
        <Stack.Screen
          name={CATCH_REPORT_STEP3}
          component={LostReportLocation}
        />
        <Stack.Screen
          name={CATCH_REPORT_RESULT}
          component={CatchReportLocation}
        />
      </Stack.Navigator>
    </>
  );
};

export default CatchReportStack;
