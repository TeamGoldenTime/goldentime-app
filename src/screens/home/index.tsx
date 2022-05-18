import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
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
  APP_NAVIGATION_LOST_REPORT_DETAIL,
  APP_NAVIGATION_CATCH_REPORT_DETAIL,
} from '../../navigations/constants';
import { API_BASE_INSTANCE } from '../../api/instance';
import { postToReportItems } from '../../shared/utils';

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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getLostPost();
    getCatchPost();
  }, []);

  const getLostPost = async () => {
    const result = await API_BASE_INSTANCE.get('/pet/post/lost');

    const lostPostData = result.data.data;
    const lostReportItems: ReportItem[] = postToReportItems(lostPostData);
    lostReportItems.reverse();
    setLostPostList(lostReportItems);
  };

  const getCatchPost = async () => {
    const result = await API_BASE_INSTANCE.get('/pet/post/catch');

    const catchPostData = result.data.data;
    const catchReportItems: ReportItem[] = postToReportItems(catchPostData);
    catchReportItems.reverse();
    setCatchPostList(catchReportItems);
  };

  const onClickLostReportList = () => {
    navigation.push(APP_NAVIGATION_LOST_REPORT_LIST, {
      onClickReportItem: onClickLostReportItem,
    });
  };

  const onClickCatchReportList = () => {
    navigation.push(APP_NAVIGATION_CATCH_REPORT_LIST, {
      onClickReportItem: onClickCatchReportItem,
    });
  };

  const onClickLostReportItem = (id: number) => {
    navigation.push(APP_NAVIGATION_LOST_REPORT_DETAIL, { id: id });
  };

  const onClickCatchReportItem = (id: number) => {
    navigation.push(APP_NAVIGATION_CATCH_REPORT_DETAIL, { id: id });
  };

  const onRefreshing = () => {
    setRefreshing(true);
    getLostPost();
    getCatchPost();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <Header />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
          }>
          <ReportSection
            title="내 주변 분실신고"
            data={lostPostList}
            onClickShowAll={onClickLostReportList}
            onClickReportItem={onClickLostReportItem}
          />
          <ReportSection
            title="내 주변 목격신고"
            data={catchPostList}
            onClickShowAll={onClickCatchReportList}
            onClickReportItem={onClickCatchReportItem}
          />
          <InfoCarousel items={MOCK_DATA} />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
