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
import { catchFormState } from '../../../states/formState';
import {
  CATCH_REPORT_STEP2,
  CATCH_REPORT_STEP3,
} from '../../../navigations/constants';
import BreedReport from '../shared/components/BreedReport';

interface CatchReportInfoProps {
  route: StackNavigationProp<any>;
  navigation: StackNavigationProp<any>;
}

const CatchReportInfo: React.FC<CatchReportInfoProps> = ({
  route,
  navigation,
}) => {
  const [kind, setKind] = useState(route.params?.kind);
  const [color, setColor] = useState('');
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState('');
  const [formData, setFormData] = useRecoilState(catchFormState);

  const onChangeColor = (text: string) => {
    setColor(text);
  };

  const onChangeDate = (d: Date) => {
    setDate(d);
  };

  const onChangeDesc = (text: string) => {
    setDesc(text);
  };

  const onClickBackButton = () => {
    navigation.goBack();
  };

  const onClickNextButton = () => {
    navigation.push(CATCH_REPORT_STEP3);
    setFormData({
      ...formData,
      kind: kind,
      color: color,
      date: date,
      desc: desc,
    });
  };

  return (
    <ReportLayout
      type={CATCH_REPORT_STEP2}
      navigation={navigation}
      title="목격신고"
      mainDescription={'발견하신 반려동물의\n상세정보를 입력해주세요.'}
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
            title="목격날짜"
            date={date}
            onChangeDate={onChangeDate}
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

export default CatchReportInfo;
