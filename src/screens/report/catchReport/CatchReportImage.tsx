import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { ImageLibraryOptions } from 'react-native-image-picker/lib/typescript/types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import tw from 'tailwind-rn';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { StackNavigationProp } from '@react-navigation/stack';

import { stepper1 } from '../shared/components/stepper1';
import ReportLayout from '../shared/components/ReportLayout';
import { catchFormState, IImageSrc } from '../../../states/formState';
import { uploadImageToS3 } from '../../../api/s3';
import { API_BASE_INSTANCE } from '../../../api/instance';
import { loadingState } from '../../../states/modalState';
import {
  APP_NAVIGATION_MAIN,
  CATCH_REPORT_STEP1,
  CATCH_REPORT_STEP2,
} from '../../../navigations/constants';

interface CatchReportImageProps {
  navigation: StackNavigationProp<any>;
}

const CatchReportImage: React.FC<CatchReportImageProps> = ({ navigation }) => {
  const [images, setImages] = useState<ImagePickerResponse | null>(null);
  const [formData, setFormData] = useRecoilState(catchFormState);
  const setLoading = useSetRecoilState(loadingState);

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

  const onClickNextButton = async () => {
    //TODO :: 이미지가 등록되어있지 않을 경우 예외처리 필요함.
    if (!images) {
      return;
    }
    setFormData({
      ...formData,
      imagePickerResponse: images,
    });

    setLoading(true);
    //TODO : 리팩토링해야함.
    const imagePromises: any[] = [];
    const imagePickerResponse: Asset[] | undefined = images?.assets;
    imagePickerResponse?.map(image => {
      imagePromises.push(uploadImageToS3(image));
    });

    const imageResult: IImageSrc[] = await Promise.all(imagePromises);
    console.log(imageResult);

    try {
      const result = await API_BASE_INSTANCE.post('/pet/analyze', {
        images: imageResult,
      });
      setLoading(false);
      navigation.push(CATCH_REPORT_STEP2, { kind: result.data.data.breed });
      console.log(result.data);
    } catch (e) {
      Alert.alert('오류가 발생했습니다.');
      navigation.reset({
        index: 0,
        routes: [{ name: APP_NAVIGATION_MAIN }],
      });
      setLoading(false);
      console.log(JSON.stringify(e));
    }
  };

  return (
    <ReportLayout
      type={CATCH_REPORT_STEP1}
      navigation={navigation}
      title="목격신고"
      mainDescription={'발견하신 반려동물의 사진을\n업로드 해주세요.'}
      subDescription={
        '이미지 분석 AI를 통해\n반려동물의 주인을 찾는 데 사용됩니다.'
      }
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

export default CatchReportImage;
