import React, { useState } from 'react';
import tw from 'tailwind-rn';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { StackNavigationProp } from '@react-navigation/stack';

import ReportLayout from '../shared/components/ReportLayout';
import { stepper2 } from '../shared/components/stepper2';
import ReportInput from '../shared/components/ReportInput';
import ReportDate from '../shared/components/ReportDate';
import { lostFormState } from '../../../states/formState';
import {
  LOST_REPORT_STEP2,
  LOST_REPORT_STEP3,
} from '../../../navigations/constants';
import BreedReport from '../shared/components/BreedReport';
import DropDownPicker from 'react-native-dropdown-picker';
import { GENDER_LIST } from '../shared/constants';

interface LostReportInfoProps {
  route: StackNavigationProp<any>;
  navigation: StackNavigationProp<any>;
}

const LostReportInfo: React.FC<LostReportInfoProps> = ({
  route,
  navigation,
}) => {
  const [kind, setKind] = useState(route.params?.kind);
  const [color, setColor] = useState('');
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [gender, setGender] = useState('');
  const [genderList, setGenderList] = useState(GENDER_LIST);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [age, setAge] = useState('');
  const [formData, setFormData] = useRecoilState(lostFormState);

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

  const onClickBackButton = () => {
    navigation.goBack();
  };

  const onClickNextButton = () => {
    navigation.push(LOST_REPORT_STEP3);
    setFormData({
      ...formData,
      kind: kind,
      color: color,
      date: date,
      name: name,
      desc: desc,
      age: age,
      gender: gender,
    });
  };

  return (
    <ReportLayout
      type={LOST_REPORT_STEP2}
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
          <BreedReport kind={kind} setKind={setKind} />
          <ReportInput title="색상" text={color} onChangeText={onChangeColor} />
          <ReportDate
            title="분실날짜"
            date={date}
            onChangeDate={onChangeDate}
          />
          <ReportInput title="이름" text={name} onChangeText={onChangeName} />
          <ReportInput title="나이" text={age} onChangeText={onChangeAge} />
          <Text style={tw('mt-3 text-base text-gray-600')}>성별</Text>
          <DropDownPicker
            open={genderDropdownOpen}
            value={gender}
            items={genderList}
            setOpen={setGenderDropdownOpen}
            setValue={setGender}
            setItems={setGenderList}
            listMode="SCROLLVIEW"
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#737373',
              borderRadius: 0,
            }}
            labelStyle={[{ left: -10 }, tw('text-lg')]}
            placeholder=""
          />
          <View style={tw('mt-3')}>
            <Text style={tw('text-base text-gray-600 mb-3')}>특이사항</Text>
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
