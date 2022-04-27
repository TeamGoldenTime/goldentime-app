import React, { useState } from 'react';
import tw from 'tailwind-rn';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { StackNavigationProp } from '@react-navigation/stack';

import ReportLayout from './components/ReportLayout';
import { stepper2 } from './components/stepper2';
import ReportInput from './components/ReportInput';
import ReportDate from './components/ReportDate';
import { lostFormState } from '../../states/formState';

interface LostReportInfoProps {
  navigation: StackNavigationProp<any>;
}

const LostReportInfo: React.FC<LostReportInfoProps> = ({ navigation }) => {
  const [kind, setKind] = useState('');
  const [color, setColor] = useState('');
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [formData, setFormData] = useRecoilState(lostFormState);

  const onChangeKind = (text: string) => {
    setKind(text);
  };

  const onChangeColor = (text: string) => {
    setColor(text);
  };

  const onChangeDate = (d: Date) => {
    setDate(d);
  };

  const onChangeName = (text: string) => {
    setName(text);
  };

  const onChangeDesc = (text: string) => {
    setDesc(text);
  };

  const onChangeAge = (text: string) => {
    setAge(text.replace(/[^0-9]/g, ''));
  };

  const onChangeGender = (text: string) => {
    setGender(text);
  };

  const onClickBackButton = () => {
    navigation.goBack();
  };

  const onClickNextButton = () => {
    navigation.push('step3');
    setFormData({
      ...formData,
      kind: kind,
      color: color,
      date: date,
      name: name,
      desc: desc,
    });
  };

  return (
    <ReportLayout
      type="step2"
      navigation={navigation}
      title="분실신고"
      mainDescription={'반려동물의 상세정보를\n입력해주세요.'}
      subDescription={'정보가 구체적일수록\n반려동물을 찾을 때 도움이 됩니다.'}
      stepper={stepper2}
      onClickBackButton={onClickBackButton}
      onClickNextButton={onClickNextButton}>
      <ScrollView
        style={[
          {
            height: hp('51%'),
          },
          tw('w-full p-1 pr-3'),
        ]}>
        <View style={tw('flex-1')}>
          <ReportInput title="품종" text={kind} onChangeText={onChangeKind} />
          <ReportInput title="색상" text={color} onChangeText={onChangeColor} />
          <ReportDate date={date} onChangeDate={onChangeDate} />
          <ReportInput title="이름" text={name} onChangeText={onChangeName} />
          <ReportInput title="나이" text={age} onChangeText={onChangeAge} />
          <ReportInput
            title="성별"
            text={gender}
            onChangeText={onChangeGender}
          />
          <View style={tw('mt-3')}>
            <Text style={tw('text-base text-gray-600')}>특이사항</Text>
            <TextInput
              style={[
                {
                  borderColor: '#737373',
                  borderWidth: 1,
                  fontSize: 18,
                  height: hp('14%'),
                },
                tw('rounded-xl pt-2 pl-1 mb-3'),
              ]}
              value={desc}
              onChangeText={onChangeDesc}
              multiline
            />
          </View>
        </View>
      </ScrollView>
    </ReportLayout>
  );
};

export default LostReportInfo;
