import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';

import ResultLoading from './ResultLoading';
import ResultList from './ResultList';
import { LOST_REPORT_COMPLETE } from '../../../navigations/constants';

interface LostReportResultProps {
  navigation: StackNavigationProp<any>;
}

const LostReportResult: React.FC<LostReportResultProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const onClickFinishButton = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: LOST_REPORT_COMPLETE }],
    });
  };

  //TODO :: 유사 신고 분석 API콜
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <View style={tw('mt-3 items-center')}>
        <Text style={tw('text-3xl')}>분실 신고 결과</Text>
      </View>
      {loading ? (
        <ResultLoading />
      ) : (
        <ResultList onClickFinishButton={onClickFinishButton} />
      )}
    </SafeAreaView>
  );
};

export default LostReportResult;
