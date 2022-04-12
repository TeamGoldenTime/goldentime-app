import React from 'react';
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
import Dog from '../../../assets/image/dog.jpeg';
import Dog2 from '../../../assets/image/dog2.jpeg';
import Dog3 from '../../../assets/image/dog3.jpeg';
import Dog4 from '../../../assets/image/dog4.jpeg';
import Dog5 from '../../../assets/image/dog5.jpeg';
import Cat1 from '../../../assets/image/cat1.jpeg';

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

const MOCK_REPORT_DATA: ReportItem[] = [
  {
    id: 1,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog,
  },
  {
    id: 2,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog3,
  },
  {
    id: 3,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog4,
  },
];

const MOCK_REPORT_DATA2: ReportItem[] = [
  {
    id: 1,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog5,
  },
  {
    id: 2,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Cat1,
  },
  {
    id: 3,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog2,
  },
];

interface HomeProps {
  navigation: StackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const onClickProfile = () => {
    navigation.push('loginModal');
  };

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <Header onClickProfile={onClickProfile} />
        <InfoCarousel items={MOCK_DATA} />
        <ReportSection title="내 주변 분실신고" data={MOCK_REPORT_DATA} />
        <ReportSection title="내 주변 목격신고" data={MOCK_REPORT_DATA2} />
      </Container>
    </SafeAreaView>
  );
};

export default Home;
