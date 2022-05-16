import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import tw from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';

import { InfoItem, ReportItem } from './interface';
import ReportSection from './components/ReportSection';
import InfoCarousel from './components/InfoCarousel';
import Container from '../../shared/Container';
import Info from '../../../assets/image/info_test1.png';
import Info2 from '../../../assets/image/info_test2.png';
import Info3 from '../../../assets/image/info_test3.png';
import Header from '../../shared/Header';
import {
  APP_NAVIGATION_CATCH_REPORT_LIST,
  APP_NAVIGATION_LOST_REPORT_LIST,
} from '../../navigations/constants';
import { API_BASE_INSTANCE } from '../../api/instance';

const MOCK_DATA: InfoItem[] = [
  {
    title: 'info_test1',
    image: Info,
  },
  {
    title: 'info_test2',
    image: Info2,
  },
  {
    title: 'info_test3',
    image: Info3,
  },
];

interface HomeProps {
  navigation: StackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [lostPostList, setLostPostList] = useState<ReportItem[]>([]);
  const [catchPostList, setCatchPostList] = useState<ReportItem[]>([]);

  useEffect(() => {
    getLostPost();
    getCatchPost();
  }, []);

  const getLostPost = async () => {
    const result = await API_BASE_INSTANCE.get('/pet/post/lost');

    const lostPostData = result.data.data;
    const lostReportItems = lostPostData.map((post: any) => {
      return {
        id: post.id,
        title: `강아지/${post.kind}/${post.color}`,
        location: post.area,
        image: post.images[0]?.location,
      };
    });
    lostReportItems.reverse();
    setLostPostList(lostReportItems);
  };

  const getCatchPost = async () => {
    const result = await API_BASE_INSTANCE.get('/pet/post/catch');

    const catchPostData = result.data.data;
    const catchReportItems: ReportItem[] = catchPostData.map((post: any) => {
      return {
        id: post.id,
        title: `강아지/${post.kind}/${post.color}`,
        location: post.area,
        image: post.images[0]?.location,
      };
    });
    catchReportItems.reverse();
    setCatchPostList(catchReportItems);
  };

  const onClickLostReportList = () => {
    navigation.push(APP_NAVIGATION_LOST_REPORT_LIST);
  };

  const onClickCatchReportList = () => {
    navigation.push(APP_NAVIGATION_CATCH_REPORT_LIST);
  };

  // TODO :: 목격신고 전체보기
  // const onClickLostReportList = () => {
  //   navigation.push(APP_NAVIGATION_LOST_REPORT_LIST);
  // };

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <Header />
        <InfoCarousel items={MOCK_DATA} />
        <ReportSection
          title="내 주변 분실신고"
          data={lostPostList}
          onClickShowAll={onClickLostReportList}
        />
        <ReportSection
          title="내 주변 목격신고"
          data={catchPostList}
          onClickShowAll={onClickCatchReportList}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Home;
