import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LostReportImage from '../screens/report/lostReport/LostReportImage';
import LostReportInfo from '../screens/report/lostReport/LostReportInfo';
import LostReportLocation from '../screens/report/lostReport/LostReportLocation';
import LostReportResult from '../screens/report/lostReport/LostReportResult';
import {
  LOST_REPORT_COMPLETE,
  LOST_REPORT_RESULT,
  LOST_REPORT_STEP1,
  LOST_REPORT_STEP2,
  LOST_REPORT_STEP3,
} from './constants';
import LostReportComplete from '../screens/report/lostReport/LostReportComplete';

const Stack = createStackNavigator();

const CatchReportStack = () => {
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

export default CatchReportStack;
