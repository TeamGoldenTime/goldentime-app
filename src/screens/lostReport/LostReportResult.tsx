import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';
import ResultLoading from './ResultLoading';
import ResultList from './ResultList';

interface LostReportResultProps {
  navigation: StackNavigationProp<any>;
}

const LostReportResult: React.FC<LostReportResultProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    //TODO :: API콜 완료되면 분석결과 화면으로 이동해야 한다.
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'main' }],
    // });
  }, 8000);

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <View style={tw('mt-3 items-center')}>
        <Text style={tw('text-3xl')}>분실 신고 결과</Text>
      </View>
      {loading ? <ResultLoading /> : <ResultList />}
    </SafeAreaView>
  );
};

export default LostReportResult;
