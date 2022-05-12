import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CATCH_REPORT_RESULT,
  CATCH_REPORT_STEP1,
  CATCH_REPORT_STEP2,
  CATCH_REPORT_STEP3,
} from './constants';
import catchReportImage from '../screens/report/catchReport/CatchReportImage';
import catchReportInfo from '../screens/report/catchReport/CatchReportInfo';
import CatchReportLocation from '../screens/report/catchReport/CatchReportLocation';
import CatchReportResult from '../screens/report/catchReport/CatchReportResult';

const Stack = createStackNavigator();

const CatchReportStack = () => {
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
