import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import tw from 'tailwind-rn';
import Container from '../../shared/Container';
import Header from '../../shared/Header';
import Loading from '../../animations/Loading';
import ReportSection from './components/ReportSection';
import InfoCarousel from './components/InfoCarousel';
import React, { useEffect, useState } from 'react';
import { InfoItem, ReportItem } from './interface';
import { API_BASE_INSTANCE } from '../../api/instance';
import {
  postToCatchReportItems,
  postToLostReportItems,
} from '../../shared/utils';
import {
  APP_NAVIGATION_CATCH_REPORT_DETAIL,
  APP_NAVIGATION_CATCH_REPORT_LIST,
  APP_NAVIGATION_LOST_REPORT_DETAIL,
  APP_NAVIGATION_LOST_REPORT_LIST,
} from '../../navigations/constants';
import Banner1 from '../../../assets/image/banner1.png';
import Banner3 from '../../../assets/image/banner3.png';
import { StackNavigationProp } from '@react-navigation/stack';

const MOCK_DATA: InfoItem[] = [
  {
    title: 'banner1',
    image: Banner1,
  },
  {
    title: 'banner3',
    image: Banner3,
  },
];

interface HomeProps {
  navigation: StackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lostPostList, setLostPostList] = useState<ReportItem[]>([]);
  const [catchPostList, setCatchPostList] = useState<ReportItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await Promise.all([getLostPost(), getCatchPost()]);
      setIsLoading(false);
    };

    fetch();
  }, []);

  const getLostPost = async () => {
    const result = await API_BASE_INSTANCE.get('/pet/post/lost');

    const lostPostData = result.data.data;
    const lostReportItems: ReportItem[] = postToLostReportItems(lostPostData);
    lostReportItems.reverse();
    setLostPostList(lostReportItems);
  };

  const getCatchPost = async () => {
    const result = await API_BASE_INSTANCE.get('/pet/post/catch');

    const catchPostData = result.data.data;
    const catchReportItems: ReportItem[] =
      postToCatchReportItems(catchPostData);
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

  const onRefreshing = async () => {
    setRefreshing(true);
    await Promise.all([getLostPost(), getCatchPost()]);
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
          {isLoading ? (
            <Loading />
          ) : (
            <>
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
            </>
          )}

          <InfoCarousel items={MOCK_DATA} />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
