import React from 'react';
import { SafeAreaView } from 'react-native';
import tw from 'tailwind-rn';

import Container from '../../shared/Container';

import Header from '../../shared/Header';

const Home = () => {
  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <Header />
      </Container>
    </SafeAreaView>
  );
};

export default Home;
