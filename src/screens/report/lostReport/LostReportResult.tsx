import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';

import ResultLoading from '../shared/components/ResultLoading';
import ResultList from '../shared/components/ResultList';
import { LOST_REPORT_COMPLETE } from '../../../navigations/constants';
import { API_BASE_INSTANCE } from '../../../api/instance';

interface LostReportResultProps {
  navigation: StackNavigationProp<any>;
  route: StackNavigationProp<any>;
}

export interface SimilarPost {
  area: string;
  date: string;
  thumbnail: string;
  link: string;
  where: string;
}

const LostReportResult: React.FC<LostReportResultProps> = ({
  navigation,
  route,
}) => {
  const id = route.params?.id;
  const [loading, setLoading] = useState(true);
  const [resultList, setResultList] = useState<SimilarPost[]>([]);

  const onClickFinishButton = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: LOST_REPORT_COMPLETE }],
    });
  };

  const fetchingSimilarPost = async () => {
    const result = await API_BASE_INSTANCE.get(
      `/pet/post/lost/similarity/${id}`,
    );

    const list = result.data.data;
    const similarList = list.map((data: any) => {
      return {
        thumbnail: data.imgUrl,
        area: data.postNum,
        date: data.reportDate,
        link: data.detailLink,
        where: '동물보호 관리 시스템',
      };
    });

    similarList.reverse();
    setResultList(similarList);
    setLoading(false);
    console.log(result.data.data);
  };

  useEffect(() => {
    fetchingSimilarPost();
  }, []);

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
          data={resultList}
        />
      )}
    </SafeAreaView>
  );
};

export default LostReportResult;
