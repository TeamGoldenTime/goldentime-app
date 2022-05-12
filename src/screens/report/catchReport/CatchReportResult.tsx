import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';

import ResultLoading from '../shared/components/ResultLoading';
import ResultList from '../shared/components/ResultList';
import { APP_NAVIGATION_MAIN } from '../../../navigations/constants';
import { ResultItem } from '../shared/interface';
import Cat from '../../../../assets/image/cat1.jpeg';
import Dog from '../../../../assets/image/dog.jpeg';
import Dog2 from '../../../../assets/image/dog2.jpeg';

interface CatchReportResultProps {
  navigation: StackNavigationProp<any>;
}

const RESULT_MOCK_DATA: ResultItem[] = [
  {
    area: '서울시 동작구 상도동',
    date: '22.05.10',
    thumbnail: Cat,
    where: '홍길동',
  },
  {
    area: '서울시 강남구',
    date: '22.05.8',
    thumbnail: Dog,
    where: '김나나',
  },
  {
    area: '서울시 동작구 흑석동',
    date: '22.05.10',
    thumbnail: Dog2,
    where: '이나나',
  },
];

const CatchReportResult: React.FC<CatchReportResultProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true);

  const onClickFinishButton = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: APP_NAVIGATION_MAIN }],
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
        <ResultList
          onClickFinishButton={onClickFinishButton}
          data={RESULT_MOCK_DATA}
        />
      )}
    </SafeAreaView>
  );
};

export default CatchReportResult;
