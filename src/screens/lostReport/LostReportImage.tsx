import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { ImageLibraryOptions } from 'react-native-image-picker/lib/typescript/types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import tw from 'tailwind-rn';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';

import { stepper1 } from './components/stepper1';
import ReportLayout from './components/ReportLayout';

interface LostReportImageProps {
  navigation: StackNavigationProp<any>;
}

const LostReportImage: React.FC<LostReportImageProps> = ({ navigation }) => {
  const [images, setImages] = useState<ImagePickerResponse | null>(null);

  const loadImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 0,
    };

    const result: ImagePickerResponse = await launchImageLibrary(options);

    if (result?.didCancel) {
      setImages(null);
      return;
    }
    setImages(result);
  };

  const onClickNextButton = () => {
    navigation.push('step2');
  };

  return (
    <ReportLayout
      type="step1"
      navigation={navigation}
      title="분실신고"
      mainDescription={'반려동물의 사진을\n업로드 해주세요.'}
      subDescription={'이미지 분석 AI를 통해\n유사한 동물을 검색합니다.'}
      stepper={stepper1}
      onClickNextButton={onClickNextButton}>
      <View
        style={[
          {
            height: hp('51%'),
          },
          tw('w-full p-5'),
        ]}>
        <Pressable
          onPress={loadImage}
          style={tw('flex-1 border-2 border-dotted bg-gray-100')}>
          {images ? (
            <View style={tw('flex-row flex-wrap p-1')}>
              {images.assets &&
                images.assets.map(({ uri }) => {
                  return (
                    <Image
                      key={uri}
                      resizeMode="cover"
                      resizeMethod="scale"
                      style={{
                        width: wp('23%'),
                        height: hp('10%'),
                        marginLeft: 4,
                      }}
                      source={{ uri: uri }}
                    />
                  );
                })}
            </View>
          ) : (
            <View style={tw('flex-1 justify-center items-center')}>
              <Text style={tw('text-lg text-gray-500')}>이곳을 눌러</Text>
              <Text style={tw('text-lg text-gray-500')}>
                사진을 업로드하세요.
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </ReportLayout>
  );
};

export default LostReportImage;
