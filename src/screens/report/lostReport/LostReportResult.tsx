import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';

import ResultLoading from '../shared/components/ResultLoading';
import ResultList from '../shared/components/ResultList';
import {
  APP_NAVIGATION_CATCH_REPORT_DETAIL,
  LOST_REPORT_COMPLETE,
} from '../../../navigations/constants';
import { API_BASE_INSTANCE } from '../../../api/instance';

interface LostReportResultProps {
  navigation: StackNavigationProp<any>;
  route: StackNavigationProp<any>;
}

export interface SimilarList {
  related: SimilarPost[];
  unrelated: SimilarPost[];
}

export interface SimilarPost {
  id: number;
  area: string;
  date: string;
  thumbnail: string;
  link: string;
  where: string;
  type: string;
}

const LostReportResult: React.FC<LostReportResultProps> = ({
  navigation,
  route,
}) => {
  const id = route.params?.id;
  const [loading, setLoading] = useState(true);
  const [resultList, setResultList] = useState<SimilarList>({
    related: [],
    unrelated: [],
  });

  const onClickFinishButton = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: LOST_REPORT_COMPLETE }],
    });
  };

  const fetchingSimilarPost = async () => {
    try {
      const result = await API_BASE_INSTANCE.get(
        `/pet/post/lost/similarity/${id}`,
      );

      const resultData = result.data.data;
      const similarList = {
        related: resultData.related.map((data: any) => {
          return {
            id: data.id,
            thumbnail: data.imgUrl,
            area: `${data.region_1depth_name} ${data.region_2depth_name}`,
            date: data.date,
            link: data.detailLink,
            where: data.writer,
            type: data.type,
          };
        }),
        unrelated: resultData.unrelated.map((data: any) => {
          return {
            id: data.id,
            thumbnail: data.imgUrl,
            area: `${data.region_1depth_name} ${data.region_2depth_name}`,
            date: data.date,
            link: data.detailLink,
            where: data.writer,
            type: data.type,
          };
        }),
      };

      setResultList(similarList);
      setLoading(false);
      console.log(result.data.data);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  const onClickCatchReport = (reportId: number) => {
    navigation.push(APP_NAVIGATION_CATCH_REPORT_DETAIL, { id: reportId });
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
          onClickCatchReport={onClickCatchReport}
        />
      )}
    </SafeAreaView>
  );
};

export default LostReportResult;
