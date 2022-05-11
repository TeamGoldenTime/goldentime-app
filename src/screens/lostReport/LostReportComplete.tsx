import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { useRecoilValue } from 'recoil';
import { StackNavigationProp } from '@react-navigation/stack';

import AlarmAnimation from '../../animations/AlarmAnimation';
import FullButton from './components/FullButton';
import { userState, UserType } from '../../states/authState';
import { APP_NAVIGATION_MAIN } from '../../navigations/constants';

interface LostReportCompleteProps {
  navigation: StackNavigationProp<any>;
}

const LostReportComplete: React.FC<LostReportCompleteProps> = ({
  navigation,
}) => {
  const user: UserType | null = useRecoilValue(userState);

  const onClickFinishButton = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: APP_NAVIGATION_MAIN }],
    });
  };

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <View style={tw('mt-3 items-center')}>
        <Text style={tw('text-3xl')}>분실 등록 완료</Text>
      </View>
      <View style={tw('flex-1 p-6')}>
        <View style={tw('')}>
          <Text style={tw('text-3xl')}>{user?.name}님,</Text>
          <Text style={tw('mt-3 text-xl')}>
            소중하신 반려동물을 찾을 수 있도록{'\n'}최선을 다하겠습니다.
          </Text>
        </View>
        <View style={tw('flex-1')}>
          <AlarmAnimation />
        </View>
        <View style={tw('items-center')}>
          <Text style={tw('text-xl')}>유사한 반려동물을 찾으면</Text>
          <Text style={tw('text-xl')}>푸시알림을 통해 알려드릴게요.</Text>
        </View>
      </View>
      <View style={tw('flex p-6')}>
        <FullButton onClickNextButton={onClickFinishButton} name="확인" />
      </View>
    </SafeAreaView>
  );
};

export default LostReportComplete;
