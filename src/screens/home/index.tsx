import React from 'react';
import { SafeAreaView } from 'react-native';
import tw from 'tailwind-rn';

import Container from '../../shared/Container';
import Info from '../../../assets/image/info_test1.png';
import Info2 from '../../../assets/image/info_test2.png';
import Info3 from '../../../assets/image/info_test3.png';
import Header from '../../shared/Header';
import InfoCarousel from './components/InfoCarousel';

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

export interface InfoItem {
  title: string;
  image: string;
}

const Home = () => {
  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <Header />
        <InfoCarousel items={MOCK_DATA} />
      </Container>
    </SafeAreaView>
  );
};

export default Home;
