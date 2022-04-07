import React, { ReactChild } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-rn';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { SvgXml } from 'react-native-svg';
import { StackNavigationProp } from '@react-navigation/stack';

import FullButton from './FullButton';
import HalfButton from './HalfButton';

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
}) => (
  <SafeAreaView style={tw('flex-1 bg-white')}>
    <View style={tw('flex-row mt-3 justify-center items-center')}>
      <TouchableOpacity
        style={tw('absolute left-2')}
        onPress={() => {
          //TODO : 취소확인 팝업 띄우기

          navigation.reset({
            index: 0,
            routes: [{ name: 'main' }],
          });
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
      {type === 'step1' ? (
        <FullButton onClickNextButton={onClickNextButton} />
      ) : type === 'step2' ? (
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
        <></>
      )}
    </View>
  </SafeAreaView>
);

export default ReportLayout;
