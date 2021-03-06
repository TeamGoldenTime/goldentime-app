import React, { ReactChild } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-rn';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { SvgXml } from 'react-native-svg';
import { StackNavigationProp } from '@react-navigation/stack';

import FullButton from './FullButton';
import HalfButton from './HalfButton';
import {
  APP_NAVIGATION_MAIN,
  CATCH_REPORT_STEP1,
  CATCH_REPORT_STEP2,
  LOST_REPORT_STEP1,
  LOST_REPORT_STEP2,
} from '../../../../navigations/constants';

interface ReportLayoutProps {
  type: string;
  navigation: StackNavigationProp<any>;
  children: ReactChild;
  title: string;
  mainDescription: string;
  subDescription: string;
  stepper: any;
  onClickNextButton?: any;
  onClickBackButton?: any;
  onClickFinishButton?: any;
}

const ReportLayout: React.FC<ReportLayoutProps> = ({
  type,
  navigation,
  children,
  title,
  mainDescription,
  subDescription,
  stepper,
  onClickNextButton,
  onClickBackButton,
  onClickFinishButton,
}) => (
  <SafeAreaView style={tw('flex-1 bg-white')}>
    <View style={tw('flex-row mt-3 justify-center items-center')}>
      <TouchableOpacity
        style={tw('absolute left-2')}
        onPress={() => {
          Alert.alert('홈 화면으로 이동하면\n작성중인 내용이 사라집니다.', '', [
            {
              text: '취소',
            },
            {
              text: '확인',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: APP_NAVIGATION_MAIN }],
                });
              },
            },
          ]);
        }}>
        <MIcon name="arrow-back" size={32} />
      </TouchableOpacity>
      <Text style={tw('text-3xl')}>{title}</Text>
    </View>
    <View style={tw('flex items-center pt-5')}>
      <SvgXml xml={stepper} />
    </View>
    <View style={tw('flex-1 p-6')}>
      <Text style={tw('text-2xl font-extralight')}>{mainDescription}</Text>
      <Text style={tw('text-sm text-gray-500')}>{subDescription}</Text>
      {children}
      {type === LOST_REPORT_STEP1 || type === CATCH_REPORT_STEP1 ? (
        <FullButton onClickNextButton={onClickNextButton} name="다음" />
      ) : type === LOST_REPORT_STEP2 || type === CATCH_REPORT_STEP2 ? (
        <View style={tw('flex-row justify-between ml-1 mr-2')}>
          <HalfButton
            textColor="#000000"
            color="#DCDCDC"
            title="이전"
            onClick={onClickBackButton}
          />
          <HalfButton
            textColor="#ffffff"
            color="#EEB015"
            title="다음"
            onClick={onClickNextButton}
          />
        </View>
      ) : (
        <View style={tw('flex-row justify-between ml-1 mr-2')}>
          <HalfButton
            textColor="#000000"
            color="#DCDCDC"
            title="이전"
            onClick={onClickBackButton}
          />
          <HalfButton
            textColor="#ffffff"
            color="#EEB015"
            title="완료"
            onClick={onClickFinishButton}
          />
        </View>
      )}
    </View>
  </SafeAreaView>
);

export default ReportLayout;
