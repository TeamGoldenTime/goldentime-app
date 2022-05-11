import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LostReportImage from '../screens/lostReport/LostReportImage';
import LostReportInfo from '../screens/lostReport/LostReportInfo';
import LostReportLocation from '../screens/lostReport/LostReportLocation';
import LostReportResult from '../screens/lostReport/LostReportResult';
import {
  LOST_REPORT_RESULT,
  LOST_REPORT_STEP1,
  LOST_REPORT_STEP2,
  LOST_REPORT_STEP3,
} from './constants';

const Stack = createStackNavigator();

const LostReportStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={LOST_REPORT_STEP1} component={LostReportImage} />
        <Stack.Screen name={LOST_REPORT_STEP2} component={LostReportInfo} />
        <Stack.Screen name={LOST_REPORT_STEP3} component={LostReportLocation} />
        <Stack.Screen name={LOST_REPORT_RESULT} component={LostReportResult} />
      </Stack.Navigator>
    </>
  );
};

export default LostReportStack;
