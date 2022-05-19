import React from 'react';
import { SafeAreaView, View } from 'react-native';
import tw from 'tailwind-rn';

import Container from '../../shared/Container';
import Header from '../../shared/Header';
import Menu from './components/Menu';
import DogNose from './components/DogNose';
import ProfileSection from './components/ProfileSection';

const More = () => {
  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <Header />
        <View style={tw('w-full h-24 bg-white p-5')}>
          <ProfileSection />
        </View>
        <View style={tw('w-full bg-white mt-1 p-3')}>
          <DogNose />
        </View>
        <View style={tw('w-full bg-white mt-1 p-2 ml-1')}>
          <Menu title="내 분실신고 목록" iconName="ios-list" />
          <Menu title="내 목격신고 목록" iconName="ios-document-text-outline" />
        </View>
        <View style={tw('w-full h-full bg-white mt-1 p-2 ml-1')}>
          <Menu title="공지사항" iconName="ios-mic-outline" />
          <Menu title="알림 설정" iconName="notifications-outline" />
          <Menu title="자주 묻는 질문" iconName="chatbubbles-outline" />
          <Menu title="이용약관" iconName="document-outline" />
          <Menu title="로그아웃" iconName="exit-outline" />
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default More;
