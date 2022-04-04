import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Example from '../screens/Example';
import LostReportImage from '../screens/lostReport/LostReportImage';
import LostReportInfo from '../screens/lostReport/LostReportInfo';
import LostReportLocation from '../screens/lostReport/LostReportLocation';

const Stack = createStackNavigator();

const LostReportStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="step1" component={LostReportImage} />
        <Stack.Screen name="step2" component={LostReportInfo} />
        <Stack.Screen name="step3" component={LostReportLocation} />
      </Stack.Navigator>
    </>
  );
};

export default LostReportStack;
