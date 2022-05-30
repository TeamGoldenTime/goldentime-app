import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
import { MAX_IMAGE } from '../shared/constants';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { APP_COLOR } from '../../../shared/styles';
import ImageRemoveButton from '../shared/components/ImageRemoveButton';

interface CatchReportImageProps {
  navigation: StackNavigationProp<any>;
}

const CatchReportImage: React.FC<CatchReportImageProps> = ({ navigation }) => {
  const [pickerImages, setPickerImages] = useState<Asset[]>([]);
  const [formData, setFormData] = useRecoilState(catchFormState);
  const setLoading = useSetRecoilState(loadingState);

  const loadImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: MAX_IMAGE,
    };

    const result: ImagePickerResponse = await launchImageLibrary(options);

    console.log(result);
    if (result?.didCancel || result.assets === undefined) {
      return;
    }

    setPickerImages(result.assets);
  };

  const onClickNextButton = async () => {
    //TODO :: 이미지가 등록되어있지 않을 경우 예외처리 필요함.
    if (!pickerImages) {
      return;
    }
    setFormData({
      ...formData,
      pickerImages: pickerImages,
    });

    setLoading(true);
    //TODO : 리팩토링해야함.
    const imagePromises: any[] = [];

    pickerImages?.map(image => {
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

  const onClickRemoveImage = (uri: any) => {
    const filteredPickierImages = pickerImages.filter(
      image => image.uri !== uri,
    );

    setPickerImages(filteredPickierImages);
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
        style={{
          width: '100%',
          height: hp('51%'),
          padding: 12,
        }}>
        <Pressable
          onPress={loadImage}
          style={tw('flex-1 border-2 border-dotted bg-gray-100 p-2')}>
          {pickerImages.length !== 0 ? (
            <View style={tw('flex-1 flex-row flex-wrap')}>
              <View
                style={[
                  styles.imageStyle,
                  tw('items-center justify-center bg-gray-200'),
                ]}>
                <MCIcon name="camera" size={36} color={APP_COLOR} />
                <Text
                  style={tw(
                    'text-base text-gray-600',
                  )}>{`${pickerImages.length} / ${MAX_IMAGE}`}</Text>
              </View>
              {pickerImages.map(({ uri }) => {
                return (
                  <View key={uri}>
                    <Image
                      resizeMode="cover"
                      style={styles.imageStyle}
                      source={{ uri: uri }}
                    />
                    <Pressable
                      style={tw('absolute right-0 top-0')}
                      onPress={() => onClickRemoveImage(uri)}>
                      <ImageRemoveButton />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={tw('flex-1 justify-center items-center')}>
              <MCIcon name="camera" size={50} color={APP_COLOR} />
              <Text
                style={tw('text-xl text-gray-600')}>{`0 / ${MAX_IMAGE}`}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </ReportLayout>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: wp('24%'),
    height: hp('11%'),
    marginLeft: 4,
    marginBottom: 3,
  },
});

export default CatchReportImage;
